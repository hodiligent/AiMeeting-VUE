import Point from "./point";

export default interface Room {
  // 房间id
  id?: string;
  // 开始坐标
  start: Point;
  // 结束坐标
  end: Point;
  // 房间人数限制
  capacity: number;
  // 房间名称
  name: string;
}
