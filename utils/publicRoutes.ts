const publicPaths = ["/user"]; // add additional paths here to skip authentication

const normalizePath = (path: string) => {
  if (!path) return "/";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.replace(/\/+$/, "") || "/";
};

export const isPublicPath = (path: string) => {
  const currentPath = normalizePath(path);
  return publicPaths.some((publicPath) => {
    const normalizedPublicPath = normalizePath(publicPath);

    return (
      currentPath === normalizedPublicPath ||
      currentPath.startsWith(`${normalizedPublicPath}/`)
    );
  });
};

export { publicPaths };
