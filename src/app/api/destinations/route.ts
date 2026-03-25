import { NextResponse } from 'next/server'
import { getDestinations } from '@/data/loader'

export async function GET() {
  try {
    const res = await getDestinations()
    const destinations = (res?.data ?? []).map((d: { documentId?: string; id?: string; title?: string; destinationUrl?: string }) => ({
      id: d.documentId || d.id,
      title: d.title || '',
      destinationUrl: d.destinationUrl || '',
    }))
    return NextResponse.json(destinations)
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}
