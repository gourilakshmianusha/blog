import React, { useState, useEffect } from 'react';
import { WebsiteAnalysisResult, CuratedBlogItem, CompleteBlogData } from './types';
import { Header } from './components/Header';
import { UrlSearchBar } from './components/UrlSearchBar';
import { CuratedBlogsDashboard } from './components/CuratedBlogsDashboard';
import { CompleteBlogStudio } from './components/CompleteBlogStudio';
import { BacklinkIntelligenceMatrix } from './components/BacklinkIntelligenceMatrix';
import { SeoRulesVerificationView } from './components/SeoRulesVerificationView';
import { Loader2, AlertCircle, Sparkles, Compass } from 'lucide-react';

// Initial default rich data for instant interactive experience
const INITIAL_CURATED_DATA: WebsiteAnalysisResult = {
  websiteUrl: "https://techcrunch.com",
  domain: "techcrunch.com",
  siteTitle: "TechCrunch AI & Venture Dispatch",
  siteDescription: "Leading technology publication covering global startup breakthroughs, venture funding, generative AI ecosystems, and enterprise transformation.",
  analyzedAt: new Date().toISOString(),
  totalArticles: 10,
  overallSentiment: {
    averageScore: 0.72,
    dominantTone: "Visionary & Authoritative",
    positiveCount: 8,
    neutralCount: 1,
    criticalCount: 1,
  },
  blogs: [
    {
      id: "blog-1",
      title: "The Autonomous Agent Revolution: How Self-Directed AI Is Reshaping Software Development in 2026",
      author: "Alex Wilhelm, Senior AI Editor",
      publishDate: "Aug 21, 2026",
      readTime: "7 min read",
      category: "Artificial Intelligence",
      url: "https://techcrunch.com/2026/08/21/autonomous-ai-agents-software-development",
      summary: "An extensive investigation into the exponential adoption of autonomous coding agents and multi-agent coordination frameworks across Fortune 500 engineering teams. The piece highlights how automated PR generation, architectural linting, and semantic test synthesis are reducing deployment cycles by upwards of 60%.",
      keyTakeaways: [
        "Multi-agent task orchestration has moved from research prototypes to production CI/CD pipelines.",
        "Over 45% of enterprise software repositories now utilize autonomous agent reviews for routine refactoring.",
        "Security validation and deterministic sandboxing have become the primary architectural bottlenecks.",
      ],
      imageSummary: {
        description: "A striking, high-contrast 3D isometric representation of translucent crystal code nodes interconnected by glowing golden neural pathways against a sleek slate canvas.",
        prompt: "Editorial 3D isometric visualization of autonomous AI agents collaborating, glowing golden neural threads connecting glass crystal server nodes, hyperminimalist aesthetic, studio lighting, 8k render",
        visualTheme: "Minimalist 3D Cyberpunk Tech",
        aspectRatio: "16:9",
        suggestedAltText: "Autonomous AI agent architecture diagram with glowing neural pathways connecting modular nodes",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      },
      sentimentAnalysis: {
        score: 0.88,
        percentage: 94,
        label: "Strongly Positive",
        tone: "Visionary & Forward-Looking",
        subjectivity: 0.28,
        emotionalDrivers: ["Innovation: 92%", "Productivity: 88%", "Confidence: 85%"],
        explanation: "High confidence backed by quantitative engineering benchmark reports and enthusiastic adoption surveys from industry tech leads.",
      },
      backlinks: [
        {
          sourceName: "Stanford AI Index 2026 Report",
          url: "https://aiindex.stanford.edu/report",
          anchorText: "autonomous agent productivity metrics",
          type: "Research Study",
          domainAuthorityEst: "DA 96",
          contextSnippet: "Cited in section 2 for quantitative metrics on developer throughput.",
        },
        {
          sourceName: "GitHub Next Innovation Lab",
          url: "https://githubnext.com",
          anchorText: "multi-agent workspace orchestration",
          type: "External Authority",
          domainAuthorityEst: "DA 98",
          contextSnippet: "Primary reference for sandbox security architectures.",
        },
        {
          sourceName: "ACM Digital Library",
          url: "https://dl.acm.org",
          anchorText: "formal verification of agentic loops",
          type: "Data Citation",
          domainAuthorityEst: "DA 94",
          contextSnippet: "Methodological foundation for deterministic loop limits.",
        },
      ],
      suggestedFocusKeywords: ["AI Workflows", "Autonomous AI Agents", "Software Development AI"],
    },
    {
      id: "blog-2",
      title: "Zero-Click Search & Generative Answers: The New Playbook for Organic Content Visibility",
      author: "Amanda Silberling, Media Strategist",
      publishDate: "Aug 20, 2026",
      readTime: "6 min read",
      category: "SEO & Growth",
      url: "https://techcrunch.com/2026/08/20/seo-zero-click-generative-search-playbook",
      summary: "An analytical breakdown of modern search behavior where generative AI engines synthesize direct answers, transforming traditional click-through dynamics into brand citation authority and informational grounding.",
      keyTakeaways: [
        "First-sentence conceptual precision directly determines likelihood of AI citation snippet inclusion.",
        "Backlink quality and domain authority now weight heavier in generative search synthesis models than keyword stuffing.",
        "Structured data and Schema.org markup saw a 3x surge in ranking correlation.",
      ],
      imageSummary: {
        description: "A clean geometric vector graphic of an abstract knowledge graph with luminous search beams highlighting verified authority nodes.",
        prompt: "Minimalist editorial illustration of search engine data synthesis, vector geometric prisms splitting light into information streams, warm paper background, refined typography accents",
        visualTheme: "Editorial Flat Vector",
        aspectRatio: "16:9",
        suggestedAltText: "Generative search synthesis illustration showing information pathways and authority citation hubs",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      },
      sentimentAnalysis: {
        score: 0.65,
        percentage: 82,
        label: "Positive",
        tone: "Pragmatic & Strategic",
        subjectivity: 0.35,
        emotionalDrivers: ["Clarity: 85%", "Adaptability: 80%", "Urgency: 60%"],
        explanation: "Presents clear strategic actions to offset traditional organic click declines with authority citation tactics.",
      },
      backlinks: [
        {
          sourceName: "Google Search Central Blog",
          url: "https://developers.google.com/search/blog",
          anchorText: "search grounding and helpful content guidelines",
          type: "Canonical Source",
          domainAuthorityEst: "DA 99",
          contextSnippet: "Direct citation of Google's quality rater benchmarks.",
        },
        {
          sourceName: "Search Engine Land Insights",
          url: "https://searchengineland.com",
          anchorText: "zero-click query volume analysis",
          type: "External Authority",
          domainAuthorityEst: "DA 91",
          contextSnippet: "Reference for empirical click attribution drop studies.",
        },
      ],
      suggestedFocusKeywords: ["Generative Search SEO", "Zero-Click Search", "Content Visibility Strategy"],
    },
    {
      id: "blog-3",
      title: "Edge Compute & Sub-Second Latency: Why Real-Time AI Infrastructure Demands Decentralization",
      author: "Ron Miller, Enterprise Infrastructure",
      publishDate: "Aug 19, 2026",
      readTime: "8 min read",
      category: "Cloud Infrastructure",
      url: "https://techcrunch.com/2026/08/19/edge-compute-sub-second-latency-ai-infrastructure",
      summary: "Explores the fundamental transition from centralized mega-datacenters to distributed edge inference nodes, enabling audio Live streaming and computer vision workflows with latency below 50 milliseconds.",
      keyTakeaways: [
        "Edge caching and quantized model deployment cut server egress overhead by up to 70%.",
        "Hybrid edge-cloud topologies are becoming standard for mission-critical robotics and financial processing.",
      ],
      imageSummary: {
        description: "Global digital topographical map illuminated with sparkling edge datacenter nodes interconnected by fiber-optic rings.",
        prompt: "Cinematic digital earth grid with pulsing edge computing nodes, dark cyan and amber glowing fiber optic lines, ultra photorealistic, high resolution",
        visualTheme: "Dark Mode Cyber Glass",
        aspectRatio: "16:9",
        suggestedAltText: "Global network of distributed edge compute nodes delivering low-latency inference",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      },
      sentimentAnalysis: {
        score: 0.76,
        percentage: 88,
        label: "Strongly Positive",
        tone: "Authoritative & Technical",
        subjectivity: 0.22,
        emotionalDrivers: ["Efficiency: 90%", "Speed: 88%", "Reliability: 82%"],
        explanation: "Strong technical consensus backed by verified hardware benchmarks from global CDN providers.",
      },
      backlinks: [
        {
          sourceName: "Cloud Native Computing Foundation (CNCF)",
          url: "https://www.cncf.io",
          anchorText: "edge computing standardization frameworks",
          type: "External Authority",
          domainAuthorityEst: "DA 89",
          contextSnippet: "Technical guidelines on containerized edge orchestration.",
        },
      ],
      suggestedFocusKeywords: ["Edge Compute Infrastructure", "Sub-Second Latency AI", "Decentralized Cloud"],
    },
    {
      id: "blog-4",
      title: "Design Tokens & Variable Typography: Unifying Cross-Platform Systems in Modern Web Apps",
      author: "Darrell Etherington, UX Architect",
      publishDate: "Aug 18, 2026",
      readTime: "5 min read",
      category: "Design & UX",
      url: "https://techcrunch.com/2026/08/18/design-tokens-variable-typography-modern-web",
      summary: "A practical guide to implementing mathematically synchronized design tokens across Figma, CSS Tailwind variables, and native mobile components with zero drift.",
      keyTakeaways: [
        "Automated token compilers eliminate UI discrepancies between designers and frontend engineers.",
        "Variable font axes yield a 45% reduction in web font bundle payloads while enhancing responsive visual rhythm.",
      ],
      imageSummary: {
        description: "Elegant typography layout showcasing fluid geometric proportions, serif letterforms, and clean design token swatches.",
        prompt: "Macro studio photograph of architectural typography specimen book, minimal swiss grid layout, neutral warm linen background, crisp shadows",
        visualTheme: "Swiss Modernism Editorial",
        aspectRatio: "16:9",
        suggestedAltText: "Design system token specimen showing typographic scales and color palettes",
        imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      },
      sentimentAnalysis: {
        score: 0.82,
        percentage: 91,
        label: "Strongly Positive",
        tone: "Enthusiastic & Instructional",
        subjectivity: 0.38,
        emotionalDrivers: ["Craftsmanship: 95%", "Elegance: 90%", "Harmony: 86%"],
        explanation: "Inspiring yet thoroughly practical piece championing disciplined visual craftsmanship and team velocity.",
      },
      backlinks: [
        {
          sourceName: "W3C Design Tokens Community Group",
          url: "https://www.w3.org/community/design-tokens",
          anchorText: "design token format specifications",
          type: "Canonical Source",
          domainAuthorityEst: "DA 96",
          contextSnippet: "Formal JSON syntax guidelines for cross-tool token sync.",
        },
      ],
      suggestedFocusKeywords: ["Design Tokens Scale", "Variable Typography", "Design Systems Architecture"],
    },
    {
      id: "blog-5",
      title: "The Post-Cookie Attribution Puzzle: First-Party Identity Resolution and Server-Side Telemetry",
      author: "Ingrid Lunden, Data Intelligence",
      publishDate: "Aug 17, 2026",
      readTime: "7 min read",
      category: "Data Privacy & Analytics",
      url: "https://techcrunch.com/2026/08/17/post-cookie-attribution-first-party-identity",
      summary: "With client-side tracking increasingly constrained by privacy sandboxes and ad-blockers, marketing engineering teams are migrating fully to server-side event streaming and deterministic identity graphs.",
      keyTakeaways: [
        "Server-side telemetry prevents client script bloat while maintaining GDPR compliance.",
        "Probabilistic cohort modeling provides reliable conversion lift measurement without invasive tracking.",
      ],
      imageSummary: {
        description: "Abstract glass shield shielding a radiant stream of data packets, symbolizing privacy-preserving analytics.",
        prompt: "3D render of frosted glass security shield protecting luminous data particles, clean architectural lighting, soft emerald and slate tones",
        visualTheme: "Clean Privacy Tech",
        aspectRatio: "16:9",
        suggestedAltText: "Privacy-preserving data architecture with security shield protecting event streams",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      },
      sentimentAnalysis: {
        score: 0.45,
        percentage: 72,
        label: "Analytical/Objective",
        tone: "Pragmatic & Methodical",
        subjectivity: 0.20,
        emotionalDrivers: ["Compliance: 92%", "Privacy: 88%", "Rigor: 80%"],
        explanation: "Objective analysis of privacy trade-offs and engineering migration costs.",
      },
      backlinks: [
        {
          sourceName: "Electronic Frontier Foundation (EFF)",
          url: "https://www.eff.org",
          anchorText: "privacy-preserving telemetry standards",
          type: "External Authority",
          domainAuthorityEst: "DA 92",
          contextSnippet: "Evaluative benchmarks on user consent and data minimization.",
        },
      ],
      suggestedFocusKeywords: ["Server-Side Telemetry", "First-Party Data Analytics", "Privacy Attribution"],
    },
    {
      id: "blog-6",
      title: "Quantum Key Distribution (QKD) Enters the Enterprise: Preparing Cryptographic Infrastructure",
      author: "Frederic Lardinois, Deep Tech",
      publishDate: "Aug 16, 2026",
      readTime: "9 min read",
      category: "Cybersecurity",
      url: "https://techcrunch.com/2026/08/16/quantum-key-distribution-enterprise-cryptography",
      summary: "A sobering yet urgent guide for CISOs on transitioning legacy RSA and elliptic-curve cryptography to post-quantum lattice algorithms before Shor's algorithm achieves commercial maturity.",
      keyTakeaways: [
        "NIST-standardized post-quantum encryption algorithms must be deployed before harvest-now-decrypt-later attacks escalate.",
        "Hybrid classical-quantum certificate handshakes ensure backwards compatibility during the decade-long migration.",
      ],
      imageSummary: {
        description: "Luminous quantum lattice structure with intricate geometric interference patterns and golden lasers.",
        prompt: "Hyperdetailed visualization of quantum encryption lattice, photon entanglement lasers, deep navy and gold palette, scientific precision, 8k",
        visualTheme: "Quantum Science & Physics",
        aspectRatio: "16:9",
        suggestedAltText: "Quantum key distribution lattice visualizing post-quantum cryptographic security",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      },
      sentimentAnalysis: {
        score: -0.12,
        percentage: 44,
        label: "Cautious/Critical",
        tone: "Urgent & Warning",
        subjectivity: 0.18,
        emotionalDrivers: ["Urgency: 95%", "Risk: 90%", "Preparedness: 85%"],
        explanation: "Emphasizes pressing risk vectors regarding unmigrated legacy cryptographic databases.",
      },
      backlinks: [
        {
          sourceName: "NIST Post-Quantum Cryptography Project",
          url: "https://csrc.nist.gov/projects/post-quantum-cryptography",
          anchorText: "NIST post-quantum cryptographic standards",
          type: "Canonical Source",
          domainAuthorityEst: "DA 97",
          contextSnippet: "Official government specification of finalized FIPS algorithms.",
        },
      ],
      suggestedFocusKeywords: ["Quantum Key Distribution", "Post-Quantum Cryptography", "Cybersecurity Resilience"],
    },
    {
      id: "blog-7",
      title: "The Death of Static Dashboards: How Conversational SQL & Automated Insights Succeeded",
      author: "Kyle Wiggers, Data Systems",
      publishDate: "Aug 15, 2026",
      readTime: "6 min read",
      category: "Data & BI",
      url: "https://techcrunch.com/2026/08/15/death-of-static-bi-dashboards-conversational-sql",
      summary: "Why traditional static 50-widget business intelligence dashboards are being replaced by contextual alert streams and semantic natural language querying over vector-indexed data warehouses.",
      keyTakeaways: [
        "Executive queries answered in conversational text reduced dedicated analyst reporting backlogs by 80%.",
        "Semantic layer governance is essential to prevent hallucinated metric definitions.",
      ],
      imageSummary: {
        description: "Fluid holographic data chart morphing into conversational dialogue bubbles in a modern office setting.",
        prompt: "Modern architectural workspace with floating holographic data streams translating into natural text, warm lighting, cinematic depth of field",
        visualTheme: "Modern Business Intelligence 3D",
        aspectRatio: "16:9",
        suggestedAltText: "Conversational SQL interface translating complex warehouse data into actionable business summaries",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      },
      sentimentAnalysis: {
        score: 0.78,
        percentage: 89,
        label: "Strongly Positive",
        tone: "Innovative & Transformative",
        subjectivity: 0.31,
        emotionalDrivers: ["Simplicity: 90%", "Speed: 88%", "Empowerment: 85%"],
        explanation: "Highlighting huge quality of life enhancements for non-technical domain stakeholders.",
      },
      backlinks: [
        {
          sourceName: "DBT Semantic Layer Documentation",
          url: "https://docs.getdbt.com",
          anchorText: "semantic data modeling frameworks",
          type: "External Authority",
          domainAuthorityEst: "DA 88",
          contextSnippet: "Best practices for metric consistency across enterprise warehouses.",
        },
      ],
      suggestedFocusKeywords: ["Conversational SQL", "Next-Gen Business Intelligence", "Semantic Data Layer"],
    },
    {
      id: "blog-8",
      title: "Sustainable Datacenters: Immersion Cooling, Geothermal Wells, and Carbon-Aware Workload Scheduling",
      author: "Harri Weber, Climate Tech",
      publishDate: "Aug 14, 2026",
      readTime: "7 min read",
      category: "Green Tech",
      url: "https://techcrunch.com/2026/08/14/sustainable-datacenters-immersion-cooling-climate",
      summary: "A deep dive into how modern compute campuses achieve Power Usage Effectiveness (PUE) below 1.08 using non-conductive liquid immersion tanks and algorithmic workload shifting to regions with surplus renewable energy.",
      keyTakeaways: [
        "Immersion cooling reduces server fan electricity consumption by 95% while extending hardware lifespan.",
        "Carbon-aware schedulers dynamically delay batch training jobs until local grid solar or wind generation peaks.",
      ],
      imageSummary: {
        description: "Gleaming technological immersion cooling tank glowing with clear turquoise fluid surrounded by clean white datacenter racks.",
        prompt: "High-tech green datacenter, immersion cooling liquid tanks with ambient turquoise illumination, clean sustainable energy aesthetic, photorealistic",
        visualTheme: "Clean Green Computing",
        aspectRatio: "16:9",
        suggestedAltText: "Liquid immersion cooling tank inside an energy-efficient sustainable datacenter facility",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      },
      sentimentAnalysis: {
        score: 0.84,
        percentage: 92,
        label: "Strongly Positive",
        tone: "Inspiring & Solution-Oriented",
        subjectivity: 0.25,
        emotionalDrivers: ["Sustainability: 95%", "Hope: 88%", "Ingenuity: 92%"],
        explanation: "Presents tangible, measurable climate engineering achievements that cut compute carbon footprints by half.",
      },
      backlinks: [
        {
          sourceName: "Open Compute Project (OCP)",
          url: "https://www.opencompute.org",
          anchorText: "immersion cooling hardware standardizations",
          type: "Canonical Source",
          domainAuthorityEst: "DA 86",
          contextSnippet: "Standard server chassis specifications for dielectric liquid cooling.",
        },
      ],
      suggestedFocusKeywords: ["Sustainable Datacenters", "Immersion Cooling Technology", "Carbon-Aware Computing"],
    },
    {
      id: "blog-9",
      title: "Micro-Frontends at Scale: Module Federation, Contract Testing, and Independent Team Deployments",
      author: "Manish Singh, Web Architect",
      publishDate: "Aug 13, 2026",
      readTime: "8 min read",
      category: "Web Engineering",
      url: "https://techcrunch.com/2026/08/13/micro-frontends-module-federation-at-scale",
      summary: "Examining architectural lessons from 30+ enterprise migrations to Webpack and Vite Module Federation, avoiding state synchronization nightmares, and managing shared dependency graphs.",
      keyTakeaways: [
        "Contract testing between host containers and remote micro-apps is non-negotiable for zero-downtime releases.",
        "Shared state should be minimized in favor of decoupled custom event bridges.",
      ],
      imageSummary: {
        description: "Modular architectural blocks snapping into place to form a seamless, unified web interface.",
        prompt: "Abstract 3D architectural illustration of modular puzzle blocks assembling into a sleek UI tablet dashboard, soft studio lighting, high resolution",
        visualTheme: "Modular System Architecture",
        aspectRatio: "16:9",
        suggestedAltText: "Modular web frontend architecture showing independent components assembling into a unified interface",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      },
      sentimentAnalysis: {
        score: 0.61,
        percentage: 80,
        label: "Positive",
        tone: "Pragmatic & Cautionary",
        subjectivity: 0.30,
        emotionalDrivers: ["Modularity: 88%", "Independence: 85%", "Discipline: 82%"],
        explanation: "Balanced, honest assessment of when micro-frontends provide leverage versus unnecessary organizational overhead.",
      },
      backlinks: [
        {
          sourceName: "Webpack Module Federation Documentation",
          url: "https://module-federation.io",
          anchorText: "Module Federation runtime architecture",
          type: "Canonical Source",
          domainAuthorityEst: "DA 92",
          contextSnippet: "Technical guidelines for dynamic remote asset resolution.",
        },
      ],
      suggestedFocusKeywords: ["Micro-Frontends Scale", "Module Federation Architecture", "Frontend Independence"],
    },
    {
      id: "blog-10",
      title: "AI Governance & Algorithmic Transparency: Audit Protocols for High-Stakes Financial Decisioning",
      author: "Natasha Lomas, Policy & Law",
      publishDate: "Aug 12, 2026",
      readTime: "9 min read",
      category: "Policy & AI Ethics",
      url: "https://techcrunch.com/2026/08/12/ai-governance-algorithmic-transparency-audit-protocols",
      summary: "How multinational banks and credit underwriters implement counterfactual explainability layers and third-party algorithmic bias auditing to satisfy strict EU AI Act and FTC enforcement standards.",
      keyTakeaways: [
        "Black-box neural models without SHAP or integrated gradients explanations fail regulatory compliance.",
        "Continuous bias drift monitoring prevents disparate impact across demographic sub-cohorts.",
      ],
      imageSummary: {
        description: "A golden scale of justice illuminated alongside transparent neural network decision pathways.",
        prompt: "Symbolic editorial illustration of algorithmic justice scales balanced with transparent neural network nodes, deep navy and warm bronze aesthetic, 8k",
        visualTheme: "Legal & Ethical Tech",
        aspectRatio: "16:9",
        suggestedAltText: "Algorithmic transparency audit framework showing explainable decision pathways and governance compliance",
        imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
      },
      sentimentAnalysis: {
        score: 0.35,
        percentage: 67,
        label: "Analytical/Objective",
        tone: "Judicious & Evaluative",
        subjectivity: 0.15,
        emotionalDrivers: ["Governance: 95%", "Fairness: 92%", "Accountability: 90%"],
        explanation: "Comprehensive overview of emerging compliance mandates with rigorous focus on empirical risk mitigation.",
      },
      backlinks: [
        {
          sourceName: "European Commission AI Act Portal",
          url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
          anchorText: "EU AI Act high-risk classification criteria",
          type: "Canonical Source",
          domainAuthorityEst: "DA 95",
          contextSnippet: "Legal definition of mandatory conformity assessments.",
        },
      ],
      suggestedFocusKeywords: ["AI Governance Audit", "Algorithmic Transparency", "EU AI Act Compliance"],
    },
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'curated' | 'generator' | 'backlinks' | 'seo-rules'>('curated');
  const [curatedData, setCuratedData] = useState<WebsiteAnalysisResult | null>(INITIAL_CURATED_DATA);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingBlog, setIsGeneratingBlog] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Engine preferences: 'offline' (Instant Quota-Free) or 'cloud' (Google Gemini API)
  const [engineMode, setEngineMode] = useState<'offline' | 'cloud'>('offline');
  const [customApiKey, setCustomApiKey] = useState<string>('');

  // Selected blog state for generator
  const [selectedSourceBlog, setSelectedSourceBlog] = useState<CuratedBlogItem | null>(null);
  const [generatorTitle, setGeneratorTitle] = useState('');
  const [generatorKeyword, setGeneratorKeyword] = useState('');

  // Generated full blog
  const [generatedBlog, setGeneratedBlog] = useState<CompleteBlogData | null>(null);

  // 1. Handle Website URL Analysis
  const handleAnalyzeWebsite = async (url: string, topic?: string) => {
    setIsAnalyzing(true);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/analyze-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          topic,
          engineMode,
          customApiKey: customApiKey || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to analyze website.');
      }

      const result: WebsiteAnalysisResult = await response.json();
      setCuratedData(result);
      setActiveTab('curated');
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMsg(err.message || 'An error occurred while analyzing the website.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 2. Handle "Generate Complete Blog" trigger from a curated blog
  const handleSelectBlogToGenerate = (blog: CuratedBlogItem, focusKeyword?: string) => {
    setSelectedSourceBlog(blog);
    setGeneratorTitle(blog.title);
    setGeneratorKeyword(focusKeyword || blog.suggestedFocusKeywords?.[0] || 'AI Workflows');
    setActiveTab('generator');

    // Automatically trigger initial generation if not already generated
    handleGenerateFullBlog({
      title: blog.title,
      focusKeyword: focusKeyword || blog.suggestedFocusKeywords?.[0] || 'AI Workflows',
      sourceUrl: blog.url,
      targetAudience: 'Tech Leaders, Software Engineers, and Product Strategists',
      tone: 'Authoritative, insightful, and actionable',
      wordCountTarget: 1400,
    });
  };

  // 3. Handle Full Blog Generation with strict SEO rules
  const handleGenerateFullBlog = async (params: {
    title: string;
    focusKeyword: string;
    targetAudience?: string;
    tone?: string;
    wordCountTarget?: number;
    sourceUrl?: string;
  }) => {
    setIsGeneratingBlog(true);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/generate-full-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          engineMode,
          customApiKey: customApiKey || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate complete blog.');
      }

      const blogResult: CompleteBlogData = await response.json();
      setGeneratedBlog(blogResult);
      setActiveTab('generator');
    } catch (err: any) {
      console.error('Blog generation error:', err);
      setErrorMsg(err.message || 'Failed to generate full blog post.');
    } finally {
      setIsGeneratingBlog(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100/50 text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-900">
      {/* App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasCuratedData={!!curatedData}
        hasGeneratedBlog={!!generatedBlog}
        engineMode={engineMode}
        setEngineMode={setEngineMode}
        customApiKey={customApiKey}
        setCustomApiKey={setCustomApiKey}
      />

      {/* Global Error Banner */}
      {errorMsg && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span className="text-sm font-medium">{errorMsg}</span>
            </div>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-xs font-bold text-rose-600 hover:text-rose-800 px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* URL Search & Quick Presets (Always accessible) */}
      <UrlSearchBar
        onAnalyze={handleAnalyzeWebsite}
        isLoading={isAnalyzing}
        currentUrl={curatedData?.websiteUrl || 'https://techcrunch.com'}
        engineMode={engineMode}
        setEngineMode={setEngineMode}
      />

      {/* Main Content Area Based on Active Tab */}
      <main className="flex-1 pb-16">
        {/* Loading Overlay when analyzing */}
        {isAnalyzing && (
          <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-stone-900 text-amber-300 flex items-center justify-center mx-auto shadow-lg animate-pulse">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>
            <h3 className="text-xl font-bold font-serif text-stone-900">
              Curating Top 10 Blogs & Running Sentiment Analysis...
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Grounding website data with Gemini AI, extracting image descriptions, computing sentiment scores, and building the backlink matrix.
            </p>
          </div>
        )}

        {!isAnalyzing && activeTab === 'curated' && curatedData && (
          <CuratedBlogsDashboard
            data={curatedData}
            onSelectBlogToGenerate={handleSelectBlogToGenerate}
          />
        )}

        {!isAnalyzing && activeTab === 'generator' && (
          <CompleteBlogStudio
            initialTitle={generatorTitle}
            initialKeyword={generatorKeyword}
            sourceBlog={selectedSourceBlog}
            generatedBlog={generatedBlog}
            onGenerateBlog={handleGenerateFullBlog}
            isGenerating={isGeneratingBlog}
          />
        )}

        {!isAnalyzing && activeTab === 'backlinks' && (
          <BacklinkIntelligenceMatrix
            curatedData={curatedData}
            generatedBlog={generatedBlog}
          />
        )}

        {!isAnalyzing && activeTab === 'seo-rules' && (
          <SeoRulesVerificationView
            onGoToGenerator={() => setActiveTab('generator')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-stone-800 font-serif">BlogPulse AI</span>
            <span>&bull;</span>
            <span>Strict SEO Placement Engine (Title, Meta, 1st Paragraph Sentence #1)</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Sentiment Analysis (-1.0 to +1.0)</span>
            <span>&bull;</span>
            <span>Backlink Matrix & Authority DA</span>
            <span>&bull;</span>
            <span>Related Image Prompts</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
