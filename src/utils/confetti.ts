export function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    document.body.removeChild(canvas);
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const colors = ['#22d3ee', '#06b6d4', '#14b8a6', '#38bdf8', '#fbbf24', '#f43f5e'];
  const particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    rotation: number;
    vRot: number;
    alpha: number;
  }> = [];

  for (let i = 0; i < 70; i++) {
    particles.push({
      x: window.innerWidth * (0.4 + Math.random() * 0.2),
      y: window.innerHeight * 0.7,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 14 - 6,
      size: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      alpha: 1,
    });
  }

  let animationFrameId: number;
  let startTime = performance.now();

  function render(now: number) {
    const elapsed = now - startTime;
    ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

    let alive = false;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45; // gravity
      p.vx *= 0.98; // drag
      p.rotation += p.vRot;
      p.alpha = Math.max(0, 1 - elapsed / 1800);

      if (p.alpha > 0.01) {
        alive = true;
        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate((p.rotation * Math.PI) / 180);
        ctx!.globalAlpha = p.alpha;
        ctx!.fillStyle = p.color;
        ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
        ctx!.restore();
      }
    }

    if (alive && elapsed < 2000) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    }
  }

  animationFrameId = requestAnimationFrame(render);
}
