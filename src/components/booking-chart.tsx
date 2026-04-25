"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

interface MonthlyData {
  month: string
  pending: number
  confirmed: number
  paid: number
  done: number
  cancelled: number
}

export function BookingChart({ data }: { data: MonthlyData[] }) {
  const total = data.reduce((s, d) => s + d.pending + d.confirmed + d.paid + d.done + d.cancelled, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Booking Overview</CardTitle>
        <CardDescription>
          {total} total booking{total !== 1 ? "s" : ""} in the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "13px" }} />
              <Bar dataKey="done" name="Done" fill="#16a34a" radius={[4, 4, 0, 0]} stackId="bookings" />
              <Bar dataKey="paid" name="Paid" fill="#22c55e" radius={[4, 4, 0, 0]} stackId="bookings" />
              <Bar dataKey="confirmed" name="Confirmed" fill="#3b82f6" radius={[4, 4, 0, 0]} stackId="bookings" />
              <Bar dataKey="pending" name="Pending" fill="#f59e0b" radius={[4, 4, 0, 0]} stackId="bookings" />
              <Bar dataKey="cancelled" name="Cancelled" fill="#ef4444" radius={[4, 4, 0, 0]} stackId="bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
