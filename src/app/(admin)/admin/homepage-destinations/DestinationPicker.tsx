"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { MapPinIcon, PlusIcon, XIcon, CheckIcon, Loader2Icon, ArrowLeftIcon } from "lucide-react";
import { saveHomepageDestinations } from "../../_actions/homepage-destinations";
import { getStrapiMedia } from "@/component/main/home/StrapiImage";
import { cn } from "../../_lib/cn";

interface Destination {
  documentId: string;
  title: string;
  destinationUrl: string;
  destinationImages?: { url: string; alternativeText?: string } | null;
}

export function DestinationPicker({
  allDestinations,
  initialSelected,
}: {
  allDestinations: Destination[];
  initialSelected: string[];
}) {
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [isPending, startTransition] = useTransition();
  const [savedOk, setSavedOk] = useState(false);

  const add = (documentId: string) => {
    if (selected.length >= 6 || selected.includes(documentId)) return;
    setSelected((prev) => [...prev, documentId]);
    setSavedOk(false);
  };

  const remove = (documentId: string) => {
    setSelected((prev) => prev.filter((id) => id !== documentId));
    setSavedOk(false);
  };

  const save = () => {
    startTransition(async () => {
      await saveHomepageDestinations(selected);
      setSavedOk(true);
    });
  };

  // Build the 6 bento slots (null = empty)
  const slots: (Destination | null)[] = [
    ...selected.map((id) => allDestinations.find((d) => d.documentId === id) ?? null),
    ...Array(Math.max(0, 6 - selected.length)).fill(null),
  ].slice(0, 6);

  const unselected = allDestinations.filter((d) => !selected.includes(d.documentId));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/destinations"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Homepage Destinations</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Select 6 destinations to feature. Slots 1 and 6 are the wide cards.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={isPending || selected.length === 0}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors shrink-0",
            savedOk
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-primary text-primary-foreground hover:bg-primary/90",
            (isPending || selected.length === 0) && "opacity-60 cursor-not-allowed"
          )}
        >
          {isPending ? (
            <><Loader2Icon className="h-4 w-4 animate-spin" /> Saving…</>
          ) : savedOk ? (
            <><CheckIcon className="h-4 w-4" /> Saved!</>
          ) : (
            `Save to Homepage (${selected.length}/6)`
          )}
        </button>
      </div>

      {/* Bento grid preview */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Preview — {selected.length}/6 selected
        </p>
        <div className="grid grid-cols-4 gap-4">
          {slots.map((dest, i) => {
            const isWide = i === 0 || i === 5;
            return (
              <div key={i} className={isWide ? "col-span-2" : "col-span-1"}>
                <BentoSlot slot={i + 1} dest={dest} onRemove={dest ? () => remove(dest.documentId) : undefined} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t pt-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          {selected.length >= 6
            ? "All 6 slots filled — remove a destination above to swap"
            : "Click a destination below to add it to the next empty slot"}
        </p>

        {unselected.length === 0 && selected.length < 6 ? (
          <p className="text-sm text-muted-foreground">No more destinations available.</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {unselected.map((dest) => (
              <PoolCard
                key={dest.documentId}
                dest={dest}
                disabled={selected.length >= 6}
                onClick={() => add(dest.documentId)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BentoSlot({
  slot,
  dest,
  onRemove,
}: {
  slot: number;
  dest: Destination | null;
  onRemove?: () => void;
}) {
  const imgUrl = dest?.destinationImages?.url
    ? getStrapiMedia(dest.destinationImages.url)
    : null;

  if (!dest) {
    return (
      <div className="h-[220px] rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-300 bg-slate-50">
        <MapPinIcon className="h-8 w-8" />
        <span className="text-xs font-medium">Slot {slot}</span>
      </div>
    );
  }

  return (
    <div className="group relative h-[220px] rounded-2xl overflow-hidden">
      {/* Image */}
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={dest.destinationImages?.alternativeText || dest.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
          <MapPinIcon className="h-12 w-12 text-slate-400" />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      {/* Title */}
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-white font-semibold text-sm leading-tight">{dest.title}</p>
      </div>

      {/* Slot number */}
      <div className="absolute top-3 left-3 h-6 w-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center shadow-md">
        {slot}
      </div>

      {/* Remove button — revealed on hover */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-3 right-3 h-7 w-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
        >
          <XIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function PoolCard({
  dest,
  disabled,
  onClick,
}: {
  dest: Destination;
  disabled: boolean;
  onClick: () => void;
}) {
  const imgUrl = dest.destinationImages?.url
    ? getStrapiMedia(dest.destinationImages.url)
    : null;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative w-full h-[100px] rounded-xl overflow-hidden text-left transition-all",
        disabled
          ? "opacity-40 cursor-not-allowed"
          : "cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-1"
      )}
    >
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={dest.destinationImages?.alternativeText || dest.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
          <MapPinIcon className="h-6 w-6 text-slate-400" />
        </div>
      )}

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Title */}
      <p className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-semibold leading-tight truncate">
        {dest.title}
      </p>

      {/* Add overlay */}
      {!disabled && (
        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center shadow">
            <PlusIcon className="h-4 w-4 text-white" />
          </div>
        </div>
      )}
    </button>
  );
}
