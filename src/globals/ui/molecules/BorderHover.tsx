import {
  createSignal,
  type Accessor,
  type ParentComponent,
} from 'solid-js';
import { cn } from '../cn/utils';

export type BorderHoverProps = {
  alt: string;
  /**
   * in pixels
   */
  width?: Accessor<number>;
  class?: string;
  altClass?: string;
};

//[background: radial-gradient(circle 24px at top left, #0000, 98%, #fff)]

const BASE_WIDTH = 800;
const DEFAULT_WIDTH = 500;
const ANIMATION_DURATION = 350;
const TEXT_ANIMATION_DURATION = ANIMATION_DURATION / 2.5;

export const BorderHover: ParentComponent<BorderHoverProps> = props => {
  // #region Properties
  const firstLetter = props.alt.charAt(0);
  const [_alt, _setAlt] = createSignal(firstLetter);
  const width = () => (props.width ? props.width() : DEFAULT_WIDTH);
  const percent = (value: number) => (value / BASE_WIDTH) * width();

  // #endregion

  return (
    <div
      class={cn('bg-green-600 px-5 text-gray-50', props.class)}
      style={{
        'background-size': '100%',
        width: `${width()}px`,
        'border-radius': `${percent(20)}px`,
        'aspect-ratio': '3/2',
        'align-content': 'center',
        'place-items': 'center',
        position: 'relative',
      }}
    >
      {props.children}
      <div
        class='absolute h-[15%] w-[10%] bottom-0 right-0 px-2 ease-out transition-all duration-500 hover:w-[60%] group cursor-pointer outline-white flex items-center justify-center'
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
          'border-radius': `${percent(20)}px`,
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
        <span
          class={cn(
            'overflow-hidden tracking-widest group-hover:tracking-wide w-10 group-hover:w-full text-nowrap text-center',
            props.altClass,
          )}
          style={{
            'font-size': `${percent(26)}px`,
          }}
        >
          {_alt()}
        </span>
      </div>
    </div>
  );
};
