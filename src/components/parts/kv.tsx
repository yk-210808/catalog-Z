import * as React from 'react'

interface KvProps {
  children?: React.ReactNode
}

export const Kv: React.FC<KvProps> = ({ children }) => {
  return (
    <div className="tm-hero d-flex justify-content-center align-items-center background-position-center" data-parallax="scroll" style={{ background: "url(/images/hero.jpg) center / cover" }}>
      { children }
    </div>
  )
}