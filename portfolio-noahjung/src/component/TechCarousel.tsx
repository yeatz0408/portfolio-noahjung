import React from "react"
import java from "../assets/img/tech/java.jpeg"
import springboot from "../assets/img/tech/spring_boot.png"
import javascript from "../assets/img/tech/javascript.png"
import typescript from "../assets/img/tech/typescript.png"
import react from "../assets/img/tech/react.png"
import postgresql from "../assets/img/tech/postgresql.jpg"
import elasticsearch from "../assets/img/tech/elasticsearch.png"
import docker from "../assets/img/tech/docker.png"
import mybatis from "../assets/img/tech/mybatis.jpg"
import zustand from "../assets/img/tech/zustand.png"

type SizedImagesProps = {
    src: string;
    width?: number;
    height?: number;
}

const TechCarousel: React.FC = () => {
    const items = [
        { src: java, width: 75, height: 100 },
        { src: springboot, width: 210, height: 90 },
        { src: javascript, width: 90, height: 90 },
        { src: typescript, width: 140, height: 80 },
        { src: react, width: 140, height: 90 },
        { src: postgresql, width: 130, height: 105 },
        { src: elasticsearch, width: 130, height: 90 },
        { src: mybatis, width: 150, height: 90 },
        { src: zustand, width: 150, height: 90 },
        { src: docker, width: 150, height: 90 },
    ]

    const loopItems = [...items, ...items]

    return (
        <div className="relative overflow-hidden">
            <style>{`
                @keyframes techScroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }

                .tech-carousel-track {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    width: max-content;
                    animation: techScroll 30s linear infinite;
                }

                .tech-carousel-item img {
                    display: block;
                    object-fit: contain;
                }
            `}</style>

            <div className="tech-carousel-track">
                {loopItems.map((item, idx) => (
                    <div className="tech-carousel-item" key={`${idx}-${item.src}`}>
                        <SizedImages src={item.src} width={item.width} height={item.height} />
                    </div>
                ))}
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
