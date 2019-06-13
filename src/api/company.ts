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
    Message.success("创建会议室成功！");
  }
  return result.data;
}
