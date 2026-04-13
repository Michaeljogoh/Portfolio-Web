import type { LucideIcon } from "lucide-react";
import { Server, Layers, Workflow, Cloud } from "lucide-react";

export const HERO_PILLARS: readonly {
  title: string;
  body: string;
  Icon: LucideIcon;
}[] = [
  {
    title: "Backend",
    body: "REST & GraphQL APIs, Node.js, NestJS, Python, and resilient data layers.",
    Icon: Server,
  },
  {
    title: "Full stack",
    body: "React & Next.js, cohesive UIs, and end-to-end ownership from API to pixel.",
    Icon: Layers,
  },
  {
    title: "DevOps & Cloud",
    body: "Docker, Kubernetes, Terraform, Ansible, CI/CD pipelines, and cloud platforms like AWS, Azure, and GCP.",
    Icon: Workflow,
  },
  {
    title: "AI & Automation",
    body: "LangChain, LangGraph, CrewAI, n8n, RAG pipelines, vector databases, and agentic workflows ",
    Icon: Cloud,
  },
];
