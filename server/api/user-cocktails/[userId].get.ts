import OpenAI from "openai";
import { createError, getQuery } from "h3";
import { z } from "zod";
import { isWikipediaImageUrl } from "~/utils/wikipedia";
import {
  createServiceSupabaseClient,
  type SupabaseServiceClient,
} from "~/server/utils/supabase";
import {
  fetchUserMaterialsWithMeta,
  type UserMaterialWithMeta,
} from "~/server/utils/user-materials";
import type {
  UserCocktail,
  UserCocktailResponse,
} from "~/types/user-cocktails";
import { APIError } from "openai/error";

const paramsSchema = z.object({
  userId: z.string().uuid(),
});

const querySchema = z.object({
  limit: z.coerce.number().int().positive().optional(),
});

const ingredientSchema = z.object({
  name: z.string(),
  amount: z.string().min(1),
  is_user_material: z.literal(true),
});

const cocktailSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().min(1).max(200),
  image_url: z.string().url(),
  difficulty: z.enum(["easy", "normal", "hard"]),
  alcohol_level: z.enum(["low", "medium", "high"]),
  ingredients: z.array(ingredientSchema).min(1),
  missing_ingredients: z.array(z.string()).length(0),
  steps: z.array(z.string().min(1)).min(1),
});

const buildResponseSchema = (limit: number) =>
  z.object({
    total: z.number().int().nonnegative(),
    cocktails: z.array(cocktailSchema).max(limit),
  });

const DEFAULT_LIMIT = 100;

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const resolvedLimit = resolveLimit(runtimeConfig.userCocktailLimit);
  const fallbackImage =
    runtimeConfig.wikipediaImageFallback ?? "/images/noimage-760x460.png";

  const { userId } = paramsSchema.parse(event.context.params ?? {});
  const { limit: requestLimit } = querySchema.parse(getQuery(event));
  const limit = Math.min(resolvedLimit, requestLimit ?? resolvedLimit);

  const supabase = createSupabaseClient(runtimeConfig);

  let materials: UserMaterialWithMeta[] = [];
  try {
    materials = await fetchUserMaterialsWithMeta(supabase, userId);
  } catch (error) {
    console.error("failed to fetch user materials", {
      userId,
      error,
    });
    throw createError({
      statusCode: 500,
      statusMessage: "ユーザー材料の取得に失敗しました。",
    });
  }

  if (!materials.length) {
    return {
      total: 0,
      cocktails: [],
    } satisfies UserCocktailResponse;
  }

  const openai = createOpenAIClient(runtimeConfig);
  const schema = buildResponseSchema(limit);

  let rawText: string;
  try {
    rawText = await requestCocktailPlan({
      client: openai,
      limit,
      materials,
      userId,
    });
  } catch (error) {
    console.error("failed to call OpenAI", {
      userId,
      limit,
      error,
    });
    const { statusCode, statusMessage } = resolveOpenAIError(error);
    throw createError({
      statusCode,
      statusMessage,
    });
  }

  const validated = parseOpenAIResponse(rawText, schema);
  const sanitized = sanitizeResponse(validated, limit, fallbackImage);

  return sanitized;
});

const createSupabaseClient = (
  runtimeConfig: Record<string, any>
): SupabaseServiceClient => {
  try {
    return createServiceSupabaseClient({
      url: runtimeConfig.supabase?.url,
      serviceRoleKey: runtimeConfig.supabase?.serviceRoleKey,
    });
  } catch (error) {
    console.error("supabase client initialization failed", { error });
    throw createError({
      statusCode: 500,
      statusMessage: "サーバー設定が不足しています。",
    });
  }
};

const createOpenAIClient = (runtimeConfig: Record<string, any>) => {
  const apiKey = runtimeConfig.openai?.apiKey;
  if (!apiKey) {
    console.error("missing OPENAI_API_KEY");
    throw createError({
      statusCode: 500,
      statusMessage: "OpenAI API キーが設定されていません。",
    });
  }

  const project = runtimeConfig.openai?.projectId;

  return new OpenAI({
    apiKey,
    project,
  });
};

const resolveLimit = (value: unknown) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_LIMIT;
  return parsed;
};

const requestCocktailPlan = async ({
  client,
  limit,
  materials,
  userId,
}: {
  client: OpenAI;
  limit: number;
  materials: UserMaterialWithMeta[];
  userId: string;
}) => {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    temperature: 0.2,
    max_output_tokens: 2048,
    text: {
      format: buildStructuredOutputSchema(limit),
    },
    input: [
      {
        role: "system",
        content: buildSystemPrompt(limit),
      },
      {
        role: "user",
        content: buildUserPrompt(userId, materials, limit),
      },
    ],
  });

  if (!response.output_text) {
    throw new Error("OpenAI からの出力が空でした。");
  }

  return response.output_text;
};

const buildMaterialTable = (materials: UserMaterialWithMeta[]) => {
  const header = ["| 材料名 | カテゴリ |", "| --- | --- |"];
  const rows = materials.map(
    (item) => `| ${item.name} | ${item.category ?? "-"} |`
  );

  return [...header, ...rows].join("\n");
};

const buildUserPrompt = (
  userId: string,
  materials: UserMaterialWithMeta[],
  limit: number
) => {
  const sections = [
    `対象ユーザーID: ${userId}`,
    "ユーザーが登録した材料一覧（分類付き）:",
    buildMaterialTable(materials),
    [
      "出力要件:",
      `- Wikipedia に公式ページが存在し、画像を公開している実在カクテルのみを返す`,
      "- ユーザーが保有している材料のみで再現できるカクテルに限定し、不足材料が必要なカクテルは除外する",
      "- カクテルの説明文と手順は自然な日本語で簡潔に記述する",
      "- 画像 URL は Wikipedia / Wikimedia ドメインのみを使用し、存在しない場合はそのカクテル自体を結果から除外する",
      `- 優先度は国際的に知名度の高い順とし、最大 ${limit} 件まで返す`,
      "- 各材料の `is_user_material` は必ず true に設定する",
      "- missing_ingredients は常に空配列とする",
    ].join("\n"),
  ];

  return sections.join("\n\n");
};

const buildSystemPrompt = (limit: number) =>
  [
    "あなたは一流のバーテンダー兼カクテル史の専門家です。",
    "ユーザーの手持ち材料のみで作成できる実在カクテルを網羅的に選定し、日本語で出力します。",
    `最大 ${limit} 件まで出力し、Structured Outputs で提供された JSON Schema に厳密に従ってください。`,
    "JSON 以外のテキストは出力しないでください。",
  ].join("\n");

const buildStructuredOutputSchema = (limit: number) => ({
  type: "json_schema" as const,
  name: "user_cocktail_response",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      total: {
        type: "integer",
        minimum: 0,
      },
      cocktails: {
        type: "array",
        maxItems: limit,
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "id",
            "name",
            "description",
            "image_url",
            "difficulty",
            "alcohol_level",
            "ingredients",
            "missing_ingredients",
            "steps",
          ],
          properties: {
            id: { type: "string", minLength: 1 },
            name: { type: "string", minLength: 1 },
            description: { type: "string", minLength: 1, maxLength: 200 },
            image_url: { type: "string", minLength: 1 },
            difficulty: {
              type: "string",
              enum: ["easy", "normal", "hard"],
            },
            alcohol_level: {
              type: "string",
              enum: ["low", "medium", "high"],
            },
            ingredients: {
              type: "array",
              minItems: 1,
              items: {
                type: "object",
                additionalProperties: false,
                required: ["name", "amount", "is_user_material"],
                properties: {
                  name: { type: "string", minLength: 1 },
                  amount: { type: "string", minLength: 1 },
                  is_user_material: { type: "boolean", const: true },
                },
              },
            },
            missing_ingredients: {
              type: "array",
              maxItems: 0,
              items: { type: "string" },
            },
            steps: {
              type: "array",
              minItems: 1,
              items: { type: "string", minLength: 1 },
            },
          },
        },
      },
    },
    required: ["total", "cocktails"],
  },
});

const parseOpenAIResponse = (
  rawText: string,
  schema: ReturnType<typeof buildResponseSchema>
) => {
  let payload: unknown;
  try {
    payload = JSON.parse(rawText);
  } catch (error) {
    console.error("failed to parse OpenAI payload", { error });
    throw createError({
      statusCode: 502,
      statusMessage: "AI レスポンスの解析に失敗しました。",
    });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    console.error("OpenAI response validation failed", parsed.error);
    throw createError({
      statusCode: 502,
      statusMessage: "AI レスポンスの検証に失敗しました。",
    });
  }

  return parsed.data;
};

const sanitizeResponse = (
  payload: z.infer<ReturnType<typeof buildResponseSchema>>,
  limit: number,
  fallbackImage: string
): UserCocktailResponse => {
  const sanitized = payload.cocktails
    .filter((cocktail) =>
      cocktail.ingredients.every(
        (ingredient) => ingredient.is_user_material === true
      )
    )
    .map<UserCocktail>((cocktail) => ({
      ...cocktail,
      image_url: isWikipediaImageUrl(cocktail.image_url)
        ? cocktail.image_url
        : fallbackImage,
      missing_ingredients: [],
    }))
    .slice(0, limit);

  return {
    total: sanitized.length,
    cocktails: sanitized,
  };
};

const resolveOpenAIError = (error: unknown) => {
  if (error instanceof APIError) {
    return {
      statusCode: error.status ?? 502,
      statusMessage: `OpenAI API エラー: ${error.message}`,
    };
  }

  if (error instanceof Error) {
    return {
      statusCode: 502,
      statusMessage: `OpenAI API エラー: ${error.message}`,
    };
  }

  return {
    statusCode: 502,
    statusMessage: "カクテル生成 API の呼び出しに失敗しました。",
  };
};
