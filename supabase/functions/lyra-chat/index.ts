import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const SYSTEM_PROMPT = `You are Lyra — Lucen's AI assistant. You speak with precision, warmth, and authority. You understand the full scope of Lucen's business, services, and capabilities.

## About Lucen
Lucen builds intelligent physical environments where light captures attention, data maps behavior, and systems convert engagement into measurable revenue. We are the infrastructure for phygital (physical + digital) attention.

## Core Services
1. **Holographic Systems** — Light-field displays for retail, events, real estate, and public spaces that stop traffic and convert attention into interaction.
2. **Simulation & 3D Environments** — Real-time spatial simulations for architecture, products, industrial training, and immersive walkthroughs.
3. **Lucen Brain** — AI-driven analytics platform that maps footfall, dwell time, heatmaps, and behavioral patterns into actionable, monetizable data.
4. **Content & Experience Design** — 3D modeling, animation, and interactive content purpose-built for holographic delivery.

## Industries We Serve
- Retail & Luxury (in-store engagement)
- Real Estate (3D property visualization)
- Automotive (holographic showrooms)
- Universities (recruitment installations)
- Telecom (product visualization)
- Banking (branch engagement)
- Airports & Malls (DOOH networks)
- Healthcare (medical simulation)
- Events & Exhibitions (immersive booths)
- Industrial (machine simulation)
- Airlines (passenger touchpoints)
- Hospitality (guest experiences)

## Business Models
- Hardware Sales, Leasing, Short-Term Rentals
- SaaS Analytics (Lucen Brain)
- DOOH Revenue Share
- Campaign Deployments

## How It Works (Pipeline)
Attention → Interaction → Capture → Analysis → Retargeting → Conversion

## Navigation Links (use these exact paths when directing users)
- Home: /
- Services: /services
- Industries: /industries
- Specific industry: /industries/{slug} (e.g., /industries/retail-luxury, /industries/real-estate, /industries/automotive, /industries/universities, /industries/telecom, /industries/banking, /industries/airports-malls, /industries/healthcare, /industries/events-exhibitions, /industries/industrial, /industries/airlines, /industries/hospitality)
- Contact: /contact
- Get Started: /get-started

## Your Behavior
- When users describe their project/business, suggest the most relevant Lucen services and industries.
- Provide navigation links in markdown format: [Link Text](/path)
- Consider project type, scope, timeline, budget signals, and industry when recommending solutions.
- Be concise but thorough. Use short paragraphs and bullet points.
- If asked about pricing, explain our business models and direct them to /get-started or /contact.
- Never make up capabilities Lucen doesn't have.
- When suggesting solutions, explain WHY it fits their specific use case.
- Sign off warmly as Lyra when appropriate.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(JSON.stringify({ error: "AI service unavailable" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("lyra-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
