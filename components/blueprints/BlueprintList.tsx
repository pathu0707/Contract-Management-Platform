"use client";

import Link from "next/link";

interface Blueprint {
  id: string;
  name: string;
  fields: unknown[];
  createdAt: string;
}

export default function BlueprintList({
  blueprints,
}: {
  blueprints: Blueprint[];
}) {
  if (blueprints.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-6 text-sm text-gray-600">
        No blueprints created yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Fields</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {blueprints.map((bp) => (
            <tr
              key={bp.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 font-medium text-gray-900">
                {bp.name}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {bp.fields.length}
              </td>
              <td className="px-4 py-3 text-gray-500">
                {new Date(bp.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/blueprints/${bp.id}`}
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
