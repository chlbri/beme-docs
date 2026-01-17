import { createFileRoute } from '@tanstack/solid-router';
import { ToolTip } from '~ui/molecules';

export const Route = createFileRoute('/components/tooltip')({
  component: () => {
    return (
      <div class='flex items-center justify-center h-screen'>
        <ToolTip tooltip='This is a tooltip' position='top'>
          <button class='px-4 py-2 bg-blue-500 text-white rounded'>
            Hover me
          </button>
        </ToolTip>
      </div>
    );
  },
});
