import { useState, useEffect, useRef } from "react";
import { ExerciseFigure } from "./exerciseFigures";
import { WORKOUTS, STRETCHES, YOGA_FLOWS, ANIMAL_FLOWS, calcIntensity, adjustWorkout } from "./workoutData";
import { loadUserStats, saveUserStats, loadWorkoutLog, addWorkoutLogEntry } from "./dataService";

// ── Welcome Screen ──────────────────────────────────────────────────────────
function WelcomeScreen({ onStart }) {
  return (
    <div className="bg-black font-display text-white min-h-screen flex flex-col relative overflow-hidden selection:bg-[#59f20d] selection:text-black">
      {/* Noise overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')" }}
      />
      {/* Background GOOOO text */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="relative w-full h-full flex flex-col justify-between opacity-10 select-none">
          <span className="text-[20vh] font-black leading-none text-white tracking-tighter whitespace-nowrap -ml-20">GOOOO</span>
          <span className="text-[20vh] font-black leading-none tracking-tighter whitespace-nowrap self-end -mr-20" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)', color: 'transparent' }}>GOOOO</span>
          <span className="text-[20vh] font-black leading-none text-white tracking-tighter whitespace-nowrap -ml-10">GOOOO</span>
          <span className="text-[20vh] font-black leading-none tracking-tighter whitespace-nowrap self-end -mr-10" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)', color: 'transparent' }}>GOOOO</span>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 relative z-10 flex flex-col justify-center items-center px-6 w-full max-w-lg mx-auto pb-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#59f20d]/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative flex flex-col gap-6 items-center w-full mix-blend-lighten text-center" style={{ transform: 'skewX(-12deg)' }}>
          <h1 className="text-6xl sm:text-7xl font-black italic tracking-tighter leading-[0.85] text-white drop-shadow-lg w-full">
            <span className="block">ARE YOU</span>
            <span className="block text-[#59f20d]" style={{ textShadow: '0 0 20px rgba(89,242,13,0.3)' }}>READY</span>
            <span className="block">TO</span>
            <span className="block">WORKOUT?</span>
          </h1>
          <div className="h-1.5 w-24 bg-[#59f20d] mt-2" />
          <p className="text-neutral-300 text-sm sm:text-base font-medium tracking-[0.15em] uppercase not-italic max-w-[320px] leading-relaxed">
            Push your limits. <br /> Break the barriers.
          </p>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="relative z-20 w-full p-8 pb-12 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="max-w-md mx-auto w-full">
          <button
            onClick={onStart}
            className="group relative w-full h-16 bg-[#59f20d] rounded-full overflow-hidden flex items-center justify-center transition-transform active:scale-95 duration-100 shadow-[0_0_30px_rgba(89,242,13,0.3)] hover:shadow-[0_0_50px_rgba(89,242,13,0.5)] cursor-pointer border-none"
          >
            <span className="relative z-10 text-black text-xl font-black tracking-widest uppercase flex items-center gap-2">
              Lets GOOOO
              <span className="material-symbols-outlined text-2xl font-bold">arrow_forward</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Hardcoded Profiles ──────────────────────────────────────────────────────
const DEFAULT_PROFILES = {
  dillon: { name: "Dillon", height: 180, weight: 170, liftCapacity: "advanced" },
  lyn: { name: "Lyn", height: 160, weight: 105, liftCapacity: "moderate" },
  guest: { name: "Guest", height: 173, weight: 160, liftCapacity: "beginner" },
};

// ── Profile Picker ──────────────────────────────────────────────────────────
function ProfilePicker({ onSelect, streaks }) {
  const [selected, setSelected] = useState("dillon");

  const getStreak = (key) => streaks[key] ?? 0;

  const profiles = [
    { key: "dillon", label: "Dillon", icon: "person" },
    { key: "lyn", label: "Lyn", icon: "person" },
    { key: "guest", label: "Guest", icon: "person_add" },
  ];

  return (
    <div className="font-display bg-[#121212] text-slate-100 min-h-screen antialiased selection:bg-[#80f20d] selection:text-black">
    <div className="max-w-md mx-auto flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-[#121212]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="w-10"></div>
        <div className="text-sm font-medium opacity-60 uppercase tracking-widest">Step 1 of 2</div>
        <div className="w-10"></div>
      </header>

      {/* Progress Indicator */}
      <div className="px-6 pb-2">
        <div className="flex gap-2 w-full h-1.5">
          <div className="h-full flex-1 rounded-full bg-[#80f20d] shadow-[0_0_10px_rgba(128,242,13,0.8)]"></div>
          <div className="h-full flex-1 rounded-full bg-[#2d2d2d]"></div>
        </div>
      </div>

      <main className="flex-1 px-6 pt-2 pb-32 flex flex-col">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold italic tracking-tight leading-[0.95] mb-4 uppercase">
            Who is<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#80f20d] to-white">Training?</span>
          </h1>
          <p className="text-slate-400 text-lg font-light leading-relaxed max-w-sm">
            Select a profile to load your personalized baseline.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {profiles.map((p) => {
            const isSelected = selected === p.key;
            const streak = getStreak(p.key);

            return (
              <label
                key={p.key}
                onClick={() => setSelected(p.key)}
                className={`group relative flex items-center gap-5 p-5 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? "bg-[#1a1a1a] border-2 border-[#80f20d] shadow-[0_0_20px_-5px_rgba(128,242,13,0.3)] scale-[1.02]"
                    : "bg-[#1e1e1e] border-2 border-transparent hover:border-[#2d2d2d]"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 h-6 w-6 flex items-center justify-center rounded-full bg-[#80f20d] text-black">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                )}
                <div className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isSelected
                    ? "bg-[#80f20d] text-black font-bold"
                    : "bg-[#2d2d2d] text-slate-400 group-hover:text-[#80f20d]"
                }`}>
                  <span className="material-symbols-outlined text-[28px]">{p.icon}</span>
                </div>
                <div className="relative z-10 flex flex-col pr-6">
                  <span className={`text-xl font-bold tracking-tight mb-1 ${isSelected ? "text-white" : "group-hover:text-white"} transition-colors`}>{p.label}</span>
                  <span className={`text-sm flex items-center gap-1 ${
                    isSelected ? "text-[#80f20d] font-medium" : "text-slate-400 font-light"
                  }`}>
                    {streak > 0 ? (isSelected ? `🔥 ${streak} Days Streak` : `⚡ ${streak} Days Streak`) : "No history saved"}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </main>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#121212] via-[#121212] to-transparent z-40 pb-8 max-w-md mx-auto">
        <button
          onClick={() => onSelect(selected)}
          className="group w-full bg-[#80f20d] hover:bg-[#66c20a] text-black h-16 rounded-full font-bold text-lg uppercase tracking-wide flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(128,242,13,0.3)] hover:shadow-[0_0_30px_rgba(128,242,13,0.5)] active:scale-95"
        >
          Select Profile
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </div>
    </div>
    </div>
  );
}

// ── Meditation Timer ────────────────────────────────────────────────────────
function MeditationTimer({ onClose }) {
  const [duration, setDuration] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const intervalRef = useRef(null);

  // Breathing phase: 4s inhale, 4s exhale = 8s cycle
  const [breathPhase, setBreathPhase] = useState("INHALE");
  const breathRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsDone(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Breathing phase toggle
  useEffect(() => {
    if (isRunning) {
      breathRef.current = setInterval(() => {
        setBreathPhase(p => p === "INHALE" ? "EXHALE" : "INHALE");
      }, 4000);
    }
    return () => clearInterval(breathRef.current);
  }, [isRunning]);

  const startMeditation = (seconds) => {
    setDuration(seconds);
    setTimeLeft(seconds);
    setIsRunning(true);
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  const tips = [
    "Expand your diaphragm fully. Control the intake.",
    "Release tension from your shoulders and jaw.",
    "Let each exhale carry away remaining stress.",
  ];
  const tipIdx = duration ? Math.floor((duration - timeLeft) / 15) % tips.length : 0;

  // ── Duration Choice Screen ──
  if (!duration && !isDone) {
    return (
      <div className="bg-[#111921] font-display min-h-screen antialiased overflow-hidden">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-full h-full min-h-screen flex flex-col justify-between p-6 overflow-y-auto">
          {/* Ambient Background Glow */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-[#197fe6]/10 rounded-full blur-[120px] opacity-40"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#197fe6]/5 rounded-full blur-[100px] opacity-30"></div>
          </div>

          {/* Header */}
          <header className="flex items-center justify-between w-full py-2 z-10">
            <button onClick={onClose} className="flex items-center justify-center w-12 h-12 rounded-full text-slate-100 hover:bg-[#1a2632] transition-colors duration-200 cursor-pointer bg-transparent border-none">
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <div className="text-sm font-medium tracking-wide text-[#93adc8] uppercase opacity-60">Cool Down</div>
            <div className="w-12 h-12"></div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex flex-col justify-center w-full max-w-sm mx-auto gap-8 my-8 z-10">
            {/* Title */}
            <div className="space-y-3 text-center mb-6">
              <h1 className="text-4xl font-light tracking-tight text-slate-100 leading-[1.1]">
                Finish with <br /><span className="font-bold text-[#197fe6]">clarity</span>
              </h1>
              <p className="text-base text-[#93adc8] font-normal max-w-[280px] mx-auto leading-relaxed">
                Select a duration to reset your mind and lock in your progress.
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-4 w-full">
              {/* 3 min */}
              <button
                onClick={() => startMeditation(180)}
                className="group relative w-full p-1 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer bg-transparent border-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a2632] to-[#111921] border border-white/5 rounded-full"></div>
                <div className="absolute inset-0 bg-[#197fe6]/0 group-hover:bg-[#197fe6]/10 transition-colors duration-500 rounded-full"></div>
                <div className="relative flex items-center justify-between px-6 py-5 h-20">
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-2xl font-bold text-white tracking-tight group-hover:text-[#197fe6] transition-colors">3 min</span>
                    <span className="text-xs font-medium text-[#93adc8] uppercase tracking-wider">Quick Reset</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#1a2632] flex items-center justify-center group-hover:bg-[#197fe6] group-hover:text-white transition-all duration-300 text-[#93adc8]">
                    <span className="material-symbols-outlined text-xl">play_arrow</span>
                  </div>
                </div>
              </button>

              {/* 5 min (Featured) */}
              <button
                onClick={() => startMeditation(300)}
                className="group relative w-full p-1 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer bg-transparent border-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a2632] to-[#111921] border border-[#197fe6]/30 shadow-[0_0_20px_rgba(25,127,230,0.15)] rounded-full"></div>
                <div className="relative flex items-center justify-between px-6 py-5 h-24">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#197fe6]/20 flex items-center justify-center text-[#197fe6]">
                      <span className="material-symbols-outlined">self_improvement</span>
                    </div>
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="text-3xl font-bold text-white tracking-tight">5 min</span>
                      <span className="text-sm font-medium text-[#197fe6] uppercase tracking-wider">Deep Focus</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#197fe6] text-white flex items-center justify-center shadow-lg shadow-[#197fe6]/40 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-2xl">play_arrow</span>
                  </div>
                </div>
              </button>

              {/* 10 min */}
              <button
                onClick={() => startMeditation(600)}
                className="group relative w-full p-1 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer bg-transparent border-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a2632] to-[#111921] border border-white/5 rounded-full"></div>
                <div className="absolute inset-0 bg-[#197fe6]/0 group-hover:bg-[#197fe6]/10 transition-colors duration-500 rounded-full"></div>
                <div className="relative flex items-center justify-between px-6 py-5 h-20">
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-2xl font-bold text-white tracking-tight group-hover:text-[#197fe6] transition-colors">10 min</span>
                    <span className="text-xs font-medium text-[#93adc8] uppercase tracking-wider">Total Zen</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#1a2632] flex items-center justify-center group-hover:bg-[#197fe6] group-hover:text-white transition-all duration-300 text-[#93adc8]">
                    <span className="material-symbols-outlined text-xl">play_arrow</span>
                  </div>
                </div>
              </button>
            </div>
          </main>

          {/* Skip Footer */}
          <footer className="w-full flex justify-center pb-8 z-10">
            <button
              onClick={onClose}
              className="text-sm font-medium text-[#93adc8] hover:text-white transition-colors duration-200 border-none bg-transparent pb-0.5 flex items-center gap-2 group cursor-pointer"
            >
              Skip to Home
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>
          </footer>
        </div>
      </div>
      </div>
    );
  }

  // ── Active Breathing Screen ──
  return (
    <div className="bg-[#101922] font-display min-h-screen overflow-hidden">
    <div className="max-w-md mx-auto flex flex-col min-h-screen relative">
      {/* Header */}
      <header className="flex justify-end p-6 z-20 absolute top-0 w-full max-w-md">
        <button
          onClick={onClose}
          className="group flex items-center justify-center h-10 px-4 gap-2 bg-slate-800/40 hover:bg-slate-800/60 backdrop-blur-md rounded-full transition-all duration-300 border border-transparent hover:border-slate-500/30 cursor-pointer"
        >
          <span className="material-symbols-outlined text-white text-[20px] transition-transform group-hover:rotate-90">close</span>
          <span className="text-white text-sm font-bold tracking-wide uppercase">End Session</span>
        </button>
      </header>

      {/* Main */}
      <main className="flex-grow flex flex-col items-center justify-center relative w-full h-screen">
        {/* Background Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[80%] bg-[#2b8cee]/10 blur-[120px] rounded-full opacity-50"></div>
        </div>

        {/* Central Breathing Component */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-6">
          {/* Breathing Ring */}
          <div className="relative w-[320px] h-[320px] mb-12 grid place-items-center">
            {/* Outer static guide ring */}
            <div className="absolute inset-0 rounded-full border border-slate-700/30"></div>
            {/* Animated rings */}
            <div
              className="absolute inset-[-20px] rounded-full bg-[#2b8cee]/5 blur-xl"
              style={{ animation: isRunning ? "breathe 8s infinite ease-in-out" : "none" }}
            />
            <div
              className="absolute inset-0 rounded-full border-2 border-[#2b8cee]/30 shadow-[0_0_30px_rgba(43,140,238,0.2)]"
              style={{ animation: isRunning ? "breathe 8s infinite ease-in-out" : "none" }}
            />
            <div
              className="absolute inset-8 rounded-full bg-gradient-to-tr from-[#2b8cee]/20 to-[#2b8cee]/5 border border-[#2b8cee]/50 shadow-[0_0_50px_rgba(43,140,238,0.4)_inset] flex items-center justify-center backdrop-blur-sm"
              style={{ animation: isRunning ? "breathe 8s infinite ease-in-out" : "none" }}
            >
              <div className="flex flex-col items-center justify-center text-center">
                {isDone ? (
                  <span className="text-[#2b8cee] text-4xl font-black tracking-tighter drop-shadow-[0_0_15px_rgba(43,140,238,0.8)]">DONE</span>
                ) : isRunning ? (
                  <>
                    <span
                      className="text-[#2b8cee] text-5xl font-black tracking-tighter drop-shadow-[0_0_15px_rgba(43,140,238,0.8)]"
                      style={{ animation: "text-fade 8s infinite ease-in-out" }}
                    >
                      {breathPhase}
                    </span>
                    <span className="text-slate-400 text-xs font-medium tracking-[0.2em] uppercase mt-2">Recovery Phase</span>
                  </>
                ) : (
                  <span className="text-[#2b8cee] text-4xl font-black tracking-tighter">READY</span>
                )}
              </div>
            </div>
          </div>

          {/* Timer & Metrics */}
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="flex flex-col items-center">
              <div className="text-white text-6xl font-bold tracking-tighter tabular-nums leading-none">
                {timeStr}
              </div>
              <div className="text-slate-400 text-sm font-medium tracking-wide mt-2 uppercase">Total Time</div>
            </div>

            {/* Secondary Metrics */}
            <div className="flex items-center justify-between w-full max-w-[280px] mt-8 pt-8 border-t border-slate-800/50">
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-[#2b8cee] text-[24px]">favorite</span>
                <span className="text-white text-lg font-bold">64</span>
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">BPM</span>
              </div>
              <div className="h-8 w-px bg-slate-800/50"></div>
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-[#2b8cee] text-[24px]">air</span>
                <span className="text-white text-lg font-bold">98%</span>
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">O2 Sat</span>
              </div>
              <div className="h-8 w-px bg-slate-800/50"></div>
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-[#2b8cee] text-[24px]">graphic_eq</span>
                <span className="text-white text-lg font-bold">Low</span>
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Stress</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom guidance / done actions */}
        <div className="absolute bottom-10 left-0 w-full px-6 text-center z-10">
          {isDone ? (
            <button
              onClick={onClose}
              className="w-full max-w-sm mx-auto h-14 bg-[#2b8cee] hover:bg-blue-600 text-white font-extrabold text-lg uppercase tracking-wide rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(43,140,238,0.3)] transition-all active:scale-95 cursor-pointer border-none"
            >
              Done — Back to Home
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          ) : (
            <>
              <p className="text-slate-300 text-base font-normal leading-relaxed max-w-xs mx-auto">
                {tips[tipIdx]}
              </p>
              <div className="flex justify-center gap-2 mt-4">
                <div className="h-1 w-12 rounded-full bg-[#2b8cee] shadow-[0_0_10px_rgba(43,140,238,0.8)]"></div>
                <div className="h-1 w-2 rounded-full bg-slate-700"></div>
                <div className="h-1 w-2 rounded-full bg-slate-700"></div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
    </div>
  );
}

// ── Stretching View ─────────────────────────────────────────────────────────
function StretchView({ bodyPart, onComplete, onSkip }) {
  const stretches = STRETCHES[bodyPart];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            if (currentIdx < stretches.length - 1) {
              setCurrentIdx(i => i + 1);
              return 30;
            }
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, currentIdx]);

  const s = stretches[currentIdx];
  const allDone = currentIdx === stretches.length - 1 && timer === 0;
  const formatTime = (sec) => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`;

  const goNext = () => {
    if (allDone) {
      onComplete();
    } else {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      if (currentIdx < stretches.length - 1) {
        setCurrentIdx(i => i + 1);
        setTimer(30);
      }
    }
  };

  // Auto-start timer on each new stretch
  useEffect(() => {
    setIsRunning(true);
  }, [currentIdx]);

  return (
    <div className="bg-[#102216] font-display min-h-screen">
    <div className="relative flex h-full min-h-screen w-full max-w-md mx-auto flex-col overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex w-full flex-col px-6 pt-8 pb-4">
        {/* Progress Indicators */}
        <div className="flex w-full flex-row items-center justify-center gap-2 mb-6">
          {stretches.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
                i <= currentIdx ? "bg-[#0df259] shadow-[0_0_10px_rgba(13,242,89,0.4)]" : "bg-[#1A3222]"
              }`}
            />
          ))}
        </div>
        {/* Top Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={onSkip}
            className="flex w-10 h-10 items-center justify-center rounded-full bg-[#1A3222] text-white transition-colors hover:bg-[#25422d] cursor-pointer border-none"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="flex items-center gap-2 rounded-full bg-[#1A3222] px-3 py-1.5">
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Step {currentIdx + 1}/{stretches.length}</span>
          </div>
          <div className="w-10 h-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#0df259]/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Illustration Container */}
        <div className="relative z-10 w-full aspect-square max-w-[340px] flex items-center justify-center mb-6">
          {/* Circular track */}
          <div className="absolute inset-0 rounded-full border border-[#1A3222]"></div>
          {/* Active Progress Arc */}
          <div className="absolute inset-0 rounded-full border-[3px] border-[#0df259] border-r-transparent border-b-transparent -rotate-45 opacity-50"></div>
          {/* Stretch Icon */}
          <div className="relative w-[80%] h-[80%] flex items-center justify-center">
            <span className="text-8xl select-none">{s.icon}</span>
          </div>
        </div>

        {/* Title & Timer */}
        <div className="text-center z-10 flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-white">{s.name}</h1>
          <p className="text-slate-400 text-sm font-medium">Focus on your breathing.</p>
          <div className="mt-4 flex items-baseline justify-center">
            <span className="text-[64px] font-bold leading-none tracking-tighter text-[#0df259] tabular-nums">{formatTime(timer)}</span>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full px-6 pb-10 pt-4">
        <div className="flex flex-col gap-4">
          {/* Primary Action */}
          <button
            onClick={goNext}
            className="group relative flex w-full h-16 items-center justify-center overflow-hidden rounded-full bg-[#0df259] text-[#102216] transition-all active:scale-[0.98] cursor-pointer border-none"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></div>
            <span className="relative text-lg font-bold uppercase tracking-wide">
              {allDone ? "Continue to Meditation" : "Next Stretch"}
            </span>
            <span className="material-symbols-outlined relative ml-2 text-xl font-bold">arrow_forward</span>
          </button>
          {/* Skip Link */}
          {!allDone && (
            <button
              onClick={onSkip}
              className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-[#0df259] cursor-pointer bg-transparent border-none"
            >
              <span>Skip All</span>
              <span className="material-symbols-outlined text-base">east</span>
              <span>Meditation</span>
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

// ── Workout Preview ─────────────────────────────────────────────────────────
function WorkoutPreview({ exercises, bodyPart, mode, onStart, onBack }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const modeLabel = mode === "gym" ? "Full Gym" : mode === "basic" ? "Basic Equipment" : "Bodyweight";
  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const title = bodyPart === "upper" ? "Upper Body" : "Lower Body";
  const subtitle = bodyPart === "upper" ? "The Power Phase" : "Foundation Builder";

  return (
    <div className="bg-[#120505] font-display text-slate-100 antialiased min-h-screen">
    <div className="relative flex h-full min-h-screen w-full max-w-md mx-auto flex-col overflow-x-hidden pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-[#120505]/90 p-4 backdrop-blur-md">
        <button
          onClick={onBack}
          className="flex w-10 h-10 shrink-0 items-center justify-center rounded-full bg-[#1f0a0a] text-white transition-colors hover:bg-[#361212] cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="flex-1 text-center text-lg font-bold uppercase tracking-widest text-white">Workout Preview</h2>
        <div className="w-10 shrink-0"></div>
      </header>

      {/* Hero Section */}
      <div className="px-4 py-2">
        <div className="relative overflow-hidden rounded-2xl bg-[#1f0a0a] shadow-2xl ring-1 ring-white/5">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#f20d0d]/20 blur-[80px]"></div>
          <div className="relative z-10 flex flex-col p-6">
            <div className="mb-6 flex items-start justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#f20d0d]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f20d0d] ring-1 ring-[#f20d0d]/20">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                High Intensity
              </span>
              <span className="text-sm font-medium text-slate-400">{exercises.length} exercises</span>
            </div>
            <h1 className="mb-1 text-4xl font-extrabold uppercase italic leading-none tracking-tight text-white">{title}</h1>
            <p className="mb-6 text-xl font-bold uppercase tracking-wide text-[#f20d0d]">{subtitle}</p>
            <div className="flex items-center gap-4 border-t border-white/10 pt-4">
              <p className="text-xs font-medium text-slate-400">{totalSets} total sets</p>
            </div>
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#1f0a0a] via-[#1f0a0a]/90 to-transparent"></div>
        </div>
      </div>

      {/* Mode Badge */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Equipment Mode</h3>
          <div className="flex h-9 items-center gap-2 rounded-full bg-[#1f0a0a] pl-3 pr-3 text-sm font-semibold text-white ring-1 ring-white/10">
            <span className="material-symbols-outlined text-[#f20d0d] text-[18px]">fitness_center</span>
            {modeLabel}
          </div>
        </div>
      </div>

      {/* Exercise List */}
      <div className="flex flex-col gap-3 px-4">
        {exercises.map((ex, i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl bg-[#1f0a0a] p-4 ring-1 ring-white/5">
            <div className="flex w-14 h-14 shrink-0 items-center justify-center rounded-full bg-[#120505] text-white ring-1 ring-white/10">
              <span className="material-symbols-outlined text-[28px]">exercise</span>
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <h4 className="text-lg font-bold leading-tight text-white">{ex.name}</h4>
              <p className="text-sm font-medium text-slate-400">{ex.sets} Sets • {ex.reps} Reps</p>
            </div>
          </div>
        ))}
        <div className="h-8"></div>
      </div>

      {/* Sticky Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#120505] via-[#120505] to-transparent px-4 pb-8 pt-12 max-w-md mx-auto">
        <button
          onClick={onStart}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-[#f20d0d] py-4 text-xl font-extrabold uppercase tracking-wide text-white shadow-[0_0_40px_-10px_rgba(242,13,13,0.6)] transition-all hover:bg-red-600 hover:shadow-[0_0_50px_-5px_rgba(242,13,13,0.8)] active:scale-[0.98] cursor-pointer"
        >
          <span>Start Workout</span>
          <span className="material-symbols-outlined animate-pulse">play_arrow</span>
        </button>
      </div>
    </div>
    </div>
  );
}

// ── Post Workout Summary ────────────────────────────────────────────────────
function PostWorkoutSummary({ setsCompleted, totalSets, exerciseCount, duration, totalReps, streak, bodyPart, onContinue, onSkip }) {
  const [rating, setRating] = useState("good");
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const subtitle = bodyPart === "upper" ? "The Power Phase — Upper Body" : "Foundation Builder — Lower Body";

  return (
    <div className="bg-[#0f0f0f] font-display min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-20 top-20 text-[20rem] font-black text-white/5 leading-none select-none">GO</div>
        <div className="absolute -left-20 bottom-40 text-[20rem] font-black text-white/5 leading-none select-none">GO</div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#42f20d]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#42f20d]/5 rounded-full blur-[80px]"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md h-full min-h-screen flex flex-col justify-between p-6">
        {/* Header */}
        <div className="flex justify-between items-center w-full pt-4 mb-4">
          <button onClick={onSkip} className="p-2 rounded-full bg-[#181818]/50 hover:bg-[#181818] text-white backdrop-blur-md transition-colors cursor-pointer border-none">
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
          <div className="text-xs font-bold tracking-[0.2em] text-[#42f20d] uppercase">Summary</div>
          <div className="p-2 w-10"></div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pb-6">
          {/* Hero Card */}
          <div className="w-full bg-[#181818]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#42f20d]/20 rounded-full blur-[50px]"></div>

            {/* Header Text */}
            <div className="relative z-10 text-center mb-8 mt-2">
              <h1 className="text-4xl font-black italic text-white leading-[0.9] tracking-tighter drop-shadow-lg">
                WORKOUT<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#42f20d] to-[#32b80a]">COMPLETE</span> <span className="text-3xl align-middle">🔥</span>
              </h1>
            </div>

            {/* Program Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#42f20d] animate-pulse"></span>
                <span className="text-sm font-semibold text-white/90 tracking-wide uppercase">{subtitle}</span>
              </div>
            </div>

            {/* 2x2 Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-black/40 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5 hover:border-[#42f20d]/30 transition-colors">
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Sets</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{setsCompleted}</span>
                  <span className="text-lg font-medium text-white/30">/{totalSets}</span>
                </div>
              </div>
              <div className="bg-black/40 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5 hover:border-[#42f20d]/30 transition-colors">
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Exercises</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{exerciseCount}</span>
                </div>
              </div>
              <div className="bg-black/40 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5 hover:border-[#42f20d]/30 transition-colors">
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Duration</span>
                <div className="flex items-center gap-1">
                  <span className="text-3xl font-bold text-white">{duration || "--"}</span>
                </div>
              </div>
              <div className="bg-black/40 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5 hover:border-[#42f20d]/30 transition-colors">
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Streak</span>
                <div className="flex items-center gap-1">
                  <span className="text-3xl font-bold text-[#42f20d]">{streak}</span>
                  <span className="text-lg font-medium text-white/60">Days</span>
                </div>
              </div>
            </div>

            {/* Volume Footer */}
            <div className="relative py-4 border-t border-white/10 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider">Total Reps</span>
                <span className="text-xl font-bold text-white tracking-tight">{(totalReps || 0).toLocaleString()} <span className="text-sm text-white/50 font-medium">reps</span></span>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#42f20d]/10 flex items-center justify-center text-[#42f20d]">
                <span className="material-symbols-outlined">fitness_center</span>
              </div>
            </div>
          </div>

          {/* Intensity Rating */}
          <div className="w-full flex items-center justify-between px-4">
            <span className="text-sm font-semibold text-white/60 uppercase tracking-wider">How did it feel?</span>
            <div className="flex gap-2">
              <button
                onClick={() => setRating("bad")}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border-none ${rating === "bad" ? "bg-[#42f20d] text-black shadow-[0_0_15px_rgba(66,242,13,0.3)]" : "bg-[#181818] text-white/50 hover:bg-[#42f20d] hover:text-black"}`}
              >
                <span className="material-symbols-outlined text-[20px]">sentiment_dissatisfied</span>
              </button>
              <button
                onClick={() => setRating("ok")}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border-none ${rating === "ok" ? "bg-[#42f20d] text-black shadow-[0_0_15px_rgba(66,242,13,0.3)]" : "bg-[#181818] text-white/50 hover:bg-[#42f20d] hover:text-black"}`}
              >
                <span className="material-symbols-outlined text-[20px]">sentiment_neutral</span>
              </button>
              <button
                onClick={() => setRating("good")}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border-none ${rating === "good" ? "bg-[#42f20d] text-black shadow-[0_0_15px_rgba(66,242,13,0.3)]" : "bg-[#181818] text-white/50 hover:bg-[#42f20d] hover:text-black"}`}
              >
                <span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col gap-3 pt-4 pb-6 w-full mt-auto">
          <button
            onClick={onContinue}
            className="w-full h-14 bg-[#42f20d] hover:bg-[#32b80a] text-black font-extrabold text-lg uppercase tracking-wide rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(66,242,13,0.2)] hover:shadow-[0_0_30px_rgba(66,242,13,0.4)] transition-all active:scale-95 cursor-pointer"
          >
            <span>Continue to Stretch</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <button
            onClick={onSkip}
            className="w-full h-12 bg-transparent text-white/60 hover:text-white font-bold text-sm uppercase tracking-wide rounded-full flex items-center justify-center transition-colors cursor-pointer border-none"
          >
            Skip to Home
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Workout View (per-set tracking) ─────────────────────────────────────────
function WorkoutView({ exercises, bodyPart, mode, onFinish, onExit }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [completedSets, setCompletedSets] = useState(() => {
    const init = {};
    exercises.forEach((_, i) => { init[i] = new Set(); });
    return init;
  });
  const [activeExIdx, setActiveExIdx] = useState(0);
  const [restTimer, setRestTimer] = useState(null);
  const [restLeft, setRestLeft] = useState(0);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  const getWorkoutStats = () => {
    const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0);
    const setsCompleted = Object.values(completedSets).reduce((acc, s) => acc + s.size, 0);
    const exercisesCompleted = exercises.filter((_, i) => (completedSets[i]?.size || 0) > 0).length;
    const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
    // Estimate total reps done
    let totalReps = 0;
    exercises.forEach((ex, i) => {
      const doneSets = completedSets[i]?.size || 0;
      const repsNum = parseInt(ex.reps) || 10;
      totalReps += doneSets * repsNum;
    });
    return { totalSets, setsCompleted, exercisesCompleted, elapsedSec, totalReps };
  };

  // Rest timer
  useEffect(() => {
    if (restLeft > 0) {
      intervalRef.current = setInterval(() => {
        setRestLeft(t => {
          if (t <= 1) { clearInterval(intervalRef.current); setRestTimer(null); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [restTimer]);

  // Elapsed timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [startTime]);

  const toggleSet = (exIdx, setIdx) => {
    setCompletedSets(prev => {
      const next = { ...prev };
      const s = new Set(next[exIdx]);
      if (s.has(setIdx)) s.delete(setIdx); else s.add(setIdx);
      next[exIdx] = s;
      return next;
    });
  };

  const startRest = (seconds) => {
    clearInterval(intervalRef.current);
    setRestLeft(parseInt(seconds));
    setRestTimer(Date.now());
  };

  const skipRest = () => {
    clearInterval(intervalRef.current);
    setRestTimer(null);
    setRestLeft(0);
  };

  const completeSetAndRest = (exIdx, setIdx, restSeconds) => {
    const wasCompleted = completedSets[exIdx]?.has(setIdx);
    toggleSet(exIdx, setIdx);
    if (!wasCompleted) {
      startRest(restSeconds);
      // Auto-advance to next exercise if all sets done
      const newCompleted = (completedSets[exIdx]?.size || 0) + 1;
      if (newCompleted >= exercises[exIdx].sets && exIdx < exercises.length - 1) {
        setTimeout(() => setActiveExIdx(exIdx + 1), 300);
      }
    }
  };

  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const completedTotal = Object.values(completedSets).reduce((acc, s) => acc + s.size, 0);
  const allDone = completedTotal === totalSets;
  const progressPct = Math.round((completedTotal / totalSets) * 100);

  const isExDone = (i) => completedSets[i]?.size === exercises[i].sets;
  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const activeEx = exercises[activeExIdx];
  const nextEx = exercises[activeExIdx + 1];
  const title = bodyPart === "upper" ? "The Power Phase" : "Foundation Builder";

  return (
    <div className="bg-[#121212] font-display text-slate-100 min-h-screen antialiased">
    <div className="max-w-md mx-auto flex flex-col min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-white/5 pb-2">
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <button onClick={onExit} className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer bg-transparent border-none text-white">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-sm font-bold tracking-widest uppercase text-slate-400">Workout</h1>
            <h2 className="text-lg font-black tracking-tight uppercase leading-none text-white">{title}</h2>
          </div>
          <div className="w-10 -mr-2"></div>
        </div>
        {/* Progress */}
        <div className="px-6 flex flex-col gap-2 mt-2">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold text-[#f20d0d] tracking-wider uppercase">High Intensity</span>
            <span className="text-sm font-bold tabular-nums">{completedTotal}<span className="text-slate-600">/{totalSets} sets</span></span>
          </div>
          <div className="h-1.5 w-full bg-[#2a2a2a] rounded-full overflow-hidden">
            <div className="h-full bg-[#f20d0d] rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(242,13,13,0.5)]" style={{ width: `${progressPct}%` }}></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col px-4 pt-6 pb-32">
        {/* Active Exercise Card */}
        <div className="flex flex-col bg-[#1e1e1e] rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-white/5">
          {/* Exercise Header Area */}
          <div className="relative w-full aspect-[4/3] bg-[#2a2a2a] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] to-transparent opacity-60 z-10"></div>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
            {/* Large Exercise Figure */}
            <div className="relative z-5 w-full h-full flex items-center justify-center">
              <ExerciseFigure name={activeEx.name} size={200} />
            </div>
            <div className="absolute bottom-4 left-6 z-20">
              <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">{activeEx.name}</h3>
              <p className="text-[#f20d0d] font-bold text-sm tracking-widest uppercase mt-1">{activeEx.muscle} • {activeEx.reps} reps</p>
            </div>
          </div>

          {/* Set Tracking */}
          <div className="p-6 flex flex-col gap-1">
            <div className="flex justify-between items-center mb-4 px-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Set Performance</span>
            </div>

            {Array.from({ length: activeEx.sets }, (_, s) => {
              const setDone = completedSets[activeExIdx]?.has(s);
              const isCurrent = !setDone && (completedSets[activeExIdx]?.size || 0) === s;
              const isFuture = !setDone && !isCurrent;
              const setLabel = s === 0 ? "Warm Up" : `Working Set ${s}`;

              if (setDone) {
                return (
                  <label key={s} className="group flex items-center justify-between p-4 rounded-2xl bg-[#2a2a2a]/50 border border-transparent transition-all cursor-pointer select-none mt-2">
                    <div className="flex items-center gap-4">
                      <div className="relative flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-[#f20d0d] flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-sm">check</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-0.5">{setLabel}</span>
                        <span className="text-lg font-bold text-slate-400 line-through decoration-[#f20d0d] decoration-2">{activeEx.reps} reps</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f20d0d]/10 text-[#f20d0d]">
                      <span className="material-symbols-outlined">check</span>
                    </div>
                  </label>
                );
              }

              if (isCurrent) {
                return (
                  <label
                    key={s}
                    onClick={() => completeSetAndRest(activeExIdx, s, activeEx.rest)}
                    className="relative group flex items-center justify-between p-1 rounded-2xl mt-2 overflow-hidden ring-2 ring-[#f20d0d] bg-[#2a2a2a] shadow-lg shadow-[#f20d0d]/10 transition-all cursor-pointer"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#f20d0d]"></div>
                    <div className="flex items-center gap-4 pl-4 py-3 w-full">
                      <div className="relative flex items-center justify-center">
                        <div className="w-7 h-7 border-2 border-slate-500 rounded-full bg-transparent"></div>
                      </div>
                      <div className="flex flex-col grow">
                        <span className="text-xs font-bold text-[#f20d0d] uppercase tracking-wide mb-0.5">Current Set</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-bold text-white">{activeEx.reps}</span>
                          <span className="text-xs text-slate-500 font-bold uppercase">reps</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 pr-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f20d0d] text-white">
                          <span className="material-symbols-outlined text-sm">check</span>
                        </div>
                      </div>
                    </div>
                  </label>
                );
              }

              // Future set
              return (
                <div key={s} className="flex items-center justify-between p-4 rounded-2xl mt-2 bg-transparent border border-white/5 opacity-40">
                  <div className="flex items-center gap-4">
                    <div className="w-7 h-7 border-2 border-dashed border-slate-600 rounded-full"></div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-0.5">{setLabel}</span>
                      <span className="text-lg font-bold text-white">{activeEx.reps} reps</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Rest Timer (embedded) */}
            {restTimer && (
              <div className="mt-6 mb-2 p-5 rounded-2xl bg-[#0a0a0a] border border-white/5 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#f20d0d] rounded-full blur-[60px] opacity-20"></div>
                <div className="flex flex-col relative z-10">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Rest Timer</span>
                  <div className="flex items-baseline gap-1 text-[#f20d0d]">
                    <span className="text-4xl font-black tracking-tighter tabular-nums">{formatTime(restLeft)}</span>
                    <span className="text-sm font-bold text-slate-600">s</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 relative z-10">
                  <button
                    onClick={() => setRestLeft(prev => prev + 10)}
                    className="h-10 px-4 rounded-full bg-[#2a2a2a] hover:bg-[#1e1e1e] border border-white/5 text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    +10s
                  </button>
                  <button
                    onClick={skipRest}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-[#f20d0d] text-white shadow-lg shadow-[#f20d0d]/30 hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined">skip_next</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Completed exercises stack */}
        {exercises.map((ex, i) => {
          if (i >= activeExIdx) return null;
          const done = isExDone(i);
          return (
            <div key={i} className="bg-[#1e1e1e] border border-white/5 rounded-2xl p-4 flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity cursor-pointer mt-4"
              onClick={() => setActiveExIdx(i)}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                  <span className="material-symbols-outlined text-[20px]">check</span>
                </div>
                <div>
                  <h4 className={`text-slate-200 font-bold text-lg leading-tight ${done ? "line-through decoration-slate-500/50" : ""}`}>{ex.name}</h4>
                  <p className="text-slate-400 text-xs mt-0.5">{completedSets[i]?.size || 0} sets completed</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                {Array.from({ length: ex.sets }, (_, s) => (
                  <div key={s} className={`w-2 h-2 rounded-full ${completedSets[i]?.has(s) ? "bg-green-500" : "bg-slate-600"}`}></div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Next Exercise Preview */}
        {nextEx && !allDone && (
          <div className="mt-6 px-4 opacity-40 hover:opacity-100 transition-opacity">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Next Exercise</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2a2a2a] flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined">fitness_center</span>
              </div>
              <div>
                <p className="font-bold text-slate-300">{nextEx.name}</p>
                <p className="text-xs text-slate-500">{nextEx.sets} Sets x {nextEx.reps} Reps</p>
              </div>
            </div>
          </div>
        )}

        {/* All Done State */}
        {allDone && (
          <div className="mt-8 text-center">
            <div className="text-3xl font-black italic text-white leading-[0.9] tracking-tighter uppercase mb-2">
              Finish<br/>Strong
            </div>
            <span className="text-[#f20d0d] font-bold text-lg">{progressPct}%</span>
          </div>
        )}
      </main>

      {/* Bottom Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-gradient-to-t from-[#121212] via-[#121212] to-transparent pt-12 z-40 max-w-md mx-auto">
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => onFinish(getWorkoutStats())}
            className="w-full py-4 rounded-full bg-[#f20d0d] text-white font-bold text-lg tracking-wide shadow-lg shadow-[#f20d0d]/25 hover:bg-red-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">flag</span>
            {allDone ? "Finish Workout" : "Finish"}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

// ── Premium Modal ───────────────────────────────────────────────────────────
function PremiumModal({ onClose, isSpecialUser }) {
  if (isSpecialUser) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[100] p-5" onClick={onClose}>
        <div className="bg-[#141414] border border-white/[0.08] rounded-3xl p-8 max-w-[380px] w-full" onClick={e => e.stopPropagation()}>
          <div className="text-center mb-3">
            <span className="material-symbols-outlined text-primary text-5xl">crown</span>
          </div>
          <h2 className="text-2xl font-extrabold text-center text-primary m-0">
            You're the GOAT
          </h2>
          <p className="text-[#888] text-center text-sm mt-2">
            Yoga & Animal Flow -- unlocked for FREE because everyone else is subsidizing your gains.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3.5 px-7 rounded-full border-none cursor-pointer text-[15px] font-extrabold font-display bg-primary text-black mt-5 transition-all duration-200 active:scale-[0.97]"
          >
            Access Premium
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[100] p-5" onClick={onClose}>
      <div className="bg-[#141414] border border-white/[0.08] rounded-3xl p-8 max-w-[380px] w-full" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-3">
          <span className="material-symbols-outlined text-red-500 text-5xl">lock</span>
        </div>
        <h2 className="text-2xl font-extrabold text-center text-white m-0">
          VIP Access Only
        </h2>
        <p className="text-[#888] text-center text-sm mt-2 leading-relaxed">
          Unfortunately, Yoga & Animal Flow is exclusively reserved for VIP members.<br /><br />
          You're not on the list. Only the chosen ones get access to this content.
        </p>
        <button
          onClick={onClose}
          className="w-full py-3.5 px-7 rounded-full border-none cursor-pointer text-[15px] font-extrabold font-display bg-white/10 text-[#888] mt-5 transition-all duration-200 active:scale-[0.97]"
        >
          Understood
        </button>
      </div>
    </div>
  );
}

// ── Yoga Flow Detail (green theme) ──────────────────────────────────────────
function YogaFlowDetail({ flow, allFlows, onSelect, onBack, onSwitchToAnimal, onStart }) {
  const moveIcons = ["accessibility_new", "nordic_walking", "straighten", "fitness_center", "self_improvement", "spa", "hiking", "directions_walk", "nature_people", "volunteer_activism"];

  useEffect(() => { window.scrollTo(0, 0); }, [flow]);

  return (
    <div className="bg-[#102219] font-display text-slate-100 antialiased min-h-screen">
    <div className="relative flex flex-col w-full max-w-md mx-auto min-h-screen overflow-hidden pb-24 shadow-2xl">
      {/* Header */}
      <header className="flex items-center justify-between p-6 z-20">
        <button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full bg-[#183326] text-white hover:opacity-80 transition-opacity cursor-pointer border-none">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#13ec80]/10 border border-[#13ec80]/20 backdrop-blur-sm">
          <span className="material-symbols-outlined text-[#13ec80] text-[18px]">verified</span>
          <span className="text-xs font-bold uppercase tracking-widest text-[#13ec80]">Premium</span>
        </div>
        <div className="w-10 h-10" />
      </header>

      {/* Type Switcher */}
      <div className="px-6 mb-4">
        <div className="flex gap-1 bg-[#183326] rounded-full p-1">
          <div className="flex-1 py-2 rounded-full bg-[#13ec80] text-[#102219] text-center text-sm font-bold cursor-default">Yoga</div>
          <button onClick={onSwitchToAnimal} className="flex-1 py-2 rounded-full bg-transparent text-slate-400 text-center text-sm font-bold cursor-pointer border-none hover:text-white transition-colors">Animal Flow</button>
        </div>
      </div>

      {/* Horizontal Flow Carousel */}
      <div className="w-full pl-6 mb-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Explore Series</p>
        <div className="flex gap-4 overflow-x-auto pr-6 pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {allFlows.map((f, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`snap-start shrink-0 relative w-40 aspect-[4/5] rounded-xl overflow-hidden border-none cursor-pointer transition-all duration-300 ${
                f === flow ? "border-2 border-[#13ec80] shadow-[0_0_20px_rgba(19,236,128,0.3)] scale-100 opacity-100" : "opacity-60 scale-95 hover:opacity-100 hover:scale-100"
              }`}
              style={{ border: f === flow ? "2px solid #13ec80" : "none" }}
            >
              <div className="absolute inset-0 bg-[#183326]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#13ec80]/30 text-6xl">self_improvement</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-left">
                {f === flow && <p className="text-[#13ec80] text-[10px] font-bold uppercase tracking-wider mb-0.5">Active</p>}
                <p className="text-white text-sm font-bold leading-tight">{f.name.split(" ").slice(0, 2).join(" ")}</p>
                {f !== flow && <p className="text-slate-400 text-xs">{f.duration} • {f.focus.split(" ")[0]}</p>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Title */}
      <div className="px-6 py-2">
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-4">
          {flow.name.split(" ").slice(0, -2).map((w, i) => <span key={i}>{w}<br /></span>)}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#13ec80] to-emerald-600">
            {flow.name.split(" ").slice(-2).join(" ")}
          </span>
        </h1>
        <div className="flex flex-wrap gap-3 my-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#183326]">
            <span className="material-symbols-outlined text-base">schedule</span>
            <span className="text-sm font-bold">{flow.duration}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#183326]">
            <span className="material-symbols-outlined text-base">bolt</span>
            <span className="text-sm font-bold">Intermediate</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#183326]">
            <span className="material-symbols-outlined text-base">local_fire_department</span>
            <span className="text-sm font-bold">150 kCal</span>
          </div>
        </div>
      </div>

      {/* Pose Timeline */}
      <div className="flex-1 px-6 space-y-0">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Sequence Breakdown</p>
        {flow.moves.map((move, i) => (
          <div key={i} className="relative grid grid-cols-[3rem_1fr] gap-4 py-4 border-b border-slate-800 last:border-transparent">
            <div className="flex flex-col items-center">
              <span className="text-xl font-black text-slate-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              {i < flow.moves.length - 1 && <div className="h-full w-px bg-slate-800 my-2"></div>}
            </div>
            <div className="flex items-center gap-4">
              <div className="shrink-0 w-16 h-16 rounded-xl bg-[#183326] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-3xl">{moveIcons[i % moveIcons.length]}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">{move}</h3>
                <p className="text-sm font-medium text-slate-400">{flow.focus}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#102219] via-[#102219] to-transparent pointer-events-none flex justify-center w-full max-w-md mx-auto">
        <button onClick={onStart} className="w-full pointer-events-auto bg-[#13ec80] text-[#102219] h-14 rounded-full font-black text-lg uppercase tracking-wide shadow-[0_0_40px_rgba(19,236,128,0.4)] hover:shadow-[0_0_60px_rgba(19,236,128,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border-none">
          Start Flow
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
    </div>
  );
}

// ── Animal Flow Detail (orange theme, matches Yoga layout) ──────────────────
function AnimalFlowDetail({ flow, allFlows, onSelect, onBack, onSwitchToYoga, onStart }) {
  const moveIcons = ["accessibility_new", "swipe_right", "change_circle", "north_east", "directions_run", "open_with", "rotate_right"];

  useEffect(() => { window.scrollTo(0, 0); }, [flow]);

  return (
    <div className="bg-[#1a1008] font-display text-slate-100 antialiased min-h-screen">
    <div className="relative flex flex-col w-full max-w-md mx-auto min-h-screen overflow-hidden pb-24 shadow-2xl">
      {/* Header */}
      <header className="flex items-center justify-between p-6 z-20">
        <button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2a1c10] text-white hover:opacity-80 transition-opacity cursor-pointer border-none">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ee6c2b]/10 border border-[#ee6c2b]/20 backdrop-blur-sm">
          <span className="material-symbols-outlined text-[#ee6c2b] text-[18px]">verified</span>
          <span className="text-xs font-bold uppercase tracking-widest text-[#ee6c2b]">Premium</span>
        </div>
        <div className="w-10 h-10" />
      </header>

      {/* Type Switcher */}
      <div className="px-6 mb-4">
        <div className="flex gap-1 bg-[#2a1c10] rounded-full p-1">
          <button onClick={onSwitchToYoga} className="flex-1 py-2 rounded-full bg-transparent text-slate-400 text-center text-sm font-bold cursor-pointer border-none hover:text-white transition-colors">Yoga</button>
          <div className="flex-1 py-2 rounded-full bg-[#ee6c2b] text-white text-center text-sm font-bold cursor-default">Animal Flow</div>
        </div>
      </div>

      {/* Horizontal Flow Carousel */}
      <div className="w-full pl-6 mb-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Explore Series</p>
        <div className="flex gap-4 overflow-x-auto pr-6 pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {allFlows.map((f, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`snap-start shrink-0 relative w-40 aspect-[4/5] rounded-xl overflow-hidden border-none cursor-pointer transition-all duration-300 ${
                f === flow ? "scale-100 opacity-100" : "opacity-60 scale-95 hover:opacity-100 hover:scale-100"
              }`}
              style={{ border: f === flow ? "2px solid #ee6c2b" : "none", boxShadow: f === flow ? "0 0 20px rgba(238,108,43,0.3)" : "none" }}
            >
              <div className="absolute inset-0 bg-[#2a1c10]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#ee6c2b]/30 text-6xl">pets</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-left">
                {f === flow && <p className="text-[#ee6c2b] text-[10px] font-bold uppercase tracking-wider mb-0.5">Active</p>}
                <p className="text-white text-sm font-bold leading-tight">{f.name}</p>
                {f !== flow && <p className="text-slate-400 text-xs">{f.duration} • {f.focus.split(" ")[0]}</p>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Title */}
      <div className="px-6 py-2">
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-4">
          Animal<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee6c2b] to-orange-400">
            {flow.name}
          </span>
        </h1>
        <div className="flex flex-wrap gap-3 my-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2a1c10]">
            <span className="material-symbols-outlined text-base">schedule</span>
            <span className="text-sm font-bold">{flow.duration}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2a1c10]">
            <span className="material-symbols-outlined text-base">bolt</span>
            <span className="text-sm font-bold">Advanced</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2a1c10]">
            <span className="material-symbols-outlined text-base">local_fire_department</span>
            <span className="text-sm font-bold">{parseInt(flow.duration) * 12} kCal</span>
          </div>
        </div>
      </div>

      {/* Sequence Timeline */}
      <div className="flex-1 px-6 space-y-0">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">The Flow Sequence</p>
        {flow.moves.map((move, i) => (
          <div key={i} className="relative grid grid-cols-[3rem_1fr] gap-4 py-4 border-b border-[#2a1c10] last:border-transparent">
            <div className="flex flex-col items-center">
              <span className="text-xl font-black text-slate-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              {i < flow.moves.length - 1 && <div className="h-full w-px bg-[#2a1c10] my-2"></div>}
            </div>
            <div className="flex items-center gap-4">
              <div className="shrink-0 w-16 h-16 rounded-xl bg-[#2a1c10] flex items-center justify-center text-[#ee6c2b]">
                <span className="material-symbols-outlined text-3xl">{moveIcons[i % moveIcons.length]}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">{move}</h3>
                <p className="text-sm font-medium text-slate-400">{flow.focus}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1a1008] via-[#1a1008] to-transparent pointer-events-none flex justify-center w-full max-w-md mx-auto">
        <button onClick={onStart} className="w-full pointer-events-auto bg-[#ee6c2b] text-white h-14 rounded-full font-black text-lg uppercase tracking-wide shadow-[0_0_40px_rgba(238,108,43,0.4)] hover:shadow-[0_0_60px_rgba(238,108,43,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border-none">
          Start Flow
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
    </div>
  );
}

// ── Active Flow Runner ──────────────────────────────────────────────────────
function FlowRunner({ flow, flowType, onDone }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [moveIdx, setMoveIdx] = useState(0);
  const [timer, setTimer] = useState(45);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  const isYoga = flowType === "yoga";
  const accent = isYoga ? "#13ec80" : "#ee6c2b";
  const bg = isYoga ? "#102219" : "#120c09";
  const surface = isYoga ? "#183326" : "#221711";

  useEffect(() => {
    if (isRunning && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            if (moveIdx < flow.moves.length - 1) {
              setMoveIdx(i => i + 1);
              return 45;
            }
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, moveIdx]);

  useEffect(() => {
    setIsRunning(true);
  }, [moveIdx]);

  const allDone = moveIdx === flow.moves.length - 1 && timer === 0;
  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const goNext = () => {
    if (allDone) {
      onDone();
    } else {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      if (moveIdx < flow.moves.length - 1) {
        setMoveIdx(i => i + 1);
        setTimer(45);
      }
    }
  };

  return (
    <div className="font-display min-h-screen" style={{ backgroundColor: bg }}>
    <div className="relative flex h-full min-h-screen w-full max-w-md mx-auto flex-col overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex w-full flex-col px-6 pt-8 pb-4">
        <div className="flex w-full flex-row items-center justify-center gap-2 mb-6">
          {flow.moves.map((_, i) => (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-full transition-all duration-300"
              style={{ backgroundColor: i <= moveIdx ? accent : surface, boxShadow: i <= moveIdx ? `0 0 10px ${accent}40` : "none" }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button onClick={onDone} className="flex w-10 h-10 items-center justify-center rounded-full text-white transition-colors cursor-pointer border-none" style={{ backgroundColor: surface }}>
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="flex items-center gap-2 rounded-full px-3 py-1.5" style={{ backgroundColor: surface }}>
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">{moveIdx + 1}/{flow.moves.length}</span>
          </div>
          <div className="w-10 h-10" />
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: `${accent}15` }}></div>

        <div className="relative z-10 w-full aspect-square max-w-[300px] flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full border" style={{ borderColor: surface }}></div>
          <div className="absolute inset-0 rounded-full border-[3px] border-r-transparent border-b-transparent -rotate-45 opacity-50" style={{ borderColor: accent }}></div>
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-8xl" style={{ color: `${accent}60` }}>
              {isYoga ? "self_improvement" : "pets"}
            </span>
          </div>
        </div>

        <div className="text-center z-10 flex flex-col items-center gap-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{flow.name}</p>
          <h1 className="text-3xl font-bold uppercase tracking-tight text-white">{flow.moves[moveIdx]}</h1>
          <p className="text-slate-400 text-sm font-medium">{flow.focus}</p>
          <div className="mt-4 flex items-baseline justify-center">
            <span className="text-[64px] font-bold leading-none tracking-tighter tabular-nums" style={{ color: accent }}>{formatTime(timer)}</span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="w-full px-6 pb-10 pt-4">
        <div className="flex flex-col gap-4">
          <button
            onClick={goNext}
            className="group relative flex w-full h-16 items-center justify-center overflow-hidden rounded-full text-white transition-all active:scale-[0.98] cursor-pointer border-none"
            style={{ backgroundColor: accent, color: bg }}
          >
            <span className="relative text-lg font-bold uppercase tracking-wide">
              {allDone ? "Finish Flow" : "Next Move"}
            </span>
            <span className="material-symbols-outlined relative ml-2 text-xl font-bold">arrow_forward</span>
          </button>
          {!allDone && (
            <button onClick={onDone} className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-slate-400 transition-colors cursor-pointer bg-transparent border-none" style={{ color: `${accent}80` }}>
              <span>End Flow</span>
              <span className="material-symbols-outlined text-base">east</span>
              <span>Home</span>
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

// ── Premium Content View ────────────────────────────────────────────────────
function PremiumWorkout({ onBack }) {
  const [selected, setSelected] = useState(0);
  const [flowType, setFlowType] = useState("yoga");
  const [activeFlow, setActiveFlow] = useState(null);
  const items = flowType === "yoga" ? YOGA_FLOWS : ANIMAL_FLOWS;

  const switchType = (t) => { setFlowType(t); setSelected(0); };

  if (activeFlow) {
    return (
      <FlowRunner
        flow={activeFlow}
        flowType={flowType}
        onDone={() => { setActiveFlow(null); onBack(); }}
      />
    );
  }

  if (flowType === "yoga") {
    return (
      <YogaFlowDetail
        flow={items[selected]}
        allFlows={items}
        onSelect={setSelected}
        onBack={onBack}
        onSwitchToAnimal={() => switchType("animal")}
        onStart={() => setActiveFlow(items[selected])}
      />
    );
  }

  return (
    <AnimalFlowDetail
      flow={items[selected]}
      allFlows={items}
      onSelect={setSelected}
      onBack={onBack}
      onSwitchToYoga={() => switchType("yoga")}
      onStart={() => setActiveFlow(items[selected])}
    />
  );
}

// ── Monthly Check-in ────────────────────────────────────────────────────────
function MonthlyCheckIn({ profile, onUpdate, onClose }) {
  const [newWeight, setNewWeight] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdate({ ...profile, weight: parseFloat(newWeight), lastBaseline: Date.now() });
    setSaved(true);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[100] p-5" onClick={onClose}>
      <div className="bg-[#141414] border border-white/[0.08] rounded-3xl p-8 max-w-[380px] w-full" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-3">
          <span className="material-symbols-outlined text-primary text-5xl">monitoring</span>
        </div>
        <h2 className="text-2xl font-extrabold text-center text-white m-0">
          {saved ? "Baseline Updated!" : "Monthly Check-in"}
        </h2>
        {saved ? (
          <>
            <p className="text-[#888] text-center text-sm mt-2">
              New weight: {newWeight} lbs -- workouts recalibrated.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3.5 px-7 rounded-full border-none cursor-pointer text-[15px] font-extrabold font-display bg-primary text-black mt-5 transition-all duration-200 active:scale-[0.97]"
            >
              Let's GOOOO
            </button>
          </>
        ) : (
          <>
            <p className="text-[#888] text-center text-sm mt-2">
              Previous: {Math.round(profile.weight)} lbs -- what's your current weight?
            </p>
            <input
              type="number"
              value={newWeight}
              onChange={e => setNewWeight(e.target.value)}
              placeholder="Current weight (lbs)"
              className="w-full py-4 px-5 rounded-[14px] border-2 border-white/[0.08] bg-white/[0.03] text-white text-lg font-semibold font-display transition-colors duration-300 focus:outline-none focus:border-primary mt-4"
              autoFocus
            />
            <button
              onClick={handleSave}
              disabled={!newWeight}
              className={`w-full py-3.5 px-7 rounded-full border-none cursor-pointer text-[15px] font-extrabold font-display mt-4 transition-all duration-200 active:scale-[0.97] ${
                newWeight
                  ? "bg-primary text-black"
                  : "bg-primary/15 text-primary/40 cursor-not-allowed"
              }`}
            >
              Update Baseline
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── PROGRESS VIEW ───────────────────────────────────────────────────────────
function ProgressView({ activeUser, profile, totalWorkouts, onBack, onSwitchProfile, onCheckIn }) {
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    let cancelled = false;
    (async () => {
      setLogsLoading(true);
      const rows = await loadWorkoutLog(activeUser);
      if (!cancelled) {
        setLogs(rows);
        setLogsLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [activeUser]);

  const totalReps = logs.reduce((s, l) => s + (l.totalReps || 0), 0);
  const totalSec = logs.reduce((s, l) => s + (l.durationSec || 0), 0);
  const totalMin = Math.floor(totalSec / 60);

  const fmtDur = (sec) => {
    if (!sec) return "0:00";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };
  const modeLabel = (m) => m === "bodyweight" ? "Bodyweight" : m === "basic" ? "Basic" : "Gym";

  // Group logs by relative day label
  const getDayLabel = (iso) => {
    const d = new Date(iso);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const logDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const diff = Math.round((today - logDay) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  const initials = (profile?.name || activeUser || "?").charAt(0).toUpperCase();

  return (
    <div className="bg-[#111111] min-h-screen">
    <div className="relative flex flex-col min-h-screen max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sticky top-0 z-50 bg-[#111111]/90 backdrop-blur-md">
        <button onClick={onBack} className="flex items-center justify-center p-2 rounded-full hover:bg-zinc-800 transition-colors cursor-pointer bg-transparent border-none text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold uppercase tracking-widest text-white">Profile</h1>
        <button onClick={onCheckIn} className="flex items-center justify-center p-2 rounded-full hover:bg-zinc-800 transition-colors cursor-pointer bg-transparent border-none text-white">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>

      {/* Profile avatar + name */}
      <div className="flex flex-col items-center px-6 pt-2 pb-6">
        <div className="relative mb-4">
          <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-zinc-800 shadow-lg relative bg-gradient-to-br from-[#a6f20d]/30 to-[#a6f20d]/5 flex items-center justify-center">
            <span className="text-5xl font-black text-[#a6f20d]">{initials}</span>
            <div className="absolute inset-0 ring-2 ring-[#a6f20d]/50 rounded-full"></div>
          </div>
        </div>
        <h2 className="text-3xl font-black italic tracking-tighter text-white mb-4 uppercase">{profile?.name || activeUser}</h2>
        <button
          onClick={onSwitchProfile}
          className="w-full bg-zinc-800 text-white border border-zinc-700 font-bold py-3 px-6 rounded-full uppercase tracking-wider text-sm hover:bg-zinc-700 hover:border-[#a6f20d] transition-all active:scale-[0.98] cursor-pointer"
        >
          Switch Profile
        </button>
      </div>

      {/* Stats row */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-[#1a1a1a] p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-sm border border-[#a6f20d]/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#a6f20d]"></div>
            <span className="material-symbols-outlined text-[#a6f20d] mb-1 text-3xl" style={{ filter: "drop-shadow(0 0 8px rgba(166,242,13,0.5))" }}>fitness_center</span>
            <span className="text-2xl font-black text-white leading-none">{totalWorkouts}</span>
            <span className="text-[10px] font-bold text-zinc-400 uppercase mt-1">Workouts</span>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-sm border border-[#a6f20d]/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#a6f20d]/50"></div>
            <span className="material-symbols-outlined text-[#a6f20d] mb-1 text-3xl">repeat</span>
            <span className="text-2xl font-black text-white leading-none">{totalReps > 999 ? `${(totalReps / 1000).toFixed(1)}k` : totalReps}</span>
            <span className="text-[10px] font-bold text-zinc-400 uppercase mt-1">Total Reps</span>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-sm border border-[#a6f20d]/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#a6f20d]/50"></div>
            <span className="material-symbols-outlined text-[#a6f20d] mb-1 text-3xl">timer</span>
            <span className="text-2xl font-black text-white leading-none">{totalMin > 999 ? `${(totalMin / 1000).toFixed(1)}k` : totalMin}</span>
            <span className="text-[10px] font-bold text-zinc-400 uppercase mt-1">Minutes</span>
          </div>
        </div>

        {/* Height & Weight card */}
        <button
          onClick={onCheckIn}
          className="w-full bg-[#1a1a1a] p-4 rounded-xl flex items-center justify-between shadow-sm border border-[#a6f20d]/30 group hover:border-[#a6f20d] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="bg-zinc-800 p-2 rounded-full text-[#a6f20d] group-hover:bg-[#a6f20d] group-hover:text-black transition-colors">
              <span className="material-symbols-outlined">straighten</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Height & Weight</span>
              <span className="text-lg font-black text-white">{profile?.height || "—"} cm <span className="text-zinc-600 px-1">|</span> {Math.round(profile?.weight || 0)} lbs</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-zinc-600 group-hover:text-[#a6f20d] transition-colors">chevron_right</span>
        </button>
      </div>

      {/* Workout history timeline */}
      <div className="px-6 flex-1 bg-[#0a0a0a] rounded-t-[2.5rem] pt-8 pb-32 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)] border-t border-zinc-800">
        <h3 className="text-lg font-bold text-white mb-6 pl-2 uppercase tracking-tight italic">Workout History</h3>

        {logsLoading ? (
          <div className="flex flex-col items-center justify-center mt-16 text-zinc-500">
            <div className="h-8 w-8 border-2 border-zinc-700 border-t-[#a6f20d] rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-medium text-zinc-500">Loading history...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-12 text-zinc-500">
            <span className="material-symbols-outlined text-5xl mb-3">exercise</span>
            <p className="text-base font-medium">No workouts yet</p>
            <p className="text-sm text-zinc-600 mt-1">Complete a workout to see it here</p>
          </div>
        ) : (
          <div className="relative pl-4 border-l-2 border-zinc-800 space-y-8">
            {logs.map((log, i) => {
              const isToday = getDayLabel(log.date) === "Today";
              return (
                <div key={i} className="relative pl-6">
                  <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-[3px] border-[#0a0a0a] z-10 ${isToday ? "bg-[#a6f20d] shadow-[0_0_10px_rgba(166,242,13,0.6)]" : "bg-zinc-700"}`}></div>
                  <div className="flex flex-col gap-1 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${isToday ? "text-[#a6f20d]" : "text-zinc-500"}`}>{getDayLabel(log.date)}</span>
                    <h4 className="text-base font-black text-white uppercase italic">{log.bodyPart === "upper" ? "Upper Body" : "Lower Body"}</h4>
                  </div>
                  <div className="bg-[#151515] p-4 rounded-xl shadow-sm border border-zinc-800 flex items-center justify-between hover:border-zinc-600 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-zinc-900 p-2 rounded-full text-[#a6f20d]">
                        <span className="material-symbols-outlined text-xl">fitness_center</span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{fmtDur(log.durationSec)} min</div>
                        <div className="text-xs text-zinc-500">{log.setsCompleted ?? 0}/{log.totalSets ?? 0} sets • {log.totalReps ?? 0} reps</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#a6f20d]/15 text-[#a6f20d] px-2 py-0.5 rounded-full">
                      {modeLabel(log.mode)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

// ── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [activeUser, setActiveUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState("bodyweight");
  const [bodyPart, setBodyPart] = useState(null);
  const [workoutIdx, setWorkoutIdx] = useState(0);
  const [showPremium, setShowPremium] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [currentExercises, setCurrentExercises] = useState([]);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [workoutStats, setWorkoutStats] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [streaks, setStreaks] = useState({});
  const [showWelcome, setShowWelcome] = useState(true);

  // ── Load profile streaks for picker ──
  useEffect(() => {
    (async () => {
      const keys = Object.keys(DEFAULT_PROFILES);
      const result = {};
      await Promise.all(
        keys.map(async (key) => {
          const stats = await loadUserStats(key);
          result[key] = stats.totalWorkouts ?? 0;
        })
      );
      setStreaks(result);
    })();
  }, []);

  // ── Load user data from Supabase when activeUser changes ──
  useEffect(() => {
    if (!activeUser) {
      setProfile(null);
      return;
    }
    const base = DEFAULT_PROFILES[activeUser];
    if (!base) return;

    let cancelled = false;
    (async () => {
      setDataLoading(true);
      const saved = await loadUserStats(activeUser);
      if (cancelled) return;
      setProfile({
        ...base,
        weight: saved.weight ?? base.weight,
        lastBaseline: saved.lastBaseline ?? Date.now(),
        createdAt: saved.createdAt ?? Date.now(),
      });
      setTotalWorkouts(saved.totalWorkouts ?? 0);
      setMode(saved.mode ?? "bodyweight");
      setWorkoutIdx(saved.workoutIdx ?? 0);
      setDataLoading(false);
    })();
    return () => { cancelled = true; };
  }, [activeUser]);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  // Always scroll to top on any screen change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen, activeUser, showWelcome]);

  // Check monthly baseline
  useEffect(() => {
    if (profile) {
      const daysSince = (Date.now() - profile.lastBaseline) / (1000 * 60 * 60 * 24);
      if (daysSince >= 30) setShowCheckIn(true);
    }
  }, [profile]);

  // ── Supabase persistence (fire-and-forget) ──
  const saveData = (overrides = {}) => {
    if (!activeUser) return;
    saveUserStats(activeUser, overrides);
  };

  const selectProfile = (key) => {
    setActiveUser(key);
    setScreen("modeSelect");
  };

  const selectMode = (m) => {
    setMode(m);
    saveData({ mode: m });
    setScreen("home");
  };

  const switchProfile = () => {
    setActiveUser(null);
    setProfile(null);
    setScreen("home");
  };

  const startWorkout = (part) => {
    const modeKey = mode === "basic" ? "basic" : mode === "gym" ? "gym" : "bodyweight";
    const pool = WORKOUTS[part][modeKey];
    const idx = (workoutIdx + totalWorkouts) % pool.length;
    const intensity = calcIntensity(profile);
    const exercises = adjustWorkout(pool[idx], intensity);
    setBodyPart(part);
    setCurrentExercises(exercises);
    setScreen("workoutPreview");
  };

  const beginWorkout = () => {
    setScreen("workout");
  };

  const finishWorkout = (stats) => {
    setWorkoutStats(stats || null);
    setScreen("postWorkout");
  };

  const continueAfterSummary = () => {
    setScreen("stretch");
  };

  const finishStretch = () => {
    setScreen("meditate");
  };

  const finishAll = () => {
    const newTotal = totalWorkouts + 1;
    setTotalWorkouts(newTotal);
    // Save workout log entry to Supabase
    if (workoutStats) {
      addWorkoutLogEntry(activeUser, {
        date: new Date().toISOString(),
        bodyPart,
        mode,
        setsCompleted: workoutStats.setsCompleted,
        totalSets: workoutStats.totalSets,
        exercisesCompleted: workoutStats.exercisesCompleted,
        totalReps: workoutStats.totalReps,
        durationSec: workoutStats.elapsedSec,
      });
    }
    saveData({ totalWorkouts: newTotal, mode, workoutIdx });
    setScreen("home");
    setBodyPart(null);
    setCurrentExercises([]);
    setWorkoutStats(null);
  };

  // ── Welcome screen ──
  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

  // ── Loading spinner after profile selection ──
  if (dataLoading) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen font-display text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-2 border-zinc-700 border-t-[#80f20d] rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Loading profile...</p>
        </div>
      </div>
    );
  }

  // ── Profile picker ──
  if (!activeUser || !profile) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen font-display text-white relative overflow-auto">
        <ProfilePicker onSelect={selectProfile} streaks={streaks} />
      </div>
    );
  }

  // ── Mode Selection ──
  if (screen === "modeSelect") {
    const modeOptions = [
      { key: "bodyweight", icon: "accessibility_new", label: "Bodyweight", desc: "No equipment needed. Train anywhere with just your body." },
      { key: "basic", icon: "fitness_center", label: "Basic Equipment", desc: "Dumbbells, bands, and a bench. Perfect for home gyms." },
      { key: "gym", icon: "exercise", label: "Full Gym", desc: "Full commercial gym access. Barbells, cables, machines." },
    ];
    return (
      <div className="font-display bg-[#121212] text-slate-100 min-h-screen antialiased selection:bg-[#80f20d] selection:text-black">
      <div className="max-w-md mx-auto flex flex-col min-h-screen">
        {/* Top Navigation */}
        <header className="sticky top-0 z-50 bg-[#121212]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <button
            onClick={switchProfile}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors cursor-pointer bg-transparent border-none text-white"
          >
            <span className="material-symbols-outlined text-[28px]">arrow_back</span>
          </button>
          <div className="text-sm font-medium opacity-60 uppercase tracking-widest">Step 2 of 2</div>
          <div className="w-10"></div>
        </header>

        {/* Progress Indicator */}
        <div className="px-6 pb-2">
          <div className="flex gap-2 w-full h-1.5">
            <div className="h-full flex-1 rounded-full bg-[#80f20d]/30"></div>
            <div className="h-full flex-1 rounded-full bg-[#80f20d] shadow-[0_0_10px_rgba(128,242,13,0.8)]"></div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 px-6 pt-6 pb-32 flex flex-col">
          {/* Text Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold italic tracking-tight leading-[0.95] mb-4 uppercase">
              Select Your<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#80f20d] to-white">Mode.</span>
            </h1>
            <p className="text-slate-400 text-lg font-light leading-relaxed max-w-sm">
              Choose your equipment level for today's session.
            </p>
          </div>

          {/* Selection Cards */}
          <div className="flex flex-col gap-4">
            {modeOptions.map((opt) => {
              const isSelected = mode === opt.key;
              return (
                <label
                  key={opt.key}
                  onClick={() => setMode(opt.key)}
                  className={`group relative flex items-center gap-5 p-5 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 ${
                    isSelected
                      ? "bg-[#1a1a1a] border-2 border-[#80f20d] shadow-[0_0_20px_-5px_rgba(128,242,13,0.3)] scale-[1.02]"
                      : "bg-[#1e1e1e] border-2 border-transparent hover:border-[#2d2d2d]"
                  }`}
                >
                  {/* Active Indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-[#80f20d] shadow-[0_0_8px_#80f20d]"></div>
                  )}
                  <div className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-colors ${
                    isSelected
                      ? "bg-[#80f20d] text-black font-bold"
                      : "bg-[#2d2d2d] text-slate-400 group-hover:text-[#80f20d]"
                  }`}>
                    <span className="material-symbols-outlined text-[28px]">{opt.icon}</span>
                  </div>
                  <div className="relative z-10 flex flex-col pr-6">
                    <span className={`text-xl font-bold tracking-tight mb-1 ${isSelected ? "text-white" : ""}`}>{opt.label}</span>
                    <span className={`text-sm font-light leading-tight ${isSelected ? "text-slate-300" : "text-slate-400"}`}>{opt.desc}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </main>

        {/* Sticky Footer */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#121212] via-[#121212] to-transparent z-40 pb-8 max-w-md mx-auto">
          <button
            onClick={() => selectMode(mode)}
            className="group w-full bg-[#80f20d] hover:bg-[#66c20a] text-black h-16 rounded-full font-bold text-lg uppercase tracking-wide flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(128,242,13,0.3)] hover:shadow-[0_0_30px_rgba(128,242,13,0.5)] active:scale-95"
          >
            Let's Get Started
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>
      </div>
    );
  }

  // ── Post Workout Summary ──
  if (screen === "postWorkout") {
    const totalSets = workoutStats?.totalSets || currentExercises.reduce((acc, ex) => acc + ex.sets, 0);
    const setsCompleted = workoutStats?.setsCompleted || totalSets;
    const exercisesCompleted = workoutStats?.exercisesCompleted || currentExercises.length;
    const elapsedSec = workoutStats?.elapsedSec || 0;
    const totalReps = workoutStats?.totalReps || 0;
    const formatDuration = (s) => {
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return `${m}:${sec.toString().padStart(2, "0")}`;
    };
    return (
      <PostWorkoutSummary
        setsCompleted={setsCompleted}
        totalSets={totalSets}
        exerciseCount={exercisesCompleted}
        duration={formatDuration(elapsedSec)}
        totalReps={totalReps}
        streak={totalWorkouts + 1}
        bodyPart={bodyPart}
        onContinue={continueAfterSummary}
        onSkip={finishAll}
      />
    );
  }

  // ── Meditation ──
  if (screen === "meditate") {
    return (
      <div className="bg-[#0a0a0a] min-h-screen font-display text-white relative overflow-auto">
        <MeditationTimer onClose={finishAll} />
      </div>
    );
  }

  // ── Stretching ──
  if (screen === "stretch") {
    return (
      <div className="bg-[#0a0a0a] min-h-screen font-display text-white relative overflow-auto">
        <StretchView bodyPart={bodyPart} onComplete={finishStretch} onSkip={finishStretch} />
      </div>
    );
  }

  // ── Workout Preview ──
  if (screen === "workoutPreview") {
    return (
      <WorkoutPreview
        exercises={currentExercises}
        bodyPart={bodyPart}
        mode={mode}
        onStart={beginWorkout}
        onBack={() => setScreen("home")}
      />
    );
  }

  // ── Workout ──
  if (screen === "workout") {
    return (
      <WorkoutView exercises={currentExercises} bodyPart={bodyPart} mode={mode} onFinish={finishWorkout} onExit={finishAll} />
    );
  }

  // ── Progress / Profile ──
  if (screen === "progress") {
    return (
      <div className="bg-[#111111] min-h-screen font-display text-white relative overflow-auto">
        <ProgressView
          activeUser={activeUser}
          profile={profile}
          totalWorkouts={totalWorkouts}
          onBack={() => setScreen("home")}
          onSwitchProfile={switchProfile}
          onCheckIn={() => setShowCheckIn(true)}
        />
        {showCheckIn && (
          <MonthlyCheckIn
            profile={profile}
            onUpdate={(p) => {
              setProfile(p);
              saveData({ weight: p.weight, lastBaseline: p.lastBaseline });
            }}
            onClose={() => setShowCheckIn(false)}
          />
        )}
      </div>
    );
  }

  // ── Premium ──
  if (screen === "premium") {
    return (
      <div className="bg-[#0a0a0a] min-h-screen font-display text-white relative overflow-auto">
        <PremiumWorkout onBack={() => setScreen("home")} />
      </div>
    );
  }

  // ── HOME SCREEN ──
  const intensity = calcIntensity(profile);
  const levelLabel = profile.liftCapacity === "advanced" ? "Advanced" : profile.liftCapacity === "moderate" ? "Intermediate" : "Beginner";

  return (
    <div className="bg-black font-display text-slate-900 dark:text-slate-100 antialiased selection:bg-[#a6f20d] selection:text-slate-900">
      {showPremium && <PremiumModal onClose={() => { setShowPremium(false); if (activeUser === "lyn") setScreen("premium"); }} isSpecialUser={activeUser === "lyn"} />}
      {showCheckIn && (
        <MonthlyCheckIn
          profile={profile}
          onUpdate={(p) => {
            setProfile(p);
            saveData({ weight: p.weight, lastBaseline: p.lastBaseline });
          }}
          onClose={() => setShowCheckIn(false)}
        />
      )}

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#0a0a0a] max-w-md mx-auto">
        {/* Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a6f20d] text-slate-900">
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>bolt</span>
            </div>
            <div>
              <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none text-white">lets GOOOO</h1>
              <p className="text-xs font-medium text-slate-400">v2.0 Beta</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1.5 border border-slate-700">
              <span className="material-symbols-outlined text-orange-500" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              <span className="text-sm font-bold text-white">{Math.min(totalWorkouts, 99)}</span>
            </div>
            <button
              onClick={switchProfile}
              className="h-10 w-10 overflow-hidden rounded-full border-2 border-slate-700 bg-slate-700 flex items-center justify-center cursor-pointer hover:border-[#a6f20d] transition-colors"
            >
              <span className="material-symbols-outlined text-slate-300">person</span>
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col gap-6 px-6 pb-28 pt-6">
          {/* Greeting & Stats */}
          <section className="flex flex-col gap-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Dashboard</p>
                <h2 className="text-4xl font-extrabold tracking-tight mt-1 text-white">Hey, {profile.name} <span className="inline-block animate-pulse">👋</span></h2>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowCheckIn(true)}
                className="group flex flex-col items-center justify-center rounded-2xl bg-slate-800/50 border border-slate-700/50 p-5 transition-all hover:border-[#a6f20d]/50 shadow-sm hover:shadow-md cursor-pointer"
              >
                <span className="text-3xl font-black tracking-tight text-white group-hover:text-[#a6f20d] transition-colors">{totalWorkouts}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Workouts</span>
              </button>
              <div className="group flex flex-col items-center justify-center rounded-2xl bg-slate-800/50 border border-slate-700/50 p-5 transition-all hover:border-[#a6f20d]/50 shadow-sm hover:shadow-md">
                <span className="material-symbols-outlined text-3xl mb-1 text-white group-hover:text-[#a6f20d] transition-colors">diamond</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{levelLabel}</span>
              </div>
            </div>
          </section>

          {/* Guarantee Card */}
          <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-800/50 border border-slate-700/50 p-5 transition-all hover:border-[#a6f20d]/50 shadow-sm hover:shadow-md animate-pulse">
            <span className="material-symbols-outlined text-3xl mb-1 text-[#a6f20d]">verified</span>
            <span className="text-[10px] uppercase tracking-widest text-white text-center">100% Gains, Amazing Looks & Longevity, <span className="font-black">Guaranteed</span></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1 text-center">For You and Your Family</span>
          </div>

          {/* Choose Your Path */}
          <section className="flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-lg font-black uppercase italic tracking-tighter text-white">Choose Your Path</h3>
            </div>

            <div className="flex flex-col gap-6">
              {/* Upper Body Card */}
              <div className="relative overflow-hidden rounded-[2rem] bg-slate-800 text-white shadow-xl group w-full h-[280px] shrink-0">
                <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
                  <img alt="Athletic gym weights background texture" className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuRCqjVIMA4EMoqPOEoT2Slumv7gAq4XWmhwOSoLDo4K3gvGkQ7yj_RgdXf7fzU3iP3FfUoT1Ovf5a_ZHrjY9rRCMmEGBmsZAmxRVTY7BWclsz-y0NGXeLrJOxJCj-jYw1nBGDbXO0ZGtO3XZc80jmokZM5YLQ8ZTiSZ5iuBCj6jiR2Ooc-qoTZyqMBPazUaI5I8K02s_ktAA6jiQ_jMnrKNAMfBPJFOmZDdhGYuWtKQRpMlAXUwoGW6fR51ISAhW299huoGEIQowu" />
                </div>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
                <div className="relative z-10 flex flex-col p-6 h-full justify-between">
                  <div>
                    <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/10 mb-3">
                      Upper Body
                    </div>
                    <h3 className="text-3xl font-black uppercase italic leading-none tracking-tighter drop-shadow-lg">
                      The Power <br /> <span className="text-[#a6f20d]">Phase</span>
                    </h3>
                    <p className="mt-2 text-xs font-medium text-slate-300 max-w-[70%]">Build explosive strength and muscle density.</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">timer</span> 45m</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">local_fire_department</span> High</span>
                    </div>
                    <button
                      onClick={() => startWorkout("upper")}
                      className="h-10 px-4 rounded-full bg-[#a6f20d] text-slate-900 font-black text-xs uppercase tracking-tight hover:scale-105 active:scale-95 transition-transform shadow-[0_0_15px_rgba(166,242,13,0.3)] flex items-center gap-1 cursor-pointer"
                    >
                      Let's GO
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Lower Body Card */}
              <div className="relative overflow-hidden rounded-[2rem] bg-slate-800 text-white shadow-xl group w-full h-[280px] shrink-0">
                <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-overlay opacity-60"></div>
                </div>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
                <div className="relative z-10 flex flex-col p-6 h-full justify-between">
                  <div>
                    <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/10 mb-3">
                      Lower Body
                    </div>
                    <h3 className="text-3xl font-black uppercase italic leading-none tracking-tighter drop-shadow-lg">
                      Foundation <br /> <span className="text-white">Builder</span>
                    </h3>
                    <p className="mt-2 text-xs font-medium text-slate-300 max-w-[70%]">Maximize leg drive and core stability.</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">timer</span> 55m</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">fitness_center</span> Heavy</span>
                    </div>
                    <button
                      onClick={() => startWorkout("lower")}
                      className="h-10 px-4 rounded-full bg-white text-slate-900 font-black text-xs uppercase tracking-tight hover:scale-105 active:scale-95 transition-transform flex items-center gap-1 cursor-pointer"
                    >
                      Let's GO
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Premium Flows Card */}
              <div className="relative overflow-hidden rounded-[2rem] bg-slate-800 text-white shadow-xl group w-full h-[280px] shrink-0">
                <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1469&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-overlay"></div>
                </div>
                <div className="absolute inset-0 z-0 bg-gradient-to-tl from-indigo-900/90 via-slate-900/80 to-slate-900"></div>
                <div className="relative z-10 flex flex-col p-6 h-full justify-between">
                  <div>
                    <div className="flex justify-between items-start w-full">
                      <div className="inline-flex items-center rounded-full bg-indigo-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-300 backdrop-blur-md border border-indigo-500/30 mb-3">
                        Premium Flows
                      </div>
                      <span className="material-symbols-outlined text-[#a6f20d] text-xl">workspace_premium</span>
                    </div>
                    <h3 className="text-3xl font-black uppercase italic leading-none tracking-tighter drop-shadow-lg text-white">
                      Yoga & <br />Animal Flow
                    </h3>
                    <p className="mt-2 text-xs font-medium text-slate-300 max-w-[80%]">Free for you. Paid for by everyone else.</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">timer</span> 30m</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">self_improvement</span> Flow</span>
                    </div>
                    <button
                      onClick={() => setShowPremium(true)}
                      className="h-10 px-4 rounded-full bg-transparent border-2 border-[#a6f20d] text-[#a6f20d] font-black text-xs uppercase tracking-tight hover:bg-[#a6f20d] hover:text-slate-900 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      Let's GO
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-900/95 backdrop-blur-lg max-w-md mx-auto">
          <div className="flex items-center justify-around px-2 py-3">
            <button className="flex flex-1 flex-col items-center gap-1 text-[#a6f20d] cursor-pointer bg-transparent border-none">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
              <span className="text-[10px] font-medium">Home</span>
            </button>
            <button onClick={() => setScreen("progress")} className="flex flex-1 flex-col items-center gap-1 text-slate-400 hover:text-slate-300 transition-colors cursor-pointer bg-transparent border-none">
              <span className="material-symbols-outlined">person</span>
              <span className="text-[10px] font-medium">Profile</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
