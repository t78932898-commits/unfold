/**
 * UNFOLD AI Stylist ("Neha") Knowledge Base & Response Engine
 * Tailored specifically for streetwear sizing, 240 GSM heavy combed cotton,
 * 4 Perspective Worlds, outfit styling, and catalog product recommendations.
 */

export interface StylistProductSuggestion {
  name: string;
  slug: string;
  price: number;
  badge: string;
  category: string;
  fit: string;
  image: string;
}

export interface StylistResponse {
  reply: string;
  voiceText: string;
  suggestedFollowUps?: string[];
  productSuggestions?: StylistProductSuggestion[];
}

export const SUGGESTED_QUESTIONS = [
  "Which drop or aesthetic fits my vibe?",
  "How does the 240 GSM boxy oversized fit work?",
  "Recommend a streetwear outfit for tonight",
  "What are your best-selling graphic tees?",
];

const CATALOG_ITEMS: StylistProductSuggestion[] = [
  {
    name: "Concrete Dreams Oversized Tee",
    slug: "concrete-dreams",
    price: 1499,
    badge: "BEST SELLER",
    category: "Street / Urban",
    fit: "Oversized Boxy Fit",
    image: "/images/products/concrete-dreams/front.jpg",
  },
  {
    name: "City After Dark Heavyweight Tee",
    slug: "city-after-dark",
    price: 1599,
    badge: "NEW",
    category: "Street / Urban",
    fit: "Drop-Shoulder Boxy Fit",
    image: "/images/products/city-after-dark/front.jpg",
  },
  {
    name: "Cyberpunk Neon Glitch Tee",
    slug: "cyberpunk-neon-glitch-tee",
    price: 1899,
    badge: "NEW DROP",
    category: "Street / Urban",
    fit: "Oversized Boxy Fit",
    image: "/images/products/cyber-tee/front-1789115539703.jpg",
  },
  {
    name: "404 City Not Found Graphic Tee",
    slug: "404-city-not-found",
    price: 1399,
    badge: "LIMITED",
    category: "Statement / Attitude",
    fit: "Oversized Boxy Fit",
    image: "/images/products/404-city-not-found/front.jpg",
  },
];

/**
 * Generates an intelligent, conversational streetwear stylist response
 * based on user input (voice speech transcript or text).
 */
export function getStylistResponse(userInput: string): StylistResponse {
  const query = userInput.toLowerCase().trim();

  // 1. Sizing, Fit, & GSM Questions
  if (
    query.includes("size") ||
    query.includes("sizing") ||
    query.includes("fit") ||
    query.includes("gsm") ||
    query.includes("shrink") ||
    query.includes("oversized")
  ) {
    return {
      reply:
        "Every UNFOLD t-shirt is engineered on heavyweight 240 GSM 100% super combed bio-washed cotton. We cut them in a true relaxed boxy fit with dropped shoulders and a higher-density ribbed lycra collar that won't sag. For standard oversized draping, stay true to your usual size. If you want a more standard regular fit, choose one size down. Our garments are pre-shrunk so your size stays true wash after wash!",
      voiceText:
        "Our tees are 240 GSM heavy combed cotton in a relaxed boxy cut. Stay true to size for an effortless oversized drape, or size down for a classic fit. All fabrics are pre-shrunk!",
      suggestedFollowUps: [
        "What sizes do you carry?",
        "Which tee is best for daily streetwear?",
      ],
      productSuggestions: [CATALOG_ITEMS[0], CATALOG_ITEMS[1]],
    };
  }

  // 2. Aesthetic / Vibe / 4 Worlds Matching
  if (
    query.includes("drop") ||
    query.includes("vibe") ||
    query.includes("aesthetic") ||
    query.includes("world") ||
    query.includes("category") ||
    query.includes("style")
  ) {
    return {
      reply:
        "UNFOLD designs around Four Perspective Worlds: \n• Street / Urban: Raw skate calligraphy, gritty nightscapes, and industrial graphics.\n• Art / Creative: Abstract typography, surrealist illustrations, and expressive color palettes.\n• Statement / Attitude: Bold sarcasm, internet-culture cynicism, and unapologetic slogans.\n• Vintage / Culture: 90s acid-wash nostalgia, retro music posters, and distressed typography.\nWhich mindset speaks to you today?",
      voiceText:
        "We have four design worlds: Street Urban for gritty skate graphics, Art Creative for surrealist visuals, Statement Attitude for bold cultural sarcasm, and Vintage Culture for 90s nostalgia.",
      suggestedFollowUps: [
        "Show me Street Urban drops",
        "Show me Statement graphic tees",
      ],
      productSuggestions: [CATALOG_ITEMS[0], CATALOG_ITEMS[2]],
    };
  }

  // 3. Outfit Recommendation
  if (
    query.includes("outfit") ||
    query.includes("tonight") ||
    query.includes("pair") ||
    query.includes("wear") ||
    query.includes("recommend") ||
    query.includes("party") ||
    query.includes("date")
  ) {
    return {
      reply:
        "For an effortless high-contrast street look, I recommend pairing our 'City After Dark' or 'Cyberpunk Neon Glitch' heavyweight tee with loose-fit charcoal parachute pants or dark utility cargos. Layer with a thin silver box chain and clean high-top sneakers. Because our 240 GSM cotton has substantial drape, it holds an architectural structure that looks high-end without being stiff.",
      voiceText:
        "Pair our City After Dark heavyweight tee with dark loose cargo pants, a silver chain, and clean high-tops. The 240 GSM boxy cotton maintains a crisp structured silhouette all night.",
      suggestedFollowUps: [
        "How do I care for the graphics?",
        "What are the best-selling graphic tees?",
      ],
      productSuggestions: [CATALOG_ITEMS[1], CATALOG_ITEMS[2]],
    };
  }

  // 4. Best Sellers / Top Rated
  if (
    query.includes("best") ||
    query.includes("popular") ||
    query.includes("top") ||
    query.includes("selling") ||
    query.includes("trending")
  ) {
    return {
      reply:
        "Right now, our community favorites are 'Concrete Dreams' (Drop 01 Street Urban signature) and the newly dropped 'Cyberpunk Neon Glitch Tee'. Both feature high-density puff and screenprints tested to withstand 100+ machine washes without cracking.",
      voiceText:
        "Our number one community pick is Concrete Dreams, followed closely by the Cyberpunk Neon Glitch tee. Both feature durable high-density prints that survive 100 plus washes.",
      suggestedFollowUps: [
        "How do oversized sizing & 240 GSM work?",
        "Recommend a streetwear outfit for tonight",
      ],
      productSuggestions: [CATALOG_ITEMS[0], CATALOG_ITEMS[1], CATALOG_ITEMS[3]],
    };
  }

  // 5. Default General Streetwear Stylist Advice
  return {
    reply:
      `Hey! I'm Neha, your UNFOLD AI Stylist. I'm here to help you dial in your look. Whether you're wondering which size to grab for a relaxed boxy drape, want to learn about our heavyweight 240 GSM cotton, or need a curated outfit recommendation from our Four Worlds, ask away or tap any of the prompts below!`,
    voiceText:
      "Hey! I'm Neha, your UNFOLD fashion stylist. Let me know what aesthetic you're looking for, or ask about sizing, 240 GSM fabric, and outfit recommendations!",
    suggestedFollowUps: SUGGESTED_QUESTIONS,
    productSuggestions: CATALOG_ITEMS.slice(0, 2),
  };
}
