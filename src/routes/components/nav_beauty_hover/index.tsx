import { createFileRoute } from '@tanstack/solid-router';
import { NavBlurImage } from './-components';

export const Route = createFileRoute('/components/nav_beauty_hover/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <NavBlurImage
      list={['Home', 'About', 'Services', 'Contact']}
      bgImageUrl='/components/nav_beauty_hover/background_2.webp'
      class='h-140 bg-cover text-zinc-200 pt-3'
      navClass='text-2xl font-semibold space-x-6 px-20 py-3 mx-auto w-fit'
    />
  );
}
