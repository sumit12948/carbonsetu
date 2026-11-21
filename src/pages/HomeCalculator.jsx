import { useState } from 'react'
import { useCarbon } from '../context/useCarbon'
import {
  ShieldCheck,
  Zap,
  Car,
  Plane,
  Flame,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TreePine,
  Lock,
  Scale,
} from 'lucide-react'

export default function HomeCalculator() {
  const {
    footprintInputs,
    setFootprintInputs,
    electricityTonsMonthly,
    commuteTonsMonthly,
    flightTonsMonthly,
    lpgTonsMonthly,
    totalMonthlyTons,
    totalAnnualTons,
    startOffsetFromCalculator,
    setActiveTab,
    projects,
  } = useCarbon()

  const [calculationMode, setCalculationMode] = useState('annual')

  const activeTons = calculationMode === 'annual' ? totalAnnualTons : totalMonthlyTons

  // Compute breakdown percentages
  const safeTotal = totalMonthlyTons || 0.0001
  const pctElec = Math.round((electricityTonsMonthly / safeTotal) * 100) || 0
  const pctCommute = Math.round((commuteTonsMonthly / safeTotal) * 100) || 0
  const pctFlight = Math.round((flightTonsMonthly / safeTotal) * 100) || 0
  const pctLpg = Math.round((lpgTonsMonthly / safeTotal) * 100) || 0

  const verifiedCount = projects.filter((p) => p.status === 'VERIFIED').length
  const totalVerifiedTons = projects
    .filter((p) => p.status === 'VERIFIED')
    .reduce((acc, curr) => acc + (curr.totalApprovedTons || curr.availableTons), 0)

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-12 overflow-hidden border-b border-slate-800/80">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ministry of Power & BEE-Aligned National Carbon Registry</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-100 tracking-tight leading-[1.15]">
            Zero-Greenwashing{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
              Verified Carbon Credits
            </span>{' '}
            for India
          </h1>

          <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Every single carbon credit on CarbonSetu is physically audited on-ground by accredited
            Bureau of Energy Efficiency (BEE) inspectors, backed by drone telemetry, and issued with
            an immutable serialized retirement certificate.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('marketplace')}
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-950/60 flex items-center gap-2 text-sm"
            >
              <span>Explore Verified Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#calculator"
              className="px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 font-semibold transition-colors text-sm flex items-center gap-2"
            >
              <span>Calculate Footprint</span>
              <Scale className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 text-left max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Audited Carbon Mitigation
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">
                {totalVerifiedTons.toLocaleString()} t
              </div>
              <span className="text-[11px] text-slate-400">100% On-Ground Inspected</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Active Verified Projects
              </span>
              <div className="text-2xl font-bold font-mono text-slate-100 mt-0.5">
                {verifiedCount} Projects
              </div>
              <span className="text-[11px] text-slate-400">Solar, Mangrove & Biogas</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Double-Counting Prevention
              </span>
              <div className="text-2xl font-bold font-mono text-cyan-400 mt-0.5">100%</div>
              <span className="text-[11px] text-slate-400">Serialized Burning on Registry</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Field Inspection Cadence
              </span>
              <div className="text-2xl font-bold font-mono text-amber-400 mt-0.5">Mandatory</div>
              <span className="text-[11px] text-slate-400">No Desk-Only Verification</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Carbon Calculator Section */}
      <section id="calculator" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Emissions Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Calculate Your Footprint & Offset with Confidence
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Use standard Indian emission factors to quantify your Scope 1, 2 & personal emissions.
            Then seamlessly offset and permanently retire credits in one click.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100">Activity Inputs (Monthly)</h3>
              <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setCalculationMode('monthly')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    calculationMode === 'monthly'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Monthly View
                </button>
                <button
                  type="button"
                  onClick={() => setCalculationMode('annual')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    calculationMode === 'annual'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Annualized (12 Mo)
                </button>
              </div>
            </div>

            {/* Slider 1: Electricity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-200 block">
                      Grid Electricity Consumption
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      CEA Indian Grid Factor: 0.00082 tCO2e / kWh
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-slate-100">
                    {footprintInputs.electricityKWh} kWh
                  </span>
                  <span className="text-[11px] text-emerald-400 block font-mono">
                    ~{(electricityTonsMonthly * (calculationMode === 'annual' ? 12 : 1)).toFixed(2)} t
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="3000"
                step="25"
                value={footprintInputs.electricityKWh}
                onChange={(e) =>
                  setFootprintInputs((prev) => ({
                    ...prev,
                    electricityKWh: Number(e.target.value),
                  }))
                }
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Slider 2: Travel / Commute */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-200 block">
                      Road Commute (Car / Bike)
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Indian Urban Fleet Factor: 0.000192 tCO2e / km
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-slate-100">
                    {footprintInputs.commuteKm} km
                  </span>
                  <span className="text-[11px] text-emerald-400 block font-mono">
                    ~{(commuteTonsMonthly * (calculationMode === 'annual' ? 12 : 1)).toFixed(2)} t
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={footprintInputs.commuteKm}
                onChange={(e) =>
                  setFootprintInputs((prev) => ({
                    ...prev,
                    commuteKm: Number(e.target.value),
                  }))
                }
                className="w-full accent-blue-400 cursor-pointer"
              />
            </div>

            {/* Slider 3: Flights */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-200 block">
                      Aviation Travel (Domestic & Intl)
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      High-Altitude Radiative Forcing: 0.09 tCO2e / hour
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-slate-100">
                    {footprintInputs.flightHours} hrs
                  </span>
                  <span className="text-[11px] text-emerald-400 block font-mono">
                    ~{(flightTonsMonthly * (calculationMode === 'annual' ? 12 : 1)).toFixed(2)} t
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={footprintInputs.flightHours}
                onChange={(e) =>
                  setFootprintInputs((prev) => ({
                    ...prev,
                    flightHours: Number(e.target.value),
                  }))
                }
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            {/* Slider 4: Cooking Gas (LPG) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-200 block">
                      Cooking Gas (LPG 14.2 kg Cylinders)
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Butane / Propane Factor: 0.024 tCO2e / cylinder
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-slate-100">
                    {footprintInputs.lpgCylinders} Cylinders
                  </span>
                  <span className="text-[11px] text-emerald-400 block font-mono">
                    ~{(lpgTonsMonthly * (calculationMode === 'annual' ? 12 : 1)).toFixed(2)} t
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={footprintInputs.lpgCylinders}
                onChange={(e) =>
                  setFootprintInputs((prev) => ({
                    ...prev,
                    lpgCylinders: Number(e.target.value),
                  }))
                }
                className="w-full accent-rose-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Live Output & Breakdown Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Total Calculated Carbon Footprint
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  {calculationMode === 'annual' ? 'Annualized' : 'Monthly'}
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center">
                <div className="text-5xl sm:text-6xl font-black font-mono text-emerald-400 tracking-tight">
                  {activeTons.toFixed(2)}
                </div>
                <div className="text-sm font-bold text-slate-200 mt-1 uppercase tracking-wider">
                  Tons CO2e {calculationMode === 'annual' ? 'per Year' : 'per Month'}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Equivalent to ~{Math.round(activeTons * 45)} adult trees required to absorb over
                  10 years.
                </p>
              </div>

              {/* Emissions Breakdown Visual Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Emissions Breakdown</span>
                  <span className="font-mono text-slate-400">100% Total</span>
                </div>

                {/* Multi-segment Progress Bar */}
                <div className="h-4 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800 p-0.5">
                  <div
                    style={{ width: `${pctElec}%` }}
                    className="bg-amber-400 rounded-l-full transition-all duration-300"
                    title={`Electricity: ${pctElec}%`}
                  />
                  <div
                    style={{ width: `${pctCommute}%` }}
                    className="bg-blue-400 transition-all duration-300"
                    title={`Commute: ${pctCommute}%`}
                  />
                  <div
                    style={{ width: `${pctFlight}%` }}
                    className="bg-purple-400 transition-all duration-300"
                    title={`Flights: ${pctFlight}%`}
                  />
                  <div
                    style={{ width: `${pctLpg}%` }}
                    className="bg-rose-400 rounded-r-full transition-all duration-300"
                    title={`Cooking Gas: ${pctLpg}%`}
                  />
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                    <span className="text-slate-400">Electricity:</span>
                    <strong className="text-slate-200 font-mono">{pctElec}%</strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" />
                    <span className="text-slate-400">Commute:</span>
                    <strong className="text-slate-200 font-mono">{pctCommute}%</strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shrink-0" />
                    <span className="text-slate-400">Aviation:</span>
                    <strong className="text-slate-200 font-mono">{pctFlight}%</strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                    <span className="text-slate-400">Cooking Gas:</span>
                    <strong className="text-slate-200 font-mono">{pctLpg}%</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Offset CTA Button */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <button
                type="button"
                onClick={() => startOffsetFromCalculator(activeTons)}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2 text-sm group"
              >
                <span>Offset This Footprint Now ({activeTons.toFixed(1)} t)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant retirement with serialized BEE proof certificate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Methodology Architecture */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              The CarbonSetu Assurance Guarantee
            </span>
            <h3 className="text-2xl font-bold text-slate-100 mt-1">
              Why Corporate ESG Leaders Trust Our Verified Credits
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Global carbon voluntary registries have faced rampant greenwashing scandals. CarbonSetu
              solves this with mandatory Indian Government field inspections before any token is issued.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">100% On-Ground Audits</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Govt inspectors physically inspect power plant meters, drone-sample coastal mangrove
                density, and inspect anaerobic digesters with GPS timestamps.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                <TreePine className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">Additionality Verified</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Strict additionality protocols ensure clean energy or forestry would not have happened
                without carbon finance, eliminating phantom baseline claims.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">Public Serial Registry</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                When you buy and retire credits, the serial number is permanently canceled. Anyone
                in the public can verify the certificate hash on our ledger.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
