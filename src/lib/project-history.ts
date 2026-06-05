export const DASHBOARD_HISTORY_STORAGE_KEY = "lokoai:dashboard-history";
export const DASHBOARD_DELETED_HISTORY_STORAGE_KEY = "lokoai:dashboard-history:deleted";

type ProjectLike = {
  id: string;
};

function readStoredProjects(): ProjectLike[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(DASHBOARD_HISTORY_STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed)
      ? parsed.filter((item): item is ProjectLike => Boolean(item) && typeof item === "object" && "id" in item && typeof (item as ProjectLike).id === "string")
      : [];
  } catch {
    return [];
  }
}

export function removeStoredProject(projectId: string) {
  if (typeof window === "undefined") return;

  try {
    const nextProjects = readStoredProjects().filter((project) => project.id !== projectId);
    window.localStorage.setItem(DASHBOARD_HISTORY_STORAGE_KEY, JSON.stringify(nextProjects));
  } catch {
    // ignore storage failures
  }
}

export function getDeletedStoredProjectIds() {
  if (typeof window === "undefined") return new Set<string>();

  try {
    const raw = window.localStorage.getItem(DASHBOARD_DELETED_HISTORY_STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : []);
  } catch {
    return new Set<string>();
  }
}

export function markStoredProjectDeleted(projectId: string) {
  if (typeof window === "undefined") return;

  try {
    const deletedIds = getDeletedStoredProjectIds();
    deletedIds.add(projectId);
    window.localStorage.setItem(
      DASHBOARD_DELETED_HISTORY_STORAGE_KEY,
      JSON.stringify(Array.from(deletedIds).slice(-200))
    );
    removeStoredProject(projectId);
  } catch {
    // ignore storage failures
  }
}
