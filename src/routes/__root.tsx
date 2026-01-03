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
import HeadLinks from '~ui/organisms/HeadLinks';
import { HydrationScript } from 'solid-js/web';
import { Footer } from '~ui/molecules';

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
      <html>
        <head>
          <HydrationScript />
        </head>
        <body class='flex flex-col min-h-screen'>
          <HeadContent />
          <main class='p-2 w-full grow text-center'>
            <HeadLinks />
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
