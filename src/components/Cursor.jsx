import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

// Curseur "bulle de crème" : grossit et affiche un libellé sur les éléments [data-cursor]
export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
  const [label, setLabel] = useState('')
  const [hover, setHover] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setEnabled(mq.matches)
    if (!mq.matches) return
    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY)
      const t = e.target.closest?.('[data-cursor], a, button')
      setHover(!!t)
      setLabel(t?.dataset?.cursor || '')
    }
    window.addEventListener('pointermove', move)
    document.documentElement.classList.add('has-cursor')
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <motion.div
      className="cursor"
      style={{ x: sx, y: sy }}
      animate={{ width: label ? 92 : hover ? 46 : 14, height: label ? 92 : hover ? 46 : 14 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      aria-hidden="true"
    >
      {label && (
        <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
          {label}
        </motion.span>
      )}
    </motion.div>
  )
}
