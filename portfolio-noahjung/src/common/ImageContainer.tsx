import React from "react"
import { useEffect } from "react"
import brushStroke from "../assets/img/stroke_image.png"

interface ImageContainerProps {
    src: string;
    size?: number;
}

const ImageContainer: React.FC<ImageContainerProps> = ({
    src,
    size = DEFAULT_SIZE
}) => {
    if (!src) return null

    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!
        const brush = new Image()
        brush.src = brushStroke

        const drawBrush = (x: number, y: number) => {
            const progress = 1 - y / canvas.height
            const curve = Math.sin(progress * Math.PI)
            const size = 80 + curve * 100 + Math.random() * 50
            const angle = Math.random() * Math.PI * 2
            const alpha = 0.6 + Math.random() * 0.4   // transparency
            ctx.save()  // reset
            ctx.globalAlpha = alpha
            ctx.translate(x, y)  // set the position of the brush
            ctx.rotate(angle)
            ctx.drawImage(brush, -size / 3, -size / 3, size, size)
            ctx.restore()  // save
        }

        brush.onload = () => {
            ctx.globalCompositeOperation = "source-over"  // Draw over my image
            ctx.fillStyle = "white"  // Fill everything in the brush image with white
            ctx.fillRect(0, 0, canvas.width, canvas.height)  // Designate the range
            ctx.globalCompositeOperation = "destination-out" // Get rid of the white so that my image is exposed

            let x = canvas.width * 0.8
            let y = canvas.height * 0.75
            let t = 0  // the time taken for drawing

            const draw = () => {
                if (x <= 0 || y <= 0) return

                y -= 7.5  // The position when drawing is over
                x -= 5 + Math.sin(t) * 20  // The width of zig-zag
                t += 0.5  // The time
                drawBrush(x, y)
                setTimeout(() => { requestAnimationFrame(draw) }, 20)
            }
            setTimeout(() => draw(), 2000)
        }
    }, [])

    return (
        <div style={{ width: size, height: size, position: 'relative' }}>
            <img
                src={src}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                }}
                className="absolute z-0 top-0 left-0 w-full h-full object-cover"
            />
            <canvas
                width={size}
                height={size}
                className="absolute z-10 top-0 left-0 w-full h-full"
                ref={canvasRef}
            />
        </div>
    )
}

const DEFAULT_SIZE = 300

export default ImageContainer