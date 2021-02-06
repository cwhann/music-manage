<template>
  <div class="login-wrap">
    <div class="ms-title">music 后台管理登录</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item  prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input v-model="ruleForm.password" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm">登录</el-button>
        </div>
      </el-form>
    </div>

  </div>
</template>
<script>
import {Login} from "../api/index"
export default {
  data () {
    return {
        ruleForm: {
          username:'lin_rany',
          password:'123456',
        },
        rules:{
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        }
    }
  },
  methods:
    {
      submitForm()
      {
        var _this = this;
        Login(this.ruleForm).then((res)=>{
            //console.log(res);
            if(res.code==200)
            {
              localStorage.setItem('UserName',_this.ruleForm.username);
              _this.$router.push('/Info');
              _this.$notify({
                title:'成功',
                message:res.msg,
                type:'success'
              });
            }
            else {
              _this.$notify({
                title:'失败',
                message:res.msg,
                type:'error'
              });
            }
          }
        )
      }
    }
}
</script>
<style scoped>
.login-btn{
  text-align: center;
}
.ms-login
{
  position:absolute;
  left:50%;
  top:50%;
  width:300px;
  height:160px;
  border-radius:10px;
  padding:40px;
  margin-top:-170px;
  margin-left:-150px;
  background:#fff;
}
.login-wrap {
  position: relative;
  background: url("../assets/img/background.jpg");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #fff;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
</style>
