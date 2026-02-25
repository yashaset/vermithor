"use client";

import { useEffect, useRef, useState } from "react";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

/* ── Icons ── */
function EmailIcon() {
  return (
    <svg
      width="11"
      height="9"
      viewBox="0 0 11 9"
      fill="none"
      className="opacity-50 shrink-0"
    >
      <rect
        x="0.5"
        y="0.5"
        width="10"
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeOpacity="0.9"
      />
      <path d="M1 1.5L5.5 5L10 1.5" stroke="currentColor" strokeOpacity="0.9" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg
      width="9"
      height="11"
      viewBox="0 0 9 11"
      fill="none"
      className="opacity-50 shrink-0"
    >
      <rect
        x="0.5"
        y="0.5"
        width="8"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeOpacity="0.9"
      />
      <circle cx="4.5" cy="8.5" r="0.75" fill="currentColor" opacity="0.9" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      className="opacity-50 shrink-0"
    >
      <path
        d="M4.5 6.5L6.5 4.5"
        stroke="currentColor"
        strokeOpacity="0.9"
        strokeLinecap="round"
      />
      <path
        d="M3 8L1.5 9.5"
        stroke="currentColor"
        strokeOpacity="0.9"
        strokeLinecap="round"
      />
      <path
        d="M7.5 3.5L9 2M6.5 1.5H9.5V4.5"
        stroke="currentColor"
        strokeOpacity="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Card front face ── */
function CardFront({ glarePos }: { glarePos: { x: number; y: number } }) {
  return (
    <div className="card-face card-front">
      {/* Etched grid */}
      <div className="card-grid" aria-hidden />
      {/* Diagonal shine line */}
      <div className="card-diagonal" aria-hidden />
      {/* Dynamic glare */}
      <div
        className="card-glare"
        style={{
          background: `radial-gradient(circle 200px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)`,
        }}
        aria-hidden
      />
      {/* Rim */}
      <div className="card-rim" aria-hidden />

      <div className="card-content">
        {/* Top row */}
        <div className="flex justify-between items-start">
          <span className="font-cormorant text-[13px] font-light tracking-[0.35em] text-white/35 uppercase">
            Y · R
          </span>
          <span className="font-mono text-[9px] tracking-[0.18em] text-[#d4f0e8]/55 uppercase border border-[#d4f0e8]/18 px-2.5 py-1 rounded-full backdrop-blur-sm">
            UI Engineer
          </span>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <div className="font-cormorant text-[42px] sm:text-[46px] font-light leading-none tracking-tight text-white/92">
            <span className="font-semibold text-white">Yash</span> Rawat
          </div>
          <div className="font-mono text-[10px] tracking-[0.18em] text-[#d4f0e8]/70 uppercase">
            React · Next.js · TypeScript · Performance
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1.5">
            {[
              { icon: <EmailIcon />, text: "rawatyash1999@gmail.com" },
              { icon: <PhoneIcon />, text: "+91 99586 25621" },
              { icon: <LinkIcon />, text: "linkedin.com/in/yashrawat-react" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 font-mono text-[9px] sm:text-[9.5px] tracking-[0.06em] text-white/45"
              >
                {icon}
                {text}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-end gap-1">
            {["Next.js", "TypeScript", "3+ Years"].map((t, i) => (
              <span
                key={t}
                className={`font-mono text-[8px] tracking-[0.14em] uppercase border px-2 py-[3px] rounded-full ${
                  i < 2
                    ? "text-[#d4f0e8]/60 border-[#d4f0e8]/20 bg-[#d4f0e8]/04"
                    : "text-white/30 border-white/08"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Card back face ── */
function CardBack() {
  const stats = [
    { num: "100K+", label: "Monthly\nOperators" },
    { num: "92+", label: "Lighthouse\nScore" },
    { num: "50%", label: "Bundle\nReduced" },
  ];
  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Redux",
    "Node.js",
    "Flask",
    "Firebase",
    "Tailwind",
  ];

  return (
    <div className="card-face card-back">
      <div className="card-rim" aria-hidden />
      {/* Watermark */}
      <div
        className="absolute bottom-5 right-7 font-cormorant text-[64px] font-light text-white/06 leading-none select-none pointer-events-none"
        aria-hidden
      >
        YR
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-5 h-full px-8 py-8">
        {/* Stats */}
        <div className="flex items-center gap-7">
          {stats.map((s, i) => (
            <div key={s.num} className="flex items-center gap-7">
              <div className="flex flex-col items-center gap-1">
                <span className="font-cormorant text-[26px] font-light text-[#d4f0e8]/70 leading-none">
                  {s.num}
                </span>
                <span className="font-mono text-[8px] tracking-[0.12em] text-white/25 uppercase text-center whitespace-pre-line">
                  {s.label}
                </span>
              </div>
              {i < stats.length - 1 && <div className="w-px h-9 bg-white/10" />}
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {skills.map((s) => (
            <span
              key={s}
              className="font-mono text-[9px] tracking-[0.14em] text-white/45 uppercase border border-white/10 px-3 py-[5px] rounded-full bg-white/03 transition-colors duration-200 hover:text-[#d4f0e8]/80 hover:border-[#d4f0e8]/25"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function BusinessCard() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const onMove = (e: MouseEvent) => {
      if (flipped) return;
      const rect = scene.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({ x: -dy * 14, y: dx * 18 });
      setGlarePos({ x: 50 + dx * 40, y: 50 + dy * 40 });
    };
    const onLeave = () => {
      setTilt({ x: 0, y: 0 });
      setGlarePos({ x: 50, y: 50 });
    };

    scene.addEventListener("mousemove", onMove);
    scene.addEventListener("mouseleave", onLeave);
    return () => {
      scene.removeEventListener("mousemove", onMove);
      scene.removeEventListener("mouseleave", onLeave);
    };
  }, [flipped]);

  const handleFlip = () => {
    setFlipped((v) => !v);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="section-divider px-4 sm:px-8 md:px-[60px] py-16 md:py-20">
      <SectionLabel>Business Card</SectionLabel>

      <Reveal>
        <div className="flex flex-col items-center gap-8">
          {/* Scene */}
          <div
            ref={sceneRef}
            className="card-scene"
            style={{ perspective: "900px" }}
          >
            <div
              ref={wrapperRef}
              onClick={handleFlip}
              className={`card-wrapper ${flipped ? "card-wrapper--flipped" : ""}`}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${flipped ? 180 + tilt.y : tilt.y}deg)`,
                cursor: "pointer",
              }}
            >
              <CardFront glarePos={glarePos} />
              <CardBack />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <button
              onClick={handleFlip}
              className="font-mono text-[9px] tracking-[0.15em] text-white/30 uppercase bg-white/04 border border-white/10 px-5 py-2 rounded-full transition-all duration-200 hover:text-[#d4f0e8]/80 hover:border-[#d4f0e8]/25"
            >
              {flipped ? "Flip Back ↺" : "Flip Card ↺"}
            </button>
            <span className="font-mono text-[9px] tracking-[0.15em] text-white/18 uppercase">
              Hover to tilt · Click to flip
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
