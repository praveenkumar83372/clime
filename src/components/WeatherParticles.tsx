import { useEffect, useRef } from "react";

interface WeatherParticlesProps {
  condition: string;
}

export function WeatherParticles({ condition }: WeatherParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const createParticles = () => {
      const count = condition.includes("rain") ? 100 : condition.includes("snow") ? 50 : 30;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: condition.includes("rain") ? 0 : (Math.random() - 0.5) * 0.5,
          vy: condition.includes("rain") ? 3 + Math.random() * 2 : 1 + Math.random(),
          size: condition.includes("rain") ? 1 + Math.random() * 2 : 2 + Math.random() * 3,
          opacity: 0.3 + Math.random() * 0.4,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        
        if (condition.includes("rain")) {
          ctx.strokeStyle = `rgba(200, 220, 255, ${particle.opacity})`;
          ctx.lineWidth = particle.size;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particle.x, particle.y + 10);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.y > canvas.height) {
          particle.y = -10;
          particle.x = Math.random() * canvas.width;
        }

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
      });
    };

    createParticles();
    let animationFrame: number;

    const animate = () => {
      drawParticles();
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [condition]);

  if (!condition.includes("rain") && !condition.includes("snow") && !condition.includes("cloud")) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-5"
      style={{ opacity: 0.6 }}
    />
  );
}
