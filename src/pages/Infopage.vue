<template>
  <div>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{consumerCount}}</div>
              <div>用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{songCount}}</div>
              <div>歌曲总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{singerCount}}</div>
              <div>歌手数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{songListCount}}</div>
              <div>歌单数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="12">
        <h3 class="mgb20">用户性别比例</h3>
        <div style="background-color:white">
          <ve-pie :data="consumerSex" :theme="options"></ve-pie>
        </div>
      </el-col>
      <el-col :span="12">
        <h3 class="mgb20">歌曲类型分布</h3>
        <div style="background-color:white">
          <ve-histogram :data="songStyle"></ve-histogram>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="12">
        <h3 class="mgb20">歌手性别比例</h3>
        <div style="background-color:white">
          <ve-pie :data="singerSex"></ve-pie>
        </div>
      </el-col>
      <el-col :span="12">
        <h3 class="mgb20">歌手地区分布</h3>
        <div style="background-color:white">
          <ve-histogram :data="country" :theme="options1"></ve-histogram>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {queryallConsumer,queryallSong,querySinger,querysonglist} from '../api/index';
  export default {
    data(){
      return {
        consumerCount: 0,       //用户总数
        songCount: 0,           //歌曲总数
        singerCount: 0,         //歌手数量
        songListCount: 0,        //歌单数量
        consumer: [],            //所有用户
        consumerSex:{           //按性别分类的用户数
          columns: ['性别','总数'],
          rows: [
            {'性别': '男','总数': 0},
            {'性别': '女','总数': 0}
          ]
        },
        options: {
          color: ['#87cefa','#ffc0cb']
        },
        options1: {
          color: ['yellow']
        },
        songStyle:{           //按歌单风格分类
          columns: ['风格','总数'],
          rows: [
            {'风格': '华语','总数': 0},
            {'风格': '粤语','总数': 0},
            {'风格': '欧美','总数': 0},
            {'风格': '日韩','总数': 0},
            {'风格': 'BGM','总数': 0},
            {'风格': '轻音乐','总数': 0},
            {'风格': '乐器','总数': 0}
          ]
        },
        singerSex:{           //按性别分类的歌手数
          columns: ['性别','总数'],
          rows: [
            {'性别': '女','总数': 0},
            {'性别': '男','总数': 0},
            {'性别': '组合','总数': 0},
            {'性别': '不明','总数': 0}
          ]
        },
        country:{
          columns: ['地区','总数'],
          rows: [
            {'地区': '中国','总数': 0},
            {'地区': '韩国','总数': 0},
            {'地区': '日本','总数': 0},
            {'地区': '美国','总数': 0},
          ]
        }
      }
    },
    created() {

    },
    mounted() {
      this.getConsumer();
      this.getSong();
      this.getSinger();
      this.getSongList();
    },
    methods: {
      getConsumer() {                     //用户总数
        queryallConsumer().then(res => {
          //console.log(res);
          this.consumer = res.data;
          this.consumerCount = res.data.length;
          this.consumerSex.rows[0]['总数'] = this.setSex(1,this.consumer);
          this.consumerSex.rows[1]['总数'] = this.setSex(0,this.consumer);
        })
      },
      setSex(sex,val) {              //根据性别获取用户数
        let count = 0;
        for(let item of val){
          if(sex == item.sex){
            count++;
          }
        }
        return count;
      },
      getSong() {                      //歌曲总数
        queryallSong().then(res => {
          this.songCount =res.data.length;
        })
      },
      getSinger() {                      //歌手数量
        querySinger().then(res => {
          this.singerCount = res.data.length;
          this.singerSex.rows[0]['总数'] = this.setSex(0,res.data);
          this.singerSex.rows[1]['总数'] = this.setSex(1,res.data);
          this.singerSex.rows[2]['总数'] = this.setSex(2,res.data);
          this.singerSex.rows[3]['总数'] = this.setSex(3,res.data);
          for(let item of res.data){
            this.getByCountry(item.location);
          }
        })
      },

      getSongList() {                    //歌单数量
        querysonglist().then(res => {
          this.songListCount = res.data.length;
          for(let item of res.data){
            this.getByStyle(item.style);
          }
        })
      },
      getByStyle(style) {              //根据歌单风格获取数量
        var ishave=0;
        for(let item of this.songStyle.rows)
        {
          if(style.includes(item['风格'])){
            item['总数']++;
            ishave=1;
          }
        }
        if(!ishave)this.songStyle.rows.push({'风格':style,'总数':1});
      },
      getByCountry(location) {              //根据国籍获取数量
        var ishave=0;
        for(let item of this.country.rows){
          if(location.includes(item['地区'])){
            item['总数']++;
            ishave=1;
          }
        }
        if(!ishave)this.country.rows.push({'地区':location,'总数':1});
      }
    }
  }

</script>

<style scoped>

  .grid-content {
    display: flex;
    align-items: center;
    height: 50px;
  }

  .grid-cont-center {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: darkgray;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }
</style>
