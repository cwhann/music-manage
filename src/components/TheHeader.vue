<template>
  <div class="header">
    <div class="collapse-btn" @click="collapseChange">
      <i class="el-icon-menu"></i>
      <div class="logo">music后台管理</div>
    </div>

    <div class="header-right">
      <div class="btn-fullscreen" @click="handleFullscreen">
        <el-tooltip :content="fullscreen?'取消全屏':'点击全屏'" placement="bottom">
          <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
      <div class="user-avator">
        <img src="../assets/img/user.jpg"/>
      </div>
      <el-dropdown class="user-name" trigger="click" @command="handlecommand">
          <span class="el-dropdown-link">
            {{UserName}}
            <i class="el-icon-caret-bottom"></i>
          </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import bus from '../assets/js/bus'

  export default {
    name: 'TheHeader',
    data(){
      return {
        collapse:false,
        fullscreen:false,
      }
    },
    computed: {
      UserName()
      {
        return localStorage.getItem('UserName');
      }
    },
    methods:{
      collapseChange()
      {
        this.collapse=!this.collapse;

        bus.$emit('collapse',this.collapse);
      },
      //全屏事件
      handleFullscreen()
      {
        if(this.fullscreen){
          if(document.exitFullscreen){
            document.exitFullscreen();
          }else if(document.webkitCancelFullScreen){      //safari 、Chrome
            document.webkitCancelFullScreen();
          }else if (document.mozCancelFullScreen){        //firefox
            document.mozCancelFullScreen();
          }else if(document.msExitFullScreen){            //ie
            document.msExitFullScreen();
          }
        }else{
          let element = document.documentElement;
          if(element.requestFullscreen){
            element.requestFullscreen();
          }else if(element.webkitRequestFullScreen){      //safari 、Chrome
            element.webkitRequestFullScreen();
          }else if(element.mozRequestFullScreen){         //firefox
            element.mozRequestFullScreen();
          }else if (element.msRequestFullScreen){         //ie
            element.msRequestFullScreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      },
      handlecommand(command)
      {
        if(command=='logout')
        {
          localStorage.removeItem('UserName');
          this.$router.push('/');
        }
      }
    }
  }
</script>

<style scoped>
  .header{
    position: relative;
    background-color:#253041;
    box-sizing: border-box;
    width: 100%;
    height:70px;
    font-size:22px;
    color:#ffffff;
  }
  .collapse-btn{
    float: left;
    padding: 0 10px;
    cursor: pointer;
    line-height: 70px;
  }
  .logo{
    float: right;
    line-height: 70px;
  }
  .header-right{
    float: right;
    display: flex;
    padding-right: 50px;
    height: 70px;
    align-items: center;
  }
  .btn-fullscreen{
    transform: rotate(45deg);
    margin-right: 5px;
    font-size:24px;
  }
  .user-avator{
    margin-left: 20px;
  }

  .user-avator img{
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .user-name{
    margin-left: 10px;
  }

  .el-dropdown-link{
    color: #ffffff;
    cursor: pointer;
  }

</style>
