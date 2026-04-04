'use client'

import NextImage from 'next/image'
import { useState, useEffect, useRef } from 'react'
import type { ComponentProps } from 'react'

export function SkeletonImage({
  wrapperClassName = '',
  className,
  ...props
}: ComponentProps<typeof NextImage> & { wrapperClassName?: string }) {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true)
  }, [])

  return (
    <div className={`relative ${wrapperClassName}`}>
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: '#14120B' }}
        />
      )}
      <NextImage
        ref={ref}
        className={className}
        {...props}
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

export function SkeletonImg({
  wrapperClassName = '',
  className,
  ...props
}: ComponentProps<'img'> & { wrapperClassName?: string }) {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true)
  }, [])

  return (
    <span className={`relative block ${wrapperClassName}`}>
      {!loaded && (
        <span
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: '#14120B' }}
        />
      )}
      <img
        ref={ref}
        className={className}
        {...props}
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
      />
    </span>
  )
}
