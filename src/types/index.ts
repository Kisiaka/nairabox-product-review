export type NigerianState =
  | 'Lagos'
  | 'Federal Capital Territory (Abuja)'
  | 'Rivers'
  | 'Kano'
  | 'Oyo';

export interface Neighbourhood {
  id: string;
  name: string;
  popularVenues: string[];
  areaType: 'Mainland' | 'Island' | 'Central' | 'Outskirts' | 'Metropolitan';
}

export interface StateLocation {
  id: string;
  state: NigerianState;
  shortName: string;
  capital: string;
  neighbourhoods: Neighbourhood[];
}

export type EventCategory =
  | 'All'
  | 'Movies'
  | 'Music & Concerts'
  | 'Comedy'
  | 'Tech & Business'
  | 'Arts & Culture'
  | 'Food & Drinks';

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  perks: string;
  available: number;
}

export interface StructuredEvent {
  id: string;
  title: string;
  category: Exclude<EventCategory, 'All'>;
  date: string;
  time: string;
  isoDate: string; // future date verification
  state: NigerianState;
  city: string;
  neighbourhood: string;
  venue: string;
  venueLandmark: string;
  description: string;
  longDescription: string;
  image: string;
  priceRange: {
    min: number;
    max: number;
    currency: 'NGN';
  };
  ticketTiers: TicketTier[];
  isUpcoming: boolean;
  ageRating?: string;
  duration?: string;
  organizer: string;
  tags: string[];
  rating?: number;
  highlightMatchReason?: string;
}

export interface LocationSelection {
  state: NigerianState;
  neighbourhood: string | null; // null means "All neighbourhoods in this state"
}

export interface SearchFilters {
  query: string;
  category: EventCategory;
  location: LocationSelection;
  dateRange: 'all' | 'this_week' | 'this_weekend' | 'this_month';
}
