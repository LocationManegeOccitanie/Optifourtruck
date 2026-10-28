import { useRef } from 'react'
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame, useReducedMotion } from 'motion/react'
import { ribbon } from '../data/content'

const wrap = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min }

// Ruban qui défile en continu, accélère et s'incline avec la vitesse de défilement
function Row({ base = 3, children, tilt }) {
  const x = useMotionValue(0)
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(vel, [-1500, 0, 1500], [-4, 0, 4], { clamp: false })
  const skew = useTransform(vel, [-2000, 2000], [-6, 6])
  const dir = useRef(1)
  const pos = useTransform(x, (v) => `${wrap(-50, 0, v)}%`)

  useAnimationFrame((_, d) => {
    if (reduce) return
    let move = dir.current * base * (d / 1000)
    if (factor.get() < 0) dir.current = -1
    else if (factor.get() > 0) dir.current = 1
    move += dir.current * move * factor.get()
    x.set(x.get() + move)
  })

  return (
    <div className={`ribbon ${tilt ? 'ribbon--tilt' : ''}`}>
      <motion.div className="ribbon__track" style={{ x: pos, skewX: skew }}>
        {children}{children}
      </motion.div>
    </div>
  )
}

export default function Ribbon() {
  const items = ribbon.map((t, i) => (
    <span key={i} className="ribbon__item">{t}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 5 5 9 10 10-5 1-9 5-10 10-1-5-5-9-10-10 5-1 9-5 10-10z" /></svg></span>
  ))
  return (
    <section className="ribbons" aria-label="Nos spécialités">
      <Row base={-2.2}>{items}</Row>
      <Row base={2.2} tilt>{items}</Row>
    </section>
  )
}
