import { createSignal, type ParentComponent } from 'solid-js';

type Props = {
  alt: string;
  /**
   * in pixels
   */
  width?: number;
};

//[background: radial-gradient(circle 24px at top left, #0000, 98%, #fff)]

export const BorderHover: ParentComponent<Props> = props => {
  const firstLetter = props.alt.charAt(0);
  const BASE_WIDTH = 800;
  const [_alt, _setAlt] = createSignal(firstLetter);
  const width = props.width ?? BASE_WIDTH;
  const percent = (value: number) => (value / BASE_WIDTH) * width;
  const ANIMATION_DURATION = 500;
  const TEXT_ANIMATION_DURATION = 500 / 2.5;

  return (
    <div
      class='relative aspect-4/3 bg-green-600 grid content-center place-items-center px-3'
      style={{
        'background-size': '100%',
        width: `${width}px`,
        'border-radius': `${percent(12)}px`,
      }}
    >
      {props.children}
      <div
        class='absolute h-[14.28%] w-[10%] bottom-0 right-0 grid px-2 place-items-center ease-in-out transition-all duration-500 hover:w-[60%] group cursor-pointer outline-white'
        onMouseOver={() => {
          setTimeout(() => {
            _setAlt(props.alt);
          }, TEXT_ANIMATION_DURATION);
        }}
        onMouseOut={() => {
          setTimeout(() => {
            _setAlt(firstLetter);
          }, TEXT_ANIMATION_DURATION);
        }}
        style={{
          'transition-duration': `${ANIMATION_DURATION}ms`,
          'animation-duration': `${ANIMATION_DURATION}ms`,
          outline: `${percent(10)}px solid white`,
          'border-radius': `${percent(12)}px`,
        }}
      >
        <div
          class={`absolute aspect-square pointer-events-none resize-none`}
          style={{
            background: `radial-gradient(circle ${percent(26)}px at top left, #0000, 98%, #fff)`,
            width: `${percent(36)}px`,
            left: `-${percent(36)}px`,
            bottom: `-${percent(9.75)}px`,
          }}
        />
        <div
          class='absolute aspect-square -top-[48%] pointer-events-none resize-none'
          style={{
            background: `radial-gradient(circle ${percent(32)}px at top left, #0000, 98%, #fff)`,
            width: `${percent(38)}px`,
            right: `-${percent(6.5)}px`,
          }}
        />
        <span class='grid text-white place-items-center overflow-hidden tracking-widest group-hover:tracking-wide font-bold w-10 group-hover:w-full text-nowrap'>
          {_alt()}
        </span>
      </div>
    </div>
  );
};
