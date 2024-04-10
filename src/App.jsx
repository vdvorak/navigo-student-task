import { useState } from "react"
import API from "./Api"
import logo from "./assets/logo.svg"
import { Observer } from "mobx-react"

function App() {
  const [users, setUsers] = useState({ data: [], loaded: false })
  API.execute("users/list", {}, (res) => {
    setUsers({ data: res, loaded: true })
  })
  return (
    <Observer>
      {() => (
        <>
          <div>
            <a href="https://navigo3.com/cs/" target="_blank">
              <img src={logo} className="logo" alt="Navigo3 logo" />
            </a>
          </div>

          {!users.loaded && <div>Loading...</div>}
        </>
      )}
    </Observer>
  )
}

export default App
