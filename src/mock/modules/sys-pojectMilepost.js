import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'Id': '@increment',
    'itemsUnderIt': '@name',
    'content': null,
    'plannedStartTime': 'datetime',
    'plannedEndTime': 'datetime',
    'actualStartTime': 'datetime',
    'actualEndTime': 'datetime',
    'personInCharge': null,
    'status': 0,
    'remark': null
  }))
}

// 获取列表
export function list () {
  return {
    // isOpen: false,
    url: '/sys/projectMilepost/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': dataList
      }
    }
  }
}

// 获取信息
export function info () {
  return {
    // isOpen: false,
    url: '/sys/projectMilepost/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'projectMilepost': dataList[0]
    }
  }
}

// 添加用户
export function add () {
  return {
    // isOpen: false,
    url: '/sys/projectMilepost/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改用户
export function update () {
  return {
    // isOpen: false,
    url: '/sys/projectMilepost/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除用户
export function del () {
  return {
    // isOpen: false,
    url: '/sys/projectMilepost/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
