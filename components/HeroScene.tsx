"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  Html,
  OrbitControls,
  Stars,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Desk() {
  return (
    <group>
      <mesh position={[0, -1.9, 0]} receiveShadow castShadow>
        <boxGeometry args={[9.6, 0.28, 3.8]} />
        <meshStandardMaterial color="#2b1812" roughness={0.5} />
      </mesh>

      {[
        [-3.9, -2.8, -1.35],
        [3.9, -2.8, -1.35],
        [-3.9, -2.8, 1.35],
        [3.9, -2.8, 1.35],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.24, 1.9, 0.24]} />
          <meshStandardMaterial color="#140907" />
        </mesh>
      ))}
    </group>
  );
}

function Keyboard() {
  const rows = [
    { z: -0.47, count: 14, width: 0.18 },
    { z: -0.22, count: 13, width: 0.19 },
    { z: 0.03, count: 12, width: 0.2 },
    { z: 0.28, count: 10, width: 0.24 },
  ];

  return (
    <group position={[0, -1.62, 0.78]} rotation={[-0.14, 0, 0]}>
      <mesh castShadow>
        <boxGeometry args={[4.05, 0.13, 1.68]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.24}
          roughness={0.42}
        />
      </mesh>

      <mesh position={[0, 0.065, 0]}>
        <boxGeometry args={[3.9, 0.022, 1.55]} />
        <meshStandardMaterial
          color="#111827"
          emissive="#d1d5db"
          emissiveIntensity={0.18}
        />
      </mesh>

      {rows.map((row, rowIndex) =>
        Array.from({ length: row.count }).map((_, keyIndex) => {
          const totalWidth = row.count * row.width + (row.count - 1) * 0.04;
          const x =
            -totalWidth / 2 + keyIndex * (row.width + 0.04) + row.width / 2;

          return (
            <mesh
              key={`${rowIndex}-${keyIndex}`}
              position={[x, 0.108, row.z] as [number, number, number]}
              castShadow
            >
              <boxGeometry args={[row.width, 0.058, 0.13]} />
              <meshStandardMaterial
                color="#020617"
                emissive="#9ca3af"
                emissiveIntensity={0.12}
                roughness={0.34}
              />
            </mesh>
          );
        }),
      )}

      <mesh position={[0, 0.108, 0.58]} castShadow>
        <boxGeometry args={[1.7, 0.052, 0.17]} />
        <meshStandardMaterial
          color="#020617"
          emissive="#d1d5db"
          emissiveIntensity={0.12}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}

function Mouse() {
  return (
    <group position={[2.75, -1.63, 0.85]} rotation={[-0.08, -0.12, 0]}>
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[1.08, 0.035, 1.2]} />
        <meshStandardMaterial color="#111827" roughness={0.75} />
      </mesh>

      <mesh scale={[0.42, 0.16, 0.58]} castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#9ca3af"
          metalness={0.18}
          roughness={0.35}
        />
      </mesh>

      <mesh
        position={[0, 0.18, -0.18]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.055, 0.055, 0.18, 32]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={1.5}
        />
      </mesh>

      <mesh position={[0, 0.17, 0.08]} castShadow>
        <boxGeometry args={[0.03, 0.025, 0.38]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.65}
        />
      </mesh>
    </group>
  );
}

function Speaker({ x, active }: { x: number; active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const bigRingRef = useRef<THREE.Mesh>(null);
  const smallRingRef = useRef<THREE.Mesh>(null);
  const bigBassRef = useRef<THREE.Mesh>(null);
  const smallBassRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y =
        -1.02 + (active ? Math.sin(t * 6) * 0.025 : 0);
    }

    if (bigRingRef.current) {
      const s = active ? 1 + Math.sin(t * 7) * 0.08 : 1;
      bigRingRef.current.scale.set(s, s, 1);
    }

    if (smallRingRef.current) {
      const s = active ? 1 + Math.sin(t * 8 + 0.8) * 0.06 : 1;
      smallRingRef.current.scale.set(s, s, 1);
    }

    if (bigBassRef.current) {
      const boom = active ? 1 + Math.sin(t * 8) * 0.16 : 1;
      bigBassRef.current.scale.set(boom, boom, 1);
      bigBassRef.current.position.z = active
        ? 0.475 + Math.sin(t * 8) * 0.04
        : 0.475;
    }

    if (smallBassRef.current) {
      const boom = active ? 1 + Math.sin(t * 9 + 0.8) * 0.11 : 1;
      smallBassRef.current.scale.set(boom, boom, 1);
      smallBassRef.current.position.z = active
        ? 0.475 + Math.sin(t * 9 + 0.8) * 0.025
        : 0.475;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[x, -1.02, 0.34]}
      scale={[0.82, 0.82, 0.82]}
    >
      <mesh castShadow>
        <boxGeometry args={[0.95, 1.75, 0.8]} />
        <meshStandardMaterial
          color="#111827"
          emissive="#111827"
          emissiveIntensity={0.16}
          metalness={0.2}
          roughness={0.36}
        />
      </mesh>

      <mesh position={[0, 0, 0.415]}>
        <boxGeometry args={[0.8, 1.5, 0.04]} />
        <meshStandardMaterial
          color="#020617"
          emissive="#0f172a"
          emissiveIntensity={0.22}
        />
      </mesh>

      <mesh ref={smallRingRef} position={[0, 0.48, 0.445]}>
        <ringGeometry args={[0.145, 0.175, 80]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={active ? 1.7 : 0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh
        ref={smallBassRef}
        position={[0, 0.48, 0.475]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.105, 0.105, 0.035, 48]} />
        <meshStandardMaterial
          color="#111827"
          emissive="#7c3aed"
          emissiveIntensity={active ? 0.75 : 0.25}
          roughness={0.42}
        />
      </mesh>

      <mesh ref={bigRingRef} position={[0, -0.2, 0.445]}>
        <ringGeometry args={[0.275, 0.315, 96]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={active ? 1.9 : 0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh
        ref={bigBassRef}
        position={[0, -0.2, 0.475]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.205, 0.205, 0.045, 64]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#164e63"
          emissiveIntensity={active ? 1.0 : 0.32}
          metalness={0.12}
          roughness={0.42}
        />
      </mesh>

      <mesh position={[0, -0.2, 0.515]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 0.02, 40]} />
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#67e8f9"
          emissiveIntensity={active ? 1.25 : 0.5}
        />
      </mesh>

      <mesh position={[0, 0.48, 0.515]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.018, 32]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#c084fc"
          emissiveIntensity={active ? 1.15 : 0.45}
        />
      </mesh>
    </group>
  );
}

function ComputerScreen({
  active,
  setActive,
}: {
  active: boolean;
  setActive: (value: boolean) => void;
}) {
  const [showScreen, setShowScreen] = useState(true);

  useFrame(({ camera }) => {
    const shouldShow = camera.position.z > 0;

    setShowScreen((prev) => {
      if (prev === shouldShow) return prev;
      return shouldShow;
    });
  });

  if (!showScreen) return null;

  const skills = [
    "Python",
    "C++",
    "C",
    "SQL",
    "JavaScript",
    "R",
    "React",
    "Node.js",
    "Express.js",
    "FastAPI",
    "MongoDB",
    "REST APIs",
    "PyTorch",
    "TensorFlow",
    "Scikit-learn",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "CNNs",
    "U-Net",
    "Data Preprocessing",
    "Feature Engineering",
    "Model Evaluation",
    "Git",
    "GitHub",
    "Postman",
    "VS Code",
    "Jupyter Notebook",
  ];

  const cubeSkills = ["AI", "ML", "API", "CV", "WEB-DEV", "DL"];

  const projects = [
    {
      title: "QuantLab",
      desc: "AI-powered quantitative trading platform with backtesting, Sharpe Ratio, drawdown and win-rate analytics.",
      tech: "Python • FastAPI • Finance",
    },
    {
      title: "AI Career Guidance",
      desc: "Full-stack platform with LLM chatbot, personalized roadmaps and career recommendation support.",
      tech: "React • Node.js • MongoDB",
    },
    {
      title: "Wildlife Monitoring",
      desc: "Computer vision system using EfficientNet for animal, empty and poacher scene classification.",
      tech: "TensorFlow • EfficientNet",
    },
    {
      title: "SPHINX’24 Hackathon",
      desc: "Developed a secure lawyer-client platform with real-time chat, encrypted file sharing, authentication and backend APIs.",
      tech: "React • Node.js • Secure APIs",
    },
  ];

  return (
    <Html
      center
      transform
      position={[0, 0.13, 0.19]}
      scale={0.25}
      occlude={false}
      style={{
        width: "960px",
        height: "540px",
        pointerEvents: "auto",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <style>{`
      
     
        .portfolio-scroll {
          scrollbar-width: thin;
          scrollbar-color: #38bdf8 rgba(15,23,42,0.9);
        }

        .portfolio-scroll::-webkit-scrollbar {
          width: 10px;
        }

        .portfolio-scroll::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.9);
          border-radius: 999px;
        }

        .portfolio-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #38bdf8 0%, #a855f7 45%, #22c55e 100%);
          border-radius: 999px;
          border: 2px solid rgba(15, 23, 42, 0.9);
        }

        .hello-strip-wrapper {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 470px;
          height: 24px;
          overflow: hidden;
          font-size: 15px;
          color: #e9d5ff;
          pointer-events: none;
        }

        .hello-strip {
          position: absolute;
          left: 100%;
          top: 50%;
          display: inline-flex;
          gap: 24px;
          white-space: nowrap;
          animation: helloMove 16s linear infinite;
          font-weight: 900;
          letter-spacing: 1.5px;
        }

        @keyframes helloMove {
          0% {
            transform: translateX(0) translateY(-50%);
          }

          100% {
            transform: translateX(calc(-100% - 470px)) translateY(-50%);
          }
        }

        .screen-cube-stage {
  position: relative;
  width: 320px;
  height: 280px;
  margin: 0 auto;
  perspective: 950px;
  overflow: visible;
}

.screen-cube {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 85px;
  top: 60px;
  transform-style: preserve-3d;
  animation: cubeSpin 10s linear infinite;
}

.cube-face {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 26px;
  border: 1px solid rgba(255,255,255,0.2);
  background:
    linear-gradient(135deg, rgba(56,189,248,0.38), rgba(168,85,247,0.28)),
    rgba(15,23,42,0.88);
  box-shadow:
    inset 0 0 32px rgba(56,189,248,0.22),
    0 0 34px rgba(168,85,247,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  font-weight: 950;
  color: white;
}

.front  { transform: rotateY(0deg) translateZ(75px); }
.back   { transform: rotateY(180deg) translateZ(75px); }
.right  { transform: rotateY(90deg) translateZ(75px); }
.left   { transform: rotateY(-90deg) translateZ(75px); }
.top    { transform: rotateX(90deg) translateZ(75px); }
.bottom { transform: rotateX(-90deg) translateZ(75px); }

        @keyframes cubeSpin {
          0% {
            transform: rotateX(-18deg) rotateY(0deg);
          }

          100% {
            transform: rotateX(-18deg) rotateY(360deg);
          }
        }

        .orbit-chip {
          position: absolute;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(2,6,23,0.72);
          border: 1px solid rgba(56,189,248,0.24);
          color: #e0f2fe;
          font-size: 12px;
          font-weight: 950;
          box-shadow: 0 0 18px rgba(56,189,248,0.16);
          animation: chipFloat 4s ease-in-out infinite;
          white-space: nowrap;
        }

       .chip-1 { left: 0px; top: 30px; animation-delay: 0s; }
.chip-2 { right: -4px; top: 42px; animation-delay: .6s; }
.chip-3 { left: 8px; bottom: 48px; animation-delay: 1.1s; }
.chip-4 { right: 4px; bottom: 54px; animation-delay: 1.7s; }
.chip-5 { left: 112px; top: 0px; animation-delay: 2.1s; }
.chip-6 { left: 124px; bottom: 6px; animation-delay: 2.6s; }

        @keyframes chipFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
          }

          50% {
            transform: translateY(-10px) scale(1.04);
          }
        }

        .glow-dot {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #67e8f9;
          box-shadow: 0 0 20px #67e8f9;
          animation: dotPulse 2s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%, 100% {
            opacity: 0.35;
            transform: scale(1);
          }

          50% {
            opacity: 1;
            transform: scale(1.6);
          }
        }

        .skill-marquee {
          display: flex;
          width: max-content;
          gap: 8px;
          animation: skillMove 24s linear infinite;
        }

        @keyframes skillMove {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }


        @media (max-width: 1100px) {
          .portfolio-scroll > section {
            padding: 24px !important;
          }

          .portfolio-scroll > section:nth-child(1) {
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
          }

          .portfolio-scroll > section:nth-child(1) h1 {
            font-size: 38px !important;
            letter-spacing: -2px !important;
          }

          .portfolio-scroll > section:nth-child(1) p {
            font-size: 14px !important;
            line-height: 1.38 !important;
          }

          .portfolio-scroll > section:nth-child(3) > div:last-child {
            grid-template-columns: 1fr !important;
          }

          .portfolio-scroll > section:nth-child(4) {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }

        @media (max-width: 520px) {
          .portfolio-scroll > section {
            padding: 20px !important;
          }

          .portfolio-scroll > section:nth-child(1) {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }

          .portfolio-scroll > section:nth-child(1) h1 {
            font-size: 34px !important;
          }

          .portfolio-scroll > section:nth-child(1) p {
            font-size: 12px !important;
            line-height: 1.25 !important;
          }

          .portfolio-scroll > section:nth-child(1) span {
            font-size: 10px !important;
            padding: 7px 8px !important;
          }

          .screen-cube-stage {
            transform: scale(0.86);
            transform-origin: center top;
          }
        }
      `}</style>

      <div
        style={{
          width: "960px",
          height: "540px",
          color: "white",
          fontFamily: "Inter, Arial, sans-serif",
          background:
            "radial-gradient(circle at 15% 10%, rgba(34,211,238,0.22), transparent 26%), radial-gradient(circle at 85% 20%, rgba(168,85,247,0.34), transparent 30%), linear-gradient(135deg, #020617 0%, #0f172a 48%, #111827 100%)",
          overflow: "hidden",
          position: "relative",
          borderRadius: "4px",
          userSelect: "none",
          WebkitUserSelect: "none",
          border: "none",
          outline: "none",
          boxShadow: "none",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            opacity: 0.6,
          }}
        />

        <div
          style={{
            height: "44px",
            padding: "0 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.09)",
            position: "relative",
            zIndex: 5,
            background: "rgba(2,6,23,0.48)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#ef4444",
              }}
            />
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#f59e0b",
              }}
            />
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
          </div>

          <div className="hello-strip-wrapper">
            <div className="hello-strip">
              <span>Hello</span>
              <span>नमस्ते</span>
              <span>Bonjour</span>
              <span>Hola</span>
              <span>ਸਤ ਸ੍ਰੀ ਅਕਾਲ</span>
              <span>こんにちは</span>
              <span>안녕하세요</span>
              <span>Ciao</span>
              <span>Hallo</span>
            </div>
          </div>
        </div>

        <div
          className="portfolio-scroll"
          onWheel={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerMove={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{
            height: "496px",
            overflowY: "auto",
            overflowX: "hidden",
            position: "relative",
            zIndex: 2,
            pointerEvents: "auto",
            scrollSnapType: "y mandatory",
          }}
        >
          <section
            style={{
              minHeight: "496px",
              padding: "30px 34px",
              display: "grid",
              gridTemplateColumns: "1.08fr 0.92fr",
              gap: "24px",
              alignItems: "center",
              scrollSnapAlign: "start",
            }}
          >
            {/* LEFT SIDE */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  width: "fit-content",
                  padding: "9px 15px",
                  borderRadius: "999px",
                  background: "rgba(56,189,248,0.12)",
                  border: "1px solid rgba(56,189,248,0.24)",
                  color: "#67e8f9",
                  fontSize: "14px",
                  fontWeight: 950,
                  marginBottom: "16px",
                }}
              >
                FULL STACK + ML DEVELOPER
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "44px",
                  lineHeight: "0.92",
                  letterSpacing: "-3px",
                  fontWeight: 950,
                }}
              >
                Tarshdeep
                <br />
                Kaur
              </h1>

              <p
                style={{
                  marginTop: "16px",
                  marginBottom: 0,
                  fontSize: "18px",
                  lineHeight: "1.55",
                  color: "#dbeafe",
                  fontWeight: 650,
                  maxWidth: "500px",
                }}
              >
                I build full-stack applications, machine learning systems, and
                clean digital experiences that feel practical, modern, and
                visually engaging.
              </p>

              <p
                style={{
                  marginTop: "8px",
                  marginBottom: 0,
                  fontSize: "16px",
                  lineHeight: "1.5",
                  color: "#cbd5e1",
                  fontWeight: 600,
                  maxWidth: "520px",
                }}
              >
                Currently exploring real-world AI workflows and interactive
                interfaces that blend design with functionality.
              </p>

              <div
                style={{
                  marginTop: "18px",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {[
                  "Open to Internships",
                  "ML + Web Dev",
                  "Hackathon Builder",
                  "Problem Solver",
                ].map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: "9px 12px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#ffffff",
                      fontSize: "12px",
                      fontWeight: 850,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                gap: "14px",
              }}
            >
              {/* IMAGE CARD */}
              <div
                style={{
                  flex: 1,
                  borderRadius: "30px",
                  position: "relative",
                  overflow: "hidden",
                  background:
                    "radial-gradient(circle at 20% 15%, rgba(56,189,248,0.16), transparent 30%), radial-gradient(circle at 82% 12%, rgba(168,85,247,0.2), transparent 32%), #020617",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow:
                    "0 18px 42px rgba(0,0,0,0.28), inset 0 0 24px rgba(56,189,248,0.06)",
                }}
              >
                <img
                  src="/image.webp"
                  alt="AI girl"
                  style={{
                    position: "absolute",
                    right: "0px",
                    bottom: "0px",
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    filter:
                      "drop-shadow(0 18px 26px rgba(0,0,0,0.45)) saturate(1.08) contrast(1.05)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg, rgba(2,6,23,0.58) 0%, rgba(2,6,23,0.18) 45%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at 20% 15%, rgba(56,189,248,0.18), transparent 34%), radial-gradient(circle at 85% 20%, rgba(168,85,247,0.18), transparent 38%)",
                    mixBlendMode: "screen",
                    opacity: 0.45,
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    left: "18px",
                    top: "18px",
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      marginTop: "6px",
                      fontSize: "22px",
                      fontWeight: 950,
                      color: "#ffffff",
                      lineHeight: 1.05,
                      textShadow: "0 0 18px rgba(0,0,0,0.45)",
                    }}
                  >
                    Code.
                    <br />
                    Create.
                    <br />
                    Evolve.
                  </div>
                </div>
              </div>

              {/* SPOTIFY GRADIENT */}
              <div
                style={{
                  borderRadius: "24px",
                  padding: "12px",
                  background:
                    "linear-gradient(135deg, rgba(56,189,248,0.38), rgba(168,85,247,0.3), rgba(15,23,42,0.92))",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow:
                    "inset 0 0 26px rgba(56,189,248,0.16), 0 0 28px rgba(168,85,247,0.18)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "9px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "14px",
                        background:
                          "linear-gradient(135deg, rgba(56,189,248,0.45), rgba(168,85,247,0.42))",
                        border: "1px solid rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        fontWeight: 950,
                        color: "#ffffff",
                        boxShadow: "0 0 18px rgba(56,189,248,0.22)",
                      }}
                    >
                      ♫
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: "17px",
                          fontWeight: 950,
                          color: "#ffffff",
                          lineHeight: 1,
                        }}
                      >
                        Spotify
                      </div>

                      <div
                        style={{
                          marginTop: "4px",
                          fontSize: "10px",
                          color: "#dbeafe",
                          fontWeight: 900,
                          letterSpacing: "0.8px",
                        }}
                      >
                        PLAYLIST MODE
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActive(!active)}
                    style={{
                      border: "1px solid rgba(255,255,255,0.18)",
                      borderRadius: "999px",
                      padding: "7px 11px",
                      background: active
                        ? "linear-gradient(135deg, rgba(56,189,248,0.5), rgba(168,85,247,0.42))"
                        : "rgba(255,255,255,0.08)",
                      color: "#ffffff",
                      fontSize: "10px",
                      fontWeight: 950,
                      cursor: "pointer",
                      pointerEvents: "auto",
                      boxShadow: active
                        ? "0 0 14px rgba(168,85,247,0.35)"
                        : "none",
                    }}
                  >
                    {active ? "FX On" : "FX"}
                  </button>
                </div>

                <div
                  style={{
                    height: "86px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    background:
                      "linear-gradient(135deg, rgba(57, 121, 148, 0.24), rgba(168,85,247,0.2), rgba(15,23,42,0.95))",
                    border: "1px solid rgba(255,255,255,0.16)",
                    boxShadow:
                      "inset 0 0 22px rgba(56,189,248,0.12), 0 0 16px rgba(168,85,247,0.12)",
                    position: "relative",
                  }}
                >
                  <iframe
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6?utm_source=generator&theme=0"
                    width="100%"
                    height="86"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{
                      border: "none",
                      width: "100%",
                      height: "86px",
                      display: "block",
                      background: "transparent",
                      pointerEvents: "auto",
                      position: "relative",
                      zIndex: 1,
                      filter: "saturate(1.12) brightness(0.9) contrast(1.08)",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 2,
                      background:
                        "linear-gradient(135deg, rgba(40, 154, 202, 0.32), rgba(77, 14, 136, 0.28))",
                      mixBlendMode: "screen",
                      opacity: 0.5,
                      pointerEvents: "none",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 3,
                      background:
                        "radial-gradient(circle at 12% 8%, rgba(56,189,248,0.3), transparent 36%), radial-gradient(circle at 88% 18%, rgba(168,85,247,0.3), transparent 42%)",
                      mixBlendMode: "overlay",
                      opacity: 0.48,
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
          <section
            style={{
              minHeight: "496px",
              padding: "34px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              scrollSnapAlign: "start",
            }}
          >
            <div
              style={{
                borderRadius: "32px",
                padding: "24px",
                minHeight: "410px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="glow-dot" style={{ left: 28, top: 26 }} />
              <div
                className="glow-dot"
                style={{ right: 42, top: 54, animationDelay: ".8s" }}
              />
              <div
                className="glow-dot"
                style={{ left: 64, bottom: 48, animationDelay: "1.3s" }}
              />

              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 950,
                  color: "#ffffff",
                  marginBottom: "8px",
                  textShadow: "0 0 14px rgba(56,189,248,0.35)",
                }}
              >
                Skill Core
              </div>

              <div className="screen-cube-stage">
                <div className="screen-cube">
                  <div className="cube-face front">AI</div>
                  <div className="cube-face back">ML</div>
                  <div className="cube-face right">API</div>
                  <div className="cube-face left">CV</div>
                  <div className="cube-face top">DL</div>
                  <div className="cube-face bottom">WEB-DEV</div>
                </div>

                {cubeSkills.map((skill, index) => (
                  <div key={skill} className={`orbit-chip chip-${index + 1}`}>
                    {skill}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "8px",
                  overflow: "hidden",
                  width: "100%",
                  paddingTop: "8px",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="skill-marquee">
                  {[...skills, ...skills].map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      style={{
                        padding: "8px 11px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#ffffff",
                        fontSize: "13.5px",
                        fontWeight: 900,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            style={{
              minHeight: "496px",
              padding: "30px 34px",
              scrollSnapAlign: "start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: "18px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "34px",
                    lineHeight: 1,
                    fontWeight: 950,
                    letterSpacing: "-2px",
                    color: "#ffffff",
                  }}
                >
                  Projects
                </h2>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              {[
                {
                  title: "QuantLab",
                  tag: "Python • FastAPI • Finance",
                  desc: "AI-powered quantitative trading platform with backtesting, Sharpe Ratio, drawdown and win-rate analytics.",
                  link: "https://github.com/Tarshdeep2210/QuantLab",
                },
                {
                  title: "AI Career Guidance",
                  tag: "React • Node.js • MongoDB",
                  desc: "Full-stack platform with LLM chatbot, personalized roadmaps and career recommendation support.",
                  link: "https://github.com/Tarshdeep2210/Career-Guidance",
                },
                {
                  title: "Wildlife Monitoring",
                  tag: "TensorFlow • EfficientNet",
                  desc: "Computer vision system using EfficientNet for animal, empty and poacher scene classification.",
                  link: "https://github.com/Tarshdeep2210/Poaching-detection",
                },
                {
                  title: "SPHINX’24 Hackathon",
                  tag: "React • Node.js • Secure APIs",
                  desc: "Secure lawyer-client platform with real-time chat, encrypted file sharing and backend APIs.",
                  link: "https://github.com/HackReposForUs/Sphinx2024",
                },
              ].map((project) => (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                  onPointerMove={(e) => e.stopPropagation()}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    minHeight: "165px",
                    borderRadius: "24px",
                    padding: "18px",
                    background:
                      "linear-gradient(135deg, rgba(56,189,248,0.12), rgba(168,85,247,0.12), rgba(255,255,255,0.04))",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow:
                      "inset 0 0 20px rgba(56,189,248,0.05), 0 12px 28px rgba(0,0,0,0.18)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    pointerEvents: "auto",
                    transition:
                      "transform 0.18s ease, border 0.18s ease, box-shadow 0.18s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.border =
                      "1px solid rgba(103,232,249,0.34)";
                    e.currentTarget.style.boxShadow =
                      "0 18px 36px rgba(0,0,0,0.26), 0 0 22px rgba(56,189,248,0.14)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0px)";
                    e.currentTarget.style.border =
                      "1px solid rgba(255,255,255,0.12)";
                    e.currentTarget.style.boxShadow =
                      "inset 0 0 20px rgba(56,189,248,0.05), 0 12px 28px rgba(0,0,0,0.18)";
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "22px",
                          fontWeight: 950,
                          color: "#ffffff",
                          letterSpacing: "-0.8px",
                        }}
                      >
                        {project.title}
                      </h3>

                      <span
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "999px",
                          background:
                            "linear-gradient(135deg, rgba(56,189,248,0.3), rgba(168,85,247,0.28))",
                          border: "1px solid rgba(255,255,255,0.16)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ffffff",
                          fontSize: "15px",
                          fontWeight: 950,
                          flexShrink: 0,
                        }}
                      >
                        ↗
                      </span>
                    </div>

                    <p
                      style={{
                        marginTop: "10px",
                        marginBottom: 0,
                        fontSize: "13px",
                        lineHeight: "1.45",
                        color: "#cbd5e1",
                        fontWeight: 650,
                      }}
                    >
                      {project.desc}
                    </p>
                  </div>

                  <div
                    style={{
                      marginTop: "14px",
                      display: "inline-flex",
                      width: "fit-content",
                      padding: "7px 10px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#67e8f9",
                      fontSize: "11px",
                      fontWeight: 900,
                    }}
                  >
                    {project.tag}
                  </div>
                </a>
              ))}
            </div>
          </section>
          {/* ACHIEVEMENTS */}
          <section
            style={{
              minHeight: "496px",
              padding: "34px",
              scrollSnapAlign: "start",
              display: "grid",
              gridTemplateColumns: "0.9fr 1.1fr",
              gap: "24px",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 950,
                  color: "#67e8f9",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                }}
              >
                ACHIEVEMENT
              </div>

              <h2
                style={{
                  margin: 0,
                  fontSize: "40px",
                  lineHeight: "0.95",
                  fontWeight: 950,
                  letterSpacing: "-2.4px",
                  color: "#ffffff",
                }}
              >
                SPHINX’24
                <br />
                Hackathon
              </h2>

              <p
                style={{
                  marginTop: "16px",
                  marginBottom: 0,
                  fontSize: "15px",
                  lineHeight: "1.55",
                  color: "#cbd5e1",
                  fontWeight: 650,
                }}
              >
                A competitive hackathon experience where the idea was converted
                into a working secure communication platform within limited
                time.
              </p>
            </div>

            <div
              style={{
                borderRadius: "30px",
                padding: "26px",
                background:
                  "linear-gradient(135deg, rgba(56,189,248,0.16), rgba(168,85,247,0.16), rgba(255,255,255,0.05))",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow:
                  "inset 0 0 28px rgba(56,189,248,0.06), 0 18px 38px rgba(0,0,0,0.22)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: "-40px",
                  top: "-40px",
                  width: "150px",
                  height: "150px",
                  borderRadius: "999px",
                  background: "rgba(168,85,247,0.18)",
                  filter: "blur(10px)",
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "20px",
                    background:
                      "linear-gradient(135deg, rgba(56,189,248,0.38), rgba(168,85,247,0.36))",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    boxShadow: "0 0 24px rgba(168,85,247,0.22)",
                    marginBottom: "18px",
                  }}
                >
                  🏆
                </div>

                <h3
                  style={{
                    margin: 0,
                    fontSize: "30px",
                    fontWeight: 950,
                    color: "#ffffff",
                    letterSpacing: "-1.3px",
                  }}
                >
                  1st Runner-Up
                </h3>

                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "14px",
                    fontWeight: 900,
                    color: "#67e8f9",
                  }}
                >
                  MNIT Jaipur • 2024
                </div>

                <p
                  style={{
                    marginTop: "16px",
                    marginBottom: 0,
                    fontSize: "14px",
                    lineHeight: "1.55",
                    color: "#dbeafe",
                    fontWeight: 650,
                  }}
                >
                  Built a secure lawyer-client communication platform with
                  real-time chat, encrypted file sharing, authentication, and
                  backend APIs.
                </p>

                <div
                  style={{
                    marginTop: "18px",
                    display: "flex",
                    gap: "9px",
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    "Secure Communication",
                    "Real-time Chat",
                    "Encrypted Files",
                    "Backend APIs",
                  ].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "8px 11px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#ffffff",
                        fontSize: "11px",
                        fontWeight: 850,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Html>
  );
}

function Computer({
  active,
  setActive,
}: {
  active: boolean;
  setActive: (value: boolean) => void;
}) {
  return (
    <group position={[0, 0.45, -0.1]}>
      <mesh position={[0, 0.13, -0.08]} castShadow>
        <boxGeometry args={[6.35, 3.65, 0.08]} />
        <meshStandardMaterial
          color="#000000"
          metalness={0.18}
          roughness={0.55}
        />
      </mesh>

      <mesh position={[0, 0.13, 0.035]} castShadow>
        <boxGeometry args={[6.35, 3.65, 0.045]} />
        <meshStandardMaterial
          color="#1f2937"
          metalness={0.38}
          roughness={0.32}
        />
      </mesh>

      <mesh position={[0, 0.13, 0.075]}>
        <boxGeometry args={[6.18, 3.48, 0.025]} />
        <meshStandardMaterial color="#020617" />
      </mesh>

      <mesh position={[0, 1.88, 0.13]}>
        <sphereGeometry args={[0.032, 24, 24]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.75}
        />
      </mesh>

      <mesh position={[0, -1.9, 0]} castShadow>
        <boxGeometry args={[0.24, 0.82, 0.24]} />
        <meshStandardMaterial
          color="#1f2937"
          metalness={0.35}
          roughness={0.32}
        />
      </mesh>

      <mesh position={[0, -2.26, 0.16]} castShadow>
        <boxGeometry args={[1.75, 0.09, 0.9]} />
        <meshStandardMaterial
          color="#1f2937"
          metalness={0.35}
          roughness={0.34}
        />
      </mesh>

      <ComputerScreen active={active} setActive={setActive} />
    </group>
  );
}

function FloatingDecor() {
  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.4}>
        <mesh position={[-3.95, 2.4, 0.25]}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial
            color="#7dd3fc"
            emissive="#7dd3fc"
            emissiveIntensity={0.9}
          />
        </mesh>
      </Float>

      <Float speed={2.3} rotationIntensity={1.4} floatIntensity={1.8}>
        <mesh position={[3.95, 2.1, 0]}>
          <torusGeometry args={[0.34, 0.055, 16, 80]} />
          <meshStandardMaterial
            color="#d9f99d"
            emissive="#d9f99d"
            emissiveIntensity={0.9}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  const [speakersActive, setSpeakersActive] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1200);

  useEffect(() => {
    const check = () => setViewportWidth(window.innerWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isPhone = viewportWidth <= 520;
  const isTablet = viewportWidth > 520 && viewportWidth <= 900;
  const isSmallLaptop = viewportWidth > 900 && viewportWidth <= 1100;

  const cameraPosition: [number, number, number] = isPhone
    ? [0, 0.95, 14.4]
    : isTablet
      ? [0, 0.95, 12.8]
      : isSmallLaptop
        ? [0, 0.95, 11.3]
        : [0, 0.95, 10.05];

  const cameraFov = isPhone ? 45 : isTablet ? 41 : isSmallLaptop ? 38 : 35;
  const sceneScale = isPhone
    ? 0.56
    : isTablet
      ? 0.82
      : isSmallLaptop
        ? 0.96
        : 1.08;
  const sceneY = isPhone ? 0.03 : 0.02;

  return (
    <div
      style={{
        minHeight: "100svh",
        height: "100svh",
        width: "100vw",
        background: "#050816",
        overflow: "hidden",
        touchAction: "none",
      }}
    >
      <Canvas shadows camera={{ position: cameraPosition, fov: cameraFov }}>
        <color attach="background" args={["#050816"]} />

        <ambientLight intensity={1.08} />

        <spotLight
          position={[0, 6.4, 5]}
          angle={0.45}
          penumbra={0.6}
          intensity={3.7}
          castShadow
        />

        <pointLight position={[-4.2, 2.8, 3]} intensity={3.0} color="#7c3aed" />
        <pointLight position={[4.2, 2.7, 3]} intensity={2.9} color="#38bdf8" />
        <pointLight position={[0, 0.5, 3.6]} intensity={1.3} color="#60a5fa" />

        <Stars radius={90} depth={40} count={1800} factor={3} fade />

        <group
          position={[0, sceneY, 0]}
          scale={[sceneScale, sceneScale, sceneScale]}
        >
          <Desk />
          <Computer active={speakersActive} setActive={setSpeakersActive} />
          <Keyboard />
          <Mouse />
          <Speaker x={-3.95} active={speakersActive} />
          <Speaker x={3.95} active={speakersActive} />
          <FloatingDecor />
        </group>

        <ContactShadows
          position={[0, -2.86, 0]}
          opacity={0.42}
          scale={12}
          blur={2.8}
          far={4}
        />

        <OrbitControls
          enableRotate
          enableZoom
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={isPhone ? 11.5 : isTablet ? 10.4 : 8.0}
          maxDistance={isPhone ? 16.5 : isTablet ? 15.0 : 12.0}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      </Canvas>
    </div>
  );
}