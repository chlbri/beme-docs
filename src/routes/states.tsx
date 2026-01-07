import {
  createDebouncedValue,
  createRateLimitedValue,
  createThrottledValue,
} from '@tanstack/solid-pacer';
import { createFileRoute } from '@tanstack/solid-router';
import { listenBatcher } from '~/globals/ui/signals/batch';
import { BtnGroup } from './-states.components';
import { useHook } from './-states.hooks';

export const Route = createFileRoute('/states')({
  // Test data from loader
  loader: () => 15,
  component: () => {
    const defaultValue = Route.useLoaderData()();
    const { count, ...handlers } = useHook(defaultValue);

    const [countDebounced1000] = createDebouncedValue(count, {
      wait: 1000,
    });

    const [countDebounced2000] = createDebouncedValue(count, {
      wait: 2000,
    });

    const [countThrottled1500] = createThrottledValue(count, {
      wait: 1500,
    });

    const { last: countBatch } = listenBatcher({
      fn: count,
      options: {
        wait: 600,
        maxSize: 4,
      },
    });

    const [countRateLimited] = createRateLimitedValue(count, {
      limit: 5,
      window: 2000,
    });

    // const [] = createBatcher()

    return (
      <div class='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14 p-4'>
        <BtnGroup
          title='Hello Counters - normal !'
          value={count}
          {...handlers}
        />
        <BtnGroup
          title='Hello Debounce (1000 ms) !'
          value={countDebounced1000}
          {...handlers}
        />
        <BtnGroup
          title='Hello Debounce (2000 ms) !'
          value={countDebounced2000}
          {...handlers}
        />
        <BtnGroup
          title='Hello Throttle (1500 ms) !'
          value={countThrottled1500}
          {...handlers}
        />

        <BtnGroup
          title='Hello batch (4 by 600 ms) !'
          value={countBatch}
          {...handlers}
        />

        <BtnGroup
          title='Hello Rate Limited (5 per 2000 ms) !'
          value={countRateLimited}
          {...handlers}
        />
      </div>
    );
  },
});
