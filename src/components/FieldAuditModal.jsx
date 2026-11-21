import { useState } from 'react'
import { useCarbon } from '../context/useCarbon'
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Camera,
  MapPin,
  FileText,
  Check,
  Ban,
} from 'lucide-react'

export default function FieldAuditModal() {
  const {
    selectedProjectForAudit,
    setSelectedProjectForAudit,
    approveOrRejectProject,
  } = useCarbon()

  const project = selectedProjectForAudit

  const [checklist, setChecklist] = useState({
    physicalSiteVisited: true,
    gpsMatched: true,
    machineryVerified: true,
    noDoubleCounting: true,
  })

  const [approvedTons, setApprovedTons] = useState(
    project ? project.claimedTons : 10000
  )
  const [remarks, setRemarks] = useState(
    'Physical ground verification completed. Meter calibration and grid telemetry logs match claimed carbon mitigation.'
  )
  const [photoPreview, setPhotoPreview] = useState(
    project?.photoUrl ||
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
  )
  const [auditorId, setAuditorId] = useState('#GOV-BEE-402')

  if (!project) return null

  const allChecklistCompleted =
    checklist.physicalSiteVisited &&
    checklist.gpsMatched &&
    checklist.machineryVerified &&
    checklist.noDoubleCounting

  const handleCheckboxToggle = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleApprove = () => {
    if (!allChecklistCompleted) {
      if (
        !window.confirm(
          'Warning: Not all statutory inspection checklist items are checked. Do you still wish to approve this project under discretionary officer power?'
        )
      ) {
        return
      }
    }

    approveOrRejectProject(project.id, {
      status: 'VERIFIED',
      approvedTons: Number(approvedTons),
      remarks,
      auditorId,
      checklist,
      photoUrl: photoPreview,
    })
    setSelectedProjectForAudit(null)
  }

  const handleReject = () => {
    if (!remarks || remarks.trim().length < 10) {
      alert('Please provide detailed inspector remarks explaining the grounds for rejection.')
      return
    }

    approveOrRejectProject(project.id, {
      status: 'REJECTED',
      approvedTons: 0,
      remarks,
      auditorId,
      checklist,
    })
    setSelectedProjectForAudit(null)
  }

  const applyTemplateRemarks = (text) => {
    setRemarks(text)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100">
                  Government Field Audit & Site Verification
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  BEE Accredited
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official statutory inspection protocol for Indian Carbon Trading Market (CCTS)
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedProjectForAudit(null)}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Project Details Brief */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {project.category}
              </span>
              <span className="text-xs font-mono text-amber-400">
                Claimed: {project.claimedTons.toLocaleString()} Tons CO2e
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-100">{project.title}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{project.location}</span>
              </div>
              <div className="font-mono text-slate-400">
                GPS: <span className="text-slate-300">{project.coordinates}</span>
              </div>
              <div>
                Developer: <strong className="text-slate-300">{project.developer}</strong>
              </div>
              <div className="flex items-center gap-1 text-slate-300">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span className="underline decoration-slate-700">{project.supportingDocName}</span>
              </div>
            </div>
          </div>

          {/* 1. Verification Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <span>1. Statutory On-Ground Inspection Checklist</span>
                {allChecklistCompleted && (
                  <span className="text-[10px] font-normal font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    All Verified ✓
                  </span>
                )}
              </h5>
              <span className="text-[11px] text-slate-400">BEE Protocol Checklist</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'physicalSiteVisited',
                  title: 'Physical Site Visited & Delineated',
                  desc: 'Inspector has physically walked project boundaries and checked land patta records.',
                },
                {
                  id: 'gpsMatched',
                  title: 'GPS Coordinates Matched Cadastral',
                  desc: 'On-device hand GPS lat/long aligned with developer submitted coordinates.',
                },
                {
                  id: 'machineryVerified',
                  title: 'Machinery / Plantation Verified',
                  desc: 'Physical equipment or vegetative biomass density confirmed operational.',
                },
                {
                  id: 'noDoubleCounting',
                  title: 'Additionality & No Double Counting',
                  desc: 'Cross-referenced against state grid feeds; credits not claimed in CDM or voluntary registry.',
                },
              ].map((item) => {
                const isChecked = checklist[item.id]
                return (
                  <div
                    key={item.id}
                    onClick={() => handleCheckboxToggle(item.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                      isChecked
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'border-slate-600 bg-slate-900'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <h6 className="text-xs font-bold text-slate-100">{item.title}</h6>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 2. Site Visit Photo upload & preview */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <span>2. Site Inspection Telemetry & Photo Evidence</span>
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1 space-y-2">
                <div className="relative rounded-2xl overflow-hidden border border-slate-700 aspect-video sm:aspect-square bg-slate-950">
                  <img
                    src={photoPreview}
                    alt="Site visit proof"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm text-[10px] font-mono text-emerald-400 border border-slate-700">
                    GPS Geotagged
                  </span>
                </div>
              </div>

              <div className="sm:col-span-2 space-y-2 flex flex-col justify-center">
                <p className="text-xs text-slate-300">
                  Select sample field inspection drone geotagged photos or upload official inspection evidence:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      label: 'Solar Inverter SCADA',
                      url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
                    },
                    {
                      label: 'Mangrove Soil Core',
                      url: 'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=600&q=80',
                    },
                    {
                      label: 'Biogas Digester Dome',
                      url: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=600&q=80',
                    },
                  ].map((sample) => (
                    <button
                      key={sample.label}
                      type="button"
                      onClick={() => setPhotoPreview(sample.url)}
                      className={`text-[11px] p-2 rounded-xl border text-center transition-all ${
                        photoPreview === sample.url
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <label className="cursor-pointer text-xs px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 inline-flex items-center gap-1.5 transition-colors">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Upload Field Capture</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const url = URL.createObjectURL(file)
                          setPhotoPreview(url)
                        }
                      }}
                    />
                  </label>
                  <span className="text-[11px] text-slate-500">EXIF metadata will be preserved</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Approved Credits (Tons) Adjustment */}
          <div className="space-y-3 pt-1 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                3. Final Approved Mitigation Credits (Tons CO2e)
              </h5>
              <span className="text-xs font-mono text-slate-400">
                Claimed: {project.claimedTons.toLocaleString()} t
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="0"
                  max={project.claimedTons}
                  value={approvedTons}
                  onChange={(e) =>
                    setApprovedTons(
                      Math.max(0, Math.min(project.claimedTons, parseInt(e.target.value) || 0))
                    )
                  }
                  className="w-48 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xl font-mono font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
                <div className="text-xs text-slate-400">
                  <span>
                    Approval Ratio:{' '}
                    <strong className="text-slate-200 font-mono">
                      {Math.round((approvedTons / project.claimedTons) * 100)}%
                    </strong>
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Auditor can deduct conservative safety margin for biomass variance or grid line losses.
                  </p>
                </div>
              </div>

              {/* Slider for smooth adjustment */}
              <input
                type="range"
                min="100"
                max={project.claimedTons}
                step="100"
                value={approvedTons}
                onChange={(e) => setApprovedTons(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* 4. Inspector Remarks */}
          <div className="space-y-2 pt-1 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                4. Statutory Inspection Remarks & Audit Log
              </h5>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span>Auditor ID:</span>
                <input
                  type="text"
                  value={auditorId}
                  onChange={(e) => setAuditorId(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded px-1.5 py-0.5 text-amber-300 font-mono text-[11px] w-28 focus:outline-none"
                />
              </div>
            </div>

            {/* Quick Templates */}
            <div className="flex flex-wrap gap-1.5 pb-1">
              {[
                'Telemetry cross-verified with Northern Regional Load Despatch Centre (NRLDC). Zero leakage.',
                'Soil core analysis and drone LiDAR canopy density confirms 98% claimed carbon sequestered.',
                'Discrepancy in baseline calculation: capacity reduced by 15% due to non-monitored auxiliary load.',
              ].map((template, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyTemplateRemarks(template)}
                  className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-emerald-300 transition-colors truncate max-w-xs"
                  title={template}
                >
                  Template #{idx + 1}
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              required
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter official grounds for approval or rejection, meter serial numbers, discrepancy observations..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-sans"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReject}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-rose-500/40 bg-rose-950/30 text-rose-300 hover:bg-rose-950/60 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Ban className="w-4 h-4 text-rose-400" />
              <span>Reject Project (Flag Discrepancies)</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedProjectForAudit(null)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApprove}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Issue Credits ({approvedTons.toLocaleString()} t)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
