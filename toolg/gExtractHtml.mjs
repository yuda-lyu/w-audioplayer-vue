import fs from 'fs'
import _ from 'lodash-es'
import w from 'wsemi'
import getFiles from 'w-package-tools/src/getFiles.mjs'
import cleanFolder from 'w-package-tools/src/cleanFolder.mjs'
import parseVueCode from 'w-package-tools/src/parseVueCode.mjs'
import kebabPropsVueTemp from 'w-package-tools/src/kebabPropsVueTemp.mjs'
import extractHtml from 'w-package-tools/src/extractHtml.mjs'


let fdSrc = './src/'
let fdTestHtml = './test-html/'
let fdTestSrc = './test-action/'


function writeHtml(v) {

    function getAppTmp() {
        return v.tmp
    }

    function procHtml(h) {

        //kebabPropsVueTemp
        h = kebabPropsVueTemp(h)

        //change cmp name
        h = w.replace(h, 'WAudioplayerVue', 'w-audioplayer-vue')

        return h
    }

    //opt
    let opt = {
        title: `example for ${v.casename}`,
        head: `
    
        <!-- extractHtml已自動添加@babel/polyfill與vue -->
    
        <!-- w-audioplayer-vue -->
        <script src="../dist/w-audioplayer-vue.umd.js"></script>
    
        <!-- data -->
        <script>
            let mp3s = [
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/Ailee_暫別我的愛(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/Aimer_Ninelie(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/Aimer_s-AVE(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/Aimer_Sleepless Nights(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/Aimer_ポラリス(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/Aimer_茜さす(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/A-Lin_月牙灣(夢想的聲音2)(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/A-Lin_幸福太短(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/Amy Chanrich_其實，我就在你方圓幾里(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/Anonymous_螢塚(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/B2ST_Fiction(piano)(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/BAAD_好想大聲叫喜歡你(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/Brian Crain_Wind(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/DAOKO & 米津玄師_打上花火(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/Davichi & Verbal Jint_사랑과 전쟁(融化)(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/GALA樂隊_追夢赤子心(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/HITA_洛陽夜雨(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/I NEED U(piano)(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/Ian_By My Side(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/Jason Chen & Alisa Galper_心動心痛(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/Jason Chen_Senorita(demo).mp3',
                'https://cdn.jsdelivr.net/npm/w-demores@1.0.23/res/audio/Kobasolo & Lefty Hand Cream_No1(demo).mp3',
            ]
    
            let items = []
            for (let i = 0; i < mp3s.length; i++) {
                items.push({
                    name: mp3s[i],
                    url: encodeURI(mp3s[i])
                })
            }
            let kpMenu ={
                'AppBasic':{
                    name: 'AppBasic',
                    color: '#aaa',
                    backgroundColor: '#2b2b2b',
                    classMode: 'dark',
                },
                'AppLanguage':  {
                    name: 'AppLanguage',
                    color: '#aaa',
                    backgroundColor: '#2b2b2b',
                    classMode: 'dark',
                },
                'AppCustomSize': {
                    name: 'AppCustomSize',
                    color: '#aaa',
                    backgroundColor: '#2b2b2b',
                    classMode: 'dark',
                },
                'AppFullSize': {
                    name: 'AppFullSize',
                    color: '#aaa',
                    backgroundColor: '#2b2b2b',
                    classMode: 'dark',
                },
                'AppDarkCyan':  {
                    name: 'AppDarkCyan',
                    color: '#aaa',
                    backgroundColor: '#3a3a3a',
                    classMode: 'dark',
                },
                'AppLightPink': {
                    name: 'AppLightPink',
                    color: '#444',
                    backgroundColor: '#fff',
                    classMode: 'light',
                },
            }
            let kpOpt={
                'AppLanguage': {
                    textDrop: '拖曳區',
                    textDropMsg: '請拖曳檔案或資料夾進瀏覽器內',
                    textPlayItem: '現正播放',
                    textWaitUserPlay: '等待您開始播放',
                    textTitlePlay: '播放',
                    textTitlePause: '暫停',
                    textTitleLoop: '循環播放',
                    textTitleRepeat: '單曲播放',
                    textTitleRandom: '隨機播放',
                    textTitleDeleteAll: '刪除全部',
                },
                'AppDarkCyan': {
                    dropTextColor: '#999',
                    menuTextColor: '#999',
                    textColor: 'rgba(120,210,250,1)',
                    backgroundColor: '#222',
                    barHeight: 4,
                    barColor: 'rgba(120,210,250,1)',
                    barBackgroundColor: '#333',
                    menuIconColor: '#555',
                    menuIconColorActive: 'rgba(120,210,250,1)',
                    itemTextColor: '#777',
                    itemTextColorActive: 'rgba(120,210,250,1)',
                    itemTextColorHover: '#aaa',
                    itemHeightMin: 50,
                    itemSeplineColor: '#333',
                    scrollBarColor: 'rgba(255,255,255,0.1)',
                    scrollBarColorHover: 'rgba(255,255,255,0.2)',
                },
                'AppLightPink': {
                    dropTextColor: '#444',
                    menuTextColor: '#aaa',
                    textColor: 'rgba(240,80,150,1)',
                    backgroundColor: '#fafafa',
                    barHeight: 6,
                    barColor: 'rgba(240,80,150,1)',
                    barBackgroundColor: '#ddd',
                    menuIconColor: '#aaa',
                    menuIconColorActive: 'rgba(240,80,150,1)',
                    itemTextColor: '#aaa',
                    itemTextColorActive: 'rgba(240,80,150,1)',
                    itemTextColorHover: 'rgba(240,80,150,0.7)',
                    itemHeightMin: 40,
                    itemSeplineColor: '#dadada',
                    scrollBarColor: 'rgba(0,0,0,0)',
                    scrollBarColorHover: 'rgba(0,0,0,0.15)',
                },
            }
            //save in window
            window.items=items
            window.kpOpt=kpOpt
            window.kpMenu=kpMenu
        </script>
    
        <style>
            .panelShadow {
                box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
            }
        </style>
    
        `,
        appTag: `div`,
        appStyle: `height:100vh;`,
        appTmp: getAppTmp(),
        installVue: `Vue.component('w-audioplayer-vue', window['w-audioplayer-vue'])`,
        newVue: ``,
        data: v.data,
        mounted: v.mounted,
        computed: v.computed,
        methods: v.methods,
        action: v.action,
        procHtml,
        fpHtml: `${fdTestHtml}${v.fn}.html`,
        fpAction: `${fdTestSrc}${v.fn}.action.json`,
    }

    //extractHtml
    extractHtml(opt)

}


function extractApp(fn) {

    //casename
    let casename = fn.replace('.vue', '')

    //read
    let hh = fs.readFileSync(fdSrc + fn, 'utf8')

    //parseVueCode
    let { tmp, data, mounted, computed, methods, action } = parseVueCode(hh)

    //writeHtml
    writeHtml({
        fn: `ex-${casename}`,
        casename,
        tmp,
        data,
        mounted,
        computed,
        methods,
        action,
    })

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
