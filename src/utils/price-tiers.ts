import { PriceTier } from '@/types/tour-detail'

/**
 * Returns the effective per-person price for a given pax count.
 * Tiers are matched by range; first matching tier wins.
 * Falls back to `fallback` when no tiers exist or no tier matches.
 */
export function getEffectivePrice(
  pax: number,
  tiers: PriceTier[] | null | undefined,
  fallback: number
): number {
  if (!tiers || tiers.length === 0) return fallback
  const sorted = [...tiers].sort((a, b) => a.minPax - b.minPax)
  const match = sorted.find(
    (t) => pax >= t.minPax && (t.maxPax === null || pax <= t.maxPax)
  )
  return match?.pricePerPerson ?? fallback
}

/**
 * Returns the minimum per-person price across all tiers ("Start from" value).
 * Falls back to `fallback` when no tiers exist.
 */
export function getLowestTierPrice(
  tiers: PriceTier[] | null | undefined,
  fallback: number
): number {
  if (!tiers || tiers.length === 0) return fallback
  return Math.min(...tiers.map((t) => t.pricePerPerson))
}

/**
 * Parses a CSV with header row: min_pax,max_pax,price_per_person
 * max_pax can be blank (= unlimited / null).
 * Example:
 *   min_pax,max_pax,price_per_person
 *   1,4,2500000
 *   5,9,2200000
 *   10,,1900000
 */
export function parsePriceTierCSV(csv: string): PriceTier[] {
  const lines = csv.trim().split(/\r?\n/).filter(Boolean)
  if (lines.length < 2) return []
  return lines
    .slice(1)
    .map((line) => {
      const cols = line.split(',').map((s) => s.trim().replace(/^"|"$/g, ''))
      const minPax = parseInt(cols[0] || '1', 10)
      const maxRaw = cols[1] ? parseInt(cols[1], 10) : NaN
      const maxPax = Number.isNaN(maxRaw) ? null : maxRaw
      const pricePerPerson = parseInt((cols[2] || '').replace(/\D/g, ''), 10)
      if (Number.isNaN(minPax) || !pricePerPerson) return null
      return { minPax: minPax || 1, maxPax, pricePerPerson }
    })
    .filter((t): t is PriceTier => t !== null && t.pricePerPerson > 0)
}
