// Diamond: A classic side-profile diamond cut
export const DiamondIcon = ({ size = 24, color = "currentColor", className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 3h12l4 6-10 12L2 9Z" />
        <path d="M2 9h20" />
        <path d="M12 21V9" />
        <path d="M6 3l5 6" />
        <path d="M18 3l-5 6" />
    </svg>
);

// Band: A clean, concentric representation of a ring shank
export const BandIcon = ({ size = 24, color = "currentColor", className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
    </svg>
);

// Head: A side-profile basket setting holding a stone
export const HeadIcon = ({ size = 24, color = "currentColor", className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {/* Diamond Crown (Top Facets) */}
        <path d="M7 4h10l3.5 3L12 11 3.5 7 7 4z" />
        <path d="M12 4l3.5 3M12 4L8.5 7M3.5 7h17" />

        {/* Diamond Pavilion (Bottom V-Shape) */}
        <path d="M20.5 7L12 21 3.5 7" />

        {/* Curving Prongs/Shank */}
        <path d="M5 8.5C3 12 4 16 7 19.5" />
        <path d="M19 8.5C21 12 20 16 17 19.5" />

        {/* Internal Basket Details */}
        <path d="M9.5 13.5L12 17l2.5-3.5" />
        <path d="M12 11v6" />
    </svg>
);

// Quilt: A swatch showing a diagonal criss-cross quilted pattern 
export const QuiltIcon = ({ size = 24, color = "currentColor", className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        {/* Diagonal cuts for the quilt pattern */}
        <path d="M9 3l12 12" />
        <path d="M3 9l12 12" />
        <path d="M15 3L3 15" />
        <path d="M21 9l-12 12" />
    </svg>
);

export const DetailsIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="1.75" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Page Outline with Folded Corner */}
    <path d="M5 2h9l5 5v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
    <path d="M14 2v5h5" />
    <path d="M7 2v20" />

    {/* Top Diamond Bullet & Line */}
    <path d="M9.5 6.5L10.5 5h2l1 1.5-2 2.5z" />
    <path d="M15.5 6h2.5" />

    {/* Middle Bullet & Line */}
    <path d="M9.5 11.5L10.5 10h2l1 1.5-2 2.5z" />
    <path d="M15.5 11h2.5" />

    {/* Bottom Keyhole Bullet & Line */}
    <circle cx="11" cy="16.5" r="1" />
    <path d="M10.2 17.5l-.7 2.5h3l-.7-2.5" />
    <path d="M14 18.5h4" />

    {/* Magnifying Glass Overlay */}
    <circle cx="14.5" cy="14.5" r="2.5" />
    <path d="M16.5 16.5L19 19" />
  </svg>
);