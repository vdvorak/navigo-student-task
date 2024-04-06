import logo from './assets/logo.svg'
import { MobxStore } from './store/MobxStore'
import { Observer } from 'mobx-react'
import { users } from './store/Users'
import { transaction } from 'mobx'

const store = new MobxStore(users)
function App() {


  const data = store.getData()

  const keys = Object.keys(data)

  return (
    <Observer>
      {() => <>
        <div>
          <a href="https://navigo3.com/cs/" target="_blank">
            <img src={logo} className="logo" alt="Navigo3 logo" />
          </a>
        </div>
        <div className="card">
          <button onClick={() => keys.forEach((key) => {
            console.log("key", key);
            transaction(() => store.setValue([key], `#${Math.floor(Math.random() * 16777215).toString(16)}`))
          })}>
            Přidat projeckt
          </button>
          {keys.map((key) => <h2 key={key} style={{ padding: 5, backgroundColor: store.isChanged([key]) ? `#${Math.floor(Math.random() * 16777215).toString(16)}` : undefined }}>{key}&nbsp;{store.getValue([key])}</h2>)}
        </div>
      </>}
    </Observer>
  )
}

export default App
