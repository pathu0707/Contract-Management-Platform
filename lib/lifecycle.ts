import { ContractStatus } from "@/types";

export const STATUS_FLOW: Record<
  ContractStatus,
  ContractStatus[]
> = {
  CREATED: ["APPROVED", "REVOKED"],
  APPROVED: ["SENT"],
  SENT: ["SIGNED", "REVOKED"],
  SIGNED: ["LOCKED"],
  LOCKED: [],
  REVOKED: [],
};

export function canTransition(
  from: ContractStatus,
  to: ContractStatus
): boolean {
  return STATUS_FLOW[from].includes(to);
}
