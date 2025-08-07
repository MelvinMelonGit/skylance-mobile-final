import { createContext, useContext, useState } from 'react';

const SelectedFlightContext = createContext(null)

export default function SelectedFlightProvider({ children }) {
  const [currentFlight, setCurrentFlight] = useState(null)
  const [currentBooking, setCurrentBooking] = useState(null)
  const [currentRebookedFlight, setCurrentRebookedFlight] = useState(null)
  const [overBooking, setOverBooking] = useState(null)
  const [currentFlightValidate, setCurrentFlightValidate] = useState(null)

  return (
    <SelectedFlightContext.Provider value={{ currentFlight, setCurrentFlight, currentBooking, setCurrentBooking, currentRebookedFlight, setCurrentRebookedFlight, overBooking, setOverBooking, currentFlightValidate, setCurrentFlightValidate }}>
      {children}
    </SelectedFlightContext.Provider>
  )
}

export function useSelectedFlight() {
  const context = useContext(SelectedFlightContext)
  if (!context) throw new Error('useSelectedFlight must be used within SelectedFlightProvider')
  return context
}
