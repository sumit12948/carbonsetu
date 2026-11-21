import { useState } from 'react'
import { useCarbon } from '../context/useCarbon'
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Building2,
  CreditCard,
  QrCode,
  Smartphone,
  ExternalLink,
  FileCheck2,
  Copy,
  Check,
  Loader2,
  Sparkles,
} from 'lucide-react'

function PaymentModalInner({ project }) {
  const {
    setSelectedProjectForPayment,
    setSelectedProjectForCheckout,
    buyAndRetireCredits,
    quickOffsetTons,
    setSelectedCertificateForView,
    navigateToLedgerWithSerial,
    setActiveTab,
  } = useCarbon()

  const defaultQuantity =
    quickOffsetTons && quickOffsetTons <= (project?.availableTons || 10)
      ? Math.max(1, Math.round(quickOffsetTons))
      : Math.min(25, project?.availableTons || 10)

  // Step 1: Order & Tax Breakdown Inputs
  const [quantity, setQuantity] = useState(defaultQuantity)
  const [buyerName, setBuyerName] = useState('Tata Consultancy Services (TCS Green Ops)')
  const [gstin, setGstin] = useState('27AAACT1234F1Z8')
  const [buyerEmail, setBuyerEmail] = useState('sustainability@tcs.example.com')
  const [beneficiaryReason, setBeneficiaryReason] = useState(
    'Corporate Scope 1 & 2 Annual Carbon Neutrality Target'
  )

  // Step 2: Payment Method State
  const [paymentMethodTab, setPaymentMethodTab] = useState('upi') // 'upi' | 'card' | 'netbanking'
  const [upiId, setUpiId] = useState('tata.esg@okaxis')
  const [isUpiVerified, setIsUpiVerified] = useState(true)
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay') // 'gpay' | 'phonepe' | 'paytm' | 'bhim'

  // Card Inputs
  const [cardNumber, setCardNumber] = useState('4532 8912 3456 7890')
  const [cardExpiry, setCardExpiry] = useState('08/29')
  const [cardCvv, setCardCvv] = useState('842')
  const [cardHolder, setCardHolder] = useState('TATA CONSULTANCY SERVICES')

  // NetBanking Inputs
  const [selectedBank, setSelectedBank] = useState('HDFC Bank')

  // Step 3: Processing & Receipt State
  const [paymentState, setPaymentState] = useState('idle') // 'idle' | 'processing' | 'success'
  const [processingStage, setProcessingStage] = useState(0)
  const [receiptData, setReceiptData] = useState(null)
  const [copiedField, setCopiedField] = useState(null)

  const maxTons = project.availableTons
  const pricePerTon = project.pricePerTon

  // Live Cost & Tax Breakdown
  const baseCreditCost = quantity * pricePerTon
  const platformFee = Math.round(baseCreditCost * 0.02) // 2% Registry Fee
  const gstOnFee = Math.round(platformFee * 0.18) // 18% GST on Platform Fee
  const totalPayableAmount = baseCreditCost + platformFee + gstOnFee

  // Format Card Number
  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').substring(0, 16)
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ')
    setCardNumber(formatted)
  }

  // Format Expiry
  const handleExpiryChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').substring(0, 4)
    if (raw.length >= 3) {
      setCardExpiry(`${raw.substring(0, 2)}/${raw.substring(2)}`)
    } else {
      setCardExpiry(raw)
    }
  }

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldName)
    setTimeout(() => setCopiedField(null), 2500)
  }

  const handleClose = () => {
    setSelectedProjectForPayment(null)
    setSelectedProjectForCheckout(null)
    setPaymentState('idle')
    setReceiptData(null)
  }

  // Step 3 Execution
  const handlePayAndRetire = (e) => {
    e.preventDefault()
    if (quantity <= 0 || quantity > maxTons) return

    setPaymentState('processing')
    setProcessingStage(1)

    // Simulated multi-stage banking settlement progression
    setTimeout(() => setProcessingStage(2), 600)
    setTimeout(() => setProcessingStage(3), 1300)

    setTimeout(() => {
      let methodLabel = 'UPI / Dynamic QR'
      if (paymentMethodTab === 'upi') {
        const appMap = {
          gpay: 'Google Pay',
          phonepe: 'PhonePe',
          paytm: 'Paytm UPI',
          bhim: 'BHIM UPI',
        }
        methodLabel = `UPI (${appMap[selectedUpiApp] || 'Instant QR'} - ${upiId})`
      } else if (paymentMethodTab === 'card') {
        const last4 = cardNumber.replace(/\s/g, '').slice(-4) || '7890'
        methodLabel = `Credit/Debit Card (ending in ${last4})`
      } else if (paymentMethodTab === 'netbanking') {
        methodLabel = `NetBanking (${selectedBank})`
      }

      const generatedPaymentId = `pay_IND2026${Math.floor(100000 + Math.random() * 900000)}`

      const cert = buyAndRetireCredits({
        projectId: project.id,
        tons: quantity,
        buyerName,
        gstin,
        buyerEmail,
        beneficiaryReason,
        paymentMethod: methodLabel,
        totalPaid: totalPayableAmount,
        paymentId: generatedPaymentId,
      })

      setReceiptData({
        ...cert,
        paymentId: generatedPaymentId,
        paymentMethod: methodLabel,
        totalPaid: totalPayableAmount,
        baseCreditCost,
        platformFee,
        gstOnFee,
      })

      setPaymentState('success')
    }, 2000)
  }

  const popularBanks = [
    { name: 'SBI', code: 'SBIN', fullName: 'State Bank of India' },
    { name: 'HDFC Bank', code: 'HDFC', fullName: 'HDFC Bank' },
    { name: 'ICICI Bank', code: 'ICIC', fullName: 'ICICI Bank' },
    { name: 'Axis Bank', code: 'UTIB', fullName: 'Axis Bank' },
    { name: 'Kotak Bank', code: 'KKBK', fullName: 'Kotak Mahindra Bank' },
    { name: 'PNB', code: 'PUNB', fullName: 'Punjab National Bank' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Gateway Brand Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-emerald-950/50">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100">
                  CarbonSetu Gateway
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  Razorpay &amp; BEE Synchronized
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official Indian Carbon Credit Purchase &amp; Permanent Retirement Protocol
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
          {/* STEP 3: Instant Receipt / Payment Successful View */}
          {paymentState === 'success' && receiptData ? (
            <div className="space-y-6 py-2 animate-in zoom-in-95">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-xl shadow-emerald-950/50 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                    Payment Successful &amp; Credits Retired
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-100 mt-2 font-mono">
                    ₹{receiptData.totalPaid.toLocaleString('en-IN')}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Permanent environmental additionality recorded on National Carbon Registry.
                  </p>
                </div>
              </div>

              {/* Receipt Breakdown Card */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
                {/* Transaction Ref */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                  <span className="text-slate-400">Payment Transaction ID</span>
                  <div className="flex items-center gap-1.5 font-mono text-slate-200 font-bold">
                    <span>{receiptData.paymentId}</span>
                    <button
                      onClick={() => handleCopy(receiptData.paymentId, 'payId')}
                      className="text-slate-400 hover:text-emerald-400 p-1"
                      title="Copy Payment ID"
                    >
                      {copiedField === 'payId' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Serial Number */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                  <span className="text-slate-400">Certificate Serial Number</span>
                  <div className="flex items-center gap-1.5 font-mono text-emerald-400 font-bold">
                    <span>{receiptData.serialNumber}</span>
                    <button
                      onClick={() => handleCopy(receiptData.serialNumber, 'serial')}
                      className="text-slate-400 hover:text-emerald-400 p-1"
                      title="Copy Serial Number"
                    >
                      {copiedField === 'serial' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Quantity & Project */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                  <span className="text-slate-400">Mitigated Volume</span>
                  <span className="font-mono font-bold text-slate-100">
                    {receiptData.tonsRetired.toLocaleString()} Tons CO2e
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                  <span className="text-slate-400">Origin Project</span>
                  <span className="font-semibold text-slate-200 truncate max-w-[280px]">
                    {receiptData.projectName}
                  </span>
                </div>

                {/* Payment Method */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                  <span className="text-slate-400">Payment Method</span>
                  <span className="text-slate-300 font-medium">{receiptData.paymentMethod}</span>
                </div>

                {/* GSTIN / Entity */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                  <span className="text-slate-400">Beneficiary / GSTIN</span>
                  <span className="font-mono text-slate-300">
                    {receiptData.buyerName} ({receiptData.gstin})
                  </span>
                </div>

                {/* Auditor / Date */}
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-slate-400">Verifying BEE Auditor</span>
                  <span className="font-mono text-amber-300">{receiptData.auditorId}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <button
                  onClick={() => {
                    handleClose()
                    setSelectedCertificateForView(receiptData)
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-950/50 text-xs"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>View Certificate</span>
                </button>

                <button
                  onClick={() => {
                    handleClose()
                    navigateToLedgerWithSerial(receiptData.serialNumber)
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-slate-200 font-semibold hover:bg-slate-700 transition-colors border border-slate-700 text-xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Verify on Ledger</span>
                </button>

                <button
                  onClick={() => {
                    handleClose()
                    setActiveTab('buyer')
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-slate-200 font-semibold hover:bg-slate-700 transition-colors border border-slate-700 text-xs"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Buyer Dashboard</span>
                </button>
              </div>
            </div>
          ) : paymentState === 'processing' ? (
            /* STEP 3 (In-Progress): Processing Animation */
            <div className="text-center py-12 space-y-6 animate-in fade-in">
              <div className="relative w-20 h-20 mx-auto">
                <div className="w-20 h-20 rounded-full border-4 border-slate-800 border-t-emerald-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-slate-100">Processing Indian Gateway Payment</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Verifying payment with bank &amp; minting retirement serial on National Registry...
                </p>
              </div>

              {/* Multi-step progress checklist */}
              <div className="max-w-md mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left space-y-2.5 text-xs font-mono">
                <div
                  className={`flex items-center gap-2 transition-colors ${
                    processingStage >= 1 ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>1. Authorizing payment with Indian Banking Switch</span>
                </div>
                <div
                  className={`flex items-center gap-2 transition-colors ${
                    processingStage >= 2 ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>2. Deducting {quantity} Tons from verified market float</span>
                </div>
                <div
                  className={`flex items-center gap-2 transition-colors ${
                    processingStage >= 3 ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>3. Minting BEE Serial Number IND-BEE-2026-XXXX...</span>
                </div>
              </div>
            </div>
          ) : (
            /* Active Payment Form: Step 1 (Order Breakdown) + Step 2 (Payment Method Tabs) */
            <form onSubmit={handlePayAndRetire} className="space-y-6">
              {/* STEP 1: Project & Order Breakdown */}
              <div className="space-y-4">
                {/* Project Header Banner */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {project.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-100 mt-1">{project.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{project.location}</p>
                    <div className="mt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{project.auditorBadge || '✓ Verified by Govt Auditor (ID: #GOV-BEE-402)'}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block font-mono">Price / Ton</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">
                      ₹{project.pricePerTon.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {project.availableTons.toLocaleString()} tons available
                    </span>
                  </div>
                </div>

                {/* Editable Quantity & Beneficiary Form */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Quantity to Retire */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <label className="font-semibold text-slate-300">Tons to Retire</label>
                      <span className="font-mono text-slate-500">Max: {maxTons}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max={maxTons}
                        required
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Math.max(1, Math.min(maxTons, parseInt(e.target.value) || 1))
                          )
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Buyer Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Buyer / Company Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Company or Individual Name"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* GSTIN */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 block">
                      GSTIN (Optional for ITC)
                    </label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value.toUpperCase())}
                      placeholder="e.g. 09AAACH7409R1ZZ"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 uppercase focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* ESG Contact & Purpose Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      ESG Officer Email Address
                    </label>
                    <input
                      type="email"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="sustainability@company.in"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Retirement Purpose / Claim Note
                    </label>
                    <input
                      type="text"
                      value={beneficiaryReason}
                      onChange={(e) => setBeneficiaryReason(e.target.value)}
                      placeholder="e.g. Scope 1 & 2 Decarbonization"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 text-[11px]">Quick quantity:</span>
                  {[5, 10, 25, 50, 100].map((t) => (
                    <button
                      key={t}
                      type="button"
                      disabled={t > maxTons}
                      onClick={() => setQuantity(t)}
                      className={`px-2.5 py-0.5 rounded-lg border font-mono transition-colors text-[11px] ${
                        quantity === t
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {t} t
                    </button>
                  ))}
                  {quickOffsetTons && quickOffsetTons <= maxTons && (
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, Math.round(quickOffsetTons)))}
                      className="px-2.5 py-0.5 rounded-lg border border-amber-500/40 bg-amber-500/20 text-amber-300 text-[11px] flex items-center gap-1 font-mono"
                    >
                      <Sparkles className="w-3 h-3" />
                      Calculated Footprint: {Math.round(quickOffsetTons)} t
                    </button>
                  )}
                </div>

                {/* Live Cost & Tax Breakdown Card */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>
                      Base Credit Cost ({quantity} tCO2e @ ₹{pricePerTon}/ton)
                    </span>
                    <span className="font-mono text-slate-200">
                      ₹{baseCreditCost.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span className="flex items-center gap-1">
                      <span>Registry &amp; Platform Fee (2%)</span>
                      <span className="text-[10px] text-slate-500">BEE CCTS Levy</span>
                    </span>
                    <span className="font-mono text-slate-200">
                      ₹{platformFee.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>GST (18% on platform fee)</span>
                    <span className="font-mono text-slate-200">
                      ₹{gstOnFee.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-100">Total Payable Amount</span>
                    <span className="text-emerald-400 text-lg font-mono">
                      ₹{totalPayableAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* STEP 2: Payment Method Tabs */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Select Indian Payment Method
                  </h5>
                  <span className="text-[11px] text-slate-400 font-mono">
                    256-Bit SSL Secured
                  </span>
                </div>

                {/* Method Tabs */}
                <div className="grid grid-cols-3 gap-2 p-1 bg-slate-950 rounded-2xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setPaymentMethodTab('upi')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      paymentMethodTab === 'upi'
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/50'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>UPI / QR Code</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethodTab('card')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      paymentMethodTab === 'card'
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/50'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethodTab('netbanking')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      paymentMethodTab === 'netbanking'
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/50'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>NetBanking</span>
                  </button>
                </div>

                {/* TAB 1: UPI / QR Code View */}
                {paymentMethodTab === 'upi' && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      {/* Dynamic Simulated QR Code Box */}
                      <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="relative p-2.5 bg-white rounded-xl shadow-md">
                          <QrCode className="w-28 h-28 text-slate-950" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow">
                              ₹
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                          Scan to pay ₹{totalPayableAmount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[9px] text-slate-500">
                          Supports GPay, PhonePe, Paytm, BHIM
                        </span>
                      </div>

                      {/* UPI ID & App Selector */}
                      <div className="sm:col-span-7 space-y-3">
                        <div>
                          <label className="text-[11px] text-slate-300 block mb-1">
                            Or Enter UPI ID / VPA
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="company@okhdfcbank"
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 pr-24 text-xs font-mono text-slate-100 focus:outline-none focus:border-emerald-500"
                            />
                            <div className="absolute right-2 top-2 flex items-center gap-1">
                              {isUpiVerified ? (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                                  <Check className="w-2.5 h-2.5" />
                                  Verified UPI
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setIsUpiVerified(true)}
                                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white"
                                >
                                  Verify UPI
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Quick UPI Apps Selector */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] text-slate-400 block">
                            Quick Launch Mobile UPI App:
                          </span>
                          <div className="grid grid-cols-4 gap-2">
                            {[
                              { id: 'gpay', label: 'GPay' },
                              { id: 'phonepe', label: 'PhonePe' },
                              { id: 'paytm', label: 'Paytm' },
                              { id: 'bhim', label: 'BHIM' },
                            ].map((app) => (
                              <button
                                key={app.id}
                                type="button"
                                onClick={() => setSelectedUpiApp(app.id)}
                                className={`py-1.5 px-2 rounded-xl border text-[11px] font-semibold text-center transition-all ${
                                  selectedUpiApp === app.id
                                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                                }`}
                              >
                                {app.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: Credit / Debit Card View */}
                {paymentMethodTab === 'card' && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-slate-300">Card Number</label>
                        <span className="text-[10px] font-mono text-slate-400">
                          Visa / RuPay / Mastercard
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          maxLength={19}
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4532 8912 3456 7890"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-emerald-500"
                        />
                        <CreditCard className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-300 block mb-1">Expiry Date</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-slate-300 block mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="•••"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-300 block mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        placeholder="NAME AS PRINTED ON CARD"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 uppercase focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 3: NetBanking View */}
                {paymentMethodTab === 'netbanking' && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <span className="text-[11px] text-slate-400 block">
                      Select Popular Indian Commercial Bank:
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {popularBanks.map((bank) => (
                        <button
                          key={bank.name}
                          type="button"
                          onClick={() => setSelectedBank(bank.fullName)}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            selectedBank === bank.fullName
                              ? 'bg-emerald-500/20 border-emerald-500/60 text-slate-100 shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="font-bold text-xs text-slate-200">{bank.name}</div>
                          <div className="text-[10px] text-slate-400 truncate mt-0.5">
                            {bank.fullName}
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2">
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="State Bank of India">State Bank of India</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                        <option value="Bank of Baroda">Bank of Baroda</option>
                        <option value="Punjab National Bank">Punjab National Bank</option>
                        <option value="Canara Bank">Canara Bank</option>
                        <option value="Union Bank of India">Union Bank of India</option>
                        <option value="IndusInd Bank">IndusInd Bank</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={quantity <= 0 || quantity > maxTons || !buyerName}
                  className="px-8 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-xl shadow-emerald-950/60 text-sm disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    Pay ₹{totalPayableAmount.toLocaleString('en-IN')} &amp; Retire Credits
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PaymentGatewayModal() {
  const { selectedProjectForPayment, selectedProjectForCheckout } = useCarbon()
  const project = selectedProjectForPayment || selectedProjectForCheckout

  if (!project) return null

  return <PaymentModalInner key={project.id} project={project} />
}
