"use client";
import { useRouter } from "next/navigation";
import { TableRow } from "../ui/table";
import { type ReactNode } from "react";

export function ClickableRow({ href, children }: { href: string; children: ReactNode }) {
  const router = useRouter();
  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => router.push(href)}
    >
      {children}
    </TableRow>
  );
}

/** Wraps the actions cell so clicks on buttons don't bubble to ClickableRow. */
export function RowActions({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
      {children}
    </div>
  );
}
