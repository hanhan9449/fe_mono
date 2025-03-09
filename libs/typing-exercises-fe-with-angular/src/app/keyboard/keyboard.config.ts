import { KeyboardItemInterface } from '../keyboard-item/keyboard-item.interface';

export const defaultKeyboardItemConfig = {
  width: 44,
  height: 44,
  gap: 4,
};
const tabWidth = 72;
const controlWidth = 92;
const returnWidth = 108;
const leftShiftWidth = 116;
const metaWidth = 66;
const rightShiftWidth = 84;
const deleteWidth = 72;
const spaceWidth = 382;

export const hhkbKeyboardConfig: KeyboardItemInterface[][] = [
  // line1
  [
    { variant: 'one-line', line1: 'Esc', flag: ['Escape'], color: 'grey' },
    { variant: 'two-line', line1: '!', line2: '1', flag: ['Digit1'] },
    { variant: 'two-line', line1: '@', line2: '2', flag: ['Digit2'] },
    { variant: 'two-line', line1: '#', line2: '3', flag: ['Digit3'] },
    { variant: 'two-line', line1: '$', line2: '4', flag: ['Digit4'] },
    { variant: 'two-line', line1: '%', line2: '5', flag: ['Digit5'] },
    { variant: 'two-line', line1: '^', line2: '6', flag: ['Digit6'] },
    { variant: 'two-line', line1: '&', line2: '7', flag: ['Digit7'] },
    { variant: 'two-line', line1: '*', line2: '8', flag: ['Digit8'] },
    { variant: 'two-line', line1: '(', line2: '9', flag: ['Digit9'] },
    { variant: 'two-line', line1: ')', line2: '0', flag: ['Digit0'] },
    { variant: 'two-line', line1: '_', line2: '-', flag: ['Minus'] },
    { variant: 'two-line', line1: '+', line2: '=', flag: ['Equal'] },
    { variant: 'two-line', line1: '|', line2: '\\', flag: ['Backslash'] },
    { variant: 'two-line', line1: '~', line2: '`', flag: ['Backquote'] },
  ],
  // line2
  [
    {
      variant: 'one-line',
      line1: 'Tab',
      flag: ['Tab'],
      color: 'grey',
      width: tabWidth,
    },
    { variant: 'one-line', line1: 'Q', flag: ['KeyQ'] },
    { variant: 'one-line', line1: 'W', flag: ['KeyW'] },
    { variant: 'one-line', line1: 'E', flag: ['KeyE'] },
    { variant: 'one-line', line1: 'R', flag: ['KeyR'] },
    { variant: 'one-line', line1: 'T', flag: ['KeyT'] },
    { variant: 'one-line', line1: 'Y', flag: ['KeyY'] },
    { variant: 'one-line', line1: 'U', flag: ['KeyU'] },
    { variant: 'one-line', line1: 'I', flag: ['KeyI'] },
    { variant: 'one-line', line1: 'O', flag: ['KeyO'] },
    { variant: 'one-line', line1: 'P', flag: ['KeyP'] },
    { variant: 'two-line', line1: '{', line2: '[', flag: ['BracketLeft'] },
    { variant: 'two-line', line1: '}', line2: ']', flag: ['BracketRight'] },
    {
      variant: 'one-line',
      line1: 'Delete',
      flag: ['Backspace'],
      color: 'grey',
      width: deleteWidth,
    },
  ],
  // line3
  [
    {
      variant: 'one-line',
      line1: 'Control',
      flag: ['ControlLeft'],
      color: 'grey',
      width: controlWidth,
    },
    { variant: 'one-line', line1: 'A', flag: ['KeyA'] },
    { variant: 'one-line', line1: 'S', flag: ['KeyS'] },
    { variant: 'one-line', line1: 'D', flag: ['KeyD'] },
    { variant: 'one-line', line1: 'F', flag: ['KeyF'] },
    { variant: 'one-line', line1: 'G', flag: ['KeyG'] },
    { variant: 'one-line', line1: 'H', flag: ['KeyH'] },
    { variant: 'one-line', line1: 'J', flag: ['KeyJ'] },
    { variant: 'one-line', line1: 'K', flag: ['KeyK'] },
    { variant: 'one-line', line1: 'L', flag: ['KeyL'] },
    { variant: 'two-line', line1: ':', line2: ';', flag: ['Semicolon'] },
    { variant: 'two-line', line1: '"', line2: "'", flag: ['Quote'] },
    {
      variant: 'one-line',
      line1: 'Return',
      flag: ['Enter'],
      color: 'grey',
      width: returnWidth,
    },
  ],
  // line4
  [
    {
      variant: 'one-line',
      line1: 'Shift',
      flag: ['ShiftLeft'],
      color: 'grey',
      width: leftShiftWidth,
    },
    { variant: 'one-line', line1: 'Z', flag: ['KeyZ'] },
    { variant: 'one-line', line1: 'X', flag: ['KeyX'] },
    { variant: 'one-line', line1: 'C', flag: ['KeyC'] },
    { variant: 'one-line', line1: 'V', flag: ['KeyV'] },
    { variant: 'one-line', line1: 'B', flag: ['KeyB'] },
    { variant: 'one-line', line1: 'N', flag: ['KeyN'] },
    { variant: 'one-line', line1: 'M', flag: ['KeyM'] },
    { variant: 'two-line', line1: '<', line2: ',', flag: ['Comma'] },
    { variant: 'two-line', line1: '>', line2: '.', flag: ['Period'] },
    { variant: 'two-line', line1: '?', line2: '/', flag: ['Slash'] },
    {
      variant: 'one-line',
      line1: 'Shift',
      flag: ['ShiftRight'],
      color: 'grey',
      width: rightShiftWidth,
    },
    { variant: 'one-line', line1: 'Fn', flag: ['TODO'], color: 'grey' },
  ],
  // line5
  [
    { variant: 'one-line', line1: '⌥', flag: ['AltLeft'], color: 'grey' },
    {
      variant: 'one-line',
      line1: '⌘',
      flag: ['MetaLeft'],
      color: 'grey',
      width: metaWidth,
    },
    { variant: 'one-line', line1: '', flag: ['Space'], width: spaceWidth },
    {
      variant: 'one-line',
      line1: '⌘',
      flag: ['MetaRight'],
      color: 'grey',
      width: metaWidth,
    },
    { variant: 'one-line', line1: '⌥', flag: ['AltRight'], color: 'grey' },
  ],
];
