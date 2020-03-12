<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="所属项目" prop="projectM">
        <el-select v-model="dataForm.projectId"  placeholder="请选择">
          <el-option v-for="projectM in projectMList" :key="projectM.id" :value="projectM.id" :label="projectM.projectName">
            {{ projectM.projectName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目内容" prop="content">
        <el-input v-model="dataForm.content"  placeholder="项目内容"></el-input>
      </el-form-item>
      <el-form-item label="计划开始时间" prop="plannedStartTime">
        <el-date-picker v-model="dataForm.plannedStartTime" placeholder="计划开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="计划结束时间" size="mini" prop="plannedEndTime">
        <el-date-picker v-model="dataForm.plannedEndTime" placeholder="计划结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="实际开始时间" prop="actualStartTime">
        <el-date-picker v-model="dataForm.actualStartTime" placeholder="实际开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="实际结束时间" size="mini" prop="actualEndTime">
        <el-date-picker v-model="dataForm.actualEndTime" placeholder="实际结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">未开始</el-radio>
          <el-radio :label="1">开始中</el-radio>
          <el-radio :label="2">完成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="负责人" prop="personInCharge">
        <el-select v-model="dataForm.userId"  placeholder="请选择">
          <el-option v-for="user in userList" :key="user.userId" :value="user.userId" :label="user.realName">{{ user.realName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          projectId: '',
          content: '',
          plannedStartTime: '',
          plannedEndTime: '',
          actualEndTime: '',
          userId: '',
          actualStartTime: '',
          status: 1,
          remark: ''
        },
        dataRule: {
          projectId: [
            { required: true, message: '所属项目名称不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '负责人不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.$http({
          url: this.$http.adornUrl('/sys/projectM/select'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.projectMList = data && data.code === 0 ? data.list : []
        })
        this.$http({
          url: this.$http.adornUrl('/sys/user/select'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.userList = data && data.code === 0 ? data.list : []
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/projectMilepost/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.projectId = data.projectMilepost.projectId
                this.dataForm.content = data.projectMilepost.content
                this.dataForm.plannedStartTime = data.projectMilepost.plannedStartTime
                this.dataForm.plannedEndTime = data.projectMilepost.plannedEndTime
                this.dataForm.actualEndTime = data.projectMilepost.actualEndTime
                this.dataForm.actualStartTime = data.projectMilepost.actualStartTime
                this.dataForm.userId = data.taskSchedule.userId
                this.dataForm.status = data.projectMilepost.status
                this.dataForm.remark = data.projectMilepost.remark
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/projectMilepost/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'projectId': this.dataForm.projectId,
                'content': this.dataForm.content,
                'plannedStartTime': this.dataForm.plannedStartTime,
                'plannedEndTime': this.dataForm.plannedEndTime,
                'actualEndTime': this.dataForm.actualEndTime,
                'actualStartTime': this.dataForm.actualStartTime,
                'userId': this.dataForm.userId,
                'status': this.dataForm.status,
                'roleIdList': this.dataForm.roleIdList
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
