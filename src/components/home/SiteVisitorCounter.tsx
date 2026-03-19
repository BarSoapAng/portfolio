"use client"

import { useEffect, useState } from 'react'

const VISITOR_COUNTER_KEY = 'portfolio-site-visitor-count'

export default function SiteVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)

  useEffect(() => {
    const storedCount = window.localStorage.getItem(VISITOR_COUNTER_KEY)
    const parsedCount = Number.parseInt(storedCount ?? '0', 10)
    const safeCount = Number.isFinite(parsedCount) && parsedCount > 0 ? parsedCount : 0
    const nextCount = safeCount + 1

    window.localStorage.setItem(VISITOR_COUNTER_KEY, String(nextCount))

    const timeoutId = window.setTimeout(() => {
      setVisitorCount(nextCount)
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="w-full border-2 border-green-800 bg-green-200 px-3 py-2 font-mono text-black">
      <div className="group">
        <p className="cursor-default text-sm">
          Visitor #{visitorCount === null ? '...' : visitorCount.toLocaleString()}
        </p>
        <p className="max-h-0 overflow-hidden text-[10px] text-red-1 opacity-0 transition-all duration-300 group-hover:mt-1 group-hover:max-h-10 group-hover:opacity-100">
          Easter egg: secret visitor society says hello.
        </p>
      </div>
    </div>
  )
}
