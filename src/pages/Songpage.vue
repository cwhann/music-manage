<template>
  <div class="table">
    <div class="crumbs">
      <i class="el-icon-tickets"></i>歌曲信息
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="danger" size="mini" @click="deleteBtnhandle" v-if="showdelete" icon="el-icon-delete">批量删除</el-button>
        <el-button type="primary" size="mini" @click="showdelete=true" v-if="!showdelete">批量操作</el-button>
        <el-input v-model="select_word" size="mini" placeholder="请输入歌曲名"
                  class="handle-input" prefix-icon="el-icon-search"></el-input>
        <el-button type="primary" size="mini" @click="addBtnhandle">添加歌曲</el-button>
      </div>
    </div>
    <el-table :data="showdata" style="width: 100%;" size="mini" height="600px" border  @selection-change="handleSelectionChange">
      <el-table-column  width="40" align="center" type="selection" v-if="showdelete">
      </el-table-column>
      <el-table-column label="歌曲图片" width="150" align="center">
        <template slot-scope="scope">
          <img :src="getUrl(scope.row.pic)" alt="" class="singer-img" width="100%">

        </template>
      </el-table-column>
      <el-table-column label="歌手-歌名" prop="name" width="150" align="center">
        <template slot-scope="scope">
          {{singername}}-{{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="专辑" prop="introduction" width="120" align="center"></el-table-column>
      <el-table-column label="歌词"   align="center" >
        <template slot-scope="scope">
          <ul style="height:100px;overflow-y:scroll;">
            <li v-for="(item) in parseLyric(scope.row.lyric)">
              {{item}}
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="资源更新"   align="center" width="180" >
        <template slot-scope="scope">
          <el-upload :action="uploadUrl(scope.row.id)" :before-upload="beforeAvatorUpload"
                     :on-success="handleAvatorSuccess">
            <el-button size="mini">更新图片</el-button>
          </el-upload>
          <br/>
          <el-upload :action="uploadmusicupdateUrl(scope.row.id)" :before-upload="beforeSongUpload"
                     :on-success="handleSongupdate"  ref="uploadsongresupdate">
            <el-button size="mini"  align="center">更新歌曲</el-button>
          </el-upload>
        </template>
      </el-table-column>
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

    <el-dialog title="添加歌曲" :visible.sync="centerDialogVisible" width="400px" center >
      <el-form :model="registerForm" ref="registerForm" label-width="80px" :rules="rules">
        <el-form-item label="歌名" prop="name" size="mini">
          <el-input placeholder="歌名" v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="专辑" prop="introduction" size="mini">
          <el-input placeholder="专辑"  v-model="registerForm.introduction" ></el-input>
        </el-form-item>
        <el-form-item label="歌词" prop="lyric" size="mini">
          <el-input placeholder="歌词" type="textarea" v-model="registerForm.lyric" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload :action="uploadmusicaddUrl()" :before-upload="beforeSongUpload"
                     :on-success="handleSongadd" :auto-upload="false" ref="uploadsongresadd">
            <el-button size="mini" type="primary" align="center">选择歌曲资源</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer">
          <el-button size="mini" @click="addSong" type="primary">确定</el-button>
          <el-button size="mini" @click="centerDialogVisible = false">取消</el-button>

        </span>
    </el-dialog>
    <el-dialog title="编辑歌曲" :visible.sync="editDialogVisible" width="400px" center >
      <el-form :model="registerForm" ref="registerForm" label-width="80px" :rules="rules">
        <el-form-item label="歌名" prop="name" size="mini">
          <el-input placeholder="歌名" v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="专辑" prop="introduction" size="mini">
          <el-input placeholder="专辑"  v-model="registerForm.introduction" ></el-input>
        </el-form-item>
        <el-form-item label="歌词" prop="lyric" size="mini">
          <el-input placeholder="歌词" type="textarea" v-model="registerForm.lyric" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
          <el-button size="mini" @click="updateSong" type="primary">确定</el-button>
          <el-button size="mini" @click="editDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除歌曲" :visible.sync="deleteDialogVisible" width="400px" center>
      <p align="center">确定删除吗?该操作不可撤回</p>
      <span slot="footer">
          <el-button size="mini" @click="deleteSong" type="primary">确定</el-button>
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
  import {
    Addsong,
    Updatesong,
    UpdateSinger,
    Querysongbyid,
    querySongByName,
    DeleteSong
  } from '../api/index'
  import {mixin} from '../mixins/index'
  export default {
    mixins: [mixin],
    name: 'info',
    data() {
      return {
        singerid:'',//歌手id
        singername:'1',//歌手姓名
        showdelete:false,
        currentPage:1,//当前页
        pageSize:5,//每页大小
        centerDialogVisible:false,//新增框
        editDialogVisible:false,//编辑框
        deleteDialogVisible:false,//删除确定框
        deleteallDialogVisible:false,//批量删除确定框
        registerForm:{      //添加框
          id:'',//歌曲id
          singerId:'',//歌曲对应的歌手id
          lyric:'',//歌词
          name: '',//歌曲名
          pic:'',//图片地址
          introduction: '',//专辑名
          url:'',//歌曲对应的url
        },
        alselecttable:[],//那些项已经选择了
        tableData:[],
        select_word:'',//搜索框的内容
        tempData:[],//临时变量
        idx:-1,//删除的时候，一个临时变量来记录id
        fileList:[],//文件上传列表
        rules:{
          name: [
            { required: true, message: '请输入歌名', trigger: 'blur' },
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
          querySongByName(this.select_word).then(res=>{
            this.tableData=[];
            this.tableData=res.data;
          }).catch(err=>{
            console.log(err);
          })
        }
      },
    },
    created() {
      this.singerId=this.$route.query.id;//接收页面跳转传来的参数
      this.singername=this.$route.query.name;
      this.querydata();
    },
    methods:{

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
          this.deleteSong();
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
      deleteSong()//删除歌曲
      {
        DeleteSong(this.idx).then(res=>{
          this.querydata();
          this.notify("删除成功",'success');
          this.deleteDialogVisible=false;
        }).catch(err=>{console.log(err);})
      },

      addBtnhandle()//点击新增歌曲按钮
      {
        this.registerForminit();
        this.centerDialogVisible=true;
      },
      handleEdit(objform)//点击编辑按钮
      {
        this.editDialogVisible=true;//显示弹窗
        this.registerForm=JSON.parse(JSON.stringify(objform));//深拷贝
      },
      pageChange(nowPage)
      {
        this.currentPage=nowPage;
      },
      addSong()//新增歌曲
      {
        if(this.$refs.uploadsongresadd.uploadFiles.length)
        {
          this.$refs.uploadsongresadd.submit();//歌曲资源上传
        }
        else
        {
          this.notify("文件列表为空","error");
        }
      },
      updateSong()//更新歌曲信息
      {
        let _this = this;
        Updatesong(this.registerForm).then(res=>{
          console.log(res);
          this.notify("歌曲更新成功","success");
          _this.centerDialogVisible=false;
          _this.querydata();
        }).catch(err=>{console.log(err);})
        this.editDialogVisible=false;
      },
      querydata()//查询所有数据
      {
        Querysongbyid(this.singerId).then(res=>{
          this.tableData=res.data;
          this.tempData=res.data;
        }).catch(err=>{console.log(err)})
      },
      //更新歌曲图片路径
      uploadUrl(id){
        return `${this.$store.state.HOST}/song/updateSongPic?id=${id}`
      },
      //上传歌曲文件路径
      uploadmusicaddUrl()
      {
        return `${this.$store.state.HOST}/song/addSongres`;
      },
      //更新歌曲文件路径
      uploadmusicupdateUrl(id)
      {
        return `${this.$store.state.HOST}/song/updateSongurl?id=${id}`;
      },
      //新增歌曲资源的函数
      handleSongadd(res){
        let _this = this;
        if(res.code === 200){
          console.log(res);
          _this.registerForm.url=res.data;//复制上传的资源url
          _this.registerForm.singerId=_this.singerId;
          if(_this.registerForm.lyric==='')
            _this.registerForm.lyric='[00:00:00]暂无歌词'
          Addsong(this.registerForm).then(res=>{
            console.log(res);
            this.notify("资源上传成功","success");
            _this.centerDialogVisible=false;
            _this.$refs.uploadsongresadd.clearFiles();//对歌曲上传列表进行清空
            _this.querydata();
          }).catch(err=>{console.log(err);})
        }else{
          _this.$notify({
            title: '资源上传失败',
            type: 'error'
          });
        }
      },
      //修改歌曲资源的函数
      handleSongupdate(res){
        let _this = this;
        if(res.code == 200){
          console.log(res);
          _this.$notify({
            title: '资源更新成功',
            type: 'success'
          });

        }else{
          _this.$notify({
            title: '资源上传失败',
            type: 'error'
          });
        }
      },
      //上传歌曲之前的校验
      beforeSongUpload(file){
        var testMsg = file.name.substring(file.name.lastIndexOf('.') + 1);
        if(testMsg!='mp3'){
          this.$message({
            message: '上传文件只能是mp3格式',
            type: 'error'
          });
          return false;
        }
        return true;
      },
      registerForminit()
      {
        this.registerForm={      //添加框
          id:'',//歌曲id
            singerId:'',//歌曲对应的歌手id
            lyric:'',//歌词
            name: '',//歌曲名
            pic:'',//图片地址
            introduction: '',//专辑名
            url:'',//歌曲对应的url
        };
      },
      //解析歌词
      parseLyric(text){
        let lines = text.split("\n");
        let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g;
        let result = [];
        for(let item of lines){
          let value = item.replace(pattern,'');
          result.push(value);
        }
        return result;
      },
    }
  }
</script>

<style scoped>

  .handle-box{
    margin-bottom: 20px;
  }
  .singer-img{
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
