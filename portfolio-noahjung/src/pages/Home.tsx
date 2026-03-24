import React from "react"
import fuji from "../assets/img/fuji.jpg"
import ImageContainer from "../common/ImageContainer"

const Home: React.FC = () => {
    return (
        <div>
            <h1>Noah Jung</h1><br />
            Fullstack Web Developer
            <div className="w-full flex justify-center">
                <ImageContainer src={fuji} size={400} />
            </div>

        </div>
    )
}

export default Home