<template>
    <WDropfiles
        :style="`display:inline-block; position:relative; width:100%; height:100%; background:${backgroundColor};`"
        :borderRadius="0"
        :borderWidth="0"
        :changeItemsAudio="changeItemsAudio"
        @get-files="dropFiles"
        @drop-error="dropError"
    >

        <template v-if="list.length===0">

            <div style="display:flex; align-items:center; justify-content:center; height:100%;">
                <div :style="`text-align:center; width:200px; color:${dropTextColor};`">
                    <div>{{textDrop}}</div>
                    <div style="margin-top:5px; font-size:0.8rem; opacity:0.75;">{{textDropMsg}}</div>
                    <div style="margin-top:5px; font-size:0.8rem; color:#f26;" v-if="textDropError">{{textDropError}}</div>
                </div>
            </div>

        </template>

        <template v-else>

            <div
                ref="menuPanel"
                :class="`${isScrollTop?'':'menuShadow'}`"
            >

                <div :style="`font-size:0.8rem; display:flex; align-items:center; padding:10px; color:${menuTextColor};`">
                    <div style="white-space:nowrap; padding-right:5px; opacity:0.5;">{{textPlayItem}}:</div>
                    <input style="background:transparent; border:0px; width:100%; color:inherit; font-family:inherit; outline:none;" type="text" spellcheck="false" :value="getPlayingItemName">
                </div>

                <div style="padding:0px 10px 14px 10px;">
                    <div style="display:flex; align-items:center;">

                        <div ref="barPanel" :style="`background:${barBackgroundColor}; padding:0px 0px; width:100%; height:${barHeight}px; border-radius:10px; cursor:pointer;`" @click="adSeek">
                            <div :style="`background:${barColor}; width:${barWidth}%; height:${barHeight}px; border-radius:10px;`"></div>
                        </div>

                        <div style="padding-left:10px; text-align:center; font-size:0.7rem; letter-spacing:1px; min-height:16px;">
                            <span :style="`color:${menuTextColor};`">{{cPlayTime}}</span>
                        </div>

                    </div>
                </div>

                <div style="padding:0px 12px 15px 12px;">
                    <div style="display:flex; align-items:center; justify-content:space-between;">
                        <div style="margin-right:5px; cursor:pointer;">
                            <WIcon
                                :title="textTitlePause"
                                :path="mdiPauseCircleOutline"
                                :size="40"
                                :color="menuIconColorActive"
                                :colorHover="menuIconColorActive"
                                v-if="cPlayMode==='play'"
                                @click.native="adPause"
                            ></WIcon>
                            <WIcon
                                :title="textTitlePlay"
                                :path="mdiPlayCircleOutline"
                                :size="40"
                                :color="menuIconColorActive"
                                :colorHover="menuIconColorActive"
                                v-if="cPlayMode==='pause' || cPlayMode==='stop'"
                                @click.native="if(cPlayMode==='pause'){adResume()}else{adPlay(0)}"
                            ></WIcon>
                        </div>
                        <div :style="`margin-right:5px; ${cPlayNextMode==='loop'?'':'cursor:pointer'}`" :title="textTitleLoop">
                            <WIcon
                                :path="mdiSortDescending"
                                :size="22"
                                :color="cPlayNextMode==='loop'?menuIconColorActive:menuIconColor"
                                :colorHover="menuIconColorActive"
                                @click.native="cPlayNextMode='loop'"
                            ></WIcon>
                        </div>
                        <div :style="`margin-right:5px; ${cPlayNextMode==='repeat'?'':'cursor:pointer'}`" :title="textTitleRepeat">
                            <WIcon
                                :path="mdiReplay"
                                :size="22"
                                :color="cPlayNextMode==='repeat'?menuIconColorActive:menuIconColor"
                                :colorHover="menuIconColorActive"
                                @click.native="cPlayNextMode='repeat'"
                            ></WIcon>
                        </div>
                        <div :style="`margin-right:5px; ${cPlayNextMode==='random'?'':'cursor:pointer'}`" :title="textTitleRandom">
                            <WIcon
                                :path="mdiShoePrint"
                                :size="22"
                                :color="cPlayNextMode==='random'?menuIconColorActive:menuIconColor"
                                :colorHover="menuIconColorActive"
                                @click.native="cPlayNextMode='random'"
                            ></WIcon>
                        </div>
                        <div style="margin-right:5px; cursor:pointer;" :title="textTitleDeleteAll">
                            <WIcon
                                :path="mdiDelete"
                                :size="22"
                                :color="menuIconColor"
                                :colorHover="menuIconColorActive"
                                @click.native="deleteAllItems"
                            ></WIcon>
                        </div>
                    </div>
                </div>

            </div>

            <WPanelScrolly
                style="height:calc(100% - 129px);"
                :barColor="scrollBarColor"
                :barColorHover="scrollBarColorHover"
                @scroll="scrollList"
            >
                <table style="width:100%; border-collapse:collapse;">
                    <tbody>
                        <tr
                            :style="`transition:all 0.25s linear; font-size:0.8rem; height:${itemHeightMin}px; ${iPlayItem===kitem?'':'cursor:pointer;'} color:${ iPlayItem===kitem?itemTextColorActive:item.mouseIn?itemTextColorHover:itemTextColor }`"
                            :key="kitem"
                            v-for="(item,kitem) in list"
                            @mouseenter="item.mouseIn=true"
                            @mouseleave="item.mouseIn=false"
                        >
                            <td
                                :style="`border-bottom:1px solid ${itemSeplineColor}; padding-left:15px; padding-right:15px; text-align:left;`"
                                @click="adPlay(kitem)"
                            >
                                {{kitem+1}}.
                            </td>
                            <td
                                :style="`border-bottom:1px solid ${itemSeplineColor}; padding:5px 0px; width:100%; text-align:left;`"
                                @click="adPlay(kitem)"
                            >
                                {{item.name}}
                            </td>
                            <td
                                :style="`border-bottom:1px solid ${itemSeplineColor}; padding-left:13px; padding-right:19px; user-select:none;`"
                            >
                                <WIcon
                                    style="cursor:pointer;"
                                    :path="mdiTrashCanOutline"
                                    :size="17"
                                    :color="`${iPlayItem===kitem?itemTextColorActive:itemTextColor}`"
                                    :colorHover="`${iPlayItem===kitem?itemTextColorActive:itemTextColorHover}`"
                                    @click.native="deleteItem(kitem)"
                                ></WIcon>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </WPanelScrolly>

        </template>

    </WDropfiles>
</template>

<script>
import { mdiPlayCircleOutline, mdiPauseCircleOutline, mdiStopCircleOutline, mdiTrashCanOutline, mdiDelete, mdiShoePrint, mdiSortDescending, mdiReplay } from '@mdi/js'
import each from 'lodash-es/each.js'
import size from 'lodash-es/size.js'
import isEqual from 'lodash-es/isEqual.js'
import concat from 'lodash-es/concat.js'
import cloneDeep from 'lodash-es/cloneDeep.js'
import pullAt from 'lodash-es/pullAt.js'
import random from 'lodash-es/random.js'
import split from 'lodash-es/split.js'
import last from 'lodash-es/last.js'
import arrHas from 'wsemi/src/arrHas.mjs'
import WHowler from 'w-howler'
import WDropfiles from 'w-component-vue/src/components/WDropfiles.vue'
import WIcon from 'w-component-vue/src/components/WIcon.vue'
import WPanelScrolly from 'w-component-vue/src/components/WPanelScrolly.vue'


function getFileName(str) {
    return str.split('\\').pop().split('/').pop()
}


/**
 * @vue-prop {Array} [items=[]] 輸入音頻物件陣列，每個物件需有name與url兩欄位，分別提供檔名(含副檔名)與網址，可不給予由使用者拖曳檔案進來組件進行播放
 * @vue-prop {String} [dropTextColor='#aaa'] 輸入無播放視窗之提示拖曳文字顏色字串，預設'#aaa'
 * @vue-prop {String} [backgroundColor='#323232'] 輸入背景顏色字串，預設'#323232'
 * @vue-prop {Number} [barHeight=6] 輸入播放進度條高度浮點數，預設6
 * @vue-prop {String} [barColor='#f1d895'] 輸入播放進度條顏色字串，預設'#f1d895'
 * @vue-prop {String} [barBackgroundColor='#222'] 輸入播放進度條背景顏色字串，預設'#222'
 * @vue-prop {String} [menuTextColor='#aaa'] 輸入上方選單區文字顏色字串，預設'#aaa'
 * @vue-prop {String} [menuIconColor='#aaa'] 輸入上方選單區按鈕顏色字串，預設'#aaa'
 * @vue-prop {String} [menuIconColorActive='#f1d895'] 輸入上方選單區按鈕點擊狀態的顏色字串，預設'#f1d895'
 * @vue-prop {String} [itemTextColor='#aaa'] 輸入播放項目區歌曲文字顏色字串，預設'#aaa'
 * @vue-prop {String} [itemTextColorActive='#f1d895'] 輸入播放項目區播放中的歌曲文字顏色字串，預設'#f1d895'
 * @vue-prop {String} [itemTextColorHover='#ccc'] 輸入播放項目區歌曲文字Hover時顏色字串，預設'#ccc'
 * @vue-prop {Number} [itemHeightMin=48] 輸入播放項目區歌曲項目最小高度浮點數，預設48
 * @vue-prop {String} [itemSeplineColor='#444'] 輸入播放項目區歌曲下分隔條顏色字串，預設'#444'
 * @vue-prop {String} [scrollBarColor='rgba(200,200,200,0.2)'] 輸入播放項目區右側捲軸顏色字串，預設'rgba(200,200,200,0.2)'
 * @vue-prop {String} [scrollBarColorHover='rgba(200,200,200,0.3)'] 輸入播放項目區右側捲軸顏色字串，預設'rgba(200,200,200,0.3)'
 * @vue-prop {String} [textDrop='Drop zone'] 輸入顯示拖曳文字字串，預設'Drop zone'
 * @vue-prop {String} [textDropMsg='Drag your files or folders and drop them here.'] 輸入顯示拖曳說明文字字串，預設'Drag your files or folders and drop them here.'
 * @vue-prop {String} [textPlayItem='Now'] 輸入現在正在播放文字字串，預設'Now'
 * @vue-prop {String} [textWaitUserPlay='It's time to play...'] 輸入等待播放文字字串，預設'It's time to play...'
 * @vue-prop {String} [textTitlePlay='Play'] 輸入播放按鈕提示文字字串，預設'Play'
 * @vue-prop {String} [textTitlePause='Pause'] 輸入暫停按鈕提示文字字串，預設'Pause'
 * @vue-prop {String} [textTitleLoop='Loop play'] 輸入循環播放按鈕提示文字字串，預設'Loop play'
 * @vue-prop {String} [textTitleRepeat='Repeat play'] 輸入單曲播放按鈕提示文字字串，預設'Repeat play'
 * @vue-prop {String} [textTitleRandom='Random play'] 輸入隨機播放按鈕提示文字字串，預設'Random play'
 * @vue-prop {String} [textTitleDeleteAll='Delete all'] 輸入刪除全部按鈕提示文字字串，預設'Delete all'
 */
export default {
    components: {
        WDropfiles,
        WIcon,
        WPanelScrolly,
    },
    props: {
        items: {
            type: Array,
            default: () => [],
        },
        dropTextColor: {
            type: String,
            default: '#aaa',
        },
        backgroundColor: {
            type: String,
            default: '#323232',
        },
        barHeight: {
            type: Number,
            default: 6,
        },
        barColor: {
            type: String,
            default: '#f1d895',
        },
        barBackgroundColor: {
            type: String,
            default: '#222',
        },
        menuTextColor: {
            type: String,
            default: '#aaa',
        },
        menuIconColor: {
            type: String,
            default: '#aaa',
        },
        menuIconColorActive: {
            type: String,
            default: '#f1d895',
        },
        itemTextColor: {
            type: String,
            default: '#aaa',
        },
        itemTextColorActive: {
            type: String,
            default: '#f1d895',
        },
        itemTextColorHover: {
            type: String,
            default: '#ccc',
        },
        itemHeightMin: {
            type: Number,
            default: 48,
        },
        itemSeplineColor: {
            type: String,
            default: '#444',
        },
        scrollBarColor: {
            type: String,
            default: 'rgba(200,200,200,0.2)',
        },
        scrollBarColorHover: {
            type: String,
            default: 'rgba(200,200,200,0.3)',
        },
        textDrop: {
            type: String,
            default: 'Drop zone', //拖曳區
        },
        textDropMsg: {
            type: String,
            default: 'Drag your files or folders and drop them here.', //請拖曳檔案或資料夾進瀏覽器內
        },
        textPlayItem: {
            type: String,
            default: 'Now', //現正播放
        },
        textWaitUserPlay: {
            type: String,
            default: `It's time to play...`, //等待您開始播放
        },
        textTitlePlay: {
            type: String,
            default: 'Play', //播放
        },
        textTitlePause: {
            type: String,
            default: 'Pause', //暫停
        },
        textTitleLoop: {
            type: String,
            default: 'Loop play', //循環播放
        },
        textTitleRepeat: {
            type: String,
            default: 'Repeat play', //單曲播放
        },
        textTitleRandom: {
            type: String,
            default: 'Random play', //隨機播放
        },
        textTitleDeleteAll: {
            type: String,
            default: 'Delete all', //刪除全部
        },
    },
    data: function() {
        return {

            mdiPlayCircleOutline,
            mdiPauseCircleOutline,
            mdiStopCircleOutline,
            mdiTrashCanOutline,
            mdiDelete,
            mdiShoePrint,
            mdiSortDescending,
            mdiReplay,

            wh: null,
            itemsTemp: [], //若有外部傳入播放項目, 進行暫存藉以判斷是否重複觸發change事件
            list: [],
            iPlayItem: null,
            cPlayItem: '',
            cPlayMode: 'stop',
            cPlayNextMode: 'loop', //loop, repeat, random
            cPlayTime: '',
            barWidth: 0,
            isScrollTop: true,
            codecs: ['mp3', 'mpeg', 'opus', 'ogg', 'oga', 'wav', 'aac', 'caf', 'm4a', 'mp4', 'weba', 'webm', 'dolby', 'flac'],

            textDropError: null,

        }
    },
    mounted: function() {
        //console.log('mounted')

        let vo = this

        //WHowler
        vo.wh = new WHowler()
        vo.wh.on('refresh', (s) => {
            vo.adRefreshBar(s)
        })
        vo.wh.on('end', () => {
            vo.adPlayNext()
        })

    },
    beforeDestroy: function() {
        //console.log('beforeDestroy')

        let vo = this

        //stop
        vo.wh.stop()

        //deleteAllItems
        vo.deleteAllItems()

    },
    computed: {

        changeItemsAudio: function() {
            //console.log('computed changeItemsAudio')

            let vo = this

            //items
            let items = cloneDeep(vo.items)

            //check eff
            if (size(vo.items) === 0) {
                return ''
            }

            //check equal, 切換組件時可能被vue自動快取導致不會重新mounted(機制複雜), 故導致外部傳入的播放項目會多次觸發change事件, 使得播放項目會重複載入
            if (!isEqual(vo.items, vo.itemsTemp)) {

                //addItems, 其內改用timer脫勾避免被vue做記憶體偵測, 因清空list而重新觸發本change
                vo.addItems(items, 'urls')

                //save as
                vo.itemsTemp = cloneDeep(vo.items)

            }

            return ''
        },

        getPlayingItemName: function() {
            //console.log('computed getPlayingItemName')

            let vo = this

            let r = vo.textWaitUserPlay
            if (vo.cPlayItem !== '') {
                r = vo.cPlayItem
            }

            return r
        },

    },
    methods: {

        tempAsync: async function() {
            //因rollup沒法偵測npm組件使用async, 打包後檔案會無法提供regeneratorRuntime
            //此處強制使用async function, 使rollup能給予regeneratorRuntime
        },

        adRefreshBar: function(s) {
            //console.log('methods adRefreshBar', s)

            let vo = this

            //update barWidth, cPlayTime
            vo.barWidth = s.prog
            vo.cPlayTime = s.timeShow

        },

        adSeek: function(e) {
            //console.log('methods adSeek', e)

            let vo = this

            //seek
            let x = e.offsetX
            let w = vo.$refs.barPanel.clientWidth //e.target.clientWidth
            let r = x / w
            vo.wh.seek(r)

        },

        adPlayNext: function(bDelete = false) {
            //console.log('methods adPlayNext')

            let vo = this

            //n
            let n = size(vo.list)

            //kitem
            let kitem
            if (!bDelete) {
                if (vo.cPlayNextMode === 'random') {
                    kitem = vo.randomItemEx(vo.iPlayItem, n)
                }
                else if (vo.cPlayNextMode === 'repeat') {
                    kitem = vo.iPlayItem
                }
                else {
                    kitem = vo.iPlayItem + 1
                    if (kitem > size(vo.list) - 1) {
                        kitem = 0
                    }
                }
            }
            else {
                //刪除時播放
                if (vo.cPlayNextMode === 'random') {
                    //可隨機自己, 因已經刪除當前播放歌曲
                    kitem = vo.randomItem(n)
                }
                else {
                    //因list變更完iPlayItem不變, 強制播放當前項目即為下1首
                    kitem = vo.iPlayItem
                    if (kitem > n - 1) {
                        kitem = 0
                    }
                }
            }

            //adPlay force
            vo.adPlay(kitem, true)

        },

        adPause: function() {
            //console.log('methods adPause')

            let vo = this

            //pause
            vo.wh.pause()
            vo.cPlayMode = 'pause'

        },

        adResume: function() {
            //console.log('methods adResume')

            let vo = this

            //resume
            vo.wh.resume()
            vo.cPlayMode = 'play'

        },

        adReset: function() {
            //console.log('methods adReset')

            let vo = this

            //use pause to stop
            vo.wh.pause()
            vo.cPlayMode = 'stop'
            vo.barWidth = 0

        },

        adPlay: function(kitem, bForce = false) {
            //console.log('methods adPlay', kitem, bForce)

            let vo = this

            //check
            if (vo.iPlayItem !== kitem || bForce) {
                let item = vo.list[kitem]
                vo.iPlayItem = kitem
                vo.cPlayItem = item.name

                //reset
                vo.barWidth = 0
                vo.cPlayTime = ''

                //play
                vo.wh.play(item.src, item.ext)
                vo.cPlayMode = 'play'

            }

        },

        deleteAllItems: function() {
            //console.log('methods deleteAllItems')

            let vo = this

            //adReset
            vo.adReset()

            //clear
            vo.iPlayItem = null
            vo.cPlayItem = ''
            vo.list = []

        },

        deleteItem: function(kitem) {
            //console.log('methods deleteItem', kitem)

            let vo = this

            if (size(vo.list) > 1) {
                //若清單不只1首

                //刪除
                let list = cloneDeep(vo.list)
                pullAt(list, kitem)
                vo.list = list

                //重新播放或更新iPlayItem
                if (vo.iPlayItem === kitem) {
                    //若是刪除當前播放歌則播放下1首
                    vo.adPlayNext(true)
                }
                else if (kitem > vo.iPlayItem) {
                    //不用改變iPlayItem
                }
                else {
                    //刪除當前播放前歌曲, iPlayItem需減1
                    vo.iPlayItem -= 1
                }

            }
            else {
                //只剩1首

                //直接用刪除全部並恢復顯示拖曳視窗
                vo.deleteAllItems()

            }

        },

        randomItem: function(n) {
            //console.log('methods randomItem', n)

            //let vo = this

            //r, 可隨機到自己
            let r = random(n - 1)

            return r
        },

        randomItemEx: function(i, n) {
            //console.log('methods randomItemEx', i, n)

            //let vo = this

            //r, 不得隨機到自己
            let r
            if (n === 1) {
                r = 0
            }
            else if (n === 2) {
                if (i === 0) {
                    r = 1
                }
                else {
                    r = 0
                }
            }
            else if (n > 2) {
                r = random(n - 1)
                while (r === i) {
                    r = random(n - 1)
                }
            }
            else {
                r = 0
            }

            return r
        },

        scrollList: function(e) {
            //console.log('methods scrollList', e)

            let vo = this

            //isScrollTop
            vo.isScrollTop = e.r === 0

        },

        addFiles: function (items) {
            //console.log('methods addFiles', items)

            let vo = this

            let list = []
            each(items, function(item) {
                let name = item.name
                let s = split(name, '.')
                let ext = last(s)
                let b = arrHas(ext, vo.codecs)
                if (b) {
                    let src = URL.createObjectURL(item.file)
                    list.push({
                        name,
                        ext,
                        src,
                        mouseIn: false,
                    })
                }
            })

            return list
        },

        addUrls: function (items) {
            //console.log('methods addUrls', items)

            let vo = this

            let list = []
            each(items, function(item) {
                let name = getFileName(item.name)
                let s = split(name, '.')
                let ext = last(s)
                let b = arrHas(ext, vo.codecs)
                if (b) {
                    list.push({
                        name,
                        ext,
                        src: item.url,
                        mouseIn: false,
                    })
                }
            })

            return list
        },

        addItems: function (items, mode = 'files', autoPlay = false) {
            //console.log('methods addItems', items, mode)

            //autoPlay可預設為true, 原本為false
            //chrome禁用自動播放: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
            //可用iframe置於網頁最前優先播放超短音頻, 使其他音頻能自動播放: https://olafwempe.com/how-to-enable-audio-and-video-autoplay-with-sound-in-chrome-and-other-browsers-in-2019/
            //此法又被chrome偵測到而失效，需先由使用者點擊第一次播放後才正常(2019/12/24)

            let vo = this

            setTimeout(() => {

                //list
                let list = cloneDeep(vo.list)
                if (mode === 'files') {
                    list = concat(list, vo.addFiles(items))
                }
                else {
                    list = concat(list, vo.addUrls(items))
                }
                vo.list = list

                //check
                if (autoPlay) {
                    if (vo.iPlayItem === null) {
                        vo.adPlay(0)
                    }
                }

            }, 1)

        },

        dropFiles: function({ filesTree }) {
            // console.log('methods dropFiles', filesTree)

            let vo = this

            //textDropError
            vo.textDropError = null

            //addItems, 改用timer會直接往後呼叫cb
            vo.addItems(filesTree, 'files', true)

        },

        dropError: function(err) {
            console.log('methods dropError', err)

            let vo = this

            //textDropError
            vo.textDropError = err

        },

    },
}
</script>

<style scoped>
.menuShadow {
    box-shadow: 0px 10px 5px -3px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px #000, 0px 0px 0px 0px #000;
}
</style>
