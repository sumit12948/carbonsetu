import { useState, useEffect } from 'react'
import { CarbonContext } from './CarbonContextInstance'
import { INITIAL_PROJECTS, INITIAL_RETIREMENTS } from './initialData'

export function CarbonProvider({ children }) {
  // 1. Current Role: 'buyer' | 'developer' | 'auditor'
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('carbonsetu_role') || 'buyer'
  })

  // 2. Active Tab: 'home' | 'marketplace' | 'developer' | 'auditor' | 'buyer' | 'verify'
  const [activeTab, setActiveTab] = useState('home')

  // 3. Projects State
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('carbonsetu_projects')
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS
    } catch {
      return INITIAL_PROJECTS
    }
  })

  // 4. Retirements / Ledger State
  const [retirements, setRetirements] = useState(() => {
    try {
      const saved = localStorage.getItem('carbonsetu_retirements')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Ensure legacy stored items also have paymentId and totalPaid
        return parsed.map((item, idx) => ({
          paymentId: item.paymentId || `pay_IND2026${849100 + idx}`,
          paymentMethod: item.paymentMethod || 'UPI / Instant QR',
          totalPaid: item.totalPaid || item.totalAmount,
          gstin: item.gstin || (item.buyerPan ? `09${item.buyerPan}1ZZ` : '09AAACH7409R1ZZ'),
          baseAmount: item.baseAmount || item.totalAmount,
          platformFee: item.platformFee || Math.round(item.totalAmount * 0.02),
          gstAmount: item.gstAmount || Math.round(item.totalAmount * 0.02 * 0.18),
          ...item,
        }))
      }
      return INITIAL_RETIREMENTS
    } catch {
      return INITIAL_RETIREMENTS
    }
  })

  // 5. User Footprint State (Inputs & Calculation)
  const [footprintInputs, setFootprintInputs] = useState({
    electricityKWh: 450, // kWh / month
    commuteKm: 1200,      // km / month
    flightHours: 4,       // hours / month
    lpgCylinders: 2,      // cylinders / month
  })

  // Quick offset tons carried over from calculator to marketplace
  const [quickOffsetTons, setQuickOffsetTons] = useState(null)

  // Active Modals
  const [selectedProjectForPayment, setSelectedProjectForPayment] = useState(null)
  const [selectedProjectForCheckout, setSelectedProjectForCheckout] = useState(null)
  const [selectedCertificateForView, setSelectedCertificateForView] = useState(null)
  const [selectedProjectForAudit, setSelectedProjectForAudit] = useState(null)
  const [ledgerSearchQuery, setLedgerSearchQuery] = useState('IND-BEE-2026-4892')

  // Toast Notifications
  const [toasts, setToasts] = useState([])

  const addToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4500)
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem('carbonsetu_role', currentRole)
  }, [currentRole])

  useEffect(() => {
    localStorage.setItem('carbonsetu_projects', JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    localStorage.setItem('carbonsetu_retirements', JSON.stringify(retirements))
  }, [retirements])

  // Calculation logic for Footprint
  const electricityTonsMonthly = Number((footprintInputs.electricityKWh * 0.00082).toFixed(3))
  const commuteTonsMonthly = Number((footprintInputs.commuteKm * 0.000192).toFixed(3))
  const flightTonsMonthly = Number((footprintInputs.flightHours * 0.09).toFixed(3))
  const lpgTonsMonthly = Number((footprintInputs.lpgCylinders * 0.024).toFixed(3))

  const totalMonthlyTons = Number(
    (electricityTonsMonthly + commuteTonsMonthly + flightTonsMonthly + lpgTonsMonthly).toFixed(2)
  )
  const totalAnnualTons = Number((totalMonthlyTons * 12).toFixed(2))

  // Actions
  const submitProject = (projectData) => {
    const newProject = {
      id: `proj-${Date.now()}`,
      title: projectData.title,
      category: projectData.category || 'Solar Energy',
      developer: projectData.developer || 'Registered Project Proponent',
      location: projectData.location,
      coordinates: projectData.coordinates || '28.6139° N, 77.2090° E',
      capacity: projectData.capacity,
      claimedTons: Number(projectData.claimedTons),
      availableTons: 0,
      totalApprovedTons: 0,
      pricePerTon: Number(projectData.pricePerTon),
      status: 'PENDING_INSPECTION',
      auditorBadge: null,
      auditorId: null,
      inspectionDate: null,
      inspectorRemarks: null,
      supportingDocName: projectData.supportingDocName || 'Project_Design_Document_PDD.pdf',
      methodology: projectData.methodology || 'BEE Indian Carbon Market Approved Methodology',
      submissionDate: new Date().toISOString().split('T')[0],
      description:
        projectData.description ||
        'Verified emission reduction initiative submitted for BEE on-ground verification.',
      photoUrl:
        projectData.photoUrl ||
        'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80',
      checklist: {
        physicalSiteVisited: false,
        gpsMatched: false,
        machineryVerified: false,
        noDoubleCounting: false,
      },
    }

    setProjects((prev) => [newProject, ...prev])
    addToast(
      'Project Submitted Successfully',
      `"${newProject.title}" is queued for Government Field Audit (BEE).`,
      'amber'
    )
    return newProject
  }

  const approveOrRejectProject = (
    projectId,
    { status, approvedTons, remarks, auditorId, checklist, photoUrl }
  ) => {
    let updatedProjectTitle = ''
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p
        updatedProjectTitle = p.title
        const verifiedTons = Number(approvedTons || p.claimedTons)
        if (status === 'VERIFIED') {
          return {
            ...p,
            status: 'VERIFIED',
            availableTons: verifiedTons,
            totalApprovedTons: verifiedTons,
            auditorBadge: `✓ Verified by Govt Auditor (ID: ${auditorId || '#GOV-BEE-402'})`,
            auditorId: auditorId || '#GOV-BEE-402',
            inspectionDate: new Date().toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }),
            inspectorRemarks: remarks,
            checklist: checklist || p.checklist,
            photoUrl: photoUrl || p.photoUrl,
          }
        } else {
          return {
            ...p,
            status: 'REJECTED',
            availableTons: 0,
            auditorBadge: null,
            auditorId: auditorId || '#GOV-BEE-402',
            inspectionDate: new Date().toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }),
            inspectorRemarks: remarks,
            checklist: checklist || p.checklist,
          }
        }
      })
    )

    if (status === 'VERIFIED') {
      addToast(
        'Credits Approved & Published!',
        `${approvedTons} Tons approved for "${updatedProjectTitle}". Now live on Marketplace.`,
        'success'
      )
    } else {
      addToast(
        'Project Rejected',
        `Audit discrepancies recorded for "${updatedProjectTitle}". Status updated to REJECTED.`,
        'error'
      )
    }
  }

  // Enhanced buyAndRetireCredits with Indian Payment Gateway integration
  const buyAndRetireCredits = ({
    projectId,
    tons,
    quantity,
    buyerName,
    buyerPan,
    buyerEmail,
    beneficiaryReason,
    gstin,
    paymentMethod,
    totalPaid,
    paymentId,
  }) => {
    const project = projects.find((p) => p.id === projectId)
    if (!project) throw new Error('Project not found')

    const actualTons = Number(tons !== undefined ? tons : quantity)
    if (project.availableTons < actualTons) {
      throw new Error(`Only ${project.availableTons} tons currently available.`)
    }

    const serialNumber = `IND-BEE-2026-${Math.floor(1000 + Math.random() * 9000)}`
    const now = new Date()
    const retirementTimestamp = `${now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })}, ${now.toLocaleTimeString('en-GB')} IST`

    const randomHex = Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('')
    const certificateHash = `0x${randomHex}`

    // Financial calculations
    const baseCreditCost = actualTons * project.pricePerTon
    const platformFee = Math.round(baseCreditCost * 0.02)
    const gstAmount = Math.round(platformFee * 0.18)
    const computedTotal = baseCreditCost + platformFee + gstAmount
    const finalAmountPaid = totalPaid !== undefined ? Number(totalPaid) : computedTotal

    const resolvedPaymentId =
      paymentId || `pay_IND2026${Math.floor(100000 + Math.random() * 900000)}`
    const resolvedMethod = paymentMethod || 'UPI / Instant QR'
    const resolvedGstin = gstin || '09AAACH7409R1ZZ'
    const resolvedPan =
      buyerPan || (resolvedGstin ? resolvedGstin.substring(2, 12) : 'AAACB1234K')

    const newRetirement = {
      serialNumber,
      paymentId: resolvedPaymentId,
      paymentMethod: resolvedMethod,
      buyerName: buyerName || 'Enterprise Sustainability Client',
      buyerEmail: buyerEmail || 'esg@enterprise.in',
      buyerPan: resolvedPan,
      gstin: resolvedGstin,
      projectId: project.id,
      projectName: project.title,
      category: project.category,
      location: project.location,
      tonsRetired: actualTons,
      pricePerTon: project.pricePerTon,
      baseAmount: baseCreditCost,
      platformFee: platformFee,
      gstAmount: gstAmount,
      totalAmount: finalAmountPaid,
      totalPaid: finalAmountPaid,
      retirementTimestamp,
      auditorId: project.auditorId || '#GOV-BEE-402',
      beneficiaryReason:
        beneficiaryReason || 'Voluntary Corporate GHG Net-Zero Commitment',
      certificateHash,
    }

    // Deduct available tons from project
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p
        return {
          ...p,
          availableTons: Math.max(0, p.availableTons - actualTons),
        }
      })
    )

    // Store in retirements ledger
    setRetirements((prev) => [newRetirement, ...prev])

    addToast(
      'Payment Received & Credits Retired!',
      `Paid ₹${finalAmountPaid.toLocaleString('en-IN')} via ${resolvedMethod}. Ref: ${resolvedPaymentId}`,
      'success'
    )

    return newRetirement
  }

  const resetToDefaults = () => {
    localStorage.removeItem('carbonsetu_projects')
    localStorage.removeItem('carbonsetu_retirements')
    setProjects(INITIAL_PROJECTS)
    setRetirements(INITIAL_RETIREMENTS)
    addToast(
      'Registry Reset',
      'Demostore initialized with default Indian projects, payment IDs & certificates.',
      'info'
    )
  }

  const navigateToLedgerWithSerial = (serial) => {
    setLedgerSearchQuery(serial)
    setActiveTab('verify')
  }

  const startOffsetFromCalculator = (tons) => {
    setQuickOffsetTons(tons)
    setActiveTab('marketplace')
    addToast(
      'Footprint Loaded',
      `${tons} Tons CO2e transferred to Marketplace payment checkout!`,
      'info'
    )
  }

  return (
    <CarbonContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeTab,
        setActiveTab,
        projects,
        retirements,
        footprintInputs,
        setFootprintInputs,
        electricityTonsMonthly,
        commuteTonsMonthly,
        flightTonsMonthly,
        lpgTonsMonthly,
        totalMonthlyTons,
        totalAnnualTons,
        quickOffsetTons,
        setQuickOffsetTons,
        selectedProjectForPayment,
        setSelectedProjectForPayment,
        selectedProjectForCheckout,
        setSelectedProjectForCheckout,
        selectedCertificateForView,
        setSelectedCertificateForView,
        selectedProjectForAudit,
        setSelectedProjectForAudit,
        ledgerSearchQuery,
        setLedgerSearchQuery,
        toasts,
        addToast,
        removeToast,
        submitProject,
        approveOrRejectProject,
        buyAndRetireCredits,
        resetToDefaults,
        navigateToLedgerWithSerial,
        startOffsetFromCalculator,
      }}
    >
      {children}
    </CarbonContext.Provider>
  )
}
