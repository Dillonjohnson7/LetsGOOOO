// ─── SVG EXERCISE ILLUSTRATIONS ─────────────────────────────────────────────
export function ExerciseFigure({ name, size = 72 }) {
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
