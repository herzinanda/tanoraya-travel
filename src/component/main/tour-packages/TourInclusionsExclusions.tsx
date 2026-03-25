import React from "react";

type Props = {
  inclusions: string[];
  exclusions: string[];
};

const TourInclusionsExclusions = ({ inclusions, exclusions }: Props) => {
  if (inclusions.length === 0 && exclusions.length === 0) return null;

  return (
    <div className="activities-list-item">
      <h3>Included &amp; Excluded</h3>
      <div className="activities-item" style={{ alignItems: "flex-start" }}>
        {inclusions.length > 0 && (
          <div style={{ flex: 1 }}>
            <h6
              style={{
                color: "var(--theme)",
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              <i
                className="fa-solid fa-check"
                style={{ marginRight: 6 }}
              ></i>
              What&rsquo;s Included
            </h6>
            <ul className="activities-list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {inclusions.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <i
                    className="fa-solid fa-check"
                    style={{ color: "#2ecc71", marginTop: 4, flexShrink: 0 }}
                  ></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {exclusions.length > 0 && (
          <div style={{ flex: 1 }}>
            <h6
              style={{
                color: "#e74c3c",
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              <i
                className="fa-solid fa-xmark"
                style={{ marginRight: 6 }}
              ></i>
              Not Included
            </h6>
            <ul className="activities-list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {exclusions.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <i
                    className="fa-solid fa-xmark"
                    style={{ color: "#e74c3c", marginTop: 4, flexShrink: 0 }}
                  ></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourInclusionsExclusions;
