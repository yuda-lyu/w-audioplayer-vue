<template>
    <div ref="osPanel">

        <slot></slot>

    </div>
</template>

<script>
import OverlayScrollbars from 'overlayscrollbars'
import get from 'lodash/get'

/**
 * @vue-prop {Object} [options={}] 輸入Overlay Scrollbars的設定物件，預設{}
 * @vue-prop {String} [scrollXBarColor='rgba(0,0,0,0.25)'] 輸入X軸內拖曳區塊顏色字串，預設'rgba(0,0,0,0.25)'
 * @vue-prop {String} [scrollYBarColor='rgba(0,0,0,0.25)'] 輸入Y軸內拖曳區塊顏色字串，預設'rgba(0,0,0,0.25)'
 */
export default {
    props: {
        options: {
            type: Object,
            default: () => {},
        },
        scrollXBarColor: {
            type: String,
            default: 'rgba(0,0,0,0.25)',
        },
        scrollYBarColor: {
            type: String,
            default: 'rgba(0,0,0,0.25)',
        },
    },
    data: function() {
        return {
            instance: null,
            timerBarColor: null,
        }
    },
    mounted: function() {

        let vo = this

        //ele
        let ele = get(vo, '$refs.osPanel', null)

        //options
        let options = {
            resize: 'none',
            callbacks: {
                onInitialized: (e) => {
                    vo.$emit('initialized', e)
                },
                onInitializationWithdrawn: (e) => {
                    vo.$emit('initializationWithdrawn', e)
                },
                onDestroyed: (e) => {
                    vo.$emit('destroyed', e)
                },
                onScrollStart: (e) => {
                    vo.$emit('scrollStart', e)
                },
                onScroll: (e) => {
                    vo.$emit('scroll', e)
                },
                onScrollStop: (e) => {
                    vo.$emit('scrollStop', e)
                },
                onOverflowChanged: (e) => {
                    vo.$emit('overflowChanged', e)
                },
                onOverflowAmountChanged: (e) => {
                    vo.$emit('overflowAmountChanged', e)
                },
                onDirectionChanged: (e) => {
                    vo.$emit('directionChanged', e)
                },
                onContentSizeChanged: (e) => {
                    vo.$emit('contentSizeChanged', e)
                },
                onHostSizeChanged: (e) => {
                    vo.$emit('hostSizeChanged', e)
                },
                onUpdated: (e) => {
                    vo.$emit('updated', e)
                }
            },
        }

        //concat
        options = {
            ...options,
            ...vo.options
        }

        //create
        vo.instance = OverlayScrollbars(ele, options)

        //scrollXBarColor, scrollYBarColor
        vo.timerBarColor = setInterval(() => {
            let b = ele.querySelectorAll('.os-scrollbar-handle')
            if (b[0].style.backgroundColor !== vo.scrollXBarColor) {
                b[0].style.backgroundColor = vo.scrollXBarColor
            }
            if (b[1].style.backgroundColor !== vo.scrollYBarColor) {
                b[1].style.backgroundColor = vo.scrollYBarColor
            }
        }, 50)

    },
    beforeDestroy: function() {

        let vo = this

        //destroy
        vo.instance.destroy()

        //clearInterval
        clearInterval(vo.timerBarColor)

    },
    computed: {
    },
    methods: {
    },
}
</script>

<style scoped>
</style>
