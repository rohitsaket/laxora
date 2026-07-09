import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// IMPORTANT: z-ai-web-dev-sdk must run on the server only.
let chatFn: ((messages: any[], opts?: any) => Promise<any>) | null = null;
async function getChat() {
  if (chatFn) return chatFn;
  try {
    // The SDK is dynamically imported to keep this server-side only.
    const mod = await import("z-ai-web-dev-sdk");
    const ZAI = (mod as any).default ?? (mod as any).ZAI;
    const zai = await ZAI.create();
    chatFn = (messages: any[], opts?: any) => zai.chat.completions.create({ messages, ...opts });
    return chatFn;
  } catch (err) {
    console.error("[ai-chat] SDK load failed", err);
    return null;
  }
}

const SYSTEM_PROMPT = `You are "Aria", LUXORA's AI personal shopping assistant and luxury diamond concierge.

LUXORA is a high-end maison of certified diamonds and fine jewelry (Antwerp, est. 1924). You help visitors:
- Choose the right engagement ring, wedding band, necklace, earrings, or bracelet
- Understand the 4Cs (Cut, Color, Clarity, Carat) and diamond certifications (GIA, IGI, HRD, AGS)
- Find the right metal (Yellow Gold, White Gold, Rose Gold, Platinum)
- Decide between diamond shapes (Round, Oval, Princess, Emerald, Cushion, Pear, Radiant, Marquise, Asscher, Heart)
- Guide on budget, ethical sourcing, lifetime warranty, ring sizing, and appointments
- Explain the bespoke Custom Jewelry Builder

Style guidelines:
- Speak with the warm, refined voice of a senior gemologist — never pushy, always confident.
- Keep replies concise (max 90 words). Use short paragraphs or a 2–4 item bullet list when it helps.
- If a visitor asks about budget, gently guide them toward value (e.g., VS2/G over FL/D).
- Never make up diamond prices or certificate IDs. Refer them to the diamond search tool.
- Always end with a helpful next step (e.g., "Would you like me to point you to our Oval diamonds?").

You are text-only. Do not pretend to show images.`;

const Body = z.object({
  messages: z.array(z.object({
    role: z.enum(["system", "user", "assistant"]),
    content: z.string(),
  })),
});

export async function POST(req: NextRequest) {
  try {
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...parsed.data.messages.filter((m) => m.role !== "system"),
    ];

    const chat = await getChat();
    if (!chat) {
      // Fallback canned response if SDK isn't available
      return NextResponse.json({
        reply:
          "I'm Aria, your LUXORA concierge. I can help you choose a diamond, understand the 4Cs, or guide you to the right collection. Could you tell me a bit about what you're celebrating, and your budget range?",
      });
    }

    const completion = await chat(messages, {
      temperature: 0.6,
      max_tokens: 320,
    });

    const reply: string =
      completion?.choices?.[0]?.message?.content ??
      completion?.message?.content ??
      (typeof completion === "string" ? completion : "");

    return NextResponse.json({ reply: reply || "How may I assist you with your LUXORA selection today?" });
  } catch (err) {
    console.error("[ai-chat] error", err);
    return NextResponse.json(
      {
        reply:
          "Pardon me — I had trouble reaching my thoughts just now. Could you rephrase? Or browse our collections while I recover.",
      },
      { status: 200 }
    );
  }
}
