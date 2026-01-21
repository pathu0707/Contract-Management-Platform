"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type ContractStatus =
  | "CREATED"
  | "APPROVED"
  | "SENT"
  | "SIGNED"
  | "LOCKED"
  | "REVOKED";

interface ContractFieldValue {
  fieldId: string;
  value: string | boolean;
}

interface Contract {
  id: string;
  name: string;
  blueprintName: string;
  status: ContractStatus;
  fieldValues: ContractFieldValue[];
  createdAt: string;
}

const STATUS_FLOW: Record<ContractStatus, ContractStatus[]> = {
  CREATED: ["APPROVED", "REVOKED"],
  APPROVED: ["SENT"],
  SENT: ["SIGNED", "REVOKED"],
  SIGNED: ["LOCKED"],
  LOCKED: [],
  REVOKED: [],
};

export default function ContractDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contractId = params.id as string;

  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("contracts") || "[]"
    );

    const found = stored.find(
      (c: Contract) => c.id === contractId
    );

    if (!found) {
      router.push("/contracts");
      return;
    }

    setContract(found);
  }, [contractId, router]);

  const updateStatus = (next: ContractStatus) => {
    if (!contract) return;
    if (!STATUS_FLOW[contract.status].includes(next)) return;

    const updated = { ...contract, status: next };

    const all = JSON.parse(
      localStorage.getItem("contracts") || "[]"
    );

    const saved = all.map((c: Contract) =>
      c.id === contract.id ? updated : c
    );

    localStorage.setItem("contracts", JSON.stringify(saved));
    setContract(updated);
  };

  if (!contract) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading contract...
      </div>
    );
  }

  const isLocked = contract.status === "LOCKED";
  const isRevoked = contract.status === "REVOKED";
  const nextStates = STATUS_FLOW[contract.status];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {contract.name}
            </h1>
            <p className="text-xs text-gray-500">
              Blueprint: {contract.blueprintName}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={contract.status} />
            <button
              onClick={() => router.push("/contracts")}
              className="rounded-md border px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Back
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        {/* Field Values */}
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-800">
            Contract Fields
          </h2>

          {contract.fieldValues.length === 0 ? (
            <p className="text-sm text-gray-500">
              No fields found in this contract.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {contract.fieldValues.map((field) => (
                <div key={field.fieldId}>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Field ID
                  </label>
                  <input
                    type="text"
                    disabled
                    value={String(field.value)}
                    className="w-full rounded-md border bg-gray-100 px-3 py-2 text-sm text-gray-700"
                  />
                </div>
              ))}
            </div>
          )}

          {(isLocked || isRevoked) && (
            <p className="mt-4 text-xs text-red-600">
              This contract can no longer be edited.
            </p>
          )}
        </div>

        {/* Lifecycle Controls */}
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-800">
            Lifecycle Actions
          </h2>

          {isRevoked ? (
            <p className="text-sm text-red-600">
              This contract has been revoked and cannot proceed further.
            </p>
          ) : isLocked ? (
            <p className="text-sm text-gray-600">
              This contract is locked and finalized.
            </p>
          ) : nextStates.length === 0 ? (
            <p className="text-sm text-gray-600">
              No actions available.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {nextStates.map((state) => (
                <button
                  key={state}
                  onClick={() => updateStatus(state)}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                >
                  Mark as {state}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: ContractStatus }) {
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
