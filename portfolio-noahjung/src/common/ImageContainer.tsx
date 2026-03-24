import React from "react"

interface ImageContainerProps {
    src: string;
    size?: number;
}

const ImageContainer: React.FC<ImageContainerProps> = ({
    src,
    size = DEFAULT_SIZE
}) => {
    if (!src) return null

    const filterId = "brush-filter"
    const maskId = "brush-mask"

    return (
        <div style={{ width: size, height: size, position: 'relative' }}>
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <filter id={filterId}>
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
                    </filter>

                    <mask id={maskId}>
                        <rect
                            x="10"
                            y="10"
                            width={size - 20}
                            height={size - 20}
                            fill="white"
                            filter={`url(#${filterId})`}
                        />
                    </mask>
                </defs>
            </svg>
            <img
                src={src}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    objectFit: "cover",
                    WebkitMaskImage: `url(#${maskId})`,
                    maskImage: `url(#${maskId})`
                }}
            />
        </div>
    )
}

const DEFAULT_SIZE = 300

export default ImageContainer