import {
  createDeferred,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  type Accessor,
} from 'solid-js';

export const assignDocument = () => {
  const [doc, setDoc] = createSignal<Document>();
  onMount(() => setDoc(document));
  return createDeferred(doc, { timeoutMs: 15 });
};

export type UseDocumentProps = Record<string, (doc: Document) => void>;
type Out<T extends UseDocumentProps> = { [K in keyof T]: () => void };

export const useDocument = <const T extends UseDocumentProps>(
  props: T,
): Out<T> => {
  const doc = assignDocument();
  const entries = Object.entries(props);

  const out = Object.fromEntries(
    entries.map(([name, handler]) => {
      const method = () => {
        const _doc = doc();
        if (_doc) return handler(_doc);
      };
      return [name, method] as const;
    }),
  );

  return out as Out<T>;
};

/**
 * Crée un gestionnaire d'événements pour l'objet `document` qui peut être activé/désactivé conditionnellement.
 *
 * @template K - Type de l'événement document (keyof DocumentEventMap)
 * @param type - Type d'événement à écouter (ex: 'keydown', 'click', 'visibilitychange')
 * @param listener - Fonction callback appelée lors du déclenchement de l'événement
 * @param condition - Condition (booléenne ou accessor) qui détermine si l'événement doit être écouté
 * @returns Objet contenant les méthodes `add` et `remove` pour gérer manuellement l'événement
 *
 * @example
 * ```tsx
 * const [visible, setRef] = createIntersect();
 *
 * createDocumentHandler(
 *   'keydown',
 *   (e) => {
 *     if (e.key === 'Escape') handleEscape();
 *   },
 *   visible
 * );
 * ```
 */
export const createDocumentHandler = <K extends keyof DocumentEventMap>(
  type: K,
  listener: (ev: DocumentEventMap[K]) => void,
  condition: boolean | Accessor<boolean | undefined>,
) => {
  const { add, remove } = useDocument({
    add: ({ addEventListener }) => addEventListener(type, listener),
    remove: ({ removeEventListener }) =>
      removeEventListener(type, listener),
  });

  createEffect(() => {
    const _condition =
      typeof condition === 'function' ? (condition() ?? false) : condition;
    if (_condition) return add();
    return remove();
  });

  onCleanup(remove);
  return { add, remove };
};

/**
 * Crée un gestionnaire d'événements pour l'objet `document` qui s'active au montage du composant.
 * Version simplifiée de `createDocumentHandler` sans condition, l'événement est toujours actif après le montage.
 *
 * @template K - Type de l'événement document (keyof DocumentEventMap)
 * @param type - Type d'événement à écouter (ex: 'click', 'visibilitychange', 'keydown')
 * @param listener - Fonction callback appelée lors du déclenchement de l'événement
 *
 * @example
 * ```tsx
 * createDocumentHandler.onMount('visibilitychange', () => {
 *   console.log('Visibility changed');
 * });
 * ```
 */
createDocumentHandler.onMount = <K extends keyof DocumentEventMap>(
  type: K,
  listener: (ev: DocumentEventMap[K]) => void,
) => {
  onMount(() => {
    document.addEventListener(type, listener);
    return onCleanup(() => document.removeEventListener(type, listener));
  });
};
