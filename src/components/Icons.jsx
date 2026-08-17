/* Minimal inline SVG icon set (no emoji). Each takes an optional size prop. */
const base = (size = 18) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
})

export const HeartPulse = ({ size }) => (
  <svg {...base(size)}>
    <path d="M20.8 5.6a5.5 5.5 0 0 0-8.8-1.4L11 5l-1-.8A5.5 5.5 0 0 0 2.2 12l1.3 1.4" />
    <path d="M3.5 13.4H8l1.5-3 2.5 6 2-4 1.2 2h4.3" />
  </svg>
)

export const Book = ({ size }) => (
  <svg {...base(size)}>
    <path d="M4 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-4-2-4 2-4-2z" />
    <path d="M18 3h1a2 2 0 0 1 2 2v14" />
  </svg>
)

export const ClipboardCheck = ({ size }) => (
  <svg {...base(size)}>
    <rect x="8" y="3" width="8" height="4" rx="1" />
    <path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </svg>
)

export const Timer = ({ size }) => (
  <svg {...base(size)}>
    <path d="M10 2h4" />
    <circle cx="12" cy="14" r="8" />
    <path d="M12 14V9" />
  </svg>
)

export const Home = ({ size }) => (
  <svg {...base(size)}>
    <path d="m3 11 9-8 9 8" />
    <path d="M5 10v10h14V10" />
  </svg>
)

export const ChevronRight = ({ size }) => (
  <svg {...base(size)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
)

export const Sun = ({ size }) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

export const Moon = ({ size }) => (
  <svg {...base(size)}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)

export const Menu = ({ size }) => (
  <svg {...base(size)}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

export const Pill = ({ size }) => (
  <svg {...base(size)}>
    <path d="M10.5 20.5a5 5 0 0 1-7-7l6-6a5 5 0 0 1 7 7z" />
    <path d="m8.5 8.5 7 7" />
  </svg>
)

export const Cards = ({ size }) => (
  <svg {...base(size)}>
    <rect x="3" y="5" width="13" height="16" rx="2" />
    <path d="M8 5V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-1" />
  </svg>
)

export const Compare = ({ size }) => (
  <svg {...base(size)}>
    <path d="M4 5h7v14H4zM13 5h7v14h-7z" />
  </svg>
)

export const Route = ({ size }) => (
  <svg {...base(size)}>
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="5" r="2" />
    <path d="M8 19h6a4 4 0 0 0 0-8H10a4 4 0 0 1 0-8h6" />
  </svg>
)

export const Print = ({ size }) => (
  <svg {...base(size)}>
    <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" rx="1" />
  </svg>
)
