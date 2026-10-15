import React, { useEffect, useRef, useState } from 'react';

export function MouseEffect() {
  const canvasRef = useRef(null);
  const [enabled, setEnabled] = useState(true);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isPointerInside, setIsPointerInside] = useState(false);

  // Sync mouse position with CSS variables for dynamic card spotlights
  useEffect(() => {
    let animationFrameId;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setIsPointerInside(true);

      // Set raw mouse pos for canvas
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setIsPointerInside(false);
    };

    const updateCssVars = () => {
      // Lerp for smooth fluid motion
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      document.documentElement.style.setProperty('--mouse-x', `${currentX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${currentY}px`);

      animationFrameId = requestAnimationFrame(updateCssVars);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(updateCssVars);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Neural Particle Canvas Web Effect
  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = Math.min(Math.floor((width * height) / 18000), 70);
    let particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.8 + 1;
        this.baseColor = Math.random() > 0.4 ? 'rgba(56, 189, 248,' : 'rgba(168, 85, 247,';
        this.alpha = Math.random() * 0.4 + 0.2;
      }

      update(mx, my, inside) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce at boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Interactive mouse interaction
        if (inside) {
          const dx = mx - this.x;
          const dy = my - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 160;

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            // gentle gravitational attraction + tangential swirl
            this.x += (dx / dist) * force * 1.2;
            this.y += (dy / dist) * force * 1.2;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.baseColor} ${this.alpha})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mousePos.x, mousePos.y, isPointerInside);
        particles[i].draw();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineAlpha = (1 - dist / 110) * 0.15;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect particles to mouse cursor when close
        if (isPointerInside) {
          const mdx = particles[i].x - mousePos.x;
          const mdy = particles[i].y - mousePos.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mousePos.x, mousePos.y);
            const cursorLineAlpha = (1 - mDist / 140) * 0.35;
            ctx.strokeStyle = `rgba(168, 85, 247, ${cursorLineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [enabled, mousePos.x, mousePos.y, isPointerInside]);

  return (
    <>
      {/* Dynamic ambient spotlight following cursor */}
      {isPointerInside && (
        <div
          className="fixed pointer-events-none z-30 transition-opacity duration-300 rounded-full blur-[80px]"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            width: '420px',
            height: '420px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(139, 92, 246, 0.07) 45%, transparent 70%)',
          }}
        />
      )}

      {/* Interactive Neural Particle Canvas */}
      {enabled && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-10 opacity-70"
        />
      )}

      {/* Toggle button in bottom-right corner */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setEnabled(!enabled)}
          className="px-3 py-1.5 rounded-full text-xs font-mono font-medium backdrop-blur-md bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all flex items-center gap-2 shadow-lg"
          title="Toggle interactive neural particle canvas"
        >
          <span className={`w-2 h-2 rounded-full ${enabled ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
          <span>Mouse Neural FX: {enabled ? 'ON' : 'OFF'}</span>
        </button>
      </div>
    </>
  );
}
