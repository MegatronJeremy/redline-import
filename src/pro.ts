/** Pro gate. Every Pro feature asks `gate.has(feature)` first. Pro code never touches the network. */
export type ProFeature = "trackedChanges" | "batch";

export interface ProGate {
  has(feature: ProFeature): boolean;
}

export class FreeGate implements ProGate {
  has(_feature: ProFeature): boolean {
    return false;
  }
}

export class UnlockedGate implements ProGate {
  has(_feature: ProFeature): boolean {
    return true;
  }
}

export const PRO_FEATURE_LABELS: Record<ProFeature, string> = {
  trackedChanges: "tracked changes shown as ==inserted== and ~~deleted~~ (or accept-all / reject-all)",
  batch: "batch import of several .docx files at once",
};
