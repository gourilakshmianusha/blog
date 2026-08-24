import { CalendarDayBlogItem, MonthlyContentCalendarResult, BacklinkItem } from "./types";
import { MONTHLY_ASTROLOGY_CALENDARS, MonthlyAstrologyProfile } from "./monthlyAstrologyData";
import { getUniqueCategoryImage } from "./categoryImageLibrary";

// Helper to get number of days in a given month/year
export function getDaysInMonth(year: number, monthIndex: number): number {
  // monthIndex: 1 to 12
  return new Date(year, monthIndex, 0).getDate();
}

// Category image repositories for ultra-relevant high-res feature image previews
const CATEGORY_FEATURE_IMAGES: Record<string, string[]> = {
  astrology: [
    "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=800&q=80", // Sacred Indian Mandala & Cosmic Geometry Wheel
    "https://images.unsplash.com/photo-1609137144820-7b24e65922aa?auto=format&fit=crop&w=800&q=80", // Traditional Indian Brass Diya Oil Lamp & Sacred Altar
    "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80", // Ancient Sanskrit Sacred Scripture & Vedic Manuscript
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80", // Vedic Temple Architectural Sacred Geometry & Celestial Carvings
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80", // Jantar Mantar Historic Astronomical Observatory Sundial Jaipur
    "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80", // Varanasi Holy Ganga Evening Aarti Celestial Flames
    "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80", // Indian Sacred Holy Brass Puja Vessels & Astrological Altar
    "https://images.unsplash.com/photo-1599824425751-b8e0a84e6293?auto=format&fit=crop&w=800&q=80", // Golden Indian Vedic Temple Sanctuary Spiritual Glow
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80", // Sacred Starry Night Sky over High Himalayan Peaks
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", // Luminous Cosmic Planetary Orbits & Constellations
  ],
  health: [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80", // Yoga & meditation
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80", // Healthy nutrition bowl
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80", // Fitness & vitality
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80", // Wellness & stretch
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", // Superfood salad
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80", // Strength exercise
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", // Fresh outdoor breathing
    "https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=800&q=80", // Herbal tea & calm
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80", // Nutrition prep
    "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80", // Morning run
  ],
  digital: [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", // Digital analytics
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", // Financial growth dashboard
    "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80", // Digital strategy workspace
    "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=800&q=80", // Social media marketing
    "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80", // Online campaign stats
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80", // Performance marketing
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", // Tech marketing team
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80", // Growth meeting
  ],
  ai: [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", // Abstract 3D neural nodes
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80", // AI neural network
    "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80", // Cyber AI generative
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80", // Matrix glowing data
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", // Circuit board microchip
    "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80", // Robot AI face
    "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80", // Robot technology
    "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80", // Deep learning code
  ],
  ngo: [
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80", // Humanitarian support
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb7?auto=format&fit=crop&w=800&q=80", // Community volunteer hands
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80", // Charity donation box
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80", // Global outreach
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80", // Eco sustainability hands
    "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80", // Community team solidarity
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80", // Team partnership
    "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80", // Global education
  ],
  seo: [
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80", // SEO analytics search chart
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", // Organic traffic growth
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", // SERP rank tracking
    "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80", // Keyword research workspace
  ],
  tech: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", // Microchip
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80", // Server network
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80", // Cloud servers
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", // Cybersecurity lock
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80", // Web UI design
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", // Data charts
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80", // Code development
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80", // Engineer working
  ],
};

function getCategoryFeatureImage(categoryKey: string, dayIndex: number, contextText?: string): string {
  const spec = getUniqueCategoryImage(categoryKey, dayIndex, contextText);
  return spec.imageUrl;
}

// 31-Day Specialized Topic Catalog Interface
export interface CategoryTopicTemplate {
  title: string;
  focusKeyword: string;
  metaDescription: string;
  contentType: 'How-To Guide' | 'Deep Dive Analysis' | 'Case Study & Teardown' | 'Trend Forecast' | 'Checklist & Framework' | 'Myth Busting' | 'Expert Round-up' | 'Infographic Blueprint';
  contentAngle: string;
  targetAudience: string;
  estimatedReadTime: string;
  keyTakeaways: string[];
  tone: string;
  sentimentScore: number;
  sentimentLabel: string;
  imagePrompt: string;
  visualTheme: string;
  backlinks: BacklinkItem[];
}

// Month names list
export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Seasonal & Business Strategy Themes for 12 Months across General Categories
const MONTH_THEMES_GENERAL: Record<number, {
  name: string;
  strategicFocus: string;
  quarter: string;
  tone: string;
  weeklyPillars: Array<{ title: string; description: string }>;
}> = {
  1: {
    name: "January",
    strategicFocus: "Annual Roadmaps, Foundational Audits & Baseline Architecture",
    quarter: "Q1 Launch",
    tone: "Visionary & Foundational",
    weeklyPillars: [
      { title: "Annual Audits & Baseline Benchmarking", description: "Evaluating current performance metrics and setting rigorous annual OKRs." },
      { title: "Foundational System Architecture", description: "Strengthening core infrastructure, pipelines, and operational standards." },
      { title: "Early Adoption & Competitive Edge", description: "Deploying high-leverage frameworks to establish early market leadership." },
      { title: "Execution Velocity & Workflow Automation", description: "Streamlining daily team routines and eliminating operational drag." },
      { title: "Q1 Month-1 Synthesis & Milestone Review", description: "Consolidating early wins and preparing for mid-quarter acceleration." },
    ]
  },
  2: {
    name: "February",
    strategicFocus: "Deep-Dive Optimization, Efficiency Sprints & Bottleneck Removal",
    quarter: "Q1 Acceleration",
    tone: "Analytical & Pragmatic",
    weeklyPillars: [
      { title: "Friction Point Auditing & Root Cause Analysis", description: "Deconstructing core bottlenecks and efficiency leakages." },
      { title: "High-Yield Optimization Workflows", description: "Refactoring mission-critical processes for 2x throughput." },
      { title: "Cross-Functional Collaboration Protocols", description: "Aligning product, engineering, and growth for zero miscommunication." },
      { title: "Empirical Testing & Statistical Validation", description: "Running controlled experiments and hypothesis testing." },
    ]
  },
  3: {
    name: "March",
    strategicFocus: "Q1 Closing Sprints, Production Scaling & High-Velocity Readiness",
    quarter: "Q1 Culmination",
    tone: "High-Velocity & Triumphant",
    weeklyPillars: [
      { title: "Production Hardening & Stress Testing", description: "Validating stability under maximum enterprise workloads." },
      { title: "Q1 Performance Retrospectives", description: "Data-backed post-mortems and identifying exponential leverage." },
      { title: "Spring Deployment Frameworks", description: "Launching major product updates and public feature releases." },
      { title: "Q2 Transition & Forward Architecture", description: "Transitioning smoothly into high-growth spring initiatives." },
    ]
  },
  4: {
    name: "April",
    strategicFocus: "Q2 Product Launches, Fresh Modern Architectures & Growth Sprints",
    quarter: "Q2 Expansion",
    tone: "Innovative & Dynamic",
    weeklyPillars: [
      { title: "Q2 Major Product Inception", description: "Rolling out innovative next-generation capabilities." },
      { title: "Modern Architecture Migration", description: "Transitioning legacy modules to scalable modern frameworks." },
      { title: "Organic Discovery & User Expansion", description: "Scaling distribution channels and audience acquisition." },
      { title: "Reliability & Scalability Engineering", description: "Ensuring sub-second latency and uninterrupted availability." },
    ]
  },
  5: {
    name: "May",
    strategicFocus: "Resilience Engineering, High-Throughput Workflows & Creative Breakthroughs",
    quarter: "Q2 Deepening",
    tone: "Resilient & Creative",
    weeklyPillars: [
      { title: "Creative Experimentation & Prototyping", description: "Testing unconventional hypotheses and breakthrough prototypes." },
      { title: "High-Throughput Operational Protocols", description: "Scaling processing bandwidth without inflating costs." },
      { title: "Resilience Under Pressure", description: "Building fault-tolerant systems with automated self-healing." },
      { title: "Community Building & Ecosystem Growth", description: "Nurturing brand evangelists and open contributor networks." },
    ]
  },
  6: {
    name: "June",
    strategicFocus: "Mid-Year Architectural Reviews, Cost Optimization & Sustainability Audits",
    quarter: "Q2 Mid-Year Review",
    tone: "Judicious & Evaluative",
    weeklyPillars: [
      { title: "H1 Comprehensive Retrospectives", description: "Evaluating 6-month performance against initial annual forecasts." },
      { title: "Infrastructure Cost Optimization", description: "Trimming cloud waste, SaaS bloat, and resource overhead." },
      { title: "Security & Governance Hardening", description: "Auditing compliance, access control, and privacy protocols." },
      { title: "H2 Strategic Roadmap Alignment", description: "Recalibrating high-priority initiatives for the second half." },
    ]
  },
  7: {
    name: "July",
    strategicFocus: "Q3 Strategic Realignments, Advanced Learning Frameworks & Deep Research",
    quarter: "Q3 Rejuvenation",
    tone: "Scholarly & Forward-Looking",
    weeklyPillars: [
      { title: "Advanced Research & Technology Spikes", description: "Exploring emerging research papers and paradigm shifts." },
      { title: "Skill Upgrades & Team Enablement", description: "Upskilling teams on state-of-the-art tools and standards." },
      { title: "Next-Gen Protocol Benchmarks", description: "Benchmarking emerging tools against established enterprise stacks." },
      { title: "Sustainable Velocity Protocols", description: "Protecting teams against burnout while maintaining sprint speed." },
    ]
  },
  8: {
    name: "August",
    strategicFocus: "Peak Velocity Execution, Automation Workflows & Performance Benchmarking",
    quarter: "Q3 Execution Peak",
    tone: "Intense & Authoritative",
    weeklyPillars: [
      { title: "Autonomous Automation Workflows", description: "Delegating repetitive workflows to intelligent automation pipelines." },
      { title: "Enterprise Performance Benchmarks", description: "Validating speed, accuracy, and reliability against industry peers." },
      { title: "Scalable Architecture Teardowns", description: "Reverse engineering top-tier systems for compounding gains." },
      { title: "Data-Driven Decision Frameworks", description: "Eliminating subjective guesswork through empirical analytics." },
      { title: "Late-Summer Retrospective & Sprints", description: "Closing Q3 execution cycles with maximum delivery velocity." },
    ]
  },
  9: {
    name: "September",
    strategicFocus: "Q3 Closing Metrics, Technical Debt Elimination & Autumn Audits",
    quarter: "Q3 Culmination",
    tone: "Methodical & Thorough",
    weeklyPillars: [
      { title: "Technical & Operational Debt Purges", description: "Refactoring legacy bottlenecks and deprecated dependencies." },
      { title: "Q3 Metric Finalization & OKR Review", description: "Locking in quarterly achievements and documenting learnings." },
      { title: "Q4 High-Stakes Campaign Architecture", description: "Laying the operational runway for the year's biggest quarter." },
      { title: "End-to-End System Verification", description: "Full integration testing across all mission-critical touchpoints." },
    ]
  },
  10: {
    name: "October",
    strategicFocus: "Q4 High-Stakes Campaigns, Peak Traffic Resilience & Conversion Optimization",
    quarter: "Q4 High Stakes",
    tone: "Ambitious & High-Impact",
    weeklyPillars: [
      { title: "Peak Load Preparation & CDN Optimization", description: "Ensuring zero downtime under massive traffic spikes." },
      { title: "High-Converting Content & UX Funnels", description: "Polishing landing pages, CTAs, and user journeys." },
      { title: "Campaign Launch & Multi-Channel Distribution", description: "Executing coordinated blitzes across organic and paid channels." },
      { title: "Real-Time Telemetry & Funnel Monitoring", description: "Tracking user conversions and resolving drop-offs instantly." },
    ]
  },
  11: {
    name: "November",
    strategicFocus: "Maximum Scale, Holiday High-Load Readiness & Revenue Maximization",
    quarter: "Q4 Peak Volume",
    tone: "Commercial & Exhilarating",
    weeklyPillars: [
      { title: "High-Volume Scaling Architecture", description: "Handling record-breaking transaction and query volumes." },
      { title: "Conversion Surge & Black Friday Strategies", description: "Maximizing monetization and average order values." },
      { title: "Real-Time Incident Response & Failover", description: "24/7 reliability war-rooms and automated failover topologies." },
      { title: "Customer Delight & Retention Flywheels", description: "Converting seasonal influx into long-term loyal advocates." },
    ]
  },
  12: {
    name: "December",
    strategicFocus: "Annual Post-Mortems, Year-End Retrospectives & 2027 Strategic Roadmaps",
    quarter: "Q4 Retrospective & Foresight",
    tone: "Reflective & Visionary",
    weeklyPillars: [
      { title: "Full-Year Empirical Retrospectives", description: "Comprehensive post-mortems of successes, failures, and compounding ROI." },
      { title: "Gratitude, Team Culture & Recognition", description: "Celebrating engineering milestones and community contributions." },
      { title: "Strategic Technology & Industry Predictions", description: "Forecasting the defining trends, shifts, and disruptors of the coming year." },
      { title: "Annual Maintenance & New Year Launchpad", description: "Locking down systems, archiving data, and preparing for Day 1 of the new year." },
    ]
  }
};

// Category-specific Topic Catalogs & Daily Variation Matrices
const CATEGORY_TOPIC_MATRICES: Record<string, (month: number, day: number, year: number, domain: string) => CategoryTopicTemplate> = {
  // -------------------------------------------------------------
  // HEALTH & WELLNESS
  // -------------------------------------------------------------
  health: (month: number, day: number, year: number, domain: string) => {
    const monthThemes: Record<number, string> = {
      1: "Winter Metabolic Reset & Cellular Immunity",
      2: "Cardiovascular Vitality & Heart Rhythm Health",
      3: "Spring Lymphatic Detox & Seasonal Allergy Defense",
      4: "Joint Mobility, Collagen Synthesis & Outdoor Conditioning",
      5: "Hydration Science, Cellular Electrolytes & Sun Resilience",
      6: "Circadian Rhythm Optimization & Deep Sleep Cycles",
      7: "Gut Microbiome Diversity & Cooling Digestive Herbs",
      8: "VO2 Max Conditioning & Mitochondrial Longevity",
      9: "Cortisol Management & Nervous System Grounding",
      10: "Autophagy Protocols, Intermittent Fasting & Cellular Renewal",
      11: "Mood Neurotransmitters, Serotonin & Winter Light Therapy",
      12: "Restorative Recovery, Deep Tissue Repair & 2027 Health Blueprint"
    };

    const monthlyFocus = monthThemes[month] || "Holistic Vitality & Longevity";
    const subTopics = [
      "Circadian Fasting Protocols", "Cold Thermogenesis & Brown Fat Activation", "Vagus Nerve Stimulation",
      "Adaptogenic Herbal Medicine", "Zone 2 Cardiovascular Endurance", "Sleep Architecture & REM Deepening",
      "Gut-Brain Axis Microflora", "Cellular Hydration & Micronutrients", "Functional Mobility & Fascial Release",
      "Breathwork & Heart Rate Variability (HRV)", "Anti-Inflammatory Nutritional Science", "Hormonal Balance & Metabolic Health"
    ];
    const subTopic = subTopics[(day + month) % subTopics.length];

    const title = `${subTopic}: The ${monthlyFocus} Protocol for ${year}`;
    const focusKeyword = `${subTopic} ${month > 6 ? 'Routine' : 'Guide'}`;
    const metaDescription = `Master ${focusKeyword} with evidence-based nutrition, daily circadian protocols, and biometric tracking tailored for ${domain}.`;

    const contentTypes: CategoryTopicTemplate['contentType'][] = [
      'How-To Guide', 'Deep Dive Analysis', 'Checklist & Framework', 'Case Study & Teardown', 'Myth Busting'
    ];

    return {
      title,
      focusKeyword,
      metaDescription,
      contentType: contentTypes[day % contentTypes.length],
      contentAngle: `Clinical & Holistic Mastery of ${subTopic}`,
      targetAudience: "Biohackers, Wellness Seekers, Athletes & Health Practitioners",
      estimatedReadTime: `${6 + (day % 4)} min read`,
      keyTakeaways: [
        `Implement morning protocols for ${subTopic} with immediate biometric feedback.`,
        `Balance micronutrient timing to avoid midday cortisol spikes and digestive sluggishness.`,
        `Track HRV and resting heart rate to quantitatively measure recovery velocity.`
      ],
      tone: "Empowering, Clinical & Grounded",
      sentimentScore: 0.88 + ((day % 5) * 0.02),
      sentimentLabel: "Strongly Positive",
      imagePrompt: `Clean Scandinavian wellness photography of ${title}, warm morning sunlight, natural linen textures, glass carafe with herbal infusion, minimalist aesthetic, 8k resolution`,
      visualTheme: "Holistic Wellness & Organic Vitality",
      backlinks: [
        { sourceName: "National Institutes of Health (NIH) PMC Archive", url: "https://ncbi.nlm.nih.gov/pmc", anchorText: `${subTopic} clinical trial meta-analysis`, type: "Research Study", domainAuthorityEst: "DA 94" },
        { sourceName: "Stanford Huberman Lab Health Protocols", url: "https://hubermanlab.com", anchorText: "circadian biology and neurochemistry optimization", type: "Canonical Source", domainAuthorityEst: "DA 88" }
      ]
    };
  },

  // -------------------------------------------------------------
  // AI & MACHINE LEARNING
  // -------------------------------------------------------------
  ai: (month: number, day: number, year: number, domain: string) => {
    const monthThemes: Record<number, string> = {
      1: "Foundation Model Architecture & Agentic Reasoning",
      2: "Advanced RAG Pipelines & Semantic Vector Indexing",
      3: "Deterministic Guardrails & Automated LLM Evaluation",
      4: "Multimodal Vision-Language Models & Audio Agents",
      5: "On-Device Edge Inference & Quantization Techniques",
      6: "Synthetic Data Curation & DPO Preference Alignment",
      7: "AI Governance, Safety & EU AI Act Audits",
      8: "High-Throughput GPU Cluster Scaling & Distributed Training",
      9: "Autonomous Multi-Agent Swarms & Tool-Calling Protocols",
      10: "Enterprise Knowledge Graphs & Hybrid Search Systems",
      11: "Real-Time Inference Caching & Sub-Second Latency AI",
      12: "Post-Transformer Architectures & 2027 AI Frontier Roadmaps"
    };

    const monthlyFocus = monthThemes[month] || "Next-Gen Artificial Intelligence";
    const subTopics = [
      "Autonomous Agent Workflows", "Retrieval-Augmented Generation (RAG)", "Vector Search Optimization",
      "Model Quantization (GGUF/AWQ)", "Multi-Agent Coordination Protocols", "Synthetic Dataset Engineering",
      "Chain-of-Thought Verification", "Low-Rank Adaptation (LoRA) Fine-Tuning", "Speculative Decoding for LLMs",
      "Deterministic Prompt Guardrails", "Embedding Space Dimensionality Reduction", "Edge AI Microcontroller Deployment"
    ];
    const subTopic = subTopics[(day + month * 2) % subTopics.length];

    const title = `${subTopic}: Enterprise ${monthlyFocus} in ${year}`;
    const focusKeyword = `${subTopic} Architecture`;
    const metaDescription = `Master ${focusKeyword} with complete benchmarks, code architectures, and latency optimization blueprints on ${domain}.`;

    const contentTypes: CategoryTopicTemplate['contentType'][] = [
      'Deep Dive Analysis', 'How-To Guide', 'Case Study & Teardown', 'Checklist & Framework', 'Trend Forecast'
    ];

    return {
      title,
      focusKeyword,
      metaDescription,
      contentType: contentTypes[day % contentTypes.length],
      contentAngle: `Enterprise Implementation of ${subTopic}`,
      targetAudience: "AI Engineers, CTOs, Machine Learning Researchers & Tech Leaders",
      estimatedReadTime: `${7 + (day % 4)} min read`,
      keyTakeaways: [
        `Reduce token overhead by 40% using optimized context compression techniques.`,
        `Achieve deterministic outputs with automated verification and JSON schema guardrails.`,
        `Scale throughput across distributed clusters without sacrificing semantic accuracy.`
      ],
      tone: "Authoritative, Architectural & Rigorous",
      sentimentScore: 0.85 + ((day % 6) * 0.02),
      sentimentLabel: "Strongly Positive",
      imagePrompt: `Cinematic 3D render of ${title}, glowing neural network nodes in deep cyan and electric violet, glass geometric prisms, clean dark room reflections, 8k octane render`,
      visualTheme: "Cyber Neural Core & Glass Prisms",
      backlinks: [
        { sourceName: "arXiv Machine Learning Computer Science Repository", url: "https://arxiv.org", anchorText: `${subTopic} empirical performance benchmarks`, type: "Research Study", domainAuthorityEst: "DA 93" },
        { sourceName: "Hugging Face Open Source AI Ecosystem", url: "https://huggingface.co", anchorText: "open weights model evaluation leaderboard", type: "Canonical Source", domainAuthorityEst: "DA 90" }
      ]
    };
  },

  // -------------------------------------------------------------
  // DIGITAL MARKETING & GROWTH
  // -------------------------------------------------------------
  digital: (month: number, day: number, year: number, domain: string) => {
    const monthThemes: Record<number, string> = {
      1: "Annual Revenue Playbooks & Attribution Auditing",
      2: "Product-Led Growth & Frictionless Activation",
      3: "CAC-to-LTV Scaling & Paid Loop Optimization",
      4: "Omnichannel Social Campaigns & Video Sprints",
      5: "High-Converting Landing Page Teardowns & CRO",
      6: "Churn Reduction & Customer Retention Flywheels",
      7: "Programmatic SEO & Content Distribution Velocity",
      8: "B2B Account-Based Marketing (ABM) Pipelines",
      9: "Email Deliverability & High-Intent Outreach",
      10: "Q4 Peak Traffic Funnels & Conversion Blitzes",
      11: "Cyber Week Retargeting & Dynamic Pricing",
      12: "Annual Growth Post-Mortems & 2027 Budget Allocation"
    };

    const monthlyFocus = monthThemes[month] || "High-Impact Growth Marketing";
    const subTopics = [
      "Multi-Touch Attribution Modeling", "Product-Led Onboarding UX", "Cold Email Infrastructure",
      "High-Converting Video Ad Hooks", "Zero-Party Data Collection", "Viral Referral Loops",
      "Landing Page A/B Micro-Testing", "B2B Pipeline Velocity", "Dynamic Content Personalization",
      "First-Party Identity Resolution", "SaaS Free-to-Paid Conversion", "Retention Cohort Analysis"
    ];
    const subTopic = subTopics[(day + month * 3) % subTopics.length];

    const title = `${subTopic}: The ${monthlyFocus} Playbook for ${year}`;
    const focusKeyword = `${subTopic} Strategy`;
    const metaDescription = `Deconstruct ${focusKeyword} with real revenue teardowns, conversion benchmarks, and tactical execution guides for ${domain}.`;

    const contentTypes: CategoryTopicTemplate['contentType'][] = [
      'Case Study & Teardown', 'How-To Guide', 'Checklist & Framework', 'Deep Dive Analysis', 'Expert Round-up'
    ];

    return {
      title,
      focusKeyword,
      metaDescription,
      contentType: contentTypes[day % contentTypes.length],
      contentAngle: `Actionable Revenue Scaling with ${subTopic}`,
      targetAudience: "Growth Marketers, Founders, CMOs & E-Commerce Directors",
      estimatedReadTime: `${6 + (day % 3)} min read`,
      keyTakeaways: [
        `Increase trial-to-paid conversions by 32% by eliminating superfluous friction steps.`,
        `Migrate to first-party server-side telemetry to recover lost tracking attribution.`,
        `Automate dynamic audience segmentation for personalized nurture workflows.`
      ],
      tone: "Tactical, High-Converting & Analytical",
      sentimentScore: 0.90,
      sentimentLabel: "Strongly Positive",
      imagePrompt: `Modern aesthetic workspace with financial growth charts on sleek glass tablet, espresso cup, clean architectural lighting, slate and gold accents, high-end editorial photography`,
      visualTheme: "Executive Growth Workspace & Analytics",
      backlinks: [
        { sourceName: "Reforge Growth & Product Engineering Insights", url: "https://reforge.com", anchorText: `${subTopic} growth loop architecture`, type: "Canonical Source", domainAuthorityEst: "DA 76" },
        { sourceName: "HubSpot Marketing Strategy Reports", url: "https://hubspot.com", anchorText: "inbound conversion and pipeline velocity benchmarks", type: "External Authority", domainAuthorityEst: "DA 93" }
      ]
    };
  },

  // -------------------------------------------------------------
  // NGO & SOCIAL IMPACT
  // -------------------------------------------------------------
  ngo: (month: number, day: number, year: number, domain: string) => {
    const monthThemes: Record<number, string> = {
      1: "Grassroots Mobilization & Mission Alignment",
      2: "Community Storytelling & Volunteer Retention",
      3: "Humanitarian Logistics & Water Sanitation Grants",
      4: "Earth Month Sustainability & Climate Justice",
      5: "Youth Empowerment & Rural Education Hubs",
      6: "Mid-Year Transparency Audits & Donor Trust",
      7: "Healthcare Outreach & Mobile Clinic Systems",
      8: "Disaster Preparedness & Emergency Aid Networks",
      9: "Global Coalitions & UN SDG Milestones",
      10: "Mental Health Advocacy & Community Resilience",
      11: "Giving Tuesday Campaigns & Donor Matching",
      12: "Annual Philanthropic Reports & 2027 Impact Visions"
    };

    const monthlyFocus = monthThemes[month] || "Sustainable Social Impact";
    const subTopics = [
      "Grassroots Donor Engagement", "Transparent Impact Dashboards", "Volunteer Retention Psychology",
      "Zero-Waste Charity Logistics", "Crisis Response Playbooks", "Micro-Grant Allocation Models",
      "Ethical Non-Profit Storytelling", "Community Trust Accounting", "Cross-Border Humanitarian Aid",
      "Sustainable Recurring Giving", "Public-Private Philanthropic Partnerships", "SDG Impact Verification"
    ];
    const subTopic = subTopics[(day + month) % subTopics.length];

    const title = `${subTopic}: Driving ${monthlyFocus} in ${year}`;
    const focusKeyword = `${subTopic} Best Practices`;
    const metaDescription = `Learn how ${focusKeyword} drives measurable social outcomes, radical transparency, and community empowerment on ${domain}.`;

    return {
      title,
      focusKeyword,
      metaDescription,
      contentType: "Case Study & Teardown",
      contentAngle: `Empirical Field Results of ${subTopic}`,
      targetAudience: "Non-Profit Leaders, Volunteers, Philanthropists & Social Innovators",
      estimatedReadTime: `${7 + (day % 3)} min read`,
      keyTakeaways: [
        `Deploy real-time donation tracking dashboards to boost recurring donor retention by 48%.`,
        `Structure volunteer onboarding to prevent mission burnout and ensure high retention.`,
        `Partner with local community leaders for culturally grounded, sustainable interventions.`
      ],
      tone: "Compassionate, Urgent & Authentic",
      sentimentScore: 0.94,
      sentimentLabel: "Strongly Positive",
      imagePrompt: `Heartwarming documentary photography of diverse community volunteers building a sustainable solar water purification hub, bright natural daylight, genuine smiles, cinematic framing`,
      visualTheme: "Community Solidarity & Clean Energy Impact",
      backlinks: [
        { sourceName: "United Nations Sustainable Development Knowledge Platform", url: "https://sdgs.un.org", anchorText: "SDG verifiable indicator monitoring", type: "Canonical Source", domainAuthorityEst: "DA 96" },
        { sourceName: "Stanford Social Innovation Review (SSIR)", url: "https://ssir.org", anchorText: `${subTopic} non-profit leadership case study`, type: "Research Study", domainAuthorityEst: "DA 84" }
      ]
    };
  },

  // -------------------------------------------------------------
  // SEO & GROWTH
  // -------------------------------------------------------------
  seo: (month: number, day: number, year: number, domain: string) => {
    const monthThemes: Record<number, string> = {
      1: "Technical Crawl Architecture & Indexation Audits",
      2: "Semantic Search Intent & Schema 2.0 Deployment",
      3: "Core Web Vitals & INP (Interaction to Next Paint)",
      4: "Programmatic SEO & Long-Tail Scale Systems",
      5: "E-E-A-T Author Authority & First-Hand Citations",
      6: "SERP Volatility Defense & Algorithm Recovery",
      7: "Internal Link Graphs & PageRank Flow Algorithms",
      8: "Generative Engine Optimization (GEO) for AI Search",
      9: "International Multi-Regional Hreflang Strategies",
      10: "E-Commerce Category Architecture & Rich Snippets",
      11: "Peak Search Volume Readiness & Intent Capture",
      12: "Annual Search Post-Mortem & 2027 Algorithm Shifts"
    };

    const monthlyFocus = monthThemes[month] || "High-Authority Technical Search";
    const subTopics = [
      "Technical SEO Infrastructure", "Topic Cluster Graph Architecture", "Semantic Entity Optimization",
      "Backlink Velocity Strategies", "Core Web Vitals Performance", "Schema Markup Implementation",
      "AI Search Answer Engine (GEO)", "Internal Linking Algorithms", "SERP Volatility Defense",
      "Programmatic SEO Scaling", "Crawl Budget Prioritization", "Cannibalization Resolution"
    ];
    const subTopic = subTopics[(day + month * 2) % subTopics.length];

    const title = `${subTopic}: Mastering ${monthlyFocus} for ${year}`;
    const focusKeyword = `${subTopic} Blueprint`;
    const metaDescription = `Master ${focusKeyword} with algorithmic audits, code snippets, internal link graphs, and ranking case studies on ${domain}.`;

    return {
      title,
      focusKeyword,
      metaDescription,
      contentType: "Deep Dive Analysis",
      contentAngle: `Algorithmic Search Mastery with ${subTopic}`,
      targetAudience: "SEO Strategists, Web Engineers, Content Directors & Webmasters",
      estimatedReadTime: `${8 + (day % 3)} min read`,
      keyTakeaways: [
        `Achieve 100% crawl efficiency with automated XML sitemap prioritization and canonical rules.`,
        `Structure semantic entity schemas to capture AI Overviews and rich featured snippets.`,
        `Build bidirectional internal linking silos that pass maximum PageRank to money pages.`
      ],
      tone: "Technical, Empirical & Dominant",
      sentimentScore: 0.89,
      sentimentLabel: "Strongly Positive",
      imagePrompt: `Conceptual digital illustration of search engine ranking algorithms, 3D luminous graph database connecting web nodes, dark indigo background with glowing gold accents, 8k render`,
      visualTheme: "SERP Graph Algorithms & Cyber Index",
      backlinks: [
        { sourceName: "Google Search Central Official Documentation", url: "https://developers.google.com/search", anchorText: "Google Search ranking systems and helpful content guidelines", type: "Canonical Source", domainAuthorityEst: "DA 98" },
        { sourceName: "Ahrefs Search Traffic & Backlink Studies", url: "https://ahrefs.com/blog", anchorText: `${subTopic} data-backed SERP study`, type: "Research Study", domainAuthorityEst: "DA 91" }
      ]
    };
  }
};

// Fallback dynamic generator for any custom or tech category
function generateGenericCategoryTopicForDay(
  category: string,
  monthIndex: number,
  dayNumber: number,
  year: number,
  domain: string
): CategoryTopicTemplate {
  const monthInfo = MONTH_THEMES_GENERAL[monthIndex] || MONTH_THEMES_GENERAL[1];
  
  const tacticalPrefixes = [
    "Enterprise Architecture Frameworks",
    "Automated Performance Benchmarking",
    "Zero-Trust Security Protocols",
    "High-Throughput Operational Pipelines",
    "Data-Driven Decision Topologies",
    "Scalable Multi-Tier Infrastructure",
    "Continuous Integration Hardening",
    "Resilience & Disaster Recovery",
    "Cost Optimization & Resource Allocation",
    "Developer Productivity & Velocity",
    "Real-Time Telemetry & Observability",
    "Next-Gen Innovation Roadmaps"
  ];

  const prefix = tacticalPrefixes[(dayNumber + monthIndex * 3) % tacticalPrefixes.length];
  const title = `${prefix}: The ${monthInfo.strategicFocus} Protocol for ${category} in ${year}`;
  const focusKeyword = `${prefix.split(" ").slice(0, 2).join(" ")} in ${category}`;
  const metaDescription = `Master ${focusKeyword} for ${category} during ${monthInfo.name} ${year}. Step-by-step implementation, benchmarks, and workflows for ${domain}.`;

  const contentTypes: CategoryTopicTemplate['contentType'][] = [
    'How-To Guide', 'Deep Dive Analysis', 'Case Study & Teardown', 'Checklist & Framework', 'Trend Forecast'
  ];

  return {
    title,
    focusKeyword,
    metaDescription,
    contentType: contentTypes[dayNumber % contentTypes.length],
    contentAngle: `Tactical Execution of ${prefix}`,
    targetAudience: `${category} Engineers, Directors & Practitioners`,
    estimatedReadTime: `${6 + (dayNumber % 4)} min read`,
    keyTakeaways: [
      `Implement ${prefix} with measurable daily SLAs and automated telemetry.`,
      `Eliminate common bottlenecks and resource waste across ${category} operations.`,
      `Scale long-term impact with peer-reviewed documentation and architectural blueprints.`
    ],
    tone: monthInfo.tone,
    sentimentScore: 0.85 + ((dayNumber % 5) * 0.02),
    sentimentLabel: "Strongly Positive",
    imagePrompt: `Professional editorial photograph illustrating ${title}, modern architectural studio with blueprints and computing screens, clean warm lighting, high resolution`,
    visualTheme: `${category} Strategy & Innovation`,
    backlinks: [
      {
        sourceName: `${category} Global Consortium`,
        url: `https://${domain}`,
        anchorText: `${focusKeyword} technical specifications`,
        type: "Canonical Source",
        domainAuthorityEst: "DA 88"
      }
    ]
  };
}

// -------------------------------------------------------------
// MAIN MULTI-MONTH DYNAMIC CALENDAR GENERATOR
// -------------------------------------------------------------
export function generateMonthlyBlogCalendar(
  year: number = 2026,
  monthIndex: number = 8, // 1-12
  category: string = "Indian Vedic Astrology",
  websiteUrl: string = "https://techcrunch.com",
  domain: string = "techcrunch.com",
  variationSeed: number = 0
): MonthlyContentCalendarResult {
  const totalDays = getDaysInMonth(year, monthIndex);
  const monthName = MONTH_NAMES[Math.max(0, Math.min(11, monthIndex - 1))];

  // Detect category key
  const catLower = category.toLowerCase();
  let categoryKey: 'astrology' | 'health' | 'digital' | 'ai' | 'ngo' | 'seo' | 'tech' = 'tech';
  if (
    catLower.includes('astro') || 
    catLower.includes('jyotish') || 
    catLower.includes('kundali') || 
    catLower.includes('rashi') || 
    catLower.includes('nakshatra') || 
    catLower.includes('graha') || 
    catLower.includes('panchang') || 
    catLower.includes('zodiac') || 
    catLower.includes('vedic') || 
    catLower.includes('horoscope') ||
    catLower.includes('muhurat')
  ) {
    categoryKey = 'astrology';
  } else if (catLower.includes('health') || catLower.includes('wellness') || catLower.includes('medical') || catLower.includes('fitness') || catLower.includes('yoga')) {
    categoryKey = 'health';
  } else if (catLower.includes('digit') || catLower.includes('market') || catLower.includes('funnel') || catLower.includes('growth')) {
    categoryKey = 'digital';
  } else if (catLower.includes('seo') || catLower.includes('search') || catLower.includes('serp')) {
    categoryKey = 'seo';
  } else if (catLower.includes('ai') || catLower.includes('machine') || catLower.includes('neural') || catLower.includes('intell') || catLower.includes('agent')) {
    categoryKey = 'ai';
  } else if (catLower.includes('ngo') || catLower.includes('non-profit') || catLower.includes('charity') || catLower.includes('impact') || catLower.includes('humanitarian')) {
    categoryKey = 'ngo';
  }

  const days: CalendarDayBlogItem[] = [];

  // If Astrology, pick the month-specific profile (1 to 12)
  if (categoryKey === 'astrology') {
    const astroProfile: MonthlyAstrologyProfile = MONTHLY_ASTROLOGY_CALENDARS[monthIndex] || MONTHLY_ASTROLOGY_CALENDARS[8];
    const baseTopics = astroProfile.topics || [];

    for (let day = 1; day <= totalDays; day++) {
      const dateObj = new Date(year, monthIndex - 1, day);
      const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });
      const dateFormatted = `${monthName.substring(0, 3)} ${day}, ${year}`;
      const weekNumber = Math.min(5, Math.ceil(day / 7));

      let template: CategoryTopicTemplate;
      
      // If we have a dedicated day template in this month's profile
      if (baseTopics[day - 1]) {
        template = baseTopics[day - 1];
      } else {
        // Synthesize dynamic month-specific astrological topic
        const astroDailyFocuses = [
          "Navagraha Dasha Harmonic Timing", "27 Nakshatra Padas & Soul Purpose", "Ashtakoot Kundali Gun Milan",
          "Kuja Manglik Dosha Neutralization", "Shani Sade Sati Karmic Upayas", "Lagna Ascendant & Physical Constitution",
          "Gajakesari & Pancha Mahapurusha Raj Yogas", "Shubh Muhurat Electional Astrology", "Rahu-Ketu Kaal Sarp Nivaran",
          "Ratna Vigyan Gemstone Frequency Protocols", "Vedic Vastu Shastra Directional Harmonics", "Ayur-Jyotish Dosha Diagnosis",
          "Divisional Navamsha D9 Marriage Astrology", "Dashamsha D10 Career Peak Timelines", "Daily Choghadiya & Rahu Kaal Avoidance"
        ];
        const dayFocus = astroDailyFocuses[(day + monthIndex * 3 + variationSeed) % astroDailyFocuses.length];
        
        template = {
          title: `${dayFocus}: ${monthName} ${year} Astrological Transits & Janam Kundali Guide`,
          focusKeyword: `${dayFocus} ${monthName}`,
          metaDescription: `Discover how ${dayFocus} operates during ${monthName} ${year}. In-depth Vedic Jyotish remedies, mantra vibrations, and transit insights on ${domain}.`,
          contentType: day % 2 === 0 ? "Deep Dive Analysis" : "How-To Guide",
          contentAngle: `Vedic Transit Application of ${dayFocus}`,
          targetAudience: "Vedic Astrologers, Kundali Researchers & Seekers",
          estimatedReadTime: `${7 + (day % 4)} min read`,
          keyTakeaways: [
            `Calculate the precise transit aspect of ${dayFocus} during ${monthName} ${year}.`,
            `Apply ancient Parashara Jyotish remedies with authentic Sanskrit mantras.`,
            `Align daily actions with auspicious Abhijit Muhurats for optimal success.`
          ],
          tone: "Sacred, Precise & Enlightening",
          sentimentScore: 0.88 + ((day % 5) * 0.02),
          sentimentLabel: "Strongly Positive",
          imagePrompt: `Indian Vedic astrology sacred artwork for ${dayFocus}, glowing bronze Navagraha yantra, Sanskrit scriptures on ancient palm leaf, burning brass oil lamps, Varanasi river ghat background, cinematic 8k photography`,
          visualTheme: "Vedic Sanskrit Scripture & Brass Diya Altar",
          backlinks: [
            { sourceName: "All India Federation of Astrologers Societies", url: "https://www.aifas.com", anchorText: `${dayFocus} classical calculations`, type: "Canonical Source", domainAuthorityEst: "DA 78" }
          ]
        };
      }

      const featureImageUrl = getCategoryFeatureImage('astrology', day - 1);

      days.push({
        id: `cal-day-${year}-${monthIndex}-${day}`,
        dayNumber: day,
        dateFormatted,
        dayOfWeek,
        weekNumber,
        title: template.title,
        focusKeyword: template.focusKeyword,
        metaDescription: template.metaDescription,
        category: "Indian Vedic Astrology",
        contentType: template.contentType,
        contentAngle: template.contentAngle,
        targetAudience: template.targetAudience,
        estimatedReadTime: template.estimatedReadTime,
        keyTakeaways: template.keyTakeaways,
        sentiment: {
          score: template.sentimentScore,
          label: template.sentimentLabel,
          tone: template.tone,
        },
        featureImage: {
          description: `Editorial featured banner for ${template.title}`,
          prompt: template.imagePrompt,
          visualTheme: template.visualTheme,
          aspectRatio: "16:9",
          suggestedAltText: `${template.focusKeyword} authentic Indian Vedic astrology editorial illustration`,
          imageUrl: featureImageUrl,
        },
        backlinks: template.backlinks,
        status: "Scheduled",
      });
    }

    return {
      month: monthIndex,
      monthName,
      year,
      totalDays,
      category: "Indian Vedic Astrology",
      websiteUrl,
      domain,
      solarIngress: astroProfile.solarIngress,
      seasonalFocus: astroProfile.seasonalTheme,
      themeOverview: `A complete, dedicated 30/31-day editorial publishing calendar for ${monthName} ${year} focusing on ${astroProfile.solarIngress}. Features daily Vedic Janam Kundali analyses, Navagraha transits, 27 Nakshatras, sacred Hindu festival timings, and authentic Indian spiritual imagery.`,
      weeklyThemes: astroProfile.weeklyThemes,
      days,
      generatedAt: new Date().toISOString(),
    };
  }

  // For other specialized categories (Health, AI, Digital, NGO, SEO, Tech)
  const generatorFn = CATEGORY_TOPIC_MATRICES[categoryKey];
  const monthGeneralInfo = MONTH_THEMES_GENERAL[monthIndex] || MONTH_THEMES_GENERAL[8];

  for (let day = 1; day <= totalDays; day++) {
    const dateObj = new Date(year, monthIndex - 1, day);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    const dateFormatted = `${monthName.substring(0, 3)} ${day}, ${year}`;
    const weekNumber = Math.min(5, Math.ceil(day / 7));

    let template: CategoryTopicTemplate;
    if (generatorFn) {
      template = generatorFn(monthIndex, day + variationSeed, year, domain);
    } else {
      template = generateGenericCategoryTopicForDay(category, monthIndex, day + variationSeed, year, domain);
    }

    const featureImageUrl = getCategoryFeatureImage(categoryKey, day - 1);

    days.push({
      id: `cal-day-${year}-${monthIndex}-${day}`,
      dayNumber: day,
      dateFormatted,
      dayOfWeek,
      weekNumber,
      title: template.title,
      focusKeyword: template.focusKeyword,
      metaDescription: template.metaDescription,
      category,
      contentType: template.contentType,
      contentAngle: template.contentAngle,
      targetAudience: template.targetAudience,
      estimatedReadTime: template.estimatedReadTime,
      keyTakeaways: template.keyTakeaways,
      sentiment: {
        score: template.sentimentScore,
        label: template.sentimentLabel,
        tone: template.tone,
      },
      featureImage: {
        description: `Editorial featured banner for ${template.title}`,
        prompt: template.imagePrompt,
        visualTheme: template.visualTheme,
        aspectRatio: "16:9",
        suggestedAltText: `${template.focusKeyword} professional editorial banner on ${domain}`,
        imageUrl: featureImageUrl,
      },
      backlinks: template.backlinks,
      status: "Scheduled",
    });
  }

  const weeklyThemes = monthGeneralInfo.weeklyPillars.slice(0, totalDays > 28 ? 5 : 4).map((pillar, idx) => ({
    week: idx + 1,
    title: `${pillar.title} (${category})`,
    description: `${pillar.description} Hyper-tailored for ${category} practitioners during ${monthName} ${year}.`
  }));

  return {
    month: monthIndex,
    monthName,
    year,
    totalDays,
    category,
    websiteUrl,
    domain,
    seasonalFocus: `${monthGeneralInfo.quarter}: ${monthGeneralInfo.strategicFocus}`,
    themeOverview: `A fully dynamic 30/31-day editorial publishing calendar for ${monthName} ${year}, calibrated specifically for ${monthGeneralInfo.strategicFocus} in ${category}. Includes customized daily focus keywords, meta descriptions, content types, and verified backlinks.`,
    weeklyThemes,
    days,
    generatedAt: new Date().toISOString(),
  };
}
