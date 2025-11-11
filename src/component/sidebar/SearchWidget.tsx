import React from 'react';
import Image from 'next/image';
import SidebarWidget from '../main/ui/SidebarWidget';

const SearchWidget = () => {
  return (
    <SidebarWidget title="Search Here">
      <div className="search-widget">
        <form action="#">
          <input type="text" placeholder="Search here" />
          <button type="submit">
            <Image 
              src="/img/icon/search_icon.svg" 
              alt="search" 
              width={20} 
              height={20} 
            />
          </button>
        </form>
      </div>
    </SidebarWidget>
  );
};

export default SearchWidget;