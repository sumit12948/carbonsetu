import { useState } from 'react'
import { useCarbon } from '../context/useCarbon'
import {
  ShieldCheck,
  Leaf,
  Store,
  Calculator,
  Building2,
  FileCheck2,
  Search,
  CheckCircle2,
  Menu,
  X,
  RotateCcw,
} from 'lucide-react'

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    currentRole,
    setCurrentRole,
    projects,
    retirements,
    resetToDefaults,
  } = useCarbon()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false)

  const pendingAuditsCount = projects.filter((p) => p.status === 'PENDING_INSPECTION').length
  const verifiedProjectsCount = projects.filter((p) => p.status === 'VERIFIED').length

  const roles = [
    {
      id: 'buyer',
      label: 'Buyer / Company',
      badge: 'ESG & Corporate',
      icon: Building2,
      desc: 'Buy, offset footprint & receive serialized retirement certificates',
    },
    {
      id: 'developer',
      label: 'Project Developer',
      badge: 'Clean Tech Proponent',
      icon: Leaf,
      desc: 'Submit green projects, track audits & monetize carbon reductions',
    },
    {
      id: 'auditor',
      label: 'Govt Auditor',
      badge: 'BEE / MoEFCC Official',
      icon: ShieldCheck,
      desc: 'Conduct field inspections, verify telemetry & issue market credits',
    },
  ]

  const navItems = [
    {
      id: 'home',
      label: 'Home & Calculator',
      icon: Calculator,
    },
    {
      id: 'marketplace',
      label: 'Marketplace',
      icon: Store,
      badge: verifiedProjectsCount > 0 ? `${verifiedProjectsCount}` : null,
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    },
    {
      id: 'developer',
      label: 'Developer Portal',
      icon: Leaf,
    },
    {
      id: 'auditor',
      label: 'Govt Inspector',
      icon: ShieldCheck,
      badge: pendingAuditsCount > 0 ? `${pendingAuditsCount} pending` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse',
    },
    {
      id: 'buyer',
      label: 'Buyer Dashboard',
      icon: FileCheck2,
      badge: retirements.length > 0 ? `${retirements.length}` : null,
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    },
    {
      id: 'verify',
      label: 'Verify Ledger',
      icon: Search,
    },
  ]

  const handleRoleSelect = (roleId) => {
    setCurrentRole(roleId)
    setRoleDropdownOpen(false)
    if (roleId === 'auditor') setActiveTab('auditor')
    if (roleId === 'developer') setActiveTab('developer')
    if (roleId === 'buyer') setActiveTab('marketplace')
  }

  const activeRoleObj = roles.find((r) => r.id === currentRole) || roles[0]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      {/* Top micro-bar: National Registry Status Banner */}
      <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-1 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              BEE National Carbon Framework V2.4 Live
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">
              India&apos;s Zero-Greenwashing Public Ledger
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetToDefaults}
              title="Reset demo data to initial Indian sample projects"
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden md:inline">Reset Demo Data</span>
            </button>
            <div className="text-[11px] font-mono text-emerald-400/90 hidden lg:block">
              1 tCO2e = 1 Certified Credit
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-950 flex items-center justify-center">
                <ShieldCheck className="w-2.5 h-2.5 text-slate-950" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-slate-100 tracking-tight">
                  Carbon<span className="text-emerald-400">Setu</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  India
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                Govt Audited Registry
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-slate-900 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded-full ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                  Current Persona
                </p>
                <p className="text-xs font-semibold text-slate-200">{activeRoleObj.label}</p>
              </div>

              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
                  currentRole === 'auditor'
                    ? 'bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-950/60'
                    : currentRole === 'developer'
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/60'
                    : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-600'
                }`}
                aria-label="Switch User Role"
              >
                <activeRoleObj.icon className="w-4 h-4 shrink-0" />
                <span className="hidden md:inline font-medium">{activeRoleObj.label}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  Switch
                </span>
              </button>
            </div>

            {/* Dropdown Menu */}
            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-xs font-semibold text-slate-200">Switch Stakeholder Journey</p>
                  <p className="text-[11px] text-slate-400">
                    Experience CarbonSetu from all 3 perspectives:
                  </p>
                </div>
                <div className="mt-1 space-y-1">
                  {roles.map((r) => {
                    const RoleIcon = r.icon
                    const isSelected = currentRole === r.id
                    return (
                      <button
                        key={r.id}
                        onClick={() => handleRoleSelect(r.id)}
                        className={`w-full text-left p-2.5 rounded-xl flex items-start gap-3 transition-colors ${
                          isSelected
                            ? 'bg-emerald-950/60 border border-emerald-500/40 text-slate-100'
                            : 'hover:bg-slate-800/70 text-slate-300'
                        }`}
                      >
                        <div
                          className={`mt-0.5 p-2 rounded-lg shrink-0 ${
                            isSelected
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          <RoleIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-100">{r.label}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                              {r.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{r.desc}</p>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setMobileMenuOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-slate-900 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </header>
  )
}
