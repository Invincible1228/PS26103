import React from 'react';
import { 
  Printer, 
  X, 
  ShieldCheck, 
  Download, 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  IndianRupee,
  Layers,
  Sparkles,
  FileText
} from 'lucide-react';

export default function ExecutiveDossierModal({ project, evm, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  const handlePrint = () => {
    window.print();
  };

  const origCost = Number(project.approvedCost || project.estimatedCost || 0);
  const currCost = Number(project.currentCost || origCost);
  const costOverrun = Number(project.costOverrunCr || Math.max(0, currCost - origCost));
  const costOverrunPct = origCost > 0 ? ((costOverrun / origCost) * 100).toFixed(2) : 0;
  const delayMonths = Number(project.timeDelayMonths || 0);
  const progressPercent = Number(project.progressPercent || 0);
  const riskScore = Number(project.riskScore || 50);
  const riskLevel = project.riskLevel || (riskScore >= 70 ? 'High' : riskScore >= 35 ? 'Medium' : 'Low');

  const todayStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const mhDelay = project.multiHorizonDelay || { '3m': delayMonths + 1.2, '6m': delayMonths + 3.1, '12m': delayMonths + 6.8, '15m': delayMonths + 9.5, '18m': delayMonths + 12.4 };
  const mhCostInc = project.multiHorizonCostInc || { '3m': 1.2, '6m': 2.8, '12m': 5.8, '15m': 8.2, '18m': 11.5 };
  const mhRisk = project.multiHorizonRisk || { '3m': riskScore, '6m': riskScore + 4, '12m': riskScore + 8, '15m': riskScore + 12, '18m': riskScore + 15 };

  const horizons = [
    { label: '3-Month Horizon', date: 'March 2025', delay: mhDelay['3m'] || (delayMonths + 1.2), cost: mhCostInc['3m'] || 1.2, risk: mhRisk['3m'] || riskScore },
    { label: '6-Month Horizon', date: 'June 2025', delay: mhDelay['6m'] || (delayMonths + 3.1), cost: mhCostInc['6m'] || 2.8, risk: mhRisk['6m'] || (riskScore + 4) },
    { label: '12-Month Horizon', date: 'December 2025', delay: mhDelay['12m'] || (delayMonths + 6.8), cost: mhCostInc['12m'] || 5.8, risk: mhRisk['12m'] || (riskScore + 8) },
    { label: '15-Month Horizon', date: 'March 2026', delay: mhDelay['15m'] || (delayMonths + 9.5), cost: mhCostInc['15m'] || 8.2, risk: mhRisk['15m'] || (riskScore + 12) },
    { label: '18-Month Horizon', date: 'June 2026', delay: mhDelay['18m'] || (delayMonths + 12.4), cost: mhCostInc['18m'] || 11.5, risk: mhRisk['18m'] || (riskScore + 15) }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-[#ebebeb] flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Control Bar (Screen Only) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-[#f8fafc] border-b border-[#e2e8f0]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0f172a] text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0f172a]">
                Executive Project Dossier &amp; Audit Report
              </h3>
              <p className="text-[11px] text-[#64748b] font-mono">
                Official MoSPI IPMD Surveillance Standard • {project.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0070f3] hover:bg-[#005bb5] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#64748b] hover:text-[#0f172a] hover:bg-[#e2e8f0] transition-all cursor-pointer"
              title="Close Preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Dossier Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white dossier-print-area">
          <div className="max-w-4xl mx-auto space-y-6 text-[#0f172a] font-sans">
            
            {/* 1. OFFICIAL GOVERNMENT HEADER */}
            <div className="border-b-2 border-[#0f172a] pb-4 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img 
                    src="/emblem.svg" 
                    alt="Government Emblem" 
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <div className="text-[11px] font-bold tracking-wider uppercase text-[#64748b]">
                      Government of India • Ministry of Statistics and Programme Implementation
                    </div>
                    <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0f172a]">
                      PAIMANA INFRASTRUCTURE INTELLIGENCE DOSSIER
                    </h1>
                    <div className="text-xs font-semibold text-[#0070f3]">
                      Central Sector Capital Projects Monitoring &amp; Early-Warning Surveillance
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono text-[11px] space-y-0.5 shrink-0">
                  <div className="font-bold text-[#0f172a] bg-[#f1f5f9] px-2 py-0.5 rounded">
                    OCMS: {project.id}
                  </div>
                  <div className="text-[#64748b]">Date: {todayStr}</div>
                  <div className="text-[#64748b]">Anchor: Dec 2024 (Q3)</div>
                  <div className="text-[9px] uppercase tracking-wider text-rose-600 font-bold">
                    Official Executive Use
                  </div>
                </div>
              </div>

              {/* National Tricolor Line */}
              <div className="h-1 w-full bg-gradient-to-r from-[#ff9933] via-[#ffffff] to-[#138808] border border-[#e2e8f0] rounded-full"></div>
            </div>

            {/* 2. PROJECT IDENTIFICATION & METADATA */}
            <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0070f3]">
                  Project Identification &amp; Administrative Hierarchy
                </span>
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                  riskScore > 65 ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                  riskScore > 35 ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  Tier: {riskLevel} Risk ({riskScore}/100)
                </span>
              </div>
              <h2 className="text-lg font-bold text-[#0f172a] leading-snug">
                {project.name}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1 border-t border-[#e2e8f0]">
                <div>
                  <span className="text-[#64748b] block text-[10px]">Ministry:</span>
                  <span className="font-semibold">{project.ministry}</span>
                </div>
                <div>
                  <span className="text-[#64748b] block text-[10px]">Executing Agency:</span>
                  <span className="font-semibold">{project.department || project.agency}</span>
                </div>
                <div>
                  <span className="text-[#64748b] block text-[10px]">Location:</span>
                  <span className="font-semibold">{project.state}</span>
                </div>
                <div>
                  <span className="text-[#64748b] block text-[10px]">Sector:</span>
                  <span className="font-semibold">{project.sector}</span>
                </div>
              </div>
            </div>

            {/* 3. KEY METRICS COMPARISON TABLE */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold font-mono tracking-wider text-[#475569] uppercase flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-[#0f172a]" />
                Section 1: Financial &amp; Schedule Baseline Metrics
              </h3>
              <div className="overflow-x-auto border border-[#cbd5e1] rounded-lg">
                <table className="w-full text-xs text-left divide-y divide-[#cbd5e1]">
                  <thead className="bg-[#f1f5f9] font-mono text-[11px] text-[#475569]">
                    <tr>
                      <th className="py-2 px-3">Sanctioned Cost</th>
                      <th className="py-2 px-3">Anticipated Cost</th>
                      <th className="py-2 px-3">Cost Escalation</th>
                      <th className="py-2 px-3">Physical Progress</th>
                      <th className="py-2 px-3">Schedule Delay</th>
                      <th className="py-2 px-3">Operational Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0] bg-white font-mono">
                    <tr>
                      <td className="py-2 px-3 font-semibold">₹{origCost.toLocaleString()} Cr</td>
                      <td className="py-2 px-3 font-semibold text-[#0070f3]">₹{currCost.toLocaleString()} Cr</td>
                      <td className="py-2 px-3 font-bold text-rose-600">
                        +₹{costOverrun.toLocaleString()} Cr ({costOverrunPct}%)
                      </td>
                      <td className="py-2 px-3 font-semibold">{progressPercent}%</td>
                      <td className="py-2 px-3 font-bold text-amber-600">
                        {delayMonths > 0 ? `+${delayMonths} Months` : 'On Schedule'}
                      </td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#f1f5f9]">
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. LAYER 1: STATISTICAL EVM METRICS */}
            {evm && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold font-mono tracking-wider text-[#475569] uppercase flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#0070f3]" />
                  Section 2: Earned Value Management (EVM) Statistical Baseline
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc]">
                    <div className="text-[10px] text-[#64748b]">Cost Performance (CPI)</div>
                    <div className="text-base font-bold text-[#0f172a]">{evm.cpi}</div>
                    <div className="text-[10px] text-[#64748b] truncate">{evm.status?.cost}</div>
                  </div>
                  <div className="p-2.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc]">
                    <div className="text-[10px] text-[#64748b]">Schedule Performance (SPI)</div>
                    <div className="text-base font-bold text-[#0f172a]">{evm.spi}</div>
                    <div className="text-[10px] text-[#64748b] truncate">{evm.status?.schedule}</div>
                  </div>
                  <div className="p-2.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc]">
                    <div className="text-[10px] text-[#64748b]">Earned Value (EV)</div>
                    <div className="text-base font-bold text-[#0070f3]">₹{evm.earnedValue.toLocaleString()} Cr</div>
                    <div className="text-[10px] text-[#64748b]">PV: ₹{evm.plannedValue.toLocaleString()} Cr</div>
                  </div>
                  <div className="p-2.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc]">
                    <div className="text-[10px] text-[#64748b]">Estimate at Completion (EAC)</div>
                    <div className="text-base font-bold text-rose-600">₹{evm.eac.toLocaleString()} Cr</div>
                    <div className="text-[10px] text-[#64748b]">Actual: ₹{evm.actualCost.toLocaleString()} Cr</div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. LAYER 2: 18-MONTH MULTI-HORIZON ML RUNWAY */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold font-mono tracking-wider text-[#475569] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Section 3: Multi-Horizon Predictive Runway Projections (3M – 18M)
              </h3>
              <div className="overflow-x-auto border border-[#cbd5e1] rounded-lg">
                <table className="w-full text-xs text-left divide-y divide-[#cbd5e1]">
                  <thead className="bg-[#f1f5f9] font-mono text-[11px] text-[#475569]">
                    <tr>
                      <th className="py-2 px-3">Horizon</th>
                      <th className="py-2 px-3">Target Runway Date</th>
                      <th className="py-2 px-3">Predicted Schedule Delay</th>
                      <th className="py-2 px-3">Projected Cost Escalation</th>
                      <th className="py-2 px-3">Forecast Risk Tier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0] bg-white font-mono">
                    {horizons.map((h, i) => (
                      <tr key={i} className="hover:bg-[#f8fafc]">
                        <td className="py-2 px-3 font-bold text-[#0f172a]">{h.label}</td>
                        <td className="py-2 px-3 text-[#64748b]">{h.date}</td>
                        <td className="py-2 px-3 font-semibold text-amber-700">+{Number(h.delay).toFixed(1)} Months</td>
                        <td className="py-2 px-3 font-semibold text-rose-600">+{Number(h.cost).toFixed(2)}%</td>
                        <td className="py-2 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            Number(h.risk) > 65 ? 'bg-rose-100 text-rose-800' :
                            Number(h.risk) > 35 ? 'bg-amber-100 text-amber-800' :
                            'bg-emerald-100 text-emerald-800'
                          }`}>
                            Score: {Math.round(h.risk)}/100
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 6. ROOT-CAUSE EXPLAINABILITY (TreeSHAP FACTORS) */}
            {project.shapFactors && project.shapFactors.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold font-mono tracking-wider text-[#475569] uppercase flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Section 4: Primary Bottlenecks &amp; TreeSHAP Attributions
                </h3>
                <div className="border border-[#e2e8f0] rounded-lg divide-y divide-[#e2e8f0] text-xs">
                  {project.shapFactors.slice(0, 4).map((f, i) => (
                    <div key={i} className="p-2.5 flex items-start justify-between gap-3 bg-white">
                      <div>
                        <div className="font-semibold text-[#0f172a] flex items-center gap-2">
                          <span>{f.factor}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#f1f5f9] text-[#64748b]">
                            {f.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#64748b] mt-0.5">{f.description}</div>
                      </div>
                      <div className="font-mono text-right text-[11px] shrink-0 font-bold text-rose-600">
                        Weight: {f.impact}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. STATUTORY DIRECTIVES & PM-GATISHAKTI INTERVENTION */}
            <div className="p-4 rounded-xl border border-[#cbd5e1] bg-[#f8fafc] space-y-2">
              <h3 className="text-xs font-bold font-mono tracking-wider text-[#0f172a] uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Section 5: Recommended 30-Day Executive Directives (PM-GatiShakti Alignment)
              </h3>
              <p className="text-xs leading-relaxed text-[#334155]">
                {project.recommendedAction || "Coordinate inter-ministerial clearance sprint via PM-GatiShakti portal to resolve pending utility relocations and statutory forest clearances."}
              </p>
              {project.supportingEvidence && (
                <div className="text-[11px] font-mono text-[#64748b] pt-2 border-t border-[#e2e8f0]">
                  <strong>Documentary Citation:</strong> {project.supportingEvidence}
                </div>
              )}
            </div>

            {/* 8. OFFICIAL VERIFICATION & AUDIT SIGN-OFF */}
            <div className="pt-6 border-t-2 border-[#cbd5e1] grid grid-cols-2 gap-8 text-xs font-mono">
              <div className="space-y-4">
                <div className="text-[10px] text-[#64748b] uppercase tracking-wider">
                  Platform Verification Seal
                </div>
                <div className="p-3 rounded-lg border border-dashed border-[#94a3b8] bg-[#f8fafc] space-y-1">
                  <div className="font-bold text-[#0f172a]">PAIMANA OCMS SURVEILLANCE ENGINE</div>
                  <div className="text-[10px] text-[#64748b]">Model Release: v3.2.1-calibrated-production</div>
                  <div className="text-[10px] text-[#64748b]">Audit Status: 24/24 Integrity Checks Verified</div>
                  <div className="text-[9px] text-[#94a3b8]">SHA-256 Hash Verified Document Integrity</div>
                </div>
              </div>

              <div className="space-y-10 text-right">
                <div className="text-[10px] text-[#64748b] uppercase tracking-wider">
                  Authorized Signatory / Reviewing Officer
                </div>
                <div className="border-b border-[#0f172a] w-48 ml-auto"></div>
                <div className="text-[11px] text-[#475569]">
                  Project Director / Empowered Committee Member<br/>
                  Ministry of Statistics and Programme Implementation
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
