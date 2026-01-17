import { For, type ParentComponent } from 'solid-js';
import { Accordion } from '~cn-comp/accordion';
import type { PoliceProps } from '../../types';
import Police from './Police';

/**
 * Composant affichant une liste de polices dans un accordéon
 * @param object props
 * @param PoliceProps[] props.polices
 * @param JSX.Element props.children, représente le guide d'utilisation de la police
 * @returns
 */
export const Polices: ParentComponent<{ polices: PoliceProps[] }> = ({
  polices,
  children,
}) => {
  return (
    <Accordion collapsible class='flex flex-col space-y-8'>
      <For
        each={polices}
        children={(data, index) => {
          const props = { ...data, index };
          return <Police {...props} />;
        }}
      ></For>
      {children}
    </Accordion>
  );
};
