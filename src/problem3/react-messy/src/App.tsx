import { useState } from 'react'
import './App.css'
import { WalletPage } from './WalletPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>React Messy</h1>
      <WalletPage />
    </>
  )
}

export default App
