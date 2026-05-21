import pokedex0 from "../../../assets/images/projects/pokedex/pokedex-0.webp";
import pokedex1 from "../../../assets/images/projects/pokedex/pokedex-1.webp";
import pokedex2 from "../../../assets/images/projects/pokedex/pokedex-2.webp";
import pokedex3 from "../../../assets/images/projects/pokedex/pokedex-3.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Q Route",
  theme: "light",
  tags: ["python", "quiskit", "react", "osrm", "fastapi"],
  source: "https://github.com/davidhckh/pokedex",
  videoBorder: true,
  description:"Quantum-classical hybrid system that optimizes delivery routes across multiple vehicles in real road networks. Outperforms traditional algorithms by up to 25% using QAOA — built for the APSCHE AQVH 2025 Hackathon.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex0,
        alt: "Default View",
        caption: "Dash view",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex1,
        alt: "Search Function",
        caption: "Entaglement",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex2,
        alt: "Responsive Design",
        caption: "Route results",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex3,
        alt: "Lazy Loading",
        caption: "Route path + details",
      },
    },
  ],
} as const satisfies ProjectContent;
