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
    <div className="max-w-6xl mx-auto p-4">
      <div className="py-8 text-center">
        <h1 className="text-3xl font-bold">Find your next experience</h1>
        <div className="mt-4">
          <input
            className="w-full md:w-1/2 border rounded-md px-3 py-2"
            placeholder="Search experiences, locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((e) => (
            <Link key={e.id} to={`/experiences/${e.id}`} className="group">
              <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <img src={e.imageUrl} alt={e.title} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <div className="text-sm text-slate-500">{e.location}</div>
                  <div className="font-semibold mt-1">{e.title}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sky-600 font-bold">₹{e.price}</span>
                    <span className="text-sm">⭐ {e.rating} ({e.reviewCount})</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


