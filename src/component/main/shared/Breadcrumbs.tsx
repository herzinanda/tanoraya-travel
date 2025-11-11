"use client"; // 1. This must be a client component to use hooks

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation"; // 2. Import the Next.js hook

type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbProps = {
  pageTitle: string; // We still need the friendly page title
  bgImage: string;
  items?: BreadcrumbItem[]; // 3. Make items optional
};

// 4. Helper function to make "south-africa" -> "South Africa"
const formatSegment = (segment: string) => {
  if (!segment) return "";
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Breadcrumbs = ({ pageTitle, bgImage, items }: BreadcrumbProps) => {
  // 5. Get the current URL path
  const pathname = usePathname();
  let generatedItems: BreadcrumbItem[] = [];

  // 6. Generate breadcrumbs if 'items' prop is not provided
  if (!items) {
    generatedItems = [{ label: "Home", href: "/" }]; // Start with Home
    
    if (pathname) {
      const segments = pathname.split("/").filter(Boolean); // e.g., ['destination', 'south-africa']
      let currentPath = "";

      segments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        const isLastSegment = index === segments.length - 1;

        generatedItems.push({
          // 7. Use the final 'pageTitle' prop for the last item
          label: isLastSegment ? pageTitle : formatSegment(segment),
          href: currentPath,
        });
      });
    }
  }

  // 8. Use the manual 'items' if provided, otherwise use our generated list
  const displayItems = items || generatedItems;

  return (
    <>
      <section
        className="breadcrumb-wrapper fix bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="container">
          <div className="row">
            <div className="page-heading">
              <h2>{pageTitle}</h2>
              <ul className="breadcrumb-list">
                {displayItems.map((item, index) => {
                  const isLastItem = index === displayItems.length - 1;

                  return (
                    <React.Fragment key={item.href}>
                      {index > 0 && (
                        <li>
                          <i className="fa-solid fa-chevrons-right"></i>
                        </li>
                      )}
                      <li className={isLastItem ? "active" : ""}>
                        {isLastItem ? (
                          item.label
                        ) : (
                          <Link href={item.href}>{item.label}</Link>
                        )}
                      </li>
                    </React.Fragment>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Breadcrumbs;