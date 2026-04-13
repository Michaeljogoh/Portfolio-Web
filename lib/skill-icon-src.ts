const SI11 = "https://cdn.jsdelivr.net/npm/simple-icons@11/icons";
const SI14 = "https://cdn.jsdelivr.net/npm/simple-icons@14/icons";
const SK =
  "https://cdn.jsdelivr.net/gh/tandpfun/skill-icons@main/icons" as const;
const DV = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons" as const;

export const SKILL_ICON_SRC: Record<string, string> = {
  // Languages
  JavaScript: `${SK}/JavaScript.svg`,
  TypeScript: `${SK}/TypeScript.svg`,
  Python: `${DV}/python/python-original.svg`,
  Go: `${SK}/GoLang.svg`,
  Rust: `${SK}/Rust.svg`,
  Java: `${SK}/Java-Light.svg`,
  SQL: `${SK}/MySQL.svg`,
  "HTML/CSS": `${SK}/HTML.svg`,
  HTML: `${SK}/HTML.svg`,
  CSS: `${SK}/CSS.svg`,

  // Frontend & UI
  React: `${DV}/react/react-original.svg`,
  "Next.js": `${SK}/NextJS-Light.svg`,
  Vite: `${SK}/Vite-Light.svg`,
  Tailwind: `${SK}/TailwindCSS-Light.svg`,
  "Tailwind CSS": `${SK}/TailwindCSS-Light.svg`,
  Figma: `${SK}/Figma-Light.svg`,
  "Redux Toolkit": `${SK}/Redux.svg`,
  Redux: `${SK}/Redux.svg`,
  Zustand: `${SI14}/zustand.svg`,
  "Shadcn UI": `${SK}/React.svg`,
  "Material UI": `${SK}/MaterialUI-Light.svg`,
  "Chakra UI": `${SI14}/chakraui.svg`,
  "React Router": `${SI14}/reactrouter.svg`,
  "Tanstack Query": `${SI14}/reactquery.svg`,
  "Apollo Client": `${SI14}/apollographql.svg`,
  "Framer Motion": `${SI11}/framermotion.svg`,
  Vue: `${SK}/VueJS-Light.svg`,

  // Backend & API
  "Node.js": `${SK}/NodeJS-Light.svg`,
  "Express.js": `${SK}/ExpressJS-Light.svg`,
  NestJS: `${SK}/NestJS-Light.svg`,
  FastAPI: `${SK}/FastAPI.svg`,
  Django: `${SK}/Django.svg`,
  Gin: `${DV}/go/go-original.svg`,
  "REST APIs": `${SK}/Postman.svg`,
  GraphQL: `${SK}/GraphQL-Light.svg`,
  gRPC: `${DV}/grpc/grpc-plain.svg`,
  RabbitMQ: `${SI14}/rabbitmq.svg`,
  "Socket.io": `${SI14}/socketdotio.svg`,
  WebSockets: `${SI14}/websocket.svg`,
  Prisma: `${SK}/Prisma.svg`,
  TypeORM: `${SI14}/typeorm.svg`,
  Sequelize: `${SI14}/sequelize.svg`,
  Axios: `${SI14}/axios.svg`,

  // Database
  MongoDB: `${SK}/MongoDB.svg`,
  PostgreSQL: `${DV}/postgresql/postgresql-original.svg`,
  MySQL: `${DV}/mysql/mysql-original.svg`,
  Redis: `${SK}/Redis-Light.svg`,
  SQLite: `${SK}/SQLite.svg`,
  Supabase: `${SK}/Supabase-Light.svg`,
  Firebase: `${SK}/Firebase-Light.svg`,
  Cassandra: `${SK}/Cassandra-Light.svg`,
  DynamoDB: `${SK}/DynamoDB-Light.svg`,
  Elasticsearch: `${SK}/Elasticsearch-Light.svg`,

  // DevOps & Cloud
  Docker: `${SK}/Docker.svg`,
  Kubernetes: `${SK}/Kubernetes.svg`,
  Terraform: `${SK}/Terraform-Light.svg`,
  Ansible: `${SK}/Ansible.svg`,
  Jenkins: `${SK}/Jenkins-Light.svg`,
  "GitHub Actions": `${SK}/GithubActions-Light.svg`,
  "GitLab CI": `${SK}/GitLab-Light.svg`,
  Nginx: `${SK}/Nginx.svg`,
  Linux: `${SK}/Linux-Light.svg`,
  AWS: `${SK}/AWS-Light.svg`,
  GCP: `${SK}/GCP-Light.svg`,
  "Google Cloud": `${SK}/GCP-Light.svg`,
  Azure: `${SK}/Azure-Light.svg`,
  Heroku: `${SK}/Heroku.svg`,
  Git: `${SK}/Git.svg`,
  GitHub: `${SK}/Github-Light.svg`,
  Networking: `${SK}/Linux-Light.svg`,
  Kafka: `${SI14}/apachekafka.svg`,

  // AI & Automation
  LangChain: `${SI14}/langchain.svg`,
  LangGraph: `${SI14}/langgraph.svg`,
  n8n: `${SI14}/n8n.svg`,
  Zapier: `${SI14}/zapier.svg`,
  Make: `${SI14}/make.svg`,
  "OpenAI API": `${SI14}/openai.svg`,
  Anthropic: `${SI14}/anthropic.svg`,
  "Google AI": `${SI14}/googlegemini.svg`,
  "Prompt Engineering": `${SK}/Python.svg`,
  Puppeteer: `${SI14}/puppeteer.svg`,
  CrewAI: `${SI14}/crewai.svg`,
  "Hugging Face": `${SI14}/huggingface.svg`,
  RAG: `${SK}/Python.svg`,

  // Testing & QA
  Jest: `${SK}/Jest.svg`,
  "React Testing Library": `${SI14}/testinglibrary.svg`,
  Mocha: `${SI14}/mocha.svg`,
  Chai: `${SI14}/chai.svg`,
  Jasmine: `${SI14}/jasmine.svg`,
  Selenium: `${SI14}/selenium.svg`,
  TDD: `${SK}/Jest.svg`,
  BDD: `${SI14}/cucumber.svg`,
  
  // Architecture & Methodologies
  Microservices: `${DV}/nodejs/nodejs-plain.svg`,
  Monolith: `${DV}/nodejs/nodejs-plain.svg`,
  "Event-Driven": `${SI14}/apachekafka.svg`,
  Serverless: `${SK}/AWS-Light.svg`,

  SOLID: `${DV}/objectivec/objectivec-plain.svg`,
  DDD: `${DV}/dot-net/dot-net-original.svg`,
  OOP: `${DV}/cplusplus/cplusplus-original.svg`,

  "Agile / SCRUM": `${SI14}/jira.svg`,
  "CI/CD": `${SK}/GithubActions-Light.svg`,
  DevOps: `${SK}/Docker.svg`,

  // Security
 // Security
//  RBAC: `${SK}/Linux-Light.svg`,
RBAC: `${DV}/ssh/ssh-original.svg`,
 Encryption: `${SI14}/letsencrypt.svg`,
//  "HIPAA Compliance": `${SI14}/shieldsio.svg`,
//  "GDPR Compliance": `${SI14}/shieldsio.svg`,
// "HIPAA Compliance": `${DV}/debian/debian-original.svg`,
  "GDPR Compliance": `${DV}/debian/debian-original.svg`,
"HIPAA Compliance": `${SI14}/trustpilot.svg`,
  // "GDPR Compliance": `${SI14}/eu.svg`,
 "Vulnerability Awareness": `${SI14}/dependabot.svg`,

 // Soft Skills
 Communication: `${SI14}/googlemeet.svg`,
 "Problem-solving": `${SI14}/leetcode.svg`,
 Collaboration: `${SI14}/slack.svg`,
 Adaptability: `${SI14}/git.svg`,
 "Time Management": `${SI14}/googlecalendar.svg`,
 "Continuous Learning": `${SI14}/notion.svg`,

  // Misc
  Cisco: `${SI14}/cisco.svg`,
};













