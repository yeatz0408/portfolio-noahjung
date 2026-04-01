import React from "react"
import fuji from "../assets/img/fuji.jpg"
import ImageContainer from "../common/ImageContainer"
import TechCarousel from "../component/TechCarousel"

const Home: React.FC = () => {
    return (
        <div className="pt-10">
            <h1>Noah Jung</h1><br />
            <h2>Fullstack Web Developer</h2><br />
            <div className="w-full flex justify-center">
                <ImageContainer src={fuji} size={350} />
            </div>
            <div className="mx-20 mt-20">
                <TechCarousel />
            </div>

        </div>
    )
}

export default Home