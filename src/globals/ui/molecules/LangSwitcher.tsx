import type { Component } from 'solid-js';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../cn/components/ui/select';
import { lang, LANGS, setLang } from '../signals/lang';
import type { NotReadonly } from '@bemedev/app-ts/lib/types';

export const LangSwitcher: Component = () => {
  return (
    <Select
      options={LANGS as NotReadonly<typeof LANGS>}
      value={lang()}
      onChange={setLang}
      itemComponent={props => (
        <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
      )}
    >
      <SelectTrigger
        class='w-24 mx-auto overflow-hidden cursor-pointer'
        data-testid={'TEST_IDS.lang'}
      >
        <div class='w-11/12 text-left truncate'>
          <SelectValue<string>>
            {({ selectedOption }) => selectedOption()}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent class='bg-white' />
    </Select>
  );
};
