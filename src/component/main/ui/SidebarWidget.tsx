import React from 'react';

type SidebarWidgetProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * A reusable wrapper for all sidebar widgets.
 */
const SidebarWidget = ({ title, children, className = '' }: SidebarWidgetProps) => {
  return (
    <div className={`single-sidebar-widget ${className}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default SidebarWidget;