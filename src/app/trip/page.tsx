"use client";

import Background from "@/components/shared/background";
import { httpService } from "@/lib/httpService";
import { GeminiPromptResponse } from "@/types/gemini.type";
import { PexelsQueryParams, PexelsSearchResponse } from "@/types/pexels.type";
import React, { useEffect, useState } from "react";

const Trip = () => {
  const [trip, setTrip] = useState<GeminiPromptResponse | null>(null);
  const [place, setPlace] = useState("");
  const [headerPhoto, setHeaderPhoto] = useState<string | null>(null);
  const [dayPhotos, setDayPhotos] = useState<PexelsSearchResponse[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const trip = JSON.parse(localStorage.getItem("trip") || "{}");
    setTrip(trip);
  }, []);

  const fetchPhotos = async (params: PexelsQueryParams) => {
    const response = await httpService.post("/images", { ...params });
    return response.data as PexelsSearchResponse;
  };

  useEffect(() => {
    const place = localStorage.getItem("place") || "";
    setPlace(place);

    const fetchHeaderPhoto = async () => {
      const response = await fetchPhotos({ query: place });
      setHeaderPhoto(response.photos[0].src.landscape);
    };

    fetchHeaderPhoto();
  }, []);

  useEffect(() => {
    setFetching(true);
    const dayPhotos: PexelsSearchResponse[] = [];
    if (trip && trip.itinerary.length > 0)
      trip.itinerary.forEach((day) => {
        const fetchDayPhoto = async () => {
          const response = await fetchPhotos({
            query: day.title.split(":")[0],
            per_page: 1,
          });
          dayPhotos.push(response);
          setFetching(false);
        };
        fetchDayPhoto();
      });
    setDayPhotos(dayPhotos);
  }, [trip]);

  return fetching && !trip ? (
    <Background>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="text-center animate-pulse">
          <h2 className="font-bold text-2xl font-poppins">
            fetching the details
          </h2>
          <p>this may take sometime please wait...</p>
        </div>
      </div>
    </Background>
  ) : (
    <>
      <Background>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${headerPhoto})`,
          }}
          className="h-dvh w-dvw max-w-dvw bg-cover bg-center flex flex-col items-start justify-center px-[10%]"
        >
          <h1 className="text-4xl font-bold text-white max-w-1/2 font-poppins">
            {trip?.tripTitle}
          </h1>
          <p className="text-white/60 max-w-3/4 text-xl mt-5 font-montserrat font-medium">
            {`${trip?.heroSection.subtitle.slice(
              0,
              trip.heroSection.subtitle.length - 1
            )} in ${trip?.itinerary.length} days`}
          </p>
        </div>
        <div className="h-dvh w-dvw max-w-dvw bg-cover bg-center flex flex-col items-start justify-center px-[10%]">
          <div className="flex space-x-5 max-w-3/4 w-fit overflow-x-auto mx-auto">
            {trip?.itinerary.map((day, index) => {
              return (
                <div
                  key={`${place}-day-${index + 1}`}
                  className="h-[300px] min-w-[200px] w-[200px]  flex flex-col items-start justify-end text-white p-3 rounded-2xl relative overflow-hidden z-10 cursor-pointer"
                >
                  <div
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.8)), url(${dayPhotos?.[index]?.photos[0].src.medium})`,
                    }}
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center hover:scale-110 -z-[1] transition-all duration-300 ease-in-out"
                  ></div>

                  <h1 className="font-medium text-xs">
                    Day {index < 10 ? index + 1 : `0${index + 1}`}
                  </h1>
                  <p className="font-semibold mt-1">{`${day.title}`}</p>
                </div>
              );
            })}
          </div>
          <h1 className="text-center mt-5 text-xl font-medium">
            {trip?.introduction}
          </h1>
        </div>
      </Background>
    </>
  );
};

export default Trip;
