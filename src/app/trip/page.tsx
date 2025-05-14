"use client";

import Background from "@/components/shared/background";
import { GeminiPromptResponse } from "@/types/gemini.type";
import React, { useEffect, useState } from "react";

const Trip = () => {
  const [trip, setTrip] = useState<GeminiPromptResponse | null>(null);
  useEffect(() => {
    const trip = JSON.parse(localStorage.getItem("trip") || "{}");
    setTrip(trip);
  }, []);

  console.log(trip);

  return !trip ? (
    <Background>
      <div>Loading...</div>
    </Background>
  ) : (
    <>
      <Background>
        <div>
          <h1>{trip.tripTitle}</h1>
          <p>{trip.introduction}</p>
        </div>
      </Background>
      <Background>
        <div>
          <h1>{trip.tripTitle}</h1>
          <p>{trip.introduction}</p>
        </div>
      </Background>
    </>
  );
};

export default Trip;
