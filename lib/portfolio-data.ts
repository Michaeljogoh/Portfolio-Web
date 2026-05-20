import type { ProjectCategoryId } from "@/lib/project-categories";
import type { CertificationCategoryId } from "@/lib/cert-categories";
import type {
  Certification,
  ExperienceEntry,
  Project,
} from "@/lib/portfolio-types";

export type { Certification, ExperienceEntry, Project } from "@/lib/portfolio-types";

export const SOCIAL = {
  github: "https://github.com/Michaeljogoh",
  linkedin: "https://linkedin.com/in/michael-jogoh-257778222",
  email: "mailto:michaeljogoh@gmail.com",
  emailDisplay: "michaeljogoh@gmail.com",
  phoneTel: "tel:+2347034348894",
  phoneDisplay: "+234 703 434 8894",
} as const;

export const projects: Project[] = [
  {
    title: "Aplika — AI Job Tracker",
    description:
      "AI-powered job tracking: automated resumes, cover letters, and applications across 10+ boards; follow-ups and LinkedIn outreach. Next.js, Node.js, MongoDB, Puppeteer scraping, real-time analytics, Stripe subscriptions, and a responsive UI.",
    tags: ["Next.js", "Node.js", "MongoDB", "Puppeteer", "Stripe", "AI"],
    categories: [
      "ai-automation-workflows",
      "ai-ml",
      "backend-apis",
      "frontend-ui",
      "devops-cloud",
    ],
    image: "/project-placeholder-1.jpg",
    link: "#",
    repo: SOCIAL.github,
  },
  {
    title: "Avatar Management API",
    description:
      "RESTful API with NestJS and TypeScript, integrated with an external user service (ReqRes). MongoDB storage, avatar handling, email notifications, RabbitMQ events, and full Jest unit test coverage.",
    tags: ["NestJS", "TypeScript", "MongoDB", "RabbitMQ", "Jest"],
    categories: ["backend-apis"],
    image: "/project-placeholder-2.jpg",
    link: "#",
    repo: SOCIAL.github,
  },
  {
    title: "Open source & more",
    description:
      "Additional work spans Express and Nest backends, HIPAA/GDPR-aware systems, CI/CD with Jenkins and GitLab, and infrastructure automation with Terraform and Ansible.",
    tags: ["Node.js", "DevOps", "Security", "APIs"],
    categories: ["backend-apis", "devops-cloud", "cybersecurity"],
    image: "/project-placeholder-3.jpg",
    link: SOCIAL.github,
    repo: SOCIAL.github,
  },
];

export type SkillGroupStatic = { category: string; items: string[] };

export const skills: SkillGroupStatic[] = [
  {
    category: "Backend & API",
    items: [
      "Node.js",
      "Python",
      "Go",
      "Rust",
      "REST APIs",
      "GraphQL",
      "gRPC",
      "Express.js",
      "NestJS",
      "FastAPI",
      "Gin",
      "RabbitMQ",
      "Socket.io",
      "WebSockets",
    ],
  },
  {
    category: "Frontend & UI",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "JavaScript",
      "Tailwind",
      "Figma",
      "Vite",
      "HTML/CSS",
      "Redux Toolkit",
      "Zustand",
      "Shadcn UI",
      "Material UI",
      "Chakra UI",
      "React Router",
      "Tanstack Query",
      "Apollo Client",
      "Framer Motion",
    ],
  },
  {
    category: "DevOps & Cloud",
    items: [
      "Linux",
      "Docker",
      "Kubernetes",
      "Networking",
      "Terraform",
      "Ansible",
      "AWS",
      "GCP",
      "Git",
      "GitHub",
      "GitHub Actions",
      "GitLab CI",
      "Jenkins",
      "Nginx",
    ],
  },
  {
    category: "AI & Automation",
    items: [
      "n8n",
      "LangChain",
      "LangGraph",
      "Zapier",
      "Make",
      "OpenAI API",
      "Prompt Engineering",
    ],
  },
  {
    category: "Database",
    items: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "SQLite",
      "Supabase",
      "Firebase",
      "Cassandra",
      "DynamoDB",
      "Prisma",
      "TypeORM",
      "Sequelize",
    ],
  },
  {
    category: "Testing & QA",
    items: [
      "Jest",
      "React Testing Library",
      "Mocha",
      "TDD",
      "BDD",
      "Chai",
    ],
  },
  {
    category: "Architecture & Methodologies",
    items: [
      "Microservices",
      "Monolith",
      "Event-Driven",
      "Serverless",
      "Agile / SCRUM",
      "SOLID",
      "DDD",
      "OOP",
      "CI/CD",
    ],
  },
  {
    category: "Security",
    items: [
      "RBAC",
      "Encryption",
      "HIPAA Compliance",
      "GDPR Compliance",
      "Vulnerability Awareness",
    ],
  },
  {
    category: "Soft Skills",
    items: [
      "Communication",
      "Problem-solving",
      "Collaboration",
      "Adaptability",
      "Time Management",
      "Continuous Learning",
    ],
  },
];

export const experience: ExperienceEntry[] = [
  {
    title: "Full Stack Engineer — RocketDevs",
    date: "Jul 2024 – Nov 2025",
    readTime: "California, US · Contract",
    excerpt:
      "Full-stack architecture with Next.js, Node, Express, LLMs, and Puppeteer: automated applications and follow-ups across 4+ job boards, GDPR-aligned data practices, OAuth2/JWT auth, and responsive UI with Tailwind, Shadcn, and Framer Motion.",
  },
  {
    title: "Full Stack Developer — Elonatech Limited",
    date: "Jul 2023 – May 2024",
    readTime: "Lagos, Nigeria · Full-time",
    excerpt:
      "React, Express.js, and MongoDB apps with stronger SEO and engagement; HIPAA-oriented secure handling and access control; maintained 2+ client sites with performance and reliability improvements.",
  },
  {
    title: "DevOps Engineer — EGA Tech Limited",
    date: "May 2023 – Sep 2023",
    readTime: "London, UK · Contract",
    excerpt:
      "CI/CD with Jenkins and GitLab CI; infrastructure as code with Ansible and Terraform; Docker and Kubernetes for microservices and faster delivery.",
  },
  {
    title: "Node.js Backend Developer — Bonshare",
    date: "Jan 2023 – Apr 2023",
    readTime: "Istanbul, Turkey · Contract",
    excerpt:
      "Agile backend delivery in JavaScript; Mocha and Chai tests with high coverage; third-party APIs and transactional email integrations.",
  },
  {
    title: "Junior Software Engineer — Robotslimited",
    date: "Dec 2021 – Dec 2022",
    readTime: "Lagos, Nigeria · Full-time",
    excerpt:
      "Express.js and MongoDB backends; React front ends; SOLID, modular design, and measurable gains in performance and maintainability.",
  },
  {
    title: "Backend Developer Intern — The Code Center",
    date: "Jan 2021 – Jul 2021",
    readTime: "Lagos, Nigeria · Internship",
    excerpt:
      "SQL and NoSQL schema work and query optimization; Git/GitHub workflows, branching, and merge conflict resolution.",
  },
];

export const certifications: Certification[] = [
  {
    title: "JavaScript Data Structures and Algorithms",
    issuer: "freeCodeCamp",
    issued: "Mar 2022",
    excerpt:
      "Foundational algorithms and data structures in JavaScript — arrays, objects, sorting, and Big-O thinking.",
    tags: ["JavaScript", "Algorithms", "DSA"],
    categories: ["software-engineering"],
    image: "/project-placeholder-1.jpg",
    credentialUrl: "#",
  },
  {
    title: "Node.js",
    issuer: "TestDome",
    issued: "Aug 2023",
    excerpt: "Node.js proficiency assessment covering runtime APIs and idioms.",
    tags: ["Node.js", "JavaScript", "Assessment"],
    categories: ["software-engineering"],
    image: "/project-placeholder-2.jpg",
    credentialUrl: "#",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    issued: "Jan 2021",
    excerpt:
      "HTML5, CSS3, flexbox, responsive layouts, and accessibility fundamentals.",
    tags: ["HTML", "CSS", "Accessibility"],
    categories: ["software-engineering"],
    image: "/project-placeholder-3.jpg",
    credentialUrl: "#",
  },
  {
    title: "API Design & Fundamentals",
    issuer: "Postman",
    issued: "Sep 2023",
    excerpt:
      "REST API design, documentation, testing workflows, and collaboration patterns.",
    tags: ["REST", "APIs", "Postman"],
    categories: ["software-engineering"],
    image: "/project-placeholder-1.jpg",
    credentialUrl: "#",
  },
];
