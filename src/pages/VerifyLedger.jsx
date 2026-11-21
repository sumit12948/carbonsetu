import { useState } from 'react'
import { useCarbon } from '../context/useCarbon'
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  FileCheck2,
  Lock,
  CreditCard,
} from 'lucide-react'

export default function VerifyLedger() {
  const {
    retirements,
    setSelectedCertificateForView,
    ledgerSearchQuery,
    setLedgerSearchQuery,
  } = useCarbon()

  const [inputSerial, setInputSerial] = useState(ledgerSearchQuery || 'IND-BEE-2026-4892')

  const matchedCertificate = retirements.find(
    (r) => r.serialNumber.trim().toUpperCase() === ledgerSearchQuery.trim().toUpperCase()
  )

  const handleSearch = (e) => {
    e?.preventDefault()
    setLedgerSearchQuery(inputSerial)
  }

  const handleSampleChipClick = (serial) => {
    setInputSerial(serial)
    setLedgerSearchQuery(serial)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Public National Carbon Registry • Zero Login Required</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
          Verify Any Indian Carbon Certificate
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Verify the authenticity, permanent retirement status, field audit credentials, Indian
          Gateway payment settlement, and cryptographic provenance of any serialized carbon credit.
        </p>
      </div>

      {/* Search Bar & Sample Chips Card */}
      <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
            <input
              type="text"
              value={inputSerial}
              onChange={(e) => setInputSerial(e.target.value)}
              placeholder="Enter Certificate Serial (e.g. IND-BEE-2026-4892)"
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-100 font-mono tracking-wider focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 text-sm"
          >
            <span>Verify Authenticity</span>
          </button>
        </form>

        {/* Quick Sample Clickable Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400 flex items-center gap-1 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sample Serial Chips:</span>
          </span>
          {retirements.slice(0, 4).map((r) => (
            <button
              key={r.serialNumber}
              type="button"
              onClick={() => handleSampleChipClick(r.serialNumber)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all border ${
                ledgerSearchQuery === r.serialNumber
                  ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-slate-100'
              }`}
            >
              {r.serialNumber}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleSampleChipClick('IND-BEE-FAKE-9999')}
            className="px-2.5 py-1 rounded-lg font-mono text-[11px] bg-rose-950/20 border border-rose-500/30 text-rose-300 hover:bg-rose-950/40 transition-colors"
            title="Test invalid certificate verification error handling"
          >
            Test Invalid Serial ✕
          </button>
        </div>
      </div>

      {/* Verification Results Display */}
      <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95">
        {matchedCertificate ? (
          /* Verified Card */
          <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
            {/* Top Accent Ribbon */}
            <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-mono font-bold uppercase tracking-widest px-6 py-1 rounded-bl-2xl shadow-md">
              100% Genuine • BEE Verified
            </div>

            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-100">
                    Verified &amp; Permanently Retired
                  </h3>
                  <p className="text-xs text-emerald-400 font-mono mt-0.5">
                    Registry Status: RETIRED (Non-Circulating • Burned)
                  </p>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                  Certified Serial
                </span>
                <span className="text-xl font-bold font-mono text-emerald-400">
                  {matchedCertificate.serialNumber}
                </span>
              </div>
            </div>

            {/* Verified Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Beneficiary & GSTIN */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                  Beneficiary Entity &amp; GSTIN
                </span>
                <p className="text-sm font-bold text-slate-100">{matchedCertificate.buyerName}</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono pt-0.5">
                  <span>GSTIN: {matchedCertificate.gstin || '27AAACT1234F1Z8'}</span>
                  <span>•</span>
                  <span>PAN: {matchedCertificate.buyerPan || 'AAACT1234F'}</span>
                </div>
              </div>

              {/* Volume */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                  Permanently Mitigated Volume
                </span>
                <p className="text-2xl font-black text-emerald-400 font-mono">
                  {matchedCertificate.tonsRetired.toLocaleString()} Tons CO2e
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Equal to ~{(matchedCertificate.tonsRetired * 45).toLocaleString()} adult trees
                </p>
              </div>

              {/* Origin Project */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                  Origin Clean Tech Project
                </span>
                <p className="text-sm font-bold text-slate-100">
                  {matchedCertificate.projectName}
                </p>
                <p className="text-[11px] text-slate-400">{matchedCertificate.location}</p>
              </div>

              {/* Govt Auditor & Payment Transaction Ref */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                    Auditing Body &amp; Accreditation
                  </span>
                  <div className="flex items-center gap-1.5 text-amber-300 font-mono font-bold text-sm mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Auditor ID: {matchedCertificate.auditorId}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    Bureau of Energy Efficiency (BEE) Nominated
                  </span>
                </div>

                {/* Mandated: Display the verified Payment Transaction Ref (pay_...) */}
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                    Verified Payment Transaction Ref
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-200 font-mono text-xs font-bold mt-0.5">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{matchedCertificate.paymentId || 'pay_IND2026849102'}</span>
                    <span className="text-[10px] font-normal text-slate-400">
                      (Settled ₹{(matchedCertificate.totalPaid || matchedCertificate.totalAmount || 0).toLocaleString('en-IN')})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cryptographic Hash Row */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                  Public Verification Ledger Hash
                </span>
                <span className="font-mono text-[11px] text-slate-300 break-all">
                  {matchedCertificate.certificateHash}
                </span>
              </div>
              <div className="shrink-0 text-slate-400 font-mono text-[11px]">
                Timestamp: {matchedCertificate.retirementTimestamp}
              </div>
            </div>

            {/* Button to view certificate */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCertificateForView(matchedCertificate)}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors flex items-center gap-2 text-xs"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>View Printable Official Certificate</span>
              </button>
            </div>
          </div>
        ) : (
          /* Not Found Alert */
          <div className="bg-rose-950/30 border-2 border-rose-500/50 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-rose-200">
                Certificate Not Found in National Registry
              </h3>
              <p className="text-xs text-rose-300/80 max-w-md mx-auto mt-1 leading-relaxed">
                No official record exists for serial number{' '}
                <strong className="font-mono text-rose-100">&quot;{ledgerSearchQuery}&quot;</strong>.
                Please beware of counterfeit certificates or unverified secondary market claims.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleSampleChipClick('IND-BEE-2026-4892')}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:border-slate-500 text-xs font-semibold transition-colors"
              >
                Try Valid Sample Serial: IND-BEE-2026-4892
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Public Ledger Live Feed Table */}
      <div className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Public Live Ledger Feed</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Transparent, immutable record of all certified retirements and payment references across India
            </p>
          </div>

          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Ledger Synced to National Grid Registry</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Serial</th>
                <th className="py-3 px-4">Payment Ref</th>
                <th className="py-3 px-4">Beneficiary</th>
                <th className="py-3 px-4">Origin Project</th>
                <th className="py-3 px-4">Retired Tons</th>
                <th className="py-3 px-4">Auditor</th>
                <th className="py-3 px-4">Hash</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {retirements.map((item) => (
                <tr key={item.serialNumber} className="hover:bg-slate-950/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                    {item.serialNumber}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300 text-[11px]">
                    {item.paymentId || 'pay_IND2026849102'}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-200">{item.buyerName}</td>
                  <td className="py-3 px-4 text-slate-300 max-w-xs truncate">{item.projectName}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-100">
                    {item.tonsRetired.toLocaleString()} t
                  </td>
                  <td className="py-3 px-4 font-mono text-amber-300">{item.auditorId}</td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-[10px]">
                    {item.certificateHash.substring(0, 16)}...
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleSampleChipClick(item.serialNumber)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 underline font-semibold"
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
