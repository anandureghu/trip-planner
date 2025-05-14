type WeatherCondition =
  | "sunny"
  | "cloudy"
  | "rainy"
  | "snowy"
  | "windy"
  | "foggy"
  | "mixed";

type AccommodationType = "budget" | "mid-range" | "luxury";

type CommuteType =
  | "flight"
  | "train"
  | "bus"
  | "car"
  | "walk"
  | "metro"
  | "taxi";

type PhotoSpotTime = "morning" | "afternoon" | "evening" | "night";

type TripItinerary = {
  day: number;
  title: string;
  weather: {
    temperature: string;
    condition: WeatherCondition;
    advice: string;
  };
  activities: string[];
  food: {
    dish: string;
    places: string[];
  }[];
  accommodation: {
    name: string;
    type: AccommodationType;
    pricePerNight: string;
    area: string;
  }[];
  commute: {
    type: CommuteType;
    description: string;
  }[];
  photoSpots: {
    place: string;
    bestTime: PhotoSpotTime;
  }[];
  resourceLinks: {
    flight: string;
    hotel: string;
    transport: string;
    localGuide: string;
  };
  localEvents: {
    event: string;
    description: string;
  }[];
  tips: string[];
};

type EstimatedCostBreakdown = {
  flights: string;
  stay: string;
  food: string;
  transport: string;
  total: string;
};

export type GeminiPromptResponse = {
  tripTitle: string;
  heroSection: {
    subtitle: string;
    video: {
      title: string;
      description: string;
    };
  };
  introduction: string;
  itinerary: TripItinerary[];
  suggestions: string[];
  conclusion: {
    summary: string;
    coverageInsight: string;
    whatToExploreNext: string;
  };
  estimatedCostBreakdown: EstimatedCostBreakdown;
};

export type GenerateGeminiPrompt = (
  place: string,
  budget?: string,
  duration?: string,
  currentLocation?: string
) => string;
