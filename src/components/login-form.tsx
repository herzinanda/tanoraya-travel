"use client"

import { useActionState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginAction } from "@/app/(admin)/_actions/auth"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction, isPending] = useActionState(loginAction, null)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Logo */}
      <div className="flex flex-col items-center gap-2">
        <img
          src="/img/logo/tanoraya-horizontal.png"
          alt="Tanoraya Tour & Travel"
          className="h-10 w-auto"
        />
        <span className="text-lg font-semibold">Tanoraya Travel</span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Sign in to manage your travel site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              {state?.error && (
                <div className="rounded-md border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {state.error}
                </div>
              )}
              <Field>
                <FieldLabel htmlFor="identifier">Email or Username</FieldLabel>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="admin@tanoraya.com"
                  autoComplete="username"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? "Signing in..." : "Sign In"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
