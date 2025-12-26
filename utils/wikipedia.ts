/**
 * Wikipedia もしくは Wikimedia ドメイン上の画像 URL かを検証する
 */
export const isWikipediaImageUrl = (value?: string | null) => {
  if (!value) return false;
  try {
    const { hostname } = new URL(value);
    return (
      hostname.endsWith(".wikipedia.org") ||
      hostname.endsWith(".wikimedia.org")
    );
  } catch {
    return false;
  }
};
