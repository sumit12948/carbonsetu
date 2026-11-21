import { useRef } from 'react'
import { useCarbon } from '../context/useCarbon'
import {
  X,
  Printer,
  ShieldCheck,
  ExternalLink,
  QrCode,
  Award,
  CreditCard,
} from 'lucide-react'

export default function CertificateModal() {
  const {
    selectedCertificateForView,
    setSelectedCertificateForView,
    navigateToLedgerWithSerial,
  } = useCarbon()

  const cert = selectedCertificateForView
  const printRef = useRef(null)

  if (!cert) return null

  const handlePrint = () => {
    window.print()
  }

  const handleVerifyOnLedger = () => {
    const serial = cert.serialNumber
    setSelectedCertificateForView(null)
    navigateToLedgerWithSerial(serial)
  }

  const paymentId = cert.paymentId || 'pay_IND2026849102'
  const gstin = cert.gstin || (cert.buyerPan ? `09${cert.buyerPan}1ZZ` : '09AAACH7409R1ZZ')
  const amountPaid = cert.totalPaid || cert.totalAmount || 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Top Controls Bar (Non-printable) */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/90 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold text-slate-100">
              Official Indian Carbon Retirement Certificate &amp; Tax Receipt
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={handleVerifyOnLedger}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-xs font-semibold text-emerald-300 transition-colors border border-emerald-500/40"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Verify on Ledger</span>
            </button>
            <button
              onClick={() => setSelectedCertificateForView(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area (Styled for Print & Screen) */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-slate-950">
          <div
            ref={printRef}
            className="relative bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-4 border-emerald-500/30 rounded-2xl p-8 sm:p-12 shadow-2xl overflow-hidden print:border-emerald-700 print:bg-white print:text-black print:p-8"
          >
            {/* Guilloche / Ornamental Corners */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-emerald-400/60" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-emerald-400/60" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-emerald-400/60" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-emerald-400/60" />

            {/* Certificate Header */}
            <div className="text-center space-y-2 pb-6 border-b border-slate-800/80">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div className="text-left">
                  <h5 className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                    Republic of India • National Carbon Registry
                  </h5>
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Bureau of Energy Efficiency (BEE) Accreditation
                  </h4>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight pt-2 font-serif">
                Certificate of Carbon Credit Retirement
              </h2>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                Official Proof of Permanent GHG Emission Mitigation &amp; Voluntary Market Cancellation
              </p>
            </div>

            {/* Certificate Serial & Payment Meta Banner */}
            <div className="py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-slate-800/60 text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                  Registry Serial Number
                </span>
                <span className="text-base sm:text-lg font-mono font-bold text-emerald-400">
                  {cert.serialNumber}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                  Payment Reference ID
                </span>
                <span className="font-mono text-slate-200 font-semibold">
                  {paymentId}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  Settled: ₹{amountPaid.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="sm:text-right">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                  Retirement Timestamp
                </span>
                <span className="font-mono text-slate-300 font-medium">
                  {cert.retirementTimestamp}
                </span>
              </div>
            </div>

            {/* Recipient & Retirement Details */}
            <div className="py-8 space-y-6 text-center">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
                This certifies that
              </p>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-wide font-sans">
                {cert.buyerName}
              </h3>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">
                  GSTIN: <strong className="text-slate-100">{gstin}</strong>
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">
                  PAN: <strong className="text-slate-100">{cert.buyerPan || 'AAACT1234F'}</strong>
                </span>
              </div>

              <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                has permanently retired and claimed environmental additionality for the following
                verified mitigation quantity under the Indian Carbon Trading Registry:
              </p>

              {/* Ton Callout */}
              <div className="my-6 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border border-emerald-500/30 max-w-md mx-auto shadow-inner">
                <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold block mb-1">
                  Mitigated Greenhouse Gases
                </span>
                <div className="text-4xl sm:text-5xl font-black text-slate-100 font-mono tracking-tight">
                  {cert.tonsRetired.toLocaleString()}{' '}
                  <span className="text-xl sm:text-2xl text-emerald-400 font-sans font-semibold">
                    Tons CO2e
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-2 font-mono">
                  Equivalent to ~{(cert.tonsRetired * 45).toLocaleString()} adult trees preserved
                  over 10 years
                </span>
              </div>
            </div>

            {/* Project Origin & Technology Grid */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                  Origin Project
                </span>
                <p className="text-sm font-semibold text-slate-200 mt-0.5">{cert.projectName}</p>
                <p className="text-xs text-slate-400">{cert.location}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                  Technology Category
                </span>
                <p className="text-sm font-semibold text-slate-200 mt-0.5">{cert.category}</p>
                <p className="text-xs text-slate-400">Indian National Grid Additionality</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                  Payment Settlement Method
                </span>
                <p className="text-xs text-slate-200 mt-0.5 font-mono flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{cert.paymentMethod || 'Razorpay Gateway (Direct Settlement)'}</span>
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                  Government Verifying Officer
                </span>
                <div className="flex items-center gap-1.5 mt-0.5 text-amber-300 font-mono text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Auditor ID: {cert.auditorId} (BEE Empaneled)</span>
                </div>
              </div>
            </div>

            {/* Signatures & Seal Footer */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-left">
                <div className="w-14 h-14 rounded-xl bg-slate-950 border border-slate-800 p-2 flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                    Public Verification Hash
                  </span>
                  <span className="font-mono text-[11px] text-slate-400 break-all max-w-xs block">
                    {cert.certificateHash}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-medium">
                    Immutable • Zero Double Counting • GST Compliant
                  </span>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <div className="w-24 h-10 border-b border-slate-600 mx-auto sm:ml-auto flex items-end justify-center pb-1">
                  <span className="font-serif italic text-xs text-slate-300 tracking-wider">
                    Rajesh Sharma
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-slate-200 mt-1">
                  National Registrar &amp; Auditor
                </p>
                <p className="text-[10px] text-slate-500 uppercase font-mono">
                  Bureau of Energy Efficiency (BEE)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
