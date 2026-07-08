import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import CursorFollower from './components/CursorFollower'
import SEO from './components/SEO'

const Home = lazy(() => import('./pages/Home'))
const Achievements = lazy(() => import('./pages/Achievements'))
const Contributions = lazy(() => import('./pages/Contributions'))
const Covers = lazy(() => import('./pages/Covers'))
const Gallery = lazy(() => import('./pages/Gallery'))

function ScrollRefresher() {
  const location = useLocation()
  useEffect(() => { ScrollTrigger.refresh() }, [location.pathname])
  return null
}

function PageShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <>
      <SEO slug={slug} />
      <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Cargando...</div>}>
        {children}
      </Suspense>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollRefresher />
      <CursorFollower />
      <Navbar />
      <Routes>
        <Route path="/" element={<PageShell slug="home"><Home /></PageShell>} />
        <Route path="/logros" element={<PageShell slug="logros"><Achievements /></PageShell>} />
        <Route path="/aportes" element={<PageShell slug="aportes"><Contributions /></PageShell>} />
        <Route path="/portadas" element={<PageShell slug="portadas"><Covers /></PageShell>} />
        <Route path="/galeria" element={<PageShell slug="galeria"><Gallery /></PageShell>} />
      </Routes>
    </BrowserRouter>
  )
}
