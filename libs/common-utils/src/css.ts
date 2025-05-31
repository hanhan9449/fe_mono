/**
* 生成六组渐进增强的HSL颜色方案
* @returns {Object} 包含18个CSS变量的对象（每组包含文字色、背景色、阴影色）
*/
export function generateColorSchemes() {
  // 随机生成基础色相 (0-360度)
  const baseHue = Math.floor(Math.random() * 361);

  // 结果对象
  const colorVariables = {} as any;

  // 生成六组颜色方案
  for (let i = 1; i <= 6; i++) {
    // 计算当前组的HSL参数
    const saturation = 30 + (i * 8);  // 饱和度递增 (38% → 78%)
    const lightness = 85 - (i * 5);   // 亮度递减 (80% → 55%)

    // 文字颜色 (更高饱和度，更低亮度)
    const textColor = `hsl(${baseHue}, ${saturation + 20}%, ${lightness - 55}%)`;

    // 背景颜色
    const bgColor = `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;

    // 阴影颜色 (更高饱和度，中等亮度)
    const shadowColor = `hsl(${baseHue}, ${saturation + 15}%, ${lightness - 25}%)`;

    // 添加到结果对象
    colorVariables[`--page-text-${i}`] = textColor;
    colorVariables[`--page-bg-${i}`] = bgColor;
    colorVariables[`--page-shadow-${i}`] = shadowColor;
  }

  // 2. 新增6组仅提高亮度的变体（色相和饱和度不变）
  for (let i = 7; i <= 12; i++) {
    const originalGroup = i - 6; // 对应标准组的编号1-6
    const originalSaturation = 30 + (originalGroup * 8);

    // 亮度提升公式：标准组亮度 + 15%（但不超过95%）
    const boostedLightness = Math.min(90 - (originalGroup * 3) + 15, 99);

    // 文字色（保持与标准组相同的饱和度，亮度按比例提升）
    colorVariables[`--page-text-${i}`] = `hsl(${baseHue}, ${originalSaturation + 20}%, ${boostedLightness - 55}%)`;
    // 背景色（亮度提升）
    colorVariables[`--page-bg-${i}`] = `hsl(${baseHue}, ${originalSaturation}%, ${boostedLightness}%)`;
    // 阴影色（亮度提升）
    colorVariables[`--page-shadow-${i}`] = `hsl(${baseHue}, ${originalSaturation + 15}%, ${boostedLightness - 25}%)`;
  }

  return colorVariables;
}
export function injectCssVariables(cssVariables: any) {
  Object.keys(cssVariables).forEach((key) => {
    document.documentElement.style.setProperty(key, cssVariables[key]);
  });
}