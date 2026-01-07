import {
  createDebouncedValue,
  createRateLimitedValue,
  createThrottledValue,
} from '@tanstack/solid-pacer';
import { createFileRoute } from '@tanstack/solid-router';
import { listenQueue } from '~/globals/ui/signals';
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

    const { last: countBatch4_600 } = listenBatcher({
      fn: count,
      options: {
        wait: 600,
        maxSize: 4,
      },
    });
    const { last: countBatch10_500 } = listenBatcher({
      fn: count,
      options: {
        wait: 500,
        maxSize: 10,
      },
    });

    const [countRateLimited] = createRateLimitedValue(count, {
      limit: 5,
      window: 2000,
    });

    const { last: countQueue25_500 } = listenQueue({
      fn: count,
      options: {
        maxSize: 25,
        started: false,
        wait: 500,
      },
    });
    const { last: countQueue10_1000 } = listenQueue({
      fn: count,
      options: {
        maxSize: 10,
        started: false,
        wait: 1000,
      },
    });

    return (
      <div class='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 px-4'>
        <BtnGroup
          title='Hello Counters - normal !'
          value={count}
          sync={count}
          {...handlers}
        />
        <BtnGroup
          title='Hello Debounce (1000 ms) !'
          value={countDebounced1000}
          sync={count}
          {...handlers}
        />
        <BtnGroup
          title='Hello Debounce (2000 ms) !'
          value={countDebounced2000}
          sync={count}
          {...handlers}
        />
        <BtnGroup
          title='Hello Throttle (1500 ms) !'
          value={countThrottled1500}
          sync={count}
          {...handlers}
        />

        <BtnGroup
          title='Hello batch (4 by 600 ms) !'
          value={countBatch4_600}
          sync={count}
          {...handlers}
        />

        <BtnGroup
          title='Hello batch (10 by 500 ms) !'
          value={countBatch10_500}
          sync={count}
          {...handlers}
        />

        <BtnGroup
          title='Hello Rate Limited (5 per 2000 ms) !'
          value={countRateLimited}
          sync={count}
          {...handlers}
        />

        <BtnGroup
          title='Hello Queuer (25, wait each 500 ms) !'
          value={countQueue25_500}
          sync={count}
          {...handlers}
        />

        <BtnGroup
          title='Hello Queuer (10, wait each 1000 ms) !'
          value={countQueue10_1000}
          sync={count}
          {...handlers}
        />
      </div>
    );
  },
});
