import fs from 'fs'
import _ from 'lodash'
import prettyhtml from '@starptech/prettyhtml'
import w from 'wsemi'
import getFiles from 'w-package-tools/src/getFiles.mjs'
import cleanFolder from 'w-package-tools/src/cleanFolder.mjs'


let fdSrc = './src/'
let fdTestHtml = './test-html/'
//let fdTestSrc = './test-action/'


let h = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-tw">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>example for {{casename}}</title>

    <!-- vue -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.min.js"></script>

    <!-- w-audioplayer-vue -->
    <script src="../dist/w-audioplayer-vue.umd.js"></script>

    <style>
        .item {
            transition: all 0.3s linear;
            display: inline-block;
            margin: 0px 15px 20px 0px;
            padding: 4px 15px;
            border-radius: 30px;
            cursor: pointer;
            font-size: 0.8rem;
            background-color:#f6f6f6;
        }
        .item-active {
            color: #fff;
            background-color:rgb(141, 32, 145);
        }
        .item-inactive:hover {
            background-color:#eaeaea;
        }
        .item-link {
            margin-right: 10px;
            padding: 2px 10px;
            font-size: 0.8rem;
            color:#f22;
            background-color:#fafafa;
            border-radius:10px;
            cursor:pointer;
            text-decoration:none;
        }
        .item-shadow {
            box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
        }
    </style>

</head>
<body style="font-family:'Microsoft JhengHei','Avenir','Helvetica'; padding:0px 30px; margin:0px;">

    <div id="app">

        {{tmp}}

    </div>

    <script>

        //install w-audioplayer-vue
        Vue.component('w-audioplayer-vue', window['w-audioplayer-vue'])

        //initialize
        new Vue({
            el: '#app',
            data: {{data}},
            mounted: {{mounted}},
            computed: {{computed}},
            methods: {{methods}},
        })

    </script>

</body>
</html>
`


function extractApp(fn) {

    //casename
    let tfn = fn.replace('App', '')
    let casename = _.toLower(tfn[0]) + w.strdelleft(tfn, 1)

    //read
    let hh = fs.readFileSync(fdSrc + fn, 'utf8')

    let r
    let reg
    function parse(name) {
        let r = `(    ${name}:)[\\s\\S]+(    },)`
        let reg = new RegExp(r, 'g')
        let c = _.get(hh.match(reg), 0)
        if (c) {
            c = c.replace(`${name}:`, ``)

            let ts = ['mounted', 'methods', 'computed', 'data']
            ts = _.pull(ts, name)

            let ss = _.split(c, '\r\n')
            let q = []
            for (let i = 0; i < _.size(ss); i++) {
                let s = ss[i]
                if (w.binstr(s, ts)) {
                    break
                }
                else {
                    q.push(s)
                }
            }
            c = _.join(q, '\r\n')

            c = w.strdelright(c, 1)
        }
        else {
            c = null
        }
        return c
    }

    //tmp
    r = `<template>[\\s\\S]+<\/template>`
    reg = new RegExp(r, 'g')
    let tmp = hh.match(reg)[0]
    let s = _.split(tmp, '\r\n')
    s = _.drop(s, 2)
    s = _.dropRight(s, 2)
    tmp = _.join(s, '\r\n')
    tmp = w.replace(tmp, 'WAudioplayerVue', 'w-audioplayer-vue')
    //console.log('tmp', tmp)

    //data
    let data = parse('data')
    if (!data) {
        data = 'function() { return {} }'
    }
    //console.log('data', data)

    //mounted
    let mounted = parse('mounted')
    if (!mounted) {
        mounted = 'function() {}'
    }
    //console.log('mounted', mounted)

    //computed
    let computed = parse('computed')
    if (!computed) {
        computed = '{}'
    }
    //console.log('computed', computed)

    //methods
    let methods = parse('methods')
    if (!methods) {
        methods = '{}'
    }
    //console.log('methods', methods)

    //action
    r = `'action[\\s\\S]+ {12}\\]`
    reg = new RegExp(r, 'g')
    let action = _.get(hh.match(reg), 0)
    if (action) {
        action = action.replace(`'actions':`, ``)
    }
    else {
        action = '[]'
    }
    //console.log('action', action)

    //c
    let c = h

    //replace casename
    c = c.replace('{{casename}}', casename)

    //replace tmp
    c = c.replace('{{tmp}}', tmp)

    //replace data
    c = c.replace('{{data}}', data)

    //replace mounted
    c = c.replace('{{mounted}}', mounted)

    //prettyhtml
    //replace computed
    c = c.replace('{{computed}}', computed)

    //replace methods
    c = c.replace('{{methods}}', methods)

    //prettyhtml
    c = prettyhtml(c, {
        tabWidth: 4,
    })

    //write
    //console.log(c)
    fs.writeFileSync(fdTestHtml + `ex-${casename}.html`, c, 'utf8')

    // //write action
    // fs.writeFileSync(fdTestSrc + `${v.fn}.action.json`, v.action, 'utf8')

}


function main() {
    //由jsdoc產製之wsemi.html, 自動添加將example轉換成codepen線上編輯功能

    //cleanFolder
    cleanFolder(fdTestHtml)
    //cleanFolder(fdTestSrc)

    //getFiles
    let ltfs = getFiles(fdSrc)

    //filter
    ltfs = _.filter(ltfs, function(v) {
        return v.indexOf('App') >= 0
    })
    _.pull(ltfs, 'App.vue')
    //console.log(ltfs)

    //extractApp
    _.each(ltfs, function(v) {
        console.log('extracting: ' + fdSrc + v)
        extractApp(v)
    })

}
main()
