import { createRoot, createSignal } from 'solid-js';
import { createDebounce } from './debounce';
import { createMemo2 } from './memo';

// #region Config
export const LANG_STORE_KEY = 'lang';
export const LANGS = ['fr-FR', 'en-US', 'es-ES'] as const;
export type Lang = (typeof LANGS)[number];
// #endregion

const createLang = () => {
  const [_lang, _setLang] = createSignal<string>();
  const [__ready, __setReady] = createSignal(false);

  const lang = createMemo2<Lang>(
    val => {
      let __lang: any = _lang();
      const check = !__lang || !LANGS.includes(__lang);
      if (check) __lang = val;
      return __lang;
    },
    'en-US',
    {
      equals: (prev, next) => {
        const two1 = prev.slice(0, 2);
        const two2 = next.slice(0, 2);
        return two1 === two2;
      },
    },
  );

  const setLang = (newLang?: string | null) => {
    if (!newLang) return;
    localStorage?.setItem(LANG_STORE_KEY, newLang);
    _setLang(newLang);
  };

  const debounce = createDebounce(setLang, 350);

  const mount = (_lang = 'en-US') => {
    const current = localStorage?.getItem(LANG_STORE_KEY);
    if (!current) setLang(_lang);
    else _setLang(current);
    __setReady(true);
  };

  return [lang, debounce, _setLang, mount, __ready] as const;
};

export const [lang, setLang, setDefaultLang, mount, ready] =
  createRoot(createLang);
