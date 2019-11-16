import fs from 'fs'
import _ from 'lodash'
import w from 'wsemi'
import getFiles from 'w-package-tools/src/getFiles.mjs'


let fdSrcMP3 = './test-mp3/'
let fdTar = './docs/examples/'
let fdTarMP3 = fdTar + fdSrcMP3


let h = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-tw">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <title>w-audioplayer-vue</title>

    <!-- vue -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>

    <!-- app -->
    <script src="app.umd.js?{rnd}"></script>

</head>
<body style="font-family:'Microsoft JhengHei','Avenir','Helvetica'; padding:0px; margin:0px;">

    <div id="app">
        <w-app></w-app>
    </div>

    <script>

        //install app
        Vue.component('w-app',app)

        //initialize
        new Vue({
            el: '#app',
        })

    </script>

</body>
</html>
`


function main() {
    //產生app.html

    //mkdirSync
    if (!fs.existsSync(fdTar)) {
        fs.mkdirSync(fdTar)
    }
    if (!fs.existsSync(fdTarMP3)) {
        fs.mkdirSync(fdTarMP3)
    }

    //getFiles
    let fns = getFiles(fdSrcMP3)

    //copy mp3
    _.each(fns, (fn) => {
        fs.copyFileSync(fdSrcMP3 + fn, fdTarMP3 + fn)
    })

    //app.html
    let happ = h.replace('{rnd}', w.genID())
    fs.writeFileSync(fdTar + 'app.html', happ, 'utf8')

}
main()


