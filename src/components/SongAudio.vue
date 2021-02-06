<template>
    <div class="song-audio">
        <audio id="player"
            :src="Url"

            controls = "controls"
            @canplay="startPlay"
            @ended="ended"
        ></audio>
    </div>
</template>
<script>
  import { mapGetters} from 'vuex'
export default {
    name: 'song-audio',
    computed: {
      ...mapGetters([
        'isPlay',
        'Url',
      ])
    },
    watch: {
      isPlay:function(){
        this.togglePlay();
      }
    },
    methods:{
        //获取链接后准备播放
        startPlay(){
            let player = document.querySelector('#player');
            //开始播放
            player.play();
        },
        //播放完成之后触发
        ended(){
           this.$store.commit('setIsplay',false);
        },
        togglePlay(){
          let player = document.querySelector('#player');
          if(this.isPlay)
          {
            player.play();
          }
          else
          {
            player.pause();
          }
        }

    }
}
</script>

<style>
    .song-audio {
        display: none;
    }
</style>
