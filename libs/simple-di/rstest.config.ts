import { defineConfig } from '@rstest/core';

export default defineConfig({
    source: {
        decorators: {
            version: 'legacy'
        }
    }
});
