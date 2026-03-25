'use client'

import { createContext, useContext, useState } from 'react'
import { TourDeparture } from '@/types/tour-detail'

type TourPageCtx = {
  selectedDeparture: TourDeparture | null
  setSelectedDeparture: (d: TourDeparture) => void
}

const TourPageContext = createContext<TourPageCtx>({
  selectedDeparture: null,
  setSelectedDeparture: () => {},
})

export function TourPageProvider({
  children,
  initial,
}: {
  children: React.ReactNode
  initial: TourDeparture | null
}) {
  const [selectedDeparture, setSelectedDeparture] = useState<TourDeparture | null>(initial)
  return (
    <TourPageContext.Provider value={{ selectedDeparture, setSelectedDeparture }}>
      {children}
    </TourPageContext.Provider>
  )
}

export const useTourPage = () => useContext(TourPageContext)
