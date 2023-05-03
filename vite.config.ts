import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'camel-ui-toast',
      formats: ['cjs', 'es'],
      fileName: (fileName) => (fileName === 'cjs' ? 'index.js' : 'index.es.js')
    }
  }
});
