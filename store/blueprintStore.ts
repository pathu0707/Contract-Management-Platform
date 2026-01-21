"use client";

import { Blueprint } from "@/types";
import { loadFromStorage, saveToStorage } from "@/lib/storage";
import { generateId } from "@/utils/generateId";

const STORAGE_KEY = "blueprints";

export function getBlueprints(): Blueprint[] {
  return loadFromStorage<Blueprint>(STORAGE_KEY);
}

export function saveBlueprint(
  name: string,
  fields: Blueprint["fields"]
): Blueprint {
  const blueprints = getBlueprints();

  const blueprint: Blueprint = {
    id: generateId(),
    name: name.trim(),
    fields,
    createdAt: new Date().toISOString(),
  };

  const updated = [...blueprints, blueprint];
  saveToStorage(STORAGE_KEY, updated);

  return blueprint;
}

export function findBlueprintById(
  id: string
): Blueprint | undefined {
  return getBlueprints().find((b) => b.id === id);
}
