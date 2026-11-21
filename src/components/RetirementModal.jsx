import { useState } from 'react'
import { useCarbon } from '../context/useCarbon'
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Building2,
  Mail,
  CreditCard,
  Sparkles,
  ExternalLink,
  FileCheck2,
} from 'lucide-react'

export default function RetirementModal() {
  const {
    selectedProjectForCheckout,
    setSelectedProjectForCheckout,
    buyAndRetireCredits,
    quickOffsetTons,
    setSelectedCertificateForView,
    navigateToLedgerWithSerial,
  } = useCarbon()

  const project = selectedProjectForCheckout

  const defaultQuantity =
    quickOffsetTons && quickOffsetTons <= (project?.availableTons || 10)
      ? Math.max(1, Math.round(quickOffsetTons))
      : Math.min(25, project?.availableTons || 10)

  const [quantity, setQuantity] = useState(defaultQuantity)
  const [buyerName, setBuyerName] = useState('Tata Digital Green Hub Ltd')
  const [buyerPan, setBuyerPan] = useState('AABCT7849K')
  const [buyerEmail, setBuyerEmail] = useState('sustainability@tatadigital.example.com')
  const [beneficiaryReason, setBeneficiaryReason] = useState(
    'Corporate Scope 1 & 2 Annual Carbon Neutrality Target'
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [issuedCertificate, setIssuedCertificate] = useState(null)

  if (!project) return null

  const maxTons = project.availableTons
  const pricePerTon = project.pricePerTon
  const totalAmount = quantity * pricePerTon

  const handleRetire = (e) => {
    e.preventDefault()
    if (quantity <= 0 || quantity > maxTons) return

    setIsSubmitting(true)
    setTimeout(() => {
      try {
        const cert = buyAndRetireCredits({
          projectId: project.id,
          quantity,
          buyerName,
          buyerPan,
          buyerEmail,
          beneficiaryReason,
        })
        setIssuedCertificate(cert)
      } catch (err) {
        alert(err.message)
      } finally {
        setIsSubmitting(false)
      }
    }, 600)
  }

  const handleClose = () => {
    setSelectedProjectForCheckout(null)
    setIssuedCertificate(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                {issuedCertificate ? 'Carbon Credits Successfully Retired' : 'Retire Carbon Credits'}
              </h3>
              <p className="text-xs text-slate-400">
                {issuedCertificate
                  ? 'Official Serialized Registry Record Minted'
                  : 'Direct Proponent Purchase & Permanent Cancellation'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {issuedCertificate ? (
            /* Success View */
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-950/50">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Government Registry Serial Issued
                </span>
                <h4 className="text-2xl font-bold text-slate-100 mt-2 font-mono">
                  {issuedCertificate.serialNumber}
                </h4>
                <p className="text-sm text-slate-400 max-w-md mx-auto mt-1">
                  Successfully retired <strong className="text-emerald-400">{issuedCertificate.tonsRetired} tCO2e</strong> from{' '}
                  <span className="text-slate-200">{issuedCertificate.projectName}</span>.
                </p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Beneficiary</span>
                  <span className="font-semibold text-slate-200">{issuedCertificate.buyerName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Total Investment</span>
                  <span className="font-semibold text-emerald-400">
                    ₹{issuedCertificate.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Registry Timestamp</span>
                  <span className="font-mono text-slate-300">
                    {issuedCertificate.retirementTimestamp}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Auditor Accreditation</span>
                  <span className="font-mono text-amber-300">
                    {issuedCertificate.auditorId} (BEE Certified)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    handleClose()
                    setSelectedCertificateForView(issuedCertificate)
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-950/50"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>View Official Certificate</span>
                </button>

                <button
                  onClick={() => {
                    handleClose()
                    navigateToLedgerWithSerial(issuedCertificate.serialNumber)
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-slate-200 font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Verify on Public Ledger</span>
                </button>
              </div>
            </div>
          ) : (
            /* Purchase Form View */
            <form onSubmit={handleRetire} className="space-y-6">
              {/* Project Card Highlight */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {project.category}
                  </span>
                  <h4 className="text-base font-bold text-slate-100 mt-1">{project.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{project.location}</p>
                  <div className="mt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{project.auditorBadge}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs text-slate-400">Price / Ton</div>
                  <div className="text-lg font-bold text-emerald-400">
                    ₹{project.pricePerTon.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {project.availableTons.toLocaleString()} tons available
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Quantity to Retire (Tons CO2e)
                  </label>
                  <span className="text-xs text-slate-400 font-mono">
                    Max: {maxTons.toLocaleString()} Tons
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 5))}
                    className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center transition-colors border border-slate-700 text-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={maxTons}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(1, Math.min(maxTons, parseInt(e.target.value) || 1))
                      )
                    }
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-center text-lg font-bold text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(maxTons, q + 5))}
                    className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center transition-colors border border-slate-700 text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-slate-400">Quick set:</span>
                  {[5, 25, 50, 100].map((t) => (
                    <button
                      key={t}
                      type="button"
                      disabled={t > maxTons}
                      onClick={() => setQuantity(t)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-colors ${
                        quantity === t
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {t} t
                    </button>
                  ))}
                  {quickOffsetTons && quickOffsetTons <= maxTons && (
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, Math.round(quickOffsetTons)))}
                      className="text-xs px-2.5 py-1 rounded-lg border border-amber-500/40 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors flex items-center gap-1 font-mono"
                    >
                      <Sparkles className="w-3 h-3" />
                      Calculated Footprint: {Math.round(quickOffsetTons)} t
                    </button>
                  )}
                </div>
              </div>

              {/* Beneficiary & Corporate Details */}
              <div className="space-y-3 pt-1 border-t border-slate-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Beneficiary & Certificate Details
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Retiree / Entity Name
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder="Company or Individual Name"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Corporate PAN / GST / ID
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={buyerPan}
                        onChange={(e) => setBuyerPan(e.target.value)}
                        placeholder="AAACB1234K"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 font-mono uppercase focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Registered ESG Contact Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder="esg@company.in"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Retirement Purpose / Claim
                    </label>
                    <input
                      type="text"
                      required
                      value={beneficiaryReason}
                      onChange={(e) => setBeneficiaryReason(e.target.value)}
                      placeholder="e.g. Scope 2 Net Zero Offset"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Price Calculation Card */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Carbon Credits ({quantity} Tons @ ₹{pricePerTon}/t)</span>
                  <span className="font-mono text-slate-200">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>National Registry Settlement Fee</span>
                  <span className="font-mono text-emerald-400">₹0 (Govt Subsidized)</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-200">Total Investment</span>
                  <span className="text-emerald-400 text-lg font-mono">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Permanent Retirement Notice */}
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                <Lock className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <p className="leading-relaxed">
                  <strong>Permanent Retirement:</strong> By confirming, these credits will be
                  instantly burned from the circulating supply. An irreversible serial number{' '}
                  <span className="font-mono">IND-BEE-2026-XXXX</span> will be issued in your entity&apos;s
                  name on the national public registry.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || quantity <= 0 || quantity > maxTons}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Minting Serial & Retiring...</span>
                  ) : (
                    <>
                      <span>Confirm & Permanently Retire Credits</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
