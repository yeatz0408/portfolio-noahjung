import React from "react"
import java from "../assets/img/tech/java.jpeg"
import springboot from "../assets/img/tech/spring_boot.png"
import javascript from "../assets/img/tech/javascript.png"
import typescript from "../assets/img/tech/typescript.png"
import react from "../assets/img/tech/react.png"
import postgresql from "../assets/img/tech/postgresql.jpg"

type SizedImagesProps = {
    src: string;
    width?: number;
    height?: number;
}

const TechCarousel: React.FC = () => {
    return (
        <div className="flex items-center overflow-x-auto overflow-y-hidden">
            <SizedImages
                src={java}
                width={75}
                height={100} />
            <SizedImages
                src={springboot}
                width={210}
                height={90} />
            <SizedImages
                src={javascript}
                width={90}
                height={90} />
            <div
                style={{ transform: 'translate(-60px, 0px)' }}>
                <SizedImages
                    src={typescript}
                    width={275}
                    height={160} />
            </div>
            <div
                style={{ transform: 'translate(-150px)' }}>
                <SizedImages
                    src={react}
                    width={140}
                    height={90} />
            </div>
            <div
                style={{ transform: 'translate(-165px)' }}>
                <SizedImages
                    src={postgresql}
                    width={150}
                    height={105} />
            </div>
        </div>
    )
}

function SizedImages({ src,
    width = 300,
    height = 300 }: SizedImagesProps
) {
    return (
        <img
            src={src}
            style={{
                width,
                height,
            }}
        />
    )
}

export default TechCarousel
