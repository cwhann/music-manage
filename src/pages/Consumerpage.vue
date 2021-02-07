<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button type="danger" size="mini" @click="deleteBtnhandle" v-if="showdelete" icon="el-icon-delete">批量删除</el-button>
        <el-button type="primary" size="mini" @click="showdelete=true" v-if="!showdelete">批量操作</el-button>
        <el-input v-model="select_word" size="mini" placeholder="请输入用户名"
                  class="handle-input" prefix-icon="el-icon-search"></el-input>
        <el-button type="primary" size="mini" @click="addBtnhandle">添加用户</el-button>
      </div>
    </div>
    <el-table :data="showdata" style="width: 100%;" size="mini" height="650px" border  @selection-change="handleSelectionChange">
      <el-table-column  width="40" align="center" type="selection" v-if="showdelete">
      </el-table-column>
      <el-table-column label="用户图片" width="150" align="center">
        <template slot-scope="scope">
          <img :src="getUrl(scope.row.avator)" alt="" class="consumer-img" width="100%">
          <el-upload :action="uploadUrl(scope.row.id)" :before-upload="beforeAvatorUpload"
                     :on-success="handleAvatorSuccess">
            <el-button size="mini">更新图片</el-button>
          </el-upload>
        </template>

      </el-table-column>
      <el-table-column  label="用户名" width="150" prop="username" align="center"></el-table-column>
      <el-table-column label="性别"  width="50" align="center">
        <template slot-scope="scope">
          {{changeSex(scope.row.sex)}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="120" align="center" prop="phoneNum"></el-table-column>
      <el-table-column label="电子邮箱" width="240" align="center" prop="email"></el-table-column>
      <el-table-column label="生日" width="120" align="center">
        <template slot-scope="scope">
          {{attachBirth(scope.row.birth)}}
        </template>
      </el-table-column>
      <el-table-column label="签名" prop="introduction" align="center"></el-table-column>
      <el-table-column label="地区" prop="location" width="100" align="center"></el-table-column>
      <el-table-column label="操作"  width="150" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" @click="handleEdit(scope.row)" size="mini">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)" size="mini">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="currentPage"  :page-size="pageSize"
                   background layout="total,prev,pager,next"  :total="tableData.length"
                   align="center"
                   @current-change="pageChange">
    </el-pagination>

    <el-dialog title="添加用户" :visible.sync="centerDialogVisible" width="400px" center >
      <el-form :model="registerForm" ref="registerForm" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="username" size="mini">
          <el-input placeholder="姓名" v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="username" size="mini">
          <el-input placeholder="密码" type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <input type="radio" name="sex" value="1" v-model="editForm.sex">&nbsp;男&nbsp;&nbsp;&nbsp;
          <input type="radio" name="sex" value="0" v-model="editForm.sex">&nbsp;女
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNum" size="mini">
          <el-input placeholder="手机号"  v-model="registerForm.phoneNum"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email" size="mini">
          <el-input placeholder="电子邮箱" v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birth" size="mini">
          <el-date-picker v-model="registerForm.birth" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="签名" prop="introducation" size="mini">
          <el-input placeholder="签名" v-model="registerForm.introducation"></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="location" size="mini">
          <el-input placeholder="地区" v-model="registerForm.location"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
          <el-button size="mini" @click="addconsumer" type="primary">确定</el-button>
          <el-button size="mini" @click="centerDialogVisible = false">取消</el-button>
        </span>
    </el-dialog>
    <el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="400px" center>
      <el-form :model="editForm" ref="editForm" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="username" size="mini">
          <el-input placeholder="姓名" v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="username" size="mini">
          <el-input placeholder="密码" type="password" v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <input type="radio" name="sex" value="1" v-model="editForm.sex">&nbsp;男&nbsp;&nbsp;&nbsp;
          <input type="radio" name="sex" value="0" v-model="editForm.sex">&nbsp;女
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNum" size="mini">
          <el-input placeholder="手机号"  v-model="editForm.phoneNum"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email" size="mini">
          <el-input placeholder="电子邮箱" v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birth" size="mini">
          <el-date-picker v-model="editForm.birth" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="签名" prop="introduction" size="mini">
          <el-input placeholder="签名" v-model="editForm.introduction"></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="location" size="mini">
          <el-input placeholder="地区" v-model="editForm.location"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
          <el-button size="mini" @click="updateconsumer" type="primary">确定</el-button>
          <el-button size="mini" @click="editDialogVisible = false">取消</el-button>

        </span>
    </el-dialog>
    <el-dialog title="删除用户" :visible.sync="deleteDialogVisible" width="400px" center>
      <p align="center">确定删除吗?该操作不可撤回</p>
      <span slot="footer">
          <el-button size="mini" @click="deleteconsumer" type="primary">确定</el-button>
          <el-button size="mini" @click="deleteDialogVisible = false">取消</el-button>
        </span>
    </el-dialog>
    <el-dialog title="批量删除" :visible.sync="deleteallDialogVisible" width="400px" center>
      <p align="center">确定删除吗?该操作不可撤回</p>
      <span slot="footer">
          <el-button size="mini" @click="deleteall" type="primary">确定</el-button>
          <el-button size="mini" @click="deleteallDialogVisible = false">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import {queryallConsumer,UpdateConsumer,AddConsumer,DeleteConsumer,queryConsumerByName} from '../api/index'
  import {mixin} from '../mixins/index'
  export default {
    mixins: [mixin],
    name: 'info',
    data() {
      return {
        showdelete:false,
        currentPage:1,
        pageSize:5,
        centerDialogVisible:false,
        editDialogVisible:false,
        deleteDialogVisible:false,
        deleteallDialogVisible:false,
        registerForm:{      //添加框
          username: '',
          password: '',
          sex: '1',
          phoneNum: '',
          email: '',
          birth: '',
          introduction: '',
          location: ''
        },
        editForm:{      //添加框
          username: '',
          password: '',
          sex: '1',
          phoneNum: '',
          email: '',
          birth: '',
          introduction: '',
          location: ''
        },
        alselecttable:[],//那些项已经选择了
        tableData:[],
        select_word:'',
        tempData:[],
        idx:-1,
        rules:{
          username: [
            {required: true,message: '请输入用户名',trigger: 'blur'}
          ],
          password: [
            {required: true,message: '请输入密码',trigger: 'blur'}
          ],
          phoneNum: [
            {required: true,message: '请输入手机号',trigger: 'blur'}
          ],
          email: [
            {required: true,message: '请输入电子邮箱',trigger: 'blur'},
            {type: 'email',message:'请输入正确的电子邮箱地址',trigger:['blur','change']}
          ],
        }
      }
    },
    computed:{
      showdata()//前端实现的分页，所以展示内容要动态更新
      {
        return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      }
    },
    watch: {
      select_word:function(){
        if(this.select_word=='')
        {
          this.tableData=this.tempData;
        }
        else
        {
          queryConsumerByName(this.select_word).then(res=>{
            this.tableData=[];
            this.tableData=res.data;
          }).catch(err=>{
            console.log(err);
          })
        }
      }
    },
    created() {this.querydata();},
    methods:{
      addBtnhandle()//点击新增的事件
      {
        this.centerDialogVisible=true;
        this.registerForminit();
      },
      deleteBtnhandle()//点击批量删除按钮的事件
      {
        if(this.alselecttable.length>0)//如果选择有选择的项，就进行删除操作
        {
          this.deleteallDialogVisible=true;
        }
        else //否则返回到批量操作
        {
          this.showdelete=false;
        }

      },
      deleteall()//将选中的行删除
      {
        for(let item of this.alselecttable)
        {
          this.idx=item.id;
          this.deleteconsumer();
        }
        this.alselecttable=[];
        this.querydata();
        this.pageChange(1);
        this.deleteallDialogVisible=false;
        this.showdelete=false;
      },
      handleSelectionChange(val)//批量操作的监控
      {
        this.alselecttable=val;
        // console.log(this.alselecttable);
      },
      deleteconsumer()//删除用户
      {
        DeleteConsumer(this.idx).then(res=>{
          this.querydata();
          this.notify("删除成功",'success');
          this.deleteDialogVisible=false;
        }).catch(err=>{console.log(err);})
      },
      updateconsumer()//更新用户弹窗中点击确定
      {
        // console.log(this.registerForm);
        UpdateConsumer(this.editForm).then((res)=>{
          if(res.code==200)
          {
            this.notify('修改成功','success');
            this.editDialogVisible=false;
            this.querydata();
          }
          else
          {
            this.$notify.error({title:'失败',message:'修改失败'});
          }
        }).catch(err=> {console.log(err);})
      },
      handleEdit(objform)//点击编辑按钮
      {
        this.editDialogVisible=true;//显示弹窗
        this.editForm=JSON.parse(JSON.stringify(objform));//深拷贝
      },
      pageChange(nowPage)
      {
        this.currentPage=nowPage;
      },
      addconsumer()//新增用户
      {
        let d = this.registerForm.birth;
        if(d.length)
        {
          let datetime = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
          this.registerForm.date=datetime;
        }
        AddConsumer(this.registerForm).then((res)=>{
          if(res.code==200)
          {
            this.notify('添加成功','success');
            this.centerDialogVisible=false;
            this.querydata();
          }
          else
          {
            this.$notify.error({title:'失败',message:'添加失败'});
          }
        }).catch(err=> {console.log(err);})
      },
      querydata()//查询所有用户
      {
        queryallConsumer().then(res=>{
          this.tableData=res.data;
          this.tempData=res.data;
          //console.log(res);
        }).catch(err=>{
          console.log(err);
        })
      },
      //更新图片
      registerForminit(){
        this.registerForm={      //添加框
          username: '',
            password: '',
            sex: '1',
            phoneNum: '',
            email: '',
            birth: '',
            introduction: '',
            location: ''
        }
      },
      uploadUrl(id){
        return `${this.$store.state.HOST}/consumer/updateavator?id=${id}`
      }
    }
  }
</script>

<style scoped>

  .handle-box{
    margin-bottom: 20px;
  }
  .consumer-img{
    width: 100%;
    height: 80px;
    border-radius: 5px;
    margin-bottom: 5px;
    overflow: hidden;
  }
  .handle-input{
    width: 300px;
    display: inline-block;
  }
  .pagination{
    display: flex;
    justify-content: center;
  }
</style>
