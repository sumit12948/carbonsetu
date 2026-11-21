import { useState } from 'react'
import { useCarbon } from '../context/useCarbon'
import {
  ShieldCheck,
  Search,
  MapPin,
  Sparkles,
  Leaf,
  SunMedium,
  Trees,
  Flame,
  Wind,
  Calendar,
  ArrowRight,
  CreditCard,
} from 'lucide-react'

export default function Marketplace() {
  const {
    projects,
    setSelectedProjectForPayment,
    setSelectedProjectForCheckout,
    quickOffsetTons,
    setQuickOffsetTons,
  } = useCarbon()

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('price-asc')

  const categories = ['All', 'Solar Energy', 'Forestry', 'Biogas', 'Wind']

  // STRICT REQUIREMENT: Displays ONLY VERIFIED projects
  const verifiedProjects = projects.filter((p) => p.status === 'VERIFIED')

  // Filter & Search
  const filteredProjects = verifiedProjects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.coordinates.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'price-asc') return a.pricePerTon - b.pricePerTon
    if (sortBy === 'price-desc') return b.pricePerTon - a.pricePerTon
    if (sortBy === 'tons-desc') return b.availableTons - a.availableTons
    return 0
  })

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Solar Energy':
        return <SunMedium className="w-3.5 h-3.5 text-amber-400" />
      case 'Forestry':
        return <Trees className="w-3.5 h-3.5 text-emerald-400" />
      case 'Biogas':
        return <Flame className="w-3.5 h-3.5 text-rose-400" />
      case 'Wind':
        return <Wind className="w-3.5 h-3.5 text-cyan-400" />
      default:
        return <Leaf className="w-3.5 h-3.5 text-emerald-400" />
    }
  }

  const handleOpenPayment = (project) => {
    setSelectedProjectForPayment(project)
    setSelectedProjectForCheckout(project)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>National Spot Trading Market • Zero Greenwashing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Verified Indian Carbon Credits
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Browse only Government-audited projects verified by Bureau of Energy Efficiency (BEE)
            inspectors. Purchase and immediately retire credits to receive serialized certificates.
          </p>
        </div>

        {quickOffsetTons && (
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Footprint Ready to Offset: <strong>{quickOffsetTons.toFixed(1)} tCO2e</strong>
              </span>
            </div>
            <button
              onClick={() => setQuickOffsetTons(null)}
              className="text-[11px] underline text-amber-400 hover:text-amber-200"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-950/40'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search state, solar, project..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="price-asc">Sort: Price Low to High (₹)</option>
                <option value="price-desc">Sort: Price High to Low (₹)</option>
                <option value="tons-desc">Sort: Available Tons (High to Low)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Project Cards Grid */}
      {sortedProjects.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
          <Leaf className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No Verified Projects Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No verified projects matched your search criteria. Try selecting &quot;All&quot; or resetting the
            search query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project) => {
            const total = project.totalApprovedTons || project.claimedTons
            const percentAvailable = Math.round((project.availableTons / total) * 100)

            return (
              <div
                key={project.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                {/* Project Image Banner */}
                <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={project.photoUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-xs font-semibold text-slate-200">
                    {getCategoryIcon(project.category)}
                    <span>{project.category}</span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-right">
                    <span className="text-[10px] text-slate-400 block font-mono">Price / Ton</span>
                    <span className="text-base font-bold text-emerald-400 font-mono">
                      ₹{project.pricePerTon.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Location Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                  </div>
                </div>

                {/* Project Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    <div className="text-xs text-slate-400 space-y-1 pt-1 border-t border-slate-800">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Developer:</span>
                        <span className="font-medium text-slate-300 truncate max-w-[200px]">
                          {project.developer}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Facility Capacity:</span>
                        <span className="font-mono text-slate-300">{project.capacity}</span>
                      </div>
                    </div>

                    {/* Government Verification Badge - Mandated Spec */}
                    <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-mono">{project.auditorBadge}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>Inspected: {project.inspectionDate}</span>
                        </span>
                        <span className="font-mono text-[10px] text-emerald-400">
                          BEE Field Pass
                        </span>
                      </div>
                    </div>

                    {/* Available Tons Gauge */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Available Mitigation:</span>
                        <span className="font-mono font-bold text-slate-200">
                          {project.availableTons.toLocaleString()} / {total.toLocaleString()} t
                        </span>
                      </div>

                      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                          style={{ width: `${percentAvailable}%` }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Button: Opens Payment Gateway Modal */}
                  <div className="pt-3 border-t border-slate-800">
                    <button
                      onClick={() => handleOpenPayment(project)}
                      disabled={project.availableTons <= 0}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 text-xs disabled:opacity-40 disabled:cursor-not-allowed group/btn"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>
                        {project.availableTons > 0 ? 'Buy & Retire (UPI / Card / NetBanking)' : 'Sold Out'}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
