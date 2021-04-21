<template>
    <div>


        <template v-if="!isNarrow">
            <a href="https://github.com/yuda-lyu/w-audioplayer-vue" class="github-corner" style="position:fixed; top:0; right:0; border:0; z-index:10000;" aria-label="View source on GitHub" target="_blank">
                <svg width="80" height="80" viewBox="0 0 250 250" style="fill:rgba(0,0,0,0.25); color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg>
            </a>
        </template>


        <div v-if="false">
            autoPlay可預設為true, 原本為false
            chrome禁用自動播放: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
            可用iframe置於網頁最前優先播放超短音頻, 使其他音頻能自動播放: https://olafwempe.com/how-to-enable-audio-and-video-autoplay-with-sound-in-chrome-and-other-browsers-in-2019/
            此法又被chrome偵測到而失效，需先由使用者點擊第一次播放後才正常(2019/12/24)
        </div>


        <div style="width:100%; height:100vh; display:flex; align-items:flex-start; justify-content:flex-start;">

            <div :style="`width:160px; height:100vh; border-right:1px solid rgba(150,150,150,0.5); background:${nowMenu.backgroundColor};`">
                <div
                    class="menuBasic"
                    style="position:relative;"
                    :key="kmenu"
                    v-for="(menu,kmenu) in menus"
                    @click="nowMenu=menu;menu.isActive=true;"
                    @mouseenter="menu.isHover=true"
                    @mouseleave="menu.isHover=false"
                >

                    <div :class="`menuTrans menuText-${nowMenu.classMode} menuText-${nowMenu.classMode}-${nowMenu===menu?'active':'inactive'} menuBox menuBorder-${nowMenu.classMode} menuBorder-${nowMenu.classMode}-${nowMenu===menu?'active':'inactive'}`">

                        <div>{{menu.name}}</div>

                        <a
                            class="menuTrans"
                            :style="`position:absolute; top:5px; right:10px; z-index:1;`"
                            title="show example"
                            :href="exam(menu.key)"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div
                                class="menuTrans"
                                :style="`opacity:${menu.isHover?1:0}; transform-origin:center; transform:translateY(${menu.isHover?0:3}px);`"
                            >
                                <div style="transform-origin:center; transform:scale(0.8) translateX(1px);">➤</div>
                            </div>
                        </a>

                        <a
                            class="menuTrans"
                            :style="`position:absolute; top:22px; right:10px; z-index:1;`"
                            title="show codde"
                            :href="code(menu.key)"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div
                                class="menuTrans"
                                :style="`opacity:${menu.isHover?1:0}; transform:translateY(${menu.isHover?0:-3}px);`"
                            >
                                ☪
                            </div>
                        </a>

                    </div>

                </div>

            </div>

            <AppBasic
                v-if="nowMenu.key==='AppBasic'"
            ></AppBasic>

            <AppLanguage
                v-if="nowMenu.key==='AppLanguage'"
            ></AppLanguage>

            <AppCustomSize
                v-if="nowMenu.key==='AppCustomSize'"
            ></AppCustomSize>

            <AppFullSize
                v-if="nowMenu.key==='AppFullSize'"
            ></AppFullSize>

            <AppDarkCyan
                v-if="nowMenu.key==='AppDarkCyan'"
            ></AppDarkCyan>

            <AppLightPink
                v-if="nowMenu.key==='AppLightPink'"
            ></AppLightPink>

        </div>


    </div>
</template>

<script>
import AppBasic from './AppBasic.vue'
import AppLanguage from './AppLanguage.vue'
import AppCustomSize from './AppCustomSize.vue'
import AppFullSize from './AppFullSize.vue'
import AppDarkCyan from './AppDarkCyan.vue'
import AppLightPink from './AppLightPink.vue'


export default {
    components: {
        AppBasic,
        AppLanguage,
        AppCustomSize,
        AppFullSize,
        AppDarkCyan,
        AppLightPink,
    },
    data: function() {
        let menus = []
        for (let k in window.kpMenu) {
            let v = window.kpMenu[k]
            v.key = k
            menus.push(v)
        }
        return {
            'nowMenu': window.kpMenu['AppBasic'],
            'menus': menus,
        }
    },
    computed: {

        isNarrow: function() {
            return window.innerWidth < 1000
        },

    },
    methods: {

        exam: function(fn) {
            return 'https://yuda-lyu.github.io/w-audioplayer-vue/examples/ex-' + fn + '.html'
        },

        code: function(fn) {
            return 'https://github.com/yuda-lyu/w-audioplayer-vue/blob/master/docs/examples/ex-' + fn + '.html'
        },

    },
}
</script>

<style>
a:link {
    color: inherit;
}
a:visited {
    color: inherit;
}
a:hover {
    color: inherit;
}
a:active {
    color: inherit;
}

.panelShadow {
    box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
}

.menuBasic {
    cursor: pointer;
}
.menuTrans {
    transition: all 0.2s linear;
}
.menuBox {
    padding: 15px;
    font-size: 0.8rem;
}

.menuText-dark {
    color: #aaa;
    background: transparent;
}
.menuText-dark-active {
    color: #d5f5ad;
    background: transparent;
}
.menuText-dark:hover {
    color: #d5f5ad;
    background: #444;
}
.menuText-dark-inactive:hover {
    color: #d5f5ad;
    background: transparent;
}
.menuText-light {
    color: #444;
}
.menuText-light-active {
    color: #7cce17;
    background: transparent;
}
.menuText-light:hover {
    color: #7cce17;
    background: #eee;
}
.menuText-light-inactive:hover {
    color: #7cce17;
    background: transparent;
}

.menuBorder-dark {
    border-right: 0px solid #888;
}
.menuBorder-dark-active {
    border-right: 5px solid rgb(179, 238, 106);
}
.menuBorder-dark:hover {
    border-right: 0px solid #888;
}
.menuBorder-dark-inactive:hover {
    border-right: 5px solid rgba(179, 238, 106, 0.5);
}
.menuBorder-light {
    border-right: 0px solid #888;
}
.menuBorder-light-active {
    border-right: 5px solid rgb(179, 238, 106);
}
.menuBorder-light:hover {
    border-right: 0px solid #888;
}
.menuBorder-light-inactive:hover {
    border-right: 5px solid rgba(179, 238, 106, 0.5);
}
</style>
