/// <reference types="vite/client" />

import seo from '~seo';
import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
} from '@tanstack/solid-router';
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools';
import appCss from '../../tailwind.css?url';
import { HeadLinksDemo } from '~ui/organisms/HeadLinks';
import { HydrationScript } from 'solid-js/web';
import { BreadCrumbs, Footer } from '~ui/molecules';
import { DottedBackground } from '~ui/organisms/DottedBackground';

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
      <html class='scroll-smooth'>
        <head>
          <HydrationScript />
        </head>

        <body class='flex flex-col min-h-screen p-3'>
          <HeadContent />
          <DottedBackground />
          <HeadLinksDemo />
          <main class='grow text-center'>
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
