# w-audioplayer-vue
An audio player by howler.

![language](https://img.shields.io/badge/language-JavaScript-orange.svg) 
[![language](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://github.com/vuejs/vue) 
[![npm version](http://img.shields.io/npm/v/w-audioplayer-vue.svg?style=flat)](https://npmjs.org/package/w-audioplayer-vue) 
[![Build Status](https://travis-ci.org/yuda-lyu/w-audioplayer-vue.svg?branch=master)](https://travis-ci.org/yuda-lyu/w-audioplayer-vue) [![license](https://img.shields.io/npm/l/w-audioplayer-vue.svg?style=flat)](https://npmjs.org/package/w-audioplayer-vue) 
[![gzip file size](http://img.badgesize.io/yuda-lyu/w-audioplayer-vue/master/dist/w-audioplayer-vue.umd.js.svg?compression=gzip)](https://github.com/yuda-lyu/w-audioplayer-vue)
[![npm download](https://img.shields.io/npm/dt/w-audioplayer-vue.svg)](https://npmjs.org/package/w-audioplayer-vue) 
[![jsdelivr download](https://img.shields.io/jsdelivr/npm/hm/w-audioplayer-vue.svg)](https://www.jsdelivr.com/package/npm/w-audioplayer-vue)

## Documentation
To view documentation or get support, visit [docs](https://yuda-lyu.github.io/w-audioplayer-vue/module-WAudioplayerVue.html).

## Example
To view some examples for more understanding, visit examples:
> **default:** [ex-default.html](https://yuda-lyu.github.io/w-audioplayer-vue/examples/ex-default.html) [[source code](https://github.com/yuda-lyu/w-audioplayer-vue/blob/master/docs/examples/ex-default.html)]

## Installation
### Using npm(ES6 module):
> **Note:** w-audioplayer-vue depends on `tinymce`, `@tinymce/tinymce-vue` and `vue`.
```alias
npm i w-audioplayer-vue
```
By import:
```alias
<w-audioplayer-vue 
    v-model="..."
></w-audioplayer-vue>

import WAudioplayerVue from 'w-audioplayer-vue'

Vue.component('w-audioplayer-vue', WAudioplayerVue)
```

### In a browser(UMD module):
> **Note:** umd file includes with `@tinymce/tinymce-vue`, by using tree-shaking for dead-code elimination

[Necessary] Add script for tinymce.
```alias
<script src="https://cdn.jsdelivr.net/npm/tinymce/tinymce.min.js"></script>
```
[Necessary] Add script for vue.
```alias
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
```
[Necessary] Add script for w-audioplayer-vue.
```alias
<script src="https://cdn.jsdelivr.net/npm/w-audioplayer-vue@1.0.3/dist/w-audioplayer-vue.umd.js"></script>
```
Directly use:
```alias
<w-audioplayer-vue 
    v-model="..."
></w-audioplayer-vue>

Vue.component('w-audioplayer-vue', window['w-audioplayer-vue'])

new Vue({
    el: '#app',
    data: {
        content: 'abc中文123'
    }
})
```