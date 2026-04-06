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
    verticalGap?: number;
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
        <div className="relative overflow-hidden mx-[50px]">
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
                    <div key={`${idx}-${item.topText}-${item.mainText}-${item.subText}`}
                        className="mt-7.5 ml-12.5">
                        <SizedTexts
                            topText={item.topText} topTextSize={item.topTextSize}
                            mainText={item.mainText} mainTextSize={item.mainTextSize}
                            subText={item.subText} subTextSize={item.subTextSize}
                            verticalGap={item.verticalGap}
                            color={item.color} />
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
    verticalGap = 5,
    color = "black"
}: SizedTextProps) {
    return (
        <div style={{ color, display: 'flex', flexDirection: 'column' }}>
            <div style={{
                fontSize: `${topTextSize}px`,
                lineHeight: 1,
                marginBottom: `${verticalGap}px`,
                fontWeight: 'bold',
                letterSpacing: '0.1em',
            }}>
                {topText}
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '4px',
                transform: 'scaleY(1.2)',
                transformOrigin: 'bottom left'
            }}>
                <span style={{
                    fontSize: `${mainTextSize}px`,
                    fontWeight: '800',
                    lineHeight: 0.9
                }}>
                    {mainText}
                </span>
                <span style={{
                    fontSize: `${subTextSize}px`,
                    opacity: 0.8,
                    fontWeight: 'bold'
                }}>
                    {subText}
                </span>
            </div>
        </div>
    )
}

export default TechCarousel
