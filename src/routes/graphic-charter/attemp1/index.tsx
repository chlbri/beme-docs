import { createFileRoute, Link } from '@tanstack/solid-router';
import {
  ColorsPalette,
  Polices,
  PALETTE_COLORS,
  POLICES_DATA,
} from './-content';

export const Route = createFileRoute('/graphic-charter/attemp1/')({
  head: () => ({
    links: [
      // #region Google Fonts
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap',
      },
      // #endregion
    ],
  }),
  component: () => (
    <div class='min-h-screen bg-gray-200/70  py-12 px-4 sm:px-6 lg:px-8 w-full'>
      <div class='max-w-7xl mx-auto'>
        {/* Back Button */}
        <Link
          to='/'
          class='inline-flex mt-6 items-center gap-2 mb-4 px-4 py-2 text-[#4B9CAD] hover:text-[#3d8091] font-semibold transition-colors duration-200'
        >
          <svg
            class='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            />
          </svg>
          Retour
        </Link>

        {/* Header */}
        <div class='bg-[#4B9CAD] text-white py-8 px-6 rounded-t-lg'>
          <h1 class='text-4xl font-bold text-center'>CHARTE GRAPHIQUE</h1>
        </div>

        {/* Logo Section */}
        <div class='bg-white p-6 border-x border-gray-200'>
          <div class='flex flex-col items-center'>
            <img
              src='/img/logo-texte.png'
              alt='ivoire cours logo'
              class='w-96 h-auto mb-10'
              loading='lazy'
            />

            <div class='w-full border-t border-gray-300 my-6'></div>

            <div class='text-center'>
              <h2 class='text-3xl font-bold text-[#2C5364] mb-2'>
                Couleurs
              </h2>
              <p class='text-lg text-gray-600'>
                Les 4 principales couleurs de la charte graphique sont :
              </p>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div class='bg-white py-2 px-6 border-x border-gray-200'>
          <div class='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <ColorsPalette colors={PALETTE_COLORS} />
          </div>
        </div>

        {/* Typography Section */}
        <div class='bg-white py-8 px-6 border-x border-b border-gray-200'>
          <h2 class='text-3xl font-bold text-center text-[#2C5364] my-8'>
            Typographie
          </h2>

          <p class='text-center text-gray-600 mb-8'>
            5 polices Google Fonts sélectionnées pour une identité
            professionnelle et moderne
          </p>

          <div class='space-y-8'>
            {/* Police 1 : Montserrat */}

            <Polices polices={POLICES_DATA}>
              {/* Guide d'utilisation */}
              <div class='mt-8 p-6 bg-linear-to-r from-[#4B9CAD]/10 to-[#2C5364]/10 rounded-lg'>
                <h4 class='text-xl font-bold text-[#2C5364] mb-4'>
                  📚 Guide d'utilisation
                </h4>
                <div class='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                  <div>
                    <span class='font-semibold text-[#2C5364]'>
                      Titres H1-H2 :
                    </span>
                    <span class='text-gray-700'>
                      {' '}
                      Montserrat Bold (700-800)
                    </span>
                  </div>
                  <div>
                    <span class='font-semibold text-[#2C5364]'>
                      Titres H3-H4 :
                    </span>
                    <span class='text-gray-700'>
                      {' '}
                      Poppins SemiBold (600)
                    </span>
                  </div>
                  <div>
                    <span class='font-semibold text-[#2C5364]'>
                      Paragraphes :
                    </span>
                    <span class='text-gray-700'>
                      {' '}
                      Open Sans Regular (400)
                    </span>
                  </div>
                  <div>
                    <span class='font-semibold text-[#2C5364]'>
                      Boutons & Labels :
                    </span>
                    <span class='text-gray-700'> Roboto Medium (500)</span>
                  </div>
                  <div>
                    <span class='font-semibold text-[#2C5364]'>
                      Citations :
                    </span>
                    <span class='text-gray-700'> Lora Italic (400)</span>
                  </div>
                  <div>
                    <span class='font-semibold text-[#2C5364]'>
                      Texte accentué :
                    </span>
                    <span class='text-gray-700'>
                      {' '}
                      Poppins Medium (500)
                    </span>
                  </div>
                </div>
              </div>
            </Polices>
          </div>
        </div>

        {/* Footer */}
        <div class='bg-[#2C5364] text-white py-6 px-6 rounded-b-lg mt-0 text-center'>
          <h3 class='text-xl font-bold'>beme.docs, tout le code</h3>
        </div>
      </div>
    </div>
  ),
});
