"use client";

import React, { useState } from "react";
import Image from "next/image";
import { StrapiImage } from "@/component/main/home/StrapiImage";
import { TourPlanItem } from "@/types/tour-detail";
import { TimelineMarker } from "./TimelineMarker";
import { useTourPage } from "@/component/main/tour-packages/TourPageContext";

type TourPlanAccordionProps = {
  plan: TourPlanItem[];
};

const getImageUrl = (imageProps: any): string => {
  if (imageProps && imageProps.src) return imageProps.src;

  return "https://placehold.co/200x150/cccccc/333333?text=Tour+Image";
}

// Single Accordion Item Component
const AccordionItem = ({
  item,
  isOpen,
  onToggle,
}: {
  item: TourPlanItem;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="accordion-item w-100">
      <h5 className="accordion-header">
        <button
          className={`accordion-button ${isOpen ? "" : "collapsed"}`}
          type="button"
          onClick={onToggle}
        >
          {item.title}
        </button>
      </h5>
      {/* This simple implementation uses CSS for show/hide. 
          A more robust version might use react-transition-group. */}
      <div className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}>
        <div className="content">
          <div className="accordion-body">
            <div dangerouslySetInnerHTML={{ __html: item.descriptionHtml }} />
          </div>
          <div className="thumb">
            {item.image?.src && (
              <StrapiImage
                src={item.image.src as string}
                alt={item.image.alt || item.title}
                width={200}
                height={150}
                className="w-100 h-auto"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TourPlanAccordion = ({ plan }: TourPlanAccordionProps) => {
  const { selectedDeparture } = useTourPage()
  const activePlan = selectedDeparture?.variant?.itinerary ?? plan

  const [openItemIds, setOpenItemIds] = useState<string[]>([]); // Default open second item

  const handleToggle = (itemId: string) => {
    setOpenItemIds((prevOpenIds) => {
      if (prevOpenIds.includes(itemId)) {
        return prevOpenIds.filter((id) => id !== itemId);
      } else {
        return [...prevOpenIds, itemId];
      }
    });
  };

  const handleOpenAll = () => {
    const allIds = activePlan.map((item) => item.id);
    setOpenItemIds(allIds);
  };

  const handleCloseAll = () => {
    setOpenItemIds([]);
  };

  const areAllOpen = openItemIds.length === activePlan.length;

  return (
    <div className="faq-items">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Itinerary</h3>
        <button
          className="toggle-itinerary"
          onClick={areAllOpen ? handleCloseAll : handleOpenAll}
        >
          {areAllOpen ? "Close All" : "Open All"}
        </button>
      </div>
      <div className="faq-accordion">
        <div className="accordion" id="accordion">
          {activePlan.map((item, index) => (
            <div
              key={item.id}
              className="d-flex"
            >
              <TimelineMarker
                index={index}
                isLast={index === activePlan.length - 1}
              />
              <AccordionItem
                item={item}
                isOpen={openItemIds.includes(item.id)}
                onToggle={() => handleToggle(item.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourPlanAccordion;
