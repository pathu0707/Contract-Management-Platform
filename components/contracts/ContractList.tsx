"use client";

import Link from "next/link";
import StatusBadge from "./StatusBadge";

type ContractStatus =
  | "CREATED"
  | "APPROVED"
  | "SENT"
  | "SIGNED"
  | "LOCKED"
  | "REVOKED";

interface Contract {
  id: string;
  name: string;
  blueprintName: string;
  status: ContractStatus;
  createdAt: string;
}

export default function ContractList({
  contracts,
}: {
  contracts: Contract[];
}) {
  if (contracts.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-6 text-sm text-gray-600">
        No contracts created yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Blueprint</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((c) => (
            <tr
              key={c.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 font-medium text-gray-900">
                {c.name}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {c.blueprintName}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={c.status} />
              </td>
              <td className="px-4 py-3 text-gray-500">
                {new Date(c.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/contracts/${c.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
