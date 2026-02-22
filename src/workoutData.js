// ─── WORKOUT DATABASE ───────────────────────────────────────────────────────
export const WORKOUTS = {
  upper: {
    bodyweight: [
      [
        { name: "Diamond Push-ups", sets: 4, reps: "12", rest: "45s", muscle: "Chest/Triceps" },
        { name: "Pike Push-ups", sets: 3, reps: "10", rest: "60s", muscle: "Shoulders" },
        { name: "Chin-ups (or Negatives)", sets: 4, reps: "8", rest: "60s", muscle: "Back/Biceps" },
        { name: "Archer Push-ups", sets: 3, reps: "8/side", rest: "45s", muscle: "Chest" },
        { name: "Inverted Rows", sets: 3, reps: "12", rest: "45s", muscle: "Back" },
        { name: "Tricep Dips (Chair)", sets: 3, reps: "15", rest: "45s", muscle: "Triceps" },
      ],
      [
        { name: "Wide Push-ups", sets: 4, reps: "15", rest: "45s", muscle: "Chest" },
        { name: "Pseudo Planche Push-ups", sets: 3, reps: "8", rest: "60s", muscle: "Shoulders/Chest" },
        { name: "Australian Pull-ups", sets: 4, reps: "12", rest: "45s", muscle: "Back" },
        { name: "Hindu Push-ups", sets: 3, reps: "12", rest: "45s", muscle: "Full Upper" },
        { name: "Commandos", sets: 3, reps: "10/side", rest: "45s", muscle: "Arms/Core" },
        { name: "Isometric Towel Curls", sets: 3, reps: "30s hold", rest: "30s", muscle: "Biceps" },
      ],
      [
        { name: "Decline Push-ups", sets: 4, reps: "12", rest: "45s", muscle: "Upper Chest" },
        { name: "Pull-up Negatives", sets: 4, reps: "6 (5s down)", rest: "90s", muscle: "Back/Biceps" },
        { name: "Sphinx Push-ups", sets: 3, reps: "10", rest: "45s", muscle: "Triceps" },
        { name: "Scapular Push-ups", sets: 3, reps: "15", rest: "30s", muscle: "Serratus" },
        { name: "Doorframe Rows", sets: 3, reps: "12", rest: "45s", muscle: "Back" },
        { name: "Plank Shoulder Taps", sets: 3, reps: "20", rest: "45s", muscle: "Core/Shoulders" },
      ],
      [
        { name: "Explosive Push-ups", sets: 4, reps: "8", rest: "60s", muscle: "Chest/Power" },
        { name: "Typewriter Push-ups", sets: 3, reps: "6/side", rest: "60s", muscle: "Chest/Arms" },
        { name: "Chin-up Holds", sets: 3, reps: "20s top + 20s mid", rest: "90s", muscle: "Back/Biceps" },
        { name: "Wall Handstand Hold", sets: 3, reps: "30s", rest: "60s", muscle: "Shoulders" },
        { name: "Bodyweight Skull Crushers", sets: 3, reps: "12", rest: "45s", muscle: "Triceps" },
        { name: "Superman Pulls", sets: 3, reps: "15", rest: "30s", muscle: "Upper Back" },
      ],
    ],
    basic: [
      [
        { name: "Dumbbell Bench Press", sets: 4, reps: "10", rest: "60s", muscle: "Chest" },
        { name: "Dumbbell Rows", sets: 4, reps: "10/side", rest: "60s", muscle: "Back" },
        { name: "Overhead Press", sets: 3, reps: "10", rest: "60s", muscle: "Shoulders" },
        { name: "Bicep Curls", sets: 3, reps: "12", rest: "45s", muscle: "Biceps" },
        { name: "Tricep Kickbacks", sets: 3, reps: "12", rest: "45s", muscle: "Triceps" },
        { name: "Lateral Raises", sets: 3, reps: "15", rest: "45s", muscle: "Side Delts" },
      ],
      [
        { name: "Incline Dumbbell Press", sets: 4, reps: "10", rest: "60s", muscle: "Upper Chest" },
        { name: "Bent Over Rows", sets: 4, reps: "10", rest: "60s", muscle: "Back" },
        { name: "Arnold Press", sets: 3, reps: "10", rest: "60s", muscle: "Shoulders" },
        { name: "Hammer Curls", sets: 3, reps: "12", rest: "45s", muscle: "Biceps/Forearms" },
        { name: "Overhead Tricep Extension", sets: 3, reps: "12", rest: "45s", muscle: "Triceps" },
        { name: "Face Pulls (Band)", sets: 3, reps: "15", rest: "45s", muscle: "Rear Delts" },
      ],
      [
        { name: "Floor Press", sets: 4, reps: "12", rest: "60s", muscle: "Chest/Triceps" },
        { name: "Renegade Rows", sets: 3, reps: "8/side", rest: "60s", muscle: "Back/Core" },
        { name: "Z-Press", sets: 3, reps: "10", rest: "60s", muscle: "Shoulders/Core" },
        { name: "Concentration Curls", sets: 3, reps: "10/side", rest: "45s", muscle: "Biceps" },
        { name: "Close-Grip Push-ups (Weighted)", sets: 3, reps: "12", rest: "45s", muscle: "Triceps" },
        { name: "Reverse Flyes", sets: 3, reps: "15", rest: "45s", muscle: "Upper Back" },
      ],
      [
        { name: "Dumbbell Pullover", sets: 4, reps: "12", rest: "60s", muscle: "Chest/Lats" },
        { name: "Single-Arm Row", sets: 4, reps: "10/side", rest: "60s", muscle: "Back" },
        { name: "Push Press", sets: 3, reps: "8", rest: "60s", muscle: "Shoulders/Power" },
        { name: "Zottman Curls", sets: 3, reps: "10", rest: "45s", muscle: "Full Arms" },
        { name: "Dumbbell Skullcrushers", sets: 3, reps: "12", rest: "45s", muscle: "Triceps" },
        { name: "Y-T-W Raises", sets: 2, reps: "10 each", rest: "45s", muscle: "Rotator Cuff" },
      ],
    ],
    gym: [
      [
        { name: "Barbell Bench Press", sets: 4, reps: "8", rest: "90s", muscle: "Chest" },
        { name: "Barbell Rows", sets: 4, reps: "8", rest: "90s", muscle: "Back" },
        { name: "Overhead Press", sets: 4, reps: "8", rest: "90s", muscle: "Shoulders" },
        { name: "Cable Flyes", sets: 3, reps: "12", rest: "60s", muscle: "Chest" },
        { name: "Lat Pulldown", sets: 3, reps: "10", rest: "60s", muscle: "Lats" },
        { name: "EZ-Bar Curls + Rope Pushdowns", sets: 3, reps: "12 superset", rest: "60s", muscle: "Arms" },
      ],
      [
        { name: "Incline Barbell Press", sets: 4, reps: "8", rest: "90s", muscle: "Upper Chest" },
        { name: "Weighted Pull-ups", sets: 4, reps: "6", rest: "120s", muscle: "Back/Biceps" },
        { name: "Seated DB Shoulder Press", sets: 4, reps: "10", rest: "60s", muscle: "Shoulders" },
        { name: "Pec Deck Machine", sets: 3, reps: "12", rest: "60s", muscle: "Chest" },
        { name: "Seated Cable Row", sets: 3, reps: "12", rest: "60s", muscle: "Mid Back" },
        { name: "Preacher Curls + Dips", sets: 3, reps: "10 superset", rest: "60s", muscle: "Arms" },
      ],
      [
        { name: "Dumbbell Bench Press", sets: 4, reps: "10", rest: "90s", muscle: "Chest" },
        { name: "T-Bar Row", sets: 4, reps: "10", rest: "90s", muscle: "Back" },
        { name: "Machine Shoulder Press", sets: 3, reps: "12", rest: "60s", muscle: "Shoulders" },
        { name: "Cable Crossovers", sets: 3, reps: "15", rest: "45s", muscle: "Chest" },
        { name: "Wide-Grip Lat Pulldown", sets: 3, reps: "12", rest: "60s", muscle: "Lats" },
        { name: "Cable Curls + Overhead Ext.", sets: 3, reps: "12 superset", rest: "60s", muscle: "Arms" },
      ],
      [
        { name: "Landmine Press", sets: 4, reps: "10/side", rest: "60s", muscle: "Chest/Shoulders" },
        { name: "Meadows Row", sets: 4, reps: "10/side", rest: "60s", muscle: "Back" },
        { name: "Behind-the-Neck Press (Smith)", sets: 3, reps: "10", rest: "60s", muscle: "Shoulders" },
        { name: "Chest Dips (Weighted)", sets: 3, reps: "10", rest: "90s", muscle: "Chest/Triceps" },
        { name: "Straight-Arm Pulldown", sets: 3, reps: "12", rest: "45s", muscle: "Lats" },
        { name: "Spider Curls + Tricep Dips", sets: 3, reps: "12 superset", rest: "60s", muscle: "Arms" },
      ],
    ],
  },
  lower: {
    bodyweight: [
      [
        { name: "Pistol Squat Progressions", sets: 4, reps: "8/side", rest: "60s", muscle: "Quads/Glutes" },
        { name: "Nordic Curl Negatives", sets: 3, reps: "5 (5s down)", rest: "90s", muscle: "Hamstrings" },
        { name: "Bulgarian Split Squats", sets: 3, reps: "12/side", rest: "60s", muscle: "Quads/Glutes" },
        { name: "Glute Bridges (Single Leg)", sets: 3, reps: "15/side", rest: "45s", muscle: "Glutes" },
        { name: "Calf Raises (Single Leg)", sets: 4, reps: "20/side", rest: "30s", muscle: "Calves" },
        { name: "Wall Sit", sets: 3, reps: "45s", rest: "45s", muscle: "Quads" },
      ],
      [
        { name: "Jump Squats", sets: 4, reps: "12", rest: "60s", muscle: "Quads/Power" },
        { name: "Reverse Lunges", sets: 3, reps: "12/side", rest: "60s", muscle: "Quads/Glutes" },
        { name: "Hip Thrusts (Elevated)", sets: 4, reps: "15", rest: "60s", muscle: "Glutes" },
        { name: "Sissy Squats", sets: 3, reps: "10", rest: "45s", muscle: "Quads" },
        { name: "Donkey Kicks", sets: 3, reps: "15/side", rest: "30s", muscle: "Glutes" },
        { name: "Tibialis Raises", sets: 3, reps: "20", rest: "30s", muscle: "Tibialis" },
      ],
      [
        { name: "Shrimp Squats", sets: 4, reps: "6/side", rest: "60s", muscle: "Quads/Balance" },
        { name: "Broad Jumps", sets: 3, reps: "8", rest: "60s", muscle: "Full Lower/Power" },
        { name: "Step-ups (High Box)", sets: 3, reps: "10/side", rest: "60s", muscle: "Quads/Glutes" },
        { name: "Hamstring Slides", sets: 3, reps: "10", rest: "45s", muscle: "Hamstrings" },
        { name: "Sumo Squat Pulses", sets: 3, reps: "20", rest: "45s", muscle: "Inner Thigh/Glutes" },
        { name: "Seated Calf Raises (Weighted)", sets: 4, reps: "20", rest: "30s", muscle: "Calves" },
      ],
      [
        { name: "Skater Squats", sets: 4, reps: "8/side", rest: "60s", muscle: "Quads/Balance" },
        { name: "Glute Ham Raises", sets: 3, reps: "8", rest: "60s", muscle: "Hamstrings/Glutes" },
        { name: "Curtsy Lunges", sets: 3, reps: "12/side", rest: "45s", muscle: "Glutes/Abductors" },
        { name: "Box Jumps", sets: 3, reps: "8", rest: "60s", muscle: "Power/Quads" },
        { name: "Fire Hydrants", sets: 3, reps: "15/side", rest: "30s", muscle: "Glute Med" },
        { name: "Calf Raises (Explosive)", sets: 3, reps: "15", rest: "30s", muscle: "Calves" },
      ],
    ],
    basic: [
      [
        { name: "Goblet Squats", sets: 4, reps: "12", rest: "60s", muscle: "Quads/Glutes" },
        { name: "Romanian Deadlift (DB)", sets: 4, reps: "10", rest: "60s", muscle: "Hamstrings/Glutes" },
        { name: "Walking Lunges", sets: 3, reps: "12/side", rest: "60s", muscle: "Quads/Glutes" },
        { name: "Dumbbell Hip Thrusts", sets: 3, reps: "15", rest: "60s", muscle: "Glutes" },
        { name: "DB Calf Raises", sets: 4, reps: "15", rest: "30s", muscle: "Calves" },
        { name: "Dumbbell Swings", sets: 3, reps: "15", rest: "45s", muscle: "Posterior Chain" },
      ],
      [
        { name: "Sumo Squats (DB)", sets: 4, reps: "12", rest: "60s", muscle: "Inner Thigh/Glutes" },
        { name: "Single-Leg RDL", sets: 3, reps: "10/side", rest: "60s", muscle: "Hamstrings/Balance" },
        { name: "Reverse Lunges (DB)", sets: 3, reps: "10/side", rest: "60s", muscle: "Quads/Glutes" },
        { name: "Frog Pumps (Weighted)", sets: 3, reps: "20", rest: "45s", muscle: "Glutes" },
        { name: "DB Step-ups", sets: 3, reps: "10/side", rest: "60s", muscle: "Quads" },
        { name: "Seated Calf Raises", sets: 4, reps: "20", rest: "30s", muscle: "Calves" },
      ],
      [
        { name: "Bulgarian Split Squats (DB)", sets: 4, reps: "10/side", rest: "60s", muscle: "Quads/Glutes" },
        { name: "DB Good Mornings", sets: 3, reps: "12", rest: "60s", muscle: "Hamstrings/Low Back" },
        { name: "Lateral Lunges (DB)", sets: 3, reps: "10/side", rest: "45s", muscle: "Adductors/Quads" },
        { name: "Glute Bridge March", sets: 3, reps: "10/side", rest: "45s", muscle: "Glutes/Core" },
        { name: "DB Squat Jumps", sets: 3, reps: "8", rest: "60s", muscle: "Power/Quads" },
        { name: "Farmer's Walk", sets: 3, reps: "40s", rest: "45s", muscle: "Full Body" },
      ],
      [
        { name: "Front Squats (DB)", sets: 4, reps: "10", rest: "60s", muscle: "Quads/Core" },
        { name: "Stiff-Leg Deadlift (DB)", sets: 4, reps: "10", rest: "60s", muscle: "Hamstrings" },
        { name: "Curtsy Lunges (DB)", sets: 3, reps: "10/side", rest: "45s", muscle: "Glutes" },
        { name: "Weighted Wall Sit", sets: 3, reps: "45s", rest: "60s", muscle: "Quads" },
        { name: "Single-Leg Calf Raise (DB)", sets: 3, reps: "15/side", rest: "30s", muscle: "Calves" },
        { name: "KB Swings (or DB)", sets: 3, reps: "15", rest: "45s", muscle: "Posterior Chain" },
      ],
    ],
    gym: [
      [
        { name: "Barbell Back Squat", sets: 4, reps: "6", rest: "120s", muscle: "Quads/Glutes" },
        { name: "Romanian Deadlift", sets: 4, reps: "8", rest: "90s", muscle: "Hamstrings/Glutes" },
        { name: "Leg Press", sets: 3, reps: "12", rest: "90s", muscle: "Quads" },
        { name: "Leg Curls", sets: 3, reps: "12", rest: "60s", muscle: "Hamstrings" },
        { name: "Hip Thrust (Barbell)", sets: 3, reps: "10", rest: "60s", muscle: "Glutes" },
        { name: "Standing Calf Raises", sets: 4, reps: "15", rest: "45s", muscle: "Calves" },
      ],
      [
        { name: "Front Squat", sets: 4, reps: "8", rest: "120s", muscle: "Quads/Core" },
        { name: "Sumo Deadlift", sets: 4, reps: "6", rest: "120s", muscle: "Glutes/Inner Thigh" },
        { name: "Hack Squat", sets: 3, reps: "10", rest: "90s", muscle: "Quads" },
        { name: "GHR (Glute Ham Raise)", sets: 3, reps: "10", rest: "60s", muscle: "Hamstrings" },
        { name: "Cable Pull-through", sets: 3, reps: "15", rest: "45s", muscle: "Glutes" },
        { name: "Seated Calf Raises", sets: 4, reps: "20", rest: "30s", muscle: "Calves" },
      ],
      [
        { name: "Pause Squats", sets: 4, reps: "6 (3s pause)", rest: "120s", muscle: "Quads/Power" },
        { name: "Conventional Deadlift", sets: 4, reps: "5", rest: "120s", muscle: "Full Posterior" },
        { name: "Walking Lunges (Barbell)", sets: 3, reps: "10/side", rest: "90s", muscle: "Quads/Glutes" },
        { name: "Leg Extension", sets: 3, reps: "15", rest: "60s", muscle: "Quads" },
        { name: "Reverse Hyperextension", sets: 3, reps: "12", rest: "60s", muscle: "Low Back/Glutes" },
        { name: "Donkey Calf Raises", sets: 4, reps: "15", rest: "45s", muscle: "Calves" },
      ],
      [
        { name: "Bulgarian Split Squat (BB)", sets: 4, reps: "8/side", rest: "90s", muscle: "Quads/Glutes" },
        { name: "Trap Bar Deadlift", sets: 4, reps: "8", rest: "120s", muscle: "Full Lower" },
        { name: "Pendulum Squat / Sissy", sets: 3, reps: "12", rest: "60s", muscle: "Quads" },
        { name: "Nordic Curls", sets: 3, reps: "6", rest: "90s", muscle: "Hamstrings" },
        { name: "Abductor / Adductor Machine", sets: 3, reps: "15 each", rest: "45s", muscle: "Hip Muscles" },
        { name: "Calf Press (Leg Press)", sets: 4, reps: "20", rest: "30s", muscle: "Calves" },
      ],
    ],
  },
};

export const STRETCHES = {
  upper: [
    { name: "Doorway Chest Stretch", duration: "30s/side", icon: "🚪" },
    { name: "Cross-Body Shoulder", duration: "30s/side", icon: "💪" },
    { name: "Tricep Overhead Stretch", duration: "30s/side", icon: "🙆" },
    { name: "Cat-Cow Spine", duration: "60s", icon: "🐱" },
    { name: "Thread the Needle", duration: "30s/side", icon: "🧵" },
    { name: "Neck Rolls", duration: "30s each way", icon: "🔄" },
  ],
  lower: [
    { name: "Standing Quad Stretch", duration: "30s/side", icon: "🦵" },
    { name: "Pigeon Pose", duration: "45s/side", icon: "🐦" },
    { name: "Standing Hamstring", duration: "30s/side", icon: "🏋️" },
    { name: "Hip Flexor Lunge Stretch", duration: "30s/side", icon: "🧘" },
    { name: "Butterfly Stretch", duration: "45s", icon: "🦋" },
    { name: "Seated Calf Stretch", duration: "30s/side", icon: "🦶" },
  ],
};

export const YOGA_FLOWS = [
  {
    name: "Sun Salutation Power Flow",
    moves: ["Mountain Pose", "Forward Fold", "Halfway Lift", "Chaturanga", "Upward Dog", "Downward Dog", "Warrior I", "Warrior II", "Triangle", "Tree Pose"],
    duration: "20 min",
    focus: "Full Body Activation",
  },
  {
    name: "Hip Opening Vinyasa",
    moves: ["Child's Pose", "Cat-Cow", "Low Lunge", "Lizard Pose", "Pigeon", "Happy Baby", "Supine Twist", "Reclined Butterfly", "Savasana"],
    duration: "25 min",
    focus: "Flexibility & Recovery",
  },
  {
    name: "Core Ignite Yoga",
    moves: ["Plank Hold", "Side Plank", "Boat Pose", "Crow Prep", "Warrior III", "Half Moon", "Chair Pose", "Twisted Chair", "Eagle Pose"],
    duration: "20 min",
    focus: "Core & Balance",
  },
];

export const ANIMAL_FLOWS = [
  {
    name: "Beast Mode Circuit",
    moves: ["Beast Hold", "Beast Reach", "Lateral Beast", "Crab Reach", "Scorpion Reach", "Front Kickthrough", "Side Kickthrough"],
    duration: "15 min",
    focus: "Primal Movement",
  },
  {
    name: "Ape Flow",
    moves: ["Ape Squat", "Ape Reach", "Frog Jump", "Underswitch", "Scorpion", "Wave Unload", "Full Switchback"],
    duration: "18 min",
    focus: "Agility & Mobility",
  },
  {
    name: "Ground Force",
    moves: ["Loaded Beast", "Beast to Crab", "Crab Walk", "Lateral Ape", "Front Step-through", "Side Kickthrough", "Scorpion Reach"],
    duration: "20 min",
    focus: "Ground Mobility",
  },
];

// ─── INTENSITY CALCULATOR ──────────────────────────────────────────────────
export function calcIntensity(profile) {
  if (!profile) return "moderate";
  const bmi = profile.weight / ((profile.height / 100) ** 2);
  const strength = profile.liftCapacity || "moderate";
  if (strength === "beginner" || bmi > 30) return "light";
  if (strength === "advanced" && bmi < 28) return "intense";
  return "moderate";
}

export function adjustWorkout(exercises, intensity) {
  const multipliers = { light: 0.75, moderate: 1, intense: 1.25 };
  const m = multipliers[intensity];
  return exercises.map(ex => ({
    ...ex,
    sets: Math.max(2, Math.round(ex.sets * m)),
    reps: ex.reps,
  }));
}
