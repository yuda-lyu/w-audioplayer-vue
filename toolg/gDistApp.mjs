import rollupFiles from 'w-package-tools/src/rollupFiles.mjs'


let fdSrc = './src'
let fdTar = './docs/examples/'


rollupFiles({
    fns: 'App.vue',
    fdSrc,
    fdTar,
    nameDistType: 'kebabCase',
    globals: { //用rollup很難編譯ag-grid-community與ag-grid-vue故由外部引入
        'ag-grid-community': 'agGrid',
        'ag-grid-vue': 'ag-grid-vue',
    },
    external: [
        'ag-grid-community',
        'ag-grid-vue',
    ],
})

