"use client";

import { useState } from "react";
import FieldEditor from "./FieldEditor";
import FieldPalette from "./FieldPalette";

type FieldType = "text" | "date" | "signature" | "checkbox";

interface BlueprintField {
  id: string;
  type: FieldType;
  label: string;
  position: { x: number; y: number };
}

export default function BlueprintForm({
  onSave,
}: {
  onSave: (bp: {
    name: string;
    fields: BlueprintField[];
  }) => void;
}) {
  const [name, setName] = useState("");
  const [fields, setFields] = useState<BlueprintField[]>([]);

  const addField = (type: FieldType) => {
    setFields((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type,
        label: `${type.toUpperCase()} Field`,
        position: { x: 0, y: prev.length * 50 },
      },
    ]);
  };

  const updateField = (
    id: string,
    patch: Partial<BlueprintField>
  ) => {
    setFields((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, ...patch } : f
      )
    );
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const saveBlueprint = () => {
    if (!name.trim() || fields.length === 0) return;

    onSave({
      name: name.trim(),
      fields,
    });

    setName("");
    setFields([]);
  };

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-800">
        Create Blueprint
      </h2>

      <div className="mb-4">
        <label className="mb-1 block text-xs font-medium text-gray-700">
          Blueprint Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. NDA Template"
          className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="md:col-span-1">
          <FieldPalette onAdd={addField} />
        </div>

        <div className="md:col-span-3">
          <FieldEditor
            fields={fields}
            onUpdate={updateField}
            onRemove={removeField}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={saveBlueprint}
          disabled={!name || fields.length === 0}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition disabled:opacity-50"
        >
          Save Blueprint
        </button>
      </div>
    </div>
  );
}
