import type { ReactNode, SVGProps } from 'react'

export type IconName =
  | 'bolt'
  | 'file'
  | 'video'
  | 'calculator'
  | 'qrCode'
  | 'link'
  | 'receipt'
  | 'image'
  | 'type'
  | 'code'
  | 'penTool'
  | 'shield'
  | 'smartphone'
  | 'scissors'
  | 'rotate'
  | 'folder'
  | 'copy'
  | 'settings'
  | 'search'
  | 'mapPin'
  | 'user'
  | 'check'
  | 'x'
  | 'warning'
  | 'printer'
  | 'box'
  | 'scale'
  | 'building'
  | 'rocket'
  | 'download'
  | 'globe'
  | 'message'
  | 'play'
  | 'music'
  | 'camera'
  | 'plus'
  | 'arrowRight'
  | 'chevronDown'

const iconContent: Record<IconName, ReactNode> = {
  bolt: <path d="m13 2-3 8H4l7 12 1-9h6L13 2Z" />,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></>,
  video: <><rect x="3" y="5" width="13" height="14" rx="2" /><path d="m16 10 5-3v10l-5-3" /></>,
  calculator: <><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M8 6h8v4H8zM8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" /></>,
  qrCode: <><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM18 18h3v3h-3zM18 14h3M14 18v3" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
  receipt: <><path d="M4 2v20l3-2 3 2 3-2 3 2 4-2V2l-4 2-3-2-3 2-3-2-3 2Z" /><path d="M8 8h8M8 12h8M8 16h4" /></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></>,
  type: <><path d="M4 7V4h16v3M12 4v16M8 20h8" /></>,
  code: <><path d="m8 17-5-5 5-5M16 7l5 5-5 5M14 4l-4 16" /></>,
  penTool: <><path d="m12 19 7-7 3 3-7 7-3-3Z" /><path d="m18 13-3-3M2 22l6-2 11-11a2.12 2.12 0 0 0-3-3L5 17l-3 5ZM2 22l3-5" /></>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  smartphone: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></>,
  scissors: <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="m8.1 8.1 12.8 12.8M14 6l-3.5 3.5M8.1 15.9 12 12" /></>,
  rotate: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2" /></>,
  folder: <><path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /></>,
  copy: <><rect x="8" y="8" width="13" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
  settings: <><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a2 2 0 0 0-3.4 1.4v.2a2 2 0 1 1-4 0v-.2a2 2 0 0 0-3.4-1.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a2 2 0 0 0-1.4-3.4h-.2a2 2 0 1 1 0-4h.2a2 2 0 0 0 1.4-3.4l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a2 2 0 0 0 3.4-1.4v-.2a2 2 0 1 1 4 0v.2a2 2 0 0 0 3.4 1.4l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a2 2 0 0 0 1.4 3.4h.2a2 2 0 1 1 0 4h-.2a2 2 0 0 0-1.4 3.4Z" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  mapPin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  x: <path d="m6 6 12 12M18 6 6 18" />,
  warning: <><path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>,
  printer: <><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6zM18 12h.01" /></>,
  box: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="M3 8v9l9 5 9-5V8M12 13v9" /></>,
  scale: <><path d="m16 16 3-8 3 8a5 5 0 0 1-6 0ZM2 16l3-8 3 8a5 5 0 0 1-6 0ZM12 3v18M5 8h14M8 21h8" /></>,
  building: <><path d="M3 21h18M5 21V5l7-3 7 3v16M9 9h.01M15 9h.01M9 13h.01M15 13h.01M10 21v-4h4v4" /></>,
  rocket: <><path d="M4.5 16.5c-1.5 1.3-2 4.5-2 4.5s3.2-.5 4.5-2c.7-.8.7-2 0-2.7a2 2 0 0 0-2.5.2Z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.5A12 12 0 0 1 22 2c0 2.8-.8 7.5-6.5 11A22 22 0 0 1 12 15Z" /><path d="M9 12H5s.5-3 3.5-4.5M12 15v4s3-.5 4.5-3.5" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></>,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></>,
  message: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" /></>,
  play: <><path d="m7 4 14 8-14 8V4Z" /></>,
  music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
  camera: <><path d="M14 5h-4l-2 2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2-2Z" /><circle cx="12" cy="13" r="3" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  arrowRight: <><path d="M5 12h14M12 5l7 7-7 7" /></>,
  chevronDown: <path d="m6 9 6 6 6-6" />,
}

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  title?: string
}

export function Icon({ name, className = 'h-5 w-5', title, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      aria-label={title}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {iconContent[name]}
    </svg>
  )
}
