<template>
    <div id="app">


        <template v-if="!isNarrow">
            <a href="https://github.com/yuda-lyu/w-audioplayer-vue" class="github-corner" style="position:fixed; top:0; right:0; border:0; z-index:10000;" aria-label="View source on GitHub" target="_blank">
                <svg width="80" height="80" viewBox="0 0 250 250" style="fill:rgba(0,0,0,0.25); color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg>
            </a>
        </template>


        <div style="display:flex; align-items:flex-start; justify-content:flex-start;">

            <div :style="`height:100vh; color:${nowMenuItem.color}; background-color:${nowMenuItem.backgroundColor};`">
                <div
                    :class="`menuItem menuItem-${nowMenuItem.classMode} menuItem-${nowMenuItem.classMode}-${nowMenuItem===menu?'active':'inactive'}`"
                    :key="kmenu"
                    v-for="(menu,kmenu) in menuItems"
                    @click="nowMenuItem=menu"
                >
                    {{menu.name}}
                </div>
            </div>

            <div :style="`height:100vh; width:1px; background-color:${nowMenuItem.backgroundColor};`">
                <div style="height:100%; background-color:rgba(150,150,150,0.5);"></div>
            </div>

            <div style="width:100%;">

                <div :style="`height:100vh; display:flex; align-items:center; justify-content:center; overflow-x:auto; overflow-y:auto; background-color:${nowMenuItem.backgroundColor};`">

                    <div class="panelShadow" style="width:400px; height:600px;" v-if="nowMenuItem.name==='basic'">
                        <WAudioplayerVue
                            :itemsAudio="WAudioplayerVue.itemsAudio"
                        ></WAudioplayerVue>
                    </div>

                    <div class="panelShadow" style="width:400px; height:600px;" v-if="nowMenuItem.name==='language'">
                        <WAudioplayerVue
                            :itemsAudio="WAudioplayerVue.itemsAudio"
                            :textDrop="WAudioplayerVue.case2.textDrop"
                            :textDropMsg="WAudioplayerVue.case2.textDropMsg"
                            :textPlayItem="WAudioplayerVue.case2.textPlayItem"
                            :textWaitUserPlay="WAudioplayerVue.case2.textWaitUserPlay"
                            :textTitlePlay="WAudioplayerVue.case2.textTitlePlay"
                            :textTitlePause="WAudioplayerVue.case2.textTitlePause"
                            :textTitleLoop="WAudioplayerVue.case2.textTitleLoop"
                            :textTitleRandom="WAudioplayerVue.case2.textTitleRandom"
                            :textTitleDeleteAll="WAudioplayerVue.case2.textTitleDeleteAll"
                        ></WAudioplayerVue>
                    </div>

                    <div class="panelShadow" style="width:300px; height:700px;" v-if="nowMenuItem.name==='custom size'">
                        <WAudioplayerVue
                            :itemsAudio="WAudioplayerVue.itemsAudio"
                        ></WAudioplayerVue>
                    </div>

                    <div class="panelShadow" style="width:100%; height:100%;" v-if="nowMenuItem.name==='full size'">
                        <WAudioplayerVue
                            :itemsAudio="WAudioplayerVue.itemsAudio"
                        ></WAudioplayerVue>
                    </div>

                    <div class="panelShadow" style="width:400px; height:600px;" v-if="nowMenuItem.name==='dark cyan'">
                        <WAudioplayerVue
                            :itemsAudio="WAudioplayerVue.itemsAudio"
                            :dropTextColor="WAudioplayerVue.case3.dropTextColor"
                            :menuTextColor="WAudioplayerVue.case3.menuTextColor"
                            :textColor="WAudioplayerVue.case3.textColor"
                            :backgroundColor="WAudioplayerVue.case3.backgroundColor"
                            :barHeight="WAudioplayerVue.case3.barHeight"
                            :barColor="WAudioplayerVue.case3.barColor"
                            :barBackgroundColor="WAudioplayerVue.case3.barBackgroundColor"
                            :menuIconColor="WAudioplayerVue.case3.menuIconColor"
                            :menuIconColorActive="WAudioplayerVue.case3.menuIconColorActive"
                            :itemTextColor="WAudioplayerVue.case3.itemTextColor"
                            :itemTextColorActive="WAudioplayerVue.case3.itemTextColorActive"
                            :itemTextColorHover="WAudioplayerVue.case3.itemTextColorHover"
                            :itemHeightMin="WAudioplayerVue.case3.itemHeightMin"
                            :itemSeplineColor="WAudioplayerVue.case3.itemSeplineColor"
                            :scrollBarColor="WAudioplayerVue.case3.scrollBarColor"
                        ></WAudioplayerVue>
                    </div>

                    <div class="panelShadow" style="width:400px; height:600px;" v-if="nowMenuItem.name==='light pink'">
                        <WAudioplayerVue
                            :itemsAudio="WAudioplayerVue.itemsAudio"
                            :dropTextColor="WAudioplayerVue.case4.dropTextColor"
                            :menuTextColor="WAudioplayerVue.case4.menuTextColor"
                            :textColor="WAudioplayerVue.case4.textColor"
                            :backgroundColor="WAudioplayerVue.case4.backgroundColor"
                            :barHeight="WAudioplayerVue.case4.barHeight"
                            :barColor="WAudioplayerVue.case4.barColor"
                            :barBackgroundColor="WAudioplayerVue.case4.barBackgroundColor"
                            :menuIconColor="WAudioplayerVue.case4.menuIconColor"
                            :menuIconColorActive="WAudioplayerVue.case4.menuIconColorActive"
                            :itemTextColor="WAudioplayerVue.case4.itemTextColor"
                            :itemTextColorActive="WAudioplayerVue.case4.itemTextColorActive"
                            :itemTextColorHover="WAudioplayerVue.case4.itemTextColorHover"
                            :itemHeightMin="WAudioplayerVue.case4.itemHeightMin"
                            :itemSeplineColor="WAudioplayerVue.case4.itemSeplineColor"
                            :scrollBarColor="WAudioplayerVue.case4.scrollBarColor"
                        ></WAudioplayerVue>
                    </div>

                </div>

            </div>

        </div>


    </div>
</template>

<script>
import WAudioplayerVue from './components/WAudioplayerVue.vue'

export default {
    name: 'app',
    components: {
        WAudioplayerVue
    },
    data: function() {

        let names = [
            'Ailee_暫別我的愛(demo).mp3',
            'Aimer_Ninelie(demo).mp3',
            'Aimer_s-AVE(demo).mp3',
            'Aimer_Sleepless Nights(demo).mp3',
            'Aimer_ポラリス(demo).mp3',
            'Aimer_茜さす(demo).mp3',
            'A-Lin_月牙灣(夢想的聲音2)(demo).mp3',
            'A-Lin_幸福太短(demo).mp3',
            'Amy Chanrich_其實，我就在你方圓幾里(demo).mp3',
            'Anonymous_螢塚(demo).mp3',
            'B2ST_Fiction(piano)(demo).mp3',
            'BAAD_好想大聲叫喜歡你(demo).mp3',
            'Brian Crain_Wind(demo).mp3',
            'DAOKO & 米津玄師_打上花火(demo).mp3',
            'Davichi & Verbal Jint_사랑과 전쟁(融化)(demo).mp3',
            'GALA樂隊_追夢赤子心(demo).mp3',
            'HITA_洛陽夜雨(demo).mp3',
            'I NEED U(piano)(demo).mp3',
            'Ian_By My Side(demo).mp3',
            'Jason Chen & Alisa Galper_心動心痛(demo).mp3',
            'Jason Chen_Senorita(demo).mp3',
            'Kobasolo & Lefty Hand Cream_No1(demo).mp3',
        ]
        let items = names.map((name) => {
            return {
                name,
                url: encodeURI(`./test-mp3/${name}`)
            }
        })

        let c2RGB = '120,210,250'
        let c3RGB = '240,80,150'

        let menuItems = [
            {
                name: 'basic',
                color: '#aaa',
                backgroundColor: '#2b2b2b',
                classMode: 'dark',
            },
            {
                name: 'language',
                color: '#aaa',
                backgroundColor: '#2b2b2b',
                classMode: 'dark',
            },
            {
                name: 'custom size',
                color: '#aaa',
                backgroundColor: '#2b2b2b',
                classMode: 'dark',
            },
            {
                name: 'full size',
                color: '#aaa',
                backgroundColor: '#2b2b2b',
                classMode: 'dark',
            },
            {
                name: 'dark cyan',
                color: '#aaa',
                backgroundColor: '#3a3a3a',
                classMode: 'dark',
            },
            {
                name: 'light pink',
                color: '#444',
                backgroundColor: '#fff',
                classMode: 'light',
            },
        ]

        return {
            'nowMenuItem': menuItems[0],
            'menuItems': menuItems,
            'WAudioplayerVue': {
                'itemsAudio': items,
                'case1': {
                    //default
                },
                'case2': {
                    textDrop: '拖曳區',
                    textDropMsg: '請拖曳檔案進瀏覽器內',
                    textPlayItem: '現正播放',
                    textWaitUserPlay: '等待您開始播放',
                    textTitlePlay: '播放',
                    textTitlePause: '暫停',
                    textTitleLoop: '循環播放',
                    textTitleRandom: '隨機播放',
                    textTitleDeleteAll: '刪除全部',
                },
                'case3': {
                    dropTextColor: `#999`,
                    menuTextColor: `#999`,
                    textColor: `rgba(${c2RGB},1)`,
                    backgroundColor: '#222',
                    barHeight: 4,
                    barColor: `rgba(${c2RGB},1)`,
                    barBackgroundColor: `#333`,
                    menuIconColor: `#555`,
                    menuIconColorActive: `rgba(${c2RGB},1)`,
                    itemTextColor: `#777`,
                    itemTextColorActive: `rgba(${c2RGB},1)`,
                    itemTextColorHover: `#aaa`,
                    itemHeightMin: 50,
                    itemSeplineColor: `#333`,
                    scrollBarColor: `rgba(255,255,255,0.1)`,
                },
                'case4': {
                    dropTextColor: `#444`,
                    menuTextColor: `#aaa`,
                    textColor: `rgba(${c3RGB},1)`,
                    backgroundColor: '#fafafa',
                    barHeight: 6,
                    barColor: `rgba(${c3RGB},1)`,
                    barBackgroundColor: `#ddd`,
                    menuIconColor: `#aaa`,
                    menuIconColorActive: `rgba(${c3RGB},1)`,
                    itemTextColor: `#aaa`,
                    itemTextColorActive: `rgba(${c3RGB},1)`,
                    itemTextColorHover: `rgba(${c3RGB},0.7)`,
                    itemHeightMin: 40,
                    itemSeplineColor: `#dadada`,
                    scrollBarColor: `rgba(0,0,0,0.1)`,
                },
            }
        }
    },
    computed: {

        isNarrow: function() {
            return window.innerWidth < 1000
        },

    },
}
</script>

<style>
.panelShadow {
    box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
}
.menuItem {
    transition: all 0.2s linear;
    cursor: pointer;
    box-sizing: border-box;
    padding: 15px;
    width: 120px;
    font-size: 0.8rem;
}
.menuItem-dark {
    color: #aaa;
    border-right: 0px solid #888;
}
.menuItem-dark-active {
    color: #d5f5ad;
    border-right: 5px solid rgb(179, 238, 106);
}
.menuItem-dark:hover {
    color: #d5f5ad;
    background-color: #444;
}
.menuItem-dark-inactive:hover {
    border-right: 5px solid rgba(179, 238, 106, 0.5);
}
.menuItem-light {
    color: #444;
    border-right: 0px solid #888;
}
.menuItem-light-active {
    color: #7cce17;
    border-right: 5px solid rgb(179, 238, 106);
}
.menuItem-light:hover {
    color: #7cce17;
    background-color: #eee;
}
.menuItem-light-inactive:hover {
    border-right: 5px solid rgba(179, 238, 106, 0.5);
}
</style>
