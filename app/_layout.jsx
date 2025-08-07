import AuthProvider from "@/context/AuthContext";
import CheckedInFlightsProvider from "@/context/CheckedInFlightsContext";
import SelectedFlightProvider from "@/context/SelectedFlightContext";
import { Slot, useSegments } from "expo-router";
import { useEffect, useRef } from "react";

export default function RootLayout() {
  const segments = useSegments()
  const previousRoute = useRef(null)

  useEffect(() => {
    const currentRoute = segments.join("/");
    if (previousRoute.current !== currentRoute) {
      previousRoute.current = currentRoute
    }
  }, [segments])

  return (
    <AuthProvider>
      <CheckedInFlightsProvider>
        <SelectedFlightProvider>
          <Slot />
        </SelectedFlightProvider>
      </CheckedInFlightsProvider>
    </AuthProvider>
  )
}