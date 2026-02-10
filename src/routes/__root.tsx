/// <reference types="vite/client" />

import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/solid-router';
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools';
import { HydrationScript } from 'solid-js/web';
import { Navigation } from '~/globals/ui/organisms/Navigation';
import seo from '~seo';
import { BreadCrumbs, Footer } from '~ui/molecules';
import { DottedBackground } from '~ui/organisms/DottedBackground';
import appCss from '../../tailwind.css?url';

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'stylesheet', href: appCss }],
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: 'Web animations | by @chlbri',
        description: `A beautifull library of web animations`,
      }),
    ],
  }),

  component: () => {
    return (
      <html class='scroll-smooth [scrollbar-gutter:stable]'>
        <head>
          <HydrationScript />
        </head>

        <body class='flex flex-col min-h-screen p-5'>
          <HeadContent />
          <DottedBackground />
          <Navigation
            logo='beme.docs'
            links={[
              { href: '/animations', label: 'Animations' },
              { href: '/components', label: 'Components' },
              { href: '/cases_studies', label: 'Case Studies' },
            ]}
          />
          <main class='grow text-center pt-15'>
            <BreadCrumbs class='mb-2' />
            <Outlet />
          </main>
          <Footer />
          <TanStackRouterDevtools />
          <Scripts />
        </body>
      </html>
    );
  },
});
