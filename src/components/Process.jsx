import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { steps } from '../data/content'
import { SplitWords } from '../lib'

// Frise verticale : le fil se "dessine" au fil du défilement
export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const len = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })

  return (
    <section className="process section" aria-labelledby="process-title">
      <div className="section__head">
        <p className="eyebrow">Notre approche</p>
        <SplitWords as="h2" className="h2" text="De l'idée à la _dégustation" />
      </div>
      <div className="process__wrap" ref={ref}>
        <svg className="process__line" viewBox="0 0 10 1000" preserveAspectRatio="none" aria-hidden="true">
          <path d="M5 0 V1000" className="process__line-bg" />
          <motion.path d="M5 0 V1000" className="process__line-fg" style={{ pathLength: len }} />
        </svg>
        <ol className="process__list">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              className={`step ${i % 2 ? 'step--right' : ''}`}
              initial={{ opacity: 0, x: i % 2 ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: 'spring', stiffness: 70, damping: 16 }}
            >
              <motion.span
                className="step__dot"
                initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.2 }}
              />
              <span className="step__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
