import { createSignal } from 'solid-js';
import { ANIMATION_TYPES } from '../-constants';
import { AnimationData, AnimationType } from '../-types';

export const useAnimationsPageHook = (...data: AnimationData[]) => {
  const anims = new Set(ANIMATION_TYPES);
  const [searchQuery, setSearchQuery] = createSignal('');
  const [selectedCategories, setSelectedCategories] = createSignal(anims);
  const has = (type: AnimationType) => selectedCategories().has(type);

  const toggleCategory = (category: AnimationType) => {
    setSelectedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const filteredAnimations = () => {
    const query = searchQuery().toLowerCase();
    return data.filter(animation => {
      const matchesSearch =
        animation.name.toLowerCase().includes(query) ||
        animation.description.toLowerCase().includes(query);
      const matchesCategory = has(animation.type);
      return matchesSearch && matchesCategory;
    });
  };

  const length = () => filteredAnimations().length;

  const filteredByType = (type: AnimationType) => {
    return filteredAnimations().filter(a => a.type === type);
  };

  return {
    filteredByType,
    has,
    length,
    searchQuery,
    setSearchQuery,
    toggleCategory,
  };
};
