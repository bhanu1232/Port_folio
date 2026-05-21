import thumbnailCubeWar from "../../../assets/thumbnails/cubewar.webp";
import thumbnailQuibbo from "../../../assets/thumbnails/quibbo.webp";
//import thumbnailParticles from "../../../assets/thumbnails/particles.webp";
import thumbnailPokedex from "../../../assets/thumbnails/pokedex.webp";
import thumbnailSharkie from "../../../assets/thumbnails/sharkie.webp";
import thumbnailStreakon from "../../../assets/thumbnails/streakon.webp";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Gym consultation portal",
    slug: "sharkie",
    thumbnail: thumbnailSharkie,
    description: "a full-stack web application for gym consultation",
  },
  {
    title: "Website + CMS",
    slug: "streakon",
    thumbnail: thumbnailStreakon,
    description: "Official SV University Website",
  },
  {
    title: "RepoRAG",
    slug: "cubewar",
    thumbnail: thumbnailCubeWar,
    description: "Ai Code Intelligence for GitHub Repositories",
  },
  {
    title: "Shop Smart Ecommerce",
    slug: "quibbo",
    thumbnail: thumbnailQuibbo,
    description: "AI-powered ecommerce platform",
  },

  /**  {
    title: "WebGL Particles",
    slug: "particles",
    thumbnail: thumbnailParticles,
    description: "Dynamic 3D particles",
  }, */
  {
    title: "Q Route",
    slug: "pokedex",
    thumbnail: thumbnailPokedex,
    description: "Quantum Research Project",
  },
] as const satisfies ProjectPreview[];
