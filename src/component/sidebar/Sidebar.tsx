import React from 'react';
import SearchWidget from './SearchWidget';
import BookingFormWidget from './BookingFormWidget';
import RecentToursWidget from './RecentToursWidget';
import { SidebarDataType } from '@/types/sidebar-destination-details';

type SidebarProps = {
  data: SidebarDataType;
};

/**
 * The main sidebar component that assembles all widgets.
 */
const Sidebar = ({ data }: SidebarProps) => {
  return (
    <div className="col-lg-4">
      <div className="main-sidebar-widget">
        <SearchWidget />
        <BookingFormWidget />
        <RecentToursWidget tours={data.recentTours} />
      </div>
    </div>
  );
};

export default Sidebar;