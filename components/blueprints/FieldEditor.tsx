"use client";

type FieldType = "text" | "date" | "signature" | "checkbox";

interface BlueprintField {
  id: string;
  type: FieldType;
  label: string;
  position: { x: number; y: number };
}

export default function FieldEditor({
  fields,
  onUpdate,
  onRemove,
}: {
  fields: BlueprintField[];
  onUpdate: (id: string, patch: Partial<BlueprintField>) => void;
  onRemove: (id: string) => void;
}) {
  if (fields.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-dashed bg-gray-50 p-6 text-sm text-gray-500">
        Add fields from the palette to build your blueprint.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex items-center gap-3 rounded-lg border bg-white p-3 shadow-sm"
        >
          <div className="w-20 text-xs font-medium uppercase text-gray-600">
            {field.type}
          </div>

          <input
            type="text"
            value={field.label}
            onChange={(e) =>
              onUpdate(field.id, { label: e.target.value })
            }
            className="flex-1 rounded-md border px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
          />

          <input
            type="number"
            value={field.position.y}
            onChange={(e) =>
              onUpdate(field.id, {
                position: {
                  ...field.position,
                  y: Number(e.target.value),
                },
              })
            }
            className="w-20 rounded-md border px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
          />

          <button
            onClick={() => onRemove(field.id)}
            className="text-xs text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
