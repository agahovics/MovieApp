import Image from "next/image";
import mypic from "../img/hero3.png";

export const Hero = () => {

  return (
    <>
      <div className="hero-space">
        <Image src={mypic} />
        <div className="hero-title">
          <h2
            style={{
              fontSize: "70px",
              textShadow:
                "0px 0px 5px blue, 0px 0px 10px blue, 0px 0px 10px blue,0px 0px 20px #b393d3",
            }}
          >
            LET'S MOVIE!
          </h2>
          <p
            style={{
              fontSize: "40px",
              textShadow:
                "0px 0px 5px blue, 0px 0px 10px blue, 0px 0px 10px blue,0px 0px 20px #b393d3",
            }}
          >
            Thousands of movies are waiting for you...
          </p>
        </div>
      </div>
    </>
  );
};
