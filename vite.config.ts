import * as path from 'path';

import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import pkg from './package.json';

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      resolve: {
        alias: [
          { find: '@', replacement: path.resolve(__dirname, 'src') },
          {
            find: '@components',
            replacement: path.resolve(__dirname, 'src/components')
          },
          {
            find: '@context',
            replacement: path.resolve(__dirname, 'src/context')
          },
          {
            find: '@provider',
            replacement: path.resolve(__dirname, 'src/provider')
          }
        ]
      }
    };
  }
  return {
    build: {
      lib: {
        entry: 'src/index.ts',
        name: 'camel-ui-toast',
        formats: ['cjs', 'es'],
        fileName: (fileName) => (fileName === 'cjs' ? 'index.js' : 'index.es.js')
      },
      rollupOptions: {
        external: [...Object.keys(pkg.peerDependencies), /@emotion/g],
        output: {
          interop: 'auto'
        }
      }
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        plugins: [['@swc/plugin-emotion', {}]]
      }),
      dts()
    ],
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        {
          find: '@components',
          replacement: path.resolve(__dirname, 'src/components')
        },
        {
          find: '@context',
          replacement: path.resolve(__dirname, 'src/context')
        },
        {
          find: '@provider',
          replacement: path.resolve(__dirname, 'src/provider')
        }
      ]
    },
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  };
});
