Page({
  data: {
  listData:[
  // {"code":"仪器名称","text":"分度值","type":"仪器误差"},
  {"code":"钢直尺","text":"1mm","type":"±0.1mm"},
  {"code":"钢卷尺","text":"1mm","type":"±0.5mm"},
  {"code":"游标卡尺","text":"0.02mm,0.05mm,0.1mm","type":"分度值"},
  {"code":"螺旋测微器(一级)","text":"0.01mm","type":"±0.004mm"},
  {"code":"TW-1物理天平","text":"100mg","type":"±50mg"},
  {"code":"WL-1物理天平","text":"50mg","type":"±50mg"},
  {"code":"TG928A矿山天平","text":"10mg","type":"±5mg"},
  {"code":"水银温度计","text":"0.2℃ 0.1℃","type":"分度值"},
  {"code":"读数显微镜","text":"0.01mm","type":"0.004mm"},
  {"code":"数字式测量仪器","text":"--","type":"最末一位或按仪器说明估计"},
  {"code":"指针式电表","text":"a=0.1,0.2,0.5,1.0,1.5,2.5,5.0","type":"量程xa%"},
  ],
  //所有公式
  content_describe:[{
    "name":"平均值","img":"./images/mean.png"
  },{
    "name":"a类不确定度","img":"./images/ua.png"
  },{
    "name":"总不确定度","img":"./images/u_all.png"
  },{
    "name":"相对不确定度","img":"./images/ur.png"
  }],
  //参考文献
  reference:[
    "[1]中华人民共和国国家标准测量不确定度测量不确定度表示指南",
    "[2]大学物理"
  ]
  // ["./images/mean.png","","","./images/ua.png","./images/u_all.png"]
  // ["平均值","标准偏差","算术平均标准偏差","a类不确定度","总不确定度"]
  },  
  onLoad: function () {
  console.log('onLoad') 
  }
  
 })