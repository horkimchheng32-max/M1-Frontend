export type Person = { name: string; role: string; bio: string; photo?: string; socials: { icon: string; label: string; href: string }[] };
const s = (linkedin = "#", github = "#", x = "#") => [
  { icon: "ri-linkedin-box-line", label: "LinkedIn", href: linkedin },
  { icon: "ri-github-line", label: "GitHub", href: github },
  { icon: "ri-twitter-x-line", label: "X", href: x },
];
// Placeholder people: replace names, bios, photos and links with your real mentor and team.
export const mentors: Person[] = [
  { name: "Srorng Sokcheat", role: "Head Coach and Advisor", bio: "Fifteen years coaching youth and semi-pro football across Cambodia, guiding Sporty's event and training-ground partnerships.",photo:"/team-logos/members/sokcheat.jpg", socials: s() },
];
export const team: Person[] = [
  { name: "Puthy Lyhong", role: "", bio: "Member",photo:"/team-logos/members/lyhong.jpg" ,socials: s() },
  { name: "Hor Kimchheng", role: "", bio: "Member", photo:"/team-logos/members/kimchheng.jpg" , socials: s() },
  { name: "Kao Sengheang", role: "", bio: "Member",  photo:"/team-logos/members/kimchheng.jpg" ,socials: s() },
  { name: "Borey Sothearith", role: "", bio: "Member", photo:"/team-logos/members/sothearit.jpg" , socials: s() },
  { name: "Dy Chhean", role: "", bio: "Member", photo:"/team-logos/members/dychhean.jpg" , socials: s() },
  { name: "Eam Sambath", role: "", bio: "Member", photo: "/team-logos/members/sambath.jpg", socials: s("https://www.linkedin.com/in/eam-sambath-7244a5379/", "https://github.com/sambath09674-creator") },
];
