export const generateGeminiPrompt = (
  place: string,
  budget?: string,
  duration?: string,
  currentLocation?: string
) => {
  return `
You are a smart travel assistant helping users plan rich, AI-personalized trips.

Generate a complete travel plan to **${place}** ${
    currentLocation ? `from ${currentLocation}` : ""
  } ${duration ? `for ${duration} days` : ""} ${
    budget ? `within a budget of ${budget}` : ""
  }.

✅ Output must be ONLY valid JSON — no markdown, no comments, no explanations.  
✅ Follow this exact JSON schema:

{
  "tripTitle": "string",
  "heroSection": {
    "subtitle": "string (inspiring, ~30 words)",
    "video": {
      "title": "string",
      "description": "string (~25–40 words)"
    }
  },
  "introduction": "string (Include: overview of place, best time to visit, compare with user's current location if provided, assess budget: perfect / low / high)",
  "itinerary": [
    {
      "day": 1,
      "title": "string (highlight the theme of the day)",
      "weather": {
        "temperature": "string",
        "condition": "sunny | cloudy | rainy | snowy | windy | foggy | mixed",
        "advice": "string"
      },
      "activities": ["string"],
      "food": [
        {
          "dish": "string",
          "places": ["string"]
        }
      ],
      "accommodation": [
        {
          "name": "string",
          "type": "budget | mid-range | luxury",
          "pricePerNight": "string",
          "area": "string"
        }
      ],
      "commute": [
        {
          "type": "flight | train | bus | car | walk | metro | taxi",
          "description": "string"
        }
      ],
      "photoSpots": [
        {
          "place": "string",
          "bestTime": "morning | afternoon | evening | night"
        }
      ],
      "resourceLinks": {
        "flight": "string",
        "hotel": "string",
        "transport": "string",
        "localGuide": "string"
      },
      "localEvents": [
        {
          "event": "string",
          "description": "string"
        }
      ],
      "tips": ["string"]
    }
  ],
  "suggestions": ["string (general trip tips, safety, culture, travel hacks)"],
  "conclusion": {
    "summary": "string (wrap-up of the trip)",
    "coverageInsight": "string (how much of the destination was explored)",
    "whatToExploreNext": "string (recommendations for another time)"
  },
  "estimatedCostBreakdown": {
    "flights": "string",
    "stay": "string",
    "food": "string",
    "transport": "string",
    "total": "string"
  }
}

🔍 Instructions:
- "tripTitle" should be creative and destination-specific.
- "heroSection.subtitle" should be emotional and invite curiosity.
- Each day’s "title" must summarize that day (e.g., “Temples, Traditions & Night Markets”).
- Add local event suggestions and weather for each day.
- Respond ONLY with valid JSON. No extra words or markdown.
`;
};
