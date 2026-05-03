'use client'

import { createContext, useContext, useState } from 'react'
import { TourDeparture } from '@/types/tour-detail'

export type BookingMode = 'book' | 'quote'

export type CustomDateRange = {
  startDate: string
  endDate: string
}

type TourPageCtx = {
  selectedDeparture: TourDeparture | null
  setSelectedDeparture: (d: TourDeparture) => void
  bookingMode: BookingMode
  setBookingMode: (m: BookingMode) => void
  isCustomDate: boolean
  setIsCustomDate: (v: boolean) => void
  customDateRange: CustomDateRange
  setCustomDateRange: (r: CustomDateRange) => void
  /** Shared pax count — drives live price in both departure tabs and booking form */
  numParticipants: number
  setNumParticipants: (n: number) => void
}

const TourPageContext = createContext<TourPageCtx>({
  selectedDeparture: null,
  setSelectedDeparture: () => {},
  bookingMode: 'book',
  setBookingMode: () => {},
  isCustomDate: false,
  setIsCustomDate: () => {},
  customDateRange: { startDate: '', endDate: '' },
  setCustomDateRange: () => {},
  numParticipants: 1,
  setNumParticipants: () => {},
})

export function TourPageProvider({
  children,
  initial,
}: {
  children: React.ReactNode
  initial: TourDeparture | null
}) {
  const [selectedDeparture, setSelectedDeparture] = useState<TourDeparture | null>(initial)
  const [bookingMode, setBookingMode] = useState<BookingMode>('book')
  const [isCustomDate, setIsCustomDate] = useState(false)
  const [customDateRange, setCustomDateRange] = useState<CustomDateRange>({ startDate: '', endDate: '' })
  const [numParticipants, setNumParticipants] = useState(1)
  return (
    <TourPageContext.Provider value={{
      selectedDeparture, setSelectedDeparture,
      bookingMode, setBookingMode,
      isCustomDate, setIsCustomDate,
      customDateRange, setCustomDateRange,
      numParticipants, setNumParticipants,
    }}>
      {children}
    </TourPageContext.Provider>
  )
}

export const useTourPage = () => useContext(TourPageContext)
