import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

type Experience = {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  category: string;
};

export default function HomePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/experiences', { params: { search } });
        setExperiences(res.data);
        
        // Extract unique locations for suggestions
        if (search.length > 0) {
          const locations = res.data
            .map((exp: Experience) => exp.location)
            .filter((loc: string) => loc.toLowerCase().includes(search.toLowerCase())) as string[];
          const uniqueLocations = [...new Set(locations)];
          setSuggestions(uniqueLocations);
        } else {
          setSuggestions([]);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [search]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="45" height="50" viewBox="0 0 45 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.5 0C13.94 0 7 6.94 7 15.5C7 26.875 22.5 50 22.5 50C22.5 50 38 26.875 38 15.5C38 6.94 31.06 0 22.5 0Z" fill="#4A5568"/>
              <text x="22.5" y="20" fontSize="14" fontWeight="bold" fill="#ECC94B" textAnchor="middle">hd</text>
            </svg>
            <div>
              <span className="block text-xl font-bold text-slate-800">highway</span>
              <span className="block text-xl font-bold text-slate-600">delite</span>
            </div>
          </div>
          <div className="flex items-center gap-4 relative">
            <div className="relative">
              <input
                className="w-64 md:w-96 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder="Search experiences or locations..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              
              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors border-b border-slate-100 last:border-b-0 flex items-center gap-2"
                    >
                      <span className="text-orange-500">📍</span>
                      <span className="text-slate-700 font-medium">{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-800 px-6 py-2 rounded-lg font-medium hover:from-yellow-500 hover:to-yellow-600 transition">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((e) => (
              <div key={e.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Image with overlay badge */}
                <div className="relative">
                  <img 
                    src={e.imageUrl} 
                    alt={e.title} 
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    onError={(img) => {
                      (img.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <span className="text-yellow-500 text-sm">⭐</span>
                    <span className="text-sm font-semibold text-slate-700">{e.rating}</span>
                  </div>
                  <div className="absolute top-3 left-3 bg-slate-800/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs text-white font-medium">{e.category}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-orange-600 transition line-clamp-1">
                      {e.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                      <span>📍</span>
                      <span className="line-clamp-1">{e.location}</span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    Curated small-group experience. Certified guide. Safety first with gear included.
                  </p>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div>
                      <span className="text-xs text-slate-500">From</span>
                      <div className="text-xl font-bold text-slate-800">₹{e.price}</div>
                    </div>
                    <Link to={`/experiences/${e.id}`}>
                      <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-800 px-4 py-2 rounded-lg font-semibold text-sm hover:from-yellow-500 hover:to-orange-500 transition shadow-md hover:shadow-lg">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}


