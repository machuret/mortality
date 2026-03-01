export interface Country {
  id: number;
  slug: string;
  name: string;
  flag: string;
  region: string;
  infant: number;
  maternal: number;
}

export const DATA: Country[] = [
  { id: 4,   slug: "afghanistan",       name: "Afghanistan",          flag: "🇦🇫", region: "South Asia",      infant: 101.3, maternal: 620  },
  { id: 466, slug: "mali",              name: "Mali",                 flag: "🇲🇱", region: "West Africa",     infant: 97.1,  maternal: 440  },
  { id: 706, slug: "somalia",           name: "Somalia",              flag: "🇸🇴", region: "East Africa",     infant: 93.0,  maternal: 621  },
  { id: 140, slug: "central-african-rep", name: "Central African Rep.", flag: "🇨🇫", region: "Central Africa",  infant: 92.2,  maternal: 835  },
  { id: 148, slug: "chad",              name: "Chad",                 flag: "🇹🇩", region: "Central Africa",  infant: 89.3,  maternal: 1063 },
  { id: 694, slug: "sierra-leone",      name: "Sierra Leone",         flag: "🇸🇱", region: "West Africa",     infant: 87.2,  maternal: 443  },
  { id: 562, slug: "niger",             name: "Niger",                flag: "🇳🇪", region: "West Africa",     infant: 82.0,  maternal: 441  },
  { id: 324, slug: "guinea",            name: "Guinea",               flag: "🇬🇳", region: "West Africa",     infant: 79.5,  maternal: 553  },
  { id: 728, slug: "south-sudan",       name: "South Sudan",          flag: "🇸🇸", region: "East Africa",     infant: 78.1,  maternal: 1223 },
  { id: 566, slug: "nigeria",           name: "Nigeria",              flag: "🇳🇬", region: "West Africa",     infant: 74.2,  maternal: 1047 },
  { id: 624, slug: "guinea-bissau",     name: "Guinea-Bissau",        flag: "🇬🇼", region: "West Africa",     infant: 71.7,  maternal: 725  },
  { id: 426, slug: "lesotho",           name: "Lesotho",              flag: "🇱🇸", region: "Southern Africa", infant: 70.1,  maternal: 566  },
  { id: 508, slug: "mozambique",        name: "Mozambique",           flag: "🇲🇿", region: "Southern Africa", infant: 67.8,  maternal: 330  },
  { id: 854, slug: "burkina-faso",      name: "Burkina Faso",         flag: "🇧🇫", region: "West Africa",     infant: 66.9,  maternal: 370  },
  { id: 24,  slug: "angola",            name: "Angola",               flag: "🇦🇴", region: "Central Africa",  infant: 65.7,  maternal: 340  },
  { id: 204, slug: "benin",             name: "Benin",                flag: "🇧🇯", region: "West Africa",     infant: 64.7,  maternal: 523  },
  { id: 478, slug: "mauritania",        name: "Mauritania",           flag: "🇲🇷", region: "West Africa",     infant: 63.4,  maternal: 464  },
  { id: 120, slug: "cameroon",          name: "Cameroon",             flag: "🇨🇲", region: "Central Africa",  infant: 62.5,  maternal: 438  },
  { id: 384, slug: "cote-divoire",      name: "Côte d'Ivoire",        flag: "🇨🇮", region: "West Africa",     infant: 61.3,  maternal: 480  },
  { id: 180, slug: "dr-congo",          name: "DR Congo",             flag: "🇨🇩", region: "Central Africa",  infant: 60.5,  maternal: 547  },
  { id: 430, slug: "liberia",           name: "Liberia",              flag: "🇱🇷", region: "West Africa",     infant: 59.4,  maternal: 652  },
  { id: 800, slug: "uganda",            name: "Uganda",               flag: "🇺🇬", region: "East Africa",     infant: 58.2,  maternal: 284  },
  { id: 226, slug: "equatorial-guinea", name: "Equatorial Guinea",    flag: "🇬🇶", region: "Central Africa",  infant: 57.3,  maternal: 301  },
  { id: 834, slug: "tanzania",          name: "Tanzania",             flag: "🇹🇿", region: "East Africa",     infant: 55.8,  maternal: 349  },
  { id: 178, slug: "rep-of-congo",      name: "Rep. of Congo",        flag: "🇨🇬", region: "Central Africa",  infant: 54.9,  maternal: 378  },
  { id: 231, slug: "ethiopia",          name: "Ethiopia",             flag: "🇪🇹", region: "East Africa",     infant: 53.6,  maternal: 267  },
  { id: 450, slug: "madagascar",        name: "Madagascar",           flag: "🇲🇬", region: "Southern Africa", infant: 52.5,  maternal: 335  },
  { id: 454, slug: "malawi",            name: "Malawi",               flag: "🇲🇼", region: "Southern Africa", infant: 51.4,  maternal: 349  },
  { id: 729, slug: "sudan",             name: "Sudan",                flag: "🇸🇩", region: "North Africa",    infant: 50.3,  maternal: 276  },
  { id: 332, slug: "haiti",             name: "Haiti",                flag: "🇭🇹", region: "Caribbean",       infant: 49.7,  maternal: 480  },
];

export const BY_ID: Record<number, Country> = {};
DATA.forEach(c => { BY_ID[c.id] = c; });

export const AVG_INF = 27;
export const AVG_MAT = 197;
export const MAX_INF = 105;
export const MAX_MAT = 1260;

export const COLLAGE_GRADIENTS = [
  "linear-gradient(145deg,#3a1c1c 0%,#7a3d2a 100%)",
  "linear-gradient(145deg,#1a3a2a 0%,#2d6b4a 100%)",
  "linear-gradient(145deg,#1a2840 0%,#2c4a70 100%)",
  "linear-gradient(145deg,#3d2a1a 0%,#7a5230 100%)",
  "linear-gradient(145deg,#2a1a3a 0%,#5a3070 100%)",
  "linear-gradient(145deg,#1a3040 0%,#285060 100%)",
  "linear-gradient(145deg,#3a2a1a 0%,#6a4a28 100%)",
  "linear-gradient(145deg,#1a2a3a 0%,#234060 100%)",
  "linear-gradient(145deg,#2a1a2a 0%,#503050 100%)",
];
