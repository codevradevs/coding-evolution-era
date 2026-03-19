import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProductsPage from './pages/ProductsPage';
import BlogsPage from './pages/BlogsPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import ToolsHubPage from './pages/ToolsHubPage';
import VaultPage from './pages/VaultPage';
import ArenaPage from './pages/ArenaPage';
import TrackerPage from './pages/TrackerPage';
import NetworkPage from './pages/NetworkPage';
import DevIntelPage from './pages/DevIntelPage';
import FunLabPage from './pages/FunLabPage';
import ThreeDLabPage from './pages/ThreeDLabPage';
import AnimationLabPage from './pages/AnimationLabPage';
import CodeBattlePage from './pages/CodeBattlePage';
import CyberSimulatorPage from './pages/CyberSimulatorPage';
import LogicPuzzlesPage from './pages/LogicPuzzlesPage';
import ChaosModePage from './pages/ChaosModePage';
import DocsPage from './pages/DocsPage';
import AuthPage from './pages/AuthPage';
import Chatbot from './components/Chatbot';
import AuthCallbackPage from './pages/AuthCallbackPage';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/blog" element={<BlogsPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/hub/tools" element={<ToolsHubPage />} />
              <Route path="/hub/vault" element={<VaultPage />} />
              <Route path="/hub/arena" element={<ArenaPage />} />
              <Route path="/hub/tracker" element={<TrackerPage />} />
              <Route path="/hub/network" element={<NetworkPage />} />
              <Route path="/hub/tips" element={<DevIntelPage />} />
              <Route path="/fun-lab" element={<FunLabPage />} />
              <Route path="/fun-lab/3d" element={<ThreeDLabPage />} />
              <Route path="/fun-lab/animation" element={<AnimationLabPage />} />
              <Route path="/fun-lab/code" element={<CodeBattlePage />} />
              <Route path="/fun-lab/cyber" element={<CyberSimulatorPage />} />
              <Route path="/fun-lab/games" element={<LogicPuzzlesPage />} />
              <Route path="/fun-lab/chaos" element={<ChaosModePage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/auth/login" element={<AuthPage />} />
              <Route path="/auth/register" element={<AuthPage />} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
