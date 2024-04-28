import React from 'react'
import NavigationBar from './UI/NavigationBar'
import { BLUE } from './colors'

const HomePage = () => {
  return (
    <div style={{
      background: BLUE[100],
      minHeight:"100vh"
    }}>
    <NavigationBar/>
    </div>
  )
}

export default HomePage