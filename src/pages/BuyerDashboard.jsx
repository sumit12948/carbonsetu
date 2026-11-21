import { useState } from 'react'
import { useCarbon } from '../context/useCarbon'
import {
  FileCheck2,
  TreePine,
  Award,
  Search,
  Printer,
  ExternalLink,
  ShieldCheck,
  Building2,
  ArrowRight,
  CreditCard,
  ReceiptText,
} from 'lucide-react'

export default function BuyerDashboard() {
  const {
    retirements,
    setSelectedCertificateForView,
    navigateToLedgerWithSerial,
    setActiveTab,
  } = useCarbon()

  const [searchQuery, setSearchQuery] = useState('')

  // Compute KPI Totals
  const totalTonsOffset = retirements.reduce((acc, curr) => acc + curr.tonsRetired, 0)
  const totalAmountPaid = retirements.reduce(
    (acc, curr) => acc + (curr.totalPaid || curr.totalAmount || 0),
    0
  )
  const equivalentTrees = Math.round(totalTonsOffset * 45)

  const filteredRetirements = retirements.filter((r) => {
    return (
      r.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.paymentId && r.paymentId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.gstin && r.gstin.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.auditorId.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate ESG & Voluntary Retirement Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Buyer Dashboard & Official Certificates
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Access your serialized Carbon Retirement Certificates and Indian Gateway Payment Receipts
            verified by the Bureau of Energy Efficiency (BEE).
          </p>
        </div>

        <button
          onClick={() => setActiveTab('marketplace')}
          className="px-5 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-950/50 flex items-center gap-2 text-xs"
        >
          <span>Retire More Carbon Credits</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Tons Offset */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Total Tons Offset
            </span>
            <FileCheck2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400">
            {totalTonsOffset.toLocaleString()} <span className="text-base font-normal">tCO2e</span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Permanently canceled from national supply
          </span>
        </div>

        {/* KPI 2: Total Amount Paid (₹) */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Total Amount Paid (₹)
            </span>
            <ReceiptText className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black font-mono text-slate-100">
            ₹{totalAmountPaid.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-400 block">
            Inclusive of 2% CCTS registry fee &amp; GST
          </span>
        </div>

        {/* KPI 3: Equivalent Trees */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Equiv. Trees Planted
            </span>
            <TreePine className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black font-mono text-teal-300">
            ~{equivalentTrees.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 block">
            10-year biological carbon absorption equivalent
          </span>
        </div>

        {/* KPI 4: Official Certificates */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Issued Certificates
            </span>
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black font-mono text-amber-300">
            {retirements.length}
          </div>
          <span className="text-[11px] text-slate-400 block">
            Audited &amp; serialized under BEE protocols
          </span>
        </div>
      </div>

      {/* Transactions Table & Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Permanent Retirement Registry Records &amp; Payment Receipts
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified on-chain records with Indian Gateway transaction IDs &amp; GST compliance
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search serial, payment ID, GSTIN, project..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {filteredRetirements.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <FileCheck2 className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">No Retirement Records Found</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven&apos;t retired any carbon credits matching your query yet. Explore our verified
              marketplace to offset emissions.
            </p>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
            >
              Go to Marketplace
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Serial Number</th>
                  <th className="py-3 px-4">Payment ID</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Beneficiary &amp; GSTIN</th>
                  <th className="py-3 px-4">Project &amp; Category</th>
                  <th className="py-3 px-4">Tons Retired</th>
                  <th className="py-3 px-4">Amount Paid (₹)</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Govt Auditor</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredRetirements.map((cert) => {
                  const paymentRef = cert.paymentId || 'pay_IND2026849102'
                  const method = cert.paymentMethod || 'UPI / Instant QR'
                  const amount = cert.totalPaid || cert.totalAmount || 0

                  return (
                    <tr key={cert.serialNumber} className="hover:bg-slate-950/40 transition-colors">
                      {/* Serial */}
                      <td className="py-4 px-4 font-mono font-bold text-emerald-400 whitespace-nowrap">
                        {cert.serialNumber}
                      </td>

                      {/* Payment ID */}
                      <td className="py-4 px-4 font-mono text-slate-200 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                          {paymentRef}
                        </span>
                      </td>

                      {/* Method */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                          <CreditCard className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate max-w-[140px]">{method}</span>
                        </div>
                      </td>

                      {/* Beneficiary */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-200">{cert.buyerName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          GSTIN: {cert.gstin || cert.buyerPan || '09AAACH7409R1ZZ'}
                        </div>
                      </td>

                      {/* Project */}
                      <td className="py-4 px-4 max-w-xs">
                        <div className="font-medium text-slate-200 truncate">{cert.projectName}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                            {cert.category}
                          </span>
                          <span className="truncate">{cert.location}</span>
                        </div>
                      </td>

                      {/* Tons */}
                      <td className="py-4 px-4 font-mono font-bold text-slate-100 whitespace-nowrap">
                        {cert.tonsRetired.toLocaleString()} tCO2e
                      </td>

                      {/* Amount Paid (₹) */}
                      <td className="py-4 px-4 font-mono font-bold text-emerald-400 whitespace-nowrap">
                        ₹{amount.toLocaleString('en-IN')}
                      </td>

                      {/* Timestamp */}
                      <td className="py-4 px-4 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                        {cert.retirementTimestamp}
                      </td>

                      {/* Auditor */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-mono text-amber-300 text-[11px] flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-amber-400" />
                          <span>{cert.auditorId}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedCertificateForView(cert)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors text-xs font-semibold flex items-center gap-1"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Certificate</span>
                          </button>

                          <button
                            onClick={() => navigateToLedgerWithSerial(cert.serialNumber)}
                            title="Verify on Public Ledger"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
