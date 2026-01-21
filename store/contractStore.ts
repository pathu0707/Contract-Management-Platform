"use client";

import { Contract, ContractStatus } from "@/types";
import { loadFromStorage, saveToStorage } from "@/lib/storage";
import { canTransition } from "@/lib/lifecycle";
import { generateId } from "@/utils/generateId";

const STORAGE_KEY = "contracts";

export function getContracts(): Contract[] {
  return loadFromStorage<Contract>(STORAGE_KEY);
}

export function saveContract(
  input: Omit<Contract, "id" | "createdAt">
): Contract {
  const contracts = getContracts();

  const contract: Contract = {
    ...input,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };

  const updated = [...contracts, contract];
  saveToStorage(STORAGE_KEY, updated);

  return contract;
}

export function findContractById(
  id: string
): Contract | undefined {
  return getContracts().find((c) => c.id === id);
}

export function updateContractStatus(
  id: string,
  next: ContractStatus
): Contract | undefined {
  const contracts = getContracts();
  const contract = contracts.find((c) => c.id === id);

  if (!contract) return;
  if (!canTransition(contract.status, next)) return;

  const updated: Contract = {
    ...contract,
    status: next,
  };

  const saved = contracts.map((c) =>
    c.id === id ? updated : c
  );

  saveToStorage(STORAGE_KEY, saved);
  return updated;
}
