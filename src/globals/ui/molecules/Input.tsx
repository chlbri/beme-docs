import { Component, createMemo } from 'solid-js';
import Color from 'color';
import fcc from '../helpers/fcc';

type Props = {
  name: string;
  placeholder: string;
  color?: string;
  validColor?: string;
};

const CONTRASTER = 0.8;

export const InputText: Component<Props> = ({
  name,
  placeholder,
  /**
   * Couleur principale de l'input
   * @default '#06b6d4'
   */
  color = '#06b6d4',
  validColor = '#7bf1a8',
}) => {
  const cssVars = createMemo(() => {
    const baseColor = Color(color);
    const isDark = fcc.contrastByLight(baseColor);
    const focusColor =
      color === 'black'
        ? 'white'
        : color === 'white'
          ? 'black'
          : isDark
            ? baseColor.lighten(CONTRASTER).hex()
            : baseColor.darken(CONTRASTER).hex();
    const placeholderColor = baseColor.grayscale().hex();

    return {
      '--input-color': baseColor.hex(),
      '--input-color-focus': focusColor,
      '--input-color-placeholder': placeholderColor,
      '--input-color-valid': validColor,
    };
  });

  return (
    <div class='relative' style={cssVars()}>
      <input
        type='text'
        name={name}
        required
        class='w-full pt-6 px-3 pb-3 bg-transparent border-none outline-none text-(--input-color) focus:text-(--input-color-focus) tracking-wider peer z-30 relative'
      />
      <label
        for={name}
        class='text-(--input-color-placeholder) pointer-events-none peer-valid:-translate-y-10 peer-valid:scale-75 peer-valid:origin-left peer-valid:text-(--input-color-valid) absolute left-0 top-6 peer-focus:-translate-y-10  peer-focus:scale-75 peer-focus:origin-left peer-focus:text-(--input-color) tracking-wide duration-500'
      >
        {placeholder}
      </label>
      <i class='absolute left-0 bottom-0 w-full h-1 bg-(--input-color) rounded-md duration-500 pointer-events-none peer-focus:h-5/6' />
    </div>
  );
};
