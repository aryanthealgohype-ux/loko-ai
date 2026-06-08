import Link from "next/link";
import { CalendarDays, Layers3, MessageCircle, Search, Sparkles, TrendingUp } from "lucide-react";
import { CollectionAgentLogo } from "@/components/CollectionAgentLogo";
import {
  assistants,
  getAssistantCategory,
  marketplaceCategories,
  type CollectionAssistant,
} from "./collection-data";

function AgentCard({ assistant, compact = false }: { assistant: CollectionAssistant; compact?: boolean }) {
  return (
    <Link
      href={`/collection/${assistant.slug}`}
      className="group relative flex min-h-[238px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1.5 hover:border-sky-200 hover:bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/65 via-white to-slate-50/85 opacity-70 transition duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.16)_45%,transparent_58%)] opacity-0 transition duration-700 group-hover:translate-x-8 group-hover:opacity-100" />
      <div className="absolute inset-x-0 top-0 h-px bg-sky-200/80" />

      <div>
        <div className="relative mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="transition duration-300 group-hover:scale-105">
              <CollectionAgentLogo assistant={assistant} />
            </div>
            <div>
              <span className="mb-1.5 inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
                {getAssistantCategory(assistant)}
              </span>
              <h2 className="line-clamp-1 text-base font-black leading-snug text-slate-900 transition duration-300 group-hover:text-sky-700">
                {assistant.name}
              </h2>
            </div>
          </div>
        </div>
        <p className={`relative text-sm leading-6 text-slate-600 ${compact ? "line-clamp-2" : "line-clamp-3"}`}>
          {assistant.description}
        </p>
      </div>

      <div className="relative mt-5">
        <div className="mb-3 flex items-center justify-between gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <CalendarDays className="h-3.5 w-3.5 text-sky-500" />
            {assistant.date}
          </span>
          <span className="max-w-[132px] truncate rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 font-bold text-slate-600">
            {assistant.model}
          </span>
        </div>
        <span className="relative flex h-10 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-sky-500 text-sm font-black text-white shadow-[0_10px_26px_rgba(14,165,233,0.20)] transition duration-300 hover:bg-sky-600 group-hover:shadow-[0_14px_34px_rgba(14,165,233,0.24)]">
          <span className="absolute inset-0 translate-x-[-110%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-[110%]" />
          <MessageCircle className="h-4 w-4" />
          <span className="relative">Start Agent</span>
        </span>
      </div>
    </Link>
  );
}

export default function CollectionPage() {
  const featuredAgents = assistants.slice(0, 8);
  const trendingAgents = assistants.slice(-8).reverse();
  const agentsByCategory = marketplaceCategories.map((category) => ({
    ...category,
    agents: assistants.filter((assistant) => getAssistantCategory(assistant) === category.name),
  }));

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fbff] text-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(14,165,233,0.16),transparent_28%),radial-gradient(circle_at_84%_12%,rgba(124,58,237,0.10),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(236,72,153,0.08),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fbff_48%,#eef6ff_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-25" />
      <div className="pointer-events-none absolute inset-0 loko-particle-field" />

      <section className="relative mx-auto max-w-[1500px] px-3 py-5 sm:px-5 lg:px-7">
        <div className="mb-8 overflow-hidden rounded-[32px] border border-white/80 bg-white/82 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-xl">
                <Layers3 className="h-3.5 w-3.5 text-sky-500" />
                {assistants.length} premium agent systems
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
                Agent Marketplace for the Loko AI Operating System
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Launch specialized agents for coding, design, research, analytics, automation, business execution, and content growth from one premium workspace.
              </p>
            </div>

            <div className="w-full max-w-xl rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
              <div className="flex min-h-16 items-center gap-3 rounded-2xl bg-slate-50 px-4">
                <Search className="h-5 w-5 text-sky-500" />
                <span className="text-sm font-semibold text-slate-500">
                  Search agents, skills, workflows, or outcomes...
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {marketplaceCategories.map((category) => (
              <Link
                key={category.name}
                href={`#${category.name.toLowerCase()}`}
                className="group rounded-3xl border border-slate-200/80 bg-white/86 p-4 shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:bg-white"
              >
                <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${category.accent} text-white shadow-lg shadow-slate-300/60`}>
                  <category.icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-black text-slate-950">{category.name}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">{category.count} agents</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-8 grid gap-5 lg:grid-cols-2">
          <section className="rounded-[30px] border border-slate-200/80 bg-white/80 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-sky-500" />
              <h2 className="text-lg font-black text-slate-950">Featured Agents</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {featuredAgents.slice(0, 4).map((assistant) => (
                <AgentCard key={assistant.slug} assistant={assistant} compact />
              ))}
            </div>
          </section>

          <section className="rounded-[30px] border border-slate-200/80 bg-white/80 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <h2 className="text-lg font-black text-slate-950">Trending Agents</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {trendingAgents.slice(0, 4).map((assistant) => (
                <AgentCard key={assistant.slug} assistant={assistant} compact />
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {agentsByCategory.map((category) => (
            <section key={category.name} id={category.name.toLowerCase()} className="scroll-mt-6">
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                    <span className={`h-2 w-2 rounded-full bg-gradient-to-br ${category.accent}`} />
                    {category.name}
                  </div>
                  <h2 className="text-2xl font-black text-slate-950">{category.name} Agents</h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">{category.tagline}</p>
                </div>
                <span className="text-sm font-bold text-slate-500">{category.agents.length} systems</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {category.agents.map((assistant) => (
                  <AgentCard key={assistant.slug} assistant={assistant} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
