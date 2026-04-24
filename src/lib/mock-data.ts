export type MatchTier = "great" | "good" | "low";

export const matchTier = (score: number): MatchTier =>
  score >= 80 ? "great" : score >= 60 ? "good" : "low";

export const matchColor = (score: number): string =>
  score >= 80 ? "text-emerald-600" : score >= 60 ? "text-amber-600" : "text-red-500";

export const matchBg = (score: number): string =>
  score >= 80
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : score >= 60
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-red-50 text-red-600 border-red-200";

export const matchStroke = (score: number): string =>
  score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

export interface MockUser {
  id: string;
  name: string;
  age: number;
  gender: string;
  occupation: string;
  city: string;
  avatar: string;
  bio: string;
  interests: string[];
  lifestyle: {
    sleep: string;
    smoking: string;
    drinking: string;
    guests: string;
    cleanliness: number;
    work: string;
  };
  budget: [number, number];
  matchScore: number;
  memberSince: string;
  rating: number;
  reviewsCount: number;
  online?: boolean;
}

const photo = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?w=800&q=80&auto=format&fit=crop`;

const avatar = (seed: string) => `https://i.pravatar.cc/200?u=${seed}`;

export const mockUsers: MockUser[] = [
  {
    id: "u1",
    name: "saikumar",
    age: 23,
    gender: "Male",
    occupation: "web developer",
    city: "hyderabad",
    avatar: avatar("ananya"),
    bio: "Designer who loves quiet mornings, loud kitchens, and weekend hikes. Looking for chill humans who care about the space we share.",
    interests: ["Cooking", "Yoga", "Reading", "Coffee", "Travel", "Art"],
    lifestyle: { sleep: "Early Bird", smoking: "Non-smoker", drinking: "Occasionally", guests: "Sometimes", cleanliness: 5, work: "Hybrid" },
    budget: [12000, 18000],
    matchScore: 92,
    memberSince: "Jan 2025",
    rating: 4.9,
    reviewsCount: 14,
    online: true,
  },
  {
    id: "u2",
    name: "Rohan Mehta",
    age: 28,
    gender: "Male",
    occupation: "Software Engineer",
    city: "Hyderabad",
    avatar: avatar("rohan"),
    bio: "Engineer by day, gamer by night. I'll respect your space if you respect mine. PS: I make great filter coffee.",
    interests: ["Gaming", "Tech", "Coffee", "Movies", "Music", "Fitness"],
    lifestyle: { sleep: "Night Owl", smoking: "Non-smoker", drinking: "Occasionally", guests: "Rarely", cleanliness: 4, work: "WFH" },
    budget: [10000, 15000],
    matchScore: 87,
    memberSince: "Mar 2025",
    rating: 4.7,
    reviewsCount: 9,
    online: true,
  },
  {
    id: "u3",
    name: "Priya Iyer",
    age: 25,
    gender: "Female",
    occupation: "Marketing Lead",
    city: "Mumbai",
    avatar: avatar("priya"),
    bio: "Travel addict, plant parent, and aspiring baker. Looking for a roommate who values weekends with no plans.",
    interests: ["Travel", "Photography", "Cooking", "Hiking", "Music"],
    lifestyle: { sleep: "Flexible", smoking: "Non-smoker", drinking: "Occasionally", guests: "Sometimes", cleanliness: 4, work: "Hybrid" },
    budget: [15000, 22000],
    matchScore: 74,
    memberSince: "Aug 2024",
    rating: 4.6,
    reviewsCount: 7,
  },
  {
    id: "u4",
    name: "Arjun Kapoor",
    age: 30,
    gender: "Male",
    occupation: "Chef",
    city: "Bengaluru",
    avatar: avatar("arjun"),
    bio: "I cook a lot. Like, a lot. Bring a healthy appetite and a willingness to do dishes.",
    interests: ["Cooking", "Sports", "Fitness", "Travel", "Coffee"],
    lifestyle: { sleep: "Early Bird", smoking: "Non-smoker", drinking: "Yes", guests: "Often", cleanliness: 4, work: "On-site" },
    budget: [14000, 20000],
    matchScore: 61,
    memberSince: "Nov 2024",
    rating: 4.4,
    reviewsCount: 11,
  },
  {
    id: "u5",
    name: "Sneha Reddy",
    age: 24,
    gender: "Female",
    occupation: "Doctor",
    city: "Hyderabad",
    avatar: avatar("sneha"),
    bio: "Resident doctor with weird hours. Need someone calm, clean, and quiet.",
    interests: ["Reading", "Yoga", "Music", "Movies"],
    lifestyle: { sleep: "Night Owl", smoking: "Non-smoker", drinking: "Non-drinker", guests: "Rarely", cleanliness: 5, work: "On-site" },
    budget: [16000, 25000],
    matchScore: 81,
    memberSince: "Feb 2025",
    rating: 4.8,
    reviewsCount: 5,
  },
  {
    id: "u6",
    name: "Karthik Nair",
    age: 27,
    gender: "Male",
    occupation: "Photographer",
    city: "Bengaluru",
    avatar: avatar("karthik"),
    bio: "Always chasing light. Frequent traveler — your home will mostly be yours.",
    interests: ["Photography", "Travel", "Hiking", "Movies", "Art"],
    lifestyle: { sleep: "Flexible", smoking: "Occasionally", drinking: "Occasionally", guests: "Sometimes", cleanliness: 3, work: "Freelance" },
    budget: [9000, 14000],
    matchScore: 45,
    memberSince: "Jul 2024",
    rating: 4.2,
    reviewsCount: 6,
  },
];

export interface MockListing {
  id: string;
  title: string;
  city: string;
  locality: string;
  flatType: string;
  furnished: string;
  rent: number;
  deposit: number;
  available: string;
  photos: string[];
  amenities: string[];
  tags: string[];
  rating: number;
  reviews: number;
  matchScore: number;
  ownerId: string;
  description: string;
  preferredGender: string;
  preferredOccupation: string;
  ageRange: [number, number];
}

export const mockListings: MockListing[] = [
  {
    id: "l1",
    title: "Cozy 2BHK in Koramangala",
    city: "Bengaluru",
    locality: "Koramangala 5th Block",
    flatType: "2BHK",
    furnished: "Fully Furnished",
    rent: 12000,
    deposit: 24000,
    available: "May 1, 2026",
    photos: [
      photo("1522708323590-d24dbb6b0267"),
      photo("1560448204-e02f11c3d0e2"),
      photo("1502672260266-1c1ef2d93688"),
      photo("1493809842364-78817add7ffb"),
    ],
    amenities: ["WiFi", "AC", "Geyser", "Washing Machine", "Parking"],
    tags: ["Non-smoker", "WFH friendly", "Gaming"],
    rating: 4.8,
    reviews: 12,
    matchScore: 92,
    ownerId: "u1",
    description: "Bright, airy 2BHK with a sun-soaked balcony, fast WiFi, and a fully stocked kitchen. Quiet street, walking distance to cafes and parks.",
    preferredGender: "Any",
    preferredOccupation: "Working Professional",
    ageRange: [22, 32],
  },
  {
    id: "l2",
    title: "Modern Studio near HITEC City",
    city: "Hyderabad",
    locality: "Madhapur",
    flatType: "Studio",
    furnished: "Semi Furnished",
    rent: 9500,
    deposit: 19000,
    available: "Apr 28, 2026",
    photos: [photo("1505691938895-1758d7feb511"), photo("1567016432779-094069958ea5"), photo("1493809842364-78817add7ffb")],
    amenities: ["WiFi", "AC", "Power Backup"],
    tags: ["Tech crowd", "Quiet", "Pet friendly"],
    rating: 4.5,
    reviews: 8,
    matchScore: 87,
    ownerId: "u2",
    description: "Compact studio steps away from HITEC City. Perfect for a single working professional.",
    preferredGender: "Any",
    preferredOccupation: "Tech Professional",
    ageRange: [24, 30],
  },
  {
    id: "l3",
    title: "Spacious 3BHK in Bandra West",
    city: "Mumbai",
    locality: "Bandra West",
    flatType: "3BHK",
    furnished: "Fully Furnished",
    rent: 22000,
    deposit: 44000,
    available: "May 15, 2026",
    photos: [photo("1484154218962-a197022b5858"), photo("1493809842364-78817add7ffb"), photo("1560448204-e02f11c3d0e2")],
    amenities: ["WiFi", "AC", "Gym", "Pool", "Parking", "Housekeeping"],
    tags: ["Sea view", "Premium", "Yoga friendly"],
    rating: 4.9,
    reviews: 18,
    matchScore: 74,
    ownerId: "u3",
    description: "Premium sea-view apartment with shared gym and pool. Looking for two co-renters.",
    preferredGender: "Female",
    preferredOccupation: "Any",
    ageRange: [24, 35],
  },
  {
    id: "l4",
    title: "Garden 2BHK in Indiranagar",
    city: "Bengaluru",
    locality: "Indiranagar",
    flatType: "2BHK",
    furnished: "Fully Furnished",
    rent: 15000,
    deposit: 30000,
    available: "Jun 1, 2026",
    photos: [photo("1556909114-f6e7ad7d3136"), photo("1505691938895-1758d7feb511")],
    amenities: ["WiFi", "AC", "Garden", "Parking"],
    tags: ["Foodie", "Social", "Cooking"],
    rating: 4.6,
    reviews: 11,
    matchScore: 61,
    ownerId: "u4",
    description: "A foodie's dream — huge kitchen, garden patio, and weekly farmers market down the lane.",
    preferredGender: "Male",
    preferredOccupation: "Any",
    ageRange: [25, 35],
  },
  {
    id: "l5",
    title: "Quiet 1BHK in Jubilee Hills",
    city: "Hyderabad",
    locality: "Jubilee Hills",
    flatType: "1BHK",
    furnished: "Semi Furnished",
    rent: 16000,
    deposit: 32000,
    available: "May 10, 2026",
    photos: [photo("1493809842364-78817add7ffb"), photo("1502672260266-1c1ef2d93688")],
    amenities: ["WiFi", "AC", "Geyser", "Lift"],
    tags: ["Quiet", "Non-smoker", "Reading"],
    rating: 4.7,
    reviews: 5,
    matchScore: 81,
    ownerId: "u5",
    description: "Calm corner unit perfect for a doctor or someone with focus-heavy work.",
    preferredGender: "Female",
    preferredOccupation: "Doctor / Professional",
    ageRange: [23, 30],
  },
  {
    id: "l6",
    title: "Artist Loft in HSR Layout",
    city: "Bengaluru",
    locality: "HSR Layout",
    flatType: "1BHK",
    furnished: "Furnished",
    rent: 11000,
    deposit: 22000,
    available: "May 5, 2026",
    photos: [photo("1560448204-e02f11c3d0e2"), photo("1556909114-f6e7ad7d3136")],
    amenities: ["WiFi", "Geyser", "Studio space"],
    tags: ["Creative", "Artsy", "Flexible"],
    rating: 4.3,
    reviews: 6,
    matchScore: 45,
    ownerId: "u6",
    description: "Open-floor loft with great natural light. Best for creatives.",
    preferredGender: "Any",
    preferredOccupation: "Creative",
    ageRange: [22, 35],
  },
];

export const interestPool = [
  "Gaming","Cooking","Fitness","Reading","Music","Travel","Movies","Yoga",
  "Photography","Art","Tech","Sports","Hiking","Coffee","Night Owl","Early Bird",
  "Pets","Meditation","Dancing","Writing","Cycling","Baking",
];

export interface MockMessage {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
}

export interface MockConversation {
  id: string;
  userId: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: MockMessage[];
}

export const mockConversations: MockConversation[] = [
  {
    id: "c1", userId: "u1", lastMessage: "Sounds great! Let's chat tomorrow?", time: "2m", unread: 2,
    messages: [
      { id: "m1", fromMe: false, text: "Hey! Saw your profile, we have so much in common 🙂", time: "10:14 AM" },
      { id: "m2", fromMe: true, text: "Hi Ananya! Yeah loved your bio. Are you still looking?", time: "10:18 AM" },
      { id: "m3", fromMe: false, text: "Yes! Move-in around May 1st. Want to do a video call?", time: "10:22 AM" },
      { id: "m4", fromMe: true, text: "Definitely. How about tomorrow 7pm?", time: "10:24 AM" },
      { id: "m5", fromMe: false, text: "Sounds great! Let's chat tomorrow?", time: "10:26 AM" },
    ],
  },
  {
    id: "c2", userId: "u2", lastMessage: "Cool, sending you the listing link", time: "1h", unread: 0,
    messages: [
      { id: "m1", fromMe: true, text: "Hey Rohan, that studio still available?", time: "Yesterday" },
      { id: "m2", fromMe: false, text: "Yep! Want to drop by this weekend?", time: "Yesterday" },
      { id: "m3", fromMe: false, text: "Cool, sending you the listing link", time: "1h" },
    ],
  },
  {
    id: "c3", userId: "u3", lastMessage: "Thanks for the response!", time: "3d", unread: 0,
    messages: [
      { id: "m1", fromMe: false, text: "Hey, room is taken sadly", time: "3d" },
      { id: "m2", fromMe: true, text: "Thanks for the response!", time: "3d" },
    ],
  },
];

export interface MockInterest {
  id: string;
  userId: string;
  listingId?: string;
  type: "received" | "sent";
  status: "pending" | "matched" | "declined";
  time: string;
}

export const mockInterests: MockInterest[] = [
  { id: "i1", userId: "u1", listingId: "l1", type: "received", status: "pending", time: "2h" },
  { id: "i2", userId: "u3", listingId: "l3", type: "received", status: "pending", time: "1d" },
  { id: "i3", userId: "u5", listingId: "l5", type: "received", status: "matched", time: "3d" },
  { id: "i4", userId: "u2", listingId: "l2", type: "sent", status: "pending", time: "5h" },
  { id: "i5", userId: "u4", listingId: "l4", type: "sent", status: "matched", time: "2d" },
];

export interface MockReview {
  id: string;
  reviewerId: string;
  rating: number;
  date: string;
  categories: { cleanliness: number; communication: number; reliability: number; respect: number };
  text: string;
  liveAgain: boolean;
}

export const mockReviews: MockReview[] = [
  { id: "r1", reviewerId: "u2", rating: 5, date: "Mar 2026", categories: { cleanliness: 5, communication: 5, reliability: 5, respect: 5 }, text: "One of the best roommates I've had. Clean, respectful, and a great cook!", liveAgain: true },
  { id: "r2", reviewerId: "u3", rating: 4, date: "Jan 2026", categories: { cleanliness: 5, communication: 4, reliability: 4, respect: 5 }, text: "Lovely person. Very chill and easy to live with.", liveAgain: true },
  { id: "r3", reviewerId: "u4", rating: 5, date: "Nov 2025", categories: { cleanliness: 5, communication: 5, reliability: 5, respect: 5 }, text: "10/10 would recommend. Made the apartment feel like home.", liveAgain: true },
];

export interface MockNotification {
  id: string;
  type: "match" | "message" | "review" | "interest";
  userId: string;
  text: string;
  time: string;
  unread: boolean;
}

export const mockNotifications: MockNotification[] = [
  { id: "n1", type: "match", userId: "u1", text: "You matched with Ananya Sharma! 🎉", time: "2m", unread: true },
  { id: "n2", type: "message", userId: "u2", text: "Rohan sent you a message", time: "1h", unread: true },
  { id: "n3", type: "interest", userId: "u3", text: "Priya expressed interest in your listing", time: "3h", unread: true },
  { id: "n4", type: "review", userId: "u4", text: "Arjun left you a review", time: "1d", unread: false },
  { id: "n5", type: "match", userId: "u5", text: "You matched with Sneha Reddy", time: "3d", unread: false },
];

export const findUser = (id: string) => mockUsers.find((u) => u.id === id);
export const findListing = (id: string) => mockListings.find((l) => l.id === id);

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;