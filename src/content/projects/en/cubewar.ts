import videoCubeWar from "../../../assets/videos/cubewar.mp4";

import cubewar0 from "../../../assets/images/projects/cubewar/cubewar-0.webp";
import cubewar1 from "../../../assets/images/projects/cubewar/cubewar-1.webp";
import cubewar2 from "../../../assets/images/projects/cubewar/cubewar-2.webp";

import type { ProjectContent } from "../../types";
import type { TagVariant } from "../../../components/tagVariants";

export default {
  title: "RepoRAG",
  theme: "dark",
  tags: ["ai", "python", "fastapi", "pinecone"] as unknown as TagVariant[],
  videoBorder: false,
  live: "https://repo-rag.vercel.app",
  description:
    "AI-powered codebase intelligence tool using hybrid RAG with pgvector, BM25, and Groq/Llama 3. Ask questions about any GitHub repo and get precise, context-aware answers in seconds.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoCubeWar,
        caption: "Demo",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar0,
        alt: "Tutorial",
        caption: "Home page",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar1,
        alt: "Maps Themes",
        caption: "repo imported from GitHub",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar2,
        alt: "Authentication",
        caption: "Architecture generation ",
      },
    },
  ],
} as const satisfies ProjectContent;
