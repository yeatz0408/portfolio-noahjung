import { useMemo } from "react"

export type SizedImageProps = {
    src: string;
    width?: number;
    height?: number;
}

export type SizedTextProps = {
    topText: string;
    topTextSize?: number;
    mainText: string;
    mainTextSize?: number;
    subText: string;
    subTextSize?: number;
    color?: string;
}

type TechCarouselProps = {
    sizedImagesProps?: SizedImageProps[]
    sizedTextProps?: SizedTextProps[]
}

const TechCarousel = ({
    sizedImagesProps: sizedImagesProp,
    sizedTextProps: sizedTextProps
}: TechCarouselProps) => {

    const imageItems = useMemo(() => {
        if (!sizedImagesProp) return undefined
        return [...sizedImagesProp, ...sizedImagesProp]
    }, [sizedImagesProp])

    const textItems = useMemo(() => {
        if (!sizedTextProps) return undefined
        return [...sizedTextProps, ...sizedTextProps]
    }, [sizedTextProps])

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
                {imageItems && imageItems.map((item, idx) => (
                    <div className="tech-carousel-item" key={`${idx}-${item.src}`}>
                        <SizedImages src={item.src} width={item.width} height={item.height} />
                    </div>
                ))}
                {textItems && textItems.map((item, idx) => (
                    <div key={`${idx}-${item.topText}-${item.mainText}-${item.subText}`}>
                        <SizedTexts topText={item.topText} mainText={item.mainText} subText={item.subText} />
                    </div>
                ))}
            </div>
        </div>
    )
}

function SizedImages({ src,
    width = 300,
    height = 300 }: SizedImageProps
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

function SizedTexts({
    topText,
    topTextSize = 10,
    mainText,
    mainTextSize = 20,
    subText,
    subTextSize = 10,
    color = "black"
}: SizedTextProps) {
    return (<>
        <div>
            <div>{topText}</div>
            <div>
                <span>{mainText}</span>
                <span>{subText}</span>
            </div>
        </div>
    </>)
}

export default TechCarousel
