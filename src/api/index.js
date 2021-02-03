import {get,post} from "./http";

// 判断管理员是否登录成功
export const Login = (params) => post('admin/login',params);

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
