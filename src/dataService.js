import { supabase } from "./supabaseClient";

// ── camelCase ↔ snake_case helpers ──────────────────────────────────────────
const toSnake = (obj) => {
  const map = {
    profileKey: "profile_key",
    lastBaseline: "last_baseline",
    createdAt: "created_at",
    totalWorkouts: "total_workouts",
    workoutIdx: "workout_idx",
    updatedAt: "updated_at",
  };
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    out[map[k] || k] = v;
  }
  return out;
};

const toCamel = (obj) => {
  const map = {
    profile_key: "profileKey",
    last_baseline: "lastBaseline",
    created_at: "createdAt",
    total_workouts: "totalWorkouts",
    workout_idx: "workoutIdx",
    updated_at: "updatedAt",
    body_part: "bodyPart",
    sets_completed: "setsCompleted",
    total_sets: "totalSets",
    exercises_completed: "exercisesCompleted",
    total_reps: "totalReps",
    duration_sec: "durationSec",
  };
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    out[map[k] || k] = v;
  }
  return out;
};

// ── User Stats ──────────────────────────────────────────────────────────────

export async function loadUserStats(profileKey) {
  const { data, error } = await supabase
    .from("user_stats")
    .select("*")
    .eq("profile_key", profileKey)
    .single();

  if (error || !data) return {};
  return toCamel(data);
}

export async function saveUserStats(profileKey, overrides = {}) {
  const current = await loadUserStats(profileKey);
  const merged = {
    profileKey,
    weight: current.weight ?? 160,
    lastBaseline: current.lastBaseline ?? 0,
    createdAt: current.createdAt ?? 0,
    totalWorkouts: current.totalWorkouts ?? 0,
    mode: current.mode ?? "bodyweight",
    workoutIdx: current.workoutIdx ?? 0,
    ...overrides,
  };
  const row = toSnake(merged);
  row.updated_at = new Date().toISOString();

  const { error } = await supabase
    .from("user_stats")
    .upsert(row, { onConflict: "profile_key" });

  if (error) console.error("saveUserStats error:", error);
}

// ── Workout Log ─────────────────────────────────────────────────────────────

export async function loadWorkoutLog(profileKey) {
  const { data, error } = await supabase
    .from("workout_log")
    .select("*")
    .eq("profile_key", profileKey)
    .order("date", { ascending: false });

  if (error || !data) return [];
  return data.map(toCamel);
}

export async function addWorkoutLogEntry(profileKey, entry) {
  const row = {
    profile_key: profileKey,
    date: entry.date,
    body_part: entry.bodyPart,
    mode: entry.mode,
    sets_completed: entry.setsCompleted ?? 0,
    total_sets: entry.totalSets ?? 0,
    exercises_completed: entry.exercisesCompleted ?? 0,
    total_reps: entry.totalReps ?? 0,
    duration_sec: entry.durationSec ?? 0,
  };

  const { error } = await supabase.from("workout_log").insert(row);
  if (error) console.error("addWorkoutLogEntry error:", error);
}
