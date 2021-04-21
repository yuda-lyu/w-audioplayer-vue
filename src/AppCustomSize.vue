<template>
    <div style="width:100%; height:100%;">
        <div :style="'overflow-y:auto; width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:'+backgroundColor+';'">

            <div style="height:100%;">

                <div style="height:50px;"></div>

                <div class="panelShadow" style="width:300px; height:650px;">
                    <WAudioplayerVue
                        :items="items"
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
            backgroundColor: window.kpMenu['AppCustomSize'].backgroundColor,
        }
    },
}
</script>

<style scoped>
</style>
