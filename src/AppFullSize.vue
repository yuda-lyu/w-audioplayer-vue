<template>
    <div style="width:100%; height:100%;">
        <div :style="'overflow-y:auto; width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:'+backgroundColor+';'">

            <div class="panelShadow" style="width:100%; height:100%;">
                <WAudioplayerVue
                    :items="items"
                ></WAudioplayerVue>
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
            backgroundColor: window.kpMenu['AppFullSize'].backgroundColor,
        }
    },
}
</script>

<style scoped>
</style>

