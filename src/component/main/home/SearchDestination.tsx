'use client'

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface Destination {
  id: string;
  title: string;
  destinationUrl: string;
}

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const GUEST_OPTIONS = [1,2,3,4,5,6,7,8,9,10];

const SearchDestination = () => {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [destination, setDestination]   = useState("");
  const [destLabel, setDestLabel]       = useState("");
  const [month, setMonth]               = useState("");
  const [guests, setGuests]             = useState("");
  const [openPanel, setOpenPanel]       = useState<"dest"|"month"|"guests"|null>(null);

  useEffect(() => {
    fetch("/api/destinations")
      .then(r => r.json())
      .then(data => setDestinations(data))
      .catch(() => {});
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (panel: "dest"|"month"|"guests") =>
    setOpenPanel(prev => (prev === panel ? null : panel));

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (month)       params.set("month", month);
    if (guests)      params.set("guests", guests);
    router.push(`/tour-packages/tour?${params.toString()}`);
    setOpenPanel(null);
  };

  return (
    <>
      <style>{`
        .tnr-search {
          width: 100%;
        }
        .tnr-search__card {
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.14);
          padding: 10px;
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr auto;
          gap: 6px;
          align-items: stretch;
        }
        .tnr-field {
          padding: 14px 18px;
          border-radius: 16px;
          display: flex;
          gap: 12px;
          align-items: center;
          cursor: pointer;
          transition: background .15s;
          position: relative;
          user-select: none;
        }
        .tnr-field + .tnr-field::before {
          content: '';
          position: absolute;
          left: 0; top: 20%; bottom: 20%;
          width: 1px;
          background: #e5e7eb;
        }
        .tnr-field:hover { background: #eff6ff; }
        .tnr-field.is-open { background: #eff6ff; }
        .tnr-field.is-open::before,
        .tnr-field:hover::before { display: none; }

        .tnr-field__icon {
          width: 40px; height: 40px;
          border-radius: 12px;
          background: #dbeafe;
          color: #1d4ed8;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          font-size: 15px;
        }
        .tnr-field__body { flex: 1; min-width: 0; }
        .tnr-field__label {
          font-size: 11px;
          color: #6b7280;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          line-height: 1;
        }
        .tnr-field__value {
          font-size: 14px;
          color: #111827;
          font-weight: 600;
          margin-top: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tnr-field__value.empty { color: #9ca3af; font-weight: 400; }

        /* Popovers */
        .tnr-popover {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 20px 56px rgba(0,0,0,0.14);
          padding: 16px;
          z-index: 200;
          min-width: 280px;
          animation: tnrSlide .18s ease;
        }
        .tnr-popover--right { left: auto; right: 0; }
        @keyframes tnrSlide {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Destination grid */
        .tnr-dest-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .tnr-dest-item {
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          cursor: pointer;
          transition: border-color .15s, background .15s;
          font-size: 13px;
          font-weight: 600;
          color: #1a3272;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .tnr-dest-item:hover { border-color: #3b82f6; background: #eff6ff; }
        .tnr-dest-item i { color: #f7941d; font-size: 11px; flex-shrink: 0; }

        /* Month grid */
        .tnr-month-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .tnr-month-item {
          padding: 9px 6px;
          border-radius: 10px;
          text-align: center;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          border: 1px solid #e5e7eb;
          transition: all .15s;
        }
        .tnr-month-item:hover  { background: #eff6ff; border-color: #3b82f6; color: #1a3272; }
        .tnr-month-item.active { background: #1a3272; border-color: #1a3272; color: #fff; }

        /* Guests list */
        .tnr-guest-list { display: flex; flex-direction: column; gap: 2px; }
        .tnr-guest-item {
          padding: 9px 14px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: background .12s;
        }
        .tnr-guest-item:hover  { background: #eff6ff; color: #1a3272; }
        .tnr-guest-item.active { background: #eff6ff; color: #1a3272; font-weight: 700; }
        .tnr-guest-item i { font-size: 11px; color: #9ca3af; }

        /* Submit */
        .tnr-submit {
          padding: 0 28px;
          border-radius: 16px;
          background: linear-gradient(135deg, #f7941d 0%, #e8610a 100%);
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: opacity .2s, transform .15s;
          white-space: nowrap;
          min-height: 56px;
          letter-spacing: 0.02em;
        }
        .tnr-submit:hover { opacity: 0.88; transform: scale(1.02); }

        /* Responsive */
        @media (max-width: 1024px) {
          .tnr-search__card { grid-template-columns: 1fr 1fr; }
          .tnr-submit { grid-column: span 2; padding: 16px; }
        }
        @media (max-width: 576px) {
          .tnr-search__card { grid-template-columns: 1fr; border-radius: 18px; }
          .tnr-field + .tnr-field::before { display: none; }
          .tnr-submit { grid-column: auto; padding: 16px; }
        }
      `}</style>

      <div className="tnr-search" ref={wrapRef}>
        <div className="tnr-search__card">

          {/* ── Destination ── */}
          <div
            className={`tnr-field${openPanel === "dest" ? " is-open" : ""}`}
            onClick={() => toggle("dest")}
          >
            <div className="tnr-field__icon">
              <i className="fa-solid fa-location-dot" />
            </div>
            <div className="tnr-field__body">
              <div className="tnr-field__label">Destination</div>
              <div className={`tnr-field__value${!destLabel ? " empty" : ""}`}>
                {destLabel || "Where are you going?"}
              </div>
            </div>

            {openPanel === "dest" && (
              <div className="tnr-popover" onClick={e => e.stopPropagation()}>
                <div className="tnr-dest-grid">
                  {destinations.length > 0 ? destinations.map(d => (
                    <div
                      key={d.id}
                      className="tnr-dest-item"
                      onClick={() => {
                        setDestination(d.destinationUrl || d.title);
                        setDestLabel(d.title);
                        setOpenPanel(null);
                      }}
                    >
                      <i className="fa-solid fa-location-dot" />
                      {d.title}
                    </div>
                  )) : (
                    <div style={{ color: "#9ca3af", fontSize: 13, gridColumn: "span 2" }}>
                      Loading…
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Travel Month ── */}
          <div
            className={`tnr-field${openPanel === "month" ? " is-open" : ""}`}
            onClick={() => toggle("month")}
          >
            <div className="tnr-field__icon">
              <i className="fa-regular fa-calendar-days" />
            </div>
            <div className="tnr-field__body">
              <div className="tnr-field__label">Travel Month</div>
              <div className={`tnr-field__value${!month ? " empty" : ""}`}>
                {month || "Select Month"}
              </div>
            </div>

            {openPanel === "month" && (
              <div className="tnr-popover" onClick={e => e.stopPropagation()}>
                <div className="tnr-month-grid">
                  {MONTHS.map(m => (
                    <div
                      key={m}
                      className={`tnr-month-item${month === m ? " active" : ""}`}
                      onClick={() => { setMonth(m); setOpenPanel(null); }}
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Guests ── */}
          <div
            className={`tnr-field${openPanel === "guests" ? " is-open" : ""}`}
            onClick={() => toggle("guests")}
          >
            <div className="tnr-field__icon">
              <i className="fa-solid fa-user-group" />
            </div>
            <div className="tnr-field__body">
              <div className="tnr-field__label">Guests</div>
              <div className={`tnr-field__value${!guests ? " empty" : ""}`}>
                {guests ? `${guests} ${Number(guests) === 1 ? "Guest" : "Guests"}` : "Add Guests"}
              </div>
            </div>

            {openPanel === "guests" && (
              <div className="tnr-popover tnr-popover--right" onClick={e => e.stopPropagation()}>
                <div className="tnr-guest-list">
                  {GUEST_OPTIONS.map(n => (
                    <div
                      key={n}
                      className={`tnr-guest-item${guests === String(n) ? " active" : ""}`}
                      onClick={() => { setGuests(String(n)); setOpenPanel(null); }}
                    >
                      <i className="fa-solid fa-user" />
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Search ── */}
          <button className="tnr-submit" type="button" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass" />
            Search
          </button>

        </div>
      </div>
    </>
  );
};

export default SearchDestination;
