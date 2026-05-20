import { SKILL_ICON_SRC } from "@/lib/skill-icon-src";

const SI14 = "https://cdn.jsdelivr.net/npm/simple-icons@14/icons";

const SLUG_ALIASES: Record<string, string> = {
  "next.js": "nextdotjs",
  nextjs: "nextdotjs",
  "node.js": "nodedotjs",
  nodejs: "nodedotjs",
  "express.js": "express",
  expressjs: "express",
  "react testing library": "testinglibrary",
  "tanstack query": "reactquery",
  "apollo client": "apollographql",
  "shadcn ui": "react",
  "material ui": "mui",
  "chakra ui": "chakraui",
  "framer motion": "framermotion",
  "tailwind css": "tailwindcss",
  tailwind: "tailwindcss",
  "github actions": "githubactions",
  "gitlab ci": "gitlab",
  "google cloud": "googlecloud",
  gcp: "googlecloud",
  "openai api": "openai",
  "google ai": "googlegemini",
  "hugging face": "huggingface",
  "prompt engineering": "openai",
  "agile / scrum": "jira",
  "ci/cd": "githubactions",
  "hipaa compliance": "trustpilot",
  "gdpr compliance": "debian",
  "vulnerability awareness": "dependabot",
  "problem-solving": "leetcode",
  "time management": "googlecalendar",
  "continuous learning": "notion",
  "rest apis": "postman",
  websockets: "websocket",
  "socket.io": "socketdotio",
  "event-driven": "apachekafka",
  microservices: "docker",
  monolith: "docker",
  serverless: "amazonaws",
  rbac: "openssh",
  encryption: "letsencrypt",
  tdd: "jest",
  bdd: "cucumber",
  devops: "docker",
  networking: "cisco",
  "html/css": "html5",
  html: "html5",
  css: "css3",
  typescript: "typescript",
  javascript: "javascript",
  python: "python",
  postgresql: "postgresql",
  mongodb: "mongodb",
  mysql: "mysql",
  redis: "redis",
  docker: "docker",
  kubernetes: "kubernetes",
  terraform: "terraform",
  ansible: "ansible",
  aws: "amazonaws",
  azure: "azure",
  react: "react",
  vue: "vuedotjs",
  graphql: "graphql",
  grpc: "grpc",
  rabbitmq: "rabbitmq",
  kafka: "apachekafka",
  jest: "jest",
  puppeteer: "puppeteer",
  stripe: "stripe",
  prisma: "prisma",
  figma: "figma",
  n8n: "n8n",
  langchain: "langchain",
  langgraph: "langgraph",
  zapier: "zapier",
  make: "make",
  anthropic: "anthropic",
  crewai: "crewai",
  selenium: "selenium",
  mocha: "mocha",
  chai: "chai",
  jasmine: "jasmine",
  solid: "solid",
  oop: "cplusplus",
  ddd: "dotnet",
};

function slugCandidates(name: string): string[] {
  const normalized = name.trim().toLowerCase();
  const alias = SLUG_ALIASES[normalized];
  const candidates = new Set<string>();

  if (alias) candidates.add(alias);

  const stripped = normalized
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
  if (stripped) candidates.add(stripped);

  const dotStripped = normalized.replace(/\./g, "dot");
  candidates.add(dotStripped.replace(/\s+/g, ""));
  candidates.add(normalized.replace(/[^a-z0-9]+/g, ""));

  return [...candidates].filter(Boolean);
}

async function urlExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(4000) });
    return res.ok;
  } catch {
    return false;
  }
}

export async function resolveSkillIconUrl(name: string): Promise<string | null> {
  const trimmed = name.trim();
  if (!trimmed) return null;

  if (SKILL_ICON_SRC[trimmed]) {
    return SKILL_ICON_SRC[trimmed];
  }

  for (const slug of slugCandidates(trimmed)) {
    const url = `${SI14}/${slug}.svg`;
    if (await urlExists(url)) {
      return url;
    }
  }

  return null;
}

export function getSkillIconUrlSync(name: string): string | null {
  return SKILL_ICON_SRC[name.trim()] ?? null;
}
