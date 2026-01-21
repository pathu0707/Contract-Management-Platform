"use client";

import { useState } from "react";

type FieldType = "text" | "date" | "signature" | "checkbox";

interface BlueprintField {
  id: string;
  type: FieldType;
  label: string;
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

export default function ContractForm({
  blueprints,
  onSave,
}: {
  blueprints: Blueprint[];
  onSave: (contract: {
    id: string;
    name: string;
    blueprintId: string;
    blueprintName: string;
    status: "CREATED";
    fieldValues: ContractFieldValue[];
    createdAt: string;
  }) => void;
}) {
  const [name, setName] = useState("");
  const [selectedBlueprintId, setSelectedBlueprintId] =
    useState("");
  const [fields, setFields] = useState<BlueprintField[]>(
    []
  );
  const [values, setValues] = useState<
    ContractFieldValue[]
  >([]);

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

  const updateValue = (
    fieldId: string,
    value: string | boolean
  ) => {
    setValues((prev) =>
      prev.map((v) =>
        v.fieldId === fieldId ? { ...v, value } : v
      )
    );
  };

  const save = () => {
    if (!name.trim() || !selectedBlueprintId) return;

    const blueprint = blueprints.find(
      (b) => b.id === selectedBlueprintId
    );
    if (!blueprint) return;

    onSave({
      id: crypto.randomUUID(),
      name: name.trim(),
      blueprintId: blueprint.id,
      blueprintName: blueprint.name,
      status: "CREATED",
      fieldValues: values,
      createdAt: new Date().toISOString(),
    });

    setName("");
    setSelectedBlueprintId("");
    setFields([]);
    setValues([]);
  };

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-800">
        Create Contract
      </h2>

      <div className="mb-4">
        <label className="mb-1 block text-xs font-medium text-gray-700">
          Contract Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. NDA with Vendor"
          className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-xs font-medium text-gray-700">
          Blueprint
        </label>
        <select
          value={selectedBlueprintId}
          onChange={(e) =>
            handleBlueprintSelect(e.target.value)
          }
          className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select blueprint</option>
          {blueprints.map((bp) => (
            <option key={bp.id} value={bp.id}>
              {bp.name}
            </option>
          ))}
        </select>
      </div>

      {fields.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((field) => {
            const fieldValue = values.find(
              (v) => v.fieldId === field.id
            )?.value;

            return (
              <div key={field.id}>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  {field.label}
                </label>

                {field.type === "text" && (
                  <input
                    type="text"
                    value={fieldValue as string}
                    onChange={(e) =>
                      updateValue(
                        field.id,
                        e.target.value
                      )
                    }
                    className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                )}

                {field.type === "date" && (
                  <input
                    type="date"
                    value={fieldValue as string}
                    onChange={(e) =>
                      updateValue(
                        field.id,
                        e.target.value
                      )
                    }
                    className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                )}

                {field.type === "signature" && (
                  <input
                    type="text"
                    placeholder="Type name as signature"
                    value={fieldValue as string}
                    onChange={(e) =>
                      updateValue(
                        field.id,
                        e.target.value
                      )
                    }
                    className="w-full rounded-md border px-3 py-2 text-sm italic focus:border-blue-500 focus:outline-none"
                  />
                )}

                {field.type === "checkbox" && (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={Boolean(fieldValue)}
                      onChange={(e) =>
                        updateValue(
                          field.id,
                          e.target.checked
                        )
                      }
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-600">
                      Yes
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={save}
          disabled={!name || !selectedBlueprintId}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition disabled:opacity-50"
        >
          Save Contract
        </button>
      </div>
    </div>
  );
}
