"use client";

import { useNcmrs } from "@/hooks/use-ncmrs";

export default function NcmrsPage() {
  const { data, loading, error, closeNcmr } = useNcmrs();

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">NCMRs</h1>
      <div className="mt-4 space-y-3">
        {data.map((row) => (
          <div key={row.id} className="rounded-2xl border p-4">
            <div className="font-medium">{row.record_no}</div>
            <div className="text-sm text-slate-500">{row.product} • {row.defect}</div>
            <div className="mt-2 text-sm">Disposition: {row.disposition}</div>
            {row.disposition !== "Closed" ? (
              <button className="mt-3 rounded bg-black px-3 py-2 text-white" onClick={() => closeNcmr(row.id)}>
                Close NCMR
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </main>
  );
}
