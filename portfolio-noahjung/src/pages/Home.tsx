import React from "react"
import fuji from "../assets/img/fuji.jpg"
import ImageContainer from "../common/ImageContainer"
import TechCarousel from "../component/TechCarousel"

const Home: React.FC = () => {
    return (
        <div className="pt-10">
            {fadeInCSS}
            <h1 className="fadeIn-img">Noah Jung</h1><br />
            <h2 className="fadeIn-img">Fullstack Web Developer</h2><br />
            <div className="w-full flex justify-center">
                <ImageContainer src={fuji} size={450} />
            </div>
            <div className="mx-20 mt-10">
                <TechCarousel />
            </div>

        </div>
    )
}

const fadeInCSS = (
    <style>
        {`
      .fadeIn-img {
        opacity: 0;
        animation: fadeIn 2s ease-in;
        animation-fill-mode: forwards;
      }

      @keyframes fadeIn {
        0%, 100% { opacity: 0; }
        100% { opacity: 1; }
      }
    `}
    </style>
);

export default Home


