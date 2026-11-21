import { useCarbon } from '../context/useCarbon'
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react'

export default function Toast() {
  const { toasts, removeToast } = useCarbon()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success'
        const isAmber = toast.type === 'amber'
        const isError = toast.type === 'error'

        const borderClass = isSuccess
          ? 'border-emerald-500/50 bg-slate-900/95 text-emerald-300'
          : isAmber
          ? 'border-amber-500/50 bg-slate-900/95 text-amber-300'
          : isError
          ? 'border-rose-500/50 bg-slate-900/95 text-rose-300'
          : 'border-cyan-500/50 bg-slate-900/95 text-cyan-300'

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 ${borderClass}`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isAmber && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {!isSuccess && !isAmber && !isError && <Info className="w-5 h-5 text-cyan-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-100">{toast.title}</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-slate-400 hover:text-slate-100 transition-colors p-1"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
