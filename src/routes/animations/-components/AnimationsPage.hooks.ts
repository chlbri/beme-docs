import { throttle } from '@tanstack/solid-pacer';
import { ANIMATION_TYPES } from '../-constants';
import { AnimationData, AnimationType } from '../-types';
import { Route } from '../index';

export const useAnimationsPageHook = (...data: AnimationData[]) => {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const searchQuery = () => search().q;

  const selectedCategories = () => {
    return new Set(search().categories ?? ANIMATION_TYPES);
  };

  const has = (type: AnimationType) => selectedCategories().has(type);

  const setSearchQuery = throttle(
    (q: string) => {
      if (q === searchQuery()) return;

      return navigate({
        search: prev => ({ ...prev, q }),
        replace: true,
      });
    },
    {
      wait: 300,
      key: 'SEARCH_ANIMATIONS',
    },
  );

  const toggleCategory = throttle(
    (category: AnimationType) => {
      const current = selectedCategories();
      const next = new Set(current);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      const categories = Array.from(next);

      return navigate({
        to: '/animations',
        search: prev => ({ ...prev, categories }),
        replace: true,
      });
    },
    {
      wait: 200,
      key: 'TOGGLE_CATEGORY',
    },
  );

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
