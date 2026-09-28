"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Overview", href: "/", number: "00" },
  { label: "Products", href: "/products", number: "01" },
  { label: "Categories", href: "/categories", number: "02" },
  { label: "Customers", href: "/customers", number: "03" },
  { label: "Orders", href: "/orders", number: "04" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="primary-nav" aria-label="Main navigation">
      {links.map((link) => (
        <Link
          aria-current={pathname === link.href ? "page" : undefined}
          className={pathname === link.href ? "nav-link active" : "nav-link"}
          href={link.href}
          key={link.href}
        >
          <span className="nav-number">{link.number}</span>
          <span>{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}