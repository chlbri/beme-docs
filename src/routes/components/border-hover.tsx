import { createFileRoute } from '@tanstack/solid-router';
import { BorderHover } from '~/globals/ui/molecules/BorderHover';

export const Route = createFileRoute('/components/border-hover')({
  component: () => (
    <div class='text-lg h-[90vh] content-center place-items-center grid'>
      <BorderHover alt='I am beautifull!' width={500}>
        <h1 class='text-4xl font-bold text-white select-none'>
          Beautifull component to show publicly
        </h1>
      </BorderHover>
    </div>
  ),
});
