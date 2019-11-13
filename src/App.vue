<template>
    <div id="app" style="height:100vh; display:flex; align-items:center; justify-content:center; background-color:#444;">
        <div style="width:400px; height:600px; background-color:white;">
            <WAudioplayerVue></WAudioplayerVue>
        </div>
    </div>
</template>

<script>
import WAudioplayerVue from './components/WAudioplayerVue.vue'

export default {
    name: 'app',
    components: {
        WAudioplayerVue
    }
}
</script>

<style>
</style>
