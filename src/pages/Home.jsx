import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import Ribbon from '../components/Ribbon'
import Story from '../components/Story'
import Services from '../components/Services'
import Gallery from '../components/Gallery'
import Reviews from '../components/Reviews'
import { CtaBand } from '../components/Blocks'

export default function Home() {
  // L'animation d'entrée démarre après l'hydratation (le HTML pré-rendu contient déjà tout le texte)
  const [ready, setReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t) }, [])
  return (
    <>
      <Hero ready={ready} />
      <Ribbon />
      <Story />
      <Services />
      <Gallery limit={8} showFilters={false} moreLink="/galerie/" title="Quelques _créations" />
      <Reviews />
      <CtaBand />
    </>
  )
}
