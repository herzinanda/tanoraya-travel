// components/NavigationMenu.tsx
import Link from "next/link";
import { NavItem } from "@/types";

type NavMenuProps = {
  items: NavItem[];
};

/**
 * A recursive component to render navigation items and their sub-menus.
 */
const NavigationMenu = ({ items }: NavMenuProps) => {
  return (
    <nav id="mobile-menu">
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            // Add classes if item has a sub-menu
            className={item.subMenu ? "has-dropdown" : ""}
          >
            <Link href={item.href}>
              {item.label}
              {/* Add dropdown icon if sub-menu exists */}
              {item.subMenu && <i className="fa-solid fa-chevron-down"></i>}
            </Link>

            {/* Recursive Step: If subMenu exists, render it */}
            {item.subMenu && (
              <ul className="submenu">
                {item.subMenu.map((subItem) => (
                  <li key={subItem.id}>
                    <Link href={subItem.href}>{subItem.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;