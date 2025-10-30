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

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/experiences', { params: { search } });
        setExperiences(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">📍</span>
            </div>
            <span className="text-xl font-bold text-slate-800">BookIt</span>
          </div>
          <div className="flex items-center gap-4">
            <input
              className="w-64 md:w-96 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              placeholder="Search experiences..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-500 hover:to-orange-600 transition">
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


