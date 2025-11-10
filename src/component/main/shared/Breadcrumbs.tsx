import Link from "next/link";
import React from "react";

type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbProps = {
  pageTitle: string;
  bgImage: string;
  items: BreadcrumbItem[];
};

const Breadcrumbs = ({ pageTitle, bgImage, items }: BreadcrumbProps) => {
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
                {items.map((item, index) => {
                  const isLastItem = index === items.length - 1;

                  return (
                    <React.Fragment key={item.href}>
                      {index > 0 && (
                        <li>
                          <i className="fa-solid fa-chevrons-right"></i>
                        </li>
                      )}
                      <li className={isLastItem ? "active" : ""}>
                      {
                        isLastItem ? (
                            item.label
                        ) : (
                            <Link href={item.href}>{item.label}</Link>
                        )
                      }
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
