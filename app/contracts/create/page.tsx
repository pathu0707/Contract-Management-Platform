"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBlueprints } from "@/store/blueprintStore";
import { saveContract } from "@/store/contractStore";

type FieldType = "text" | "date" | "signature" | "checkbox";

interface BlueprintField {
  id: string;
  type: FieldType;
  label: string;
  position: { x: number; y: number };
}

interface Blueprint {
  id: string;
  name: string;
  fields: BlueprintField[];
}

interface ContractFieldValue {
  fieldId: string;
  value: string | boolean;
}

export default function CreateContractPage() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [selectedBlueprintId, setSelectedBlueprintId] = useState("");
  const [contractName, setContractName] = useState("");
  const [fields, setFields] = useState<BlueprintField[]>([]);
  const [values, setValues] = useState<ContractFieldValue[]>([]);

  useEffect(() => {
    setMounted(true);
    const data = getBlueprints();
    setBlueprints(Array.isArray(data) ? data : []);
  }, []);

  if (!mounted) return null;

  const handleBlueprintSelect = (id: string) => {
    const bp = blueprints.find((b) => b.id === id);
    if (!bp) return;

    setSelectedBlueprintId(id);
    setFields(bp.fields);
    setValues(
      bp.fields.map((f) => ({
        fieldId: f.id,
        value: f.type === "checkbox" ? false : "",
      }))
    );
  };

  const handleValueChange = (fieldId: string, value: string | boolean) => {
    setValues((prev) =>
      prev.map((v) => (v.fieldId === fieldId ? { ...v, value } : v))
    );
  };

  const saveHandler = () => {
    if (!contractName.trim() || !selectedBlueprintId) {
      alert("Please fill all required fields");
      return;
    }

    const blueprint = blueprints.find((b) => b.id === selectedBlueprintId);
    if (!blueprint) return;

    saveContract({
      name: contractName.trim(),
      blueprintId: blueprint.id,
      blueprintName: blueprint.name,
      status: "CREATED",
      fieldValues: values,
    });

    alert("Contract created successfully!");
    router.push("/contracts");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-100">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Create Contract
          </h1>

          <button
            onClick={saveHandler}
            disabled={!contractName || !selectedBlueprintId}
            className="rounded-xl bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 hover:shadow-lg transition disabled:opacity-50"
          >
            Save Contract
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        {/* Step 1 */}
        <div className="rounded-xl border bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-sm font-semibold text-slate-800">
            Step 1: Select Blueprint
          </h2>

          {blueprints.length === 0 ? (
            <p className="text-sm text-slate-600 italic">
              No blueprints found. Create one first.
            </p>
          ) : (
            <select
              value={selectedBlueprintId}
              onChange={(e) => handleBlueprintSelect(e.target.value)}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-400 outline-none"
            >
              <option value="">Select a blueprint</option>
              {blueprints.map((bp) => (
                <option key={bp.id} value={bp.id}>
                  {bp.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Step 2 */}
        {selectedBlueprintId && (
          <div className="rounded-xl border bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-sm font-semibold text-slate-800">
              Step 2: Contract Details
            </h2>

            <div className="mb-6">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Contract Name
              </label>
              <input
                type="text"
                value={contractName}
                onChange={(e) => setContractName(e.target.value)}
                placeholder="e.g. NDA with Vendor"
                className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fields.map((field) => {
                const fieldValue =
                  values.find((v) => v.fieldId === field.id)?.value ?? "";

                return (
                  <div key={field.id}>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {field.label}
                    </label>

                    {field.type === "text" && (
                      <input
                        type="text"
                        value={fieldValue as string}
                        onChange={(e) =>
                          handleValueChange(field.id, e.target.value)
                        }
                        className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-400"
                      />
                    )}

                    {field.type === "date" && (
                      <input
                        type="date"
                        value={fieldValue as string}
                        onChange={(e) =>
                          handleValueChange(field.id, e.target.value)
                        }
                        className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-400"
                      />
                    )}

                    {field.type === "signature" && (
                      <input
                        type="text"
                        placeholder="Type name as signature"
                        value={fieldValue as string}
                        onChange={(e) =>
                          handleValueChange(field.id, e.target.value)
                        }
                        className="w-full rounded-lg border px-4 py-2 text-sm italic focus:ring-2 focus:ring-emerald-400"
                      />
                    )}

                    {field.type === "checkbox" && (
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          checked={Boolean(fieldValue)}
                          onChange={(e) =>
                            handleValueChange(field.id, e.target.checked)
                          }
                          className="h-4 w-4 accent-emerald-600"
                        />
                        <span className="text-sm text-slate-600">Yes</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
