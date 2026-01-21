"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Status = "CREATED" | "SENT" | "SIGNED" | "LOCKED";

interface Blueprint {
  id: string;
  name: string;
  fields: any[];
  createdAt: string;
  status: Status;
}

const statusFlow: Status[] = ["CREATED", "SENT", "SIGNED", "LOCKED"];

export default function BlueprintsPage() {
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [filter, setFilter] = useState<Status | "ALL">("ALL");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("blueprints") || "[]");
    setBlueprints(stored);
  }, []);

  const updateStorage = (updated: Blueprint[]) => {
    setBlueprints(updated);
    localStorage.setItem("blueprints", JSON.stringify(updated));
  };

  const changeStatus = (id: string, newStatus: Status) => {
    const updated = blueprints.map((bp) =>
      bp.id === id ? { ...bp, status: newStatus } : bp
    );
    updateStorage(updated);
    setOpenDropdown(null);
  };

  const filtered =
    filter === "ALL"
      ? blueprints
      : blueprints.filter((b) => b.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-100 px-6 py-10">
      {/* Header */}
      <div className="mx-auto max-w-6xl flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Blueprint Management
        </h1>

        <Link
          href="/blueprints/create"
          className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 hover:shadow-xl transition"
        >
          + Create Blueprint
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
            <tr className="bg-slate-800 text-white">
              <th className="px-5 py-4 text-left font-semibold">Name</th>
              <th className="px-5 py-4 text-left font-semibold">Status</th>
              <th className="px-5 py-4 text-left font-semibold">Fields</th>
              <th className="px-5 py-4 text-left font-semibold">Created</th>
              <th className="px-5 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((bp) => (
              <tr
                key={bp.id}
                className="border-b last:border-none hover:bg-slate-50 transition"
              >
                <td className="px-5 py-4 font-medium text-slate-900">
                  {bp.name}
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={bp.status} />
                </td>

                <td className="px-5 py-4 text-slate-700">
                  {bp.fields.length}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {new Date(bp.createdAt).toLocaleDateString()}
                </td>

                <td className="px-5 py-4 flex gap-2 relative">
                  <button className="rounded-lg border px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition">
                    View
                  </button>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === bp.id ? null : bp.id)
                      }
                      disabled={bp.status === "LOCKED"}
                      className={`rounded-lg border px-4 py-1.5 text-xs font-semibold transition ${
                        bp.status === "LOCKED"
                          ? "text-slate-400 cursor-not-allowed"
                          : "text-emerald-600 hover:bg-emerald-50"
                      }`}
                    >
                      Change Status
                    </button>

                    {openDropdown === bp.id && bp.status !== "LOCKED" && (
                      <ul className="absolute z-10 mt-1 w-36 bg-white border rounded-md shadow-lg">
                        {statusFlow.map((statusOption) => (
                          <li
                            key={statusOption}
                            onClick={() =>
                              changeStatus(bp.id, statusOption)
                            }
                            className={`px-4 py-2 text-sm cursor-pointer hover:bg-emerald-50 ${
                              statusOption === bp.status
                                ? "font-semibold text-emerald-600"
                                : "text-slate-700"
                            }`}
                          >
                            {statusOption}
                          </li>
                        ))}
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
                  No blueprints found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
