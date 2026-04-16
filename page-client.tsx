"use client";

import { AlertTriangle, CheckCircle2, ClipboardCheck, Siren } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { BacklogTrendChart } from "@/components/charts/backlog-trend-chart";
import { NcmrTable } from "@/components/ncmr-table";
import { CapaList } from "@/components/capa-list";
import { useNcmrs } from "@/hooks/use-ncmrs";
import { useCapas } from "@/hooks/use-capas";

const trend = [{ name: "Jan", aging: 9 }, { name: "Feb", aging: 7 }, { name: "Mar", aging: 6 }, { name: "Apr", aging: 4 }];

export default function DashboardClient() {
  const { data: ncmrs, loading: ncmrLoading, closeNcmr } = useNcmrs();
  const { data: capas, loading: capaLoading } = useCapas();
  const openNcmrs = ncmrs.filter((row) => row.disposition !== "Closed");
  const openCapas = capas.filter((row) => row.status !== "Closed");
  const escalations = openNcmrs.filter((row) => row.disposition === "Escalated").length;
  const closureUnder45 = ncmrs.length ? Math.round((ncmrs.filter((row) => row.age_days <= 45).length / ncmrs.length) * 100) : 0;

  return (
    <AppShell title="Dashboard" subtitle="Monitor backlog, escalation, and audit readiness.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Open NCMRs" value={String(openNcmrs.length)} sub="Active nonconformances" Icon={AlertTriangle} />
        <StatCard title="Open CAPAs" value={String(openCapas.length)} sub="Systemic actions in progress" Icon={ClipboardCheck} />
        <StatCard title="Closure < 45 Days" value={`${closureUnder45}%`} sub="Target: 95%" Icon={CheckCircle2} />
        <StatCard title="Escalations" value={String(escalations)} sub="Requires leadership attention" Icon={Siren} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="card xl:col-span-2 p-5">
          <div className="mb-4">
            <div className="text-xl font-semibold">Active NCMRs</div>
            <div className="text-sm text-slate-500">Prioritize aging items and disposition decisions.</div>
          </div>
          {ncmrLoading ? <div>Loading...</div> : <NcmrTable rows={openNcmrs.slice(0, 5)} onClose={closeNcmr} />}
        </div>
        <div className="card p-5">
          <div className="mb-4">
            <div className="text-xl font-semibold">Backlog Trend</div>
            <div className="text-sm text-slate-500">Aging NCMRs over time.</div>
          </div>
          <BacklogTrendChart data={trend} />
        </div>
      </div>
      <div className="mt-6 card p-5">
        <div className="mb-4">
          <div className="text-xl font-semibold">CAPA Tracker</div>
          <div className="text-sm text-slate-500">Root cause, stage, and due date visibility.</div>
        </div>
        {capaLoading ? <div>Loading...</div> : <CapaList rows={openCapas.slice(0, 4)} />}
      </div>
    </AppShell>
  );
}
