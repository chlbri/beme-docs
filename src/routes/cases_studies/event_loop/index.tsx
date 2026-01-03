import { createFileRoute } from '@tanstack/solid-router';
import { EventLoop } from './-ui';

export const Route = createFileRoute('/cases_studies/event_loop/')({
  component: () => <EventLoop delay={750} slowTimeFactor={1} />,
});
