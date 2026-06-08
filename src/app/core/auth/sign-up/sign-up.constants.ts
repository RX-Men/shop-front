export const NAME_PATTERN = /^[a-zA-ZЀ-ӿ\s'-]+$/;

export const MIN_AGE = 13;
export const MAX_AGE = 120;

export const POSTAL_CODE_PATTERNS: Record<string, { pattern: RegExp; example: string }> = {
  US: { pattern: /^\d{5}(-\d{4})?$/, example: '12345 or 12345-6789' },
  CA: { pattern: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, example: 'A1B 2C3' },
  MX: { pattern: /^\d{5}$/, example: '12345' },
};
