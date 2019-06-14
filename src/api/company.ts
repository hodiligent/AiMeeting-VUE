import axios from "axios";
import Room from "@/models/room";
import Result from "@/models/result";
import { Message } from "element-ui";

export async function addRoom(room: Room) {
  //TODO 调用自己的服务
  let res: any = await axios.post("/api/company/addroom", room);
  let result: Result = res.data;
  if (!result.isSuccess) {
    Message.error("创建会议室失败:" + result.message);
  } else {
    Message.success("创建成功！");
  }
  return result.data;
}

export async function queryRoom() {
  let res: any = await axios.get("/api/company/query");
  let result: Result = res.data;
  if (!result.isSuccess) {
    Message.error("会议室查询失败:" + result.message);
  }
  return result.data;
}

export async function updateRoom(room: Room) {
  let res: any = await axios.post("/api/company/update", room);
  let result: Result = res.data;
  if (!result.isSuccess) {
    Message.error("会议室更新失败:" + result.message);
  } else {
    Message.success("更新成功！");
  }
  return result.data;
}

export async function deleteRoom(room: Room) {
  let res: any = await axios.post("/api/company/delete", room);
  let result: Result = res.data;
  if (!result.isSuccess) {
    Message.error("会议室删除失败:" + result.message);
  } else {
    Message.success("删除成功！");
  }
  return result.data;
}
