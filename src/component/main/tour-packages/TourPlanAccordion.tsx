"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { TourPlanItem } from '@/types/tour-detail';

type TourPlanAccordionProps = {
  plan: TourPlanItem[];
};

// Single Accordion Item Component
const AccordionItem = ({ item, isOpen, onToggle }: { item: TourPlanItem, isOpen: boolean, onToggle: () => void }) => {
  return (
    <div className="accordion-item">
      <h5 className="accordion-header">
        <button
          className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
          type="button"
          onClick={onToggle}
        >
          {item.title}
        </button>
      </h5>
      {/* This simple implementation uses CSS for show/hide. 
          A more robust version might use react-transition-group. */}
      <div className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}>
        <div className="content">
          <div className="accordion-body">
            <div dangerouslySetInnerHTML={{ __html: item.descriptionHtml }} />
          </div>
          <div className="thumb">
            <Image 
              {...item.image} 
              width={200} 
              height={150} 
              className="w-100 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


const TourPlanAccordion = ({ plan }: TourPlanAccordionProps) => {
  const [openItemId, setOpenItemId] = useState<string | null>(plan[1]?.id || null); // Default open second item

  const handleToggle = (itemId: string) => {
    setOpenItemId(openItemId === itemId ? null : itemId);
  };

  return (
    <div className="faq-items">
      <h3>Tour Plan</h3>
      <div className="faq-accordion">
        <div className="accordion" id="accordion">
          {plan.map(item => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openItemId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourPlanAccordion;