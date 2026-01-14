import { For, type Component } from 'solid-js';
import type { EnhancedLink } from '../types';
import { Link } from '@tanstack/solid-router';

type FooterSection = {
  title: string;
  links: EnhancedLink[];
};

type FooterProps = {
  sections?: FooterSection[];
  socials?: { name: string; href: string; icon: string }[];
  show?: boolean;
};

export const Footer: Component<FooterProps> = props => {
  return (
    <footer class='mt-3 text-center pt-1 border-t-2 border-zinc-400/30 pb-2 flex flex-col space-y-8'>
      {props.sections && (
        <div class='grid grid-cols-2 md:grid-cols-4 gap-8'>
          <For each={props.sections}>
            {section => (
              <div>
                <h3 class='font-semibold text-foreground mb-4'>
                  {section.title}
                </h3>
                <ul class='space-y-2'>
                  <For each={section.links}>
                    {link => (
                      <li>
                        <Link
                          to={link.href}
                          class='text-foreground/70 hover:text-primary transition-colors text-sm hover:underline underline-offset-4'
                        >
                          {link.label}
                        </Link>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            )}
          </For>
        </div>
      )}

      {props.socials && (
        <div class='flex justify-center gap-6'>
          <For each={props.socials}>
            {social => (
              <a
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                class='text-foreground/70 hover:text-primary transition-colors'
              >
                {social.name}
              </a>
            )}
          </For>
        </div>
      )}

      <p class='text-foreground/70 text-sm font-mono'>
        {'<Coded/>'} by{' '}
        <a
          href='https://beme-dev.vercel.app'
          target='_blank'
          rel='noopener noreferrer'
          class='text-orange-600 font-semibold hover:underline underline-offset-2'
        >
          beme.dev
        </a>{' '}
        ·{' 2025'}
      </p>
    </footer>
  );
};
