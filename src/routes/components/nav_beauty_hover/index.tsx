import { createFileRoute } from '@tanstack/solid-router';
import { NavBlurImage } from './-components';
import { cn } from '~cn/utils';

export const Route = createFileRoute('/components/nav_beauty_hover/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <NavBlurImage
      list={['Home', 'About', 'Services', 'Contact']}
      bgImageUrl='/components/nav_beauty_hover/background_2.webp'
      class='h-140 bg-cover text-zinc-200 pt-3'
      nav_class={cn(
        'text-2xl font-semibold',
        'supports-[not(corner-shape:_squircle)]:rounded-2xl',
        'supports-[corner-shape:_squircle]:corner-squircle supports-[corner-shape:_squircle]:rounded-5xl',
      )}
    />
  );
}
