<template>
    <div class="song-audio">
        <audio id="player"
            :src="src"
            controls = "controls"

            @canplay="startPlay"
            @ended="ended"
        ></audio>
    </div>
</template>
<script>
export default {
    name: 'song-audio',
    data () {
      return{
        src:"http://localhost:8888/song/1612449596319%E5%B0%81%E8%8C%97%E5%9B%A7%E8%8F%8C%20-%20%E5%AE%89%E5%A8%9C%E7%9A%84%E6%A9%B1%E7%AA%97.mp3"
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
           //this.isPlay = false
        },

    }
}
</script>

<style>
    .song-audio {
        display: inline;
    }
</style>
