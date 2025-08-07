import { createContext, useContext, useState } from 'react';

const CheckedInFlightsContext = createContext(null)

export default function CheckedInFlightsProvider({ children }) {
  const [checkedInFlights, setCheckedInFlights] = useState([])
  const [checkedInFlightId, setCheckedInFlightId] = useState('')

  return (
    <CheckedInFlightsContext.Provider value={{ checkedInFlights, setCheckedInFlights, checkedInFlightId, setCheckedInFlightId }}>
      {children}
    </CheckedInFlightsContext.Provider>
  )
}

export function useCheckedInFlights() {
  const context = useContext(CheckedInFlightsContext)
  if (!context) throw new Error('useCheckedInFlights must be used within CheckedInFlightsProvider')
  return context
}
