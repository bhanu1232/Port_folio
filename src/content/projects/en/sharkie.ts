import sharkie0 from "../../../assets/images/projects/sharkie/sharkie-0.webp";
import sharkie1 from "../../../assets/images/projects/sharkie/sharkie-1.webp";
import sharkie2 from "../../../assets/images/projects/sharkie/sharkie-2.webp";
import sharkie3 from "../../../assets/images/projects/sharkie/sharkie-3.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Consultation Portal",
  theme: "light",
  tags: ["javascript", "mongodb", "node", "react"],
  live: "https://kalyanbattersetty.com",
  description:"Full-stack gym consultation portal with end-to-end client booking and trainer management. Enabled online consultations for a real client, contributing to ₹10,00,000+ in revenue generated.<br/><br/>Built with a custom Node.js backend, React frontend, and MongoDB database. Implemented secure user authentication, dynamic scheduling, and responsive design for seamless user experience across devices.", 
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie0,
        alt: "Entities And Map Design",
        caption: "Home page",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie1,
        alt: "Boss Fight",
        caption: "About page",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie2,
        alt: "Mission",
        caption: "Contact Footer",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie3,
        alt: "Victory Screen",
        caption: "Booking form",
      },
    },

  ],
} as const satisfies ProjectContent;
