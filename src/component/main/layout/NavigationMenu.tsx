// components/NavigationMenu.tsx
import Image from "next/image";
import Link from "next/link";
import { NavItem } from "@/types/index";

type NavMenuProps = {
  items: NavItem[];
};

/**
 * A recursive component to render navigation items and their sub-menus.
 * Items with `megaMenu` get a wide mega-menu panel instead of a plain submenu.
 */
const NavigationMenu = ({ items }: NavMenuProps) => {
  return (
    <nav id="mobile-menu">
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className={
              item.subMenu
                ? "has-dropdown"
                : item.megaMenu
                ? "has-dropdown has-megamenu"
                : ""
            }
          >
            <Link href={item.href}>
              {item.label}
              {(item.subMenu || item.megaMenu) && (
                <i className="fa-solid fa-chevron-down"></i>
              )}
            </Link>

            {/* Plain submenu */}
            {item.subMenu && (
              <ul className="submenu">
                {item.subMenu.map((subItem) => (
                  <li key={subItem.id}>
                    <Link href={subItem.href}>{subItem.label}</Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Mega menu panel */}
            {item.megaMenu && (
              <div className="submenu nav-megamenu">
                {/* Destinations column */}
                <div className="nav-megamenu__col">
                  <p className="nav-megamenu__heading">Top Destinations</p>
                  <ul className="nav-megamenu__list">
                    {item.megaMenu.topDestinations.map((dest) => (
                      <li key={dest.id}>
                        <Link
                          href={`/tour-packages?destination=${dest.slug}`}
                          className="nav-megamenu__dest-link"
                        >
                          {dest.imageUrl && (
                            <span className="nav-megamenu__dest-thumb">
                              <Image
                                src={dest.imageUrl}
                                alt={dest.title}
                                width={48}
                                height={48}
                                unoptimized
                              />
                            </span>
                          )}
                          <span className="nav-megamenu__dest-info">
                            <span className="nav-megamenu__dest-title text-start">
                              {dest.title}
                            </span>
                            {dest.tourCount !== undefined && (
                              <span className="nav-megamenu__dest-count">
                                {dest.tourCount}{" "}
                                {dest.tourCount === 1 ? "tour" : "tours"}
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                    <li className="nav-megamenu__view-all">
                      <Link href="/destination">View all destinations →</Link>
                    </li>
                  </ul>
                </div>

                {/* Featured tour column */}
                {item.megaMenu.featuredTour && (
                  <div className="nav-megamenu__col nav-megamenu__col--featured">
                    <p className="nav-megamenu__heading">Featured Package</p>
                    <Link
                      href={`/tour-packages/${item.megaMenu.featuredTour.slug}`}
                      className="nav-megamenu__featured-card"
                    >
                      {item.megaMenu.featuredTour.imageUrl && (
                        <div className="nav-megamenu__featured-img">
                          <Image
                            src={item.megaMenu.featuredTour.imageUrl}
                            alt={item.megaMenu.featuredTour.title}
                            fill
                            unoptimized
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      )}
                      <div className="nav-megamenu__featured-body">
                        <span className="nav-megamenu__featured-label">
                          Featured
                        </span>
                        <span className="nav-megamenu__featured-title">
                          {item.megaMenu.featuredTour.title}
                        </span>
                        {item.megaMenu.featuredTour.price && (
                          <span className="nav-megamenu__featured-price">
                            From Rp{" "}
                            {item.megaMenu.featuredTour.price.toLocaleString(
                              "id-ID"
                            )}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                )}

                {/* All packages link */}
                <div className="nav-megamenu__footer">
                  <Link href="/tour-packages" className="nav-megamenu__all-link">
                    Browse all tour packages
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
