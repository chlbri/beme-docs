import Color from 'color';
import { createMemo, type Component } from 'solid-js';
import fcc from '~/globals/ui/helpers/fcc';
import { InputText } from '~ui/molecules';

type Props = {
  /**
   * Couleur principale de l'input
   * @default '#06b6d4'
   */
  color?: string;
  validColor?: string;
  handleSubmit?: (data: FormData) => void;
  width?: number;
};

const CONTRASTER = 0.8;

/**
 *
 * @param Color
 * @returns
 */
export const LoginBeautyContent1: Component<Props> = ({
  color = '#06b6d4',
  validColor = '#7bf1a8',
  handleSubmit,
  width: _width,
}) => {
  const width = Math.min(560, _width ?? 560);
  const cssVars = createMemo(() => {
    const baseColor = Color(color);
    const isDark = fcc.contrastByLight(baseColor);
    const placeholderColor = baseColor.grayscale().hex();

    const darkColor =
      color === 'black'
        ? 'white'
        : color === 'white'
          ? 'black'
          : isDark
            ? baseColor.lighten(CONTRASTER).hex()
            : baseColor.darken(CONTRASTER).hex();

    if (color === 'black') {
      console.log('isDark', isDark);
      console.log(darkColor);
    }

    return {
      '--input-color': baseColor.hex(),
      '--input-bg-color': darkColor,
      '--input-color-placeholder': placeholderColor,
    };
  });
  return (
    <div
      class='relative w-xl rounded-2xl aspect-square bg-(--input-bg-color)/90 overflow-hidden before:content-[""] before:absolute before:-top-1/2 before:-left-1/2 before:w-full before:h-full before:bg-linear-0 before:from-transparent before:via-(--input-color) before:to-(--input-color) before:animate-spin-slow before:origin-bottom-right after:content-[""] before:overflow-hidden after:overflow-hidden after:absolute after:-top-1/2 after:-left-1/2 after:w-full after:h-full after:bg-linear-0 after:from-transparent after:via-(--input-color) after:to-(--input-color) after:animate-spin-slow after:origin-bottom-right after:[animation-delay:-6s] [-webkit-mask-image:-webkit-radial-gradient(circle, white, black)] after:opacity-60 before:opacity-60 border border-(--input-color)'
      style={{ ...cssVars(), width: `${width}px`, height: `${width}px` }}
    >
      <form class='z-20 bg-(--input-bg-color) inset-1.5 absolute rounded-2xl px-16 py-14 flex flex-col'>
        <h2 class='text-(--input-color) text-3xl font-medium tracking-wide mb-10'>
          Sign in
        </h2>
        <div class='flex flex-col space-y-7 w-full'>
          <InputText
            name='login'
            placeholder='Username'
            color={color}
            validColor={validColor}
          />
          <InputText
            name='password'
            placeholder='Password'
            color={color}
            validColor={validColor}
          />
        </div>
        <div class='flex justify-between my-6 text-sm text-(--input-color-placeholder) decoration-0 w-full '>
          <a href='#' class='hover:text-(--input-color)'>
            Forgot password
          </a>
          <a href='#' class='hover:text-(--input-color)'>
            Sign Up
          </a>
        </div>
        <input
          type='submit'
          value='Login'
          class='outline-none border-none bg-(--input-color) px-6 py-4 rounded-md cursor-pointer font-semibold mt-24 text-xl active:opacity-90 active:scale-95 transition ease-out font-mono tracking-wider text-(--input-bg-color)'
          onClick={e => {
            e.preventDefault();
            const _form = e.currentTarget.closest(
              'form',
            ) as HTMLFormElement;

            let data = new FormData(_form);

            const inputs = _form.querySelectorAll('input');

            [...inputs]
              .filter(input => input.type !== 'submit')
              .forEach(input => {
                input.value = '';
              });

            handleSubmit?.(data);
            data = new FormData(_form);
          }}
        />
      </form>
    </div>
  );
};
