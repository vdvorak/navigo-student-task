import { useEffect, useState } from "react"
import logo from "./assets/logo.svg"
import { Observer } from "mobx-react"
import apiExec from "./Api/Api"

function reload(fulltext, onDone) {
  apiExec("users/list", { fulltext }, res => {
    onDone(res)
  })
}

function App() {
  const [userData, setData] = useState(true)
  useEffect(() => {
    apiExec("user/upsert", { name: "", surname: "Dvorak", hourlyRate: 500 }, data =>
      apiExec("user/get", data, user => setData(user))
    )
  }, [])

  return (
    <>
      <div>
        <a href="https://navigo3.com/cs/" target="_blank">
          <img src={logo} className="logo" alt="Navigo3 logo" />
        </a>
      </div>

      {!userData && <div>Loading...</div>}
      {userData && (
        <div>
          <div>{userData.name}</div>
          <div>{userData.surname}</div>
          <div>{userData.email}</div>
          <div>{userData.hourlyRate}</div>
          <button
            onClick={e => {
              e.preventDefault()
              apiExec("user/upsert", { ...userData, hourlyRate: userData.hourlyRate + 300 }, data =>
                apiExec("user/get", data, setData)
              )
            }}
          >
            Upgrade
          </button>
        </div>
      )}
    </>
  )
}

export default App
