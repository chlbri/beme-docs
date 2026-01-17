import { For, type Component } from 'solid-js';
import fcc from '~ui/helpers/fcc';

type ColorPaletteProps = {
  text: string;
  color: string;
};

const ColorItem: Component<ColorPaletteProps> = props => {
  return (
    <div
      class='text-center p-0.5 rounded-xl border-2 border-dashed hover:scale-105 transition-transform duration-150 ease-in-out cursor-cell select-none'
      style={{
        'border-color': props.color,
      }}
      onClick={() => {
        //copy color to clipboard
        navigator.clipboard.writeText(props.color);
      }}
    >
      <div
        class='p-2 rounded-xl'
        style={{
          'background-color': fcc.custom(
            props.color,
            '#E8EBF0',
            '#263449',
          ),
        }}
      >
        <div
          class='h-32 rounded-lg mb-3 shadow-md bg-gray-200'
          style={{ 'background-color': props.color }}
        />
        <p class='font-semibold' style={{ color: props.color }}>
          {props.text}
        </p>
        <p
          class='text-2xs font-mono underline underline-offset-2'
          style={{ color: props.color }}
        >
          {props.color}
        </p>
      </div>
    </div>
  );
};

export const ColorsPalette: Component<{
  colors: ColorPaletteProps[];
}> = props => {
  return <For each={props.colors}>{ColorItem}</For>;
};
