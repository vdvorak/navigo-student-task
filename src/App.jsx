import { useEffect, useState } from 'react'
import logo from './assets/logo.svg'
import './App.css'
import { Api } from './Api'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const api = new Api()
    api.execute(
      'user/upsert',
      { name: 'Jaroslav', surname: 'Kuboš', hourlyRate: 300 },
      (res) => {}
    )

    api.execute(
      'user/upsert',
      { name: 'Vítek', surname: 'Kuboš', hourlyRate: 300 },
      (res) => {}
    )
    api.execute('users/list', { fulltext: 'Kuboš' }, (res) => {
      console.log(res)
    })
  }, [])

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
