import { VariantType } from './variant.type';

interface Item {
  variant: VariantType;
  flag: string[];
  color?: ColorType;
  isPress?: boolean;
  width?: number;
  height?: number;
}
export type ColorType = 'grey' | 'milk-white';

interface OneLineItem extends Item {
  variant: 'one-line';
  line1: string;
  line2?: string;
}

interface TwoLineItem extends Item {
  variant: 'two-line';
  line1: string;
  line2: string;
}

export type KeyboardItemInterface = OneLineItem | TwoLineItem;
