"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getContracts, saveContract } from "@/store/contractStore";


/* ---------------- TYPES ---------------- */

type Status =
  | "CREATED"
  | "APPROVED"
  | "SENT"
  | "SIGNED"
  | "LOCKED"
  | "REVOKED";

type FilterType = "ALL" | "ACTIVE" | "PENDING" | "SIGNED";

interface Contract {
  id: string;
  name: string;
  blueprintName: string;
  status: Status;
  createdAt: string;
}

const statusFlow: Status[] = [
  "CREATED",
  "APPROVED",
  "SENT",
  "SIGNED",
  "LOCKED",
];

/* ---------------- PAGE ---------------- */

export default function HomePage() {
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    setContracts(getContracts());
  }, []);

  const updateStorage = (updated: Contract[]) => {
    setContracts(updated);
     setContracts(updated);
    setOpenDropdown(null);
  };

  const changeStatus = (id: string, newStatus: Status) => {
    const updated = contracts.map((c) =>
      c.id === id ? { ...c, status: newStatus } : c
    );
    updateStorage(updated);
  };

  const filteredContracts = contracts.filter((c) => {
    if (filter === "ALL") return true;
    if (filter === "ACTIVE")
      return ["CREATED", "APPROVED", "SENT"].includes(c.status);
    if (filter === "PENDING")
      return ["CREATED", "APPROVED"].includes(c.status);
    if (filter === "SIGNED") return c.status === "SIGNED";
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-teal-100">
      {/* ---------------- NAV ---------------- */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 border-b shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Contract Management Platform
          </h1>

          <div className="flex gap-3">
            <Link
              href="/blueprints/create"
              className="rounded-xl px-5 py-2 text-sm font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition shadow"
            >
              + New Blueprint
            </Link>

            <Link
              href="/contracts/create"
              className="rounded-xl px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:scale-[1.03] transition shadow"
            >
              + New Contract
            </Link>
          </div>
        </div>
      </header>

      {/* ---------------- MAIN ---------------- */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          {["ALL", "ACTIVE", "PENDING", "SIGNED"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as FilterType)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition shadow ${
                filter === type
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white scale-[1.05]"
                  : "bg-white border text-gray-700 hover:bg-emerald-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border bg-white/80 shadow-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-left">
                <th className="px-5 py-4">Contract</th>
                <th className="px-5 py-4">Blueprint</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Created</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredContracts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-14 text-center text-gray-500">
                    No contracts found
                  </td>
                </tr>
              )}

              {filteredContracts.map((c) => (
                <tr
                  key={c.id}
                  className="border-b hover:bg-emerald-50/40 transition"
                >
                  <td className="px-5 py-4 font-medium">{c.name}</td>
                  <td className="px-5 py-4">{c.blueprintName}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-5 py-4">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 flex gap-2">
                    <Link
                      href={`/contracts/${c.id}`}
                      className="rounded-lg border px-4 py-1.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-50"
                    >
                      View
                    </Link>

                    <div className="relative">
                      <button
                        disabled={c.status === "LOCKED"}
                        onClick={() =>
                          setOpenDropdown(openDropdown === c.id ? null : c.id)
                        }
                        className={`rounded-lg border px-4 py-1.5 text-xs font-semibold ${
                          c.status === "LOCKED"
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        Change Status
                      </button>

                      {openDropdown === c.id && c.status !== "LOCKED" && (
                        <ul className="absolute z-10 mt-1 w-44 rounded-lg border bg-white shadow-lg">
                          {statusFlow.map((s) => (
                            <li
                              key={s}
                              onClick={() => changeStatus(c.id, s)}
                              className={`px-4 py-2 cursor-pointer hover:bg-emerald-50 ${
                                s === c.status
                                  ? "font-bold text-emerald-600"
                                  : "text-gray-700"
                              }`}
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

/* ---------------- STATUS BADGE ---------------- */

function StatusBadge({ status }: { status: Status }) {
  const colorMap: Record<Status, string> = {
    CREATED: "bg-gray-200 text-gray-800",
    APPROVED: "bg-blue-100 text-blue-700",
    SENT: "bg-yellow-100 text-yellow-800",
    SIGNED: "bg-emerald-100 text-emerald-700",
    LOCKED: "bg-purple-100 text-purple-700",
    REVOKED: "bg-red-100 text-red-700",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colorMap[status]}`}>
      {status}
    </span>
  );
}
