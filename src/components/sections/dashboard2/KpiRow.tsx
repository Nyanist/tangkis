import { Fuel, CheckCircle2, AlertTriangle, OctagonAlert } from "lucide-react";
import { TANGKI } from "@/lib/data/dashboard";
import { computeStatusCounts } from "@/lib/utils";

export default function KpiRow() {
  const total = TANGKI.length;
  const { hijau, kuning, merah } = computeStatusCounts(TANGKI);

  const kartu = [
    { label: "Total Tangki Di Pantau", value: total, icon: Fuel, iconCls: "bg-brand-100 text-brand-700", cardCls: "border-brand-100" },
    { label: "Status Hijau", value: hijau, icon: CheckCircle2, iconCls: "bg-[#2E8B57]/15 text-[#1F6B42]", cardCls: "border-[#2E8B57]/30 bg-[#2E8B57]/[.04]" },
    { label: "Status Kuning", value: kuning, icon: AlertTriangle, iconCls: "bg-[#E9A21B]/15 text-[#8A5A00]", cardCls: "border-[#E9A21B]/30 bg-[#E9A21B]/[.04]" },
    { label: "Status Merah", value: merah, icon: OctagonAlert, iconCls: "bg-[#D64545]/15 text-[#B83232]", cardCls: "border-[#D64545]/30 bg-[#D64545]/[.04]" },
  ];

  return (
    <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {kartu.map((k) => (
        <div key={k.label} className={`flex items-center gap-3 rounded-lg border bg-white p-4 ${k.cardCls}`}>
          <span className={`grid h-11 w-11 flex-none place-items-center rounded-lg ${k.iconCls}`}>
            <k.icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold text-[#5A6B7B]">{k.label}</p>
            <p className="text-2xl font-bold tabular-nums text-[#172B3A]">{k.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
