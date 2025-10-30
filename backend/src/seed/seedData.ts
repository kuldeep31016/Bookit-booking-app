import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const promos = [
  { code: 'SAVE10', type: 'percentage', value: 10, validUntil: '2026-12-31' },
  { code: 'FLAT100', type: 'fixed', value: 100, validUntil: '2026-12-31' },
  { code: 'WELCOME20', type: 'percentage', value: 20, validUntil: '2026-12-31' },
];

const experiencesSeed = [
  {
    title: 'Sunrise Himalayan Trek',
    description: 'Experience breathtaking sunrise views...',
    location: 'Manali, Himachal Pradesh',
    category: 'Adventure',
    price: 2500,
    duration: '6 hours',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    rating: 4.8,
    reviewCount: 127,
    highlights: ['Professional guide', 'Scenic views', 'Small groups'],
    included: ['Equipment', 'Breakfast', 'Photography'],
  },
  {
    title: 'Backwaters Houseboat Cruise',
    description: 'Relax on a serene cruise through Kerala backwaters.',
    location: 'Alleppey, Kerala',
    category: 'Nature',
    price: 3500,
    duration: '4 hours',
    imageUrl: 'https://images.unsplash.com/photo-1560347876-aeef00ee58a1',
    rating: 4.9,
    reviewCount: 289,
    highlights: ['Houseboat ride', 'Coconut groves', 'Snacks & tea'],
    included: ['Snacks', 'Tea/Coffee'],
  },
  {
    title: 'Mumbai Street Photography Walk',
    description: 'Capture the spirit of Mumbai with a pro photographer.',
    location: 'Mumbai, Maharashtra',
    category: 'City Tours',
    price: 1500,
    duration: '3 hours',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada',
    rating: 4.5,
    reviewCount: 98,
    highlights: ['Gateway of India', 'Marine Drive', 'Photo tips'],
    included: ['Photography guidance'],
  },
  {
    title: 'Goa Sunset Kayaking',
    description: 'Paddle through calm waters and enjoy a golden sunset.',
    location: 'Goa',
    category: 'Adventure',
    price: 2200,
    duration: '2 hours',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
    rating: 4.7,
    reviewCount: 156,
    highlights: ['Kayak gear', 'Safety briefing', 'Guided route'],
    included: ['Equipment', 'Guide'],
  },
  {
    title: 'Varanasi Ghat Aarti Experience',
    description: 'Witness the mesmerizing Ganga Aarti from the river.',
    location: 'Varanasi, Uttar Pradesh',
    category: 'Culture',
    price: 1000,
    duration: '2 hours',
    imageUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2',
    rating: 4.8,
    reviewCount: 412,
    highlights: ['Boat seat', 'Local guide', 'Cultural briefing'],
    included: ['Boat ride', 'Guide'],
  },
  {
    title: 'Rishikesh Yoga & Wellness Retreat',
    description: 'Rejuvenate with yoga by the Ganges and mindfulness.',
    location: 'Rishikesh, Uttarakhand',
    category: 'Wellness',
    price: 3000,
    duration: '1 day',
    imageUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b',
    rating: 4.6,
    reviewCount: 134,
    highlights: ['Hatha yoga', 'Meditation', 'Healthy meals'],
    included: ['Yoga mats', 'Meals'],
  },
  {
    title: 'Udaipur Lake Pichola Boat Tour',
    description: 'Glide past palaces and ghats on a scenic boat tour.',
    location: 'Udaipur, Rajasthan',
    category: 'City Tours',
    price: 1600,
    duration: '1.5 hours',
    imageUrl: 'https://images.unsplash.com/photo-1578926375605-eaf7559b145e',
    rating: 4.5,
    reviewCount: 175,
    highlights: ['City Palace views', 'Jag Mandir', 'Golden hour'],
    included: ['Life jackets'],
  },
  {
    title: 'Coorg Coffee Plantation Walk',
    description: 'Learn coffee cultivation amidst lush plantations.',
    location: 'Coorg, Karnataka',
    category: 'Nature',
    price: 900,
    duration: '2 hours',
    imageUrl: 'https://images.unsplash.com/photo-1509043759401-136742328bb3',
    rating: 4.4,
    reviewCount: 86,
    highlights: ['Plantation tour', 'Coffee tasting', 'Local stories'],
    included: ['Tasting'],
  },
  {
    title: 'Pondicherry French Quarter Cycle Tour',
    description: 'Discover charming boulevards and colonial heritage.',
    location: 'Puducherry',
    category: 'City Tours',
    price: 1100,
    duration: '2.5 hours',
    imageUrl: 'https://images.unsplash.com/photo-1504376379681-943c43b677d5',
    rating: 4.6,
    reviewCount: 142,
    highlights: ['Cycle rental', 'Local guide', 'Photo stops'],
    included: ['Bicycles', 'Helmets'],
  },
  {
    title: 'Meghalaya Living Root Bridges Hike',
    description: 'Trek to the stunning living root bridges.',
    location: 'Cherrapunji, Meghalaya',
    category: 'Adventure',
    price: 2800,
    duration: '7 hours',
    imageUrl: 'https://images.unsplash.com/photo-1521292270410-a8c06f7a3e58',
    rating: 4.9,
    reviewCount: 221,
    highlights: ['Guided hike', 'Rainforest', 'Waterfalls'],
    included: ['Guide', 'Snacks'],
  },
  {
    title: 'Hyderabad Biryani Masterclass',
    description: 'Cook authentic Hyderabadi biryani with a local chef.',
    location: 'Hyderabad, Telangana',
    category: 'Food & Drink',
    price: 2000,
    duration: '3 hours',
    imageUrl: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9',
    rating: 4.7,
    reviewCount: 168,
    highlights: ['Hands-on cooking', 'Recipe booklet', 'Tastings'],
    included: ['Ingredients', 'Apron'],
  },
  {
    title: 'Andaman Snorkeling Experience',
    description: 'Explore vibrant coral reefs with certified guides.',
    location: 'Havelock Island, Andaman',
    category: 'Adventure',
    price: 4500,
    duration: '3 hours',
    imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
    rating: 4.8,
    reviewCount: 199,
    highlights: ['All gear', 'Briefing', 'Photos'],
    included: ['Equipment', 'Guide'],
  },
  {
    title: 'Sikkim Monastery & Tea Gardens Tour',
    description: 'Visit monasteries and rolling tea estates.',
    location: 'Gangtok, Sikkim',
    category: 'Culture',
    price: 2600,
    duration: '6 hours',
    imageUrl: 'https://images.unsplash.com/photo-1473042904451-00171c69419d',
    rating: 4.6,
    reviewCount: 117,
    highlights: ['Rumtek Monastery', 'Tea tasting', 'Scenic drives'],
    included: ['Transport', 'Guide'],
  },
  {
    title: 'Old Delhi Food Walk',
    description: 'Taste iconic street foods and hidden gems.',
    location: 'Delhi',
    category: 'Food & Drink',
    price: 1200,
    duration: '3 hours',
    imageUrl: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305',
    rating: 4.7,
    reviewCount: 342,
    highlights: ['Local guide', 'Hygienic stops', 'Vegetarian options'],
    included: ['Food tastings', 'Water'],
  },
  {
    title: 'Jaipur Heritage Tour',
    description: 'Explore palaces and forts with a historian.',
    location: 'Jaipur',
    category: 'Culture',
    price: 1800,
    duration: '5 hours',
    imageUrl: 'https://images.unsplash.com/photo-1524492449095-edd359049367',
    rating: 4.6,
    reviewCount: 210,
    highlights: ['Amber Fort', 'City Palace', 'Local markets'],
    included: ['Transport', 'Guide'],
  },
  // Add 9+ more entries later for full dataset
];

function generateSlotsForNext30Days(basePrice: number) {
  const slots: any[] = [];
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const day = new Date(now);
    day.setDate(now.getDate() + i);
    const date = new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate()));
    const templates = [
      { startTime: '07:00', endTime: '10:00', capacity: 12, price: basePrice },
      { startTime: '11:00', endTime: '14:00', capacity: 12, price: basePrice },
      { startTime: '15:00', endTime: '18:00', capacity: 12, price: basePrice },
    ];
    for (const t of templates) {
      slots.push({ date, ...t, booked: 0 });
    }
  }
  return slots;
}

async function main() {
  for (const p of promos) {
    await prisma.promoCode.upsert({
      where: { code: p.code },
      create: {
        code: p.code,
        type: p.type,
        value: p.value,
        validFrom: new Date('2020-01-01'),
        validUntil: new Date(p.validUntil),
        active: true,
      },
      update: {},
    });
  }

  for (const e of experiencesSeed) {
    const experience = await prisma.experience.create({ data: e });
    const slots = generateSlotsForNext30Days(e.price);
    for (const s of slots) {
      await prisma.slot.create({
        data: { ...s, experienceId: experience.id },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    // eslint-disable-next-line no-console
    console.log('Seed complete');
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


