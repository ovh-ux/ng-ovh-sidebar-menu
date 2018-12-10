import rollupConfig from '@ovh-ux/component-rollup-config';

const config = rollupConfig({
  input: 'src/ovh-angular-sidebar-menu.js',
});

export default [
  config.cjs(),
  config.umd({
    output: {
      globals: {
        jquery: '$',
        angular: 'angular',
        lodash: '_',
      },
    },
  }),
];