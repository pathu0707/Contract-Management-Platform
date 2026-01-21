"use client";

type ContractStatus =
  | "CREATED"
  | "APPROVED"
  | "SENT"
  | "SIGNED"
  | "LOCKED"
  | "REVOKED";

export default function StatusBadge({
  status,
}: {
  status: ContractStatus;
}) {
  const styles: Record<ContractStatus, string> = {
    CREATED: "bg-gray-200 text-gray-800",
    APPROVED: "bg-blue-100 text-blue-700",
    SENT: "bg-yellow-100 text-yellow-800",
    SIGNED: "bg-green-100 text-green-700",
    LOCKED: "bg-purple-100 text-purple-700",
    REVOKED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
