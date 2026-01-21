"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveBlueprint } from "@/store/blueprintStore";

type FieldType = "text" | "date" | "signature" | "checkbox";

interface BlueprintField {
  id: string;
  type: FieldType;
  label: string;
  position: {
    x: number;
    y: number;
  };
}

export default function CreateBlueprintPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [fields, setFields] = useState<BlueprintField[]>([]);
  const [newFieldType, setNewFieldType] = useState<FieldType>("text");
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldX, setNewFieldX] = useState<number>(0);
  const [newFieldY, setNewFieldY] = useState<number>(0);

  const generateId = () => Math.random().toString(36).substring(2, 12);

  const addField = () => {
    if (!newFieldLabel.trim()) {
      alert("Please enter a field label");
      return;
    }

    const field: BlueprintField = {
      id: generateId(),
      type: newFieldType,
      label: newFieldLabel.trim(),
      position: { x: newFieldX, y: newFieldY },
    };

    setFields((prev) => [...prev, field]);
    setNewFieldLabel("");
    setNewFieldX(0);
    setNewFieldY(0);
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const saveHandler = () => {
    if (!name.trim()) {
      alert("Blueprint name is required");
      return;
    }

    if (fields.length === 0) {
      alert("Please add at least one field");
      return;
    }

    saveBlueprint(name.trim(), fields);
    alert("Blueprint created successfully!");
    router.push("/blueprints");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-100">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Create Blueprint
          </h1>

          <button
            onClick={saveHandler}
            disabled={!name || fields.length === 0}
            className="rounded-xl bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 hover:shadow-lg transition disabled:opacity-50"
          >
            Save Blueprint
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-10">
        {/* Form */}
        <div className="rounded-xl border bg-white p-6 shadow-lg">
          <h2 className="text-sm font-semibold mb-4 text-slate-700">
            Blueprint Details
          </h2>

          <label className="block text-xs font-medium mb-1 text-slate-600">
            Blueprint Name
          </label>
          <input
            className="w-full rounded-lg border px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Employee Agreement"
          />

          <h3 className="text-sm font-semibold mb-3 text-slate-700">
            Add Field
          </h3>

          <select
            className="w-full rounded-lg border px-3 py-2 mb-3 text-sm focus:ring-2 focus:ring-emerald-400"
            value={newFieldType}
            onChange={(e) => setNewFieldType(e.target.value as FieldType)}
          >
            <option value="text">Text</option>
            <option value="date">Date</option>
            <option value="signature">Signature</option>
            <option value="checkbox">Checkbox</option>
          </select>

          <input
            className="w-full rounded-lg border px-3 py-2 mb-3 text-sm focus:ring-2 focus:ring-emerald-400"
            value={newFieldLabel}
            onChange={(e) => setNewFieldLabel(e.target.value)}
            placeholder="Field Label"
          />

          <div className="grid grid-cols-2 gap-3 mb-4">
            <input
              type="number"
              placeholder="X"
              value={newFieldX}
              onChange={(e) => setNewFieldX(Number(e.target.value))}
              className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400"
            />
            <input
              type="number"
              placeholder="Y"
              value={newFieldY}
              onChange={(e) => setNewFieldY(Number(e.target.value))}
              className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <button
            onClick={addField}
            className="w-full rounded-lg bg-slate-800 py-2 text-white text-sm font-semibold hover:bg-slate-900 transition"
          >
            Add Field
          </button>
        </div>

        {/* Preview */}
        <div className="md:col-span-2 rounded-xl border bg-white p-6 shadow-lg">
          <h2 className="text-sm font-semibold mb-4 text-slate-700">
            Fields Preview
          </h2>

          {fields.length === 0 ? (
            <p className="text-slate-500 text-sm italic">
              No fields added yet
            </p>
          ) : (
            <ul className="space-y-3">
              {fields.map((field, i) => (
                <li
                  key={field.id}
                  className="flex justify-between items-center border rounded-lg px-4 py-3 hover:bg-slate-50 transition"
                >
                  <div>
                    <p className="font-medium text-sm text-slate-900">
                      {i + 1}. {field.label}
                    </p>
                    <p className="text-xs text-slate-500">
                      {field.type} • ({field.position.x},{field.position.y})
                    </p>
                  </div>

                  <button
                    onClick={() => removeField(field.id)}
                    className="text-xs font-semibold text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
