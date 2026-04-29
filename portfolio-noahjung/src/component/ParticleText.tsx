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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.fillStyle = '#1e3a5f';
    ctx.font = "900 31px 'Inter', 'Montserrat', 'system-ui', sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 2;
    ctx.shadowColor = 'black';
    ctx.fillText(text, width / 2, height / 2);

    const imageData = ctx.getImageData(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);

    const step = 2;
    const particles: Particle[] = [];
    for (let y = 0; y < imageData.height; y += step) {
      for (let x = 0; x < imageData.width; x += step) {
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

    let timeout = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.vx = mouse.x - mouse.prevX;
      mouse.vy = mouse.y - mouse.prevY;
      mouse.speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
      mouse.active = true;
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        mouse.active = false;
      }, 80);
    };

    window.addEventListener('mousemove', onMouseMove);

    let rafId = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 130;
        if (dist < radius && mouse.active) {
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
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      window.clearTimeout(timeout);
    };
  }, [text]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
  );
};

export default ParticleText;
