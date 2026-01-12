import { For, type Component } from 'solid-js';
import { cn } from '~/globals/ui/cn/utils';

type Props = {
  list: string[];
  class?: string;
  bgImageUrl: string;
  navClass?: string;
};

export const NavBlurImage: Component<Props> = props => {
  /**
   * CSS Styles
   * because it will be messy to use Tailwind for this component
   */
  const css = `
           :root {
             --url-img: url('${props.bgImageUrl}');
           }
   
           div:has(> nav) {
             background-image: var(--url-img);
             background-attachment: fixed;
   
             & > nav {
               isolation: isolate;
               anchor-name: --hovered-link;
   
               @supports (corner-shape: squircle) {
                 border-radius: 24px;
                 corner-shape: squircle;
               }
   
               & li:hover {
                 anchor-name: --hovered-link;
               }
   
               &::before,
               &::after {
                 content: '';
                 position: absolute;
                 top: calc(anchor(bottom) - 10px);
                 left: calc(anchor(left) + 1rem);
                 right: calc(anchor(right) + 1rem);
                 bottom: calc(anchor(bottom) + 5px);
                 border-radius: 10px;
                 position-anchor: --hovered-link;
                 transition: 500ms
                   linear(
                     0,
                     0.029 1.6%,
                     0.123 3.5%,
                     0.651 10.6%,
                     0.862 14.1%,
                     1.002 17.7%,
                     1.046 19.6%,
                     1.074 21.6%,
                     1.087 23.9%,
                     1.086 26.6%,
                     1.014 38.5%,
                     0.994 46.3%,
                     1
                   );
               }
   
               &::before {
                 z-index: -1;
                 background: rgb(0 0 0 / 0.2);
                 backdrop-filter: blur(2px);
               }
   
               &::after {
                 z-index: -2;
                 background-image: var(--url-img);
                 background-attachment: fixed;
               }
   
               &:has(a:hover)::before,
               &:has(a:hover)::after {
                 top: anchor(top);
                 left: anchor(left);
                 right: anchor(right);
                 bottom: anchor(bottom);
   
                 @supports (corner-shape: squircle) {
                   corner-shape: squircle;
                   border-radius: 50%;
                 }
               }
   
               &:has(li:first-of-type a:hover)::before,
               &:has(li:first-of-type a:hover)::after {
                 @supports (corner-shape: squircle) {
                   border-radius: 20px 50% 50% 20px;
                 }
               }
   
               &:has(li:last-of-type a:hover)::before,
               &:has(li:last-of-type a:hover)::after {
                 @supports (corner-shape: squircle) {
                   border-radius: 50% 20px 20px 50%;
                 }
               }
   
               & > ul {
                 padding: 0;
                 margin: 0;
                 list-style: none;
                 display: flex;
               }
   
               & a {
                 display: block;
                 padding: 1rem;
                 text-decoration: none;
               }
             }
           }
         `;

  return (
    <>
      <style>{css}</style>
      <div class={props.class}>
        <nav class={cn('bg-black/80', props.navClass)}>
          <ul>
            <For each={props.list}>
              {item => (
                <li>
                  <a href='#'>{item}</a>
                </li>
              )}
            </For>
          </ul>
        </nav>
      </div>
    </>
  );
};
