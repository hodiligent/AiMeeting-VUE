<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col
        :span="12"
        :offset="6"
      >
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <!-- TOOD -->
            <el-form
              ref="room"
              :model="room"
              label-width="80px"
              :rules="addRoomRules"
            >
              <el-form-item
                label="房间名称"
                prop="name"
              >
                <el-input
                  v-model="room.name"
                  style="width: 97%;"
                ></el-input>
              </el-form-item>
              <el-form-item label="开始坐标">
                <el-col :span="11">
                  <el-input-number
                    v-model="room.start.x"
                    @change="handleChange"
                    :min="0"
                    :max="cmax"
                    label="横坐标x:"
                    style="width: 100%;"
                  ></el-input-number>
                </el-col>
                <el-col
                  class="line"
                  :span="2"
                >·</el-col>
                <el-col :span="11">
                  <el-input-number
                    v-model="room.start.y"
                    @change="handleChange"
                    :min="0"
                    :max="cmax"
                    label="纵坐标y:"
                    style="width: 100%;"
                  ></el-input-number>
                </el-col>
              </el-form-item>
              <el-form-item label="结束坐标">
                <el-col :span="11">
                  <el-input-number
                    v-model="room.end.x"
                    @change="handleChange"
                    :min="0"
                    :max="cmax"
                    label="横坐标x:"
                    style="width: 100%;"
                  ></el-input-number>
                </el-col>
                <el-col
                  class="line"
                  :span="2"
                >·</el-col>
                <el-col :span="11">
                  <el-input-number
                    v-model="room.end.y"
                    @change="handleChange"
                    :min="0"
                    :max="cmax"
                    label="纵坐标y:"
                    style="width: 100%;"
                  ></el-input-number>
                </el-col>
              </el-form-item>
              <el-form-item label="容纳人数">
                <el-col
                  type="flex"
                  class="row-bg"
                  justify="center"
                >
                  <el-input-number
                    v-model="room.capacity"
                    @change="handleChange"
                    :min="1"
                    :max="pmax"
                    label="人数限制"
                    style="width: 100%;"
                  >
                  </el-input-number>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col
                  type="flex"
                  class="row-bg"
                  justify="center"
                >
                  <el-button
                    type="primary"
                    @click="submitForm()"
                  >立即创建</el-button>
                </el-col>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { addRoom } from "@/api/company";
import Room from "@/models/room";

@Component
export default class Home extends Vue {
  cmax = 100;
  pmax = 5000;
  room: Room = {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    name: "",
    capacity: 0
  };
  addRoomRules = {
    name: [
      {
        required: true,
        message: "房间名不能为空，请输入！",
        trigger: "blur"
      }
    ]
  };
  submitForm() {
    let el: any = this.$refs.room;
    el.validate((valid: boolean) => {
      //TODO 调用接口
      if (valid) {
        if (
          this.room.end.x <= this.room.start.x &&
          this.room.end.y <= this.room.start.y
        ) {
          this.$message.error("结束坐标必须大于开始坐标");
          return;
        }
        addRoom(this.room);
        el.resetField();
      }
    });
  }
}
</script>
