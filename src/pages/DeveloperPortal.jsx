import { useState } from 'react'
import { useCarbon } from '../context/useCarbon'
import {
  Leaf,
  UploadCloud,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Sparkles,
  Send,
  FileText,
} from 'lucide-react'

export default function DeveloperPortal() {
  const { projects, submitProject, setActiveTab } = useCarbon()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Solar Energy')
  const [developer, setDeveloper] = useState('Bharat Green Infrastructure Ltd')
  const [location, setLocation] = useState('')
  const [coordinates, setCoordinates] = useState('')
  const [capacity, setCapacity] = useState('')
  const [claimedTons, setClaimedTons] = useState('')
  const [pricePerTon, setPricePerTon] = useState('')
  const [description, setDescription] = useState('')
  const [methodology, setMethodology] = useState(
    'ACM0002: Grid-connected electricity generation from renewable sources'
  )
  const [supportingDocName, setSupportingDocName] = useState(
    'Project_Design_Document_PDD_Validation_Report.pdf'
  )
  const [photoUrl, setPhotoUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Quick Mock Autofill Helper
  const fillSampleProject = (type) => {
    if (type === 'solar') {
      setTitle('Charanka Mega Solar Park Phase III')
      setCategory('Solar Energy')
      setDeveloper('Gujarat Power Corp Ltd & Avaada Energy')
      setLocation('Patan District, Gujarat')
      setCoordinates('23.9015° N, 71.2036° E')
      setCapacity('200 MW Ground Mounted Solar Array')
      setClaimedTons(32000)
      setPricePerTon(810)
      setDescription(
        'Utility-scale solar power generation displacing Western Regional Load Despatch Centre fossil thermal baseload.'
      )
      setMethodology('ACM0002: Grid-connected electricity generation from renewable sources')
      setSupportingDocName('CEA_Western_Grid_Sync_Report_2026.pdf')
      setPhotoUrl(
        'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
      )
    } else if (type === 'forestry') {
      setTitle('Western Ghats Biodiversity Agroforestry Corridor')
      setCategory('Forestry')
      setDeveloper('Sahyadri Ecological Farmers Federation')
      setLocation('Wayanad & Nilgiris Foothills, Kerala')
      setCoordinates('11.6854° N, 76.1320° E')
      setCapacity('850 Hectares Native Mixed Silvopasture')
      setClaimedTons(14500)
      setPricePerTon(1180)
      setDescription(
        'Ecological restoration of degraded coffee border terrain with native broadleaf canopy trees and microclimate stabilization.'
      )
      setMethodology('AR-ACM0003: Afforestation of degraded montane farmlands')
      setSupportingDocName('ICAR_Soil_Biomass_Audit_Sahyadri.pdf')
      setPhotoUrl(
        'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=800&q=80'
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !location || !claimedTons || !pricePerTon) return

    setIsSubmitting(true)
    setTimeout(() => {
      submitProject({
        title,
        category,
        developer,
        location,
        coordinates: coordinates || '22.5726° N, 88.3639° E',
        capacity: capacity || 'Clean Energy Facility',
        claimedTons: Number(claimedTons),
        pricePerTon: Number(pricePerTon),
        description,
        methodology,
        supportingDocName,
        photoUrl,
      })

      setIsSubmitting(false)
      // Reset Form
      setTitle('')
      setLocation('')
      setCoordinates('')
      setCapacity('')
      setClaimedTons('')
      setPricePerTon('')
      setDescription('')
    }, 500)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono mb-2">
            <Leaf className="w-3.5 h-3.5" />
            <span>Project Proponent Registry • BEE CCTS Scheme</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Developer Project Submissions
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Register your verified green project for mandatory on-site audit by Government inspectors.
            Once approved, your carbon credits will be instantly listed on the National Marketplace.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fillSampleProject('solar')}
            className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-200 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Pre-fill Solar DPR</span>
          </button>
          <button
            type="button"
            onClick={() => fillSampleProject('forestry')}
            className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-200 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pre-fill Agroforestry DPR</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Submission Form & Submitted Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="pb-4 border-b border-slate-800">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-emerald-400" />
              <span>Submit New Carbon Mitigation Project</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              All submissions are initially assigned status{' '}
              <strong className="text-amber-300 font-mono">PENDING_INSPECTION</strong> until field verified.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Title */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Project Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Bhadla Solar Phase IV Mega Clean Energy"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Category & Developer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Solar Energy">Solar Energy</option>
                  <option value="Forestry">Forestry / Mangroves</option>
                  <option value="Biogas">Biogas & CBG</option>
                  <option value="Wind">Wind Energy</option>
                  <option value="Waste-to-Energy">Waste-to-Energy</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Developer Entity</label>
                <input
                  type="text"
                  required
                  value={developer}
                  onChange={(e) => setDeveloper(e.target.value)}
                  placeholder="Company / NGO / Proponent"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Location & GPS Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Location (District, State) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Phalodi, Rajasthan"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  GPS Coordinates (Lat/Long)
                </label>
                <input
                  type="text"
                  value={coordinates}
                  onChange={(e) => setCoordinates(e.target.value)}
                  placeholder="e.g. 27.5385° N, 71.9161° E"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Plant Capacity & Methodology */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Plant / Land Capacity
                </label>
                <input
                  type="text"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="e.g. 150 MW Solar PV or 1,200 Ha"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Methodology</label>
                <input
                  type="text"
                  value={methodology}
                  onChange={(e) => setMethodology(e.target.value)}
                  placeholder="ACM0002 or AR-ACM0003"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Claimed Reduction & Expected Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Claimed CO2 Reduction (Tons) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={claimedTons}
                  onChange={(e) => setClaimedTons(e.target.value)}
                  placeholder="e.g. 25000"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Price per Ton (₹) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="number"
                  min="100"
                  required
                  value={pricePerTon}
                  onChange={(e) => setPricePerTon(e.target.value)}
                  placeholder="e.g. 850"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Supporting Document Upload UI */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Supporting Detailed Project Report (DPR / Telemetry NOC)
              </label>
              <div className="p-3 border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-xl bg-slate-950 text-center transition-colors">
                <FileText className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                <p className="text-[11px] font-mono text-slate-300">{supportingDocName}</p>
                <span className="text-[10px] text-slate-500">
                  PDF / GeoTIFF / SCADA Telemetry file attached
                </span>
              </div>
            </div>

            {/* Brief Description */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Project Summary</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of technology, carbon additionality, and local community co-benefits..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Registering with BEE...' : 'Submit Project for Audit'}</span>
            </button>
          </form>
        </div>

        {/* Submitted Projects Table Column */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-100">My Submitted Projects</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time tracking of statutory field audits & market approval status
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {projects.length} Total Submissions
            </span>
          </div>

          <div className="space-y-4">
            {projects.map((proj) => {
              const isPending = proj.status === 'PENDING_INSPECTION'
              const isVerified = proj.status === 'VERIFIED'
              const isRejected = proj.status === 'REJECTED'

              return (
                <div
                  key={proj.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isPending
                      ? 'bg-amber-950/20 border-amber-500/30'
                      : isVerified
                      ? 'bg-slate-950/70 border-emerald-500/30'
                      : 'bg-rose-950/20 border-rose-500/30'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 pb-2 border-b border-slate-800/80">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {proj.category}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{proj.id}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-100 mt-1">{proj.title}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{proj.location}</span>
                        <span className="text-slate-600">•</span>
                        <span className="font-mono text-[11px] text-slate-500">{proj.coordinates}</span>
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div>
                      {isPending && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-semibold">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>PENDING_INSPECTION</span>
                        </span>
                      )}
                      {isVerified && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>VERIFIED & LIVE</span>
                        </span>
                      )}
                      {isRejected && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-semibold">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                          <span>REJECTED</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Claimed Mitigation</span>
                      <span className="font-mono font-semibold text-slate-200">
                        {proj.claimedTons.toLocaleString()} t
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px]">Market Price</span>
                      <span className="font-mono font-semibold text-emerald-400">
                        ₹{proj.pricePerTon.toLocaleString('en-IN')}/t
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px]">Approved Tons</span>
                      <span className="font-mono font-semibold text-slate-200">
                        {isVerified ? `${proj.totalApprovedTons?.toLocaleString()} t` : '—'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px]">Audited Date</span>
                      <span className="font-mono text-slate-400">
                        {proj.inspectionDate || 'Awaiting Inspector'}
                      </span>
                    </div>
                  </div>

                  {/* Auditor Remarks / Action callout */}
                  {proj.inspectorRemarks && (
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-0.5">
                        <span className="text-amber-400">
                          BEE Auditor Remarks ({proj.auditorId}):
                        </span>
                      </div>
                      <p className="text-slate-300 italic text-[11px] leading-relaxed">
                        &quot;{proj.inspectorRemarks}&quot;
                      </p>
                    </div>
                  )}

                  {/* If pending, a quick test shortcut button to switch to auditor */}
                  {isPending && (
                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">
                        Field inspector assigned: Bureau of Energy Efficiency Delhi Circle
                      </span>
                      <button
                        onClick={() => setActiveTab('auditor')}
                        className="text-amber-400 hover:text-amber-300 text-xs font-semibold underline flex items-center gap-1"
                      >
                        <span>Audit this in Inspector Portal →</span>
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
