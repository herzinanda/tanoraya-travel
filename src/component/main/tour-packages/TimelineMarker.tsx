export const TimelineMarker = ({ index, isLast }: { index: number, isLast: boolean }) => {
  
  const markerStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#FA6741', // Using a dark blue color (similar to Bootstrap primary)
    color: 'white',
    // Aligns the marker vertically with the button's center
    marginTop: '8px', 
    position: 'relative' as const,
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold' as 'bold' // Explicit type for TS compatibility
  };

  const lineStyle = {
    position: 'absolute' as 'absolute', // Explicit type for TS compatibility
    left: '50%',
    // FIX 1: Offset by half the line width (2px/2) for perfect center alignment
    marginLeft: '-1px', 
    backgroundColor: '#FA6741', 
    width: '2px',
    // Start below the center of the circle (8px margin + 20px half height)
    top: '28px', 
    // Extend down. Use a fixed pixel value for all except the last item.
    bottom: isLast ? '50%' : '-20px', 
    zIndex: 0
  };

  return (
    <div 
      // Using Bootstrap classes for layout and positioning context
      className="d-flex flex-column align-items-center flex-shrink-0 me-4 mt-3 position-relative"
      style={{ minWidth: '40px' }} // Ensure marker space is reserved
    >
      {/* Vertical line element */}
      {!isLast && (
        <div style={lineStyle} />
      )}

      {/* The number circle/oval */}
      <div style={markerStyle}>
        {index + 1}
      </div>
    </div>
  );
};