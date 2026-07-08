import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollRefresh() {
  const location = useLocation()

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [location.pathname])
}
