import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/useAuth'
import Sidebar from './components/Sidebar'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import UsersPage from './pages/UsersPage'
import RankingsPage from './pages/RankingsPage'
import BlogsPage from './pages/BlogsPage'
import ContactsPage from './pages/ContactsPage'
import TipsPage from './pages/TipsPage'
import ChallengesPage from './pages/ChallengesPage'
import ProductsPage from './pages/ProductsPage'
import CertificatesPage from './pages/CertificatesPage'
import QuotesPage from './pages/QuotesPage'
import { SubmissionsPage, VaultPage, TrackerPage, NetworkPage, UserProfilesPage } from './pages/DataPages'

const Layout = ({ children }) => (
  <div className="flex min-h-screen bg-dark-950">
    <Sidebar />
    <main className="flex-1 p-8 overflow-auto bg-grid-pattern">
      <div className="max-w-6xl mx-auto">{children}</div>
    </main>
  </div>
)

const ProtectedRoute = ({ children }) => {
  const { admin } = useAuth()
  return admin ? <Layout>{children}</Layout> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/"            element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/users"       element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
          <Route path="/rankings"    element={<ProtectedRoute><RankingsPage /></ProtectedRoute>} />
          <Route path="/blogs"       element={<ProtectedRoute><BlogsPage /></ProtectedRoute>} />
          <Route path="/tips"        element={<ProtectedRoute><TipsPage /></ProtectedRoute>} />
          <Route path="/challenges"  element={<ProtectedRoute><ChallengesPage /></ProtectedRoute>} />
          <Route path="/products"    element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
          <Route path="/certificates" element={<ProtectedRoute><CertificatesPage /></ProtectedRoute>} />
          <Route path="/quotes"      element={<ProtectedRoute><QuotesPage /></ProtectedRoute>} />
          <Route path="/submissions" element={<ProtectedRoute><SubmissionsPage /></ProtectedRoute>} />
          <Route path="/vault"       element={<ProtectedRoute><VaultPage /></ProtectedRoute>} />
          <Route path="/tracker"     element={<ProtectedRoute><TrackerPage /></ProtectedRoute>} />
          <Route path="/network"     element={<ProtectedRoute><NetworkPage /></ProtectedRoute>} />
          <Route path="/userprofiles" element={<ProtectedRoute><UserProfilesPage /></ProtectedRoute>} />
          <Route path="/contacts"    element={<ProtectedRoute><ContactsPage /></ProtectedRoute>} />
          <Route path="*"            element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
