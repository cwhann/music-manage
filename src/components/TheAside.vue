<template>
    <div class="sidebar">
      <el-menu
        class="sidebar-menu"
        :default-active="onRoutes"
        :collapse="collapse"
        background-color="#334256"
        text-color="#ffffff"
        active-text-color="#20a0ff"
        router
      >
        <div v-for="item in items">
          <div>
            <el-menu-item :index="item.index" :key="item.index">
              <i :class="item.icon"></i>
              {{item.title}}
            </el-menu-item>
          </div>
        </div>
      </el-menu>

    </div>
</template>

<script>
  import bus from '../assets/js/bus.js'
  export default {
    name: 'TheAside',
    data(){
      return{
        collapse:false,
        items: [
          {
            icon:'el-icon-document',
            index:'Info',
            title:'系统首页'
          },
          {
            icon:'el-icon-document',
            index:'Consumer',
            title:'用户管理'
          },
          {
            icon:'el-icon-document',
            index:'Singer',
            title:'歌手管理'
          },
          {
            icon:'el-icon-document',
            index:'SongList',
            title:'歌单管理'
          },
        ],
      }
    },
    computed: {
      onRoutes()
      {
        return this.$route.path.replace('/','');
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
  .sidebar
  {
    position: absolute;
    top:70px;
    left:0;
    bottom: 0;
    background-color:#334256;
    overflow-y: scroll;
  }
  .sidebar::-webkit-scrollbar{
    width:0;
  }
  .sidebar-menu:not(.el-menu--collapse){
    width:150px;
  }
  .sidebar >ul{
    height: 100%;
  }
</style>
