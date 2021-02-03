<template>
  <div>
    <TheHeader></TheHeader>
    <TheAside></TheAside>
    <div class="content-box" :class="{'content-collapse':this.collapse}">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import TheHeader from './TheHeader'
  import TheAside from './TheAside'
  import bus from '../assets/js/bus'
  export default {
    name: 'Home',
    components: {TheHeader,TheAside},
    data(){
      return {
        collapse: false
      }
    },
    /*通过bus来进行是否折叠的操作*/
    created() {
      bus.$on('collapse',msg=>
      {
        this.collapse = msg;
      })
    }
  }
</script>

<style scoped>

</style>
