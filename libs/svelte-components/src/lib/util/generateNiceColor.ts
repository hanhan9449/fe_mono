export function generateNiceColor() {
  // 选择一个方向
  const base = Math.floor(Math.random() * 360);
  const s = 20;
  const l = 90;
  const offset = 20;
  const list = [-2, -1, 0, 1, 2]
    .map((it) => base + offset * it)
    .map((it) => (it < 0 ? it + 360 : it));
  const colorList = list.map((it) => `hsl(${it},${s}%,${l}%)`);
  const baseColor = `hsl(${base},${20}%,${97}%)`;
  const textColor = `hsl(${base},${40}%,${40}%)`;
  const textColor2 = `hsl(${base},${40}%,${40}%,.8)`;

  return {
    colorList,
    baseColor,
    textColor,
    textColor2,
  };
}
export function generateNiceColorCssText() {
  const color = generateNiceColor();
  let res = `
<style>
:root{
    --normal-color1: ${color.colorList[0]};
    --normal-color2: ${color.colorList[1]};
    --normal-color3: ${color.colorList[2]};
    --normal-color4: ${color.colorList[3]};
    --normal-color5: ${color.colorList[4]};
    --text-color1: ${color.textColor};
    --bg-color1: ${color.baseColor};
    --text-color2: ${color.textColor2};
}
</style>
`;
  return res;
}
