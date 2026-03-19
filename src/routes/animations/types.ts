import type {
  ANIMATION_STATE,
  CODE_TABS,
  ANIMATION_TYPES,
} from './-constants';

export type AnimationState = (typeof ANIMATION_STATE)[number];
export type CodeTab = (typeof CODE_TABS)[number];
export type AnimationType = (typeof ANIMATION_TYPES)[number];

export type AnimationData = {
  id: string;
  name: string;
  description: string;
  type: AnimationType;
  animationClass: string;
  duration: number;
};
