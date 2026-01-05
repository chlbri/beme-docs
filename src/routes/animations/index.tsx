import { createFileRoute } from '@tanstack/solid-router';
import { AnimationsPage } from './-components';

export const Route = createFileRoute('/animations/')({
  component: () => <AnimationsPage />,
});
