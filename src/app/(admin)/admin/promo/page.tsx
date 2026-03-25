import { getAdminPromo } from "../../_actions/promo";
import { PromoForm } from "./promo-form";

export const metadata = { title: "Promo Popup" };

export default async function PromoPage() {
  const result = await getAdminPromo();
  return <PromoForm promo={result?.data ?? null} />;
}
