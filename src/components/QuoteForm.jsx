import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  occasions, services, flavours, diets, slots, departments, guestPresets,
  budgets, contactPrefs, steps, emptyQuote,
} from '../data/quote'
import { contact } from '../data/content'
import { img, byIndex } from '../data/photos'
import { hasSupabase, getSupabase } from '../supabase'
import { Icon } from '../lib'

const DRAFT = 'optifour-devis-brouillon'
const label = (list, id) => list.find((x) => x.id === id)?.label ?? ''
const today = () => new Date().toISOString().slice(0, 10)
const daysUntil = (d) => Math.round((new Date(d) - new Date(today())) / 86400000)
const frDate = (d) => d ? new Date(d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ''
const PHONE = /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const readDraft = () => { try { return JSON.parse(localStorage.getItem(DRAFT)) } catch { return null } }
const saveDraft = (v) => { try { localStorage.setItem(DRAFT, JSON.stringify(v)) } catch { /* stockage indisponible */ } }
const clearDraft = () => { try { localStorage.removeItem(DRAFT) } catch { /* idem */ } }

// Validation par étape : renvoie { champ: message }
function validate(step, q) {
  const e = {}
  if (step === 0 && !q.occasion) e.occasion = 'Choisissez le type d’événement pour continuer.'
  if (step === 1 && !q.services.length) e.services = 'Sélectionnez au moins une prestation.'
  if (step === 2) {
    if (!q.eventDate) e.eventDate = 'Indiquez la date, même approximative.'
    else if (q.eventDate < today()) e.eventDate = 'Cette date est déjà passée.'
    if (!q.eventCity.trim()) e.eventCity = 'Indiquez la ville de l’événement pour la livraison.'
    if (!q.guestCount || q.guestCount < 1) e.guestCount = 'Indiquez un nombre d’invités.'
  }
  if (step === 3 && !q.budget) e.budget = 'Choisissez une fourchette (ou « Je ne sais pas encore »).'
  if (step === 4) {
    if (!q.firstName.trim()) e.firstName = 'Votre prénom est nécessaire.'
    if (!q.lastName.trim()) e.lastName = 'Votre nom est nécessaire.'
    if (!EMAIL.test(q.email.trim())) e.email = 'Adresse e-mail invalide, par ex. prenom@mail.fr'
    const needPhone = q.contactPreference !== 'email'
    if (needPhone && !q.phone.trim()) e.phone = 'Indiquez un numéro pour être rappelé·e.'
    else if (q.phone.trim() && !PHONE.test(q.phone.trim())) e.phone = 'Numéro invalide, par ex. 06 12 34 56 78'
  }
  if (step === 5 && !q.consent) e.consent = 'Merci d’accepter d’être recontacté·e au sujet de votre demande.'
  return e
}

// Description envoyée à Alicia : regroupe les détails qui n'ont pas de colonne dédiée
function buildDescription(q) {
  const lines = [`Occasion : ${label(occasions, q.occasion)}`]
  if (q.flavours.length) lines.push(`Saveurs : ${q.flavours.join(', ')}`)
  if (q.diets.length) lines.push(`Régimes / allergies : ${q.diets.join(', ')}`)
  if (q.projectDescription.trim()) lines.push('', q.projectDescription.trim())
  return lines.join('\n')
}

export default function QuoteForm() {
  const [q, setQ] = useState(emptyQuote)
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [draft, setDraft] = useState(null)
  const [boot, setBoot] = useState(0) // force un nouveau rendu des étapes après un pré-remplissage
  const panel = useRef(null)
  const trap = useRef(null)

  useEffect(() => {
    // Lien depuis une page prestation : /devis/?occasion=mariage
    const pre = new URLSearchParams(window.location.search).get('occasion')
    if (pre && occasions.some((o) => o.id === pre)) {
      setQ((p) => ({ ...p, occasion: pre }))
      setStep(1)
      setBoot(1)
      return
    }
    const d = readDraft()
    if (d?.q?.occasion) setDraft(d)
  }, [])

  useEffect(() => {
    if (status === 'done' || !q.occasion) return
    saveDraft({ q, step })
  }, [q, step, status])

  const set = (k, v) => { setQ((p) => ({ ...p, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })) }
  const toggle = (k, v) => {
    setQ((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const go = (n) => {
    setDir(n > step ? 1 : -1)
    setStep(n)
    setErrors({})
    requestAnimationFrame(() => panel.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }))
    setTimeout(() => panel.current?.querySelector('h3')?.focus(), 450)
  }

  const next = () => {
    const e = validate(step, q)
    setErrors(e)
    if (Object.keys(e).length) {
      setTimeout(() => panel.current?.querySelector('[aria-invalid="true"], .is-invalid button, .is-invalid input')?.focus(), 30)
      return
    }
    if (step < steps.length - 1) go(step + 1)
    else submit()
  }

  // Sur l'étape 0, choisir une occasion fait avancer directement
  const pickOccasion = (id) => { set('occasion', id); setDir(1); setTimeout(() => go(1), 260) }

  const payload = useMemo(() => ({
    eventCategory: occasions.find((o) => o.id === q.occasion)?.category ?? 'other',
    eventDate: q.eventDate,
    eventCity: q.eventCity.trim(),
    eventDepartment: label(departments, q.eventDepartment),
    guestCount: String(q.guestCount),
    eventTime: q.eventTime,
    services: q.services,
    projectDescription: buildDescription(q),
    budget: q.budget,
    firstName: q.firstName.trim(),
    lastName: q.lastName.trim(),
    email: q.email.trim(),
    phone: q.phone.trim(),
    contactPreference: q.contactPreference,
  }), [q])

  const mailto = useMemo(() => {
    const body = [
      'Bonjour Alicia,', '',
      `Occasion : ${label(occasions, q.occasion)}`,
      `Date : ${frDate(q.eventDate)} ${q.eventTime ? '(' + q.eventTime + ')' : ''}`,
      `Lieu : ${q.eventCity} (${label(departments, q.eventDepartment)})`,
      `Invités : ${q.guestCount}`,
      `Prestations : ${q.services.map((s) => label(services, s)).join(', ')}`,
      `Budget : ${label(budgets, q.budget)}`, '',
      buildDescription(q), '',
      `${q.firstName} ${q.lastName} — ${q.email} ${q.phone}`,
    ].join('\n')
    return `mailto:${contact.email}?subject=${encodeURIComponent('Demande de devis — ' + label(occasions, q.occasion))}&body=${encodeURIComponent(body)}`
  }, [q])

  async function submit() {
    if (trap.current?.value) { setStatus('done'); return } // robot détecté : on ne l'informe pas
    if (!hasSupabase) { window.location.href = mailto; setStatus('done'); clearDraft(); return }
    setStatus('sending')
    let supabase
    try { supabase = await getSupabase() } catch (err) { console.error(err); setStatus('error'); return }
    const p = payload
    const { error } = await supabase.from('quote_requests').insert({
      event_category: p.eventCategory,
      event_date: p.eventDate || null,
      event_city: p.eventCity || null,
      event_department: p.eventDepartment || null,
      guest_count: p.guestCount || null,
      event_time: p.eventTime || null,
      services: p.services,
      project_description: p.projectDescription || null,
      budget: p.budget || null,
      first_name: p.firstName,
      last_name: p.lastName,
      email: p.email,
      phone: p.phone || null,
      contact_preference: p.contactPreference,
    })
    if (error) { console.error(error); setStatus('error'); return }
    // Notification e-mail à Alicia (non bloquante, comme sur l'ancien site)
    supabase.functions.invoke('send-quote-notification', { body: p }).catch((err) => console.error(err))
    clearDraft()
    setStatus('done')
  }

  const reset = () => { setQ(emptyQuote); setStep(0); setStatus('idle'); setErrors({}); clearDraft() }

  if (status === 'done') return <Success q={q} onReset={reset} />

  return (
    <div className="quote">
      <AnimatePresence>
        {draft && (
          <motion.div className="quote__draft" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0, marginBottom: 0 }}>
            <span><Icon name="heart" size={18} /> Vous aviez commencé une demande ({label(occasions, draft.q.occasion)}).</span>
            <span className="quote__draft-btns">
              <button type="button" className="link-underline" onClick={() => { setQ({ ...emptyQuote, ...draft.q }); setStep(draft.step ?? 0); setBoot((b) => b + 1); setDraft(null) }}>Reprendre</button>
              <button type="button" onClick={() => { clearDraft(); setDraft(null) }}>Ignorer</button>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="quote__grid">
        <form className="quote__form" ref={panel} noValidate onSubmit={(e) => { e.preventDefault(); next() }}>
          <Progress step={step} onJump={(n) => n < step && go(n)} />

          {/* champ piège invisible pour les robots */}
          <input ref={trap} name="website" tabIndex={-1} autoComplete="off" className="quote__trap" aria-hidden="true" />

          <div className="quote__stage">
            <AnimatePresence key={boot} mode="wait" custom={dir} initial={false}>
              <motion.div
                key={step}
                custom={dir}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d * 60, filter: 'blur(6px)' }),
                  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
                  exit: (d) => ({ opacity: 0, x: d * -60, filter: 'blur(6px)' }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 0 && <StepOccasion q={q} pick={pickOccasion} error={errors.occasion} />}
                {step === 1 && <StepEnvies q={q} toggle={toggle} set={set} error={errors.services} />}
                {step === 2 && <StepDetails q={q} set={set} errors={errors} />}
                {step === 3 && <StepBudget q={q} set={set} error={errors.budget} />}
                {step === 4 && <StepContact q={q} set={set} errors={errors} />}
                {step === 5 && <StepRecap q={q} set={set} go={go} error={errors.consent} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {status === 'error' && (
            <div className="quote__alert" role="alert">
              <strong>L’envoi n’a pas abouti.</strong> Votre demande est conservée sur cet appareil. Vous pouvez réessayer, <a href={mailto}>l’envoyer par e-mail</a> ou appeler Alicia au <a href={contact.phoneHref}>{contact.phone}</a>.
            </div>
          )}

          <div className="quote__nav">
            {step > 0
              ? <button type="button" className="quote__back" onClick={() => go(step - 1)}><Icon name="arrow" size={18} /> Retour</button>
              : <span className="quote__hint">Environ 2 minutes · devis gratuit sous 48 h</span>}
            {step > 0 && (
              <button type="submit" className="btn" disabled={status === 'sending'} aria-busy={status === 'sending'}>
                {status === 'sending'
                  ? <><span className="spinner" aria-hidden="true" /> Envoi en cours…</>
                  : step === steps.length - 1 ? <>Envoyer ma demande <Icon name="arrow" size={18} /></> : <>Continuer <Icon name="arrow" size={18} /></>}
              </button>
            )}
          </div>
        </form>

        <Summary q={q} step={step} go={go} />
      </div>
    </div>
  )
}

/* ---------- Progression ---------- */
function Progress({ step, onJump }) {
  return (
    <div className="qprog">
      <div className="qprog__top">
        <span className="qprog__count tabular">Étape {step + 1} / {steps.length}</span>
        <span className="qprog__name">{steps[step]}</span>
      </div>
      <ol className="qprog__bar" aria-label="Étapes du formulaire">
        {steps.map((s, i) => (
          <li key={s}>
            <button type="button" onClick={() => onJump(i)} disabled={i >= step} aria-current={i === step ? 'step' : undefined} aria-label={`${s}${i < step ? ' (modifier)' : ''}`}>
              <motion.span className="qprog__fill" initial={false} animate={{ scaleX: i < step ? 1 : i === step ? 0.5 : 0 }} transition={{ duration: 0.5 }} />
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ---------- Étapes ---------- */
function StepTitle({ title, sub }) {
  return (
    <div className="qstep__head">
      <h3 tabIndex={-1}>{title}</h3>
      {sub && <p>{sub}</p>}
    </div>
  )
}

function Err({ id, msg }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.small id={id} className="qerr" role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {msg}
        </motion.small>
      )}
    </AnimatePresence>
  )
}

function StepOccasion({ q, pick, error }) {
  return (
    <fieldset className={`qstep ${error ? 'is-invalid' : ''}`} aria-describedby={error ? 'e-occ' : undefined}>
      <legend className="sr-only">Type d’événement</legend>
      <StepTitle title="Quelle est l’occasion ?" sub="Choisissez, on s’occupe du reste." />
      <div className="occ">
        {occasions.map((o, i) => (
          <motion.button
            type="button" key={o.id}
            className={`occ__card ${q.occasion === o.id ? 'is-on' : ''}`}
            aria-pressed={q.occasion === o.id}
            onClick={() => pick(o.id)}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <img src={img(byIndex(o.photo), 400)} alt="" loading="lazy" />
            <span className="occ__txt"><strong>{o.label}</strong><small>{o.hint}</small></span>
            <span className="occ__check" aria-hidden="true"><Icon name="check" size={16} /></span>
          </motion.button>
        ))}
      </div>
      <Err id="e-occ" msg={error} />
    </fieldset>
  )
}

function Chips({ list, value, onToggle, multi = true, name }) {
  return (
    <div className="qchips" role={multi ? 'group' : 'radiogroup'} aria-label={name}>
      {list.map((it) => {
        const id = it.id ?? it
        const on = multi ? value.includes(id) : value === id
        return (
          <button type="button" key={id} className={`qchip ${on ? 'is-on' : ''}`}
            role={multi ? undefined : 'radio'} aria-checked={multi ? undefined : on} aria-pressed={multi ? on : undefined}
            onClick={() => onToggle(id)}>
            {multi && <span className="qchip__tick" aria-hidden="true"><Icon name="check" size={14} /></span>}
            {it.label ?? it}
          </button>
        )
      })}
    </div>
  )
}

function StepEnvies({ q, toggle, set, error }) {
  return (
    <div className="qstep">
      <StepTitle title="Qu’est-ce qui vous ferait plaisir ?" sub="Plusieurs choix possibles." />
      <fieldset className={`svc ${error ? 'is-invalid' : ''}`} aria-describedby={error ? 'e-svc' : undefined}>
        <legend className="sr-only">Prestations souhaitées</legend>
        {services.map((s) => {
          const on = q.services.includes(s.id)
          return (
            <motion.button type="button" key={s.id} className={`svc__card ${on ? 'is-on' : ''}`} aria-pressed={on} onClick={() => toggle('services', s.id)} whileTap={{ scale: 0.97 }}>
              {s.photo !== null
                ? <img src={img(byIndex(s.photo), 240)} alt="" loading="lazy" />
                : <span className="svc__icon" aria-hidden="true"><Icon name="jar" size={26} /></span>}
              <span>{s.label}</span>
              <span className="svc__tick" aria-hidden="true"><Icon name="check" size={14} /></span>
            </motion.button>
          )
        })}
      </fieldset>
      <Err id="e-svc" msg={error} />

      <div className="qblock">
        <p className="qlabel">Saveurs qui vous font envie <small>(facultatif)</small></p>
        <Chips list={flavours} value={q.flavours} onToggle={(v) => toggle('flavours', v)} name="Saveurs" />
      </div>
      <div className="qblock">
        <p className="qlabel">Régimes ou allergies <small>(facultatif)</small></p>
        <Chips list={diets} value={q.diets} onToggle={(v) => toggle('diets', v)} name="Régimes et allergies" />
      </div>
      <div className="qfield">
        <label htmlFor="q-desc">Votre idée, votre thème, vos inspirations <small>(facultatif)</small></label>
        <textarea id="q-desc" rows={3} maxLength={1500} value={q.projectDescription} onChange={(e) => set('projectDescription', e.target.value)}
          placeholder="Ex. : thème champêtre, couleurs rose et vert, 3 étages…" />
        <small className="qcount tabular">{q.projectDescription.length} / 1500</small>
      </div>
    </div>
  )
}

function StepDetails({ q, set, errors }) {
  const d = q.eventDate && q.eventDate >= today() ? daysUntil(q.eventDate) : null
  return (
    <div className="qstep">
      <StepTitle title="Quand et où ?" sub="Alicia livre en Ariège, en Haute-Garonne et aux alentours." />
      <div className="qrow">
        <Field id="q-date" label="Date de l’événement *" error={errors.eventDate}>
          <input id="q-date" type="date" min={today()} value={q.eventDate} onChange={(e) => set('eventDate', e.target.value)} aria-invalid={!!errors.eventDate} aria-describedby="q-date-e q-date-h" />
          {d !== null && (
            <small id="q-date-h" className={`qnote ${d < 10 ? 'qnote--warn' : ''}`}>
              {d < 10 ? `Dans ${d} jour${d > 1 ? 's' : ''} : délai court, Alicia fera son possible. Un appel est conseillé.` : `Dans ${d} jours — parfait pour tout préparer.`}
            </small>
          )}
        </Field>
        <div className="qfield">
          <p className="qlabel" id="slot-l">Moment de la journée</p>
          <Chips list={slots} value={q.eventTime} multi={false} onToggle={(v) => set('eventTime', q.eventTime === v ? '' : v)} name="Moment de la journée" />
        </div>
      </div>
      <div className="qrow">
        <Field id="q-city" label="Ville de l’événement *" error={errors.eventCity}>
          <input id="q-city" autoComplete="address-level2" value={q.eventCity} onChange={(e) => set('eventCity', e.target.value)} placeholder="Ex. : Saverdun" aria-invalid={!!errors.eventCity} aria-describedby="q-city-e" />
        </Field>
        <div className="qfield">
          <p className="qlabel">Département</p>
          <Chips list={departments} value={q.eventDepartment} multi={false} onToggle={(v) => set('eventDepartment', v)} name="Département" />
        </div>
      </div>
      <div className="qfield">
        <label htmlFor="q-guests">Nombre d’invités *</label>
        <div className="guests">
          <button type="button" aria-label="Moins d’invités" onClick={() => set('guestCount', Math.max(1, q.guestCount - 5))}>−</button>
          <input id="q-guests" type="number" inputMode="numeric" min={1} max={1000} value={q.guestCount}
            onChange={(e) => set('guestCount', Math.max(0, parseInt(e.target.value || '0', 10)))} aria-invalid={!!errors.guestCount} aria-describedby="q-guests-e" />
          <button type="button" aria-label="Plus d’invités" onClick={() => set('guestCount', q.guestCount + 5)}>+</button>
          <input type="range" min={1} max={200} value={Math.min(200, q.guestCount)} onChange={(e) => set('guestCount', +e.target.value)} aria-label="Ajuster le nombre d’invités" className="guests__range" />
        </div>
        <div className="qchips qchips--small">
          {guestPresets.map((n) => <button type="button" key={n} className={`qchip ${q.guestCount === n ? 'is-on' : ''}`} onClick={() => set('guestCount', n)}>{n}{n === 120 ? '+' : ''}</button>)}
        </div>
        <Err id="q-guests-e" msg={errors.guestCount} />
      </div>
    </div>
  )
}

function StepBudget({ q, set, error }) {
  return (
    <div className={`qstep ${error ? 'is-invalid' : ''}`}>
      <StepTitle title="Quel budget envisagez-vous ?" sub="Une simple indication : Alicia adapte sa proposition, sans engagement." />
      <div className="budget" role="radiogroup" aria-label="Budget" aria-describedby={error ? 'e-bud' : undefined}>
        {budgets.map((b, i) => (
          <motion.button type="button" key={b.id} role="radio" aria-checked={q.budget === b.id}
            className={`budget__opt ${q.budget === b.id ? 'is-on' : ''}`} onClick={() => set('budget', b.id)}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
            <span className="budget__dot" aria-hidden="true" />{b.label}
          </motion.button>
        ))}
      </div>
      <Err id="e-bud" msg={error} />
    </div>
  )
}

function StepContact({ q, set, errors }) {
  return (
    <div className="qstep">
      <StepTitle title="Comment vous recontacter ?" sub="Vos coordonnées servent uniquement à répondre à votre demande." />
      <div className="qrow">
        <Field id="q-fn" label="Prénom *" error={errors.firstName}>
          <input id="q-fn" autoComplete="given-name" value={q.firstName} onChange={(e) => set('firstName', e.target.value)} aria-invalid={!!errors.firstName} aria-describedby="q-fn-e" />
        </Field>
        <Field id="q-ln" label="Nom *" error={errors.lastName}>
          <input id="q-ln" autoComplete="family-name" value={q.lastName} onChange={(e) => set('lastName', e.target.value)} aria-invalid={!!errors.lastName} aria-describedby="q-ln-e" />
        </Field>
      </div>
      <div className="qrow">
        <Field id="q-mail" label="E-mail *" error={errors.email}>
          <input id="q-mail" type="email" autoComplete="email" inputMode="email" value={q.email} onChange={(e) => set('email', e.target.value)} onBlur={(e) => set('email', e.target.value.trim())} aria-invalid={!!errors.email} aria-describedby="q-mail-e" />
        </Field>
        <Field id="q-tel" label={`Téléphone${q.contactPreference !== 'email' ? ' *' : ''}`} error={errors.phone}>
          <input id="q-tel" type="tel" autoComplete="tel" inputMode="tel" value={q.phone} onChange={(e) => set('phone', e.target.value)} placeholder="06 12 34 56 78" aria-invalid={!!errors.phone} aria-describedby="q-tel-e" />
        </Field>
      </div>
      <div className="qfield">
        <p className="qlabel">Je préfère être contacté·e par</p>
        <div className="seg" role="radiogroup" aria-label="Préférence de contact">
          {contactPrefs.map((c) => (
            <button type="button" key={c.id} role="radio" aria-checked={q.contactPreference === c.id} className={q.contactPreference === c.id ? 'is-on' : ''} onClick={() => set('contactPreference', c.id)}>
              {q.contactPreference === c.id && <motion.span layoutId="seg-bg" className="seg__bg" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepRecap({ q, set, go, error }) {
  const rows = [
    ['Occasion', label(occasions, q.occasion), 0],
    ['Prestations', q.services.map((s) => label(services, s)).join(', '), 1],
    ['Saveurs', [...q.flavours, ...q.diets].join(', ') || '—', 1],
    ['Date', `${frDate(q.eventDate)}${q.eventTime ? ' · ' + q.eventTime : ''}`, 2],
    ['Lieu', `${q.eventCity} · ${label(departments, q.eventDepartment)}`, 2],
    ['Invités', q.guestCount, 2],
    ['Budget', label(budgets, q.budget), 3],
    ['Contact', `${q.firstName} ${q.lastName} · ${q.email}${q.phone ? ' · ' + q.phone : ''}`, 4],
  ]
  return (
    <div className="qstep">
      <StepTitle title="Tout est bon ?" sub="Vérifiez votre demande avant de l’envoyer à Alicia." />
      <dl className="recap">
        {rows.map(([k, v, s], i) => (
          <motion.div key={k} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <dt>{k}</dt><dd>{v}</dd>
            <button type="button" className="recap__edit" onClick={() => go(s)} aria-label={`Modifier : ${k}`}>Modifier</button>
          </motion.div>
        ))}
        {q.projectDescription && <div className="recap__desc"><dt>Votre idée</dt><dd>{q.projectDescription}</dd></div>}
      </dl>
      <label className={`consent ${error ? 'is-invalid' : ''}`}>
        <input type="checkbox" checked={q.consent} onChange={(e) => set('consent', e.target.checked)} aria-invalid={!!error} aria-describedby="e-consent" />
        <span className="consent__box" aria-hidden="true"><Icon name="check" size={14} /></span>
        <span>J’accepte qu’Alicia me recontacte au sujet de cette demande. Mes données ne sont ni revendues ni utilisées à d’autres fins.</span>
      </label>
      <Err id="e-consent" msg={error} />
    </div>
  )
}

function Field({ id, label: l, error, children }) {
  return (
    <div className={`qfield ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{l}</label>
      {children}
      <Err id={`${id}-e`} msg={error} />
    </div>
  )
}

/* ---------- Résumé en direct ---------- */
function Summary({ q, step, go }) {
  const occ = occasions.find((o) => o.id === q.occasion)
  const items = [
    q.services.length && ['Prestations', q.services.map((s) => label(services, s)).join(', '), 1],
    q.eventDate && ['Date', frDate(q.eventDate), 2],
    q.eventCity && ['Lieu', q.eventCity, 2],
    step >= 2 && ['Invités', `${q.guestCount} personnes`, 2],
    q.budget && ['Budget', label(budgets, q.budget), 3],
  ].filter(Boolean)
  return (
    <aside className="qsum" aria-label="Résumé de votre demande">
      <div className="qsum__img">
        <AnimatePresence mode="wait">
          <motion.img key={occ?.photo ?? 'x'} src={img(byIndex(occ?.photo ?? 36), 600)} alt=""
            initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} />
        </AnimatePresence>
        <span className="qsum__tag">{occ ? occ.label : 'Votre événement'}</span>
      </div>
      <div className="qsum__body">
        <p className="qsum__title">Votre demande</p>
        {items.length === 0 && <p className="qsum__empty">Elle se construit ici, au fil de vos réponses.</p>}
        <ul>
          <AnimatePresence initial={false}>
            {items.map(([k, v, s]) => (
              <motion.li key={k} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <span>{k}</span>
                <button type="button" onClick={() => s < step && go(s)} disabled={s >= step}>{v}</button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <div className="qsum__trust">
          <span><Icon name="check" size={16} /> Gratuit et sans engagement</span>
          <span><Icon name="check" size={16} /> Réponse sous 48 h</span>
          <span><Icon name="check" size={16} /> Brouillon sauvegardé automatiquement</span>
        </div>
        <a className="qsum__call" href={contact.phoneHref}><Icon name="phone" size={18} /> Pressé·e ? {contact.phone}</a>
      </div>
    </aside>
  )
}

/* ---------- Succès ---------- */
const confetti = Array.from({ length: 26 }, (_, i) => ({
  x: (Math.random() - 0.5) * 520, y: -160 - Math.random() * 260, r: Math.random() * 540 - 270,
  c: ['#E3A3A6', '#B7C4A8', '#A4475B', '#F4DCD8', '#556B4C'][i % 5], s: 8 + Math.random() * 10, round: i % 3 === 0,
}))

function Success({ q, onReset }) {
  const ref = useRef(null)
  useEffect(() => { ref.current?.focus() }, [])
  return (
    <motion.div className="qdone" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 16 }}>
      <div className="qdone__burst" aria-hidden="true">
        {confetti.map((p, i) => (
          <motion.span key={i} style={{ background: p.c, width: p.s, height: p.round ? p.s : p.s * 0.45, borderRadius: p.round ? '50%' : 2 }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: p.x, y: [0, p.y, p.y + 420], opacity: [1, 1, 0], rotate: p.r }}
            transition={{ duration: 2.4, ease: 'easeOut', times: [0, 0.35, 1] }} />
        ))}
      </div>
      <svg className="qdone__check" viewBox="0 0 80 80" aria-hidden="true">
        <motion.circle cx="40" cy="40" r="36" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
        <motion.path d="M24 41l11 11 21-24" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
      </svg>
      <h3 ref={ref} tabIndex={-1}>Merci {q.firstName} !</h3>
      <p>Votre demande pour votre <strong>{label(occasions, q.occasion).toLowerCase()}</strong> est bien arrivée chez Alicia. Elle vous répond sous 48 h {q.contactPreference === 'phone' ? 'par téléphone' : q.contactPreference === 'both' ? 'par e-mail ou téléphone' : 'par e-mail'}.</p>
      <div className="qdone__actions">
        <a className="btn btn--ghost" href={contact.instagram} target="_blank" rel="noreferrer"><Icon name="insta" size={18} /> Voir ses créations sur Instagram</a>
        <button type="button" className="link-underline" onClick={onReset}>Faire une autre demande</button>
      </div>
    </motion.div>
  )
}
