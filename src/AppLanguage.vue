<template>
    <div style="width:100%; height:100%;">
        <div :style="'overflow-y:auto; width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:'+backgroundColor+';'">

            <div style="height:100%;">

                <div style="height:50px;"></div>

                <div class="panelShadow" style="width:400px; height:600px;">
                    <WAudioplayerVue
                        :items="items"
                        :textDrop="opt.textDrop"
                        :textDropMsg="opt.textDropMsg"
                        :textPlayItem="opt.textPlayItem"
                        :textWaitUserPlay="opt.textWaitUserPlay"
                        :textTitlePlay="opt.textTitlePlay"
                        :textTitlePause="opt.textTitlePause"
                        :textTitleLoop="opt.textTitleLoop"
                        :textTitleRepeat="opt.textTitleRepeat"
                        :textTitleRandom="opt.textTitleRandom"
                        :textTitleDeleteAll="opt.textTitleDeleteAll"
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
            opt: window.kpOpt['AppLanguage'],
            backgroundColor: window.kpMenu['AppLanguage'].backgroundColor,
        }
    },
}
</script>

<style scoped>
</style>
