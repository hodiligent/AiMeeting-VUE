export default class Coordinate {
  // 房间坐标X
  public x: number;
  // 房间坐标Y
  public y: number;
  // 房间容量
  public capacity: number;

  public constructor(x: number, y: number, capacity: number) {
    this.x = x;
    this.y = y;
    this.capacity = capacity;
  }
  static print(x: string, y: string, capacity: number) {
    return { '横坐标': x, '纵坐标': y, '可容人数': capacity }
  }
}
