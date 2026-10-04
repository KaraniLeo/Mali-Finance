import { LearningCard } from '../types';
import { parseLocalizedContent } from './contentParser';

/**
 * Normalizes and extracts the correct answer text for a card.
 */
export function getCorrectAnswerText(card: LearningCard): string {
  if (card.correctAnswer === undefined || card.correctAnswer === null) {
    return '';
  }

  const options = card.options || [];

  // Check if correctAnswer is a number index
  if (typeof card.correctAnswer === 'number') {
    if (card.correctAnswer >= 0 && card.correctAnswer < options.length) {
      return parseLocalizedContent(options[card.correctAnswer]);
    }
  }

  const trimmedAns = String(card.correctAnswer).trim();

  // Check if correctAnswer is a numeric string index ("0", "1", "2")
  if (/^\d+$/.test(trimmedAns)) {
    const idx = parseInt(trimmedAns, 10);
    if (idx >= 0 && idx < options.length) {
      return parseLocalizedContent(options[idx]);
    }
  }

  // Check if it matches an option text directly
  const match = options.find(
    opt => parseLocalizedContent(opt).trim().toLowerCase() === parseLocalizedContent(trimmedAns).trim().toLowerCase()
  );
  if (match) {
    return parseLocalizedContent(match);
  }

  return parseLocalizedContent(trimmedAns);
}

/**
 * Checks whether a given option is the correct answer.
 */
export function isOptionCorrect(opt: string, index: number, card: LearningCard): boolean {
  if (card.correctAnswer === undefined || card.correctAnswer === null) {
    return false;
  }

  // Direct index match if correctAnswer is a number
  if (typeof card.correctAnswer === 'number') {
    return index === card.correctAnswer;
  }

  const trimmedAns = String(card.correctAnswer).trim();

  // Numeric string index match
  if (/^\d+$/.test(trimmedAns)) {
    const idx = parseInt(trimmedAns, 10);
    if (idx === index) return true;
  }

  const parsedOpt = parseLocalizedContent(opt).trim().toLowerCase();
  const parsedAns = parseLocalizedContent(trimmedAns).trim().toLowerCase();

  return parsedOpt === parsedAns;
}

/**
 * Generates an in-depth pedagogical explanation for any questionnaire or exercise card.
 */
export function getCardExplanation(card: LearningCard, selectedOption?: string | null): {
  headline: string;
  correctAnswerText: string;
  explanationText: string;
  keyTakeaway: string;
} {
  const correctText = getCorrectAnswerText(card);
  const parsedTitle = parseLocalizedContent(card.title);
  const parsedContent = parseLocalizedContent(card.content);

  // 1. If explicit explanation exists on the card, use it
  if (card.explanation && card.explanation.trim().length > 0) {
    const explicit = parseLocalizedContent(card.explanation);
    return {
      headline: `Understanding ${parsedTitle}`,
      correctAnswerText: correctText,
      explanationText: explicit,
      keyTakeaway: `Mastering this principle helps you protect and grow your capital effectively.`
    };
  }

  // 2. Synthesize an in-depth explanation based on question content & correct answer
  const isQuestion = parsedContent.trim().endsWith('?') || /^(what|why|how|which|when|where|if)\b/i.test(parsedContent.trim());

  let explanationBody = '';
  let takeaway = '';

  if (isQuestion) {
    explanationBody = `The correct answer is "${correctText}". In finance and wealth building, understanding this concept is critical. ${
      parsedTitle ? `When examining ${parsedTitle}, ` : ''
    }evaluating the underlying mechanics rather than surface assumptions reveals why this is the accurate conclusion.`;
    takeaway = `Remember: ${correctText}`;
  } else {
    explanationBody = `The correct answer is "${correctText}".\n\n${parsedContent}\n\nAligning your financial choices with this foundational rule prevents costly missteps and accelerates long-term compounding.`;
    takeaway = `Key Rule: Always distinguish between high-value choices and financial traps.`;
  }

  return {
    headline: `Why "${correctText}" is Correct:`,
    correctAnswerText: correctText,
    explanationText: explanationBody,
    keyTakeaway: takeaway
  };
}
