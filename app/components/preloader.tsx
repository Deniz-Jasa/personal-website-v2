'use client'

import { useEffect, useState } from 'react'

type Phase = 'visible' | 'fade' | 'done'

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>('visible')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fade'), 900)
    const t2 = setTimeout(() => setPhase('done'), 1600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'done') return null

  return (
    <>
      <style>{`
        @keyframes cc-pulse {
          0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
          50%       { opacity: 0.5; transform: scale(0.85) rotate(30deg); }
        }
        .cc-icon {
          animation: cc-pulse 1s ease-in-out infinite;
        }
      `}</style>

      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#14120B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: phase === 'fade' ? 'opacity 0.7s ease' : 'none',
        opacity: phase === 'fade' ? 0 : 1,
        pointerEvents: phase === 'fade' ? 'none' : 'all',
      }}>
        <svg className="cc-icon" width="22" height="22" viewBox="0 0 22 22" fill="none">
          {/* 6-arm asterisk like Claude Code's icon */}
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <line
              key={deg}
              x1="11" y1="3" x2="11" y2="19"
              stroke="#D4845F"
              strokeWidth="2"
              strokeLinecap="round"
              transform={`rotate(${deg} 11 11)`}
            />
          ))}
        </svg>
      </div>
    </>
  )
}
