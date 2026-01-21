"use client";

type ContractStatus =
  | "CREATED"
  | "APPROVED"
  | "SENT"
  | "SIGNED"
  | "LOCKED"
  | "REVOKED";

const STATUS_FLOW: Record<ContractStatus, ContractStatus[]> =
  {
    CREATED: ["APPROVED", "REVOKED"],
    APPROVED: ["SENT"],
    SENT: ["SIGNED", "REVOKED"],
    SIGNED: ["LOCKED"],
    LOCKED: [],
    REVOKED: [],
  };

export default function LifecycleControls({
  status,
  onChange,
}: {
  status: ContractStatus;
  onChange: (next: ContractStatus) => void;
}) {
  const nextStates = STATUS_FLOW[status];

  if (status === "REVOKED") {
    return (
      <p className="text-sm text-red-600">
        This contract has been revoked and cannot proceed
        further.
      </p>
    );
  }

  if (status === "LOCKED") {
    return (
      <p className="text-sm text-gray-600">
        This contract is locked and finalized.
      </p>
    );
  }

  if (nextStates.length === 0) {
    return (
      <p className="text-sm text-gray-600">
        No actions available.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {nextStates.map((state) => (
        <button
          key={state}
          onClick={() => onChange(state)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          Mark as {state}
        </button>
      ))}
    </div>
  );
}
