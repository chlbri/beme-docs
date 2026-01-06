import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/')({
  component: () => {
    return (
      <div class='w-full min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden'>
        {/* Animated background gradient */}
        <div class='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900 to-orange-900/20 animate-gradient-shift' />

        {/* Decorative elements */}
        <div class='absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse' />
        <div
          class='absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse'
          style='animation-delay: 1s;'
        />

        {/* Main content */}
        <div class='relative z-10 max-w-5xl mx-auto px-6 text-center space-y-12'>
          {/* Hero section */}
          <div class='space-y-6 animate-fade-in'>
            <h1 class='text-6xl md:text-8xl font-bold'>
              <span class='bg-gradient-to-r from-purple-400 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-x'>
                beme-docs
              </span>
            </h1>
            <p class='text-2xl md:text-3xl text-gray-300 font-light'>
              CV · Portfolio · Online Courses
            </p>
            <p class='text-xl text-gray-400 max-w-2xl mx-auto'>
              Teaching code through modern web development, animations, and
              interactive experiences
            </p>
          </div>

          {/* Feature cards */}
          <div class='grid md:grid-cols-3 gap-6 mt-16'>
            <div class='group p-8 bg-slate-800/50 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20'>
              <div class='text-4xl mb-4'>👨‍💻</div>
              <h3 class='text-xl font-semibold text-purple-400 mb-2'>
                Portfolio
              </h3>
              <p class='text-gray-400'>
                Explore my projects, case studies, and creative web
                components
              </p>
            </div>

            <div class='group p-8 bg-slate-800/50 rounded-2xl border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20'>
              <div class='text-4xl mb-4'>📚</div>
              <h3 class='text-xl font-semibold text-orange-500 mb-2'>
                Learn
              </h3>
              <p class='text-gray-400'>
                Interactive tutorials and courses on modern web development
              </p>
            </div>

            <div class='group p-8 bg-slate-800/50 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20'>
              <div class='text-4xl mb-4'>✨</div>
              <h3 class='text-xl font-semibold text-purple-400 mb-2'>
                Animations
              </h3>
              <p class='text-gray-400'>
                Beautiful web animations and interactive UI components
              </p>
            </div>
          </div>

          {/* About section with updated styling */}
          <div class='mt-16 p-8 bg-gradient-to-r from-purple-900/20 to-orange-900/20 rounded-2xl border border-purple-500/30 backdrop-blur-sm'>
            <h2 class='text-3xl font-bold text-purple-400 mb-6'>
              About Me
            </h2>
            <div class='space-y-4 text-left max-w-2xl mx-auto'>
              <div class='p-6 bg-slate-800/50 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all'>
                <h3 class='text-lg font-semibold text-purple-300 mb-2'>
                  👋 Full Name
                </h3>
                <p class='text-gray-300'>Charles-Lévi BRI</p>
              </div>
              <div class='p-6 bg-slate-800/50 rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-all'>
                <h3 class='text-lg font-semibold text-orange-400 mb-2'>
                  💡 Bio
                </h3>
                <p class='text-gray-300'>
                  I am a software engineer and I like pineapple on pizza.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
