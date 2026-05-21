export type TagVariant =
  | "three"
  | "websockets"
  | "ai"
  | "python"
  | "fastapi"
  | "pinecone"
  | "mongodb"
  | "sane"
  | "quiskit"
  | "osrm"
  | "react"
  | "redis"
  | "gray"
  | "html"
  | "css"
  | "javascript"
  | "node"
  | "next"
  | "kubernetes"
  | "postgresql"
  | "ogl"
  | "glsl";

export const tagLabels = {
  three: "Three.js",
  websockets: "WebSockets",
  react: "React",
  redis: "Redis",
  gray: "Gray",
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  node: "Node.js",
  next: "Next.js",
  kubernetes: "Kubernetes",
  postgresql: "PostgreSQL",
  ogl: "OGL.js",
  glsl: "GLSL",
  ai: "AI",
  python: "Python",
  fastapi: "FastAPI",
  pinecone: "Pinecone",
  mongodb: "MongoDB",
  sane: "SANE",
  quiskit: "Quiskit",
  osrm: "OSRM",
} as const satisfies Record<TagVariant, string>;
