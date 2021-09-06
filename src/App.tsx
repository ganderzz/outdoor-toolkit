import React from "react";
import "./App.css";
import { db, IGear } from "./data/db";

function asyncUseEffect(callback, dependencies: any[]) {
  React.useEffect(() => {
    (async () => {
      await callback();
    })();
  }, dependencies);
}

function App() {
  const [gear, setGear] = React.useState([]);

  React.useEffect(async () => {
    async function getGear() {
      const gear = await db.gear.toArray();

      setGear(gear);
    }

    getGear();
  }, []);

  const handleChange = (item: IGear, attribute: string) => async (event) => {
    try {
      const updatedObj = { ...item, [attribute]: event.currentTarget.value };

      await db.gear.put(updatedObj);

      setGear(gear.map((item) => (item.id === updatedObj.id ? updatedObj : item)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <header
        style={{ display: "flex", padding: "10px 12px", background: "#333", color: "#FFF" }}
        className="app-header"
      >
        Outdoor Toolkit
      </header>

      <section style={{ padding: 20 }}>
        <form onChange={handleChange}>
          {gear.map((item) => (
            <div key={item.id} style={{ marginTop: 5 }}>
              <label style={{ fontSize: "0.8rem", display: "block", fontWeight: 600 }}>Item Name</label>
              <input type="text" name="item_name" value={item.item_name} onChange={handleChange(item, "item_name")} />
            </div>
          ))}
        </form>
      </section>
    </div>
  );
}

export default App;
