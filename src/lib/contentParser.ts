import { useAppStore } from '../state/store';

/**
 * Parses a content string containing region-specific conditional blocks.
 * Syntax: {{INTERNATIONAL:Text for international|KENYA:Text for kenya}}
 */
export const parseLocalizedContent = (content: string | undefined | null): string => {
  if (!content) return '';
  const regionMode = useAppStore.getState().regionMode;
  
  return content.replace(/\{\{INTERNATIONAL:(.*?)\|KENYA:(.*?)\}\}/g, (match, intText, keText) => {
    return regionMode === 'kenya' ? keText : intText;
  });
};
