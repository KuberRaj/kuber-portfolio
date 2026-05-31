import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MotionConfig } from "framer-motion"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Setting reducedMotion to "never" forces animations to play */}
    <MotionConfig reducedMotion="never">
      <App />
    </MotionConfig>
  </React.StrictMode>,
)
