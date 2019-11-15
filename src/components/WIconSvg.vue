<template>
    <div style="display:inline-block;">
        <svg
            :width="size"
            :height="size"
            :viewBox="`0 0 ${sizeOriginal} ${sizeOriginal}`"
            @mouseenter="mouseEnter=true"
            @mouseleave="mouseEnter=false"
        >
            <path
                :style="`${iconStyleTransition}; ${iconStyle}; fill:${getIconColor};`"
                :d="path"
            ></path>
        </svg>
    </div>
</template>

<script>

/**
 * @vue-prop {String} [color='#000'] 輸入圖標顏色字串，預設'#000'
 * @vue-prop {String} colorHover 輸入滑鼠移入圖標顏色字串，預設'#999'
 * @vue-prop {Number} sizeOriginal 輸入svg原始尺寸浮點數，預設24
 * @vue-prop {Number} size 輸入圖標欲顯示的尺寸浮點數，預設24
 * @vue-prop {String} path 輸入svg path字串，預設''
 * @vue-prop {String} iconStyleTransition 輸入圖標style設定transition字串，預設'transition:all 0.5s linear'
 * @vue-prop {String} iconStyle 輸入圖標style設定字串，預設''
 */
export default {
    components: {
    },
    props: {
        color: {
            type: String,
            default: '#000',
        },
        colorHover: {
            type: String,
            default: '#999',
        },
        sizeOriginal: {
            type: Number,
            default: 24,
        },
        size: {
            type: Number,
            default: 24,
        },
        path: {
            type: String,
            default: '',
        },
        iconStyleTransition: {
            type: String,
            default: 'transition:all 0.5s linear',
        },
        iconStyle: {
            type: String,
            default: '',
        },
    },
    data: function() {
        return {
            mouseEnter: false,
        }
    },
    computed: {

        getIconColor: function() {
            let vo = this
            return vo.mouseEnter ? vo.colorHover : vo.color
        },

    },
    methods: {
    },
}
</script>

<style scoped>
</style>
