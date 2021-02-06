import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
      HOST:'http://localhost:8888/',
      isPlay:false,
      url:'',
  },
  mutations:{
    setIsplay:(state,Isplay)=>{state.isPlay=Isplay;},
    setUrl:(state,Url)=>{state.url=Url;}
  },
  getters:{
    isPlay:(state)=>state.isPlay,
    Url:(state)=>state.url,
  }

})
