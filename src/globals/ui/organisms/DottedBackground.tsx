import {
  createEffect,
  createSignal,
  onMount,
  type Component,
} from 'solid-js';
import { COLOR_PRIMARY } from '../constants';

type Props = {
  fillColor?: string;
};

export const DottedBackground: Component<Props> = ({
  fillColor = COLOR_PRIMARY,
}) => {
  let canvasRef: HTMLCanvasElement | undefined;
  const [context, setContext] =
    createSignal<CanvasRenderingContext2D | null>(null);

  onMount(() => {
    if (!canvasRef) return;

    const canvas = canvasRef;
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

      ctx.fillStyle = fillColor;
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
      ref={canvasRef}
      class='fixed inset-0 top-0 left-0 pointer-events-none'
      style={{ 'z-index': '-1' }}
    />
  );
};
