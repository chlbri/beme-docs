import { Brain, Zap } from 'lucide-solid';
import { CaseStudyItem } from './-types';

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'event-loop',
    name: 'Event Loop',
    description:
      'An interactive visualization of how the JavaScript event loop works, helping you understand asynchronous execution and the call stack.',
    path: '/cases_studies/event_loop',
    icon: Zap,
    tags: ['JavaScript', 'Async', 'Education'],
  },
  {
    id: 'states',
    name: 'State Management',
    description:
      'A comprehensive exploration of different state management patterns and hooks in modern frameworks.',
    path: '/cases_studies/states',
    icon: Brain,
    tags: ['State', 'Hooks', 'Patterns'],
  },
];
