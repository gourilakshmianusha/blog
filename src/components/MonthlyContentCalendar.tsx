import React, { useState, useMemo } from 'react';
import { 
  MonthlyContentCalendarResult, 
  CalendarDayBlogItem, 
} from '../types';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Download, 
  Search, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Eye, 
  FileText, 
  Image as ImageIcon,
  Globe,
  Shuffle,
  Sun,
  Flame,
  Moon,
  HeartPulse,
  Cpu,
  HeartHandshake,
  Server,
  ShieldCheck,
  Palette,
  Database,
  Leaf,
  Code2,
  X
} from 'lucide-react';

interface MonthlyContentCalendarProps {
  calendarData: MonthlyContentCalendarResult | null;
  isLoading: boolean;
  onGenerateFullBlogFromDay: (day: CalendarDayBlogItem) => void;
  onMonthChange: (year: number, month: number, category: string) => void;
  onCategoryChange: (category: string) => void;
}

const CATEGORY_OPTIONS = [
  { name: 'Indian Vedic Astrology', label: 'Indian Vedic Astrology', icon: Moon, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { name: 'Health & Wellness', label: 'Health & Wellness', icon: HeartPulse, color: 'text-rose-600 bg-rose-50 border-rose-200' },
  { name: 'Digital Marketing & Growth', label: 'Digital Marketing & Growth', icon: Globe, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
  { name: 'AI & Machine Learning', label: 'AI & Machine Learning', icon: Cpu, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  { name: 'NGO & Social Impact', label: 'NGO & Social Impact', icon: HeartHandshake, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { name: 'Growth & SEO', label: 'Growth & SEO', icon: Search, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { name: 'Cloud Infrastructure', label: 'Cloud Infrastructure', icon: Server, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { name: 'Cybersecurity', label: 'Cybersecurity', icon: ShieldCheck, color: 'text-red-600 bg-red-50 border-red-200' },
  { name: 'Design & UX', label: 'UI/UX & Design', icon: Palette, color: 'text-pink-600 bg-pink-50 border-pink-200' },
  { name: 'Data & Analytics', label: 'Data & Analytics', icon: Database, color: 'text-teal-600 bg-teal-50 border-teal-200' },
  { name: 'Green Tech', label: 'Climate & Green Tech', icon: Leaf, color: 'text-lime-600 bg-lime-50 border-lime-200' },
  { name: 'Web Engineering', label: 'Web Engineering', icon: Code2, color: 'text-violet-600 bg-violet-50 border-violet-200' },
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const MonthlyContentCalendar: React.FC<MonthlyContentCalendarProps> = ({
  calendarData,
  isLoading,
  onGenerateFullBlogFromDay,
  onMonthChange,
  onCategoryChange,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [selectedWeekFilter, setSelectedWeekFilter] = useState<number | 'ALL'>('ALL');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDayModal, setActiveDayModal] = useState<CalendarDayBlogItem | null>(null);

  const currentYear = calendarData?.year || 2026;
  const currentMonth = calendarData?.month || 8;
  const currentCategory = calendarData?.category || 'Indian Vedic Astrology';

  // Navigation handlers
  const handlePrevMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    onMonthChange(newYear, newMonth, currentCategory);
  };

  const handleNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    onMonthChange(newYear, newMonth, currentCategory);
  };

  const handleSelectSpecificMonth = (monthNum: number) => {
    if (monthNum === currentMonth && calendarData) return;
    onMonthChange(currentYear, monthNum, currentCategory);
  };

  const handleSelectYear = (yearNum: number) => {
    if (yearNum === currentYear && calendarData) return;
    onMonthChange(yearNum, currentMonth, currentCategory);
  };

  const handleShuffleMonthAngles = () => {
    // Re-trigger month generation with shuffle effect
    onMonthChange(currentYear, currentMonth, currentCategory);
  };

  // Filter days
  const filteredDays = useMemo(() => {
    if (!calendarData) return [];
    return calendarData.days.filter((day) => {
      if (selectedWeekFilter !== 'ALL' && day.weekNumber !== selectedWeekFilter) {
        return false;
      }
      if (selectedTypeFilter !== 'ALL' && day.contentType !== selectedTypeFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          day.title.toLowerCase().includes(q) ||
          day.focusKeyword.toLowerCase().includes(q) ||
          day.metaDescription.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [calendarData, selectedWeekFilter, selectedTypeFilter, searchQuery]);

  // Export handlers
  const exportToCSV = () => {
    if (!calendarData) return;
    const headers = [
      'Day',
      'Date',
      'Day of Week',
      'Week #',
      'Category',
      'Title',
      'Focus Keyword',
      'Meta Description',
      'Content Type',
      'Content Angle',
      'Target Audience',
      'Read Time',
      'Image Prompt',
      'Image Visual Theme',
      'Image URL'
    ];

    const rows = calendarData.days.map((d) => [
      d.dayNumber,
      `"${d.dateFormatted}"`,
      `"${d.dayOfWeek}"`,
      d.weekNumber,
      `"${d.category}"`,
      `"${d.title.replace(/"/g, '""')}"`,
      `"${d.focusKeyword.replace(/"/g, '""')}"`,
      `"${d.metaDescription.replace(/"/g, '""')}"`,
      `"${d.contentType}"`,
      `"${d.contentAngle.replace(/"/g, '""')}"`,
      `"${d.targetAudience.replace(/"/g, '""')}"`,
      `"${d.estimatedReadTime}"`,
      `"${d.featureImage.prompt.replace(/"/g, '""')}"`,
      `"${d.featureImage.visualTheme}"`,
      `"${d.featureImage.imageUrl}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${calendarData.monthName}_${calendarData.year}_${calendarData.category.replace(/[^a-z0-9]/gi, '_')}_Editorial_Calendar.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToMarkdown = () => {
    if (!calendarData) return;
    let md = `# Editorial Content Calendar: ${calendarData.monthName} ${calendarData.year}\n`;
    md += `**Category / Niche:** ${calendarData.category} | **Total Days:** ${calendarData.totalDays} Days\n\n`;
    if (calendarData.solarIngress) {
      md += `**Astrological Ingress:** ${calendarData.solarIngress}\n\n`;
    }
    if (calendarData.seasonalFocus) {
      md += `**Seasonal Focus:** ${calendarData.seasonalFocus}\n\n`;
    }
    md += `## Monthly Strategic Overview\n${calendarData.themeOverview}\n\n`;
    
    md += `## Weekly Themes\n`;
    calendarData.weeklyThemes.forEach(w => {
      md += `- **Week ${w.week}: ${w.title}**\n  _${w.description}_\n`;
    });
    md += `\n---\n\n## Day-by-Day Publishing Schedule\n\n`;

    calendarData.days.forEach(d => {
      md += `### Day ${d.dayNumber} (${d.dateFormatted} - ${d.dayOfWeek})\n`;
      md += `- **Title:** ${d.title}\n`;
      md += `- **Focus Keyword:** \`${d.focusKeyword}\`\n`;
      md += `- **Content Type:** ${d.contentType} | **Read Time:** ${d.estimatedReadTime}\n`;
      md += `- **Meta Description:** ${d.metaDescription}\n`;
      md += `- **Feature Image Visual Theme:** ${d.featureImage.visualTheme}\n`;
      md += `- **Image Prompt:** _${d.featureImage.prompt}_\n`;
      md += `- **Key Takeaways:**\n`;
      d.keyTakeaways.forEach(k => {
        md += `  - ${k}\n`;
      });
      md += `\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${calendarData.monthName}_${calendarData.year}_Editorial_Plan.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isAstrology = currentCategory.toLowerCase().includes('astro') || currentCategory.toLowerCase().includes('jyotish') || currentCategory.toLowerCase().includes('vedic');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Main Title & Action Row */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Dynamic Monthly SEO & Editorial Publishing Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight">
              {calendarData?.monthName || 'August'} {calendarData?.year || 2026} Content Calendar
            </h1>
            <p className="text-sm text-stone-300 max-w-2xl">
              Every month generates a completely unique, non-repeating 30/31-day editorial roadmap dynamically calibrated for monthly transits, seasonal focus, and strict focus keyword targeting.
            </p>
          </div>

          {/* Month & Year Navigation Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 bg-stone-800/90 p-2 rounded-2xl border border-stone-700">
            {/* Year Switcher */}
            <div className="flex items-center bg-stone-900/80 p-1 rounded-xl border border-stone-700 text-xs font-bold">
              {[2026, 2027, 2028].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => handleSelectYear(yr)}
                  disabled={isLoading}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    currentYear === yr 
                      ? 'bg-amber-400 text-stone-950 shadow-xs' 
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>

            {/* Prev/Next Month */}
            <div className="flex items-center space-x-1">
              <button
                id="btn-prev-month"
                type="button"
                onClick={handlePrevMonth}
                disabled={isLoading}
                className="p-2 text-stone-300 hover:text-white hover:bg-stone-700 rounded-xl transition-all cursor-pointer"
                title="Previous Month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="px-3 py-1 text-center min-w-[110px]">
                <div className="text-sm font-bold text-white">
                  {calendarData?.monthName || 'August'}
                </div>
                <div className="text-[10px] text-amber-400 font-medium">
                  {calendarData?.totalDays || 31} Dynamic Days
                </div>
              </div>

              <button
                id="btn-next-month"
                type="button"
                onClick={handleNextMonth}
                disabled={isLoading}
                className="p-2 text-stone-300 hover:text-white hover:bg-stone-700 rounded-xl transition-all cursor-pointer"
                title="Next Month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="h-6 w-px bg-stone-700 mx-0.5 hidden sm:block" />

            {/* Shuffle Variation Button */}
            <button
              id="btn-shuffle-angles"
              type="button"
              onClick={handleShuffleMonthAngles}
              disabled={isLoading}
              className="px-3 py-1.5 bg-stone-700 hover:bg-stone-600 text-amber-300 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Generate fresh alternate topic angles for this month"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Shuffle</span>
            </button>

            {/* Export CSV */}
            <button
              id="btn-export-csv"
              type="button"
              onClick={exportToCSV}
              disabled={!calendarData}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>

            {/* Export Markdown */}
            <button
              id="btn-export-md"
              type="button"
              onClick={exportToMarkdown}
              disabled={!calendarData}
              className="px-3 py-1.5 bg-stone-700 hover:bg-stone-600 text-white rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer hidden sm:flex"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>MD</span>
            </button>
          </div>
        </div>

        {/* 12-Month Quick Switcher Bar */}
        <div className="mt-6 pt-5 border-t border-stone-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center space-x-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Jump to Any Month (Different Dynamic Blogs for Every Month):</span>
            </span>
            <span className="text-[11px] text-amber-300 font-medium">
              Month {currentMonth} of 12 &bull; {calendarData?.totalDays} Days
            </span>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
            {MONTH_NAMES.map((mName, idx) => {
              const monthNum = idx + 1;
              const isSelected = monthNum === currentMonth;
              return (
                <button
                  key={mName}
                  id={`btn-month-${monthNum}`}
                  type="button"
                  onClick={() => handleSelectSpecificMonth(monthNum)}
                  disabled={isLoading}
                  className={`py-2 px-1 rounded-xl text-xs font-bold text-center transition-all cursor-pointer truncate ${
                    isSelected
                      ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300/50 scale-102'
                      : 'bg-stone-800/90 hover:bg-stone-750 text-stone-300 hover:text-white border border-stone-700/60'
                  }`}
                >
                  <span className="block text-[10px] text-stone-400 font-normal leading-none mb-0.5">
                    {isSelected ? '★ Active' : `M${monthNum}`}
                  </span>
                  <span className="block font-semibold truncate">{mName.substring(0, 3)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Switcher Grid */}
        <div className="mt-5 pt-5 border-t border-stone-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Select Niche / Category:</span>
            </span>
            <span className="text-xs text-amber-300 font-medium hidden sm:inline">
              Active: {currentCategory}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {CATEGORY_OPTIONS.map((cat) => {
              const CatIcon = cat.icon;
              const isSelected = currentCategory.toLowerCase().includes(cat.name.toLowerCase()) || 
                (cat.name === 'Indian Vedic Astrology' && isAstrology);
              return (
                <button
                  key={cat.name}
                  id={`cal-cat-btn-${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  type="button"
                  onClick={() => onCategoryChange(cat.name)}
                  disabled={isLoading}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center space-x-2 ${
                    isSelected
                      ? 'bg-amber-400 text-stone-950 font-bold border-amber-300 shadow-sm ring-1 ring-amber-200'
                      : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300 border-stone-700'
                  }`}
                >
                  <CatIcon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-stone-950' : 'text-amber-400'}`} />
                  <span className="text-xs truncate">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Month Ingress & Seasonal Thematic Focus Callout */}
      {calendarData && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              {isAstrology ? (
                <Sun className="w-5 h-5 text-amber-600 shrink-0" />
              ) : (
                <Flame className="w-5 h-5 text-amber-600 shrink-0" />
              )}
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                {isAstrology ? 'Astrological Ingress & Sacred Hindu Month' : 'Seasonal Strategic Focus'}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
              {calendarData.solarIngress || calendarData.seasonalFocus || `${calendarData.monthName} ${calendarData.year} Core Focus`}
            </h2>
            <p className="text-xs text-stone-600 max-w-3xl leading-relaxed">
              {calendarData.themeOverview}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 bg-white p-3 rounded-2xl border border-stone-200 shadow-xs">
            <div className="text-center px-2">
              <div className="text-base font-bold text-stone-900">{calendarData.totalDays}</div>
              <div className="text-[10px] text-stone-500 uppercase font-semibold">Total Days</div>
            </div>
            <div className="h-7 w-px bg-stone-200" />
            <div className="text-center px-2">
              <div className="text-base font-bold text-amber-600">{calendarData.weeklyThemes.length}</div>
              <div className="text-[10px] text-stone-500 uppercase font-semibold">Weekly Phases</div>
            </div>
            <div className="h-7 w-px bg-stone-200" />
            <div className="text-center px-2">
              <div className="text-base font-bold text-emerald-600">100%</div>
              <div className="text-[10px] text-stone-500 uppercase font-semibold">Unique SEO</div>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Thematic Progression Arc */}
      {calendarData && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-stone-700" />
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Weekly Strategic Progression Arc &bull; {calendarData.monthName} {calendarData.year}
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              {calendarData.weeklyThemes.length} Distinct Thematic Phases
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {calendarData.weeklyThemes.map((theme) => (
              <div
                key={theme.week}
                className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 space-y-1.5 hover:border-amber-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-stone-900 text-white text-[10px] font-bold">
                    Week {theme.week}
                  </span>
                  <span className="text-[10px] font-semibold text-stone-400">
                    Days {(theme.week - 1) * 7 + 1} &ndash; {Math.min(calendarData.totalDays, theme.week * 7)}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                  {theme.title}
                </h4>
                <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and View Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Week Filter */}
          <div className="flex items-center space-x-1 bg-stone-100 p-1 rounded-xl text-xs font-medium">
            <span className="text-stone-500 px-2 text-[11px]">Week:</span>
            {(['ALL', 1, 2, 3, 4, 5] as const).map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setSelectedWeekFilter(w)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedWeekFilter === w
                    ? 'bg-stone-900 text-white font-bold shadow-xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                {w === 'ALL' ? 'All' : `W${w}`}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword or title..."
              className="pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-500 w-48 sm:w-60"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Right: View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-stone-500 font-medium">
            Showing {filteredDays.length} of {calendarData?.totalDays || 31} Days
          </span>
          <div className="flex items-center bg-stone-100 p-1 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Grid View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Timeline View
            </button>
          </div>
        </div>
      </div>

      {/* Main Calendar View: Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredDays.map((day) => (
            <div
              key={day.id}
              id={`cal-day-card-${day.dayNumber}`}
              className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col overflow-hidden group"
            >
              {/* Feature Image Thumbnail & Badge Header */}
              <div className="relative aspect-video bg-stone-100 overflow-hidden">
                <img
                  src={day.featureImage.imageUrl}
                  alt={day.featureImage.suggestedAltText || day.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none" />

                {/* Day Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-stone-950/90 backdrop-blur-xs text-amber-300 text-xs font-bold border border-stone-700 shadow-xs">
                    Day {day.dayNumber}
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-stone-800 text-[10px] font-semibold shadow-xs">
                    {day.dayOfWeek.substring(0, 3)}
                  </span>
                </div>

                {/* Read Time */}
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-medium flex items-center space-x-1">
                    <Clock className="w-2.5 h-2.5 text-amber-300" />
                    <span>{day.estimatedReadTime}</span>
                  </span>
                </div>

                {/* Image Prompt Teaser */}
                <div className="absolute bottom-2 left-2.5 right-2.5 text-[10px] text-stone-200 line-clamp-1 flex items-center space-x-1">
                  <ImageIcon className="w-3 h-3 text-amber-300 shrink-0" />
                  <span className="truncate">{day.featureImage.visualTheme}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  {/* Content Type & Focus Keyword */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                      {day.contentType}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200 text-[10px] font-semibold truncate max-w-[130px]" title={day.focusKeyword}>
                      🔑 {day.focusKeyword}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 
                    onClick={() => setActiveDayModal(day)}
                    className="text-xs font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2 cursor-pointer leading-snug"
                    title={day.title}
                  >
                    {day.title}
                  </h4>

                  {/* Meta Description Preview */}
                  <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                    {day.metaDescription}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveDayModal(day)}
                    className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold flex items-center space-x-1 cursor-pointer transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Details</span>
                  </button>

                  <button
                    id={`btn-gen-day-${day.dayNumber}`}
                    type="button"
                    onClick={() => onGenerateFullBlogFromDay(day)}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs hover:shadow-sm transition-all"
                  >
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Generate Blog</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Timeline / List Mode */}
      {viewMode === 'timeline' && (
        <div className="space-y-6">
          {filteredDays.map((day) => (
            <div
              key={day.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-amber-300 transition-all flex flex-col md:flex-row gap-5 items-start"
            >
              {/* Feature Image Thumbnail */}
              <div className="w-full md:w-56 aspect-video shrink-0 rounded-xl overflow-hidden relative bg-stone-100">
                <img
                  src={day.featureImage.imageUrl}
                  alt={day.featureImage.suggestedAltText || day.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-md bg-stone-950/90 text-amber-300 text-[11px] font-bold shadow-xs">
                    Day {day.dayNumber}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 right-2 text-[10px] text-white/90 bg-stone-950/70 backdrop-blur-xs p-1 rounded-sm truncate">
                  {day.featureImage.visualTheme}
                </div>
              </div>

              {/* Middle Content Details */}
              <div className="flex-1 space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-stone-500">
                    {day.dateFormatted} ({day.dayOfWeek})
                  </span>
                  <span className="text-stone-300">&bull;</span>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-xs font-bold">
                    {day.contentType}
                  </span>
                  <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md text-xs font-semibold">
                    🔑 Focus: {day.focusKeyword}
                  </span>
                  <span className="text-xs text-stone-500 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{day.estimatedReadTime}</span>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-stone-900 leading-snug">
                  {day.title}
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {day.metaDescription}
                </p>

                {/* Key Takeaways */}
                <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 space-y-1">
                  <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">
                    Core Actionable Takeaways:
                  </span>
                  <ul className="text-xs text-stone-600 space-y-1">
                    {day.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full md:w-auto flex md:flex-col gap-2 shrink-0 justify-end">
                <button
                  type="button"
                  onClick={() => onGenerateFullBlogFromDay(day)}
                  className="w-full md:w-44 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Generate Full Blog</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDayModal(day)}
                  className="w-full md:w-44 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Day Specs</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Day Spec Inspector Modal */}
      {activeDayModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-stone-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 sm:p-8 relative animate-in fade-in zoom-in-95">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveDayModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-10">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-bold">
                  Day {activeDayModal.dayNumber} ({activeDayModal.dateFormatted})
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold">
                  {activeDayModal.contentType}
                </span>
                <span className="text-xs text-stone-500">
                  Week {activeDayModal.weekNumber}
                </span>
              </div>
              <h2 className="text-xl font-bold font-serif text-stone-900 leading-tight">
                {activeDayModal.title}
              </h2>
            </div>

            {/* Feature Image Banner Display */}
            <div className="space-y-2">
              <div className="rounded-2xl overflow-hidden aspect-video bg-stone-100 relative">
                <img
                  src={activeDayModal.featureImage.imageUrl}
                  alt={activeDayModal.featureImage.suggestedAltText || activeDayModal.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-stone-950/80 backdrop-blur-xs text-white p-3 rounded-xl text-xs space-y-1">
                  <div className="flex items-center space-x-1.5 text-amber-300 font-bold text-[11px]">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Visual Theme: {activeDayModal.featureImage.visualTheme}</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    <strong>Prompt:</strong> {activeDayModal.featureImage.prompt}
                  </p>
                </div>
              </div>
            </div>

            {/* Google SERP Snippet Preview */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center space-x-1">
                <Globe className="w-3 h-3 text-stone-400" />
                <span>Google SERP Preview (Strict SEO Verification)</span>
              </span>
              <div className="text-xs text-emerald-800 font-mono">
                https://{calendarData?.domain || 'techcrunch.com'}/blog/{activeDayModal.focusKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              </div>
              <div className="text-sm font-semibold text-indigo-900 hover:underline">
                {activeDayModal.title}
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {activeDayModal.metaDescription}
              </p>
            </div>

            {/* Strategy Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase">Focus Keyword (Strict Placement)</span>
                <p className="text-xs font-bold text-stone-900">{activeDayModal.focusKeyword}</p>
                <p className="text-[10px] text-stone-500">Embedded in Title, Meta snippet, and 1st sentence.</p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase">Target Audience & Tone</span>
                <p className="text-xs font-bold text-stone-900">{activeDayModal.targetAudience}</p>
                <p className="text-[10px] text-stone-500">Tone: {activeDayModal.sentiment.tone}</p>
              </div>
            </div>

            {/* Actionable Takeaways */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                Key Takeaways for this Article:
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {activeDayModal.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Backlink Citations */}
            {activeDayModal.backlinks && activeDayModal.backlinks.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  Target Backlink Citations:
                </h4>
                <div className="space-y-1.5">
                  {activeDayModal.backlinks.map((bl, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-stone-900">{bl.sourceName}</span>
                        <span className="text-stone-400 mx-1.5">&bull;</span>
                        <span className="text-stone-500 font-mono text-[11px]">{bl.anchorText}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-stone-200 text-stone-800 text-[10px] font-bold font-mono">
                        {bl.domainAuthorityEst || 'DA 90+'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveDayModal(null)}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  const dayToGen = activeDayModal;
                  setActiveDayModal(null);
                  onGenerateFullBlogFromDay(dayToGen);
                }}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer shadow-md hover:shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate Full 1,500+ Word SEO Blog</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
