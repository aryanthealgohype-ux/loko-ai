import type { LucideIcon } from "lucide-react";
import {
  Bot,
  BrainCircuit,
  Camera,
  Code2,
  Palette,
  SearchCheck,
  ShoppingBag,
  Sparkles,
  Target,
  WandSparkles,
} from "lucide-react";
import { getOpenRouterModelById } from "@/lib/openrouterModels";
import { SKILL_PROMPTS } from "@/lib/skillPrompts";

export type CollectionAssistant = {
  slug: string;
  name: string;
  description: string;
  category?: AgentCategory;
  date: string;
  model: string;
  modelId: string;
  accent: string;
  logoText: string;
  icon: LucideIcon;
  welcome: string;
  specializations: string[];
  restrictions: string[];
  skillPrompt?: string;
};

export type AgentCategory =
  | "Development"
  | "Design"
  | "Content"
  | "Business"
  | "Research"
  | "Analytics"
  | "Automation";

export const agentCategoryConfig: Array<{
  name: AgentCategory;
  tagline: string;
  accent: string;
  icon: LucideIcon;
}> = [
  {
    name: "Development",
    tagline: "Build apps, APIs, SaaS products, databases, and production code.",
    accent: "from-indigo-500 to-cyan-500",
    icon: Code2,
  },
  {
    name: "Design",
    tagline: "Create brands, interfaces, dashboards, decks, and visual systems.",
    accent: "from-fuchsia-500 to-violet-500",
    icon: Palette,
  },
  {
    name: "Content",
    tagline: "Write SEO, campaigns, social content, scripts, and conversion copy.",
    accent: "from-rose-500 to-orange-400",
    icon: Sparkles,
  },
  {
    name: "Business",
    tagline: "Plan startups, funnels, pricing, growth, investors, and strategy.",
    accent: "from-emerald-500 to-teal-400",
    icon: Target,
  },
  {
    name: "Research",
    tagline: "Run deep research, fact checks, reports, trends, and due diligence.",
    accent: "from-blue-500 to-sky-500",
    icon: SearchCheck,
  },
  {
    name: "Analytics",
    tagline: "Analyze spreadsheets, PDFs, SQL, BI, forecasts, KPIs, and dashboards.",
    accent: "from-orange-500 to-amber-400",
    icon: BrainCircuit,
  },
  {
    name: "Automation",
    tagline: "Operate browsers, workflows, support, CRM, documents, and teams.",
    accent: "from-sky-500 to-blue-600",
    icon: WandSparkles,
  },
];

type MarketplaceAgentBlueprint = {
  name: string;
  description: string;
  specializations: string[];
};

const marketplaceAgentBlueprints: Record<AgentCategory, MarketplaceAgentBlueprint[]> = {
  Development: [
    { name: "Full Stack App Builder", description: "Builds full-stack products with frontend, backend, auth, APIs, database, and deployment plans.", specializations: ["Full-stack apps", "APIs", "Auth", "Databases"] },
    { name: "SaaS Builder", description: "Designs subscription SaaS products with onboarding, billing, dashboards, admin flows, and growth loops.", specializations: ["SaaS architecture", "Billing", "Onboarding", "Dashboards"] },
    { name: "Website Builder", description: "Creates premium marketing websites, landing pages, portfolios, service pages, and conversion sections.", specializations: ["Websites", "Landing pages", "Responsive UI", "Conversion"] },
    { name: "React Developer", description: "Builds polished React components, stateful interfaces, hooks, and reusable frontend systems.", specializations: ["React", "Components", "Hooks", "State"] },
    { name: "Next.js Expert", description: "Architects Next.js App Router products with route handlers, server components, caching, and deployment.", specializations: ["Next.js", "App Router", "Server Components", "Vercel"] },
    { name: "Mobile App Builder", description: "Plans mobile app flows, screens, navigation, APIs, and launch-ready product behavior.", specializations: ["Mobile apps", "Navigation", "Screens", "APIs"] },
    { name: "API Builder", description: "Designs secure REST endpoints, request contracts, responses, validation, and integration workflows.", specializations: ["API design", "Validation", "Integrations", "Contracts"] },
    { name: "Database Architect", description: "Models PostgreSQL schemas, relationships, RLS policies, migrations, and scalable data access.", specializations: ["PostgreSQL", "Supabase", "RLS", "Schema design"] },
    { name: "Bug Fix Agent", description: "Triages bugs, identifies root causes, suggests patches, and writes regression-safe fixes.", specializations: ["Debugging", "Root cause", "Patches", "Regression safety"] },
    { name: "Code Reviewer", description: "Reviews code for defects, security risks, maintainability, performance, and missing tests.", specializations: ["Code review", "Security", "Performance", "Tests"] },
  ],
  Design: [
    { name: "Logo Designer", description: "Creates premium logo concepts with symbolism, variants, color systems, and usage guidance.", specializations: ["Logos", "Symbols", "Variants", "Brand marks"] },
    { name: "Brand Identity Creator", description: "Builds brand strategy, palettes, typography, tone, visual language, and launch assets.", specializations: ["Brand identity", "Typography", "Palettes", "Visual language"] },
    { name: "UI/UX Designer", description: "Designs user flows, product screens, interaction patterns, accessibility, and visual hierarchy.", specializations: ["UI", "UX", "Flows", "Accessibility"] },
    { name: "Dashboard Designer", description: "Creates clean operational dashboards with metrics, filters, tables, charts, and scan-friendly layouts.", specializations: ["Dashboards", "Metrics", "Charts", "Tables"] },
    { name: "Social Media Designer", description: "Plans social graphics, templates, carousels, reels covers, and campaign visuals.", specializations: ["Social design", "Carousels", "Templates", "Campaigns"] },
    { name: "Ad Creative Generator", description: "Creates ad concepts, visual hooks, copy angles, creative briefs, and performance variants.", specializations: ["Ad creatives", "Hooks", "Briefs", "Variants"] },
    { name: "Thumbnail Creator", description: "Designs YouTube thumbnail concepts with emotion, contrast, hierarchy, and CTR-focused layouts.", specializations: ["Thumbnails", "CTR", "Visual hierarchy", "YouTube"] },
    { name: "Presentation Designer", description: "Creates polished pitch decks, investor slides, sales decks, and strategic presentation systems.", specializations: ["Decks", "Slides", "Pitch design", "Storytelling"] },
    { name: "Wireframe Generator", description: "Turns product ideas into low-fidelity wireframes, flows, sections, and layout specifications.", specializations: ["Wireframes", "Layouts", "Flows", "Product structure"] },
    { name: "Design System Builder", description: "Builds tokens, components, variants, usage rules, and scalable product design systems.", specializations: ["Design systems", "Tokens", "Components", "Variants"] },
  ],
  Content: [
    { name: "SEO Writer", description: "Writes search-optimized pages, briefs, meta copy, outlines, and intent-driven content.", specializations: ["SEO", "Search intent", "Meta copy", "Outlines"] },
    { name: "Blog Writer", description: "Creates structured blogs with hooks, headings, expert explanations, and useful takeaways.", specializations: ["Blogs", "Articles", "Headings", "Editorial"] },
    { name: "Copywriting Expert", description: "Writes landing page copy, product messaging, CTAs, hooks, and high-converting offers.", specializations: ["Copywriting", "CTAs", "Offers", "Messaging"] },
    { name: "Email Campaign Creator", description: "Builds email sequences, subject lines, lifecycle flows, and nurture campaigns.", specializations: ["Email campaigns", "Sequences", "Subject lines", "Lifecycle"] },
    { name: "Social Media Manager", description: "Creates content calendars, captions, hooks, platform strategy, and engagement systems.", specializations: ["Content calendars", "Captions", "Social strategy", "Engagement"] },
    { name: "Product Description Writer", description: "Writes ecommerce product descriptions, benefits, feature bullets, and conversion copy.", specializations: ["Product copy", "Ecommerce", "Benefits", "Descriptions"] },
    { name: "YouTube Script Writer", description: "Creates video scripts, hooks, retention beats, outlines, and creator voice formats.", specializations: ["YouTube scripts", "Hooks", "Retention", "Outlines"] },
    { name: "LinkedIn Content Creator", description: "Writes professional posts, carousels, thought leadership, and founder-led content.", specializations: ["LinkedIn", "Thought leadership", "Carousels", "Founder content"] },
    { name: "Newsletter Writer", description: "Builds newsletters with editorial structure, sections, subject lines, and audience value.", specializations: ["Newsletters", "Editorial", "Subject lines", "Audience value"] },
    { name: "Marketing Strategist", description: "Plans positioning, campaigns, funnels, acquisition channels, and conversion experiments.", specializations: ["Marketing strategy", "Funnels", "Positioning", "Experiments"] },
  ],
  Business: [
    { name: "Business Plan Generator", description: "Creates business plans with market, model, operations, financial assumptions, and risks.", specializations: ["Business plans", "Operations", "Risks", "Financial assumptions"] },
    { name: "Startup Advisor", description: "Advises founders on product strategy, MVPs, validation, roadmap, and launch sequencing.", specializations: ["Startups", "MVPs", "Roadmaps", "Validation"] },
    { name: "Pitch Deck Creator", description: "Builds investor pitch deck narratives, slide outlines, traction framing, and ask strategy.", specializations: ["Pitch decks", "Investors", "Narrative", "Traction"] },
    { name: "Market Research Analyst", description: "Analyzes market size, customer segments, trends, gaps, and opportunity maps.", specializations: ["Market research", "Segments", "Trends", "Opportunities"] },
    { name: "Competitor Analysis Agent", description: "Compares competitors, positioning, pricing, features, messaging, and differentiation.", specializations: ["Competitors", "Positioning", "Pricing", "Differentiation"] },
    { name: "Sales Funnel Builder", description: "Designs funnels, lead magnets, landing pages, offers, nurture paths, and conversion steps.", specializations: ["Sales funnels", "Offers", "Lead magnets", "Conversion"] },
    { name: "Pricing Strategy Expert", description: "Creates pricing tiers, packaging, value metrics, usage limits, and upgrade paths.", specializations: ["Pricing", "Packaging", "Plans", "Value metrics"] },
    { name: "Growth Strategy Expert", description: "Plans growth loops, experiments, acquisition channels, retention, and activation systems.", specializations: ["Growth", "Activation", "Retention", "Experiments"] },
    { name: "Customer Persona Builder", description: "Builds customer personas, pain points, buying triggers, objections, and messaging maps.", specializations: ["Personas", "Pain points", "Objections", "Messaging"] },
    { name: "Investor Research Agent", description: "Finds investor fit, thesis alignment, outreach angles, and fundraising preparation notes.", specializations: ["Investor research", "Fundraising", "Outreach", "Thesis fit"] },
  ],
  Research: [
    { name: "Deep Research Agent", description: "Creates detailed research reports with source comparison, structured analysis, and citations.", specializations: ["Deep research", "Reports", "Citations", "Source comparison"] },
    { name: "Fact Checker", description: "Verifies claims, flags uncertainty, compares sources, and produces evidence-backed summaries.", specializations: ["Fact checking", "Evidence", "Claims", "Verification"] },
    { name: "Academic Research Assistant", description: "Supports literature reviews, summaries, research questions, paper structure, and citations.", specializations: ["Academic research", "Literature review", "Papers", "Citations"] },
    { name: "Industry Trends Analyst", description: "Tracks industry shifts, emerging patterns, market signals, and strategic implications.", specializations: ["Industry trends", "Signals", "Market shifts", "Implications"] },
    { name: "News Research Agent", description: "Summarizes news topics, compares coverage, identifies timelines, and extracts key context.", specializations: ["News research", "Timelines", "Coverage", "Context"] },
    { name: "Report Generator", description: "Turns raw findings into executive reports, briefs, tables, summaries, and recommendations.", specializations: ["Reports", "Briefs", "Tables", "Recommendations"] },
    { name: "Data Collection Agent", description: "Plans structured data collection, extraction fields, source lists, and validation steps.", specializations: ["Data collection", "Extraction", "Sources", "Validation"] },
    { name: "Knowledge Base Builder", description: "Organizes documents, FAQs, internal knowledge, SOPs, and reusable information systems.", specializations: ["Knowledge bases", "FAQs", "SOPs", "Documentation"] },
    { name: "Due Diligence Agent", description: "Assesses companies, products, risks, competitors, claims, and investment readiness.", specializations: ["Due diligence", "Risk", "Companies", "Investment"] },
    { name: "Strategic Research Team", description: "Coordinates research, business analysis, market insight, and final recommendations.", specializations: ["Research teams", "Strategy", "Analysis", "Recommendations"] },
  ],
  Analytics: [
    { name: "Excel Analyst", description: "Analyzes spreadsheets, formulas, pivots, summaries, cleanup needs, and business insights.", specializations: ["Excel", "Spreadsheets", "Formulas", "Pivots"] },
    { name: "PDF Analyzer", description: "Extracts insights from PDFs, contracts, reports, manuals, and uploaded document packs.", specializations: ["PDFs", "Documents", "Summaries", "Extraction"] },
    { name: "Data Visualization Expert", description: "Plans charts, dashboards, KPI visualizations, and executive-friendly data stories.", specializations: ["Data visualization", "Charts", "Dashboards", "Data stories"] },
    { name: "SQL Query Builder", description: "Writes SQL queries, joins, aggregations, schema checks, and data exploration patterns.", specializations: ["SQL", "Queries", "Joins", "Aggregations"] },
    { name: "Dashboard Analyst", description: "Reviews dashboards, metric definitions, trends, anomalies, and decision-support views.", specializations: ["Dashboard analysis", "Metrics", "Trends", "Anomalies"] },
    { name: "Business Intelligence Agent", description: "Builds BI plans, semantic metrics, executive summaries, and operational reporting systems.", specializations: ["BI", "Reporting", "Metrics", "Operations"] },
    { name: "Financial Analyst", description: "Analyzes financial data, unit economics, projections, margins, and scenario assumptions.", specializations: ["Finance", "Unit economics", "Projections", "Margins"] },
    { name: "Forecasting Agent", description: "Creates forecasts, assumptions, scenarios, confidence ranges, and planning models.", specializations: ["Forecasting", "Scenarios", "Planning", "Models"] },
    { name: "CSV Cleaner", description: "Cleans CSV data, normalizes columns, identifies errors, and prepares import-ready datasets.", specializations: ["CSV cleanup", "Normalization", "Data quality", "Imports"] },
    { name: "KPI Monitoring Agent", description: "Defines KPI systems, thresholds, alerts, trend checks, and weekly performance reviews.", specializations: ["KPIs", "Monitoring", "Alerts", "Performance"] },
  ],
  Automation: [
    { name: "Browser Operator", description: "Plans safe browser workflows for navigation, reading webpages, form filling, and data gathering.", specializations: ["Browser automation", "Web workflows", "Forms", "Data gathering"] },
    { name: "Workflow Automation Agent", description: "Designs automations across apps, triggers, actions, approvals, and monitoring flows.", specializations: ["Workflow automation", "Triggers", "Actions", "Approvals"] },
    { name: "AI Assistant Builder", description: "Creates custom assistant specs, memory rules, tools, workflows, and deployment plans.", specializations: ["Assistant building", "Tools", "Memory", "Workflows"] },
    { name: "Customer Support Agent", description: "Builds support workflows, macros, knowledge responses, routing, and escalation logic.", specializations: ["Support", "Knowledge base", "Escalation", "Macros"] },
    { name: "Lead Generation Agent", description: "Plans lead sourcing, qualification, enrichment, outreach angles, and CRM handoff.", specializations: ["Lead generation", "Qualification", "Enrichment", "CRM"] },
    { name: "CRM Manager Agent", description: "Organizes CRM fields, stages, follow-ups, automations, and pipeline hygiene systems.", specializations: ["CRM", "Pipelines", "Follow-ups", "Automation"] },
    { name: "Meeting Assistant", description: "Creates meeting agendas, notes, summaries, action items, and follow-up workflows.", specializations: ["Meetings", "Notes", "Action items", "Follow-ups"] },
    { name: "Document Processing Agent", description: "Processes documents, extracts fields, classifies files, validates data, and routes tasks.", specializations: ["Document processing", "Extraction", "Classification", "Routing"] },
    { name: "Multi-Agent Coordinator", description: "Coordinates multiple specialized agents into staged execution plans and final deliverables.", specializations: ["Multi-agent workflows", "Coordination", "Execution", "Deliverables"] },
    { name: "Virtual Employee Agent", description: "Acts as a structured virtual teammate for recurring operations, reporting, and task execution.", specializations: ["Virtual employee", "Operations", "Reporting", "Task execution"] },
  ],
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCategoryConfig(category: AgentCategory) {
  return agentCategoryConfig.find((item) => item.name === category)!;
}

function getCategoryModelId(category: AgentCategory) {
  if (category === "Development") return "qwen/qwen3-coder:free";
  if (category === "Design") return "arcee-ai/trinity-large-thinking";
  if (category === "Content" || category === "Business" || category === "Automation") return "openai/gpt-4o-mini";
  return "google/gemini-2.5-flash";
}

const MODEL_BY_AGENT_WORD = [
  {
    words: ["image", "video", "camera", "thumbnail", "poster", "cinematic", "lighting", "midjourney", "flux"],
    modelId: "google/gemini-2.5-flash-image",
  },
  {
    words: ["code", "coding", "frontend", "full-stack", "fullstack", "next.js", "react", "node", "typescript", "api", "database", "backend"],
    modelId: "qwen/qwen3-coder:free",
  },
  {
    words: ["research", "seo", "keyword", "competitor", "market", "search", "report", "analysis", "cluster"],
    modelId: "google/gemini-2.5-flash",
  },
  {
    words: ["ui", "ux", "design", "audit", "accessibility", "wireframe", "layout", "spacing", "typography", "interface"],
    modelId: "arcee-ai/trinity-large-thinking",
  },
  {
    words: ["sales", "lead", "outreach", "hook", "headline", "ad copy", "ctr", "caption", "reels", "marketing", "growth"],
    modelId: "openai/gpt-4o-mini",
  },
  {
    words: ["brief", "prompt", "writing", "voice", "tone", "draft", "productivity", "planning", "assistant"],
    modelId: "moonshotai/kimi-k2.6:free",
  },
] as const;

export function resolveAssistantModel(assistant: Pick<CollectionAssistant, "slug" | "name" | "description" | "modelId" | "specializations">) {
  const text = [
    assistant.slug,
    assistant.name,
    assistant.description,
    ...assistant.specializations,
  ]
    .join(" ")
    .toLowerCase();

  const matchedRule = MODEL_BY_AGENT_WORD.find((rule) => rule.words.some((word) => text.includes(word)));
  const matchedModel = getOpenRouterModelById(matchedRule?.modelId);
  const configuredModel = getOpenRouterModelById(assistant.modelId);
  const model = matchedModel ?? configuredModel ?? getOpenRouterModelById("moonshotai/kimi-k2.6:free")!;

  return {
    id: model.id,
    name: model.name,
  };
}

const rawAssistants: CollectionAssistant[] = [
  {
    slug: "brief-buddy",
    name: "Brief Buddy",
    description: "Turns rough ideas into clear prompts, task notes, and ready-to-send instructions.",
    date: "23/12/2025",
    model: "Gemini 2.5 Flash",
    modelId: "google/gemini-2.5-flash",
    accent: "from-sky-500 to-cyan-400",
    logoText: "BB",
    icon: Bot,
    welcome: "Send me a rough idea and I will turn it into a clean brief, prompt, or task note.",
    specializations: ["Prompt writing", "Task notes", "Instructions", "Brief creation"],
    restrictions: ["Coding", "SEO", "Sales", "UI Reviews", "Image generation"],
    skillPrompt: SKILL_PROMPTS.briefBuddy,
  },
  {
    slug: "daily-druid",
    name: "LokoAI Assistant",
    description: "General AI assistant for planning, research, writing, and productivity support.",
    date: "30/12/2025",
    model: "Kimi K2.6",
    modelId: "moonshotai/kimi-k2.6:free",
    accent: "from-emerald-500 to-teal-400",
    logoText: "LA",
    icon: WandSparkles,
    welcome: "Tell me anything and I will help with planning, research, writing, or productivity.",
    specializations: ["General assistance", "Planning", "Research", "Writing", "Productivity"],
    restrictions: [],
    skillPrompt: SKILL_PROMPTS.lokoAi,
  },
  {
    slug: "stacksmith-pro",
    name: "Stacksmith Pro",
    description: "Plans production-ready Next.js, React, and Node.js builds from a single product idea.",
    date: "13/02/2026",
    model: "Qwen 3 Coder",
    modelId: "qwen/qwen3-coder:free",
    accent: "from-indigo-500 to-sky-500",
    logoText: "SP",
    icon: Code2,
    welcome: "Describe the product you want to build and I will shape the stack, pages, and core flow.",
    specializations: ["Next.js", "React", "Node.js", "TypeScript", "APIs", "Databases", "Full-stack architecture"],
    restrictions: ["UI/UX Design", "SEO", "Sales", "Image generation", "Video editing"],
    skillPrompt: SKILL_PROMPTS.stacksmithPro,
  },
  {
    slug: "prospect-pilot",
    name: "Prospect Pilot",
    description: "Finds lead angles, outreach hooks, and quick qualification notes for sales work.",
    date: "17/02/2026",
    model: "GPT-4o Mini",
    modelId: "openai/gpt-4o-mini",
    accent: "from-rose-500 to-orange-400",
    logoText: "PP",
    icon: Target,
    welcome: "Share your target customer and I will draft outreach angles and lead qualification notes.",
    specializations: ["Lead generation", "Outreach", "Cold emails", "Sales qualification"],
    restrictions: ["Coding", "UI Design", "SEO", "Image generation", "Product development"],
  },
  {
    slug: "pixel-planner",
    name: "Pixel Planner",
    description: "Shapes website sections, visual direction, and layout ideas for polished web pages.",
    date: "13/01/2026",
    model: "Trinity Large Thinking",
    modelId: "arcee-ai/trinity-large-thinking",
    accent: "from-fuchsia-500 to-violet-500",
    logoText: "PX",
    icon: Palette,
    welcome: "Tell me the page or product style and I will plan sections, layout, and visual direction.",
    specializations: ["UI Design", "UX Design", "Landing Pages", "Wireframes", "Design Systems"],
    restrictions: ["Coding", "SEO", "Sales", "Full-stack development", "Database design"],
    skillPrompt: SKILL_PROMPTS.frontendDesign,
  },
  {
    slug: "lens-prompt-lab",
    name: "Lens Prompt Lab",
    description: "Creates cleaner image and video prompts with camera angles, style notes, and negatives.",
    date: "29/01/2026",
    model: "Gemini 2.5 Flash Image",
    modelId: "google/gemini-2.5-flash-image",
    accent: "from-amber-500 to-yellow-400",
    logoText: "LP",
    icon: Camera,
    welcome: "Give me the image or video idea and I will create a strong prompt with camera and style details.",
    specializations: ["Image prompts", "Video prompts", "Camera prompts", "Midjourney prompts", "Flux prompts"],
    restrictions: ["Coding", "SEO", "Sales", "Full-stack development", "Actual image generation"],
    skillPrompt: SKILL_PROMPTS.gptImage,
  },
  {
    slug: "tosh-companion",
    name: "Tosh Companion",
    description: "A personal assistant for quick drafts, simple research, and daily creative support.",
    date: "16/01/2026",
    model: "Kimi K2.6",
    modelId: "moonshotai/kimi-k2.6:free",
    accent: "from-cyan-500 to-blue-500",
    logoText: "TC",
    icon: Sparkles,
    welcome: "I can help with drafts, quick answers, and creative support. What should we work on?",
    specializations: ["Drafts", "Creative support", "Brainstorming", "Personal productivity"],
    restrictions: ["Coding", "SEO", "Sales", "Legal advice"],
  },
  {
    slug: "interface-inspector",
    name: "Interface Inspector",
    description: "Reviews screenshots and UI flows to spot confusing layouts, copy, and interaction gaps.",
    date: "14/01/2026",
    model: "GPT-4o Mini",
    modelId: "openai/gpt-4o-mini",
    accent: "from-slate-700 to-slate-500",
    logoText: "II",
    icon: BrainCircuit,
    welcome: "Send a UI issue or describe a screen and I will point out improvements clearly.",
    specializations: ["Screenshot review", "UI audits", "UX reviews", "Accessibility audits", "Conversion analysis"],
    restrictions: ["Coding implementation", "Backend design", "SEO", "Sales"],
    skillPrompt: SKILL_PROMPTS.interfaceInspector,
  },
  {
    slug: "commerce-studio",
    name: "Commerce Studio",
    description: "Generates product ad concepts, creative directions, and asset ideas for ecommerce campaigns.",
    date: "14/01/2026",
    model: "Gemini 2.5 Flash",
    modelId: "google/gemini-2.5-flash",
    accent: "from-lime-500 to-emerald-500",
    logoText: "CS",
    icon: ShoppingBag,
    welcome: "Share your product and audience and I will create ecommerce ad concepts and asset ideas.",
    specializations: ["Ecommerce", "Product ads", "Marketing creatives", "Store content"],
    restrictions: ["Coding", "Backend development", "SEO strategy", "Legal/compliance"],
    skillPrompt: SKILL_PROMPTS.commerceStudio,
  },
  {
    slug: "search-signal",
    name: "Search Signal",
    description: "Drafts SEO briefs, keyword clusters, and page outlines with a sharper content angle.",
    date: "19/12/2025",
    model: "Gemini 2.5 Flash",
    modelId: "google/gemini-2.5-flash",
    accent: "from-blue-500 to-indigo-500",
    logoText: "SS",
    icon: SearchCheck,
    welcome: "Tell me the topic or URL goal and I will draft an SEO brief with keywords and outline.",
    specializations: ["SEO", "Keyword research", "Topic clusters", "Meta descriptions", "Content strategy"],
    restrictions: ["Coding", "UI Design", "Paid ads", "Sales outreach"],
    skillPrompt: SKILL_PROMPTS.searchSignal,
  },
  {
    slug: "frontend-design",
    name: "Frontend Design",
    description: "Creates premium React, Next.js, Tailwind, shadcn/ui, and Framer Motion interfaces.",
    date: "03/06/2026",
    model: "Qwen 3 Coder",
    modelId: "qwen/qwen3-coder:free",
    accent: "from-violet-500 to-fuchsia-500",
    logoText: "FD",
    icon: Palette,
    welcome: "Describe the UI, landing page, or dashboard and I will design a premium responsive interface.",
    specializations: ["Frontend UI", "SaaS pages", "Dashboards", "React components", "Responsive design"],
    restrictions: ["Backend-only architecture", "SEO-only strategy", "Sales outreach"],
    skillPrompt: SKILL_PROMPTS.frontendDesign,
  },
  {
    slug: "fullstack-builder",
    name: "Fullstack Builder",
    description: "Plans and builds frontend, backend, APIs, auth, databases, and scalable app architecture.",
    date: "03/06/2026",
    model: "Qwen 3 Coder",
    modelId: "qwen/qwen3-coder:free",
    accent: "from-indigo-500 to-cyan-500",
    logoText: "FB",
    icon: Code2,
    welcome: "Tell me the app idea and I will plan the frontend, backend, APIs, auth, and database flow.",
    specializations: ["Full-stack development", "APIs", "Auth", "Database design", "Realtime systems"],
    restrictions: ["Image prompts", "SEO-only strategy", "Thumbnail concepts"],
    skillPrompt: SKILL_PROMPTS.fullstackBuilder,
  },
  {
    slug: "gpt-image",
    name: "GPT Image",
    description: "Creates cinematic image, poster, thumbnail, lighting, camera, and visual storytelling prompts.",
    date: "03/06/2026",
    model: "Gemini 2.5 Flash Image",
    modelId: "google/gemini-2.5-flash-image",
    accent: "from-amber-500 to-orange-500",
    logoText: "GI",
    icon: Camera,
    welcome: "Describe the scene and I will craft a cinematic image prompt with camera, lighting, mood, and composition.",
    specializations: ["Cinematic prompts", "Poster prompts", "Thumbnail prompts", "Lighting", "Camera direction"],
    restrictions: ["Backend coding", "Database design", "SEO strategy"],
    skillPrompt: SKILL_PROMPTS.gptImage,
  },
  {
    slug: "deep-research",
    name: "Deep Research",
    description: "Produces structured research reports, competitor comparisons, market analysis, and opportunity maps.",
    date: "03/06/2026",
    model: "Gemini 2.5 Flash",
    modelId: "google/gemini-2.5-flash",
    accent: "from-blue-500 to-sky-500",
    logoText: "DR",
    icon: SearchCheck,
    welcome: "Give me a topic, company, niche, or market and I will turn it into a structured research report.",
    specializations: ["Research", "Competitor comparison", "Market analysis", "Structured reports"],
    restrictions: ["Code implementation", "Image generation", "Personal legal/medical advice"],
    skillPrompt: SKILL_PROMPTS.deepResearch,
  },
  {
    slug: "hook-generator",
    name: "Hook Generator",
    description: "Generates viral hooks, emotional headlines, ad copy, reels hooks, and CTR-focused angles.",
    date: "03/06/2026",
    model: "GPT-4o Mini",
    modelId: "openai/gpt-4o-mini",
    accent: "from-rose-500 to-pink-500",
    logoText: "HG",
    icon: Target,
    welcome: "Share the topic and platform and I will generate short, emotional, curiosity-driven hooks.",
    specializations: ["Hooks", "Headlines", "Ad copy", "Reels hooks", "CTR optimization"],
    restrictions: ["Backend coding", "Database design", "Technical architecture"],
    skillPrompt: SKILL_PROMPTS.hookGenerator,
  },
  {
    slug: "social-media-os",
    name: "Social Media OS",
    description: "Builds platform-first content strategies, reel ideas, captions, retention, and growth systems.",
    date: "03/06/2026",
    model: "Gemini 2.5 Flash",
    modelId: "google/gemini-2.5-flash",
    accent: "from-purple-500 to-pink-500",
    logoText: "SO",
    icon: Sparkles,
    welcome: "Tell me your niche and platform and I will build a content strategy with captions and growth loops.",
    specializations: ["Content strategy", "Reel ideas", "Captions", "Retention", "Growth systems"],
    restrictions: ["Code implementation", "Database design", "Backend architecture"],
    skillPrompt: SKILL_PROMPTS.socialMediaOs,
  },
  {
    slug: "thumbnail-strategist",
    name: "Thumbnail Strategist",
    description: "Creates high-CTR YouTube thumbnail concepts, visual hierarchy, emotion, and layout prompts.",
    date: "03/06/2026",
    model: "Gemini 2.5 Flash Image",
    modelId: "google/gemini-2.5-flash-image",
    accent: "from-red-500 to-yellow-500",
    logoText: "TS",
    icon: Camera,
    welcome: "Share the video topic and audience and I will create high-CTR thumbnail concepts.",
    specializations: ["YouTube thumbnails", "CTR", "Visual hierarchy", "Thumbnail prompts"],
    restrictions: ["Backend coding", "Database design", "SEO-only briefs"],
    skillPrompt: SKILL_PROMPTS.thumbnail,
  },
  {
    slug: "design-auditor",
    name: "Design Auditor",
    description: "Audits UI for UX problems, spacing, typography, accessibility, responsiveness, and hierarchy.",
    date: "03/06/2026",
    model: "GPT-4o Mini",
    modelId: "openai/gpt-4o-mini",
    accent: "from-slate-600 to-zinc-500",
    logoText: "DA",
    icon: BrainCircuit,
    welcome: "Describe or share a UI and I will audit hierarchy, spacing, accessibility, and responsiveness.",
    specializations: ["UI audits", "UX problems", "Typography", "Accessibility", "Responsiveness"],
    restrictions: ["Backend architecture", "SEO strategy", "Sales outreach"],
    skillPrompt: SKILL_PROMPTS.designAuditor,
  },
  {
    slug: "voice-builder",
    name: "Voice Builder",
    description: "Develops creator voice, brand personality, tone, style consistency, and audience connection.",
    date: "03/06/2026",
    model: "Kimi K2.6",
    modelId: "moonshotai/kimi-k2.6:free",
    accent: "from-teal-500 to-emerald-500",
    logoText: "VB",
    icon: Bot,
    welcome: "Share your content, audience, or current tone and I will build a clear creator voice profile.",
    specializations: ["Creator voice", "Brand tone", "Writing style", "Communication consistency"],
    restrictions: ["Backend coding", "Database design", "Technical architecture"],
    skillPrompt: SKILL_PROMPTS.voiceBuilder,
  },
  {
    slug: "loko-ai",
    name: "Loko AI",
    description: "Autonomous productivity, workflow planning, execution tracking, and AI workspace coordination.",
    date: "03/06/2026",
    model: "Kimi K2.6",
    modelId: "moonshotai/kimi-k2.6:free",
    accent: "from-emerald-500 to-teal-400",
    logoText: "LA",
    icon: WandSparkles,
    welcome: "Tell me your goals, schedule, or workflow and I will organize execution into a clear system.",
    specializations: ["Productivity", "Task management", "Workflow planning", "Execution tracking", "AI coordination"],
    restrictions: [],
    skillPrompt: SKILL_PROMPTS.lokoAi,
  },
];

const rawAssistantSlugs = new Set(rawAssistants.map((assistant) => assistant.slug));

const generatedMarketplaceAssistants: CollectionAssistant[] = Object.entries(marketplaceAgentBlueprints)
  .flatMap(([categoryName, blueprints]) => {
    const category = categoryName as AgentCategory;
    const config = getCategoryConfig(category);

    return blueprints.map((blueprint) => {
      const slug = slugify(blueprint.name);
      return {
        slug,
        name: blueprint.name,
        description: blueprint.description,
        category,
        date: "08/06/2026",
        model: "Auto-routed",
        modelId: getCategoryModelId(category),
        accent: config.accent,
        logoText: blueprint.name
          .split(/\s+/)
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        icon: config.icon,
        welcome: `I am your ${blueprint.name}. Tell me the outcome you want and I will create a structured execution plan.`,
        specializations: blueprint.specializations,
        restrictions: ["Medical diagnosis", "Legal representation", "Unsafe or deceptive activity"],
      } satisfies CollectionAssistant;
    });
  })
  .filter((assistant) => !rawAssistantSlugs.has(assistant.slug));

export const assistants: CollectionAssistant[] = [...rawAssistants, ...generatedMarketplaceAssistants].map((assistant) => {
  const model = resolveAssistantModel(assistant);
  return {
    ...assistant,
    model: model.name,
    modelId: model.id,
  };
});

export function getAssistantCategory(assistant: CollectionAssistant): AgentCategory {
  if (assistant.category) return assistant.category;

  const text = `${assistant.name} ${assistant.description} ${assistant.specializations.join(" ")}`.toLowerCase();
  if (/\b(code|next|react|api|database|full-stack|frontend|backend|builder)\b/.test(text)) return "Development";
  if (/\b(design|ui|ux|brand|logo|thumbnail|wireframe|interface)\b/.test(text)) return "Design";
  if (/\b(seo|content|copy|social|hook|voice|writing|caption)\b/.test(text)) return "Content";
  if (/\b(sales|lead|growth|business|market|pricing|startup)\b/.test(text)) return "Business";
  if (/\b(research|report|competitor|fact|analysis)\b/.test(text)) return "Research";
  if (/\b(data|excel|csv|sql|financial|kpi|analytics)\b/.test(text)) return "Analytics";
  return "Automation";
}

export const marketplaceCategories = agentCategoryConfig.map((category) => ({
  ...category,
  count: assistants.filter((assistant) => getAssistantCategory(assistant) === category.name).length,
}));

export function getAssistant(slug: string) {
  return assistants.find((assistant) => assistant.slug === slug);
}
