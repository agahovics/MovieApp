import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Header } from "@/components/Header";

function DetailMovie(props) {
  let router = useRouter();
  let id = router.query.id;

  const [detail, setDetail] = useState(undefined);

  useEffect(() => {
    if (id) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=15a683b1dfb1b4f2a178b3e79be3041d`,
        options
      )
        .then((response) => response.json())
        .then((response) => setDetail(response))
        .catch((err) => console.error(err));
    }
  }, [router.query.id]);

  return (
    <>
      <Header
        search={false}
        onSearch={(data) => {
          setKeyword(data);
        }}
      />

      <div className="p-4 shadow-2 border-round">
        <div className="flex flex-column-reverse md:flex-row">
          <img
            src={`https://image.tmdb.org/t/p/w500${detail?.poster_path}`}
            alt=""
            className="w-1/6"
          />
          <div className="ml-4 ">
            <h1 className="text-5xl text-white font-bold">{detail?.title}</h1>

            <div className="flex flex-wrap gap-3">
              <Chip label={"Vote: " + detail?.vote_average} />
              <Chip label={"Release Date: " + detail?.release_date} />
              <Chip label={detail?.status} />
            </div>
            <p className="text-white mt-4">{detail?.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailMovie;
