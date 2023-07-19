import { Card } from "primereact/card";
import { useEffect, useState } from "react";

export const Contents = ({ searchKeyword }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (searchKeyword && searchKeyword.length > 0) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=15a683b1dfb1b4f2a178b3e79be3041d&include_adult=false&language=en-US&page=1&query=${searchKeyword}`,
        options
      )
        .then((response) => response.json())
        .then((response) => setMovies(response.results))
        .catch((err) => console.error(err));
    } else {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      };

      fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=15a683b1dfb1b4f2a178b3e79be3041d",
        options
      )
        .then((response) => response.json())
        .then((response) => setMovies(response.results))
        .catch((err) => console.error(err));
    }
  }, [searchKeyword]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=15a683b1dfb1b4f2a178b3e79be3041d",
      options
    )
      .then((response) => response.json())
      .then((response) => setMovies(response.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="contents">
        <div style={{ color: "white" }} className="cards-title">
          <h3>{searchKeyword ? "Search Results" : "Popular Movies"}</h3>
        </div>
        <div className="cards">
          {movies.map((x) => {
            return (
              <a
                href={`/movie/${x.original_title
                  .toLowerCase()
                  .replaceAll(/ /g, "-")
                  .replaceAll(/[^\w-]+/g, "")}/${x.id}`}
              >
                <Card
                  title={x.original_title}
                  subTitle={x.vote_average}
                  className="md:w-25rem"
                >
                  <img
                    src={"https://image.tmdb.org/t/p/w200/" + x.poster_path}
                  ></img>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};
