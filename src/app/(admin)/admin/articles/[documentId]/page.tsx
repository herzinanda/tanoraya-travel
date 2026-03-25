import { getAdminArticle } from "../../../_actions/articles";
import { EditArticleForm } from "./edit-form";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit Article" };

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;
  const result = await getAdminArticle(documentId);

  if (!result?.data) notFound();

  return <EditArticleForm article={result.data} />;
}
