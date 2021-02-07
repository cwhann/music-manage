<template>
  <div class="table">
    <div class="crumbs">
      <i class="el-icon-tickets"></i>歌单歌曲信息
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="danger" size="mini" @click="deleteBtnhandle" v-if="showdelete" icon="el-icon-delete">批量删除</el-button>
        <el-button type="primary" size="mini" @click="showdelete=true" v-if="!showdelete">批量操作</el-button>
        <el-button type="primary" size="mini" @click="addBtnhandle">添加歌曲</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%;" size="mini" height="650px" border  @selection-change="handleSelectionChange">
      <el-table-column  width="40" align="center" type="selection" v-if="showdelete"></el-table-column>
      <el-table-column   align="center" label="歌手-歌名">
        <template slot-scope="scope">
          {{scope.row.singerName}}-{{scope.row.songName}}
        </template>
      </el-table-column>
      <el-table-column label="操作"  width="150" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="danger" @click="handleDelete(scope.row.id)" size="mini">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加歌曲" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form  v-model="registerForm" ref="singersData" label-width="80px">
        <el-form-item label="歌手名">
          <el-select v-model="selectsingerid" filterable placeholder="请选择歌手">
            <el-option
              v-for="item in singersData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="歌曲名">
          <el-select v-model="registerForm.songid" filterable placeholder="请选择歌曲">
            <el-option
              v-for="item in songsData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
          <el-button size="mini" @click="addsonglist" type="primary">确定</el-button>
          <el-button size="mini" @click="centerDialogVisible = false">取消</el-button>
        </span>
    </el-dialog>

    <el-dialog title="删除歌曲" :visible.sync="deleteDialogVisible" width="400px" center>
      <p align="center">确定删除吗?该操作不可撤回</p>
      <span slot="footer">
          <el-button size="mini" @click="deletesonglist" type="primary">确定</el-button>
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
  import {addlistsong,Querysongbyid,querySinger,querysongbysonglistid,Querysongbysongid,querySingerbyid,deletesongbyid} from '../api/index'
  import {mixin} from '../mixins/index'
  export default {
    mixins: [mixin],
    name: 'ListSong',
    data() {
      return {
        selectsingerid:'',
        songlistid:'',
        alselecttable:[],
        showdelete:false,
        centerDialogVisible:false,
        deleteDialogVisible:false,
        deleteallDialogVisible:false,
        registerForm:{      //添加框
          songid:'',
          listid:'',
        },
        tableData:[],
        singersData:[],//所有歌手信息
        songsData:[],//对应歌手所有歌曲信息
        idx:-1,
        rules:{
          title: [
            { required: true, message: '请输入歌曲名称', trigger: 'blur' },
          ],
        }
      }
    },
    watch:{
      selectsingerid:function()
      {
        if(this.selectsingerid!=='')
        {
          Querysongbyid(this.selectsingerid).then(res=>{
            //console.log(res);
            this.songsData=res.data;})
          }
        }
      }
    ,
    created() {
      this.songlistid=this.$route.query.id;
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
          this.deletesonglist();
        }
        this.alselecttable=[];
        this.querydata();
        this.deleteallDialogVisible=false;
        this.showdelete=false;
      },
      handleSelectionChange(val)//批量操作的监控
      {
        this.alselecttable=val;
        // console.log(this.alselecttable);
      },
      deletesonglist()//删除歌曲
      {
        deletesongbyid(this.idx).then(res=>{
          this.querydata();
          this.notify("删除成功",'success');
          this.deleteDialogVisible=false;
        }).catch(err=>{console.log(err);})
      },
      addBtnhandle()//点击新增歌曲
      {
        this.centerDialogVisible=true;
        this.selectsingerid='';
        this.registerForminit()//清空
        this.quertAllsinger();
      },
      quertAllsinger(){
        querySinger().then(res=>{
          //console.log(res);
          this.singersData=res.data;
        })
      },
      addsonglist()//新增歌单歌曲
      {
        addlistsong({songListId:this.songlistid,songId:this.registerForm.songid}).then(res=>
        {
          //console.log(res);
          this.centerDialogVisible=false;
          this.querydata();
          this.notify("新增成功","success");
          this.songsData=[];
          this.singersData=[];
        })
      },
      querydata()//查询所有歌曲
      {
        this.tableData=[];
        querysongbysonglistid(this.songlistid).then(res=>{
          //console.log(res);
          for(let item of res.data)
          {
            //console.log(item);
            Querysongbysongid(item.songId).then(res=>{
              //console.log(res);
              var songname=res.data.name;
              querySingerbyid(res.data.singerId).then(res=>{
                //console.log(res);
                this.tableData.push({id:item.id,songName:songname,singerName:res.data.name});
              });
            }).catch(err=>{console.log(err);})
          }
          //console.log(this.tableData);
        }).catch(err=>{
          console.log(err);
        })
      },
      registerForminit()//初始化函数
      {
        this.registerForm={      //添加框
          songid:'',//歌曲id
        }
      },
    }
  }
</script>

<style scoped>

  .handle-box{
    margin-bottom: 20px;
  }


</style>
