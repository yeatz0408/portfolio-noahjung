import { useRef, useEffect } from 'react';

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
};

interface ParticleTextProps {
  text: string;
}

const ParticleText: React.FC<ParticleTextProps> = ({ text }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = 'black';
    ctx.font =
      "bold 60px 'Rounded Mplus 1c', 'Kosugi Maru', 'Quicksand', sans-serif";
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const particles: Particle[] = [];
    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        const index = (y * imageData.width + x) * 4;
        if (imageData.data[index + 3] > 128) {
          particles.push({ x, y, baseX: x, baseY: y, vx: 0, vy: 0 });
        }
      }
    }

    const mouse = {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      vx: 0,
      vy: 0,
      speed: 0,
      active: false,
    };
    window.addEventListener('mousemove', (e) => {
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.vx = mouse.x - mouse.prevX;
      mouse.vy = mouse.y - mouse.prevY;
      mouse.speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
      mouse.active = true;
    });

    let timeout: number;
    window.addEventListener('mousemove', () => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        mouse.active = false;
      }, 80);
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 130;
        if (dist < radius) {
          const force = (radius - dist) / radius;
          const angle = Math.atan2(dy, dx);
          let power = force * 6;
          power *= 1 + mouse.speed * 0.2;
          p.vx += Math.cos(angle) * power;
          p.vy += Math.sin(angle) * power;
          p.vx += (Math.random() - 0.5) * 1.2;
          p.vy += (Math.random() - 0.5) * 1.2;
        } else {
          const dxBase = p.baseX - p.x;
          const dyBase = p.baseY - p.y;
          const distBase = Math.sqrt(dxBase * dxBase + dyBase * dyBase);
          const magnet = Math.min(distBase * 0.15, 20);
          const angle = Math.atan2(dyBase, dxBase);
          p.vx += Math.cos(angle) * magnet;
          p.vy += Math.sin(angle) * magnet;
          p.vx *= 0.8;
          p.vy *= 0.8;
        }
        p.vx += (p.baseX - p.x) * 0.07;
        p.vy += (p.baseY - p.y) * 0.07;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillRect(p.x, p.y, 1.5, 1.5);
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
  );
};

export default ParticleText;
