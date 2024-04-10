import { useEffect, useState } from "react"
import logo from "./assets/logo.svg"
import { Observer } from "mobx-react"
import apiExec from "./Api"

function reload(fulltext, onDone) {
  apiExec("users/list", { fulltext }, (res) => {
    onDone(res)
  })
}

function App() {
  const [users, setUsers] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [fulltext, setFulltext] = useState("")
  useEffect(() => {
    reload(fulltext, (data) => {
      setUsers(data)
      setLoaded(true)
    })
  }, [])
  return (
    <Observer>
      {() => (
        <>
          <div>
            <a href="https://navigo3.com/cs/" target="_blank">
              <img src={logo} className="logo" alt="Navigo3 logo" />
            </a>
          </div>
          <input
            placeholder="search..."
            type="text"
            onChange={(e) => {
              setFulltext(e.target.value)
              reload(fulltext, (data) => {
                setUsers(data)
                setLoaded(true)
              })
            }}
          />
          <br />
          <br />
          {!loaded && <div>Loading...</div>}
          <button
            onClick={(e) => {
              setLoaded(false)
              apiExec(
                "user/upsert",
                { name: "Vitek", surname: "Dvorak" },
                (id) => {
                  reload(fulltext, (data) => {
                    setUsers(data)
                    setLoaded(true)
                  })
                }
              )
            }}
          >
            Add user
          </button>
          <table>
            <tr>
              <th>name</th>
              <th>surname</th>
            </tr>
            {users.map((user) => (
              <tr>
                <td>{user.name}</td>
                <td>{user.surname}</td>
              </tr>
            ))}
          </table>
        </>
      )}
    </Observer>
  )
}

export default App
