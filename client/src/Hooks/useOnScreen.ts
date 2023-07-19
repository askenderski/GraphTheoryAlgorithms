import { useState, useEffect } from "react";

export default function useOnScreen(ref: React.RefObject<HTMLElement>) {
    const [isIntersecting, setIntersecting] = useState(false)
  
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    )
  
    useEffect(() => {
      observer.observe(ref.current as unknown as Element)
      // Remove the observer as soon as the component is unmounted
      return () => { observer.disconnect() }
    }, [])
  
    return isIntersecting
  }