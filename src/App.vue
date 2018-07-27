<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Cookie from './libs/helpers/cookies';
export default {
  name: 'app',
    beforeUpdate() {
        this.$store.commit('setRoleNo',  Cookie.read('roleNo'));
        this.$store.commit('setAccount',  Cookie.read('account'));
    }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
