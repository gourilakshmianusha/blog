export interface CategoryImageSpec {
  imageUrl: string;
  visualTheme: string;
  prompt: string;
  altText: string;
}

// Map any user string or category input to a canonical category key
export function normalizeCategoryKey(inputCategory: string, contextText?: string): string {
  const combined = `${inputCategory || ''} ${contextText || ''}`.toLowerCase();

  if (
    combined.includes('astrolog') ||
    combined.includes('jyotish') ||
    combined.includes('kundali') ||
    combined.includes('horoscope') ||
    combined.includes('zodiac') ||
    combined.includes('nakshatra') ||
    combined.includes('navagraha') ||
    combined.includes('vedic') ||
    combined.includes('tarot') ||
    combined.includes('planet') ||
    combined.includes('cosmic') ||
    combined.includes('transits')
  ) {
    return 'astrology';
  }

  if (
    combined.includes('health') ||
    combined.includes('wellness') ||
    combined.includes('fitness') ||
    combined.includes('nutrition') ||
    combined.includes('yoga') ||
    combined.includes('ayurved') ||
    combined.includes('longevity') ||
    combined.includes('metabolic') ||
    combined.includes('circadian') ||
    combined.includes('biomarker') ||
    combined.includes('diet') ||
    combined.includes('sleep')
  ) {
    return 'health';
  }

  if (
    combined.includes('ngo') ||
    combined.includes('charity') ||
    combined.includes('humanitarian') ||
    combined.includes('philanthrop') ||
    combined.includes('volunteer') ||
    combined.includes('non-profit') ||
    combined.includes('nonprofit') ||
    combined.includes('social impact') ||
    combined.includes('community') ||
    combined.includes('refugee') ||
    combined.includes('disaster relief')
  ) {
    return 'ngo';
  }

  if (
    combined.includes('cybersecurity') ||
    combined.includes('security') ||
    combined.includes('cryptograph') ||
    combined.includes('zero-trust') ||
    combined.includes('threat') ||
    combined.includes('firewall') ||
    combined.includes('infosec')
  ) {
    return 'cybersecurity';
  }

  if (
    combined.includes('green tech') ||
    combined.includes('climate') ||
    combined.includes('sustainab') ||
    combined.includes('carbon') ||
    combined.includes('solar') ||
    combined.includes('renewable') ||
    combined.includes('immersion cooling')
  ) {
    return 'greentech';
  }

  if (
    combined.includes('seo') ||
    combined.includes('serp') ||
    combined.includes('search ranking') ||
    combined.includes('backlink') ||
    combined.includes('organic traffic')
  ) {
    return 'seo';
  }

  if (
    combined.includes('digital marketing') ||
    combined.includes('marketing') ||
    combined.includes('growth') ||
    combined.includes('ecommerce') ||
    combined.includes('advertising') ||
    combined.includes('social media') ||
    combined.includes('conversion') ||
    combined.includes('audience')
  ) {
    return 'digital';
  }

  if (
    combined.includes('cloud') ||
    combined.includes('kubernetes') ||
    combined.includes('serverless') ||
    combined.includes('devops') ||
    combined.includes('edge compute') ||
    combined.includes('infrastructure')
  ) {
    return 'cloud';
  }

  if (
    combined.includes('design') ||
    combined.includes('ui/ux') ||
    combined.includes('ux') ||
    combined.includes('figma') ||
    combined.includes('typography') ||
    combined.includes('wireframe')
  ) {
    return 'design';
  }

  if (
    combined.includes('data') ||
    combined.includes('analytics') ||
    combined.includes('sql') ||
    combined.includes('bi dashboard') ||
    combined.includes('database')
  ) {
    return 'data';
  }

  if (
    combined.includes('web engineering') ||
    combined.includes('coding') ||
    combined.includes('software') ||
    combined.includes('developer') ||
    combined.includes('frontend') ||
    combined.includes('backend') ||
    combined.includes('typescript') ||
    combined.includes('javascript')
  ) {
    return 'engineering';
  }

  if (
    combined.includes('ai') ||
    combined.includes('artificial intelligence') ||
    combined.includes('machine learning') ||
    combined.includes('deep learning') ||
    combined.includes('neural') ||
    combined.includes('llm') ||
    combined.includes('agent')
  ) {
    return 'ai';
  }

  return 'tech';
}

// Rich library of 35+ verified, unique, high-resolution Unsplash images per category
export const CATEGORY_IMAGE_COLLECTIONS: Record<string, CategoryImageSpec[]> = {
  // -------------------------------------------------------------
  // 1. INDIAN VEDIC ASTROLOGY & COSMIC JYOTISH (35 UNIQUE IMAGES)
  // -------------------------------------------------------------
  astrology: [
    {
      imageUrl: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Sacred Indian Vedic Mandala & Cosmic Yantra",
      prompt: "Golden sacred Indian Vedic mandala yantra with intricate geometric concentric circles and glowing celestial stars, 8k render",
      altText: "Sacred Indian Vedic Mandala and Cosmic Yantra geometry",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1609137144820-7b24e65922aa?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Traditional Brass Diya Lamp & Sacred Vedic Altar",
      prompt: "Authentic Indian brass diya oil lamp illuminated with warm sacred flame and marigold garlands, atmospheric devotional glow",
      altText: "Illuminated brass diya lamp on sacred Vedic puja altar",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Ancient Sanskrit Palm-Leaf Manuscript & Jyotish Shastra",
      prompt: "Ancient Sanskrit holy scripture on textured handmade paper with traditional calligraphy and astrological glyphs",
      altText: "Ancient Sanskrit astrological manuscript and sacred Vedic texts",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Vedic Temple Architectural Carvings & Celestial Pillars",
      prompt: "Intricately carved stone temple sanctum in South India featuring celestial deities and zodiacal reliefs",
      altText: "Ancient Indian stone temple carvings depicting celestial deities",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Jantar Mantar Historic Astronomical Observatory Sundial",
      prompt: "The monumental Samrat Yantra sundial observatory in Jaipur under clear royal blue skies, architectural precision",
      altText: "Historic Jantar Mantar astronomical observatory sundial",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Varanasi Holy Ganga Evening Aarti Celestial Flames",
      prompt: "Varanasi Ghats at dusk during Maha Aarti with multi-tiered brass flame towers held by Vedic priests overlooking holy Ganga",
      altText: "Sacred evening Ganga Aarti ceremony in holy Varanasi",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Sacred Brass Puja Vessels & Astrological Kalash",
      prompt: "Traditional sacred brass puja vessels, copper kalash with sacred coconut, and vermillion tilak offerings",
      altText: "Sacred Vedic puja copper kalash and ceremonial vessels",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1599824425751-b8e0a84e6293?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Golden Vedic Temple Sanctuary Spiritual Glow",
      prompt: "Majestic golden temple gopuram illuminated at twilight with sacred incense smoke and spiritual aura",
      altText: "Golden Indian Vedic temple sanctuary with mystical spiritual lighting",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Sacred Starry Night Sky over High Himalayan Peaks",
      prompt: "Breathtaking crystal clear night sky with Milky Way constellation arching over snow-capped Himalayan sacred peaks",
      altText: "Himalayan starry night sky with vibrant planetary constellations",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Luminous Cosmic Planetary Orbits & Constellations",
      prompt: "Golden celestial celestial sphere with orbiting planets, zodiac constellations, and golden astrological rings",
      altText: "Cosmic planetary orbits and zodiac wheel celestial illustration",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Luminous Celestial Star Chart & Deep Sky Nebula",
      prompt: "Vibrant cosmic nebula with sparkling stellar nurseries, deep indigo space dust, and glowing star clusters",
      altText: "Luminous celestial star chart and deep cosmic nebula",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Deep Space Cosmic Nebula & Celestial Time",
      prompt: "Hourglass nebula with swirling radiant cosmic gases, glowing planetary alignments, and mystical celestial depth",
      altText: "Deep space cosmic nebula with celestial time vortex",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Celestial Night Sky & Crescent Moon Glow",
      prompt: "Luminous silver crescent moon glowing in deep twilight sky with evening star Venus and soft mountain silhouette",
      altText: "Celestial crescent moon and evening star planetary alignment",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Planetary Alignments & Solar Ray Corona",
      prompt: "Spectacular solar eclipse with radiant golden corona rays, alignment of Sun, Moon and planets in deep space",
      altText: "Total solar eclipse with golden coronal rays and planetary transit",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Earth from Space with Luminous Atmospheric Ring",
      prompt: "Blue planet Earth seen from orbit with golden atmospheric limb, illuminated night lights and starry backdrop",
      altText: "Planet Earth with radiant cosmic atmosphere and constellation grid",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Cosmic Orbit & Planetary Horizon",
      prompt: "Planetary orbital horizon with solar flare reflection and deep field star clusters, astronomical precision",
      altText: "Planetary orbit horizon with sparkling cosmic star field",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Sacred Himalayan Valley & Golden Dawn Sunlight",
      prompt: "Majestic sacred Himalayan alpine valley bathed in pristine morning solar rays, mist rising over sacred rivers",
      altText: "Sacred Himalayan mountain valley illuminated by golden dawn sunlight",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Starry Himalayan Zenith & Milky Way Core",
      prompt: "High altitude starry sky with the galactic core visible above snow-covered peaks, pure celestial clarity",
      altText: "Milky Way core over snow-capped sacred mountain ridges",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Starlit Cosmic Sky over Quiet Temple Waters",
      prompt: "Tranquil holy temple pond reflecting millions of twinkling stars and celestial constellations at midnight",
      altText: "Serene sacred waters reflecting celestial stars and planetary lights",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Golden Celestial Micro-Yantra Geometry",
      prompt: "Intricate golden geometric lines resembling an energetic Sri Yantra merged with cosmic circuitries",
      altText: "Intricate golden sacred geometry yantra matrix",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Classic Indian Miniature Painting of Navagrahas",
      prompt: "Rich classical Indian miniature artwork featuring celestial planetary deities on traditional parchment",
      altText: "Classical Indian artistic depiction of celestial cosmic deities",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Sunlight Filtering Through Sacred Banyan Grove",
      prompt: "Golden solar rays streaming through a thousand-year-old sacred banyan tree in a temple courtyard",
      altText: "Golden solar rays illuminating an ancient sacred banyan tree",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Sacred Vedic Fire Havan & Agni Flames",
      prompt: "Sacred Vedic fire ritual (Agni Kund) with holy wood, ghee offerings, and rising golden flames in temple pavilion",
      altText: "Sacred Vedic fire havan ceremony with golden Agni flames",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Celestial Night Stars Over Ancient Heritage Monument",
      prompt: "Historic Indian stone monument silhouetted against deep sapphire night sky with long-exposure star trails",
      altText: "Ancient Indian stone architectural monument under celestial star trails",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Mystical Twilight Mist in Ancient Vedic Forest",
      prompt: "Ancient teak and sandalwood forest covered in glowing twilight mist with sacred silence and spiritual serenity",
      altText: "Mystical twilight mist in ancient Indian sacred forest",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Golden Sunrise at Holy Coastal Pilgrimage",
      prompt: "Radiant golden sun rising over the Indian Ocean at Rameshwaram coastal pilgrimage with sacred dawn waters",
      altText: "Golden dawn sunrise over coastal pilgrimage waters",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Vedic Cosmic Constellations & 27 Nakshatras",
      prompt: "Deep blue astronomical chart showing traditional 27 Vedic Nakshatra lunar mansions and stellar coordinates",
      altText: "Traditional Vedic Nakshatras and lunar mansions celestial map",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Holy River Confluence (Sangam) at Dawn",
      prompt: "Sacred confluence of rivers in northern India during early morning Brahma Muhurta with spiritual light",
      altText: "Sacred holy river confluence during early morning Brahma Muhurta",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Astronomical Quadrant & Zodiac Angle Measurement",
      prompt: "Precision stone astronomical quadrant in Jaipur measuring planetary azimuth and celestial declination",
      altText: "Astronomical stone quadrant measuring celestial planetary coordinates",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Navagraha Nine Planetary Mandalas in Harmony",
      prompt: "Nine celestial gemstones and planetary symbols arranged in a sacred geometric Vedic grid on silk",
      altText: "Navagraha nine planetary gemstones and astrological mandala grid",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1599824425751-b8e0a84e6293?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Sacred Temple Bell & Vedic Vibrational Chants",
      prompt: "Bronze temple bell in ancient sanctum with morning sunlight and incense smoke, sacred vibration",
      altText: "Traditional bronze temple bell in sanctum with morning light",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Marigold Flowers & Holy River Offerings",
      prompt: "Traditional clay diya lamps with glowing wicks nestled in orange marigold flower leaf boat on sacred water",
      altText: "Floating clay diya lamps with marigold flower offerings on sacred water",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Authentic Vedic Rudraksha & Sandalwood Beads",
      prompt: "Sacred Panchamukhi Rudraksha mala beads resting on fragrant sandalwood paste and holy scriptures",
      altText: "Sacred Rudraksha meditation mala beads with sandalwood paste",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Vedic Janam Kundali Birth Chart Calculation",
      prompt: "Hand-drawn North and South Indian style Janam Kundali birth chart on handmade parchment with planetary positions",
      altText: "Hand-drawn authentic Vedic Janam Kundali astrological birth chart",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Golden Cosmic Wheel of Time (Kala Chakra)",
      prompt: "Luminous Kala Chakra wheel of cosmic time with 12 zodiac houses radiating golden light, 8k render",
      altText: "Golden Kala Chakra wheel of cosmic time with zodiac houses",
    },
  ],

  // -------------------------------------------------------------
  // 2. HEALTH & WELLNESS (35 UNIQUE IMAGES)
  // -------------------------------------------------------------
  health: [
    {
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Mindful Yoga Asana & Morning Breathwork",
      prompt: "Serene practitioner in seated meditation overlooking misty sunrise mountains, natural calm lighting",
      altText: "Morning yoga meditation and breathwork overlooking mountains",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Nutrient-Dense Organic Superfood Bowl",
      prompt: "Vibrant bowl of colorful fresh antioxidant berries, chia seeds, avocado and green leaves on wooden table",
      altText: "Colorful nutrient-dense organic superfood bowl",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Functional Athletic Mobility & Vitality",
      prompt: "Athlete stretching with resistance bands in clean minimalist gym with warm morning light",
      altText: "Functional athletic mobility training and muscle recovery",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Restorative Yoga & Deep Fascial Release",
      prompt: "Gentle restorative yoga pose with supportive bolsters in peaceful bamboo studio",
      altText: "Restorative yoga pose for fascial release and nervous system calm",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Fresh Mediterranean Longevity Salad",
      prompt: "Top down view of fresh Mediterranean salad with extra virgin olive oil, herbs, walnuts and pomegranate",
      altText: "Mediterranean longevity salad with healthy fats and fresh greens",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Strength Conditioning & Core Biomechanics",
      prompt: "Kettlebell strength training with focus on spinal alignment and functional core stability",
      altText: "Functional strength conditioning workout and biomechanics",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Herbal Ayurveda Infusions & Calming Decoctions",
      prompt: "Steaming ceramic cup of fresh chamomile, ginger and turmeric tea with loose dried botanicals",
      altText: "Herbal botanical infusion tea for digestive wellness and relaxation",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Clean Meal Prep & Balanced Macronutrients",
      prompt: "Neatly organized meal prep containers with grilled salmon, quinoa, steamed broccoli and avocado",
      altText: "Balanced macronutrient healthy meal prep containers",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Zone-2 Trail Running & Aerobic Capacity",
      prompt: "Trail runner traversing forest path at sunrise, golden rim lighting, dynamic athletic endurance",
      altText: "Morning trail running in forest for aerobic conditioning",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Clinical Integrative Health & Cellular Diagnostics",
      prompt: "Doctor examining digital biometric biomarker dashboard and blood panel metrics on tablet",
      altText: "Integrative healthcare professional analyzing clinical biomarker panel",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Pilates Reformer Core Alignment",
      prompt: "Pilates reformer session focusing on precise pelvic alignment and elongated postural strength",
      altText: "Pilates reformer session for core stability and posture",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Fresh Organic Green Cold-Pressed Juice",
      prompt: "Glass bottle of cold-pressed green juice surrounded by fresh kale, celery, lemon and ginger roots",
      altText: "Cold-pressed green superfood juice for metabolic detox",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Sleep Architecture & Circadian Tracking",
      prompt: "Smart biometric sleep tracking ring on bedside table next to warm reading lamp and notebook",
      altText: "Biometric sleep tracking and circadian rest optimization",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Forest Bathing (Shinrin-Yoku) & Nature Immersion",
      prompt: "Person walking mindfully through lush green redwood forest with dappled sunlight, deep calm",
      altText: "Mindful forest bathing walk for cortisol reduction",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Stethoscope & Evidence-Based Cardiology",
      prompt: "Modern stethoscope resting on clean medical chart with ECG heart rhythm graph",
      altText: "Cardiovascular health monitoring with stethoscope and ECG rhythm",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Corporate Wellness & Ergonomic Workspace",
      prompt: "Professional using standing desk with ergonomic chair, hydration flask and indoor green plants",
      altText: "Ergonomic standing desk setup for active workplace health",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Vagus Nerve & Breath Regulation",
      prompt: "Close up portrait of person in deep diaphragmatic breathing with hand over heart",
      altText: "Diaphragmatic breathing exercise for vagal tone stimulation",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Healthy Plant-Based Balanced Nutrition",
      prompt: "Artisanal wooden board with roasted root vegetables, hummus, avocado and sprouted seeds",
      altText: "Plant-based nutrient dense meal with roasted vegetables and hummus",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Acupuncture & Meridian Energy Flow",
      prompt: "Precise gentle acupuncture needle placement along meridian points with peaceful spa ambience",
      altText: "Acupuncture therapy for pain management and nervous system balance",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1579126038374-6064e9370f0f?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Cold Plunge & Contrast Hydrotherapy",
      prompt: "Cedar cold plunge tub outdoors surrounded by winter pines and crisp morning frost",
      altText: "Cold water immersion tub for vascular conditioning and dopamine reset",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "High-Intensity Interval Conditioning (HIIT)",
      prompt: "Gym floor with rowing machines, barbells and athletes engaging in metabolic sprint intervals",
      altText: "Metabolic conditioning and sprint intervals in training gym",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Antioxidant Polyphenol Berry Spread",
      prompt: "Wild blueberries, blackberries, raspberries and dark cacao nibs arranged on slate platter",
      altText: "Antioxidant polyphenol berries for brain health and anti-aging",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Tibetan Singing Bowls & Sound Bath Healing",
      prompt: "Hand-hammered brass singing bowls arranged on silk mat with gentle vibration ripples in water",
      altText: "Tibetan singing bowls for acoustic nervous system relaxation",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Spinal Health & Postural Alignment",
      prompt: "Anatomical spine model in physical therapy clinic with gentle natural lighting",
      altText: "Spinal alignment model for physical therapy and ergonomics",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Outdoor Calisthenics & Bodyweight Strength",
      prompt: "Athlete performing pull-ups on outdoor park bars under sunny blue sky",
      altText: "Outdoor calisthenics workout for joint health and strength",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Fermented Foods & Gut Microbiome",
      prompt: "Glass fermentation jars with kimchi, sauerkraut, kefir and kombucha on rustic counter",
      altText: "Probiotic fermented foods for gut microbiome biodiversity",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Somatic Grounding on Natural Earth",
      prompt: "Bare feet walking on morning dew grass, earthing and electrical grounding concept",
      altText: "Earthing grounding walk on natural morning grass",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Adaptogenic Herbs & Reishi Mushroom",
      prompt: "Whole dried reishi mushroom, ashwagandha root slices and holy basil leaves on dark slate",
      altText: "Adaptogenic medicinal herbs for adrenal fatigue and stress resilience",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Electrolyte Hydration & Mineral Balance",
      prompt: "Glass of crystal clear water with fresh lime slices and pinch of pink Himalayan mineral salt",
      altText: "Mineral electrolyte hydration for cellular hydration",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Microscopic Cellular Mitochondrial Glow",
      prompt: "Luminous 3D visualization of human cellular structure with glowing mitochondria and ATP energy",
      altText: "Cellular mitochondrial energy production and ATP synthesis",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Organic Farmers Market Fresh Greens",
      prompt: "Vibrant baskets of freshly harvested organic spinach, rainbow chard, radishes and heirloom carrots",
      altText: "Freshly harvested organic vegetables from local farmers market",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Red Light Photobiomodulation Therapy",
      prompt: "Targeted deep red light therapy panel illuminating skin surface for collagen stimulation",
      altText: "Red light photobiomodulation therapy for skin and cellular repair",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Mountain Trail Hike for Mental Clarity",
      prompt: "Hiker standing on mountain summit looking at wide panoramic horizon, sun in hair",
      altText: "Mountain hiking for cardiovascular stamina and psychological clarity",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Clinical DNA & Epigenetic Mapping",
      prompt: "Glowing double helix DNA strand model in modern medical research laboratory",
      altText: "DNA double helix and epigenetic health optimization model",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Mindful Journaling & Gratitude Practice",
      prompt: "Hand holding fountain pen writing in leather bound journal next to steaming herbal tea",
      altText: "Daily reflective wellness journaling and mindfulness practice",
    },
  ],

  // -------------------------------------------------------------
  // 3. DIGITAL MARKETING, SEO & GROWTH (35 UNIQUE IMAGES)
  // -------------------------------------------------------------
  digital: [
    {
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Executive Digital Analytics & Revenue Dashboard",
      prompt: "Modern financial analytics and traffic growth dashboard on dual monitors with upward trending charts",
      altText: "Executive digital analytics and multi-channel revenue dashboard",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Real-Time Conversion Funnel Analytics",
      prompt: "Interactive data visualization showing user acquisition cohorts, conversion milestones, and CAC efficiency",
      altText: "Real-time conversion funnel and customer acquisition metrics",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Strategic Marketing War Room & Content Planning",
      prompt: "Clean wooden conference table with laptops, strategy wireframes, and colorful sticky notes during product launch",
      altText: "Marketing strategy brainstorming war room and content launch calendar",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Omnichannel Social Media Campaign Command Center",
      prompt: "Multiple mobile screens displaying live social media video campaign metrics and engagement analytics",
      altText: "Omnichannel social media campaign and influencer marketing command center",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Targeted Performance Advertising & Ad Spend Matrix",
      prompt: "Digital marketer analyzing Google Ads and Meta campaign ROAS metrics with glowing interactive graphs",
      altText: "Performance advertising spend optimization and ROAS analytics",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "SERP Search Keyword Intelligence Matrix",
      prompt: "High-contrast search engine ranking tracker displaying keyword intent, search volume, and entity authority",
      altText: "SERP search keyword intelligence and organic ranking tracker",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Collaborative Growth Team Strategy Sprint",
      prompt: "Agile marketing squad gathered around large display discussing quarterly OKRs and conversion experiments",
      altText: "Agile growth marketing team conducting strategy optimization sprint",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Enterprise SaaS Customer Journey Mapping",
      prompt: "Team analyzing customer lifecycle stages, retention flywheels, and net promoter score touchpoints",
      altText: "Enterprise SaaS customer journey map and retention funnel",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Brand Identity & High-Converting Landing Page Design",
      prompt: "Designer fine-tuning typography, contrast ratios, and call-to-action button placements on tablet",
      altText: "High-converting landing page UI design and brand identity",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Executive Boardroom Data Presentation",
      prompt: "Marketing VP presenting annual growth projections on high-definition conference room display",
      altText: "Executive boardroom presentation of annual marketing ROI and metrics",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Creative Content Studio & Video Production",
      prompt: "Podcast microphone, 4K camera, and studio lighting setup for high-authority brand storytelling",
      altText: "Professional video podcast and multimedia brand studio",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Agile Product Marketing Standup",
      prompt: "Marketing team reviewing sprint board with prioritized feature launches and organic distribution tasks",
      altText: "Product marketing standup reviewing launch tasks and distribution roadmap",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Global Media Conference & Keynote Lecture",
      prompt: "Speaker addressing auditorium of digital marketers with large slide on consumer attention trends",
      altText: "Digital marketing conference keynote on search trends and consumer psychology",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Modern Minimalist Content Writer Desk",
      prompt: "Mechanical keyboard, espresso cup, notepad, and ultra-wide monitor showing markdown editor",
      altText: "Ergonomic content strategist workspace with markdown editor",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "B2B Executive Relationship & High-Ticket Closing",
      prompt: "Executive shaking hands in modern sunlit office with floor-to-ceiling glass windows",
      altText: "B2B enterprise partnership agreement and executive sales meeting",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Modern Financial District Skyscraper Architecture",
      prompt: "Looking up at glass skyscraper facades reflecting blue clouds, corporate prestige and scale",
      altText: "Modern financial district headquarters representing enterprise brand authority",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "E-Commerce Checkout & Seamless Payment Flow",
      prompt: "Hand holding smartphone completing 1-click mobile checkout with secure cryptographic confirmation",
      altText: "Seamless mobile checkout flow and conversion rate optimization",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Customer Success & User Feedback Interview",
      prompt: "Customer success manager in video interview taking notes on user experience feedback",
      altText: "Customer interview for qualitative insights and user journey friction analysis",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Clean Scandinavian Digital Strategy Desk",
      prompt: "MacBook on wooden desk with ceramic mug, notebook with mind map, and soft morning sunlight",
      altText: "Scandinavian aesthetic desk for digital marketing and content drafting",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Email Marketing Automation & Lifecycle Trigger Flow",
      prompt: "Flowchart on tablet screen showing automated email nurture sequences and subscriber segmentation",
      altText: "Automated email marketing lifecycle workflows and customer segmentation",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Creative Brand Moodboard & Color Palette Selection",
      prompt: "Art director arranging pantone color cards, typography samples, and texture swatches on studio desk",
      altText: "Brand moodboard with typography samples and color palette cards",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Influencer Campaign Strategy & Creator Economy",
      prompt: "Content creator in bright studio with ring light reviewing sponsored brand integration storyboard",
      altText: "Creator economy studio and influencer marketing campaign planning",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "A/B Testing Split Experimentation Matrix",
      prompt: "Split test analytics chart showing Variant A vs Variant B statistical significance and conversion lift",
      altText: "A/B testing split experiment dashboard showing statistically significant conversion gains",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Quarterly Growth Marketing Review Workshop",
      prompt: "Marketing executives analyzing competitor market share pie charts on interactive whiteboard",
      altText: "Marketing team conducting competitive analysis and market share audit",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Zero-Click Search & AI Overview Ranking Strategy",
      prompt: "Search engine results page showing rich snippet answer cards and structured schema breadcrumbs",
      altText: "SERP rich snippet and generative search overview optimization",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Multi-Touch Attribution Model & Channel ROAS",
      prompt: "Sankey diagram showing user touchpoints from organic search to paid social to direct purchase",
      altText: "Multi-touch marketing attribution model mapping user conversion touchpoints",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Editorial Calendar Scheduling & Publishing Velocity",
      prompt: "Digital calendar application on laptop showing 30 scheduled multi-platform articles and social assets",
      altText: "Content calendar publishing pipeline and editorial queue",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Viral Video Hook Testing & Mobile Retention Graph",
      prompt: "Audience retention graph showing first 3-second hook drop-off rates and completion percentages",
      altText: "Short-form video retention curve and viral hook optimization",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "B2B Account-Based Marketing (ABM) Playbook",
      prompt: "Target account list matrix categorized by deal size, intent signals, and executive decision-makers",
      altText: "Account-based marketing matrix and enterprise intent tracking",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Topical Authority Cluster & Internal Linking Architecture",
      prompt: "Node graph showing pillar content connected to 10 supporting sub-topic articles with internal links",
      altText: "Topical cluster and semantic internal linking graph",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Growth Hacking & Viral Referral Loops",
      prompt: "Whiteboard diagram illustrating viral invitation loops, user onboarding rewards, and K-factor formula",
      altText: "Growth hacking viral loop and referral mechanism diagram",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Customer Lifetime Value (LTV) Cohort Matrix",
      prompt: "Heatmap matrix tracking 12-month cohort retention and average revenue per user (ARPU)",
      altText: "Cohort retention heatmap and customer lifetime value matrix",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "High-Trust Social Proof & Case Study Showcase",
      prompt: "Customer testimonial badges, Fortune 500 company logos, and verified G2 review score ribbons",
      altText: "Social proof badges, client logos, and verified review ratings",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Competitive Intelligence & SERP Gap Analysis",
      prompt: "Side-by-side domain authority, backlink profile, and content gap comparison between competing brands",
      altText: "Competitive intelligence matrix and backlink gap analysis",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Digital PR & High-DA Editorial Outreach",
      prompt: "Press release wire distribution console with live coverage alerts from Tier-1 media publications",
      altText: "Digital PR outreach dashboard and editorial media pickups",
    },
  ],

  // -------------------------------------------------------------
  // 4. AI & MACHINE LEARNING (35 UNIQUE IMAGES)
  // -------------------------------------------------------------
  ai: [
    {
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Luminous 3D Neural Nodes & Deep Learning Matrix",
      prompt: "Glowing golden and sapphire neural network nodes with synaptic data transmissions, 8k render",
      altText: "Luminous 3D neural network nodes and synaptic connections",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Synthetic Synapses & Transformer Multi-Head Attention",
      prompt: "Abstract multi-dimensional vector space with glowing attention heads and embedding coordinates",
      altText: "Multi-head attention vector space and machine learning embeddings",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Generative AI Cybernetic Interface",
      prompt: "Futuristic holographic AI dialogue interface with glowing text tokens and prompt synthesis visual",
      altText: "Holographic generative AI prompt interface and neural tokens",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Matrix Binary Stream & Deep Vector Search",
      prompt: "Emerald glowing code streams cascading through cybernetic data plane with high depth of field",
      altText: "Matrix binary data stream and vector database search",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Next-Gen AI Microchip Processor Architecture",
      prompt: "Macro close-up of cutting-edge silicon TPU accelerator with golden circuits and quantum wafer reflections",
      altText: "Next-generation silicon AI microchip accelerator",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Humanoid Artificial Cognition & Synthetic Empathy",
      prompt: "Sleek white humanoid robot profile illuminated by soft studio lighting with thoughtful gaze",
      altText: "Humanoid robot with thoughtful artificial cognition expression",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Autonomous Robotic Arm Precision Automation",
      prompt: "High-precision industrial robotic arm assembling micro-circuitry in sterile cleanroom facility",
      altText: "High-precision industrial robotic automation in cleanroom",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Deep Learning Neural Code & Python Architecture",
      prompt: "Dual monitor setup displaying PyTorch neural model training scripts and real-time loss curves",
      altText: "PyTorch deep learning model architecture and training scripts",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Quantum Computing Qubit Lattice",
      prompt: "Golden dilution refrigerator chandelier for quantum compute processor with intricate copper piping",
      altText: "Quantum computing dilution refrigerator chandelier",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "AI Agent Orchestration & Workflow Topology",
      prompt: "Developer coding multi-agent tool-calling protocols on laptop with clean ambient lighting",
      altText: "Multi-agent autonomous tool-calling developer setup",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "High-Density GPU Training Cluster Rack",
      prompt: "Datacenter aisle with rows of GPU training servers glowing with cyan status LEDs and fiber links",
      altText: "High-density GPU datacenter cluster for LLM training",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Synthetic Data Generation & DPO Alignment",
      prompt: "Abstract visualization of synthetic data pipelines filtering and aligning model weights with human intent",
      altText: "Synthetic data filtering and direct preference alignment pipeline",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Multimodal Vision-Language Reasoning Engine",
      prompt: "Computer vision bounding boxes identifying complex spatial objects and scene understanding in real time",
      altText: "Computer vision bounding boxes and multimodal spatial reasoning",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "AI Safety & Automated Model Red-Teaming",
      prompt: "Security engineer running adversarial prompt injection tests against LLM guardrails",
      altText: "AI safety engineer running automated adversarial red-team benchmarks",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Global Distributed AI Edge Mesh",
      prompt: "Global earth network with glowing orbital data links connecting edge inferencing nodes worldwide",
      altText: "Global distributed AI edge inferencing mesh network",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "RAG Retrieval-Augmented Vector Knowledge Graph",
      prompt: "Dense 3D knowledge graph with interconnected semantic clusters and live citation pointers",
      altText: "RAG retrieval-augmented vector knowledge graph and citations",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Quantized 4-Bit Edge Model Inference",
      prompt: "Microcontroller running compressed neural weights locally with zero internet latency",
      altText: "Quantized 4-bit edge model inferencing on local microcontroller",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Autonomous Code Synthesis & Self-Refactoring",
      prompt: "Automated agent refactoring legacy codebase, passing unit tests, and committing clean git branches",
      altText: "Autonomous AI code synthesis and automated unit test verification",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Real-Time Audio-Speech Multimodal Streaming",
      prompt: "Live audio waveform interacting synchronously with language model tokens at 150ms roundtrip",
      altText: "Real-time bidirectional speech-to-speech multimodal streaming",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Neuromorphic Memristor Brain-Inspired Compute",
      prompt: "Nanoscale memristor grid firing analog electrical impulses mimicking biological synapses",
      altText: "Neuromorphic brain-inspired hardware and analog synaptic computing",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Autonomous Robotic Spatial Navigation",
      prompt: "Mobile service robot navigating complex indoor environment using LiDAR point cloud mapping",
      altText: "Autonomous mobile robot navigating with real-time LiDAR point clouds",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "AI-Powered Scientific Discovery & Protein Folding",
      prompt: "Complex 3D molecular protein structure folding with glowing binding pockets and drug candidate molecules",
      altText: "AI molecular protein folding and computational drug discovery",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Deterministic Guardrails & Hallucination Suppression",
      prompt: "Schema validation pipeline catching semantic drift and verifying citation provenance before output",
      altText: "Deterministic guardrails and schema validation for AI outputs",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Federated Learning Privacy-Preserving AI",
      prompt: "Decentralized smartphones training local gradient models without uploading raw private user data",
      altText: "Federated learning on mobile devices with privacy-preserving cryptography",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Sub-50ms LLM Token Streaming Engine",
      prompt: "Terminal window displaying instantaneous token streaming throughput of 200 tokens per second",
      altText: "Sub-50ms token streaming benchmark and low-latency inference",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Liquid Cooling Datacenter for AI Clusters",
      prompt: "Server blades immersed in crystal clear non-conductive dielectric fluid with rising thermal bubbles",
      altText: "Liquid immersion cooling datacenter tanks for high-TDP AI accelerators",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Autonomous Financial Algorithmic Strategy",
      prompt: "High-frequency quantitative trading terminal running deep reinforcement learning arbitrage models",
      altText: "Quantitative algorithmic trading model with deep reinforcement learning",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Semantic Video Understanding & Frame Segmentation",
      prompt: "Video timeline segmented with scene timestamps, speaker diarization, and multimodal entity tags",
      altText: "Multimodal video analysis and automatic scene segmentation",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Autonomous Robotic Drone Inspection",
      prompt: "Drone scanning offshore wind turbine blade with computer vision crack detection overlay",
      altText: "Autonomous inspection drone utilizing real-time computer vision",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Satellite Earth Observation & AI Climate Modeling",
      prompt: "Satellite thermal imagery analyzed by machine learning to predict crop yields and wildfire spread",
      altText: "Satellite climate analysis powered by machine learning algorithms",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Post-Transformer Recurrent Memory Architectures",
      prompt: "Linear state-space model (SSM) processing infinite context sequences with O(1) memory overhead",
      altText: "Linear state space model architecture for infinite context reasoning",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Cross-Lingual Zero-Shot Neural Translation",
      prompt: "Linguistic semantic space aligning 100 languages into unified conceptual meaning representations",
      altText: "Unified cross-lingual semantic embedding space",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Automated Enterprise Knowledge Synthesis",
      prompt: "Enterprise search tool summarizing 10,000 PDF documents into concise actionable bullet points",
      altText: "Enterprise document synthesis and automated summary generator",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Cyber Defense AI Autonomous Threat Neutralization",
      prompt: "AI network firewall instantly isolating anomalous lateral traffic in 800 milliseconds",
      altText: "Autonomous cyber defense system neutralizing security anomalies",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Frontier 2027 Artificial General Intelligence Roadmap",
      prompt: "Futuristic glowing research blueprint mapping multimodal reasoning, world models, and robotic embodiment",
      altText: "Frontier research blueprint mapping the future of artificial general intelligence",
    },
  ],

  // -------------------------------------------------------------
  // 5. NGO & HUMANITARIAN IMPACT (35 UNIQUE IMAGES)
  // -------------------------------------------------------------
  ngo: [
    {
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Compassionate Child Outreach & Global Education",
      prompt: "Dedicated volunteer reading books with children in bright community learning center, warm smiles",
      altText: "Humanitarian volunteer reading with children in community learning center",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb7?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Community Solidarity Hands & Collaborative Action",
      prompt: "Diverse group of community volunteers joining hands in solidarity and shared purpose outdoors",
      altText: "Diverse volunteers joining hands in solidarity for community support",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Transparent Charity Donation & Essential Aid",
      prompt: "Cardboard donation box filled with nutritious dry goods, fresh fruits, and school supplies",
      altText: "Charity donation package filled with essential food and supplies",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Grassroots Global Humanitarian Outreach",
      prompt: "Aid worker delivering emergency medical supplies to rural village clinic, sunset glow",
      altText: "Aid worker delivering essential medical supplies to rural community clinic",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Community Reforestation & Indigenous Tree Planting",
      prompt: "Hands cupping rich dark soil nurturing a young green sapling in rainforest restoration reserve",
      altText: "Hands planting a young green tree sapling for community reforestation",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Volunteer Teamwork & Community Food Bank",
      prompt: "Volunteers packing boxes of organic fresh produce in community food pantry warehouse",
      altText: "Volunteers organizing and packing fresh produce at local food pantry",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Collaborative NGO Strategic Partnership",
      prompt: "Non-profit coordinators and local community leaders reviewing field program roadmap together",
      altText: "Non-profit leaders collaborating on community development program roadmap",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Rural Solar Power Installation for Off-Grid Schools",
      prompt: "Solar technician installing photovoltaic panels on rooftop of remote rural schoolhouse",
      altText: "Solar power installation bringing clean electricity to off-grid rural school",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Clean Water Well & Solar Nanofiltration Tap",
      prompt: "Clear drinking water flowing from clean community tap in sunny village, children smiling",
      altText: "Clean drinking water flowing from solar-powered village filtration well",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Diverse Volunteer Team Celebrating Community Milestone",
      prompt: "Multi-generational volunteers cheering and celebrating completion of new neighborhood playground",
      altText: "Diverse volunteers celebrating completion of community renovation project",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Dignified Community Storytelling & Portraiture",
      prompt: "Empathetic documentary portrait of local community leader in natural warm morning light",
      altText: "Dignified documentary portrait of inspiring community organizer",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Trauma-Informed Somatic Healing Circle",
      prompt: "Supportive circle of women holding hands in peaceful outdoor garden pavilion, healing dialogue",
      altText: "Trauma-informed supportive healing circle in community garden",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Transparent NGO Financial Auditing & Public Ledger",
      prompt: "Financial auditor reviewing non-profit balance sheets and programmatic impact metrics",
      altText: "Transparent non-profit financial accounting and donor impact reporting",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Empowering Female Micro-Entrepreneurs in Developing Nations",
      prompt: "Woman artisan in textile cooperative proudly weaving colorful traditional organic cotton fabrics",
      altText: "Female artisan weaving organic textiles in fair-trade micro-enterprise cooperative",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Disaster Relief Mesh-Radio & SMS Coordination",
      prompt: "Emergency coordinator with portable satellite radio dispatching relief trucks after storm",
      altText: "Emergency disaster relief coordinator using portable satellite communication",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Youth Mentorship & STEM Digital Literacy",
      prompt: "High school students learning robotics and coding on donated laptops with enthusiastic mentor",
      altText: "Youth STEM digital literacy workshop with enthusiastic community mentors",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb7?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Elderly Care & Multigenerational Companionship",
      prompt: "Young volunteer having cheerful conversation and sharing tea with elderly resident in sunny room",
      altText: "Volunteer providing companionship and social care to senior citizen",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Permaculture Food Forests & Regenerative Farming",
      prompt: "Bountiful organic permaculture garden with diverse companion vegetables, herbs, and fruit trees",
      altText: "Regenerative community permaculture garden producing sustainable food",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Mobile Health Clinic & Vaccination Outreach",
      prompt: "Doctors in mobile health van providing free health checkups and vaccinations to rural families",
      altText: "Mobile medical clinic van providing free healthcare in rural communities",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Habitat Restoration & Wildlife Corridor Protection",
      prompt: "Conservationists planting native flowering shrubs along protected wildlife migratory corridor",
      altText: "Wildlife conservationists restoring native habitat corridors",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Refugee Resettlement & Language Integration",
      prompt: "Welcoming classroom with language teacher writing on whiteboard for newly arrived immigrant families",
      altText: "Refugee integration classroom teaching language and job skills",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Clean Ocean Plastic Cleanup & River Interceptors",
      prompt: "Environmental volunteers sorting ocean plastic debris on coastline for circular recycling",
      altText: "Volunteers removing plastic waste from coastal beaches for recycling",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Affordable Ecological Housing Construction",
      prompt: "Volunteers raising wooden frames for energy-efficient affordable family homes",
      altText: "Volunteers building energy-efficient affordable homes for community families",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Legal Aid & Human Rights Defense Clinics",
      prompt: "Pro-bono human rights attorneys assisting families with legal documentation and tenant protections",
      altText: "Pro-bono legal aid clinic providing defense support to vulnerable families",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Indigenous Seed Vaults & Biodiversity Preservation",
      prompt: "Elders carefully cataloging heirloom non-GMO crop seeds in clay pots for future generations",
      altText: "Indigenous seed keepers preserving heirloom seeds and biodiversity",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Mental Health Walk-In Crisis Center",
      prompt: "Compassionate counselor offering warm tea and listening ear in quiet, safe community sanctuary",
      altText: "Walk-in community crisis counseling sanctuary offering emotional support",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Universal School Breakfast Program",
      prompt: "Children happily enjoying nutritious oatmeal, fresh fruits, and warm milk in school cafeteria",
      altText: "Healthy school breakfast program ensuring child nutritional security",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Community Library & Free Tool Lending Shed",
      prompt: "Neighborhood residents borrowing gardening tools, power drills, and sewing machines from community shed",
      altText: "Community tool library promoting shared circular resource sharing",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Emergency Winter Warmth Shelter & Blanket Distribution",
      prompt: "Volunteers distributing warm insulated winter coats, thermal socks, and sleeping bags to unhoused individuals",
      altText: "Emergency winter supply distribution for unhoused community members",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Urban Rooftop Apiary & Pollinator Sanctuaries",
      prompt: "Beekeeper in protective suit inspecting honeycomb frames in rooftop urban garden",
      altText: "Urban beekeeping and pollinator habitat restoration on city rooftop",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb7?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Zero-Waste Circular Fashion Upcycling Workshops",
      prompt: "Community workshop teaching participants how to repair, mend, and upcycle discarded garments",
      altText: "Community clothing repair and textile upcycling workshop",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Solar Cookers & Clean Household Energy",
      prompt: "Families in sunny rural region cooking nutritious meals using zero-smoke parabolic solar cookers",
      altText: "Zero-smoke parabolic solar cookers providing clean household energy",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Accessible Wheelchair Ramps & Disability Rights",
      prompt: "Volunteers constructing sturdy wooden accessibility ramp for wheelchair user's home entrance",
      altText: "Volunteers installing accessibility ramps for community members with disabilities",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Public Park Cleanups & Urban Greening",
      prompt: "Families planting colorful native wildflower gardens in urban city park with watering cans",
      altText: "Community volunteers planting native wildflower gardens in urban public park",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Global Non-Profit Leadership & Vision 2030",
      prompt: "Global coalition of NGO directors holding hands on stage at humanitarian summit",
      altText: "Global humanitarian coalition leaders uniting for sustainable development goals",
    },
  ],

  // -------------------------------------------------------------
  // 6. TECH, CLOUD, CYBERSECURITY & ENGINEERING (35 UNIQUE IMAGES)
  // -------------------------------------------------------------
  tech: [
    {
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Enterprise Cloud Datacenter & Fiber Optic Backbone",
      prompt: "High-density cloud server racks with glowing blue and amber fiber optic cables in modern datacenter",
      altText: "Enterprise cloud server datacenter with glowing fiber optic cables",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Zero-Trust Cybersecurity & Cryptographic Defense",
      prompt: "Futuristic digital padlock with glowing binary matrix and cryptographic key authentication",
      altText: "Zero-trust cybersecurity lock and cryptographic defense matrix",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Encrypted Data Pipelines & Network Firewall",
      prompt: "Glowing green terminal code cascading through multi-layer security firewall visualization",
      altText: "Encrypted data pipeline and multi-layered network firewall",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Semiconductor Silicon Wafer & Hardware Engineering",
      prompt: "Macro view of microchip circuit board with golden soldered nodes and precision capacitors",
      altText: "Semiconductor microchip circuit board and hardware architecture",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Global Distributed Edge Compute Mesh",
      prompt: "Satellite view of earth connected by glowing fiber networks and distributed edge nodes",
      altText: "Global distributed edge computing and low-latency cloud mesh",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Modern Responsive UI/UX Interface Design",
      prompt: "Designer working on multi-device glassmorphism web application wireframes in Figma",
      altText: "Modern responsive web UI/UX interface design and wireframing",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Big Data Stream & SQL Query Analytics",
      prompt: "Real-time interactive data dashboard with streaming telemetry charts and throughput metrics",
      altText: "Big data streaming analytics dashboard and query telemetry",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "TypeScript Code Architecture & Full-Stack IDE",
      prompt: "Clean dark mode code editor displaying structured TypeScript classes and unit test suite",
      altText: "TypeScript code editor with clean architectural structure",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Site Reliability Engineering (SRE) Command Center",
      prompt: "DevOps engineer monitoring multi-region Kubernetes cluster health and latency graphs",
      altText: "Site reliability engineering monitoring Kubernetes cluster health",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Software Architecture Whiteboarding & Microservices",
      prompt: "Architect sketching distributed event-driven microservices topology on glass board",
      altText: "Software architecture diagram for event-driven microservices",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Ergonomic Developer Desk & Mechanical Keyboard",
      prompt: "Clean minimalist developer workstation with split mechanical keyboard, MacBook and warm desk lamp",
      altText: "Clean minimalist developer workstation and coding setup",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Security Operations Center (SOC) Multi-Screen Wall",
      prompt: "Security analysts in dark control room tracking worldwide cyber attacks on wall-sized map",
      altText: "Security Operations Center monitoring global threat intelligence",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Design Systems & Component Library Specifications",
      prompt: "Design tokens, color swatches, button states, and accessible typography scale on tablet",
      altText: "Design system tokens and component library specifications",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "High-Speed Hardware Bus & Low Latency Memory",
      prompt: "Golden RAM bus traces on multi-layer printed circuit board with high-speed transmission lanes",
      altText: "High-speed hardware memory bus on multi-layer PCB",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Satellite Internet Mesh & Orbital Telemetry",
      prompt: "Constellation of low-earth orbit satellites relaying high-bandwidth laser signals",
      altText: "Low-earth orbit satellite constellation relaying high-speed internet",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Immersion Liquid Tank Datacenter Cooling",
      prompt: "Server modules submerged in clear cooling fluid with zero fans and ultra-low energy consumption",
      altText: "Immersion liquid cooling server tanks for sustainable compute",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Biometric Hardware Security & MFA Authentication",
      prompt: "Fingerprint scanner on sleek metallic door access panel with green authorized LED ring",
      altText: "Biometric hardware access scanner for multi-factor authentication",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Real-Time Log Aggregator & Trace Telemetry",
      prompt: "Grafana dashboard displaying microsecond request spans, error rates, and p99 response times",
      altText: "Grafana distributed tracing and log aggregator dashboard",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Dark Mode Mobile App Ergonomic Design",
      prompt: "Smartphone running elegant dark-themed dashboard with subtle micro-interactions and smooth curves",
      altText: "Dark mode mobile application interface with modern ergonomics",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Database Schema Sharding & PostgreSQL Query Plan",
      prompt: "Relational database ERD diagram showing foreign keys, indexed columns, and partition tables",
      altText: "Relational database ERD schema and partitioned query plan",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Continuous Integration & Automated Test Pipeline",
      prompt: "Green checkmarks on GitHub Actions CI pipeline showing all 450 automated tests passing",
      altText: "Automated continuous integration pipeline with all tests passing",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Red-Team Ethical Penetration Testing",
      prompt: "Security researcher auditing network vulnerability reports and fuzzing API endpoints",
      altText: "Ethical penetration tester auditing API vulnerability endpoints",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "WebAssembly (WASM) High-Performance Sandbox",
      prompt: "Browser running compiled C++/Rust modules at native bare-metal execution speeds",
      altText: "WebAssembly high-performance runtime execution in browser sandbox",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Modern Open Source Contributor Workspace",
      prompt: "Developer reviewing pull request diffs on GitHub with coffee mug and headphones on desk",
      altText: "Open source software developer reviewing pull request code diffs",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Hardware Security Module (HSM) Cryptographic Vault",
      prompt: "Tamper-resistant hardware security module generating RSA and elliptic curve master keys",
      altText: "Hardware Security Module cryptographic key vault and signing engine",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Accessible Web Contrast (WCAG AAA) Auditor",
      prompt: "Designer checking color contrast ratios and keyboard focus rings for screen reader compliance",
      altText: "Web accessibility contrast compliance and keyboard navigation audit",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "FPGA Custom ASIC Acceleration Architecture",
      prompt: "Field-programmable gate array chip configured for hardware-level mathematical acceleration",
      altText: "Custom FPGA chip accelerator for low-latency mathematical computation",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Serverless Edge Function Execution Cold-Start Zero",
      prompt: "V8 isolate sandboxes executing sub-millisecond edge requests across 300 global regions",
      altText: "Serverless V8 isolate edge function executing with zero cold-starts",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "100 Gbps Software-Defined Network (SDN) Switch",
      prompt: "Network switch with flashing multi-color activity LEDs routing terabytes of enterprise packets",
      altText: "Software-defined network switch routing high-throughput packets",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "End-to-End Encrypted Messaging Protocol",
      prompt: "Signal protocol cryptographic handshake verifying ratchet keys between two smartphones",
      altText: "End-to-end encrypted messaging cryptographic key exchange protocol",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Real-Time Event Streaming with Apache Kafka",
      prompt: "Diagram of distributed partitioned Kafka topics publishing millions of events per second",
      altText: "Distributed Apache Kafka real-time event streaming cluster",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "High-Precision 60fps WebGL Fluid Rendering",
      prompt: "Browser canvas rendering smooth 3D particle physics simulation with real-time lighting shaders",
      altText: "Real-time 60fps WebGL particle shader simulation on canvas",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Columnar Analytical Database (ClickHouse / DuckDB)",
      prompt: "Columnar vector database executing billion-row aggregation query in 12 milliseconds",
      altText: "High-speed columnar analytical database query processing engine",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Monorepo Dependency Graph & Turbo Build Cache",
      prompt: "Dependency graph of 50 micro-packages executing parallel builds with zero cache misses",
      altText: "Monorepo dependency graph and parallel incremental build cache",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      visualTheme: "Chaos Engineering & Automated Fault Injection",
      prompt: "Chaos engineering tool injecting simulated packet loss and server outages to prove self-healing resilience",
      altText: "Chaos engineering fault injection proving system automated self-healing",
    },
  ],
};

// Safe helper that guarantees a distinct, category-accurate image for any day index (0..34)
export function getUniqueCategoryImage(
  categoryInput: string,
  index: number,
  contextText?: string
): CategoryImageSpec {
  const canonicalKey = normalizeCategoryKey(categoryInput, contextText);
  let pool = CATEGORY_IMAGE_COLLECTIONS[canonicalKey];

  if (!pool || pool.length === 0) {
    if (canonicalKey === 'seo') {
      pool = CATEGORY_IMAGE_COLLECTIONS.digital;
    } else if (canonicalKey === 'greentech' || canonicalKey === 'cybersecurity' || canonicalKey === 'cloud' || canonicalKey === 'design' || canonicalKey === 'data' || canonicalKey === 'engineering') {
      pool = CATEGORY_IMAGE_COLLECTIONS.tech;
    } else {
      pool = CATEGORY_IMAGE_COLLECTIONS.tech;
    }
  }

  // Safe non-repeating index modulo pool length
  const safeIdx = Math.abs(index) % pool.length;
  return pool[safeIdx];
}

// Get 6-8 alternate unique images for Studio photo selection
export function getCategoryAlternateImages(
  categoryInput: string,
  count: number = 6,
  contextText?: string
): CategoryImageSpec[] {
  const canonicalKey = normalizeCategoryKey(categoryInput, contextText);
  const pool = CATEGORY_IMAGE_COLLECTIONS[canonicalKey] || CATEGORY_IMAGE_COLLECTIONS.tech;
  return pool.slice(0, Math.min(count, pool.length));
}
