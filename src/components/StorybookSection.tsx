import React from 'react';

export const StorybookSection: React.FC = () => {
  const chapters = [
    {
      step: 'Chapter 1',
      title: 'The Magnifying Glass Helper (AI Vision)',
      body: 'Imagine we work in a busy workshop sorting shiny apples and colourful wooden blocks. A tiny camera takes a quick snapshot, and our magnifying-glass helper checks every piece to make sure none are scratched or chipped.',
    },
    {
      step: 'Chapter 2',
      title: 'Playing Fair Without Peeking (No Data Leakage)',
      body: 'To test if our helper is truly clever, we never show it the exact same practice card twice. And if 99 apples are healthy and only 1 is bruised, we still give extra attention to that 1 bruised apple so nobody misses it!',
    },
    {
      step: 'Chapter 3',
      title: 'Keeping a Tidy Backpack (Big-O & No Leaks)',
      body: 'Our helper throws old scrap paper into the recycling bin right away, keeps the camera lid closed when finished, and checks a secret stamp on its rulebook so no messy bugs ever slow the computer down.',
    },
    {
      step: 'Chapter 4',
      title: 'Sharing Nicely in Four Countries (GitHub & Privacy)',
      body: 'Before we put our helper’s instructions onto GitHub for our neighbours in Taiwan, Canada, Germany, and Japan, we wipe off every personal name, leave out any company secrets, and tuck in a polite sharing note for everyone.',
    },
  ];

  return (
    <section id="little-helper" className="border-t border-slate-200 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white aspect-4/3">
              <img
                src="/src/assets/images/storybook_blocks_clean_1795530050721.jpg"
                alt="Paper-cut illustration of wooden blocks and red and green apples sorted neatly with a magnifying glass"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs font-medium text-teal-700">
              05. Little Helper Edition · Canadian English
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl text-balance">
              How Our Little Picture-Sorting Helper Works, Eh-to-Zed
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Written in gentle, everyday Canadian English so even a four-year-old helper can follow along right from the start.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {chapters.map((ch) => (
                <article key={ch.step} className="border-t border-slate-200 pt-3">
                  <div className="text-xs font-semibold text-teal-700">{ch.step}</div>
                  <h3 className="mt-1 text-sm font-semibold text-slate-900">{ch.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{ch.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
