"use client";

import Background from "@/components/shared/background";
import Navbar from "@/components/shared/navbar";
import { useState } from "react";
import Loader from "@/components/shared/loader";
import { httpService } from "@/lib/httpService";
import { toast } from "sonner";
import { GeminiPromptResponse } from "@/types/gemini.type";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [place, setPlace] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (!place) {
      toast.error("Please enter a place to visit");
      return;
    }
    setIsLoading(true);
    httpService
      .post("/gemini", {
        place,
        budget,
        duration,
        currentLocation,
      })
      .then((res: AxiosResponse<{ response: GeminiPromptResponse }>) => {
        localStorage.setItem("trip", JSON.stringify(res.data.response));
        router.push("/trip");
        setIsLoading(false);
        handleReset();
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Something went wrong: " + err.response.data.message);
      });
  };

  const handleReset = () => {
    setPlace("");
    setBudget("");
    setDuration("");
    setCurrentLocation("");
  };

  return (
    <Background>
      {isLoading ? (
        <div className="flex items-center justify-center h-full w-full">
          <Loader>
            <div className="flex items-center justify-center flex-col animate-pulse">
              <div className="text-2xl font-poppins font-medium">
                Generating your itinerary
              </div>
              <div className="text-sm font-poppins font-medium">
                This may take a while, please wait...
              </div>
            </div>
          </Loader>
        </div>
      ) : (
        <>
          <Navbar />
          <div className="flex h-full w-full items-center justify-center flex-col">
            <div className="text-center">
              <h1 className="text-6xl font-bold font-poppins tracking-tight">
                Unlock the perfect <span className="">Itinerary</span>
                <br />
                for your next trip
              </h1>
              <p className="text-xl font-poppins mt-5 text-gray-400">
                Trip Planner is the easiest way to plan your next trip.
              </p>
            </div>

            <div className="bg-white rounded-full shadow-2xl flex items-center justify-between p-5 mt-[40px] pl-[50px] font-medium">
              <div>
                <h3 className="text-sm">Place</h3>
                <input
                  type="text"
                  placeholder="Enter a place"
                  required
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  className="font-2xl"
                />
              </div>

              <div className="border-l-2 border-gray-200 px-5">
                <h3 className="text-sm">Budget</h3>
                <input
                  type="text"
                  placeholder="Enter a budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>

              <div className="border-l-2 border-gray-200 px-5">
                <h3 className="text-sm">Duration</h3>
                <input
                  type="text"
                  placeholder="Enter a duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div className="border-l-2 border-gray-200 px-5">
                <h3 className="text-sm">Current Location</h3>
                <input
                  type="text"
                  placeholder="Current location"
                  value={currentLocation}
                  onChange={(e) => setCurrentLocation(e.target.value)}
                />
              </div>

              <button
                onClick={handleSearch}
                className="bg-black text-white p-5 px-[40px] rounded-full font-medium cursor-pointer font-montserrat"
              >
                Search
              </button>
            </div>
          </div>
        </>
      )}
    </Background>
  );
}
