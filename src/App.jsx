import { CarbonProvider } from './context/CarbonContext'
import { useCarbon } from './context/useCarbon'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'
import PaymentGatewayModal from './components/PaymentGatewayModal'
import CertificateModal from './components/CertificateModal'
import FieldAuditModal from './components/FieldAuditModal'

import HomeCalculator from './pages/HomeCalculator'
import Marketplace from './pages/Marketplace'
import DeveloperPortal from './pages/DeveloperPortal'
import GovtAuditorDashboard from './pages/GovtAuditorDashboard'
import BuyerDashboard from './pages/BuyerDashboard'
import VerifyLedger from './pages/VerifyLedger'

function AppContent() {
  const { activeTab } = useCarbon()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Sticky Top Header */}
      <Navbar />

      {/* Main Dynamic View */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && <HomeCalculator />}
        {activeTab === 'marketplace' && <Marketplace />}
        {activeTab === 'developer' && <DeveloperPortal />}
        {activeTab === 'auditor' && <GovtAuditorDashboard />}
        {activeTab === 'buyer' && <BuyerDashboard />}
        {activeTab === 'verify' && <VerifyLedger />}
      </main>

      {/* Global Modals */}
      <PaymentGatewayModal />
      <CertificateModal />
      <FieldAuditModal />

      {/* Global Toast Notifications */}
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <CarbonProvider>
      <AppContent />
    </CarbonProvider>
  )
}
