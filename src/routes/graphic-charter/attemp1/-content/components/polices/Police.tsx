import { createSignal, For, type Component } from 'solid-js';
import { Accordion } from '~cn-comp/accordion';
import {
  Checkbox,
  CheckboxControl,
  CheckboxLabel,
} from '~cn-comp/checkbox';
import { ToggleGroup, ToggleGroupItem } from '~cn-comp/toggle-group';
import { cn } from '~cn/utils';
import fcc from '~ui/helpers/fcc';
import {
  DECORATION_CONFIG,
  DECORATIONS,
  FONT_SIZE_CONFIG,
  FONT_SIZES,
  THICKNESS_CONFIG,
  THICKNESSES,
} from '../../constants';
import type {
  FontDecoration,
  FontSize,
  FontThickness,
  PoliceProps,
} from '../../types';
import { getDecorationClasses } from '../../utils';

/**
 * Composant Police - Affiche une police avec des contrôles interactifs pour la matrice
 * Utilise slider pour la taille, checkboxes pour les décorations, et toggle-group pour les couleurs
 */
export const Police: Component<PoliceProps> = props => {
  // États pour les contrôles
  const [selectedSize, setSelectedSize] = createSignal<FontSize>('base');
  const [selectedDecorations, setSelectedDecorations] = createSignal<
    FontDecoration[]
  >([]);
  const [selectedThickness, setSelectedThickness] =
    createSignal<FontThickness>(THICKNESSES[1]);
  const [selectedColor, setSelectedColor] = createSignal<string>(
    props.colors[0].color,
  );

  return (
    <Accordion.Item
      value={`Item - ${props.index?.() ?? '0'}`}
      class={cn(
        'cursor-pointer border-l-4 border-t border-b-0 pl-6 p-4 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-transform duration-150 ease-in-out hover:scale-[1.02]',
        props.class,
      )}
      style={{ 'border-color': props.borderColor }}
    >
      {/* En-tête de la police */}
      <Accordion.Trigger class='cursor-pointer hover:no-underline select-none'>
        <div class='flex space-x-6'>
          <h3
            class='text-4xl font-bold text-[#2C5364] cursor-pointer'
            style={{ 'font-family': props.fontFamily }}
          >
            {props.name}
          </h3>
          <span class='text-sm text-gray-500 font-medium mt-3 cursor-pointer'>
            {props.usage}
          </span>
        </div>
      </Accordion.Trigger>
      <Accordion.Content class='cursor-auto'>
        {/* Description */}
        <p
          class='text-lg text-gray-700 mb-4'
          style={{ 'font-family': props.fontFamily }}
        >
          Explorez les différentes tailles, décorations et couleurs
          disponibles pour cette police.
        </p>

        {/* Informations */}
        <div class='flex flex-wrap gap-4 text-sm text-gray-600 items-center mb-6'>
          <span class='bg-white px-3 py-1 rounded'>{props.weights}</span>
          <a
            href={props.googleFontsUrl}
            target='_blank'
            rel='noopener noreferrer'
            class='text-[#4B9CAD] hover:underline underline-offset-2'
          >
            → Google Fonts
          </a>
        </div>

        <div class='bg-white p-4 rounded-lg border border-gray-200'>
          <div class='flex flex-col divide-y-2 px-4'>
            <div class='flex flex-col space-y-4'>
              <h3 class='text-lg text-yellow-700 border-x-2 w-fit px-3 mx-auto font-semibold'>
                Contrôles
              </h3>
              <div class='p-2 border-2 border-yellow-800'>
                <div class='flex flex-col items-center md:flex md:flex-row space-y-4 md:space-y-0 md:justify-evenly py-6 md:items-start'>
                  {/* Contrôle de taille (Slider/Toggle Group) */}
                  <div class='space-y-3'>
                    <label class='text-sm font-semibold text-[#2C5364]'>
                      📏 Taille de la police
                    </label>
                    <ToggleGroup
                      value={selectedSize()}
                      onChange={value => {
                        if (!value || value === selectedSize()) return;
                        return setSelectedSize(value as FontSize);
                      }}
                      class='justify-start'
                    >
                      <For each={FONT_SIZES}>
                        {size => (
                          <ToggleGroupItem
                            value={size}
                            aria-label={FONT_SIZE_CONFIG[size].label}
                            class='cursor-pointer'
                          >
                            {FONT_SIZE_CONFIG[size].label}
                          </ToggleGroupItem>
                        )}
                      </For>
                    </ToggleGroup>
                  </div>

                  {/* Contrôle des décorations (Checkboxes) */}
                  <div class='flex flex-col space-y-2'>
                    <label class='text-sm font-semibold text-[#2C5364]'>
                      ✨ Décorations
                    </label>
                    <div class='flex space-x-4'>
                      <For each={DECORATIONS}>
                        {decoration => (
                          <Checkbox
                            checked={selectedDecorations().includes(
                              decoration,
                            )}
                            onChange={checked => {
                              if (checked) {
                                // Si on coche "underline", on décoche "line-through" et vice versa
                                let newDecorations = [
                                  ...selectedDecorations(),
                                  decoration,
                                ];

                                if (decoration === 'underline') {
                                  newDecorations = newDecorations.filter(
                                    d => d !== 'line-through',
                                  );
                                } else if (decoration === 'line-through') {
                                  newDecorations = newDecorations.filter(
                                    d => d !== 'underline',
                                  );
                                }

                                setSelectedDecorations(newDecorations);
                              } else {
                                setSelectedDecorations(
                                  selectedDecorations().filter(
                                    d => d !== decoration,
                                  ),
                                );
                              }
                            }}
                            class='flex space-x-2 items-center'
                          >
                            <CheckboxControl />
                            <CheckboxLabel
                              class={cn(
                                'text-sm',
                                DECORATION_CONFIG[decoration].class,
                              )}
                            >
                              {DECORATION_CONFIG[decoration].label}
                            </CheckboxLabel>
                          </Checkbox>
                        )}
                      </For>
                    </div>
                  </div>
                </div>

                <div class='flex flex-col items-center md:flex md:flex-row space-y-4 md:space-y-0 md:justify-evenly py-6 md:items-start'>
                  {/* Contrôle de l'épaisseur (Toggle Group) */}
                  <div class='flex flex-col space-y-3'>
                    <label class='text-sm font-semibold text-[#2C5364]'>
                      💪 Épaisseur
                    </label>
                    <ToggleGroup
                      value={selectedThickness()}
                      onChange={value => {
                        if (!value || value === selectedThickness())
                          return;
                        return setSelectedThickness(
                          value as FontThickness,
                        );
                      }}
                      class='justify-start'
                    >
                      <For each={THICKNESSES}>
                        {thickness => (
                          <ToggleGroupItem
                            value={thickness}
                            aria-label={THICKNESS_CONFIG[thickness].label}
                            class={cn(
                              'cursor-pointer',
                              THICKNESS_CONFIG[thickness].class,
                            )}
                          >
                            {THICKNESS_CONFIG[thickness].label}
                          </ToggleGroupItem>
                        )}
                      </For>
                    </ToggleGroup>
                  </div>

                  {/* Contrôle des couleurs (Toggle Group avec carrés de couleur) */}
                  <div class='flex flex-col space-y-3'>
                    <label class='text-sm font-semibold text-[#2C5364]'>
                      🎨 Couleur
                    </label>
                    <ToggleGroup
                      value={selectedColor()}
                      onChange={value => {
                        if (!value || value === selectedColor()) return;
                        return setSelectedColor(value);
                      }}
                      class='justify-start gap-3'
                    >
                      <For each={props.colors}>
                        {({ color, text }) => (
                          <ToggleGroupItem
                            value={color}
                            aria-label={text}
                            class='p-0 rounded border-2 transition-all duration-200 size-10 cursor-pointer'
                            classList={{
                              'scale-120': selectedColor() === color,
                            }}
                            style={{
                              'background-color': color,
                              'border-color':
                                selectedColor() === color
                                  ? '#2C5364'
                                  : color === '#FFFFFF'
                                    ? '#d1d5db'
                                    : 'transparent',
                            }}
                            title={`${text} (${color})`}
                          >
                            {color === '#FFFFFF' && (
                              <span class='text-xs font-bold text-black'>
                                W
                              </span>
                            )}
                          </ToggleGroupItem>
                        )}
                      </For>
                    </ToggleGroup>
                    <p class='text-xs text-gray-500'>
                      Couleur sélectionnée :{' '}
                      {
                        props.colors.find(c => c.color === selectedColor())
                          ?.text
                      }{' '}
                      ({selectedColor()})
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Aperçu en temps réel */}
            <div class='mt-10 pb-6 pt-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50'>
              <div class='text-xl text-gray-500 mb-10 font-extralight italic'>
                👁️ Aperçu en temps réel
              </div>
              <p
                class={cn(
                  FONT_SIZE_CONFIG[selectedSize()].class,
                  THICKNESS_CONFIG[selectedThickness()].class,
                  getDecorationClasses(selectedDecorations()),
                  'transition-all duration-200 px-1 rounded-xs w-fit mx-auto',
                )}
                style={{
                  'font-family': props.fontFamily,
                  color: selectedColor(),

                  'background-color': fcc.custom(
                    selectedColor(),
                    '#f9fafb',
                    'black',
                  ),
                }}
                classList={{
                  'ring-4 ring-gray-100': fcc(selectedColor()) === 'black',
                }}
              >
                Un aperçu en temps réel de la police sélectionnée.
              </p>
              <div class='mt-4 text-xs text-gray-500 space-y-1'>
                <div>
                  <strong>Taille :</strong>{' '}
                  {FONT_SIZE_CONFIG[selectedSize()].label}
                </div>
                <div>
                  <strong>Épaisseur :</strong>{' '}
                  {THICKNESS_CONFIG[selectedThickness()].label}
                </div>
                <div>
                  <strong>Décorations :</strong>{' '}
                  {selectedDecorations().length > 0
                    ? selectedDecorations()
                        .map(d => DECORATION_CONFIG[d].label)
                        .join(', ')
                    : 'Aucune'}
                </div>
                <div>
                  <strong>Couleur :</strong>{' '}
                  {
                    props.colors.find(c => c.color === selectedColor())
                      ?.text
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
};

export default Police;
