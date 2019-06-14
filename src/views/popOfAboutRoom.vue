<template>
  <el-dialog
    title="编辑房间"
    :visible.sync="dialogHandleVisible"
    :modal-append-to-body="false"
  >
    <div class="line-top">
      <hr>
    </div>
    <div class="publish-course">
      <el-form
        :model="room"
        :rules="handleRoom"
        ref="room"
      >
        <el-form-item
          label="房间名称:"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input
            v-model="room.name"
            placeholder="请输入房间名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="房间容量:"
          :label-width="formLabelWidth"
          prop="capacity"
        >
          <el-input-number
            v-model="room.capacity"
            :min="0"
            :max="200"
            style="width: 100%;"
            placeholder="请输入房间容量"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="房间开始坐标:"
          :label-width="formLabelWidth"
          prop="start"
        >
          <span>{{room.start}}</span>
        </el-form-item>
        <el-form-item
          label="房间结束坐标:"
          :label-width="formLabelWidth"
          prop="end"
        >
          <span>{{room.end}}</span>
        </el-form-item>
        <el-form-item
          label="房间状态:"
          :label-width="formLabelWidth"
          prop="status"
        >
          <el-radio-group
            v-model="room.status"
            :label-width="formLabelWidth"
          >
            <el-radio
              :label="0"
              :value="0"
            >装修</el-radio>
            <el-radio
              :label="1"
              :value="1"
            >可用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="line-under">
      <hr>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogHandleVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="updateForm(room)"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>

import { updateRoom } from '@/api/company'
const statusMap = {
  '装修': 0,
  '可用': 1
}
export default {
  data() {
    return {
      room: {},
      dialogHandleVisible: false,
      formLabelWidth: '120px',
      handleRoom: {
        name: [
          {
            required: true,
            message: '请输入房间名称',
            trigger: 'blur'
          }
        ],
        capacity: [
          {
            required: true,
            message: '请输入房间容量人数',
            trigger: 'blur'
          }]
        //   { pattern: /^200$|^(\d|[1-9]\d)$/g, message: '请填写1到200的整数' }
        // ]
      }
    };
  },
  methods: {
    // 确认修改
    async updateForm(room) {
      this.$refs.room.validate(valid => {
        if (valid) {
          const params = Object.assign({}, this.room);
          console.log(this.form);
          updateRoom(params).then(res => {
            this.dialogHandleVisible = false;
            this.$emit('init');
          });
        }
      });
    },
    // 编辑房间
    handleEdit(index, row) {
      this.dialogHandleVisible = true;
      this.room = Object.assign({}, row);
      if (this.room.status === '可用') {
        this.room.status = 1;
      } else {
        this.room.status = 0;
      }

    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.line-top {
  margin-top: -30px;
  margin-bottom: 40px;
}
.line-under {
  margin-top: 40px;
  margin-bottom: -30px;
}
</style>