import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="rounded-lg overflow-hidden">
        <img src={experience.imageUrl} alt={experience.title} className="w-full h-80 object-cover" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{experience.title}</h1>
          <div className="text-slate-500">{experience.location}</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-semibold text-sky-600">₹{experience.price}</div>
          <div className="text-sm">⭐ {experience.rating} ({experience.reviewCount})</div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-slate-700">{experience.description}</p>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Highlights</h2>
            <ul className="list-disc ml-6 text-slate-700">
              {experience.highlights?.map((h: string) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-2">What's Included</h2>
            <ul className="list-disc ml-6 text-slate-700">
              {experience.included?.map((i: string) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              className="w-full border rounded-md px-3 py-2"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Available Slots</label>
            <div className="space-y-2 max-h-64 overflow-auto">
              {slots.map((s) => {
                const available = s.capacity - s.booked;
                const disabled = available <= 0;
                return (
                  <button
                    key={s.id}
                    disabled={disabled}
                    onClick={() => setSelectedSlot(s.id)}
                    className={`w-full text-left px-3 py-2 rounded border ${
                      selectedSlot === s.id ? 'border-sky-500' : 'border-slate-200'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50'}`}
                  >
                    {s.startTime} - {s.endTime} • {available} left
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Participants</label>
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 border rounded"
                onClick={() => setParticipants((p) => Math.max(1, p - 1))}
              >
                -
              </button>
              <span>{participants}</span>
              <button className="px-2 py-1 border rounded" onClick={() => setParticipants((p) => p + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-slate-600">Total</div>
            <div className="text-lg font-semibold">₹{total}</div>
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
            className="w-full bg-sky-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}


