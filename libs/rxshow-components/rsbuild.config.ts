import { defineConfig } from '@rsbuild/core';
import {pluginSass} from '@rsbuild/plugin-sass'

export default defineConfig({
  plugins: [pluginSass()],
});