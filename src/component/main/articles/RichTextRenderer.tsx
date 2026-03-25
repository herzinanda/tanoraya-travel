import Image from "next/image";
import { getStrapiURL } from "@/utils/get-strapi-url";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BlockNode = any;

function getImageUrl(url: string): string {
  if (url.startsWith("http")) return url;
  return new URL(url, getStrapiURL()).href;
}

function renderInlineChildren(children: BlockNode[]): React.ReactNode {
  return children.map((child: BlockNode, i: number) => {
    if (child.type === "text") {
      let node: React.ReactNode = child.text;
      if (child.bold) node = <strong key={i}>{node}</strong>;
      if (child.italic) node = <em key={i}>{node}</em>;
      if (child.underline) node = <u key={i}>{node}</u>;
      if (child.strikethrough) node = <s key={i}>{node}</s>;
      if (child.code) node = <code key={i}>{node}</code>;
      return node;
    }
    if (child.type === "link") {
      return (
        <a key={i} href={child.url} target="_blank" rel="noopener noreferrer">
          {renderInlineChildren(child.children)}
        </a>
      );
    }
    return null;
  });
}

function renderBlock(block: BlockNode, index: number): React.ReactNode {
  switch (block.type) {
    case "paragraph":
      return <p key={index}>{renderInlineChildren(block.children)}</p>;

    case "heading": {
      const Tag = `h${block.level}` as keyof React.JSX.IntrinsicElements;
      return <Tag key={index}>{renderInlineChildren(block.children)}</Tag>;
    }

    case "list":
      if (block.format === "ordered") {
        return (
          <ol key={index}>
            {block.children.map((item: BlockNode, i: number) => (
              <li key={i}>{renderInlineChildren(item.children)}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul key={index}>
          {block.children.map((item: BlockNode, i: number) => (
            <li key={i}>{renderInlineChildren(item.children)}</li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote key={index} className="hilight-text mt-4 mb-4">
          <p>{renderInlineChildren(block.children)}</p>
        </blockquote>
      );

    case "code":
      return (
        <pre key={index}>
          <code>{renderInlineChildren(block.children)}</code>
        </pre>
      );

    case "image": {
      const src = getImageUrl(block.image?.url ?? "");
      if (!src) return null;
      return (
        <div key={index} className="details-image my-4">
          <Image
            src={src}
            alt={block.image?.alternativeText ?? "Article image"}
            width={840}
            height={500}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      );
    }

    default:
      return null;
  }
}

export function RichTextRenderer({ content }: { content: BlockNode[] }) {
  if (!Array.isArray(content) || content.length === 0) return null;
  return <div className="rich-text-content">{content.map(renderBlock)}</div>;
}
