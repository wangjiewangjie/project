const state = {
  reservationService: {
    // 1、一周一次 2、一周多次 3、两周一次
    frequency: 1,
    orderInfo: {},
  },
  // 服务日期相关数据
  serviceDateForReservationService: {
    range: [
      { key: 1, week: '周一', time: '' },
      { key: 2, week: '周二', time: '' },
      { key: 3, week: '周三', time: '' },
      { key: 4, week: '周四', time: '' },
      { key: 5, week: '周五', time: '' },
      { key: 6, week: '周六', time: '' },
      { key: 0, week: '周日', time: '' },
    ],
    currentActiveList: [1],
    lenLimit: 1,
  },
  // 服务时间相关数据
  serviceTimeForReservationService: {
    time: [
      '8:00',
      '8:30',
      '9:00',
      '9:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
    ],
    currentActive: null,
  },
  // 日历相关数据
  calender: {},
};

const getters = {
  // 选择了的日期，根据辅助队列获取真是的数据列表
  selectedDateList: (_state) => {
    return _state.serviceDateForReservationService.range.filter((x) => {
      return _state.serviceDateForReservationService.currentActiveList.includes(x.key);
    });
  },
};

const mutations = {
  /**
   * 修改基本包裹组件数据
   */
  updateReservationServiceState(_state, data) {
    _state.reservationService = {
      ..._state.reservationService,
      ...data,
    };
  },
  /**
   * 修改服务日期相关数据
   */
  updateServiceDateForReservationServiceState(_state, data) {
    _state.serviceDateForReservationService = {
      ..._state.serviceDateForReservationService,
      ...data,
    };
  },
  /**
   * 修改服务时间相关数据
   */
  updateServiceTimeForReservationServiceState(_state, data) {
    _state.serviceTimeForReservationService = {
      ..._state.serviceTimeForReservationService,
      ...data,
    };
  },
};

export default {
  state,
  getters,
  mutations,
};
