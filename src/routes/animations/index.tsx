import {
  createFileRoute,
  retainSearchParams,
} from '@tanstack/solid-router';
import * as v from 'valibot';
import { ANIMATION_TYPES } from './-constants';
import { AnimationsPage as component } from './-components';

const validateSearch = v.object({
  q: v.optional(v.string(), ''),
  categories: v.pipe(
    v.optional(v.array(v.picklist(ANIMATION_TYPES)), ANIMATION_TYPES),
  ),
});

export const Route = createFileRoute('/animations/')({
  validateSearch,
  search: { middlewares: [retainSearchParams(['categories'])] },
  component,
});
