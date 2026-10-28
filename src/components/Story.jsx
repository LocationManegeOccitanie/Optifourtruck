import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { img, byIndex } from '../data/photos'
import { SplitWords, Reveal } from '../lib'

const manifesto =
  "Derrière O P'tit Four Truck, il y a Alicia. Une jeune entrepreneuse animée depuis toujours par la pâtisserie et la cuisine — et surtout par l'envie de faire les choses avec sens. Des produits frais, locaux, travaillés avec soin, pour que chaque création raconte une histoire simple et sincère."

// Chaque mot s'illumine au fil du défilement
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const color = useTransform(progress, range, ['#8a7470', '#3B2626'])
  return <motion.span style={{ opacity, color }} className="m-word">{children} </motion.span>
}

export default function Story() {
  const textRef = useRef(null)
  const imgRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: textRef, offset: ['start 0.85', 'end 0.45'] })
  const { scrollYProgress: imgP } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const clip = useTransform(imgP, [0, 0.35], ['inset(18% 18% 18% 18% round 300px)', 'inset(0% 0% 0% 0% round 300px 300px 24px 24px)'])
  const scale = useTransform(imgP, [0, 1], [1.25, 1])
  const words = manifesto.split(' ')

  return (
    <section id="histoire" className="story section">
      <div className="story__grid">
        <div className="story__media" ref={imgRef}>
          <motion.div className="story__frame" style={{ clipPath: clip }}>
            <motion.img src={img(byIndex(9), 1000)} alt="Pièce montée aux roses rouges réalisée par Alicia" style={{ scale }} loading="lazy" />
          </motion.div>
          <Reveal className="story__sign" delay={0.2}>
            <span className="script">Alicia</span>
            <small>Fondatrice & chef pâtissière</small>
          </Reveal>
        </div>

        <div className="story__content">
          <p className="eyebrow">Notre histoire</p>
          <SplitWords as="h2" className="h2" text="Une passion devenue _métier" />
          <p className="story__manifesto" ref={textRef}>
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
            ))}
          </p>
          <Reveal className="story__origin">
            <span className="story__age">20<small>ans</small></span>
            <p>C'est l'âge auquel Alicia décide de transformer sa passion en projet professionnel : une voie exigeante, celle du « fait avec intention ».</p>
          </Reveal>
        </div>
      </div>

      <ul className="facts">
        {[
          ['100 %', 'fait maison'],
          ['0', 'additif ni conservateur'],
          ['48 h', 'pour recevoir votre devis'],
          ['09 · 31', 'livraison Ariège & Haute-Garonne'],
        ].map(([n, l], i) => (
          <Reveal as="li" key={l} delay={i * 0.08}>
            <strong>{n}</strong><span>{l}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
