type LabelOrientation = 'horizontal' | 'vertical';

interface Option<TValue extends string> {
  text: string;
  value: TValue;
}

export type { LabelOrientation, Option };
