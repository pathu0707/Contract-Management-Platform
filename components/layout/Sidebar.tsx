"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/blueprints", label: "Blueprints" },
    { href: "/blueprints/create", label: "Create Blueprint" },
    { href: "/contracts", label: "Contracts" },
    { href: "/contracts/create", label: "Create Contract" },
  ];

  return (
    <aside className="hidden w-60 flex-shrink-0 border-r bg-white md:block">
      <div className="p-4">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Navigation
        </h2>

        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-md px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
