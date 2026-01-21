"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Status = "CREATED" | "SENT" | "SIGNED" | "LOCKED";

interface Contract {
  id: string;
  name: string;
  blueprintName: string;
  status: Status;
  createdAt: string;
}

const statusFlow: Status[] = ["CREATED", "SENT", "SIGNED", "LOCKED"];

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [filter, setFilter] = useState<Status | "ALL">("ALL");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("contracts") || "[]");
    setContracts(stored);
  }, []);

  const updateStorage = (updated: Contract[]) => {
    setContracts(updated);
    localStorage.setItem("contracts", JSON.stringify(updated));
  };

  const changeStatus = (id: string, newStatus: Status) => {
    const updated = contracts.map((c) =>
      c.id === id ? { ...c, status: newStatus } : c
    );
    updateStorage(updated);
    setOpenDropdown(null);
  };

  const filtered =
    filter === "ALL"
      ? contracts
      : contracts.filter((c) => c.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-100 px-6 py-10">
      {/* Header */}
      <div className="mx-auto max-w-6xl flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Contracts
        </h1>

        <Link
          href="/contracts/create"
          className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-700 hover:shadow-xl transition"
        >
          + New Contract
        </Link>
      </div>

      {/* Filters */}
      <div className="mx-auto max-w-6xl flex flex-wrap gap-3 mb-8">
        {["ALL", "CREATED", "SENT", "SIGNED", "LOCKED"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s as any)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              filter === s
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-white border text-slate-700 hover:bg-emerald-50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="mx-auto max-w-6xl overflow-hidden rounded-xl border bg-white shadow-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800 text-white text-left">
              <th className="px-5 py-4 font-semibold">Name</th>
              <th className="px-5 py-4 font-semibold">Blueprint</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold">Created</th>
              <th className="px-5 py-4 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                className="border-b last:border-none hover:bg-slate-50 transition"
              >
                <td className="px-5 py-4 font-medium text-slate-900">
                  {c.name}
                </td>

                <td className="px-5 py-4 text-slate-700">
                  {c.blueprintName}
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={c.status} />
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>

                <td className="px-5 py-4 flex gap-2 relative">
                  <button className="rounded-lg border px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition">
                    View
                  </button>

                  {/* Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === c.id ? null : c.id)
                      }
                      disabled={c.status === "LOCKED"}
                      className={`rounded-lg border px-4 py-1.5 text-xs font-semibold transition ${
                        c.status === "LOCKED"
                          ? "text-slate-400 cursor-not-allowed"
                          : "text-emerald-600 hover:bg-emerald-50"
                      }`}
                    >
                      Change Status
                    </button>

                    {openDropdown === c.id && c.status !== "LOCKED" && (
                      <ul className="absolute z-10 mt-1 w-40 bg-white border rounded-md shadow-lg">
                        {statusFlow.map((statusOption) => (
                          <li
                            key={statusOption}
                            onClick={() =>
                              changeStatus(c.id, statusOption)
                            }
                            className={`px-4 py-2 text-sm cursor-pointer hover:bg-emerald-50 ${
                              statusOption === c.status
                                ? "font-semibold text-emerald-600"
                                : "text-slate-700"
                            }`}
                          >
                            {statusOption}
                          </li>
                        ))}

                        <li
                          onClick={() => changeStatus(c.id, "CREATED")}
                          className="px-4 py-2 text-sm cursor-pointer hover:bg-red-50 text-red-600 font-semibold"
                        >
                          Restart Status
                        </li>
                      </ul>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-14 text-center text-slate-500 italic"
                >
                  No contracts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="h-16"></div>
    </div>
  );
}

/* Status Badge */
function StatusBadge({ status }: { status: Status }) {
  const colorMap: Record<Status, string> = {
    CREATED: "bg-slate-200 text-slate-800",
    SENT: "bg-sky-100 text-sky-700",
    SIGNED: "bg-emerald-100 text-emerald-700",
    LOCKED: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${colorMap[status]}`}
    >
      {status}
    </span>
  );
}
