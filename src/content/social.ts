export const social = [
  { url: "mailto:bhanuchowdam@gmail.com", name: "mail" },
  { url: "https://github.com/bhanu1232", name: "github" },
  { url: "https://www.linkedin.com/in/bhanuprakashchowdam", name: "linkedin" },
  //{ url: "https://www.instagram.com/davidhckh/", name: "instagram" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" }[];
