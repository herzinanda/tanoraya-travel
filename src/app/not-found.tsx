import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// This metadata will override the layout's metadata
export const metadata: Metadata = {
  title: "Page Not Found - Tanoraya Travel",
};

const NotFound = () => {
  return (
    <>
      {/* The Header, Footer, etc., are now provided by your (main) layout. */}
      {/* You only need the page-specific content here. */}

      {/* */}
      <section
        className="breadcrumb-wrapper fix bg-cover"
        style={{ backgroundImage: "url(/img/breadcrumb/breadcrumb.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="page-heading">
              <h2>Error</h2>
              <ul className="breadcrumb-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <i className="fa-solid fa-chevrons-right"></i>
                </li>
                <li className="active">Error</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* */}
      <section className="found-section section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="found-item">
                <div className="shape">
                  <Image
                    src="/img/shape/error.png"
                    alt=""
                    width={105}
                    height={105}
                  />
                </div>
                <div className="shape2">
                  <Image
                    src="/img/shape/error2.png"
                    alt=""
                    width={88}
                    height={88}
                  />
                </div>
                <div className="shape3">
                  <Image
                    src="/img/shape/error3.png"
                    alt=""
                    width={48}
                    height={48}
                  />
                </div>
                <div className="error">
                  4<span>0</span>4
                </div>
                <h2>
                  Oops! Somethings Went Wrong <br />
                  Please Try Again Later
                </h2>
                <p>
                  Sorry about that, but the page you looking is not
                  available now
                </p>
                <Link href="/" className="theme-btn">
                  Back To Home
                  <Image
                    src="/img/icon/white-arrow.svg"
                    alt=""
                    width={22}
                    height={16}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;