import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { MotionConfig, AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import Head from './components/Head'
import Home from './pages/Home'
import { SavoirFaire, Prestations, ServicePage, Galerie, Avis, Devis, NotFound } from './pages/Pages'

export default function App() {
  const reduce = useReducedMotion()
  const location = useLocation()

  // Défilement fluide, chargé uniquement dans le navigateur
  useEffect(() => {
    if (reduce) return
    let lenis, id
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true })
      window.__lenis = lenis
      const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf) }
      id = requestAnimationFrame(raf)
    })
    return () => { cancelAnimationFrame(id); lenis?.destroy(); window.__lenis = null }
  }, [reduce])

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
      <Head />
      <a className="skip" href="#main">Aller au contenu</a>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <AnimatePresence mode="wait" initial={false} onExitComplete={toTop}>
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/savoir-faire" element={<SavoirFaire />} />
            <Route path="/prestations" element={<Prestations />} />
            <Route path="/prestations/:slug" element={<ServicePage />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/avis" element={<Avis />} />
            <Route path="/devis" element={<Devis />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  )
}
