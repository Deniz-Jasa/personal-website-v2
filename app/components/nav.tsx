'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const FILTER_ID = 'lg-nav-filter'
const MAP_W = 512
const MAP_H = 80

function buildDisplacementMap(): string {
  const canvas = document.createElement('canvas')
  canvas.width = MAP_W
  canvas.height = MAP_H
  const ctx = canvas.getContext('2d')!
  const img = ctx.createImageData(MAP_W, MAP_H)

  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      const nx = (x / MAP_W) * 2 - 1
      const ny = (y / MAP_H) * 2 - 1
      const dist = Math.sqrt(nx * nx + ny * ny)
      const mag = dist || 1e-5
      const strength = Math.pow(Math.min(1, dist * 1.1), 2.0) * 0.6
      const r = Math.round(128 + (nx / mag) * strength * 127)
      const g = Math.round(128 + (ny / mag) * strength * 127)
      const i = (y * MAP_W + x) * 4
      img.data[i]     = Math.max(0, Math.min(255, r))
      img.data[i + 1] = Math.max(0, Math.min(255, g))
      img.data[i + 2] = 128
      img.data[i + 3] = 255
    }
  }

  ctx.putImageData(img, 0, 0)
  return canvas.toDataURL()
}

const navLinks = [
  { href: '/', label: 'home', exact: true },
  { href: '/blog', label: 'blog', exact: false },
  { href: '/deniz_jasarbasic_resume.pdf', label: 'resume', external: true },
]

export function Navbar() {
  const [mapUrl, setMapUrl] = useState('')
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [pill, setPill] = useState({ left: 0, width: 0, height: 0, top: 0, ready: false })

  useEffect(() => {
    setMapUrl(buildDisplacementMap())
  }, [])

  useLayoutEffect(() => {
    const activeHref = navLinks.find(({ href, exact, external }) => {
      if (external) return false
      return exact ? pathname === href : pathname.startsWith(href)
    })?.href ?? '/'

    const el = itemRefs.current[activeHref]
    const nav = navRef.current
    if (!el || !nav) return

    const navRect = nav.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    setPill({
      left: elRect.left - navRect.left,
      top: elRect.top - navRect.top,
      width: elRect.width,
      height: elRect.height,
      ready: true,
    })
  }, [pathname])

  const backdropFilter = mapUrl
    ? `url(#${FILTER_ID}) blur(6px) brightness(1.07)`
    : 'blur(16px) brightness(1.05)'

  return (
    <aside className="mb-12 md:mb-16 tracking-tight">
      {mapUrl && (
        <svg
          aria-hidden="true"
          style={{ position: 'fixed', width: 0, height: 0, overflow: 'hidden' }}
        >
          <defs>
            <filter
              id={FILTER_ID}
              x="-15%"
              y="-60%"
              width="130%"
              height="220%"
              colorInterpolationFilters="sRGB"
            >
              <feImage href={mapUrl} result="dmap" preserveAspectRatio="none" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="dmap"
                scale="24"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}

      <div className="fixed bottom-6 left-0 right-0 z-50 px-4 w-fit mx-auto">
        <nav
          ref={navRef}
          className="flex flex-row items-center relative fade md:overflow-auto scroll-pr-6 md:relative px-3 py-2 gap-1"
          id="nav"
          style={{
            background: 'rgba(20, 18, 11, 0.72)',
            backdropFilter,
            WebkitBackdropFilter: backdropFilter,
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.3), 0 4px 24px rgba(0,0,0,0.4)',
          }}
        >
          {/* Sliding pill */}
          <div
            aria-hidden="true"
            className="absolute rounded-full bg-white/10 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              left: pill.left,
              top: pill.top,
              width: pill.width,
              height: pill.height,
              opacity: pill.ready ? 1 : 0,
            }}
          />

          {navLinks.map(({ href, label, external }) =>
            external ? (
              <a
                key={href}
                ref={(el) => { itemRefs.current[href] = el }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 px-3 py-1 rounded-full text-sm"
              >
                {label}
              </a>
            ) : (
              <Link
                key={href}
                ref={(el) => { itemRefs.current[href] = el }}
                href={href}
                className="relative z-10 px-3 py-1 rounded-full text-sm"
              >
                {label}
              </Link>
            )
          )}
        </nav>
      </div>
    </aside>
  )
}
