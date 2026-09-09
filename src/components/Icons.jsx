import React from 'react'

const base = {
  width: 28,
  height: 28,
  viewBox: '0 0 28 28',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconPaw(props) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="14" cy="18" rx="6.2" ry="4.8" />
      <ellipse cx="6.5" cy="10.5" rx="2.6" ry="3.3" />
      <ellipse cx="21.5" cy="10.5" rx="2.6" ry="3.3" />
      <ellipse cx="10.5" cy="6" rx="2.3" ry="3" />
      <ellipse cx="17.5" cy="6" rx="2.3" ry="3" />
    </svg>
  )
}

export function IconBowl(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 13h20a1 1 0 0 1 1 1c0 5.2-4.7 9.4-11 9.4S3 19.2 3 14a1 1 0 0 1 1-1Z" />
      <path d="M8 13c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M14 4v3" />
    </svg>
  )
}

export function IconScissors(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="7" cy="7" r="2.6" />
      <circle cx="7" cy="21" r="2.6" />
      <path d="M9.2 8.7 22 21" />
      <path d="M9.2 19.3 22 7" />
    </svg>
  )
}

export function IconCross(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="21" height="21" rx="6" />
      <path d="M14 9v10M9 14h10" />
    </svg>
  )
}

export function IconHouse(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 13.5 14 5l10 8.5" />
      <path d="M6.5 11.5V23h15V11.5" />
      <path d="M11.5 23v-6.5h5V23" />
    </svg>
  )
}

export function IconLeash(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6c6 0 4 8 10 8s4-8 10-8" />
      <circle cx="24" cy="6" r="2" />
      <ellipse cx="7" cy="20" rx="5" ry="4" />
      <path d="M9 17.2 12.5 14" />
    </svg>
  )
}

export function IconStar(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14 4.5 17 11l7 1-5.2 4.9L20.2 24 14 20.3 7.8 24l1.4-7.1L4 12l7-1Z" />
    </svg>
  )
}

export function IconClock(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="14" cy="14" r="10.5" />
      <path d="M14 8v6l4.2 2.4" />
    </svg>
  )
}
