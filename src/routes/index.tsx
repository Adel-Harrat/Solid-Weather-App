import { Title } from "@solidjs/meta";
import { createQuery } from "@tanstack/solid-query";
import { ErrorBoundary, Suspense, createResource } from "solid-js";
// Create ui with static data
// Present data within that ui
// Hide API key
// DONE : --------------------

export default function Home() {
  // const [weatherData] = createResource(async () => {
  //   const response = await fetch(
  //     "http://api.weatherapi.com/v1/forecast.json?key=c8d5a3373bb74ef591a173934241409&q=Mostaganem&days=7&aqi=no&alerts=no"
  //   );
  //   if (!response.ok) throw new Error("Error when fetching!");
  //   return await response.json();
  // });

  const weatherApiQuery = createQuery(() => ({
    queryKey: ["weather-api"],
    queryFn: async () => {
      const result = await fetch(
        "http://api.weatherapi.com/v1/forecast.json?key=c8d5a3373bb74ef591a173934241409&q=Mostaganem&days=7&aqi=no&alerts=no"
      );
      if (!result.ok) throw new Error("Failed to fetch data");
      return result.json();
    },
    staleTime: 1000 * 60 * 5,
    throwOnError: true,
  }));

  return (
    <main class="p-10">
      <Title>Solid Weather App</Title>

      <ErrorBoundary
        fallback={
          <div class="text-red-600 font-bold">Something went wrong!</div>
        }
      >
        <Suspense fallback={<div>Loading ...</div>}>
          <pre>{JSON.stringify(weatherApiQuery.data, null, 1)}</pre>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
