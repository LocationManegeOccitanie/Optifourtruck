import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { RevealSection } from "@/components/RevealSection";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  PartyPopper, 
  Briefcase, 
  HelpCircle,
  Calendar,
  Users,
  Clock,
  Cake,
  UtensilsCrossed,
  Gift,
  Heart,
  ChevronRight,
  ChevronLeft,
  Sparkles
} from "lucide-react";

// Types d'événements
const eventCategories = [
  { id: "private", label: "Événement privé", icon: PartyPopper, description: "Mariage, anniversaire, baptême..." },
  { id: "professional", label: "Événement professionnel", icon: Briefcase, description: "Séminaire, cocktail, inauguration..." },
  { id: "other", label: "Autre demande", icon: HelpCircle, description: "Projet spécial ou personnalisé" },
];

// Types de prestations
const serviceTypes = [
  { id: "individual-pastries", label: "Pâtisseries individuelles", icon: Cake },
  { id: "cakes", label: "Gâteaux & pièces montées", icon: Heart },
  { id: "sweet-buffet", label: "Buffet sucré", icon: Gift },
  { id: "savory-buffet", label: "Buffet salé", icon: UtensilsCrossed },
  { id: "other", label: "Autre / Sur-mesure", icon: Sparkles },
];

// Options de budget
const budgetRanges = [
  { id: "unknown", label: "Je ne sais pas encore" },
  { id: "under-500", label: "Moins de 500€" },
  { id: "500-1000", label: "500€ - 1 000€" },
  { id: "1000-2000", label: "1 000€ - 2 000€" },
  { id: "2000-5000", label: "2 000€ - 5 000€" },
  { id: "over-5000", label: "Plus de 5 000€" },
];

// Préférences de contact
const contactPreferences = [
  { id: "email", label: "Par email" },
  { id: "phone", label: "Par téléphone" },
  { id: "both", label: "Les deux" },
];

const Devis = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Event type
    eventCategory: "",
    // Step 2: Event details
    eventDate: "",
    eventCity: "",
    eventDepartment: "",
    guestCount: "",
    eventTime: "",
    // Step 3: Services
    services: [] as string[],
    projectDescription: "",
    // Step 4: Budget
    budget: "",
    // Step 5: Contact
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    contactPreference: "",
  });

  const totalSteps = 5;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Save to database
      const { error: dbError } = await supabase.from("quote_requests").insert({
        event_category: formData.eventCategory,
        event_date: formData.eventDate || null,
        event_city: formData.eventCity || null,
        event_department: formData.eventDepartment || null,
        guest_count: formData.guestCount || null,
        event_time: formData.eventTime || null,
        services: formData.services,
        project_description: formData.projectDescription || null,
        budget: formData.budget || null,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        contact_preference: formData.contactPreference || null,
      });

      if (dbError) {
        console.error("DB error:", dbError);
        toast.error("Une erreur est survenue. Veuillez réessayer.");
        setIsSubmitting(false);
        return;
      }

      // Send email notification (non-blocking)
      supabase.functions.invoke("send-quote-notification", {
        body: formData,
      }).catch((err) => console.error("Email notification error:", err));

      setIsSubmitted(true);
      toast.success("Votre demande a bien été envoyée !");
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.eventCategory !== "";
      case 2:
        return formData.eventDate !== "" && formData.eventCity !== "";
      case 3:
        return formData.services.length > 0;
      case 4:
        return true; // Budget is optional
      case 5:
        return formData.firstName !== "" && formData.lastName !== "" && formData.email !== "";
      default:
        return true;
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <Layout>
      <SEO 
        title="Demande de Devis | Pâtissier-Traiteur Saverdun, Ariège"
        description="Demandez un devis gratuit pour vos gâteaux, wedding cakes et buffets sucrés. Livraison en Ariège et Haute-Garonne sous 48h."
        canonical="/devis"
      />
      {/* Hero */}
      <section className="pt-32 pb-12 bg-background">
        <div className="container-wide text-center">
          <RevealSection>
            <span className="text-caption">Demande de devis</span>
            <h1 className="heading-hero mt-4 max-w-4xl mx-auto">
              Créons ensemble votre{" "}
              <span className="text-gradient">moment parfait</span>
            </h1>
            <p className="text-body mt-6 max-w-2xl mx-auto text-lg">
              Quelques informations nous aideront à vous proposer un devis personnalisé, 
              adapté à vos envies et à votre événement.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding pt-4 pb-20">
        <div className="container-wide max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-10">
            {/* Progress Sidebar */}
            <RevealSection className="lg:col-span-1">
              <div className="card-glass sticky top-32">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                  Étapes
                </h3>
                
                <div className="space-y-3">
                  {[
                    { num: 1, label: "Type d'événement" },
                    { num: 2, label: "Détails" },
                    { num: 3, label: "Prestations" },
                    { num: 4, label: "Budget" },
                    { num: 5, label: "Coordonnées" },
                  ].map((step) => (
                    <div
                      key={step.num}
                      className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-300 ${
                        currentStep === step.num
                          ? "bg-primary/10 text-primary"
                          : currentStep > step.num
                          ? "text-primary/60"
                          : "text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                          currentStep === step.num
                            ? "bg-primary text-primary-foreground"
                            : currentStep > step.num
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {currentStep > step.num ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          step.num
                        )}
                      </div>
                      <span className="text-sm font-medium">{step.label}</span>
                    </div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-4">
                    Une question ? Contactez-nous :
                  </p>
                  <div className="space-y-2 text-sm">
                    <a href="tel:0656829711" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Phone size={14} className="text-primary" />
                      <span>06 56 82 97 11</span>
                    </a>
                    <a href="mailto:optifourtruck.contact@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Mail size={14} className="text-primary" />
                      <span className="text-xs">optifourtruck.contact@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Form Content */}
            <RevealSection delay={0.1} className="lg:col-span-3">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card-premium text-center py-16"
                >
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle2 className="text-primary" size={48} />
                  </motion.div>
                  <h3 className="heading-card">Demande envoyée avec succès !</h3>
                  <p className="text-body mt-4 max-w-md mx-auto">
                    Merci pour votre confiance. Nous étudions votre projet avec attention et vous 
                    répondrons sous <strong>48h</strong> avec un devis personnalisé.
                  </p>
                  <div className="mt-8 p-4 bg-primary/5 rounded-xl max-w-sm mx-auto">
                    <p className="text-sm text-muted-foreground">
                      Un email de confirmation vous a été envoyé à <strong className="text-foreground">{formData.email}</strong>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="card-premium">
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">
                        Étape {currentStep} sur {totalSteps}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((currentStep / totalSteps) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Form Steps */}
                  <AnimatePresence mode="wait">
                    {/* Step 1: Event Type */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="heading-card mb-2">Quel type d'événement organisez-vous ?</h3>
                        <p className="text-muted-foreground mb-8">
                          Cela nous aidera à mieux comprendre vos besoins.
                        </p>

                        <div className="grid gap-4">
                          {eventCategories.map((category) => {
                            const Icon = category.icon;
                            return (
                              <motion.button
                                key={category.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, eventCategory: category.id })}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className={`flex items-center gap-5 p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
                                  formData.eventCategory === category.id
                                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                                    : "border-border hover:border-primary/30 hover:bg-muted/30"
                                }`}
                              >
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                                  formData.eventCategory === category.id
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                }`}>
                                  <Icon size={26} />
                                </div>
                                <div>
                                  <p className="font-semibold text-foreground">{category.label}</p>
                                  <p className="text-sm text-muted-foreground">{category.description}</p>
                                </div>
                                {formData.eventCategory === category.id && (
                                  <CheckCircle2 className="ml-auto text-primary" size={24} />
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Event Details */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="heading-card mb-2">Parlez-nous de votre événement</h3>
                        <p className="text-muted-foreground mb-8">
                          Ces informations nous aideront à préparer votre devis.
                        </p>

                        <div className="space-y-6">
                          {/* Date */}
                          <div>
                            <label htmlFor="eventDate" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                              <Calendar size={16} className="text-primary" />
                              Date de l'événement *
                            </label>
                            <input
                              type="date"
                              id="eventDate"
                              name="eventDate"
                              required
                              value={formData.eventDate}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            />
                          </div>

                          {/* Location */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="eventCity" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                <MapPin size={16} className="text-primary" />
                                Ville *
                              </label>
                              <input
                                type="text"
                                id="eventCity"
                                name="eventCity"
                                required
                                value={formData.eventCity}
                                onChange={handleChange}
                                placeholder="Ex: Toulouse"
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                              />
                            </div>
                            <div>
                              <label htmlFor="eventDepartment" className="text-sm font-medium text-foreground mb-2 block">
                                Département
                              </label>
                              <input
                                type="text"
                                id="eventDepartment"
                                name="eventDepartment"
                                value={formData.eventDepartment}
                                onChange={handleChange}
                                placeholder="Ex: Haute-Garonne (31)"
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                              />
                            </div>
                          </div>

                          {/* Guest Count */}
                          <div>
                            <label htmlFor="guestCount" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                              <Users size={16} className="text-primary" />
                              Nombre approximatif de personnes *
                            </label>
                            <input
                              type="number"
                              id="guestCount"
                              name="guestCount"
                              value={formData.guestCount}
                              onChange={handleChange}
                              placeholder="Ex: 50"
                              min="1"
                              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            />
                          </div>

                          {/* Time (optional) */}
                          <div>
                            <label htmlFor="eventTime" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                              <Clock size={16} className="text-primary" />
                              Horaire souhaité <span className="text-muted-foreground font-normal">(optionnel)</span>
                            </label>
                            <input
                              type="time"
                              id="eventTime"
                              name="eventTime"
                              value={formData.eventTime}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Services */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="heading-card mb-2">De quoi avez-vous besoin ?</h3>
                        <p className="text-muted-foreground mb-8">
                          Sélectionnez une ou plusieurs prestations.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                          {serviceTypes.map((service) => {
                            const Icon = service.icon;
                            const isSelected = formData.services.includes(service.id);
                            return (
                              <motion.button
                                key={service.id}
                                type="button"
                                onClick={() => handleServiceToggle(service.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                                  isSelected
                                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                                    : "border-border hover:border-primary/30 hover:bg-muted/30"
                                }`}
                              >
                                <div className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all ${
                                  isSelected
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                }`}>
                                  <Icon size={22} />
                                </div>
                                <span className="font-medium text-foreground">{service.label}</span>
                                {isSelected && (
                                  <CheckCircle2 className="ml-auto text-primary" size={20} />
                                )}
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Project Description */}
                        <div>
                          <label htmlFor="projectDescription" className="text-sm font-medium text-foreground mb-2 block">
                            Décrivez votre projet <span className="text-muted-foreground font-normal">(envies, thème, contraintes...)</span>
                          </label>
                          <textarea
                            id="projectDescription"
                            name="projectDescription"
                            value={formData.projectDescription}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Ex: Nous organisons un mariage champêtre et recherchons un buffet de desserts élégant avec une pièce montée de macarons..."
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Budget */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="heading-card mb-2">Avez-vous un budget en tête ?</h3>
                        <p className="text-muted-foreground mb-8">
                          Cette information est facultative et nous aide à vous proposer des options adaptées.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-3">
                          {budgetRanges.map((range) => (
                            <motion.button
                              key={range.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, budget: range.id })}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                                formData.budget === range.id
                                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                                  : "border-border hover:border-primary/30 hover:bg-muted/30"
                              }`}
                            >
                              <span className={`font-medium ${
                                formData.budget === range.id ? "text-primary" : "text-foreground"
                              }`}>
                                {range.label}
                              </span>
                            </motion.button>
                          ))}
                        </div>

                        <div className="mt-8 p-4 bg-primary/5 rounded-xl">
                          <p className="text-sm text-muted-foreground">
                            💡 <strong className="text-foreground">Pas de pression !</strong> Si vous ne connaissez pas encore votre budget, 
                            nous vous proposerons différentes options adaptées à vos besoins.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 5: Contact */}
                    {currentStep === 5 && (
                      <motion.div
                        key="step5"
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="heading-card mb-2">Vos coordonnées</h3>
                        <p className="text-muted-foreground mb-8">
                          Pour vous envoyer votre devis personnalisé.
                        </p>

                        <div className="space-y-5">
                          {/* Name */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="firstName" className="text-sm font-medium text-foreground mb-2 block">
                                Prénom *
                              </label>
                              <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Votre prénom"
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                              />
                            </div>
                            <div>
                              <label htmlFor="lastName" className="text-sm font-medium text-foreground mb-2 block">
                                Nom *
                              </label>
                              <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Votre nom"
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div>
                            <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                              Email *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="votre@email.com"
                              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            />
                          </div>

                          {/* Phone */}
                          <div>
                            <label htmlFor="phone" className="text-sm font-medium text-foreground mb-2 block">
                              Téléphone
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="06 XX XX XX XX"
                              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            />
                          </div>

                          {/* Contact Preference */}
                          <div>
                            <label className="text-sm font-medium text-foreground mb-3 block">
                              Comment préférez-vous être contacté(e) ?
                            </label>
                            <div className="flex flex-wrap gap-3">
                              {contactPreferences.map((pref) => (
                                <button
                                  key={pref.id}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, contactPreference: pref.id })}
                                  className={`px-5 py-2 rounded-full border-2 transition-all duration-300 text-sm font-medium ${
                                    formData.contactPreference === pref.id
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-border hover:border-primary/30 text-foreground"
                                  }`}
                                >
                                  {pref.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Reassurance */}
                        <div className="mt-8 p-5 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/10">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Heart className="text-primary" size={20} />
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-1">
                                Votre projet est entre de bonnes mains
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Nous étudions chaque demande avec attention et vous répondrons sous 48h 
                                avec un devis sur-mesure, sans engagement.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mt-10 pt-8 border-t border-border">
                    {currentStep > 1 ? (
                      <motion.button
                        type="button"
                        onClick={prevStep}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border hover:bg-muted transition-all text-foreground font-medium"
                      >
                        <ChevronLeft size={18} />
                        Retour
                      </motion.button>
                    ) : (
                      <div />
                    )}

                    {currentStep < totalSteps ? (
                      <motion.button
                        type="button"
                        onClick={nextStep}
                        disabled={!canProceed()}
                        whileHover={{ scale: canProceed() ? 1.02 : 1 }}
                        whileTap={{ scale: canProceed() ? 0.98 : 1 }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                          canProceed()
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        }`}
                      >
                        Continuer
                        <ChevronRight size={18} />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={!canProceed() || isSubmitting}
                        whileHover={{ scale: canProceed() && !isSubmitting ? 1.02 : 1 }}
                        whileTap={{ scale: canProceed() && !isSubmitting ? 0.98 : 1 }}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all ${
                          canProceed() && !isSubmitting
                            ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Sparkles size={18} />
                            Recevoir mon devis personnalisé
                            <Send size={18} />
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </form>
              )}
            </RevealSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Devis;
