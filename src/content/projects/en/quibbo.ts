import quibbo0 from "../../../assets/images/projects/quibbo/quibbo-0.webp";
import quibbo1 from "../../../assets/images/projects/quibbo/quibbo-1.webp";
import quibbo2 from "../../../assets/images/projects/quibbo/quibbo-2.webp";
import quibbo3 from "../../../assets/images/projects/quibbo/quibbo-3.webp";
import quibbo4 from "../../../assets/images/projects/quibbo/quibbo-4.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Shop Smart Ecommerce",
  theme: "light",
  tags: ["ai", "node", "python", "redis", "postgresql"],
  videoBorder: true,
  live: "https://shop-smart-and-chic.vercel.app",
  description:
    "ShopSmart — AI-powered ecommerce platform with a built-in shopping assistant and personal stylist.<br/><br/> Recommends products based on your style, budget, and preferences — making every purchase decision faster and smarter.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo0,
        alt: "Avatar Creator",
        caption: "Home page",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo1,
        alt: "Multiplayer Tic-Tac-Toe",
        caption: "Product listing",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo2,
        alt: "Multiple Mini-Games",
        caption: "Profile page",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo3,
        alt: "Avatar Variations",
        caption: "Ai shipping Assistant",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo4,
        alt: "Responsive Design",
        caption: "Ai Style Assistant",
      },
    },
  ],
} as const satisfies ProjectContent;
