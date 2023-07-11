import { InputText } from "primereact/inputtext";
import { useState, useEffect } from "react";

export const Header = (props) => {
  const [query, setQuery] = useState("");

  function onKeyUp(e) {
    if (e.keyCode == 13) {
      props.onSearch(query);
    }
  }
  return (
    <>
      <div className="navbar">
        <a href="http://localhost:3000" style={{ textDecoration: "none" }}>
          <h1
            style={{
              filter: "drop-shadow(8px 5px 5px blue)",
              color: "white",
              fontFamily: "Fontdiner Swanky,cursive",
            }}
          >
            MovieApp
          </h1>
        </a>
        {props.search && (
          <InputText
            style={{ width: "600px", height: "50px", marginTop: "20px" }}
            placeholder="Search Movies"
            value={query}
            onKeyUp={onKeyUp}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        )}
      </div>
    </>
  );
};
