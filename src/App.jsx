import { useState } from 'react'
import logo from './assets/logo.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://navigo3.com/cs/" target="_blank">
          <img src={logo} className="logo" alt="Navigo3 logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Počet projektů {count}
        </button>
      </div>
    </>
  )
}

export default App
