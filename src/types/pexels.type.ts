export type PexelsQueryParams = {
  query: string; // Required

  orientation?: "landscape" | "portrait" | "square";
  size?: "large" | "medium" | "small";
  color?:
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "turquoise"
    | "blue"
    | "violet"
    | "pink"
    | "brown"
    | "black"
    | "gray"
    | "white"
    | `#${string}`; // Any hex code

  locale?: string; // Should be one of I18n.available_locales
  page?: number; // Default is 1
  per_page?: number; // Default is 15, Max is 80
};

type PexelsPhotoSrc = {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
};

type PexelsPhoto = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: PexelsPhotoSrc;
  liked: boolean;
  alt: string;
};

export type PexelsSearchResponse = {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
};
