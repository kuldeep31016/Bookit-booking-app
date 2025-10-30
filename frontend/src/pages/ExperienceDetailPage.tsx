import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { api } from '../services/api';

type Slot = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
  price: number;
};

export default function ExperienceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [slots, setSlots] = useState<Slot[]>([]);
  const [participants, setParticipants] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/experiences/${id}`);
      setExperience(res.data);
    };
    load();
  }, [id]);

  useEffect(() => {
    if (!id || !selectedDate) return;
    const load = async () => {
      const res = await api.get(`/experiences/${id}/slots`, { params: { date: selectedDate } });
      setSlots(res.data);
    };
    load();
  }, [id, selectedDate]);

  if (!experience) {
    return <div className="max-w-5xl mx-auto p-4">Loading...</div>;
  }

  const total = participants * experience.price;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-2xl">←</span>
            <div className="flex items-center gap-3">
              <svg width="35" height="40" viewBox="0 0 45 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 0C13.94 0 7 6.94 7 15.5C7 26.875 22.5 50 22.5 50C22.5 50 38 26.875 38 15.5C38 6.94 31.06 0 22.5 0Z" fill="#4A5568"/>
                <text x="22.5" y="20" fontSize="14" fontWeight="bold" fill="#ECC94B" textAnchor="middle">hd</text>
              </svg>
              <div>
                <span className="block text-lg font-bold text-slate-800">highway</span>
                <span className="block text-lg font-bold text-slate-600">delite</span>
              </div>
            </div>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={experience.imageUrl} 
            alt={experience.title} 
            className="w-full h-96 object-cover" 
            onError={(img) => {
              (img.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop';
            }}
          />
        </div>

        {/* Title and Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                  {experience.category}
                </span>
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm font-semibold">{experience.rating}</span>
                  <span className="text-xs text-slate-500">({experience.reviewCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">{experience.title}</h1>
              <p className="text-slate-600 flex items-center gap-2 text-lg">
                <span>📍</span>
                <span>{experience.location}</span>
              </p>
            </div>
            <div className="text-left md:text-right">
              <div className="text-sm text-slate-500">From</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                ₹{experience.price}
              </div>
              <div className="text-sm text-slate-500 mt-1">per person</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span>📖</span> Description
              </h2>
              <p className="text-slate-700 leading-relaxed">{experience.description}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span>✨</span> Highlights
              </h2>
              <ul className="space-y-3">
                {experience.highlights?.map((h: string) => (
                  <li key={h} className="flex items-start gap-3 text-slate-700">
                    <span className="text-orange-500 text-xl">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span>📦</span> What's Included
              </h2>
              <ul className="space-y-3">
                {experience.included?.map((i: string) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border-2 border-orange-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Book Your Experience</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Select Date</label>
                  <input
                    type="date"
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {selectedDate && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Available Time Slots</label>
                    <div className="space-y-2 max-h-64 overflow-auto">
                      {slots.length === 0 ? (
                        <div className="text-center py-4 text-slate-500">No slots available for this date</div>
                      ) : (
                        slots.map((s) => {
                          const available = s.capacity - s.booked;
                          const disabled = available <= 0;
                          return (
                            <button
                              key={s.id}
                              disabled={disabled}
                              onClick={() => setSelectedSlot(s.id)}
                              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition ${
                                selectedSlot === s.id
                                  ? 'border-orange-500 bg-orange-50'
                                  : disabled
                                  ? 'border-slate-200 bg-slate-50 cursor-not-allowed opacity-50'
                                  : 'border-slate-200 hover:border-orange-300 hover:bg-orange-50'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-slate-800">{s.startTime} - {s.endTime}</span>
                                <span className={`text-sm ${disabled ? 'text-red-500' : 'text-green-600'}`}>
                                  {disabled ? 'Sold Out' : `${available} left`}
                                </span>
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Participants</label>
                  <div className="flex items-center justify-between bg-slate-50 rounded-xl p-2 border-2 border-slate-200">
                    <button
                      className="w-10 h-10 bg-white rounded-lg border-2 border-slate-300 hover:border-orange-400 hover:bg-orange-50 transition font-bold text-lg"
                      onClick={() => setParticipants((p) => Math.max(1, p - 1))}
                    >
                      −
                    </button>
                    <span className="text-xl font-bold text-slate-800">{participants}</span>
                    <button 
                      className="w-10 h-10 bg-white rounded-lg border-2 border-slate-300 hover:border-orange-400 hover:bg-orange-50 transition font-bold text-lg"
                      onClick={() => setParticipants((p) => p + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-600">Total Amount</span>
                    <span className="text-2xl font-bold text-slate-800">₹{total}</span>
                  </div>

                  <button
                    disabled={!selectedSlot || !selectedDate}
                    onClick={() =>
                      navigate('/checkout', {
                        state: {
                          booking: {
                            experienceId: experience.id,
                            slotId: selectedSlot,
                            participants,
                            date: selectedDate,
                          },
                          experience,
                        },
                      })
                    }
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-orange-500 hover:to-orange-600 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!selectedDate ? 'Select a Date' : !selectedSlot ? 'Select a Time Slot' : 'Book Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


