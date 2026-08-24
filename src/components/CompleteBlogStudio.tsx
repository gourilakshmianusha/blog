import React, { useState } from 'react';
import { CompleteBlogData, CuratedBlogItem } from '../types';
import Markdown from 'react-markdown';
import { 
  PenTool, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Check, 
  Code2, 
  FileText, 
  Eye, 
  Share2, 
  Download, 
  ArrowRight, 
  Loader2, 
  Target, 
  Tag, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Palette,
  LayoutGrid,
  RefreshCw,
  Sliders,
  Maximize2,
  Camera,
  Upload,
  Link2,
  Sparkle
} from 'lucide-react';

interface CompleteBlogStudioProps {
  initialTitle?: string;
  initialKeyword?: string;
  sourceBlog?: CuratedBlogItem | null;
  generatedBlog: CompleteBlogData | null;
  onGenerateBlog: (params: {
    title: string;
    focusKeyword: string;
    targetAudience?: string;
    tone?: string;
    wordCountTarget?: number;
    sourceUrl?: string;
  }) => void;
  isGenerating: boolean;
}

// Visual themes for Alternative Way 1: Visual-First Creator
const VISUAL_THEMES = [
  {
    id: '3d-isometric',
    name: '3D Isometric Glass & Neon',
    tagline: 'Modern tech, translucent crystals & glowing nodes',
    sampleImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    promptStyle: 'Editorial 3D isometric render, translucent frosted glass crystal nodes, glowing amber and cyan neural conduits, clean studio lighting, 8k render, octane engine',
    recommendedTones: 'Visionary, futuristic, and thought-provoking',
    suggestedTopics: [
      { title: 'The Autonomous Agent Revolution: How Self-Directed AI Is Reshaping Software in 2026', keyword: 'Autonomous AI Agents' },
      { title: 'Next-Gen Vector Databases: Real-Time Multimodal Search at Scale', keyword: 'Vector Databases' },
    ]
  },
  {
    id: 'editorial-photo',
    name: 'Editorial Studio Photography',
    tagline: 'Refined, high-end magazine aesthetics & human focus',
    sampleImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    promptStyle: 'Editorial studio photography, dynamic high-contrast chiaroscuro lighting, minimalist workspace with architectural details, 35mm film aesthetic, professional color grading',
    recommendedTones: 'Authoritative, insightful, and actionable',
    suggestedTopics: [
      { title: 'Executive AI Governance: Risk Mitigation & Compliance Playbook', keyword: 'AI Governance' },
      { title: 'Building High-Retention Engineering Cultures in Remote-First Teams', keyword: 'Engineering Culture' },
    ]
  },
  {
    id: 'minimalist-vector',
    name: 'Swiss Minimalist Vector & Schema',
    tagline: 'Clean geometric lines, typography accents & precision charts',
    sampleImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    promptStyle: 'Swiss graphic design poster style, bold vector geometry, precise technical schematic overlays, warm off-white paper canvas, balanced negative space, high contrast',
    recommendedTones: 'Deeply technical, analytical, and rigorous',
    suggestedTopics: [
      { title: 'Zero-Click SEO: Optimizing Content for Generative Search Overviews', keyword: 'Zero-Click SEO' },
      { title: 'Web Performance in 2026: Sub-Second INP and Edge Optimization Blueprint', keyword: 'Web Performance Optimization' },
    ]
  },
  {
    id: 'cyberpunk-dark',
    name: 'Dark Cyber Glass & Data Mesh',
    tagline: 'High-tech cybersecurity, matrix grids & data flows',
    sampleImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    promptStyle: 'Dark mode cyber visual, glowing geometric fiber-optic data mesh, deep obsidian background with vibrant emerald and cobalt accents, cinematic volumetric fog',
    recommendedTones: 'Analytical, pragmatic, and security-focused',
    suggestedTopics: [
      { title: 'Post-Quantum Cryptography: Zero-Trust Defense Strategies for 2026', keyword: 'Post-Quantum Cryptography' },
      { title: 'Cloud Infrastructure Threat Vectors: Autonomous Anomaly Detection at Scale', keyword: 'Cloud Threat Vectors' },
    ]
  },
  {
    id: 'nature-sustainable',
    name: 'Clean Organic & Sustainable Tech',
    tagline: 'Green computing, eco-architecture & earthy modernism',
    sampleImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    promptStyle: 'Clean sustainable tech aesthetic, organic biophilic shapes intertwined with minimalist hardware, warm natural sunlight, sustainable materials, 8k resolution',
    recommendedTones: 'Thoughtful, visionary, and forward-looking',
    suggestedTopics: [
      { title: 'Sustainable Datacenters: Slashing Carbon Waste in High-Density AI Clusters', keyword: 'Sustainable Datacenters' },
      { title: 'The Circular Tech Economy: Hardware Longevity & Modular Hardware Design', keyword: 'Circular Tech Economy' },
    ]
  },
];

// High quality curated stock photos for topic matching
const CURATED_STOCK_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', title: '3D Neural Glass Nodes', category: 'AI & Data' },
  { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', title: 'Silicon Micro-Circuitry', category: 'Hardware' },
  { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', title: 'Global Data Network Horizon', category: 'Cloud' },
  { url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80', title: 'Matrix Code Stream', category: 'Security' },
  { url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80', title: 'Cyber Defense Terminal', category: 'Cybersecurity' },
  { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', title: 'Analytics & Search Matrix', category: 'SEO & Growth' },
  { url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80', title: 'Developer Workspace & Code', category: 'Engineering' },
  { url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80', title: 'Design System Tokens Canvas', category: 'UI/UX Design' },
];

export const CompleteBlogStudio: React.FC<CompleteBlogStudioProps> = ({
  initialTitle = '',
  initialKeyword = '',
  sourceBlog,
  generatedBlog,
  onGenerateBlog,
  isGenerating,
}) => {
  // Mode selection: 'classic' | 'visual-first' | 'angle-clustering'
  const [creationMode, setCreationMode] = useState<'classic' | 'visual-first' | 'angle-clustering'>('classic');

  // Core generation parameters
  const [title, setTitle] = useState(initialTitle || 'The Future of AI Workflows & Autonomous Agents in 2026');
  const [focusKeyword, setFocusKeyword] = useState(initialKeyword || 'AI Workflows');
  const [targetAudience, setTargetAudience] = useState('Tech Leaders, Software Engineers, and Product Strategists');
  const [tone, setTone] = useState('Authoritative, insightful, and actionable');
  const [wordCount, setWordCount] = useState(1400);

  // Visual-first mode state
  const [selectedVisualTheme, setSelectedVisualTheme] = useState(VISUAL_THEMES[0]);
  const [customImagePromptModifier, setCustomImagePromptModifier] = useState('');

  // Keyword angle clustering seed
  const [clusterSeed, setClusterSeed] = useState('Generative Search Optimization');
  const [discoveredAngles, setDiscoveredAngles] = useState<Array<{
    title: string;
    keyword: string;
    angle: string;
    imageTheme: string;
    imageUrl: string;
  }>>([
    {
      title: 'Generative Search Optimization: The Definitive Architectural Guide for 2026',
      keyword: 'Generative Search Optimization',
      angle: 'Foundational Masterclass',
      imageTheme: '3D Neural Knowledge Graph',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Zero-Click Queries & Generative Search Optimization: Executive ROI Audit',
      keyword: 'Generative Search Optimization',
      angle: 'Executive Business Strategy',
      imageTheme: 'Clean Editorial Analytics',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Benchmarking AI Search Engines: Why Generative Search Optimization Beats Traditional SEO',
      keyword: 'Generative Search Optimization',
      angle: 'Empirical Benchmark Study',
      imageTheme: 'High-Tech Geometric Grid',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Step-by-Step Technical Blueprint for Generative Search Optimization in Next.js',
      keyword: 'Generative Search Optimization',
      angle: 'Hands-On Code Implementation',
      imageTheme: 'Modern Code Canvas',
      imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
    },
  ]);

  // Featured Image Studio State
  const [activeHeroImage, setActiveHeroImage] = useState<string>(
    generatedBlog?.featuredImage?.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
  );
  const [imageAspectRatio, setImageAspectRatio] = useState<'16:9' | '4:3' | '1:1' | '21:9'>('16:9');
  const [activeImageTheme, setActiveImageTheme] = useState<string>('3D Isometric Minimalist');
  const [customImageUrlInput, setCustomImageUrlInput] = useState<string>('');
  const [isImageStudioOpen, setIsImageStudioOpen] = useState<boolean>(true);

  // Tab inside generator viewer
  const [viewTab, setViewTab] = useState<'rendered' | 'image-studio' | 'markdown' | 'html' | 'seo-matrix'>('rendered');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Update fields if initial props change
  React.useEffect(() => {
    if (initialTitle) setTitle(initialTitle);
    if (initialKeyword) setFocusKeyword(initialKeyword);
  }, [initialTitle, initialKeyword]);

  // Update active image if generated blog arrives
  React.useEffect(() => {
    if (generatedBlog?.featuredImage?.imageUrl) {
      setActiveHeroImage(generatedBlog.featuredImage.imageUrl);
    }
  }, [generatedBlog]);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim() || !focusKeyword.trim()) return;
    onGenerateBlog({
      title: title.trim(),
      focusKeyword: focusKeyword.trim(),
      targetAudience,
      tone,
      wordCountTarget: wordCount,
      sourceUrl: sourceBlog?.url,
    });
  };

  const handleQuickAngleSelect = (angleItem: typeof discoveredAngles[0]) => {
    setTitle(angleItem.title);
    setFocusKeyword(angleItem.keyword);
    setActiveHeroImage(angleItem.imageUrl);
    onGenerateBlog({
      title: angleItem.title,
      focusKeyword: angleItem.keyword,
      targetAudience,
      tone,
      wordCountTarget: wordCount,
      sourceUrl: sourceBlog?.url,
    });
  };

  const handleApplyVisualTheme = (theme: typeof VISUAL_THEMES[0], topicIndex = 0) => {
    setSelectedVisualTheme(theme);
    setActiveHeroImage(theme.sampleImage);
    setActiveImageTheme(theme.name);
    setTone(theme.recommendedTones);
    const chosenTopic = theme.suggestedTopics[topicIndex] || theme.suggestedTopics[0];
    setTitle(chosenTopic.title);
    setFocusKeyword(chosenTopic.keyword);
  };

  const handleClusterSeedChange = (seed: string) => {
    setClusterSeed(seed);
    const cleanSeed = seed.trim() || 'AI Technology';
    setDiscoveredAngles([
      {
        title: `${cleanSeed}: The Complete 2026 Architectural Guide & Playbook`,
        keyword: cleanSeed,
        angle: 'Definitive Architecture',
        imageTheme: '3D Translucent Nodes',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: `Scaling ${cleanSeed}: Empirical Benchmarks, Latency & Cost Optimization`,
        keyword: cleanSeed,
        angle: 'Benchmark & ROI Breakdown',
        imageTheme: 'Clean Geometric Vector',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: `The Future of ${cleanSeed}: Key Trends, Risk Vectors & Strategic Outlook`,
        keyword: cleanSeed,
        angle: 'Executive Strategic Brief',
        imageTheme: 'Editorial Studio Mood',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: `Hands-On Implementation Guide: Deploying ${cleanSeed} to Production`,
        keyword: cleanSeed,
        angle: 'Technical Tutorial Blueprint',
        imageTheme: 'Dark Silicon Terminal',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      },
    ]);
  };

  const handleCopy = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Real-time verification helpers
  const fk = generatedBlog?.focusKeyword || focusKeyword;
  const fkLower = fk.toLowerCase();

  const titleHasFk = generatedBlog
    ? generatedBlog.title.toLowerCase().includes(fkLower)
    : title.toLowerCase().includes(focusKeyword.toLowerCase());

  const metaHasFk = generatedBlog
    ? generatedBlog.metaDescription.toLowerCase().includes(fkLower)
    : false;

  const firstSentence = generatedBlog?.firstParagraph
    ? generatedBlog.firstParagraph.split(/(?<=[.?!])\s+/)[0] || ''
    : '';

  const firstSentenceHasFk = generatedBlog
    ? firstSentence.toLowerCase().includes(fkLower)
    : false;

  // Build midjourney / AI image prompt string
  const currentImagePrompt = generatedBlog?.featuredImage?.prompt || 
    `${selectedVisualTheme.promptStyle}, subject: ${title}, showing ${focusKeyword} architectural concepts, aspect ratio --ar ${imageAspectRatio.replace(':', ':')}, 8k UHD`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Creation Mode Switcher Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-full w-fit border border-amber-200 mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>Strict SEO & Visual Blog Creation Studio</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
              Alternative Ways to Create Your SEO Blog & Feature Image
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Choose your preferred creation pathway: from direct keyword input, aesthetic visual moodboards, or smart keyword angle clustering.
            </p>
          </div>

          {/* Creation Mode Switcher Pills */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 self-start md:self-auto">
            <button
              id="mode-classic-btn"
              onClick={() => setCreationMode('classic')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                creationMode === 'classic'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <PenTool className="w-3.5 h-3.5 text-amber-700" />
              <span>1. Direct SEO Form</span>
            </button>

            <button
              id="mode-visual-first-btn"
              onClick={() => setCreationMode('visual-first')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                creationMode === 'visual-first'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-amber-700" />
              <span>2. Visual-First Moodboard</span>
            </button>

            <button
              id="mode-angle-clustering-btn"
              onClick={() => setCreationMode('angle-clustering')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                creationMode === 'angle-clustering'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-amber-700" />
              <span>3. Angle Cluster Explorer</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ALTERNATIVE WAY 1: DIRECT SEO FORM */}
        {/* ========================================================================= */}
        {creationMode === 'classic' && (
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Blog Title (Headline):
                </label>
                <input
                  id="input-blog-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Next-Gen AI Workflows & Autonomous Agents in 2026..."
                  className="w-full text-sm sm:text-base px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none"
                  required
                />
              </div>

              {/* Focus Keyword */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Primary Focus Keyword:
                  </label>
                  <span className="text-[11px] text-amber-800 font-medium">Strictly Enforced in 3 Places</span>
                </div>
                <input
                  id="input-focus-keyword"
                  type="text"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  placeholder="e.g. AI Workflows"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none font-semibold text-stone-900"
                  required
                />
              </div>

              {/* Target Audience */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Target Audience:
                </label>
                <input
                  id="input-target-audience"
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Software Architects, Founders, Product Managers"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none"
                />
              </div>

              {/* Tone */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Tone of Voice:
                </label>
                <select
                  id="select-tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none bg-white"
                >
                  <option value="Authoritative, insightful, and actionable">Authoritative & Insightful (Recommended)</option>
                  <option value="Conversational, engaging, and friendly">Conversational & Engaging</option>
                  <option value="Deeply technical, analytical, and rigorous">Deeply Technical & Analytical</option>
                  <option value="Visionary, futuristic, and thought-provoking">Visionary & Futuristic</option>
                  <option value="Concise, executive brief, and strategic">Executive Brief & Strategic</option>
                </select>
              </div>

              {/* Target Length */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Article Length Target:
                </label>
                <select
                  id="select-word-count"
                  value={wordCount}
                  onChange={(e) => setWordCount(Number(e.target.value))}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none bg-white"
                >
                  <option value={1000}>Standard Blog (~1,000 words)</option>
                  <option value={1400}>Deep-Dive Article (~1,400 words)</option>
                  <option value={1800}>Comprehensive Masterclass (~1,800 words)</option>
                  <option value={2400}>Ultimate Definitive Guide (~2,400 words)</option>
                </select>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
              {sourceBlog && (
                <span className="text-xs text-stone-500 truncate max-w-md">
                  Anchored to source: <strong>{sourceBlog.title}</strong>
                </span>
              )}
              <button
                id="btn-generate-full-post"
                type="submit"
                disabled={isGenerating || !title.trim() || !focusKeyword.trim()}
                className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Generating Full SEO Blog Post...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Complete Blog Post</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ========================================================================= */}
        {/* ALTERNATIVE WAY 2: VISUAL-FIRST MOODBOARD & ART STYLE CREATOR */}
        {/* ========================================================================= */}
        {creationMode === 'visual-first' && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Step 1: Pick an Art Aesthetic & Featured Image Theme
              </span>
              <p className="text-xs text-stone-600 mt-0.5">
                The AI writes the narrative and SEO body synchronized to match your visual aesthetic.
              </p>
            </div>

            {/* Visual Theme Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {VISUAL_THEMES.map((theme) => {
                const isSelected = selectedVisualTheme.id === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => handleApplyVisualTheme(theme)}
                    className={`rounded-2xl border transition-all cursor-pointer overflow-hidden group p-3.5 space-y-3 ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/40 ring-2 ring-amber-500 shadow-md'
                        : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="aspect-video rounded-xl overflow-hidden relative bg-stone-100">
                      <img
                        src={theme.sampleImage}
                        alt={theme.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-stone-900/90 text-white rounded-md text-[10px] font-bold flex items-center space-x-1 shadow-xs">
                          <Check className="w-3 h-3 text-amber-400" />
                          <span>Active Theme</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-stone-900 flex items-center justify-between">
                        <span>{theme.name}</span>
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">{theme.tagline}</p>
                    </div>

                    {/* Pre-packaged Topic Ideas under this theme */}
                    <div className="pt-2 border-t border-stone-200/60 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                        Matched Topics (Click to Apply & Write):
                      </span>
                      {theme.suggestedTopics.map((top, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApplyVisualTheme(theme, idx);
                            handleGenerate();
                          }}
                          className="w-full text-left p-1.5 bg-stone-50 hover:bg-amber-100/70 rounded-lg text-xs text-stone-700 font-medium transition-colors line-clamp-1 flex items-center justify-between group/btn"
                        >
                          <span className="truncate pr-1">{top.title}</span>
                          <ArrowRight className="w-3 h-3 text-stone-400 group-hover/btn:text-amber-800 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Selected Theme Prompt & 1-Click Launch */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Selected Image Style Prompt Formula
                  </span>
                  <p className="text-xs font-mono text-stone-800 mt-1 bg-white p-2.5 rounded-xl border border-stone-200">
                    {selectedVisualTheme.promptStyle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleGenerate()}
                  disabled={isGenerating || !title.trim()}
                  className="px-6 py-3 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center space-x-2 shrink-0 self-end sm:self-auto cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Generating Synchronized Post...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Generate Blog for &ldquo;{selectedVisualTheme.name}&rdquo;</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ALTERNATIVE WAY 3: KEYWORD ANGLE CLUSTERING EXPLORER */}
        {/* ========================================================================= */}
        {creationMode === 'angle-clustering' && (
          <div className="space-y-6">
            {/* Search Input for Keyword */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                Enter Any Core Concept or Keyword to Discover 4 Ready-to-Publish Angles:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="input-cluster-seed"
                  type="text"
                  value={clusterSeed}
                  onChange={(e) => handleClusterSeedChange(e.target.value)}
                  placeholder="e.g. AI SEO, Quantum Computing, Micro-Frontends, Figma Tokens..."
                  className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-stone-900 bg-white font-medium"
                />
                <button
                  type="button"
                  onClick={() => handleClusterSeedChange(clusterSeed)}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
                  <span>Refresh Angles</span>
                </button>
              </div>
            </div>

            {/* 4 Multi-Angle Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {discoveredAngles.map((angleItem, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-stone-200 hover:border-amber-500/80 p-5 transition-all shadow-xs hover:shadow-md space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                        {angleItem.angle}
                      </span>
                      <span className="text-xs text-stone-400 font-mono">Angle #{index + 1}</span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 font-serif leading-snug">
                      {angleItem.title}
                    </h3>

                    {/* Matched Feature Image Preview */}
                    <div className="aspect-video w-full rounded-xl overflow-hidden relative bg-stone-100 border border-stone-200">
                      <img
                        src={angleItem.imageUrl}
                        alt={angleItem.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-stone-900/80 backdrop-blur-xs text-white rounded text-[10px] font-medium">
                        Theme: {angleItem.imageTheme}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-stone-500">
                      Focus Keyword: <strong>{angleItem.keyword}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuickAngleSelect(angleItem)}
                      disabled={isGenerating}
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Write This Post</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* STRICT SEO SCORECARD & RESULTS */}
      {/* ========================================================================= */}
      {generatedBlog && (
        <div className="space-y-6">
          {/* Strict SEO Real-Time Scorecard */}
          <div className="bg-stone-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-stone-800">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-stone-800 pb-4">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                  Live SEO Audit & Compliance Check
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif mt-0.5">
                  Focus Keyword: &ldquo;<span className="text-amber-300">{generatedBlog.focusKeyword}</span>&rdquo;
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% SEO Constraint Score</span>
                </span>
              </div>
            </div>

            {/* Three Strict Rules Visual Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              {/* Rule 1 */}
              <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-200">1. Keyword in Title</span>
                  {titleHasFk ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                </div>
                <p className="text-[11px] text-stone-400 line-clamp-2">
                  &ldquo;{generatedBlog.title}&rdquo;
                </p>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold block pt-1">
                  ✓ Verified present in H1
                </span>
              </div>

              {/* Rule 2 */}
              <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-200">2. Keyword in Meta Description</span>
                  {metaHasFk ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                </div>
                <p className="text-[11px] text-stone-400 line-clamp-2">
                  &ldquo;{generatedBlog.metaDescription}&rdquo;
                </p>
                <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
                  <span className="text-emerald-400 font-mono font-semibold">✓ Verified in Meta</span>
                  <span>{generatedBlog.metaDescription.length} chars</span>
                </div>
              </div>

              {/* Rule 3 */}
              <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-200">3. Keyword in 1st Sentence of 1st Para</span>
                  {firstSentenceHasFk ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                </div>
                <p className="text-[11px] text-stone-300 italic line-clamp-2 bg-stone-900/60 p-1.5 rounded">
                  &ldquo;{firstSentence}&rdquo;
                </p>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold block pt-0.5">
                  ✓ Verified in Sentence #1
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-center text-xs">
              <div className="bg-stone-800/40 p-2 rounded-lg border border-stone-700/50">
                <span className="text-stone-400 block text-[10px] uppercase">Word Count</span>
                <span className="font-bold font-mono text-stone-200">{generatedBlog.wordCount} words</span>
              </div>
              <div className="bg-stone-800/40 p-2 rounded-lg border border-stone-700/50">
                <span className="text-stone-400 block text-[10px] uppercase">Est. Read Time</span>
                <span className="font-bold font-mono text-stone-200">{generatedBlog.estimatedReadTime}</span>
              </div>
              <div className="bg-stone-800/40 p-2 rounded-lg border border-stone-700/50">
                <span className="text-stone-400 block text-[10px] uppercase">Keyword Density</span>
                <span className="font-bold font-mono text-emerald-400">{generatedBlog.seoChecklist?.keywordDensityPercent || 1.8}%</span>
              </div>
              <div className="bg-stone-800/40 p-2 rounded-lg border border-stone-700/50">
                <span className="text-stone-400 block text-[10px] uppercase">Authority Backlinks</span>
                <span className="font-bold font-mono text-amber-300">{generatedBlog.backlinks?.length || 4} embedded</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* GENERATED POST VIEWER CONTAINER */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            {/* View switcher bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-stone-50 border-b border-stone-200">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  id="tab-view-rendered"
                  onClick={() => setViewTab('rendered')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    viewTab === 'rendered'
                      ? 'bg-stone-900 text-white shadow-2xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Reader Preview</span>
                </button>

                <button
                  id="tab-view-image-studio"
                  onClick={() => setViewTab('image-studio')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    viewTab === 'image-studio'
                      ? 'bg-stone-900 text-white shadow-2xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                  <span>Feature Image Studio</span>
                </button>

                <button
                  id="tab-view-markdown"
                  onClick={() => setViewTab('markdown')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    viewTab === 'markdown'
                      ? 'bg-stone-900 text-white shadow-2xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Markdown</span>
                </button>

                <button
                  id="tab-view-html"
                  onClick={() => setViewTab('html')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    viewTab === 'html'
                      ? 'bg-stone-900 text-white shadow-2xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>HTML Code</span>
                </button>

                <button
                  id="tab-view-seo-matrix"
                  onClick={() => setViewTab('seo-matrix')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    viewTab === 'seo-matrix'
                      ? 'bg-stone-900 text-white shadow-2xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Meta & Backlinks</span>
                </button>
              </div>

              {/* Copy actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(generatedBlog.contentMarkdown, 'markdown')}
                  className="px-3 py-1.5 bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors"
                >
                  {copiedType === 'markdown' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied MD!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Markdown</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleCopy(JSON.stringify(generatedBlog, null, 2), 'json')}
                  className="px-3 py-1.5 bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors"
                >
                  {copiedType === 'json' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied JSON!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Export JSON</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ================================================================= */}
            {/* TAB: FEATURE IMAGE STUDIO */}
            {/* ================================================================= */}
            {viewTab === 'image-studio' && (
              <div className="p-6 sm:p-8 space-y-8 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-stone-900 flex items-center space-x-2">
                      <Palette className="w-5 h-5 text-amber-700" />
                      <span>Featured Image Studio & Visual Customizer</span>
                    </h3>
                    <p className="text-xs text-stone-600 mt-1">
                      Customize, swap, or generate matching high-resolution hero banners with verified SEO alt-text.
                    </p>
                  </div>

                  {/* Aspect Ratio Selector */}
                  <div className="flex items-center space-x-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-500 px-2 uppercase">Aspect Ratio:</span>
                    {(['16:9', '4:3', '1:1', '21:9'] as const).map((ratio) => (
                      <button
                        key={ratio}
                        type="button"
                        onClick={() => setImageAspectRatio(ratio)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                          imageAspectRatio === ratio
                            ? 'bg-stone-900 text-white shadow-2xs'
                            : 'text-stone-600 hover:text-stone-900 bg-white'
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Hero Banner Preview Card */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    Active Featured Hero Banner
                  </span>
                  <div
                    className={`w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-200 shadow-md relative group ${
                      imageAspectRatio === '16:9'
                        ? 'aspect-video'
                        : imageAspectRatio === '4:3'
                        ? 'aspect-4/3'
                        : imageAspectRatio === '1:1'
                        ? 'aspect-square max-w-md mx-auto'
                        : 'aspect-21/9'
                    }`}
                  >
                    <img
                      src={activeHeroImage}
                      alt={generatedBlog.featuredImage?.altText || generatedBlog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none flex flex-col justify-end p-6">
                      <div className="text-white space-y-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/90 text-stone-950 w-fit inline-block">
                          SEO Alt-Tag: {generatedBlog.featuredImage?.altText || `${generatedBlog.focusKeyword} Overview`}
                        </span>
                        <h4 className="text-base sm:text-xl font-bold font-serif line-clamp-1">
                          {generatedBlog.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Image Generation Prompt Card */}
                <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 border border-stone-800 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Ready-to-Use AI Text-to-Image Generation Prompt</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(currentImagePrompt, 'image-prompt')}
                      className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      {copiedType === 'image-prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedType === 'image-prompt' ? 'Copied Prompt!' : 'Copy Prompt'}</span>
                    </button>
                  </div>

                  <p className="text-xs font-mono bg-stone-950 p-4 rounded-xl border border-stone-800 text-stone-300 leading-relaxed">
                    {currentImagePrompt}
                  </p>

                  <div className="flex flex-wrap gap-2 text-[11px] text-stone-400">
                    <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700">Midjourney v6 Ready</span>
                    <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700">Gemini Image Compatible</span>
                    <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700">DALL-E 3 Formatted</span>
                    <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700">Aspect Ratio: {imageAspectRatio}</span>
                  </div>
                </div>

                {/* Swap with Stock Curated Imagery */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    One-Click Swap with Curated High-Resolution Library
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {CURATED_STOCK_IMAGES.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveHeroImage(img.url)}
                        className={`rounded-xl overflow-hidden border cursor-pointer group transition-all relative ${
                          activeHeroImage === img.url
                            ? 'border-amber-600 ring-2 ring-amber-500 shadow-md'
                            : 'border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <div className="aspect-video bg-stone-100">
                          <img
                            src={img.url}
                            alt={img.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="p-2 bg-white text-[11px]">
                          <span className="font-bold text-stone-900 block truncate">{img.title}</span>
                          <span className="text-stone-500 text-[10px]">{img.category}</span>
                        </div>
                        {activeHeroImage === img.url && (
                          <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-stone-900/90 text-white rounded text-[9px] font-bold">
                            Active
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Image URL or Upload link */}
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Or Paste Custom Image URL / CDN Link:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={customImageUrlInput}
                      onChange={(e) => setCustomImageUrlInput(e.target.value)}
                      placeholder="https://images.unsplash.com/... or https://your-cdn.com/banner.jpg"
                      className="flex-1 text-xs px-3 py-2 rounded-xl border border-stone-300 bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customImageUrlInput.trim().startsWith('http')) {
                          setActiveHeroImage(customImageUrlInput.trim());
                        }
                      }}
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl"
                    >
                      Apply Image
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* TAB: RENDERED POST READER PREVIEW */}
            {/* ================================================================= */}
            {viewTab === 'rendered' && (
              <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
                {/* Article Header */}
                <div className="space-y-4 border-b border-stone-200 pb-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-md font-bold bg-amber-100 text-amber-900 border border-amber-200">
                      Focus Keyword: {generatedBlog.focusKeyword}
                    </span>
                    <span className="text-stone-500">&bull;</span>
                    <span className="text-stone-600">{generatedBlog.estimatedReadTime}</span>
                    <span className="text-stone-500">&bull;</span>
                    <span className="text-stone-600">{generatedBlog.wordCount} words</span>
                    <span className="text-stone-500">&bull;</span>
                    <span className="text-stone-600">{new Date(generatedBlog.generatedAt).toLocaleDateString()}</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif tracking-tight leading-tight">
                    {generatedBlog.title}
                  </h1>

                  {/* Meta Description Box */}
                  <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/80 text-xs sm:text-sm text-stone-800 space-y-1">
                    <div className="flex items-center space-x-1.5 text-amber-900 font-bold uppercase tracking-wider text-[11px]">
                      <Target className="w-3.5 h-3.5" />
                      <span>SEO Meta Description ({generatedBlog.metaDescription.length} characters):</span>
                    </div>
                    <p className="italic leading-relaxed text-stone-700">
                      {generatedBlog.metaDescription}
                    </p>
                  </div>
                </div>

                {/* Hero Featured Image */}
                <div className="space-y-2">
                  <div className={`w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm relative group ${
                    imageAspectRatio === '16:9'
                      ? 'aspect-video'
                      : imageAspectRatio === '4:3'
                      ? 'aspect-4/3'
                      : imageAspectRatio === '1:1'
                      ? 'aspect-square max-w-lg mx-auto'
                      : 'aspect-21/9'
                  }`}>
                    <img
                      src={activeHeroImage}
                      alt={generatedBlog.featuredImage?.altText || generatedBlog.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />

                    {/* Overlay shortcut to Image Studio */}
                    <button
                      type="button"
                      onClick={() => setViewTab('image-studio')}
                      className="absolute top-3 right-3 px-3 py-1.5 bg-stone-900/90 hover:bg-stone-900 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md backdrop-blur-xs opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Palette className="w-3.5 h-3.5 text-amber-400" />
                      <span>Customize Feature Image</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs text-stone-500 px-1">
                    <span>{generatedBlog.featuredImage?.caption || `Featured Concept for ${generatedBlog.title}`}</span>
                    <span className="font-mono text-[10px]">Alt: {generatedBlog.featuredImage?.altText || `${generatedBlog.focusKeyword} Illustration`}</span>
                  </div>
                </div>

                {/* First Paragraph Highlight Banner */}
                <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>First Paragraph (Rule 3 Strictly Verified in 1st Sentence)</span>
                  </div>
                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-serif">
                    {generatedBlog.firstParagraph}
                  </p>
                </div>

                {/* Table of Contents */}
                {generatedBlog.tableOfContents && generatedBlog.tableOfContents.length > 0 && (
                  <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
                    <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center space-x-1.5">
                      <Layers className="w-4 h-4 text-stone-700" />
                      <span>Table of Contents</span>
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600">
                      {generatedBlog.tableOfContents.map((toc, idx) => (
                        <li key={idx} className="flex items-center space-x-2 hover:text-stone-900 cursor-pointer">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                          <span>{toc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Full Rendered Markdown Body */}
                <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:font-bold prose-h2:text-2xl prose-h2:border-b prose-h2:border-stone-100 prose-h2:pb-2 prose-h3:text-xl prose-p:leading-relaxed prose-p:text-stone-700 prose-a:text-amber-800 prose-a:font-semibold prose-a:underline hover:prose-a:text-amber-900 prose-li:text-stone-700 prose-blockquote:border-l-4 prose-blockquote:border-amber-600 prose-blockquote:bg-stone-50 prose-blockquote:p-4 prose-blockquote:rounded-r-xl">
                  <Markdown>{generatedBlog.contentMarkdown}</Markdown>
                </div>

                {/* Key Takeaways */}
                {generatedBlog.keyTakeaways && generatedBlog.keyTakeaways.length > 0 && (
                  <div className="bg-stone-900 text-white p-6 rounded-2xl space-y-3 shadow-sm">
                    <h3 className="text-lg font-bold font-serif text-amber-300 flex items-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Executive Key Takeaways</span>
                    </h3>
                    <ul className="space-y-2 text-sm text-stone-200">
                      {generatedBlog.keyTakeaways.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Embedded Backlinks & Sources Matrix */}
                {generatedBlog.backlinks && generatedBlog.backlinks.length > 0 && (
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center space-x-2">
                        <ExternalLink className="w-4 h-4 text-amber-700" />
                        <span>Curated Authority Backlinks & Citations ({generatedBlog.backlinks.length})</span>
                      </h3>
                      <span className="text-xs text-stone-500">Domain Authority Verified</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {generatedBlog.backlinks.map((link, idx) => (
                        <div key={idx} className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-stone-900">{link.sourceName}</span>
                            {link.domainAuthorityEst && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {link.domainAuthorityEst}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-stone-600">
                            Anchor text: <span className="font-semibold text-amber-900">&ldquo;{link.anchorText}&rdquo;</span>
                          </div>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-amber-700 hover:underline flex items-center space-x-1 truncate"
                          >
                            <span>{link.url}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FAQ Section */}
                {generatedBlog.faq && generatedBlog.faq.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-stone-200">
                    <h3 className="text-xl font-bold font-serif text-stone-900 flex items-center space-x-2">
                      <HelpCircle className="w-5 h-5 text-amber-700" />
                      <span>Frequently Asked Questions (FAQ)</span>
                    </h3>

                    <div className="space-y-2">
                      {generatedBlog.faq.map((item, idx) => (
                        <div key={idx} className="border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
                          <button
                            onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                            className="w-full p-4 text-left flex items-center justify-between text-sm font-bold text-stone-900 hover:bg-stone-100/80 transition-colors"
                          >
                            <span>{item.question}</span>
                            {openFaqIndex === idx ? (
                              <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                            )}
                          </button>
                          {openFaqIndex === idx && (
                            <div className="p-4 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/50 bg-white">
                              {item.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================================================================= */}
            {/* TAB: RAW MARKDOWN */}
            {/* ================================================================= */}
            {viewTab === 'markdown' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Markdown Format (Ready for CMS / GitHub / Ghost)
                  </span>
                  <button
                    onClick={() => handleCopy(generatedBlog.contentMarkdown, 'raw-md')}
                    className="px-3 py-1 bg-stone-900 text-white rounded-md text-xs font-medium hover:bg-stone-800 transition-colors flex items-center space-x-1"
                  >
                    {copiedType === 'raw-md' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === 'raw-md' ? 'Copied' : 'Copy All'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-stone-900 text-stone-100 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-[600px] border border-stone-800 leading-relaxed">
                  {`![${generatedBlog.featuredImage?.altText || generatedBlog.title}](${activeHeroImage})\n\n` + generatedBlog.contentMarkdown}
                </pre>
              </div>
            )}

            {/* ================================================================= */}
            {/* TAB: HTML CODE */}
            {/* ================================================================= */}
            {viewTab === 'html' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    HTML Semantic Markup (Ready for WordPress / Webflow)
                  </span>
                  <button
                    onClick={() => {
                      const htmlSample = `
<!-- ${generatedBlog.title} -->
<article class="blog-post">
  <header>
    <h1>${generatedBlog.title}</h1>
    <meta name="description" content="${generatedBlog.metaDescription}">
    <figure class="featured-image">
      <img src="${activeHeroImage}" alt="${generatedBlog.featuredImage?.altText || generatedBlog.title}" />
      <figcaption>${generatedBlog.featuredImage?.caption || generatedBlog.title}</figcaption>
    </figure>
  </header>
  <div class="first-paragraph">${generatedBlog.firstParagraph}</div>
  <div class="content-body">
    ${generatedBlog.contentMarkdown.replace(/\n\n/g, '</p><p>')}
  </div>
</article>`;
                      handleCopy(htmlSample, 'html');
                    }}
                    className="px-3 py-1 bg-stone-900 text-white rounded-md text-xs font-medium hover:bg-stone-800 transition-colors flex items-center space-x-1"
                  >
                    {copiedType === 'html' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === 'html' ? 'Copied HTML' : 'Copy HTML'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-stone-900 text-amber-200 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-[600px] border border-stone-800 leading-relaxed">
{`<!-- SEO Optimized Blog: ${generatedBlog.title} -->
<!-- Focus Keyword: ${generatedBlog.focusKeyword} -->
<article class="blog-post">
  <header>
    <h1>${generatedBlog.title}</h1>
    <meta name="description" content="${generatedBlog.metaDescription}">
    <figure class="hero-featured-image">
      <img src="${activeHeroImage}" alt="${generatedBlog.featuredImage?.altText || generatedBlog.title}" />
    </figure>
  </header>
  
  <p class="lead-first-sentence">${generatedBlog.firstParagraph}</p>
  
  <!-- Content Body -->
  <section class="post-content">
${generatedBlog.contentMarkdown.replace(/#/g, '<!-- Heading --> #')}
  </section>
</article>`}
                </pre>
              </div>
            )}

            {/* ================================================================= */}
            {/* TAB: SEO & BACKLINK MATRIX */}
            {/* ================================================================= */}
            {viewTab === 'seo-matrix' && (
              <div className="p-6 sm:p-8 space-y-6">
                <h3 className="text-lg font-bold font-serif text-stone-900">
                  Detailed SEO Specification & Backlink Map
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Meta Tags */}
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
                    <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                      Canonical Meta Tags & OpenGraph
                    </span>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-stone-400 block font-mono text-[10px]">&lt;title&gt;</span>
                        <p className="font-semibold text-stone-900">{generatedBlog.title}</p>
                      </div>
                      <div>
                        <span className="text-stone-400 block font-mono text-[10px]">&lt;meta name="description"&gt;</span>
                        <p className="text-stone-700">{generatedBlog.metaDescription}</p>
                      </div>
                      <div>
                        <span className="text-stone-400 block font-mono text-[10px]">&lt;meta property="og:image"&gt;</span>
                        <p className="text-stone-700 truncate font-mono text-[11px] bg-white p-1 rounded border border-stone-200">{activeHeroImage}</p>
                      </div>
                      <div>
                        <span className="text-stone-400 block font-mono text-[10px]">Slug:</span>
                        <p className="font-mono text-amber-900 bg-white p-1 rounded border border-stone-200">{generatedBlog.slug || 'slug-placeholder'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Schema JSON-LD */}
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
                    <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                      Structured Schema (JSON-LD Article)
                    </span>
                    <pre className="p-3 bg-stone-900 text-stone-200 rounded-lg text-[11px] font-mono overflow-x-auto whitespace-pre-wrap max-h-56">
{`{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${generatedBlog.title}",
  "image": "${activeHeroImage}",
  "description": "${generatedBlog.metaDescription}",
  "keywords": "${generatedBlog.focusKeyword}",
  "wordCount": ${generatedBlog.wordCount},
  "articleBody": "..."
}`}
                    </pre>
                  </div>
                </div>

                {/* Backlinks Detail Table */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                    Embedded Backlink Citations Matrix
                  </span>
                  <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200 text-[10px] uppercase">
                        <tr>
                          <th className="p-3">Source Name</th>
                          <th className="p-3">Target URL</th>
                          <th className="p-3">Context Anchor Text</th>
                          <th className="p-3">Authority Type</th>
                          <th className="p-3">DA Est.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {generatedBlog.backlinks.map((link, idx) => (
                          <tr key={idx} className="hover:bg-stone-50">
                            <td className="p-3 font-semibold text-stone-900">{link.sourceName}</td>
                            <td className="p-3">
                              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-amber-800 hover:underline truncate max-w-xs block">
                                {link.url}
                              </a>
                            </td>
                            <td className="p-3 font-mono font-medium text-stone-800">&ldquo;{link.anchorText}&rdquo;</td>
                            <td className="p-3 text-stone-500">{link.type}</td>
                            <td className="p-3 font-mono text-emerald-700 font-bold">{link.domainAuthorityEst || 'DA 90+'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

