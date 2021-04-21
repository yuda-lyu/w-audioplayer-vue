<template>
    <div style="width:100%; height:100%;">
        <div :style="'overflow-y:auto; width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:'+backgroundColor+';'">

            <div style="height:100%;">

                <div style="height:50px;"></div>

                <div class="panelShadow" style="width:400px; height:600px;">
                    <WAudioplayerVue
                        :items="items"
                        :dropTextColor="opt.dropTextColor"
                        :menuTextColor="opt.menuTextColor"
                        :textColor="opt.textColor"
                        :backgroundColor="opt.backgroundColor"
                        :barHeight="opt.barHeight"
                        :barColor="opt.barColor"
                        :barBackgroundColor="opt.barBackgroundColor"
                        :menuIconColor="opt.menuIconColor"
                        :menuIconColorActive="opt.menuIconColorActive"
                        :itemTextColor="opt.itemTextColor"
                        :itemTextColorActive="opt.itemTextColorActive"
                        :itemTextColorHover="opt.itemTextColorHover"
                        :itemHeightMin="opt.itemHeightMin"
                        :itemSeplineColor="opt.itemSeplineColor"
                        :scrollBarColor="opt.scrollBarColor"
                        :scrollBarColorHover="opt.scrollBarColorHover"
                    ></WAudioplayerVue>
                </div>

                <div style="height:50px;"></div>

            </div>

        </div>
    </div>
</template>

<script>
import WAudioplayerVue from './components/WAudioplayerVue.vue'

export default {
    components: {
        WAudioplayerVue
    },
    props: {
    },
    data: function() {
        return {
            items: window.items,
            opt: window.kpOpt['AppDarkCyan'],
            backgroundColor: window.kpMenu['AppDarkCyan'].backgroundColor,
        }
    },
}
</script>

<style scoped>
</style>
