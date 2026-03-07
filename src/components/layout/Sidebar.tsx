"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navigation = [
  { name: "Dashboard", href: "/", icon: "grid" },
  { name: "Inspections", href: "/inspections", icon: "clipboard-check" },
  { name: "Templates", href: "/templates", icon: "document-duplicate" },
  { name: "Issues", href: "/issues", icon: "exclamation-triangle" },
  { name: "CARs", href: "/cars", icon: "shield-check" },
  { name: "Actions", href: "/actions", icon: "bolt" },
  { name: "Analytics", href: "/analytics", icon: "chart-bar" },
];

const iconPaths: Record<string, string> = {
  grid: "M3.75 3.75h6.5v6.5h-6.5zM13.75 3.75h6.5v6.5h-6.5zM3.75 13.75h6.5v6.5h-6.5zM13.75 13.75h6.5v6.5h-6.5z",
  "clipboard-check": "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v1h1a1 1 0 010 2H9v1a1 1 0 01-2 0v-1H6a1 1 0 010-2h1V8z",
  "document-duplicate": "M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z",
  "exclamation-triangle": "M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495z",
  "shield-check": "M10 1a.75.75 0 01.596.297l.703.938A10.39 10.39 0 0017.092 5a.75.75 0 01.658.87A19.457 19.457 0 0110 19a19.457 19.457 0 01-7.75-13.13A.75.75 0 012.908 5a10.39 10.39 0 005.793-2.765l.703-.938A.75.75 0 0110 1z",
  bolt: "M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z",
  "chart-bar": "M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z",
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-gray-800">
        <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-sm">
          PQ
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">PackIQ</h1>
          <p className="text-[10px] text-gray-400 -mt-0.5">Inspection Platform</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <svg
                className="h-5 w-5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d={iconPaths[item.icon]} />
              </svg>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-medium">
            JD
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-200">John Doe</p>
            <p className="text-xs text-gray-500">Quality Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
