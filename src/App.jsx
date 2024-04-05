import logo from './assets/logo.svg'
import { MobxStore } from './store/MobxStore'
import { Observer } from 'mobx-react'
import { users } from './store/Users'

const store = new MobxStore(users)
function App() {

  console.log(Math.floor(Math.random() * 16777215).toString(16));


  return (
    <Observer>
      {() => <>
        <div>
          <a href="https://navigo3.com/cs/" target="_blank">
            <img src={logo} className="logo" alt="Navigo3 logo" />
          </a>
        </div>
        <div className="card">
          <button onClick={() => store.getData().forEach((user, i) => store.setValue([i, "age"], user.age + 1))}>
            +
          </button>
          &nbsp;
          &nbsp;
          &nbsp;
          <button onClick={() => store.getData().forEach((user, i) => store.setValue([i, "age"], user.age - 1))}>
            -
          </button>

          {store.getData().map((user, i) => <h2 style={{ padding: 5, backgroundColor: store.isChanged([i, "age"]) ? `#${Math.floor(Math.random() * 16777215).toString(16)}` : undefined }}>{i}.&nbsp;{user.name} {user.age}</h2>)}
        </div>
      </>}
    </Observer>
  )
}

export default App
