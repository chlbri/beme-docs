import { useNavigate } from '@tanstack/solid-router';
import { type Component } from 'solid-js';
import { ComponentItem } from './types';
import { ArrowRight } from 'lucide-solid';
import { cn } from '~cn/utils';

export const ComponentCard: Component<ComponentItem> = props => {
  const navigate = useNavigate();

  return (
    <article
      class={cn(
        'group border border-gray-200 dark:border-gray-700 rounded-lg p-6',
        'bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg',
        'transition-all duration-300 cursor-pointer',
        'hover:border-orange-400 dark:hover:border-orange-400/50',
      )}
      onClick={() => navigate({ to: props.path })}
      role='button'
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate({ to: props.path });
        }
      }}
    >
      <div class='flexs-start justify-between mb-4'>
        <h3 class='text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-400 transition-colors'>
          {props.name}
        </h3>
        <ArrowRight
          size={20}
          class='text-gray-400 group-hover:text-orange-400 group-hover:translate-x-1 transition-all'
        />
      </div>

      <p class='text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>
        {props.description}
      </p>

      <div class='mt-4 pt-4 border-t border-gray-100 dark:border-gray-800'>
        <span class='text-xs font-medium text-orange-400'>
          View Component →
        </span>
      </div>
    </article>
  );
};
