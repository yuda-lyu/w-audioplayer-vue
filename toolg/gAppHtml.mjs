import fs from 'fs'
import w from 'wsemi'


let fdTar = './docs/examples/'


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

    //app.html
    let happ = h.replace('{rnd}', w.genID())
    fs.writeFileSync(fdTar + 'app.html', happ, 'utf8')

}
main()


