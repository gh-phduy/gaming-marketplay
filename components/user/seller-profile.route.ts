export const normalizeSellerRouteKey = (value: string) =>
  decodeURIComponent(value)
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "")
    .replace(/[^a-z0-9]/g, "");

export const getSellerProfilePath = (sellerName: string) => {
  const routeName = sellerName.trim().replace(/\s+/g, "-");
  return `/user/${encodeURIComponent(routeName)}`;
};
