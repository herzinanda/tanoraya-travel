export function getStrapiURL() {
  return process.env.STRAPI_API_URL ?? "http://127.0.0.1:1337";
}