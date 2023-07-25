import { InputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";
import { useState, useEffect } from "react";

export const Header = (props) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  function onKeyUp(e) {
    if (e.keyCode == 13) {
      props.onSearch(query);
    }
  }

  useEffect(() => {
    console.log(JSON.stringify({ query }));
  }, [query]);

  const getMoviesWithQuery = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=15a683b1dfb1b4f2a178b3e79be3041d&include_adult=false&language=en-US&page=1&query=${query}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setMovies(response.results))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="navbar flex-column md:flex-row">
        <a href="http://localhost:3000" style={{ textDecoration: "none"}}>
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
          <AutoComplete
            style={{ height: "fit-content" }}
            inputStyle={{ width: "360px" }}
            value={query}
            suggestions={movies}
            completeMethod={getMoviesWithQuery}
            onChange={(e) => {
              if (typeof e.target.value === "string") {
                setQuery(e.target.value);
              } else {
                setQuery(e.target.value.title);
              }
            }}
            itemTemplate={(suggestion) => {
              return (
                <a
                  href={`/movie/${suggestion.original_title
                    .toLowerCase()
                    .replaceAll(/ /g, "-")
                    .replaceAll(/[^\w-]+/g, "")}/${suggestion.id}`}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{ borderRadius: "8px" }}
                      src={
                        "https://image.tmdb.org/t/p/h100/" +
                        suggestion.poster_path
                      }
                    />
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        width: "360px",
                        whiteSpace: "break-spaces",
                      }}
                    >
                      {suggestion.title}
                    </p>
                  </div>
                </a>
              );
            }}
          />
        )}
      </div>
    </>
  );
};
