import { Title } from "@solidjs/meta";
import {
  ErrorBoundary,
  For,
  Match,
  Suspense,
  Switch,
  createEffect,
  createResource,
} from "solid-js";
import { AiOutlineLoading3Quarters } from "solid-icons/ai";
import { ImSpinner9 } from "solid-icons/im";
// Create ui with static data
// Present data within that ui
// DONE : --------------------
// Hide API key

export default function Home() {
  const [weatherData, { refetch }] = createResource(async () => {
    const response = await fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=c8d5a3373bb74ef591a173934241409&q=Mostaganem&days=7&aqi=no&alerts=no"
    );
    if (!response.ok) throw new Error("Error when fetching!");
    return await response.json();
  });

  return (
    <main class="p-10">
      <Title>Solid Weather App</Title>

      <ErrorBoundary
        fallback={
          <div class="text-red-600 font-bold">{weatherData.error?.message}</div>
        }
      >
        <Suspense
          fallback={
            <div>
              <ImSpinner9 class="animate-spin text-2xl text-blue-500" />
            </div>
          }
        >
          <div>Data is Ready.</div>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
