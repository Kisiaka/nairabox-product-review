import { StructuredEvent, SearchFilters } from '../types';

export interface FilterResult {
  events: StructuredEvent[];
  totalMatches: number;
  isStructuredLocationMatch: boolean;
  activeLocationLabel: string;
}

export function filterEvents(
  events: StructuredEvent[],
  filters: SearchFilters
): FilterResult {
  const { query, category, location } = filters;
  const cleanQuery = query.trim().toLowerCase();

  let matchedStructuredLocationCount = 0;

  const filtered = events.filter((event) => {
    // 1. State filter
    if (location.state && event.state !== location.state) {
      return false;
    }

    // 2. Neighbourhood filter (if a specific neighbourhood is selected)
    if (location.neighbourhood && location.neighbourhood !== 'all') {
      const targetNeighbourhood = location.neighbourhood.toLowerCase();
      const eventNeighbourhood = event.neighbourhood.toLowerCase();
      if (!eventNeighbourhood.includes(targetNeighbourhood) && !targetNeighbourhood.includes(eventNeighbourhood)) {
        return false;
      }
    }

    // 3. Category filter
    if (category !== 'All') {
      if (category === 'Movies' && event.category !== 'Movies') return false;
      if (category === 'Music & Concerts' && event.category !== 'Music & Concerts') return false;
      if (category === 'Comedy' && event.category !== 'Comedy') return false;
      if (category === 'Tech & Business' && event.category !== 'Tech & Business') return false;
      if (category === 'Arts & Culture' && event.category !== 'Arts & Culture') return false;
      if (category === 'Food & Drinks' && event.category !== 'Food & Drinks') return false;
    }

    // 4. Query filter (Structured Search Engine)
    if (cleanQuery) {
      const inTitle = event.title.toLowerCase().includes(cleanQuery);
      const inNeighbourhood = event.neighbourhood.toLowerCase().includes(cleanQuery);
      const inVenue = event.venue.toLowerCase().includes(cleanQuery);
      const inLandmark = event.venueLandmark.toLowerCase().includes(cleanQuery);
      const inCity = event.city.toLowerCase().includes(cleanQuery);
      const inState = event.state.toLowerCase().includes(cleanQuery);
      const inCategory = event.category.toLowerCase().includes(cleanQuery);
      const inTags = event.tags.some((t) => t.toLowerCase().includes(cleanQuery));
      const inDesc = event.description.toLowerCase().includes(cleanQuery);

      const matches =
        inTitle ||
        inNeighbourhood ||
        inVenue ||
        inLandmark ||
        inCity ||
        inState ||
        inCategory ||
        inTags ||
        inDesc;

      if (!matches) {
        return false;
      }

      // If query matches neighbourhood or venue, but not the title, highlight this structured match!
      if (!inTitle && (inNeighbourhood || inVenue || inLandmark)) {
        matchedStructuredLocationCount++;
        event.highlightMatchReason = inNeighbourhood
          ? `Matched by neighbourhood: ${event.neighbourhood} (${event.venue})`
          : `Matched by venue location: ${event.venue}`;
      } else if (inTitle) {
        event.highlightMatchReason = undefined;
      } else if (inCategory || inTags) {
        event.highlightMatchReason = `Matched by genre & topic: ${event.category}`;
      }

      return true;
    } else {
      event.highlightMatchReason = undefined;
      return true;
    }
  });

  const activeLocationLabel = location.neighbourhood && location.neighbourhood !== 'all'
    ? `${location.neighbourhood}, ${location.state}`
    : `All of ${location.state}`;

  return {
    events: filtered,
    totalMatches: filtered.length,
    isStructuredLocationMatch: matchedStructuredLocationCount > 0,
    activeLocationLabel,
  };
}
