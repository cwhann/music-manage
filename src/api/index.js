import {get,post} from "./http";

// 判断管理员是否登录成功
export const Login = (params) => post('admin/login',params);

//========================歌手相关=======================
//添加歌手
export const AddSinger = (params) => post(`singer/add`,params);
//修改歌手
export const UpdateSinger = (params) => post(`singer/update`,params);
//删除歌手
export const DeleteSinger = (params) => get(`singer/delete?id=${params}`);
//查询歌手
export const querySinger = () => get(`singer/allSinger`);
//根据歌手姓名来模糊
export const querySingerByName = (params) => get(`singer/singerOfName?name=${params}`);

//========================歌曲相关=======================
//添加歌曲
export const Addsong = (params) => post(`song/addsong`,params);
//修改歌曲
export const Updatesong = (params) => post(`song/updatesong`,params);
//根据歌手id查询歌曲
export const Querysongbyid = (params) => get(`song//findSongbysingerid?id=${params}`);
//根据歌曲名来模糊查询
export const querySongByName = (params) => get(`song/findsongByNameLike?name=${params}`);
//删除歌曲
export const DeleteSong = (params) => get(`song/deletesongbyid?id=${params}`);
//========================歌单相关=======================
//添加歌单
export const Addsonglist = (params) => post(`songlist/add`,params);
//修改歌单
export const Updatesonglist = (params) => post(`songlist/update`,params);
//删除歌单
export const Deletesonglist = (params) => get(`songlist/delete?id=${params}`);
//查询歌单
export const querysonglist = () => get(`songlist/queryall`);
//根据歌单标题来模糊查询
export const querysonglistBytile = (params) => get(`songlist/querybytitlelike?title=${params}`);
