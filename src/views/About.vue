<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col
        :span="16"
        :offset="4"
      >
        <el-table
          :data="roomData"
          v-loading="loading"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            fixed
            prop="name"
            label="房间名字"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="capacity"
            label="房间容量"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="start"
            label="房间开始坐标"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="end"
            label="房间结束坐标"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="area"
            label="房间面积(平方米)"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="房间状态"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-col :span="12">
                <el-button
                  type="info"
                  size="small"
                  @click="updateHandle(scope.$index, scope.row)"
                >编辑</el-button>
              </el-col>
              <el-col :span="12">
                <el-button
                  type="danger"
                  size="small"
                  @click="deleteHandle(scope.$index, scope.row)"
                  @init="getRoomInfo()"
                >删除</el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <PopOfAboutRoom
      ref="updateRoomInfo"
      @init="getRoomInfo()"
    />
  </div>
</template>

<script>
import PopOfAboutRoom from './popOfAboutRoom';
import { queryRoom, deleteRoom } from '@/api/company'
const statusMap = {
  0: '装修',
  1: '可用'
}
export default {
  components: {
    PopOfAboutRoom
  },
  data() {
    return {
      roomData: [],
      loading: false
    }
  },
  mounted() {
    this.getRoomInfo();
  },
  methods: {
    async getRoomInfo() {
      this.loading = true;
      const roomData = await queryRoom() || [];
      roomData.map(room => {
        room.status = statusMap[room.status];
        room.area = Math.abs(room.end.x - room.start.y) * Math.abs(room.end.y - room.start.y);
        room.start = "( " + room.start.x + "," + room.start.y + " )";
        room.end = "( " + room.end.x + "," + room.end.y + " )";
      });
      this.roomData = roomData;
      this.loading = false;
    },
    updateHandle(index, row) {
      this.$refs.updateRoomInfo.handleEdit(index, row);
    },
    async deleteHandle(index, row) {
      this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const roomData = this.roomData[index];
        deleteRoom(roomData);
        this.getRoomInfo();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
};
</script>
