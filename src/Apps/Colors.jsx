import logo from "./assets/logo.svg";
import { MobxStore } from "./store/MobxStore";
import { Observer } from "mobx-react";
import { transaction } from "mobx";

const store = new MobxStore({});
const data = store.getData();
const keys = Object.keys(data);
function App() {
  return (
    <Observer>
      {() => (
        <>
          <div
            style={
              store.isDirty
                ? {
                    transform: "translateY(30px)",
                    transition: "0.5s ease",
                    userSelect: "none",
                  }
                : undefined
            }
          >
            <a href="https://navigo3.com/cs/" target="_blank">
              <img src={logo} className="logo" alt="Navigo3 logo" />
            </a>
          </div>
          {!store.isLoaded && <p>Loading...</p>}
          {store.isLoaded && (
            <div className="card">
              <button
                onClick={() =>
                  keys.forEach((key) => {
                    transaction(() =>
                      store.setValue(
                        [key],
                        `${Math.floor(Math.random() * 16777215).toString(16)}`
                      )
                    );
                  })
                }
              >
                Add project
              </button>
              <br />
              <br />
              <div>
                {keys.map((key) => {
                  const color = store.getValue([key]);
                  return (
                    <div
                      key={key}
                      style={{
                        fontSize: 24,
                        display: "flex",
                        justifyContent: "center",
                        padding: 5,
                        backgroundColor: store.isChanged([key])
                          ? `#${color}`
                          : undefined,
                      }}
                    >
                      {key}&nbsp;#
                      <input
                        style={{
                          outline: "none",
                          fontSize: 24,
                          background: "transparent",
                          border: "none",
                          borderBottom: "1px solid #212529",
                        }}
                        type="text"
                        value={color}
                        onChange={(e) => store.setValue([key], e.target.value)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </Observer>
  );
}

export default App;
