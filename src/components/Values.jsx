import { motion } from 'motion/react'
import { values } from '../data/content'
import { SplitWords, Icon } from '../lib'

export default function Values() {
  return (
    <section className="values section" aria-labelledby="values-title">
      <div className="section__head">
        <p className="eyebrow">Nos engagements</p>
        <SplitWords as="h2" className="h2" text="Des valeurs dans _chaque bouchée" />
      </div>
      <motion.ul
        className="values__grid"
        initial="h"
        whileInView="s"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ s: { transition: { staggerChildren: 0.12 } } }}
      >
        {values.map((v, i) => (
          <motion.li
            key={v.title}
            className="value"
            variants={{ h: { opacity: 0, y: 60, rotate: i % 2 ? 3 : -3 }, s: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } } }}
            whileHover={{ y: -10 }}
          >
            <span className="value__icon"><Icon name={v.icon} size={28} /></span>
            <span className="value__n">0{i + 1}</span>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
