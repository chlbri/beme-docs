import { Component } from 'solid-js';

export type CaseStudyItem = {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: Component;
  tags: string[];
};
