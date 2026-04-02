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
            <svg width="0" height="0">
                <defs>
                    <filter id={filterId}>
                        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" result="noise" />
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
            {fadeInCSS}
            <img
                src={src}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    objectFit: "cover",
                    WebkitMaskImage: `url(#${maskId})`,
                    maskImage: `url(#${maskId})`
                }}
                className="fadeIn-img"
            />
        </div>
    )
}

const DEFAULT_SIZE = 300

const fadeInCSS = (
    <style>
        {`
      .fadeIn-img {
        opacity: 0;
        animation: fadeIn 5s ease-in;
        animation-fill-mode: forwards;
      }

      @keyframes fadeIn {
        0%, 100% { opacity: 0; }
        100% { opacity: 1; }
      }
    `}
    </style>
);

export default ImageContainer