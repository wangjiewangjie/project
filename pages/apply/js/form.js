export default {
  formList: [
    {
      label: '姓名',
      prop: 'name',
      required: true,
      placeholder: '请输入姓名',
      type: '',
      selectList: [],
      value: '',
    },
    {
      label: '文化程度',
      prop: 'education',
      required: true,
      placeholder: '请选择',
      type: 'select',
      selectList: [
        {
          value: '0',
          label: '未知',
        },
        {
          value: '1',
          label: '小学',
        },
        {
          value: '2',
          label: '初中',
        },
        {
          value: '3',
          label: '高中',
        },
        {
          value: '4',
          label: '中专',
        },
        {
          value: '5',
          label: '技校',
        },
        {
          value: '6',
          label: '职高',
        },
        {
          value: '7',
          label: '大专',
        },
        {
          value: '8',
          label: '大学',
        },
        {
          value: '9',
          label: '硕士',
        },
        {
          value: '10',
          label: '博士',
        },
      ],
      value: '',
    },
    {
      label: '考生来源',
      prop: 'studentSource',
      required: true,
      placeholder: '请选择',
      type: 'select',
      selectList: [
        {
          value: '1',
          label: '国有企业集体企业',
        },
        {
          value: '2',
          label: '私营企业',
        },
        {
          value: '3',
          label: '个体外企',
        },
        {
          value: '4',
          label: '外商投资',
        },
        {
          value: '5',
          label: '港澳台商投资',
        },
        {
          value: '6',
          label: '职业高中',
        },
        {
          value: '7',
          label: '普通技工学校',
        },
        {
          value: '8',
          label: '高级技工学校',
        },
        {
          value: '9',
          label: '技师学院',
        },
        {
          value: '10',
          label: '职业技术学院',
        },
        {
          value: '11',
          label: '普通中专',
        },
        {
          value: '12',
          label: '普通高中',
        },
        {
          value: '13',
          label: '普通大专',
        },
        {
          value: '14',
          label: '普通大学',
        },
        {
          value: '15',
          label: '研究生院',
        },
        {
          value: '16',
          label: '下岗失业人员',
        },
        {
          value: '17',
          label: '现役军人',
        },
        {
          value: '18',
          label: '农民工',
        },
        {
          value: '19',
          label: '劳改劳教人员',
        },
        {
          value: '20',
          label: '机关事业单位',
        },
        {
          value: '21',
          label: '其他人员',
        },
      ],
      value: '',
    },
    {
      label: '证书领取',
      prop: 'certificateReceive',
      required: true,
      placeholder: '请输入',
      type: '',
      selectList: [],
      value: '',
    },
    {
      label: '职业名称',
      prop: 'professional',
      required: true,
      placeholder: '请输入',
      type: '',
      selectList: [],
      value: '',
    },
    {
      label: '所在单位',
      prop: 'companyName',
      required: true,
      placeholder: '请输入',
      type: '',
      selectList: [],
      value: '',
    },
    {
      label: '省份',
      prop: 'province',
      required: true,
      placeholder: '请选择',
      type: 'select',
      selectList: [],
      value: '',
    },
    {
      label: '城市',
      prop: 'city',
      required: true,
      placeholder: '请选择',
      type: 'select',
      selectList: [],
      value: '',
    },
  ],

  hideformList: [
    {
      label: '工种名称',
      prop: 'certName',
      required: false,
      placeholder: '请输入',
      type: '',
      selectList: [],
      value: '',
    },
    {
      label: '参加工作时间',
      prop: 'workStartTime',
      required: false,
      placeholder: '请输入',
      type: 'number',
      selectList: [],
      value: '',
    },
    {
      label: '从事专业',
      prop: 'workMajor',
      required: false,
      placeholder: '请输入',
      type: '',
      selectList: [],
      value: '',
    },
    {
      label: '专业年限',
      prop: 'workingLife',
      required: false,
      placeholder: '请输入',
      type: 'number',
      selectList: [],
      value: '',
    },
    {
      label: '民族',
      prop: 'nation',
      required: false,
      placeholder: '请输入',
      type: '',
      selectList: [],
      value: '',
    },
    {
      label: '政治面貌',
      prop: 'politicalLandscape',
      required: false,
      placeholder: '请输入',
      type: '',
      selectList: [],
      value: '',
    },
    {
      label: '简要经历',
      prop: 'simpleExperience',
      required: false,
      placeholder: '请输入',
      type: '',
      selectList: [],
      value: '',
    },
    {
      label: '邮政编码',
      prop: 'postalCode',
      required: false,
      placeholder: '请输入',
      type: 'number',
      selectList: [],
      value: '',
    },
    {
      label: '通讯地址',
      prop: 'address',
      required: false,
      placeholder: '请输入',
      type: '',
      selectList: [],
      value: '',
    },
    {
      label: '邮寄地址',
      prop: 'mailAddress',
      required: false,
      placeholder: '请输入',
      type: '',
      selectList: [],
      value: '',
    },
    {
      label: '邮箱',
      prop: 'mail',
      required: false,
      placeholder: '请输入',
      type: '',
      selectList: [],
      value: '',
    },
    {
      label: '户籍所在地',
      prop: 'permanentaddress',
      required: false,
      placeholder: '请输入',
      type: '',
      selectList: [],
      value: '',
    },
    {
      label: '原证书职业',
      prop: 'originalProfessionName',
      required: false,
      placeholder: '请输入',
      type: '',
      selectList: [],
      value: '',
    },
    {
      label: '原证书等级',
      prop: 'originalLevel',
      required: false,
      placeholder: '请输入',
      type: 'select',
      selectList: [
        {
          value: '1',
          label: '一级',
        },
        {
          value: '2',
          label: '二级',
        },
        {
          value: '3',
          label: '三级',
        },
        {
          value: '4',
          label: '四级',
        },
        {
          value: '5',
          label: '五级',
        },
        {
          value: '6',
          label: '初级',
        },
        {
          value: '7',
          label: '中级',
        },
        {
          value: '8',
          label: '高级',
        },
      ],
      value: '',
    },
    {
      label: '原证书编号',
      prop: 'originalCertificateId',
      required: false,
      placeholder: '请输入',
      type: '',
      selectList: [],
      value: '',
    },
  ],

  studentSourceList: [
    {
      value: '1',
      label: '国有企业集体企业',
    },
    {
      value: '2',
      label: '私营企业',
    },
    {
      value: '3',
      label: '个体外企',
    },
    {
      value: '4',
      label: '外商投资',
    },
    {
      value: '5',
      label: '港澳台商投资',
    },
    {
      value: '6',
      label: '职业高中',
    },
    {
      value: '7',
      label: '普通技工学校',
    },
    {
      value: '8',
      label: '高级技工学校',
    },
    {
      value: '9',
      label: '技师学院',
    },
    {
      value: '10',
      label: '职业技术学院',
    },
    {
      value: '11',
      label: '普通中专',
    },
    {
      value: '12',
      label: '普通高中',
    },
    {
      value: '13',
      label: '普通大专',
    },
    {
      value: '14',
      label: '普通大学',
    },
    {
      value: '15',
      label: '研究生院',
    },
    {
      value: '16',
      label: '下岗失业人员',
    },
    {
      value: '17',
      label: '现役军人',
    },
    {
      value: '18',
      label: '农民工',
    },
    {
      value: '19',
      label: '劳改劳教人员',
    },
    {
      value: '20',
      label: '机关事业单位',
    },
    {
      value: '21',
      label: '其他人员',
    },
  ],
  educationList: [
    {
      value: '0',
      label: '未知',
    },
    {
      value: '1',
      label: '小学',
    },
    {
      value: '2',
      label: '初中',
    },
    {
      value: '3',
      label: '高中',
    },
    {
      value: '4',
      label: '中专',
    },
    {
      value: '5',
      label: '技校',
    },
    {
      value: '6',
      label: '职高',
    },
    {
      value: '7',
      label: '大专',
    },
    {
      value: '8',
      label: '大学',
    },
    {
      value: '9',
      label: '硕士',
    },
    {
      value: '10',
      label: '博士',
    },
  ],
  originalLevel: [
    {
      value: '1',
      label: '一级',
    },
    {
      value: '2',
      label: '二级',
    },
    {
      value: '3',
      label: '三级',
    },
    {
      value: '4',
      label: '四级',
    },
    {
      value: '5',
      label: '五级',
    },
    {
      value: '6',
      label: '初级',
    },
    {
      value: '7',
      label: '中级',
    },
    {
      value: '8',
      label: '高级',
    },
  ],
};
