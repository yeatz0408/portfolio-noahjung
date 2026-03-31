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
        <div className="gap-1 overflow-x-auto overflow-y-hidden">
            <div className="inline-block">
                <SizedImages
                    src={java}
                    width={75}
                    height={100} />
            </div>
            <div className="inline-block">
                <SizedImages
                    src={springboot}
                    width={210}
                    height={90} />
            </div>
            <div className="inline-block">
                <SizedImages
                    src={javascript}
                    width={90}
                    height={90} />
            </div>
            <div className="inline-block"
                style={{ transform: 'translate(-60px, 35px)' }}>
                <SizedImages
                    src={typescript}
                    width={275}
                    height={160} />
            </div>
            <div className="inline-block"
                style={{ transform: 'translate(-150px)' }}>
                <SizedImages
                    src={react}
                    width={140}
                    height={90} />
            </div>
            <div className="inline-block"
                style={{ transform: 'translate(-165px, 10px)' }}>
                <SizedImages
                    src={postgresql}
                    width={150}
                    height={100} />
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
