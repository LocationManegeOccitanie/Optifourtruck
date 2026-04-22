import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuoteRequest {
  eventCategory: string;
  eventDate: string;
  eventCity: string;
  eventDepartment: string;
  guestCount: string;
  eventTime: string;
  services: string[];
  projectDescription: string;
  budget: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactPreference: string;
}

const EVENT_LABELS: Record<string, string> = {
  private: "Événement privé",
  professional: "Événement professionnel",
  other: "Autre demande",
};

const SERVICE_LABELS: Record<string, string> = {
  "individual-pastries": "Pâtisseries individuelles",
  cakes: "Gâteaux & pièces montées",
  "sweet-buffet": "Buffet sucré",
  "savory-buffet": "Buffet salé",
  other: "Autre / Sur-mesure",
};

const BUDGET_LABELS: Record<string, string> = {
  unknown: "Non défini",
  "under-500": "Moins de 500€",
  "500-1000": "500€ - 1 000€",
  "1000-2000": "1 000€ - 2 000€",
  "2000-5000": "2 000€ - 5 000€",
  "over-5000": "Plus de 5 000€",
};

const CONTACT_LABELS: Record<string, string> = {
  email: "Par email",
  phone: "Par téléphone",
  both: "Les deux",
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: QuoteRequest = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const notificationEmail = "contact@optifourtruck.fr";

    const servicesText = data.services
      .map((s) => SERVICE_LABELS[s] || s)
      .join(", ");

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #C4956A, #D4A574); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🎂 Nouvelle demande de devis</h1>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-top: none;">
          <h2 style="color: #333; border-bottom: 2px solid #C4956A; padding-bottom: 10px;">👤 Client</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 40%;">Nom</td><td style="padding: 8px 0; font-weight: bold;">${data.firstName} ${data.lastName}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #C4956A;">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; color: #666;">Téléphone</td><td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #C4956A;">${data.phone}</a></td></tr>` : ''}
            ${data.contactPreference ? `<tr><td style="padding: 8px 0; color: #666;">Contact préféré</td><td style="padding: 8px 0;">${CONTACT_LABELS[data.contactPreference] || data.contactPreference}</td></tr>` : ''}
          </table>

          <h2 style="color: #333; border-bottom: 2px solid #C4956A; padding-bottom: 10px; margin-top: 25px;">📋 Événement</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 40%;">Type</td><td style="padding: 8px 0;">${EVENT_LABELS[data.eventCategory] || data.eventCategory}</td></tr>
            ${data.eventDate ? `<tr><td style="padding: 8px 0; color: #666;">Date</td><td style="padding: 8px 0; font-weight: bold;">${new Date(data.eventDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td></tr>` : ''}
            ${data.eventCity ? `<tr><td style="padding: 8px 0; color: #666;">Lieu</td><td style="padding: 8px 0;">${data.eventCity}${data.eventDepartment ? ` (${data.eventDepartment})` : ''}</td></tr>` : ''}
            ${data.guestCount ? `<tr><td style="padding: 8px 0; color: #666;">Nombre de personnes</td><td style="padding: 8px 0;">${data.guestCount}</td></tr>` : ''}
            ${data.eventTime ? `<tr><td style="padding: 8px 0; color: #666;">Horaire</td><td style="padding: 8px 0;">${data.eventTime}</td></tr>` : ''}
          </table>

          <h2 style="color: #333; border-bottom: 2px solid #C4956A; padding-bottom: 10px; margin-top: 25px;">🍰 Prestations</h2>
          <p style="color: #333;">${servicesText}</p>
          ${data.projectDescription ? `<div style="background: #f9f5f0; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #C4956A;"><strong>Description du projet :</strong><br/>${data.projectDescription.replace(/\n/g, '<br/>')}</div>` : ''}

          ${data.budget ? `<h2 style="color: #333; border-bottom: 2px solid #C4956A; padding-bottom: 10px; margin-top: 25px;">💰 Budget</h2><p style="color: #333; font-weight: bold;">${BUDGET_LABELS[data.budget] || data.budget}</p>` : ''}
        </div>
        
        <div style="background: #f9f5f0; padding: 20px; border-radius: 0 0 12px 12px; text-align: center; border: 1px solid #e5e5e5; border-top: none;">
          <p style="color: #888; margin: 0; font-size: 13px;">O P'tit Four Truck — Demande reçue le ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
    `;

    // If Resend is configured, send via Resend
    if (RESEND_API_KEY) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "O P'tit Four Truck <devis@optifourtruck.fr>",
          to: [notificationEmail],
          subject: `🎂 Nouveau devis — ${data.firstName} ${data.lastName} — ${EVENT_LABELS[data.eventCategory] || data.eventCategory}`,
          html: htmlContent,
          reply_to: data.email,
        }),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error("Resend error:", errorText);
        // Don't fail the request - the data is already saved in DB
      }
    } else {
      console.log("RESEND_API_KEY not configured. Quote saved to DB only.");
      console.log("Quote notification would be sent to:", notificationEmail);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing quote notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
