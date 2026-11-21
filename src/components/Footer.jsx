import { Leaf, ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 mt-auto py-10 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Leaf className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-bold text-slate-100 text-base">CarbonSetu</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              India&apos;s institutional-grade verified carbon credit exchange and public ledger.
              Built to eradicate greenwashing with mandatory field inspections and immutable retirement serials.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
              <span>BEE CCTS Framework</span>
              <span>•</span>
              <span>ISO 14064 Aligned</span>
            </div>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">
              Carbon Standards
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li>Bureau of Energy Efficiency (BEE)</li>
              <li>Ministry of Power & MoEFCC</li>
              <li>National Carbon Registry (India)</li>
              <li>UNFCCC Additionality Protocols</li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">
              Project Categories
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li>Mega Grid Solar PV (Rajasthan, Gujarat)</li>
              <li>Coastal Mangrove Restoration (Sundarbans)</li>
              <li>Agricultural Anaerobic CBG & Biogas</li>
              <li>High-Altitude Wind Corridors (Deccan)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">
              Registry Assurance
            </h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Double Counting</span>
              </div>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                Every unit retired on CarbonSetu is permanently locked and verifiable publicly with
                its unique serialized certificate hash.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p className="text-slate-500">
            © 2026 CarbonSetu India. Operating under National Carbon Credit Trading Scheme Guidelines.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="font-mono text-emerald-400/90">Registry Node: IND-DEL-PRIMARY-01</span>
            <span>•</span>
            <span className="text-slate-500">Public Ledger Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
