import { useState } from 'react'
import { useCarbon } from '../context/useCarbon'
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  MapPin,
  FileText,
  UserCheck,
  Search,
  Ban,
} from 'lucide-react'

export default function GovtAuditorDashboard() {
  const {
    projects,
    setSelectedProjectForAudit,
    setActiveTab,
  } = useCarbon()

  const [activeSubTab, setActiveSubTab] = useState('pending')
  const [searchFilter, setSearchFilter] = useState('')

  const pendingProjects = projects.filter((p) => p.status === 'PENDING_INSPECTION')
  const verifiedProjects = projects.filter((p) => p.status === 'VERIFIED')
  const rejectedProjects = projects.filter((p) => p.status === 'REJECTED')
  const auditedHistory = projects.filter((p) => p.status !== 'PENDING_INSPECTION')

  const displayedProjects =
    activeSubTab === 'pending'
      ? pendingProjects.filter(
          (p) =>
            p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
            p.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
            p.developer.toLowerCase().includes(searchFilter.toLowerCase())
        )
      : auditedHistory.filter(
          (p) =>
            p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
            p.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
            p.developer.toLowerCase().includes(searchFilter.toLowerCase())
        )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header with Official Accreditation Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Bureau of Energy Efficiency (BEE) • Statutory Inspector Console</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Government Field Auditor Dashboard
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Conduct mandatory physical site verification, validate drone telemetry and cadastral GPS
            boundaries, and issue or reject carbon credits under the Indian Carbon Trading Scheme.
          </p>
        </div>

        {/* Inspector Identity Card */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-amber-500/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <div className="font-bold text-slate-100">Er. Rajesh Sharma</div>
            <div className="text-[11px] text-amber-400 font-mono">
              BEE Inspecting Officer #GOV-BEE-402
            </div>
            <div className="text-[10px] text-slate-400">Ministry of Power & MoEFCC Nominee</div>
          </div>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/40">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-mono uppercase tracking-wider">Awaiting Field Audit</span>
            <Clock className="w-4 h-4 animate-pulse" />
          </div>
          <div className="text-3xl font-black font-mono text-amber-300 mt-2">
            {pendingProjects.length}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Requires on-site physical visit
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-mono uppercase tracking-wider">Verified & Issued</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black font-mono text-emerald-300 mt-2">
            {verifiedProjects.length}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Live on National Marketplace</span>
        </div>

        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/40">
          <div className="flex items-center justify-between text-rose-400">
            <span className="text-xs font-mono uppercase tracking-wider">Audits Rejected</span>
            <Ban className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black font-mono text-rose-300 mt-2">
            {rejectedProjects.length}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Discrepancy reports logged</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Additionality Test</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black font-mono text-slate-100 mt-2">100%</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Zero double-counting policy</span>
        </div>
      </div>

      {/* Navigation Subtabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => setActiveSubTab('pending')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeSubTab === 'pending'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Site Audits ({pendingProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('history')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeSubTab === 'history'
                ? 'bg-slate-800 text-slate-100 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Audited Registry History ({auditedHistory.length})</span>
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search projects, coordinates..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Projects List */}
      {displayedProjects.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-200">
            {activeSubTab === 'pending'
              ? 'All Field Audits Completed!'
              : 'No Audited Projects Found'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {activeSubTab === 'pending'
              ? 'No projects are currently awaiting on-site inspection. Developers can submit new DPRs via the Developer Portal.'
              : 'No history records match your search filter.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedProjects.map((project) => {
            const isPending = project.status === 'PENDING_INSPECTION'
            const isVerified = project.status === 'VERIFIED'
            const isRejected = project.status === 'REJECTED'

            return (
              <div
                key={project.id}
                className={`p-6 rounded-3xl border transition-all ${
                  isPending
                    ? 'bg-slate-900 border-amber-500/40 shadow-xl shadow-amber-950/20'
                    : isVerified
                    ? 'bg-slate-900/80 border-slate-800'
                    : 'bg-rose-950/20 border-rose-500/30'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left Info */}
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400">ID: {project.id}</span>
                      {isPending && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold animate-pulse">
                          Pending On-Site Inspection
                        </span>
                      )}
                      {isVerified && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                          Verified & Issued ({project.inspectionDate})
                        </span>
                      )}
                      {isRejected && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold">
                          Rejected
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-100">{project.title}</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400 pt-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>
                      <div className="font-mono text-slate-300">
                        GPS: <span className="text-amber-300">{project.coordinates}</span>
                      </div>
                      <div>
                        Proponent: <strong className="text-slate-200">{project.developer}</strong>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
                      <div>
                        Claimed Mitigation:{' '}
                        <strong className="text-slate-200 font-mono">
                          {project.claimedTons.toLocaleString()} tCO2e
                        </strong>
                      </div>
                      <div>
                        Facility Capacity:{' '}
                        <strong className="text-slate-200 font-mono">{project.capacity}</strong>
                      </div>
                      <div>
                        Price Expectation:{' '}
                        <strong className="text-emerald-400 font-mono">
                          ₹{project.pricePerTon.toLocaleString('en-IN')}/t
                        </strong>
                      </div>
                      <div className="flex items-center gap-1 text-slate-300">
                        <FileText className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="underline decoration-slate-700">
                          {project.supportingDocName}
                        </span>
                      </div>
                    </div>

                    {/* Remarks if audited */}
                    {project.inspectorRemarks && (
                      <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                        <span className="text-[11px] text-amber-400 font-mono block mb-1">
                          Official Inspection Remarks ({project.auditorId}):
                        </span>
                        <p className="text-slate-300 italic text-[11px]">
                          &quot;{project.inspectorRemarks}&quot;
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Action Button */}
                  <div className="lg:text-right shrink-0">
                    {isPending ? (
                      <button
                        onClick={() => setSelectedProjectForAudit(project)}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2 text-xs"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Conduct Site Audit</span>
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <button
                          onClick={() => setSelectedProjectForAudit(project)}
                          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <span>Re-inspect / Update Audit</span>
                        </button>
                        {isVerified && (
                          <button
                            onClick={() => setActiveTab('marketplace')}
                            className="text-[11px] text-emerald-400 hover:underline block mx-auto lg:ml-auto"
                          >
                            View in Live Marketplace →
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
