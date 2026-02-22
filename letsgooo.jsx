import { useState, useEffect, useRef, useCallback } from "react";

// ─── SVG EXERCISE ILLUSTRATIONS ─────────────────────────────────────────────
function ExerciseFigure({ name, size = 72 }) {
  return <svg viewBox="0 0 80 80" width={size} height={size} style={{ display: "block" }}>{getExerciseSVG(name)}</svg>;
}

function getExerciseSVG(name) {
  const n = name.toLowerCase();
  const S = { stroke: "#BAFF39", strokeWidth: 2.5, strokeLinecap: "round", fill: "none" };
  const hd = (cx, cy) => <circle cx={cx} cy={cy} r={5} {...S} />;
  const gnd = <line x1="5" y1="72" x2="75" y2="72" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
  const L = (a,b,c,d) => <line x1={a} y1={b} x2={c} y2={d} {...S} />;
  const bx = (x,y,w,h) => <rect x={x} y={y} width={w} height={h} rx="2" fill="rgba(186,255,57,0.25)" />;

  // PUSH-UPS (prone, arms down)
  if (n.includes("push-up")||n.includes("pushup")||n.includes("push up")) {
    if (n.includes("pike")) return <g>{gnd}{hd(30,22)}{L(30,28,40,50)}{L(40,50,58,48)}{L(30,28,25,45)}{L(25,45,26,70)}{L(40,50,38,62)}{L(38,62,40,70)}</g>;
    if (n.includes("decline")) return <g>{gnd}{hd(15,35)}{L(20,37,40,42)}{L(40,42,58,35)}{L(20,37,25,55)}{L(25,55,27,70)}{L(40,42,38,58)}{L(38,58,40,70)}{bx(56,28,14,8)}</g>;
    if (n.includes("explosive")||n.includes("clap")) return <g>{gnd}{hd(25,28)}{L(25,34,40,44)}{L(40,44,58,50)}{L(25,34,18,22)}{L(25,34,32,22)}{L(40,44,38,58)}{L(38,58,40,70)}</g>;
    if (n.includes("archer")) return <g>{gnd}{hd(20,38)}{L(25,40,45,44)}{L(45,44,65,48)}{L(25,40,10,35)}{L(25,40,30,55)}{L(30,55,32,70)}{L(45,44,42,58)}{L(42,58,43,70)}</g>;
    if (n.includes("wide")) return <g>{gnd}{hd(18,38)}{L(23,40,42,44)}{L(42,44,65,48)}{L(23,40,12,55)}{L(12,55,10,70)}{L(42,44,50,58)}{L(50,58,52,70)}</g>;
    if (n.includes("diamond")) return <g>{gnd}{hd(18,38)}{L(23,40,42,44)}{L(42,44,65,48)}{L(23,40,30,55)}{L(30,55,33,70)}{L(42,44,38,58)}{L(38,58,40,70)}<text x="29" y="68" fontSize="7" fill="rgba(186,255,57,0.5)">◆</text></g>;
    // generic pushup
    return <g>{gnd}{hd(18,38)}{L(23,40,42,44)}{L(42,44,65,48)}{L(23,40,28,55)}{L(28,55,30,70)}{L(42,44,40,58)}{L(40,58,42,70)}</g>;
  }
  // PULL-UPS / CHIN-UPS
  if (n.includes("pull-up")||n.includes("pullup")||n.includes("chin-up")||n.includes("chin up")||n.includes("lat pulldown")||n.includes("pulldown")) {
    return <g>{gnd}<rect x="22" y="8" width="36" height="3" rx="1.5" stroke="rgba(186,255,57,0.3)" strokeWidth="1.5" fill="none"/>{hd(40,20)}{L(40,26,40,46)}{L(40,26,28,12)}{L(40,26,52,12)}{L(40,46,34,60)}{L(34,60,32,70)}{L(40,46,46,60)}{L(46,60,48,70)}</g>;
  }
  // ROWS
  if (n.includes("row")) {
    if (n.includes("inverted")||n.includes("australian")) return <g>{gnd}<line x1="15" y1="22" x2="55" y2="22" stroke="rgba(186,255,57,0.2)" strokeWidth="1.5"/>{hd(45,30)}{L(45,36,38,50)}{L(38,50,20,70)}{L(45,36,35,26)}{L(38,50,28,58)}{L(28,58,22,70)}</g>;
    if (n.includes("renegade")) return <g>{gnd}{hd(18,38)}{L(23,40,42,44)}{L(42,44,62,48)}{L(23,40,18,28)}{L(42,44,40,58)}{L(40,58,42,70)}{L(23,40,30,55)}{L(30,55,32,70)}{bx(14,24,8,5)}</g>;
    return <g>{gnd}{hd(28,25)}{L(28,31,40,45)}{L(40,45,38,60)}{L(38,60,40,70)}{L(40,45,45,60)}{L(45,60,48,70)}{L(28,31,22,45)}{L(28,31,36,36)}{bx(18,43,8,5)}</g>;
  }
  // DIPS
  if (n.includes("dip")) {
    return <g>{gnd}<rect x="18" y="30" width="3" height="42" rx="1" stroke="rgba(186,255,57,0.25)" strokeWidth="1" fill="none"/><rect x="59" y="30" width="3" height="42" rx="1" stroke="rgba(186,255,57,0.25)" strokeWidth="1" fill="none"/>{hd(40,22)}{L(40,28,40,48)}{L(40,28,22,34)}{L(40,28,59,34)}{L(40,48,35,62)}{L(35,62,34,70)}{L(40,48,45,62)}{L(45,62,46,70)}</g>;
  }
  // SQUATS
  if (n.includes("squat")&&!n.includes("split")) {
    if (n.includes("pistol")||n.includes("shrimp")||n.includes("skater")) return <g>{gnd}{hd(35,15)}{L(35,21,35,38)}{L(35,38,30,52)}{L(30,52,32,70)}{L(35,38,50,45)}{L(50,45,58,40)}{L(35,21,25,30)}{L(35,21,48,28)}</g>;
    if (n.includes("jump")) return <g>{gnd}{hd(40,8)}{L(40,14,40,32)}{L(40,32,34,48)}{L(34,48,36,58)}{L(40,32,46,48)}{L(46,48,44,58)}{L(40,18,30,24)}{L(40,18,50,24)}<path d="M34,60 L37,66 L40,60 L43,66 L46,60" stroke="rgba(186,255,57,0.3)" strokeWidth="1" fill="none"/></g>;
    if (n.includes("goblet")||n.includes("front")) return <g>{gnd}{hd(40,15)}{L(40,21,40,40)}{L(40,40,32,55)}{L(32,55,34,70)}{L(40,40,48,55)}{L(48,55,46,70)}{L(40,25,35,30)}{L(40,25,45,30)}{bx(34,28,12,5)}</g>;
    if (n.includes("sumo")) return <g>{gnd}{hd(40,15)}{L(40,21,40,40)}{L(40,40,25,55)}{L(25,55,22,70)}{L(40,40,55,55)}{L(55,55,58,70)}{L(40,25,32,32)}{L(40,25,48,32)}</g>;
    if (n.includes("sissy")||n.includes("pendulum")) return <g>{gnd}{hd(40,12)}{L(40,18,42,38)}{L(42,38,44,55)}{L(44,55,44,70)}{L(42,38,38,55)}{L(38,55,36,70)}{L(40,22,50,28)}{L(40,22,30,28)}</g>;
    // back squat / pause squat / hack / generic
    return <g>{gnd}{hd(40,15)}{L(40,21,40,40)}{L(40,40,34,55)}{L(34,55,36,70)}{L(40,40,46,55)}{L(46,55,44,70)}{L(40,25,30,30)}{L(40,25,50,30)}<line x1="28" y1="22" x2="52" y2="22" stroke="rgba(186,255,57,0.3)" strokeWidth="2"/></g>;
  }
  // SPLIT SQUATS / LUNGES
  if (n.includes("split squat")||n.includes("bulgarian")||n.includes("lunge")||n.includes("curtsy")) {
    return <g>{gnd}{hd(38,12)}{L(38,18,38,38)}{L(38,38,28,55)}{L(28,55,26,70)}{L(38,38,52,52)}{L(52,52,58,70)}{L(38,22,32,30)}{L(38,22,44,30)}{n.includes("bulgarian")&&bx(55,50,14,8)}</g>;
  }
  // DEADLIFTS
  if (n.includes("deadlift")||n.includes("rdl")||n.includes("romanian")||n.includes("stiff-leg")||n.includes("good morning")) {
    return <g>{gnd}{hd(30,18)}{L(30,24,38,42)}{L(38,42,36,58)}{L(36,58,38,70)}{L(38,42,42,58)}{L(42,58,44,70)}{L(30,24,24,40)}{L(30,24,36,35)}{bx(20,38,20,4)}</g>;
  }
  // BENCH PRESS
  if (n.includes("bench press")||n.includes("floor press")) {
    return <g>{gnd}<rect x="20" y="55" width="40" height="3" rx="1" stroke="rgba(186,255,57,0.2)" strokeWidth="1" fill="none"/>{hd(30,48)}{L(30,54,58,54)}{L(58,54,60,64)}{L(60,64,60,70)}{L(30,54,25,42)}{L(30,54,45,42)}{bx(18,38,34,4)}</g>;
  }
  // OVERHEAD / SHOULDER PRESS
  if (n.includes("overhead press")||n.includes("shoulder press")||n.includes("arnold")||n.includes("z-press")||n.includes("push press")||n.includes("military")) {
    return <g>{gnd}{hd(40,12)}{L(40,18,40,42)}{L(40,42,36,58)}{L(36,58,38,70)}{L(40,42,44,58)}{L(44,58,42,70)}{L(40,22,28,12)}{L(40,22,52,12)}{bx(24,8,32,4)}</g>;
  }
  // CURLS (not leg/nordic/ham)
  if (n.includes("curl")&&!n.includes("nordic")&&!n.includes("leg")&&!n.includes("ham")) {
    return <g>{gnd}{hd(40,12)}{L(40,18,40,42)}{L(40,42,38,58)}{L(38,58,40,70)}{L(40,42,42,58)}{L(42,58,40,70)}{L(40,25,32,32)}{L(32,32,30,22)}{L(40,25,48,32)}{L(48,32,50,22)}{bx(27,19,6,4)}{bx(47,19,6,4)}</g>;
  }
  // LATERAL RAISE / FLYES
  if (n.includes("lateral")||n.includes("raise")||n.includes("flye")||n.includes("fly")||n.includes("y-t-w")||n.includes("face pull")||n.includes("reverse flye")) {
    return <g>{gnd}{hd(40,12)}{L(40,18,40,42)}{L(40,42,38,58)}{L(38,58,40,70)}{L(40,42,42,58)}{L(42,58,40,70)}{L(40,25,20,28)}{L(40,25,60,28)}<circle cx="18" cy="28" r="2.5" fill="rgba(186,255,57,0.4)"/><circle cx="62" cy="28" r="2.5" fill="rgba(186,255,57,0.4)"/></g>;
  }
  // TRICEP
  if (n.includes("tricep")||n.includes("kickback")||n.includes("skull")||n.includes("pushdown")||n.includes("extension")) {
    return <g>{gnd}{hd(40,12)}{L(40,18,40,42)}{L(40,42,38,58)}{L(38,58,40,70)}{L(40,42,42,58)}{L(42,58,40,70)}{L(40,22,32,28)}{L(32,28,28,40)}{L(40,22,48,28)}{L(48,28,52,40)}</g>;
  }
  // HIP THRUST / GLUTE BRIDGE
  if (n.includes("hip thrust")||n.includes("glute bridge")||n.includes("frog pump")) {
    return <g>{gnd}{hd(20,42)}{L(25,44,40,35)}{L(40,35,50,42)}{L(50,42,55,55)}{L(55,55,55,70)}{L(50,42,45,55)}{L(45,55,45,70)}</g>;
  }
  // CALF RAISES
  if (n.includes("calf")) {
    return <g>{gnd}{hd(40,8)}{L(40,14,40,38)}{L(40,38,40,55)}{L(40,55,40,65)}{L(40,18,34,28)}{L(40,18,46,28)}<circle cx="40" cy="68" r="3" stroke="#BAFF39" strokeWidth="1.5" fill="none"/></g>;
  }
  // WALL SIT
  if (n.includes("wall sit")) {
    return <g>{gnd}<rect x="58" y="10" width="4" height="62" rx="1" stroke="rgba(186,255,57,0.2)" strokeWidth="1" fill="none"/>{hd(48,18)}{L(48,24,52,42)}{L(52,42,42,55)}{L(42,55,42,70)}{L(52,42,48,55)}{L(48,55,48,70)}{L(48,28,42,35)}{L(48,28,55,35)}</g>;
  }
  // PLANK / COMMANDOS / SHOULDER TAPS
  if (n.includes("plank")||n.includes("commando")||n.includes("shoulder tap")) {
    return <g>{gnd}{hd(18,40)}{L(23,42,42,44)}{L(42,44,62,46)}{L(23,42,23,58)}{L(23,58,23,70)}{L(42,44,42,58)}{L(42,58,42,70)}</g>;
  }
  // SUPERMAN
  if (n.includes("superman")) {
    return <g>{gnd}{hd(18,48)}{L(23,50,42,54)}{L(42,54,62,52)}{L(18,48,10,40)}{L(62,52,70,46)}</g>;
  }
  // HANDSTAND
  if (n.includes("handstand")) {
    return <g>{gnd}<rect x="60" y="10" width="4" height="62" rx="1" stroke="rgba(186,255,57,0.2)" strokeWidth="1" fill="none"/>{hd(50,62)}{L(50,56,50,38)}{L(50,38,45,22)}{L(50,38,55,22)}{L(50,56,46,70)}{L(50,56,54,70)}</g>;
  }
  // LEG PRESS / LEG EXT / LEG CURL / HACK / MACHINE
  if (n.includes("leg press")||n.includes("hack squat")||n.includes("leg extension")||n.includes("leg curl")||n.includes("machine")||n.includes("pec deck")) {
    return <g>{gnd}<rect x="15" y="38" width="50" height="22" rx="5" stroke="rgba(186,255,57,0.12)" strokeWidth="1" fill="rgba(186,255,57,0.02)"/>{hd(25,30)}{L(25,36,30,48)}{L(30,48,45,45)}{L(45,45,55,35)}{L(25,36,20,45)}</g>;
  }
  // CABLE
  if (n.includes("cable")||n.includes("pull-through")||n.includes("crossover")||n.includes("straight-arm")) {
    return <g>{gnd}<rect x="62" y="8" width="8" height="64" rx="3" stroke="rgba(186,255,57,0.12)" strokeWidth="1" fill="rgba(186,255,57,0.02)"/><line x1="66" y1="12" x2="48" y2="25" stroke="rgba(186,255,57,0.3)" strokeWidth="1"/>{hd(40,18)}{L(40,24,40,45)}{L(40,45,38,58)}{L(38,58,40,70)}{L(40,45,42,58)}{L(42,58,40,70)}{L(40,25,48,25)}{L(40,25,46,30)}</g>;
  }
  // STEP-UPS / BOX JUMPS
  if (n.includes("step-up")||n.includes("step up")||n.includes("box jump")) {
    return <g>{gnd}<rect x="35" y="52" width="25" height="20" rx="3" stroke="rgba(186,255,57,0.2)" strokeWidth="1.5" fill="rgba(186,255,57,0.04)"/>{hd(40,10)}{L(40,16,40,35)}{L(40,35,42,50)}{L(40,35,35,50)}{L(35,50,30,70)}{L(40,20,34,28)}{L(40,20,46,28)}</g>;
  }
  // LANDMINE
  if (n.includes("landmine")) {
    return <g>{gnd}{hd(35,12)}{L(35,18,38,42)}{L(38,42,36,58)}{L(36,58,38,70)}{L(38,42,42,58)}{L(42,58,40,70)}{L(35,22,30,14)}<line x1="30" y1="14" x2="15" y2="70" stroke="rgba(186,255,57,0.3)" strokeWidth="2"/></g>;
  }
  // FARMER WALK
  if (n.includes("farmer")) {
    return <g>{gnd}{hd(40,10)}{L(40,16,40,40)}{L(40,40,34,55)}{L(34,55,32,70)}{L(40,40,46,55)}{L(46,55,48,70)}{L(40,22,28,42)}{L(40,22,52,42)}{bx(24,42,8,6)}{bx(48,42,8,6)}</g>;
  }
  // DONKEY KICK / FIRE HYDRANT
  if (n.includes("donkey")||n.includes("fire hydrant")||n.includes("kickthrough")) {
    return <g>{gnd}{hd(22,42)}{L(27,44,40,48)}{L(40,48,55,42)}{L(27,44,27,58)}{L(27,58,27,70)}{L(40,48,40,62)}{L(40,62,40,70)}</g>;
  }
  // BROAD JUMP
  if (n.includes("broad jump")) {
    return <g>{gnd}{hd(25,12)}{L(25,18,30,35)}{L(30,35,22,50)}{L(22,50,18,60)}{L(30,35,28,50)}{L(28,50,24,60)}{L(25,22,35,18)}{L(25,22,20,28)}<path d="M32,8 Q48,4 60,14" stroke="rgba(186,255,57,0.3)" strokeWidth="1.5" fill="none"/></g>;
  }
  // HAMSTRING / NORDIC / GHR
  if (n.includes("hamstring")||n.includes("nordic")||n.includes("ghr")||n.includes("glute ham")) {
    return <g>{gnd}{hd(30,18)}{L(30,24,35,42)}{L(35,42,40,58)}{L(40,58,42,70)}{L(35,42,50,58)}{L(50,58,55,70)}{L(30,24,24,35)}{L(30,24,38,32)}</g>;
  }
  // SWING
  if (n.includes("swing")) {
    return <g>{gnd}{hd(40,12)}{L(40,18,40,38)}{L(40,38,36,55)}{L(36,55,38,70)}{L(40,38,44,55)}{L(44,55,42,70)}{L(40,25,34,18)}{L(40,25,46,18)}<circle cx="40" cy="14" r="3.5" stroke="#BAFF39" strokeWidth="1.5" fill="rgba(186,255,57,0.15)"/></g>;
  }
  // T-BAR / MEADOWS ROW
  if (n.includes("t-bar")||n.includes("meadow")) {
    return <g>{gnd}{hd(30,22)}{L(30,28,40,42)}{L(40,42,38,58)}{L(38,58,40,70)}{L(40,42,44,58)}{L(44,58,42,70)}{L(30,28,22,40)}{L(22,40,10,70)}</g>;
  }
  // TRAP BAR
  if (n.includes("trap bar")) {
    return <g>{gnd}{hd(40,10)}{L(40,16,40,36)}{L(40,36,38,52)}{L(38,52,40,70)}{L(40,36,42,52)}{L(42,52,40,70)}{L(40,22,28,38)}{L(40,22,52,38)}<rect x="22" y="36" width="36" height="8" rx="3" stroke="rgba(186,255,57,0.25)" strokeWidth="1" fill="none"/></g>;
  }
  // PULLOVER
  if (n.includes("pullover")) {
    return <g>{gnd}<rect x="20" y="52" width="40" height="3" rx="1" stroke="rgba(186,255,57,0.2)" strokeWidth="1" fill="none"/>{hd(30,48)}{L(30,53,55,54)}{L(55,54,58,62)}{L(58,62,60,70)}{L(30,53,20,38)}{bx(16,34,8,5)}</g>;
  }
  // ABDUCTOR / ADDUCTOR / BUTTERFLY
  if (n.includes("abduct")||n.includes("adduct")||n.includes("butterfly")) {
    return <g>{gnd}{hd(40,15)}{L(40,21,40,42)}{L(40,42,22,58)}{L(22,58,18,70)}{L(40,42,58,58)}{L(58,58,62,70)}{L(40,25,34,32)}{L(40,25,46,32)}</g>;
  }
  // REVERSE HYPER
  if (n.includes("hyperextension")||n.includes("reverse hyper")) {
    return <g>{gnd}<rect x="25" y="40" width="30" height="6" rx="3" stroke="rgba(186,255,57,0.2)" strokeWidth="1" fill="none"/>{hd(20,38)}{L(25,40,40,44)}{L(40,44,58,38)}{L(58,38,65,30)}{L(20,38,15,50)}</g>;
  }
  // SCAPULAR
  if (n.includes("scapular")||n.includes("doorframe")) {
    return <g>{gnd}{hd(18,40)}{L(23,42,42,44)}{L(42,44,62,46)}{L(23,42,23,58)}{L(23,58,23,70)}{L(42,44,42,58)}{L(42,58,42,70)}</g>;
  }
  // ISOMETRIC / TOWEL / HOLD
  if (n.includes("isometric")||n.includes("towel")||n.includes("hold")) {
    return <g>{gnd}{hd(40,12)}{L(40,18,40,42)}{L(40,42,38,58)}{L(38,58,40,70)}{L(40,42,42,58)}{L(42,58,40,70)}{L(40,25,32,30)}{L(32,30,30,24)}{L(40,25,48,30)}{L(48,30,50,24)}<path d="M30,23 Q40,20 50,23" stroke="rgba(186,255,57,0.3)" strokeWidth="1.5" fill="none"/></g>;
  }
  // TIBIALIS
  if (n.includes("tibialis")) {
    return <g>{gnd}{hd(40,12)}{L(40,18,40,42)}{L(40,42,38,58)}{L(38,58,38,68)}{L(40,42,42,58)}{L(42,58,42,68)}{L(40,22,34,30)}{L(40,22,46,30)}<path d="M36,68 L40,64 L44,68" stroke="#BAFF39" strokeWidth="1.5" fill="none"/></g>;
  }
  // EZ-BAR / PREACHER / SPIDER / SUPERSET
  if (n.includes("ez-bar")||n.includes("preacher")||n.includes("spider")||n.includes("superset")||n.includes("zottman")||n.includes("concentration")) {
    return <g>{gnd}{hd(40,12)}{L(40,18,40,42)}{L(40,42,38,58)}{L(38,58,40,70)}{L(40,42,42,58)}{L(42,58,40,70)}{L(40,25,33,32)}{L(33,32,30,24)}{L(40,25,47,32)}{L(47,32,50,24)}{bx(28,21,5,4)}{bx(48,21,5,4)}</g>;
  }
  // INCLINE PRESS
  if (n.includes("incline")) {
    return <g>{gnd}<line x1="20" y1="60" x2="35" y2="40" stroke="rgba(186,255,57,0.2)" strokeWidth="1.5"/>{hd(32,35)}{L(32,40,50,55)}{L(50,55,55,64)}{L(55,64,55,70)}{L(32,40,25,30)}{L(32,40,42,30)}{bx(20,26,28,4)}</g>;
  }
  // DEFAULT: standing figure
  return <g>{gnd}{hd(40,12)}{L(40,18,40,42)}{L(40,42,36,58)}{L(36,58,38,70)}{L(40,42,44,58)}{L(44,58,42,70)}{L(40,25,30,32)}{L(40,25,50,32)}</g>;
}


// ─── WORKOUT DATABASE ───────────────────────────────────────────────────────
const WORKOUTS = {
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

const STRETCHES = {
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

const YOGA_FLOWS = [
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

const ANIMAL_FLOWS = [
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
function calcIntensity(profile) {
  if (!profile) return "moderate";
  const bmi = profile.weight / ((profile.height / 100) ** 2);
  const strength = profile.liftCapacity || "moderate";
  if (strength === "beginner" || bmi > 30) return "light";
  if (strength === "advanced" && bmi < 28) return "intense";
  return "moderate";
}

function adjustWorkout(exercises, intensity) {
  const multipliers = { light: 0.75, moderate: 1, intense: 1.25 };
  const m = multipliers[intensity];
  return exercises.map(ex => ({
    ...ex,
    sets: Math.max(2, Math.round(ex.sets * m)),
    reps: ex.reps,
  }));
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function GlowText({ children, className = "" }) {
  return (
    <span className={`relative ${className}`}>
      {children}
    </span>
  );
}

// ── Onboarding ──────────────────────────────────────────────────────────────
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [liftCapacity, setLiftCapacity] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("lbs");

  const steps = [
    {
      title: "What's your name?",
      subtitle: "Let's get personal",
      content: (
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          style={inputStyle}
          autoFocus
        />
      ),
      valid: name.length > 0,
    },
    {
      title: "How tall are you?",
      subtitle: "We'll calibrate everything",
      content: (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <input
            type="number"
            value={height}
            onChange={e => setHeight(e.target.value)}
            placeholder={heightUnit === "cm" ? "175" : "69"}
            style={{ ...inputStyle, flex: 1 }}
            autoFocus
          />
          <div style={{ display: "flex", gap: 4 }}>
            {["cm", "in"].map(u => (
              <button
                key={u}
                onClick={() => setHeightUnit(u)}
                style={{
                  ...pillBtn,
                  background: heightUnit === u ? "#BAFF39" : "rgba(255,255,255,0.06)",
                  color: heightUnit === u ? "#0a0a0a" : "#999",
                }}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      ),
      valid: height > 0,
    },
    {
      title: "Current weight?",
      subtitle: "This is your baseline — we'll check in monthly",
      content: (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder={weightUnit === "lbs" ? "175" : "80"}
            style={{ ...inputStyle, flex: 1 }}
            autoFocus
          />
          <div style={{ display: "flex", gap: 4 }}>
            {["lbs", "kg"].map(u => (
              <button
                key={u}
                onClick={() => setWeightUnit(u)}
                style={{
                  ...pillBtn,
                  background: weightUnit === u ? "#BAFF39" : "rgba(255,255,255,0.06)",
                  color: weightUnit === u ? "#0a0a0a" : "#999",
                }}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      ),
      valid: weight > 0,
    },
    {
      title: "Lifting experience?",
      subtitle: "We'll scale your workouts perfectly",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { val: "beginner", label: "Beginner", desc: "New or returning after a break" },
            { val: "moderate", label: "Intermediate", desc: "Consistent for 6+ months" },
            { val: "advanced", label: "Advanced", desc: "2+ years, strong foundation" },
          ].map(opt => (
            <button
              key={opt.val}
              onClick={() => setLiftCapacity(opt.val)}
              style={{
                ...cardBtn,
                border: liftCapacity === opt.val ? "2px solid #BAFF39" : "2px solid rgba(255,255,255,0.08)",
                background: liftCapacity === opt.val ? "rgba(186,255,57,0.08)" : "rgba(255,255,255,0.03)",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 16, color: liftCapacity === opt.val ? "#BAFF39" : "#fff" }}>{opt.label}</div>
              <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{opt.desc}</div>
            </button>
          ))}
        </div>
      ),
      valid: liftCapacity.length > 0,
    },
  ];

  const handleComplete = () => {
    const h = heightUnit === "in" ? parseFloat(height) * 2.54 : parseFloat(height);
    const w = weightUnit === "kg" ? parseFloat(weight) * 2.205 : parseFloat(weight);
    onComplete({
      name,
      height: h,
      weight: w,
      liftCapacity,
      createdAt: Date.now(),
      lastBaseline: Date.now(),
    });
  };

  const curr = steps[step];

  return (
    <div style={screenContainer}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.06)" }}>
        <div style={{ height: "100%", width: `${((step + 1) / steps.length) * 100}%`, background: "#BAFF39", transition: "width 0.5s ease", borderRadius: 2 }} />
      </div>

      <div style={{ textAlign: "center", marginBottom: 60, marginTop: 40 }}>
        <div style={{ fontSize: 13, color: "#BAFF39", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 3, marginBottom: 12 }}>
          STEP {step + 1} OF {steps.length}
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
          {curr.title}
        </h2>
        <p style={{ color: "#777", fontSize: 15, marginTop: 8 }}>{curr.subtitle}</p>
      </div>

      <div style={{ maxWidth: 380, width: "100%", margin: "0 auto" }}>
        {curr.content}
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 48 }}>
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} style={{ ...actionBtn, background: "rgba(255,255,255,0.06)", color: "#999" }}>
            Back
          </button>
        )}
        <button
          onClick={() => step === steps.length - 1 ? handleComplete() : setStep(s => s + 1)}
          disabled={!curr.valid}
          style={{
            ...actionBtn,
            background: curr.valid ? "#BAFF39" : "rgba(186,255,57,0.15)",
            color: curr.valid ? "#0a0a0a" : "rgba(186,255,57,0.4)",
            cursor: curr.valid ? "pointer" : "not-allowed",
            fontWeight: 800,
            minWidth: 160,
          }}
        >
          {step === steps.length - 1 ? "LET'S GOOOO 🚀" : "Continue →"}
        </button>
      </div>
    </div>
  );
}

// ── Meditation Timer ────────────────────────────────────────────────────────
function MeditationTimer({ onClose }) {
  const [duration, setDuration] = useState(300);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const intervalRef = useRef(null);

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

  const progress = 1 - timeLeft / duration;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const circumference = 2 * Math.PI * 120;

  return (
    <div style={{
      ...screenContainer,
      background: "radial-gradient(ellipse at 50% 30%, rgba(186,255,57,0.04) 0%, #0a0a0a 70%)",
    }}>
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <div style={{ fontSize: 13, color: "#BAFF39", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 4, marginBottom: 8 }}>
          MINDFULNESS
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: 0 }}>
          {isDone ? "Session Complete ✨" : "Post-Workout Meditation"}
        </h2>
        <p style={{ color: "#666", fontSize: 14, marginTop: 6 }}>Breathe deeply. You earned this.</p>
      </div>

      <div style={{ position: "relative", width: 280, height: 280, margin: "40px auto" }}>
        <svg width="280" height="280" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="140" cy="140" r="120" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
          <circle
            cx="140" cy="140" r="120" fill="none"
            stroke="#BAFF39"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            fontSize: 56, fontWeight: 200, color: "#fff",
            fontFamily: "'JetBrains Mono', monospace", letterSpacing: 4,
          }}>
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </div>
          {isRunning && (
            <div style={{
              fontSize: 13, color: "rgba(186,255,57,0.6)", marginTop: 8,
              animation: "pulse 3s ease-in-out infinite",
            }}>
              Breathe...
            </div>
          )}
        </div>
      </div>

      {!isRunning && !isDone && (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24 }}>
          {[180, 300, 600].map(d => (
            <button
              key={d}
              onClick={() => { setDuration(d); setTimeLeft(d); }}
              style={{
                ...pillBtn,
                background: duration === d ? "#BAFF39" : "rgba(255,255,255,0.06)",
                color: duration === d ? "#0a0a0a" : "#999",
              }}
            >
              {d / 60} min
            </button>
          ))}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        {isDone ? (
          <button onClick={onClose} style={{ ...actionBtn, background: "#BAFF39", color: "#0a0a0a", fontWeight: 800, minWidth: 220 }}>
            Done — Back to Home 🏠
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsRunning(!isRunning)}
              style={{ ...actionBtn, background: isRunning ? "rgba(255,100,100,0.15)" : "#BAFF39", color: isRunning ? "#ff6464" : "#0a0a0a", fontWeight: 800, minWidth: 200 }}
            >
              {isRunning ? "Pause" : "Begin Meditation"}
            </button>
            <button onClick={onClose} style={{ ...actionBtn, background: "transparent", color: "#555", fontSize: 13, padding: "8px 16px" }}>
              Skip & Finish Workout
            </button>
          </>
        )}
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

  return (
    <div style={screenContainer}>
      <div style={{ fontSize: 13, color: "#BAFF39", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 4, textAlign: "center", marginBottom: 8 }}>
        COOL DOWN
      </div>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", textAlign: "center", margin: 0 }}>
        Stretching
      </h2>
      <p style={{ color: "#666", textAlign: "center", marginTop: 4, fontSize: 14 }}>
        {currentIdx + 1} of {stretches.length}
      </p>

      <div style={{
        background: "rgba(255,255,255,0.03)", borderRadius: 20, padding: 32,
        textAlign: "center", maxWidth: 360, margin: "32px auto", border: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>{s.icon}</div>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>{s.name}</h3>
        <div style={{ color: "#BAFF39", fontSize: 14, marginTop: 8, fontFamily: "'JetBrains Mono', monospace" }}>
          Hold: {s.duration}
        </div>
        <div style={{
          fontSize: 48, fontWeight: 200, color: "#fff", marginTop: 24,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          {timer}s
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          {allDone ? (
            <button onClick={onComplete} style={{ ...actionBtn, background: "#BAFF39", color: "#0a0a0a", fontWeight: 800 }}>
              Continue to Meditation →
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsRunning(!isRunning)}
                style={{ ...actionBtn, background: isRunning ? "rgba(255,100,100,0.15)" : "#BAFF39", color: isRunning ? "#ff6464" : "#0a0a0a", fontWeight: 800 }}
              >
                {isRunning ? "Pause" : "Start Timer"}
              </button>
              <button
                onClick={() => { setCurrentIdx(i => Math.min(i + 1, stretches.length - 1)); setTimer(30); setIsRunning(false); }}
                style={{ ...actionBtn, background: "rgba(255,255,255,0.06)", color: "#999" }}
              >
                Skip →
              </button>
            </>
          )}
        </div>
        {!allDone && (
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button onClick={onComplete} style={{ ...actionBtn, background: "transparent", color: "#888", fontSize: 13, padding: "8px 16px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10 }}>
              Skip to Meditation
            </button>
            <button onClick={onSkip} style={{ ...actionBtn, background: "transparent", color: "#555", fontSize: 13, padding: "8px 16px" }}>
              End & Go Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Workout View (per-set tracking) ─────────────────────────────────────────
function WorkoutView({ exercises, bodyPart, mode, onFinish, onExit }) {
  // completedSets: { exerciseIndex: Set of completed set indices }
  const [completedSets, setCompletedSets] = useState(() => {
    const init = {};
    exercises.forEach((_, i) => { init[i] = new Set(); });
    return init;
  });
  const [expanded, setExpanded] = useState(null);
  const [restTimer, setRestTimer] = useState(null);
  const [restLeft, setRestLeft] = useState(0);
  const intervalRef = useRef(null);

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

  const toggleSetAndRest = (exIdx, setIdx, restSeconds) => {
    const wasCompleted = completedSets[exIdx]?.has(setIdx);
    toggleSet(exIdx, setIdx);
    // Auto-start rest timer when checking a set (not unchecking)
    if (!wasCompleted) {
      startRest(restSeconds);
    }
  };

  // Totals
  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const completedTotal = Object.values(completedSets).reduce((acc, s) => acc + s.size, 0);
  const allDone = completedTotal === totalSets;

  const isExDone = (i) => completedSets[i]?.size === exercises[i].sets;
  const exProgress = (i) => (completedSets[i]?.size || 0) / exercises[i].sets;

  return (
    <div style={{ padding: "24px 16px", maxWidth: 500, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 13, color: "#BAFF39", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 3 }}>
            {bodyPart.toUpperCase()} DAY — {mode.toUpperCase()}
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "4px 0 0" }}>Your Workout</h2>
        </div>
        <div style={{
          background: "rgba(186,255,57,0.1)", borderRadius: 12, padding: "8px 14px",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "#BAFF39",
        }}>
          {completedTotal}/{totalSets} sets
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginBottom: 24 }}>
        <div style={{
          height: "100%", width: `${(completedTotal / totalSets) * 100}%`,
          background: "linear-gradient(90deg, #BAFF39, #7aff39)", borderRadius: 2,
          transition: "width 0.4s ease",
        }} />
      </div>

      {/* Rest timer overlay */}
      {restTimer && (
        <div style={{
          background: "rgba(186,255,57,0.06)", border: "1px solid rgba(186,255,57,0.2)",
          borderRadius: 16, padding: 20, textAlign: "center", marginBottom: 20,
          position: "sticky", top: 8, zIndex: 10,
          backdropFilter: "blur(12px)",
        }}>
          <div style={{ fontSize: 13, color: "#BAFF39", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2 }}>REST</div>
          <div style={{ fontSize: 48, fontWeight: 200, color: "#fff", fontFamily: "'JetBrains Mono', monospace" }}>{restLeft}s</div>
          <button onClick={() => { clearInterval(intervalRef.current); setRestTimer(null); setRestLeft(0); }}
            style={{ ...pillBtn, background: "rgba(255,255,255,0.1)", color: "#fff", marginTop: 8 }}>Skip Rest</button>
        </div>
      )}

      {/* Exercise list with per-set checkboxes */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {exercises.map((ex, i) => {
          const done = isExDone(i);
          const setsCompleted = completedSets[i]?.size || 0;
          const isExpanded = expanded === i;
          const prog = exProgress(i);

          return (
            <div key={i} style={{
              background: done ? "rgba(186,255,57,0.06)" : "rgba(255,255,255,0.02)",
              border: done ? "1px solid rgba(186,255,57,0.15)" : isExpanded ? "1px solid rgba(186,255,57,0.2)" : "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16, overflow: "hidden", transition: "all 0.3s ease",
              opacity: done ? 0.75 : 1,
            }}>
              {/* Main row — tap to expand */}
              <div
                onClick={() => setExpanded(isExpanded ? null : i)}
                style={{ padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
              >
                {/* Mini figure thumbnail */}
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: isExpanded ? "rgba(186,255,57,0.12)" : "rgba(255,255,255,0.04)",
                  border: isExpanded ? "1px solid rgba(186,255,57,0.25)" : "1px solid rgba(255,255,255,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "all 0.2s ease",
                }}>
                  <ExerciseFigure name={ex.name} size={32} />
                </div>

                {/* Text info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontWeight: 700, fontSize: 14, color: done ? "#BAFF39" : "#fff",
                    textDecoration: done ? "line-through" : "none",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{ex.name}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center" }}>
                    <span style={{ ...tagStyle, color: "#BAFF39", background: "rgba(186,255,57,0.08)" }}>{ex.muscle}</span>
                    <span style={tagStyle}>{ex.reps} reps</span>
                  </div>
                </div>

                {/* Set progress dots */}
                <div style={{ display: "flex", gap: 4, alignItems: "center", flexShrink: 0 }}>
                  {Array.from({ length: ex.sets }, (_, s) => {
                    const setDone = completedSets[i]?.has(s);
                    return (
                      <div key={s} style={{
                        width: 10, height: 10, borderRadius: 3,
                        background: setDone ? "#BAFF39" : "rgba(255,255,255,0.08)",
                        border: setDone ? "none" : "1px solid rgba(255,255,255,0.12)",
                        transition: "all 0.2s ease",
                      }} />
                    );
                  })}
                  <span style={{
                    fontSize: 11, color: done ? "#BAFF39" : "#666",
                    fontFamily: "'JetBrains Mono', monospace", marginLeft: 4,
                  }}>{setsCompleted}/{ex.sets}</span>
                </div>

                {/* Expand chevron */}
                <div style={{
                  color: "#555", fontSize: 14, transition: "transform 0.2s ease",
                  transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0,
                }}>▼</div>
              </div>

              {/* Expanded: per-set checkboxes with illustration */}
              {isExpanded && (
                <div style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  padding: "16px 16px 20px",
                  background: "rgba(186,255,57,0.02)",
                  animation: "slideDown 0.2s ease",
                }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    {/* Large illustration */}
                    <div style={{
                      width: 90, height: 90, borderRadius: 14,
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(186,255,57,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <ExerciseFigure name={ex.name} size={72} />
                    </div>

                    {/* Info column */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                        <span style={{ ...tagStyle, fontSize: 10 }}>REST: {ex.rest}</span>
                        <span style={{ ...tagStyle, fontSize: 10 }}>REPS: {ex.reps}</span>
                      </div>

                      {/* Individual set rows */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {Array.from({ length: ex.sets }, (_, s) => {
                          const setDone = completedSets[i]?.has(s);
                          return (
                            <button
                              key={s}
                              onClick={(e) => { e.stopPropagation(); toggleSetAndRest(i, s, ex.rest); }}
                              style={{
                                display: "flex", alignItems: "center", gap: 10,
                                padding: "8px 12px", borderRadius: 10,
                                background: setDone ? "rgba(186,255,57,0.1)" : "rgba(0,0,0,0.2)",
                                border: setDone ? "1px solid rgba(186,255,57,0.25)" : "1px solid rgba(255,255,255,0.06)",
                                cursor: "pointer", transition: "all 0.2s ease", width: "100%",
                              }}
                            >
                              {/* Set checkbox */}
                              <div style={{
                                width: 22, height: 22, borderRadius: 6,
                                border: "2px solid",
                                borderColor: setDone ? "#BAFF39" : "rgba(255,255,255,0.15)",
                                background: setDone ? "#BAFF39" : "transparent",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 12, color: "#0a0a0a", flexShrink: 0,
                                transition: "all 0.15s ease",
                              }}>
                                {setDone && "✓"}
                              </div>
                              <span style={{
                                fontSize: 13, fontWeight: 600,
                                color: setDone ? "#BAFF39" : "#ccc",
                                fontFamily: "'JetBrains Mono', monospace",
                                textDecoration: setDone ? "line-through" : "none",
                                opacity: setDone ? 0.7 : 1,
                              }}>
                                Set {s + 1}
                              </span>
                              <span style={{
                                fontSize: 11, color: setDone ? "rgba(186,255,57,0.5)" : "#666",
                                marginLeft: "auto",
                                fontFamily: "'JetBrains Mono', monospace",
                              }}>
                                {ex.reps}
                              </span>
                              {!setDone && (
                                <span style={{ fontSize: 10, color: "#555" }}>⏱</span>
                              )}
                              {setDone && (
                                <span style={{ fontSize: 12 }}>✅</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Mini progress bar for this exercise */}
                  <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginTop: 14 }}>
                    <div style={{
                      height: "100%", width: `${prog * 100}%`,
                      background: done ? "#BAFF39" : "rgba(186,255,57,0.5)",
                      borderRadius: 2, transition: "width 0.3s ease",
                    }} />
                  </div>
                  {done && (
                    <div style={{
                      textAlign: "center", marginTop: 10, fontSize: 12,
                      color: "#BAFF39", fontWeight: 700,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      ✓ EXERCISE COMPLETE
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allDone && (
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
          <h3 style={{ color: "#BAFF39", fontSize: 22, fontWeight: 800 }}>WORKOUT COMPLETE!</h3>
          <p style={{ color: "#888", fontSize: 14 }}>All {totalSets} sets crushed. Time to cool down.</p>
          <button onClick={onFinish} style={{ ...actionBtn, background: "#BAFF39", color: "#0a0a0a", fontWeight: 800, marginTop: 16 }}>
            Start Cool Down →
          </button>
        </div>
      )}

      {/* Always-visible finish controls */}
      {!allDone && (
        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <button onClick={onFinish} style={{
            ...actionBtn, background: "rgba(186,255,57,0.08)", color: "#BAFF39",
            fontWeight: 700, width: "100%", maxWidth: 340, fontSize: 14,
            border: "1px solid rgba(186,255,57,0.2)",
          }}>
            Finish Early → Cool Down
          </button>
          <button onClick={onExit} style={{
            ...actionBtn, background: "transparent", color: "#555",
            fontSize: 13, padding: "10px 20px",
          }}>
            End Workout & Go Home
          </button>
        </div>
      )}
    </div>
  );
}

// ── Premium Modal ───────────────────────────────────────────────────────────
function PremiumModal({ onClose, isSpecialUser }) {
  if (isSpecialUser) {
    return (
      <div style={modalOverlay} onClick={onClose}>
        <div style={modalContent} onClick={e => e.stopPropagation()}>
          <div style={{ fontSize: 48, textAlign: "center", marginBottom: 12 }}>👑</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: "center", color: "#BAFF39", margin: 0 }}>
            You're the GOAT
          </h2>
          <p style={{ color: "#888", textAlign: "center", fontSize: 14, marginTop: 8 }}>
            Yoga & Animal Flow — unlocked for FREE because everyone else is subsidizing your gains.
          </p>
          <button onClick={onClose} style={{ ...actionBtn, background: "#BAFF39", color: "#0a0a0a", fontWeight: 800, width: "100%", marginTop: 20 }}>
            Access Premium ✨
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={modalOverlay} onClick={onClose}>
      <div style={modalContent} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 48, textAlign: "center", marginBottom: 12 }}>✨</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: "center", color: "#fff", margin: 0 }}>
          Premium Tier
        </h2>
        <p style={{ color: "#888", textAlign: "center", fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
          Unlock Yoga & Animal Flow for $9.99/mo.<br />
          Your subscription helps keep it free for... one very special person.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 20 }}>
          <div style={{ background: "rgba(186,255,57,0.05)", borderRadius: 12, padding: 14 }}>
            <div style={{ color: "#BAFF39", fontWeight: 700, fontSize: 14 }}>Yoga Flows</div>
            <div style={{ color: "#777", fontSize: 13, marginTop: 2 }}>Sun Salutation, Hip Opening, Core Ignite</div>
          </div>
          <div style={{ background: "rgba(186,255,57,0.05)", borderRadius: 12, padding: 14 }}>
            <div style={{ color: "#BAFF39", fontWeight: 700, fontSize: 14 }}>Animal Flow</div>
            <div style={{ color: "#777", fontSize: 13, marginTop: 2 }}>Beast Mode, Ape Flow, Ground Force</div>
          </div>
        </div>
        <button onClick={onClose} style={{ ...actionBtn, background: "#BAFF39", color: "#0a0a0a", fontWeight: 800, width: "100%", marginTop: 20 }}>
          Subscribe — $9.99/mo
        </button>
        <button onClick={onClose} style={{ ...actionBtn, background: "transparent", color: "#555", width: "100%", marginTop: 4, fontSize: 13 }}>
          Maybe later
        </button>
      </div>
    </div>
  );
}

// ── Premium Content View ────────────────────────────────────────────────────
function PremiumWorkout({ onBack }) {
  const [selected, setSelected] = useState(null);
  const [flowType, setFlowType] = useState("yoga");
  const items = flowType === "yoga" ? YOGA_FLOWS : ANIMAL_FLOWS;

  if (selected !== null) {
    const item = items[selected];
    return (
      <div style={{ padding: "24px 16px", maxWidth: 500, margin: "0 auto" }}>
        <button onClick={() => setSelected(null)} style={backBtn}>← Back</button>
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "#BAFF39", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 3 }}>
            {flowType.toUpperCase()}
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "8px 0" }}>{item.name}</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 24 }}>
            <span style={tagStyle}>⏱ {item.duration}</span>
            <span style={{ ...tagStyle, color: "#BAFF39", background: "rgba(186,255,57,0.08)" }}>{item.focus}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {item.moves.map((move, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8, background: "rgba(186,255,57,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#BAFF39", fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
                flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <span style={{ color: "#ddd", fontWeight: 600, fontSize: 15 }}>{move}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 16px", maxWidth: 500, margin: "0 auto" }}>
      <button onClick={onBack} style={backBtn}>← Back</button>
      <div style={{ textAlign: "center", marginTop: 16, marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: "#BAFF39", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 4 }}>PREMIUM</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: "8px 0" }}>Mind & Movement</h2>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4 }}>
        {["yoga", "animal"].map(t => (
          <button key={t} onClick={() => setFlowType(t)} style={{
            flex: 1, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
            background: flowType === t ? "#BAFF39" : "transparent",
            color: flowType === t ? "#0a0a0a" : "#888",
            fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
          }}>
            {t === "yoga" ? "🧘 Yoga" : "🐆 Animal Flow"}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, i) => (
          <button key={i} onClick={() => setSelected(i)} style={{
            ...cardBtn, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)",
            textAlign: "left",
          }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>{item.name}</div>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <span style={tagStyle}>⏱ {item.duration}</span>
              <span style={{ ...tagStyle, color: "#BAFF39", background: "rgba(186,255,57,0.08)" }}>{item.focus}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
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
    <div style={modalOverlay} onClick={onClose}>
      <div style={modalContent} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 48, textAlign: "center", marginBottom: 12 }}>📊</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: "center", color: "#fff", margin: 0 }}>
          {saved ? "Baseline Updated!" : "Monthly Check-in"}
        </h2>
        {saved ? (
          <>
            <p style={{ color: "#888", textAlign: "center", fontSize: 14, marginTop: 8 }}>
              New weight: {newWeight} lbs — workouts recalibrated.
            </p>
            <button onClick={onClose} style={{ ...actionBtn, background: "#BAFF39", color: "#0a0a0a", fontWeight: 800, width: "100%", marginTop: 20 }}>
              Let's GOOOO 🚀
            </button>
          </>
        ) : (
          <>
            <p style={{ color: "#888", textAlign: "center", fontSize: 14, marginTop: 8 }}>
              Previous: {Math.round(profile.weight)} lbs — what's your current weight?
            </p>
            <input
              type="number"
              value={newWeight}
              onChange={e => setNewWeight(e.target.value)}
              placeholder="Current weight (lbs)"
              style={{ ...inputStyle, marginTop: 16 }}
              autoFocus
            />
            <button
              onClick={handleSave}
              disabled={!newWeight}
              style={{
                ...actionBtn, width: "100%", marginTop: 16, fontWeight: 800,
                background: newWeight ? "#BAFF39" : "rgba(186,255,57,0.15)",
                color: newWeight ? "#0a0a0a" : "rgba(186,255,57,0.4)",
              }}
            >
              Update Baseline
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [profile, setProfile] = useState(null);
  const [screen, setScreen] = useState("home"); // home, workout, stretch, meditate, premium
  const [mode, setMode] = useState("bodyweight"); // bodyweight, basic, gym
  const [bodyPart, setBodyPart] = useState(null);
  const [workoutIdx, setWorkoutIdx] = useState(0);
  const [showPremium, setShowPremium] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [currentExercises, setCurrentExercises] = useState([]);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  // Check monthly baseline
  useEffect(() => {
    if (profile) {
      const daysSince = (Date.now() - profile.lastBaseline) / (1000 * 60 * 60 * 24);
      if (daysSince >= 30) setShowCheckIn(true);
    }
  }, [profile]);

  const startWorkout = (part) => {
    const modeKey = mode === "basic" ? "basic" : mode === "gym" ? "gym" : "bodyweight";
    const pool = WORKOUTS[part][modeKey];
    const idx = (workoutIdx + totalWorkouts) % pool.length;
    const intensity = calcIntensity(profile);
    const exercises = adjustWorkout(pool[idx], intensity);
    setBodyPart(part);
    setCurrentExercises(exercises);
    setScreen("workout");
  };

  const finishWorkout = () => {
    setScreen("stretch");
  };

  const finishStretch = () => {
    setScreen("meditate");
  };

  const finishAll = () => {
    setTotalWorkouts(t => t + 1);
    setScreen("home");
    setBodyPart(null);
    setCurrentExercises([]);
  };

  if (!profile) {
    return (
      <div style={appContainer}>
        <style>{globalCSS}</style>
        <Onboarding onComplete={setProfile} />
      </div>
    );
  }

  if (screen === "meditate") {
    return (
      <div style={appContainer}>
        <style>{globalCSS}</style>
        <MeditationTimer onClose={finishAll} />
      </div>
    );
  }

  if (screen === "stretch") {
    return (
      <div style={appContainer}>
        <style>{globalCSS}</style>
        <StretchView bodyPart={bodyPart} onComplete={finishStretch} onSkip={finishAll} />
      </div>
    );
  }

  if (screen === "workout") {
    return (
      <div style={appContainer}>
        <style>{globalCSS}</style>
        <WorkoutView exercises={currentExercises} bodyPart={bodyPart} mode={mode} onFinish={finishWorkout} onExit={finishAll} />
      </div>
    );
  }

  if (screen === "premium") {
    return (
      <div style={appContainer}>
        <style>{globalCSS}</style>
        <PremiumWorkout onBack={() => setScreen("home")} />
      </div>
    );
  }

  // HOME SCREEN
  const intensity = calcIntensity(profile);

  return (
    <div style={appContainer}>
      <style>{globalCSS}</style>

      {showPremium && <PremiumModal onClose={() => { setShowPremium(false); setScreen("premium"); }} isSpecialUser={true} />}
      {showCheckIn && <MonthlyCheckIn profile={profile} onUpdate={setProfile} onClose={() => setShowCheckIn(false)} />}

      <div style={{ padding: "24px 20px", maxWidth: 500, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          marginBottom: 32,
          opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <div>
            <div style={{
              fontSize: 11, color: "#BAFF39", fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: 4, marginBottom: 6,
            }}>
              LETS GOOOO
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.1 }}>
              Hey, {profile.name} 👋
            </h1>
            <p style={{ color: "#666", fontSize: 14, marginTop: 4, marginBottom: 0 }}>
              Workout #{totalWorkouts + 1} · {intensity} intensity
            </p>
          </div>
          <button
            onClick={() => setShowCheckIn(true)}
            style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12, padding: "8px 12px", cursor: "pointer",
              color: "#888", fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            📊 {Math.round(profile.weight)} lbs
          </button>
        </div>

        {/* Mode Selector */}
        <div style={{
          marginBottom: 28,
          opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease 0.1s",
        }}>
          <div style={{ fontSize: 12, color: "#555", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, marginBottom: 10 }}>
            MODE
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[
              { key: "bodyweight", icon: "🏋️", label: "Bodyweight" },
              { key: "basic", icon: "🔩", label: "Basic Eq." },
              { key: "gym", icon: "🏟️", label: "Full Gym" },
            ].map(m => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                style={{
                  flex: 1, padding: "14px 8px", borderRadius: 14, border: "none", cursor: "pointer",
                  background: mode === m.key ? "rgba(186,255,57,0.1)" : "rgba(255,255,255,0.02)",
                  border: mode === m.key ? "1.5px solid rgba(186,255,57,0.3)" : "1.5px solid rgba(255,255,255,0.06)",
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 4 }}>{m.icon}</div>
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
                  color: mode === m.key ? "#BAFF39" : "#666",
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {m.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Body Part Selection */}
        <div style={{
          marginBottom: 28,
          opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease 0.2s",
        }}>
          <div style={{ fontSize: 12, color: "#555", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, marginBottom: 10 }}>
            TODAY'S FOCUS
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { key: "upper", icon: "💪", label: "UPPER BODY", desc: "Chest · Back · Arms · Shoulders" },
              { key: "lower", icon: "🦵", label: "LOWER BODY", desc: "Quads · Glutes · Hams · Calves" },
            ].map(part => (
              <button
                key={part.key}
                onClick={() => startWorkout(part.key)}
                style={{
                  flex: 1, padding: "28px 16px", borderRadius: 20,
                  border: "1.5px solid rgba(255,255,255,0.06)",
                  background: "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                  cursor: "pointer", textAlign: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => { e.target.style.borderColor = "rgba(186,255,57,0.3)"; e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 36, marginBottom: 10 }}>{part.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", letterSpacing: 1, fontFamily: "'JetBrains Mono', monospace" }}>
                  {part.label}
                </div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 6 }}>{part.desc}</div>
                <div style={{
                  marginTop: 14, fontSize: 12, color: "#BAFF39", fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  LET'S GO →
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Premium Section */}
        <div style={{
          opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease 0.3s",
        }}>
          <button
            onClick={() => setShowPremium(true)}
            style={{
              width: "100%", padding: "20px", borderRadius: 18,
              background: "linear-gradient(135deg, rgba(186,255,57,0.06), rgba(57,255,186,0.04))",
              border: "1.5px solid rgba(186,255,57,0.12)",
              cursor: "pointer", textAlign: "left",
              transition: "all 0.3s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 28 }}>✨</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#BAFF39" }}>
                  Yoga & Animal Flow
                </div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                  Premium tier · Free for you, $9.99 for everyone else
                </div>
              </div>
              <div style={{ marginLeft: "auto", color: "#BAFF39", fontSize: 18 }}>→</div>
            </div>
          </button>
        </div>

        {/* Guarantee Banner */}
        <div style={{
          marginTop: 24, padding: "16px 20px", borderRadius: 14,
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
          textAlign: "center",
          opacity: animate ? 1 : 0, transition: "all 0.6s ease 0.4s",
        }}>
          <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>
            <span style={{ color: "#BAFF39" }}>⚡ GUARANTEE:</span> Amazing looks & longevity
            <br />for you <span style={{ color: "#888" }}>AND</span> your family. No cap.
          </div>
        </div>

        {/* Stats footer */}
        <div style={{
          marginTop: 20, display: "flex", gap: 10,
          opacity: animate ? 1 : 0, transition: "all 0.6s ease 0.5s",
        }}>
          {[
            { label: "Workouts", value: totalWorkouts },
            { label: "Streak", value: `${Math.min(totalWorkouts, 7)}d` },
            { label: "Level", value: profile.liftCapacity === "advanced" ? "Beast" : profile.liftCapacity === "moderate" ? "Solid" : "Rising" },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: "14px 12px", borderRadius: 14,
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "'JetBrains Mono', monospace" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 10, color: "#555", marginTop: 2, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── STYLES ─────────────────────────────────────────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=JetBrains+Mono:wght@200;400;700&family=Space+Grotesk:wght@400;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0a; }

  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }

  @keyframes slideDown {
    from { opacity: 0; max-height: 0; }
    to { opacity: 1; max-height: 300px; }
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(186,255,57,0.2); border-radius: 4px; }

  input:focus { outline: none; border-color: #BAFF39 !important; }
  button:active { transform: scale(0.97); }
`;

const appContainer = {
  background: "#0a0a0a",
  minHeight: "100vh",
  fontFamily: "'DM Sans', sans-serif",
  color: "#fff",
  position: "relative",
  overflow: "auto",
};

const screenContainer = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px 20px",
  position: "relative",
};

const inputStyle = {
  width: "100%",
  padding: "16px 20px",
  borderRadius: 14,
  border: "2px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
  color: "#fff",
  fontSize: 18,
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 600,
  transition: "border-color 0.3s ease",
};

const pillBtn = {
  padding: "8px 16px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 700,
  fontFamily: "'JetBrains Mono', monospace",
  transition: "all 0.2s ease",
};

const actionBtn = {
  padding: "14px 28px",
  borderRadius: 14,
  border: "none",
  cursor: "pointer",
  fontSize: 15,
  fontFamily: "'DM Sans', sans-serif",
  transition: "all 0.2s ease",
};

const cardBtn = {
  padding: "16px 20px",
  borderRadius: 14,
  cursor: "pointer",
  background: "transparent",
  textAlign: "left",
  transition: "all 0.3s ease",
  width: "100%",
};

const backBtn = {
  background: "none",
  border: "none",
  color: "#888",
  fontSize: 14,
  cursor: "pointer",
  fontFamily: "'DM Sans', sans-serif",
  padding: "8px 0",
};

const tagStyle = {
  fontSize: 11,
  color: "#888",
  background: "rgba(255,255,255,0.05)",
  padding: "3px 8px",
  borderRadius: 6,
  fontFamily: "'JetBrains Mono', monospace",
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.8)",
  backdropFilter: "blur(12px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
  padding: 20,
};

const modalContent = {
  background: "#141414",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 24,
  padding: 32,
  maxWidth: 380,
  width: "100%",
};

const detailBox = {
  background: "rgba(0,0,0,0.3)",
  borderRadius: 10,
  padding: "8px 10px",
  textAlign: "center",
};

const detailLabel = {
  fontSize: 9,
  color: "#666",
  fontFamily: "'JetBrains Mono', monospace",
  letterSpacing: 2,
  marginBottom: 2,
};

const detailValue = {
  fontSize: 15,
  fontWeight: 700,
  color: "#fff",
};
