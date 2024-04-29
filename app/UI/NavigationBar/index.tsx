import { ORANGE, VOILET } from '@/app/colors'
import React from 'react'

const NavigationBar = () => {
  return (
    <div style={{
      padding: 16,
      background: VOILET[100]
    }}>
      <h3 style={{
        fontSize: "2.5rem"
      }}>Yash <span style={{
        color: ORANGE[100]
      }}>Rawat</span></h3>
      
    </div>
  )
}

export default NavigationBar