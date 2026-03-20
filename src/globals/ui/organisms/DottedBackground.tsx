import { createEffect, createSignal } from 'solid-js';

type DottedBackgroundProps = {
  dotColor?: string;
  dotSize?: number;
  gap?: number;
  opacity?: number;
};

export const DottedBackground = ({
  dotColor = '#f97316',
  dotSize = 2,
  gap = 40,
  opacity = 0.15,
}: DottedBackgroundProps) => {
  const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement>();
  const [context, setContext] =
    createSignal<CanvasRenderingContext2D | null>(null);

  createEffect(() => {
    const canvas = canvasRef();
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setContext(ctx);

    const drawDots = () => {
      const ctx = context();
      if (!ctx) return;

      // Clear canvas
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = dotColor;
      ctx.globalAlpha = opacity;

      for (let x = 0; x < canvas.width; x += gap) {
        for (let y = 0; y < canvas.height; y += gap) {
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    };

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawDots();
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
