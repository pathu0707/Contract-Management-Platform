"use client";

type FieldType = "text" | "date" | "signature" | "checkbox";

const FIELD_TYPES: {
  type: FieldType;
  label: string;
}[] = [
  { type: "text", label: "Text" },
  { type: "date", label: "Date" },
  { type: "signature", label: "Signature" },
  { type: "checkbox", label: "Checkbox" },
];

export default function FieldPalette({
  onAdd,
}: {
  onAdd: (type: FieldType) => void;
}) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
        Field Palette
      </h3>

      <div className="space-y-2">
        {FIELD_TYPES.map((f) => (
          <button
            key={f.type}
            onClick={() => onAdd(f.type)}
            className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <span>{f.label}</span>
            <span className="text-xs text-gray-400">
              {f.type}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
