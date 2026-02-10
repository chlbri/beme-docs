import { createEffect, createSignal } from 'solid-js';

export const DottedBackground = () => {
  const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement>();
  const [context, setContext] =
    createSignal<CanvasRenderingContext2D | null>(null);

  createEffect(() => {
    const canvas = canvasRef();
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setContext(ctx);

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawDots();
    };

    const drawDots = () => {
      const ctx = context();
      if (!ctx) return;

      // Clear canvas
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw dots
      const dotRadius = 2;
      const gap = 40;

      ctx.fillStyle = '#f97316';
      ctx.globalAlpha = 0.15;

      for (let x = 0; x < canvas.width; x += gap) {
        for (let y = 0; y < canvas.height; y += gap) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  });

  return (
    <canvas
      ref={setCanvasRef}
      class='fixed inset-0 top-0 left-0 pointer-events-none'
      style={{ 'z-index': '-1' }}
    />
  );
};
