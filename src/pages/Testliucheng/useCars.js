import React from 'react';
import store from './store';
import {observer} from 'mobx-react';
import request from '../../helpers/request';
import { Modal,Switch, Calendar, DatePicker, List , Picker, WhiteSpace, InputItem, Card, WingBlank, Radio, Flex, Button, TextareaItem} from 'antd-mobile';
import { changeConfirmLocale } from 'antd/lib/modal/locale';
import moment from 'moment';
import getQueryVarible from '../../helpers/get-query-variable';
const operation = Modal.operation;
const prompt = Modal.prompt;
const alert = Modal.alert;
import { Upload,Icon,} from 'antd';
// import UseCarsComSec from './checkboxsec' ;

const transport_types = [
  {
    label: '电工',
    value: '电工',
  }, 
  {
    label: '电器维修',
    value: '电器维修',
  }, 
  {
    label: '家具维修',
    value: '家具维修',
  }, 
  {
    label: '门窗五金',
    value: '门窗五金',
  },
  {
    label: '电子设备',
    value: '电子设备',
  }, 
  {
    label: '不通过',
    value: '不通过',
  },    
];
const car_types = [
  {
    label: '粤J00000、限载5人',
    value: '粤J00000、限载5人',
  },
  {
    label: '租车待定',
    value: '',
  },
]
const driver_types = [
  {
    label:'小张13712123333',
    value:'小张13712123333',
  },
  {
    label:'租车待定',
    value:'',
  }
]
// const Mycheckbox = () => (
//     <div>
//         {transport_types.map((i) => (
//           <Flex.Item key={i.value}>
//           {/* <WhiteSpace size="sm" /> */}
//           <div style={{height:'11px'}}></div>
//           <Radio className='my-radio' checked={store.transport_type === i.value} onChange={(e) => {store.transport_type = i.value}}>{i.label}</Radio>
//           <WhiteSpace size="lg" />
//           </Flex.Item> 
//         ))}
//     </div>
// );

// const act_types_first = [
//     {
//       label: '接待上级或兄弟市、区相关部门副处级以上领及随行人员',
//       value: '接待上级或兄弟市、区相关部门副处级以上领及随行人员',
//     },
//     {
//       label: '按规定携带机密级以上涉密载体因公出行',
//       value: '按规定携带机密级以上涉密载体因公出行',
//     },
//     {
//       label: '出行人数超过3人的',
//       value: '出行人数超过3人的',
//     }
// ]
// const act_types_second = [
//   {
//     label: '区域内突发事件，到现场了解事件进展情况参与事件处理',
//     value: '区域内突发事件，到现场了解事件进展情况参与事件处理',
//   },
//   {
//     label: '处理我局范围内(江门地区）突发事件',
//     value: '处理我局范围内(江门地区）突发事件',
//   },
//   {
//     label: '参加市委、市政府组织的紧急公务活动',
//     value: '参加市委、市政府组织的紧急公务活动',
//   },
//   {
//     label: '其余紧急公务、突发事件等应急工作',
//     value: '其余紧急公务、突发事件等应急工作',
//   }
// ]
// const act_types_third = [
//   {
//     label: '税务征收管理',
//     value: '税务征收管理',
//   },
//   {
//     label: '税务稽查',
//     value: '税务稽查',
//   },
//   {
//     label: '税收执法检查',
//     value: '税收执法检查',
//   },
//   {
//     label: '监察',
//     value: '监察',
//   }
// ]
// const act_types_fourth = [
//   {
//     label: '机密级以上公文或涉密载体的传送或领取',
//     value: '机密级以上公文或涉密载体的传送或领取',
//   },
//   {
//     label: '上级部门限定时间的紧急公文的传送或领取',
//     value: '上级部门限定时间的紧急公文的传送或领取',
//   }
// ]
// const act_types_fifth = [
//   {
//     label: '接待上级或兄弟市、区相关部门副处级以上领及随行人员',
//     value: '接待上级或兄弟市、区相关部门副处级以上领及随行人员',
//   },
//   {
//     label: '出行人数超过3人的',
//     value: '出行人数超过3人的',
//   }
// ]
// const transport_types = [
//     {
//       label: '公务用车',
//       value: '公务用车',
//     }, 
    
//     {
//       label: '应急用车',
//       value: '应急用车',
//     }, 

//     {
//       label:'执法执勤用车',
//       value:'执法执勤用车',
//     },
//     {
//       label: '机要通信用车',
//       value: '机要通信用车',
//     },
//       {
//         label:'租赁社会化用车',
//         value:'租赁社会化用车',
//       }
// ];

@observer
class UseCarsCom extends React.Component{
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

handleCancel = () => this.setState({ previewVisible: false })

handlePreview = (file) => {
    this.setState({
    previewImage: file.url || file.thumbUrl,
    previewVisible: true,
    });
}

handleChange = ({ fileList }) => {console.log(fileList);this.setState({ fileList })}
 
    handleData = (e) => {
      console.log(store);
      let {reason, count, apply_date,address,members,transport_type, act_type_first,act_type_second,act_type_third,act_type_fourth,act_type_fifth} = store;
      apply_date = moment(apply_date).format('YYYY-MM-DD HH:mm');
      count = parseInt(count);
      act_type_first = act_type_first.toString();
      act_type_second = act_type_second.toString();
      act_type_third = act_type_third.toString();
      act_type_fourth = act_type_fourth.toString();
      act_type_fifth = act_type_fifth.toString();
      if (transport_type == '公务用车') {
        reason = transport_type + ' ' + act_type_first
      }else if(transport_type == '应急用车') {
        reason = transport_type + ' ' + act_type_second
      }else if(transport_type == '执法执勤用车') {
        reason = transport_type + ' ' + act_type_third
      }else if(transport_type == '机要通信用车') {
        reason = transport_type + ' ' + act_type_fourth
      }else if(transport_type == '租赁社会化用车') {
        reason = transport_type + ' ' + act_type_fifth
      }else{

      }
      request({
        url:'/api/v1/car/save',
        method:'POST',
        data:{
          apply_date,
          address,
          members,
          count,
          reason,
        },
        beforeSend: (xml) => {
          xml.setRequestHeader('token',sessionStorage.getItem('token'))
        },
        success: (res) => {
          alert('提交成功');
          console.log(res);
        }
      })

    };
   
    
    

    render(){
        let testrole = 37;
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
        );
        
        return(
            <div>
              <span>test</span>
              {testrole !=37 && testrole !=34 ? 
                  <div>
                    <span style={{ margin: '5px 10px 0 0' }}>
                      <Button type='primary' size='small' style={{ display: 'inline-block', height: 24, lineHeight: '24px', margin: '5px 10px 0 0' }} 
                      onClick={() => {
                        operation([
                          { text: '通过', onPress: () => 
                            prompt('defaultValue', '通过，理由可不填', [
                              { text: '取消' },
                              { text: '提交', onPress: value => {store.check_con = value;this.getCheck(e,'ok')} },
                            ],'default', '同意')
                        },
                          { text: '不通过', onPress: () => 
                            prompt('defaultValue', '不通过，说明理由', [
                              { text: '取消' },
                              { text: '提交', onPress: value => {store.check_con = value;this.getCheck(e,'back')} },
                            ],'default', '不同意')
                        },
                        ])
                      
                      }
                      
                        }>审核</Button>
                    </span>
                  </div>
                : null}

                {testrole ==34 ? 
                  <div>
                    <span style={{ margin: '5px 10px 0 0' }}>
                      <Button type='primary' size='small' style={{ display: 'inline-block', height: 24, lineHeight: '24px', margin: '5px 10px 0 0' }} 
                      onClick={() => {
                        operation([
                          { text: '安排定向化保证车辆', onPress: () => 
                          alert('您的意见', '安排定向化保证车辆', [
                            { text: '取消', onPress: () => console.log('cancel') },
                            { text: '提交', onPress: () => {store.check_con = '安排定向化保证车辆';this.getCheck(e,'ok')} },
                          ])
                        },
                          { text: '租赁社会化车辆', onPress: () => 
                          alert('您的意见', '租赁社会化车辆', [
                            { text: '取消', onPress: () => console.log('cancel') },
                            { text: '提交', onPress: () => {store.check_con = '租赁社会化车辆';this.getCheck(e,'ok')} },
                          ])
                        },{ text: '不符合申请条件', onPress: () => 
                        alert('您的意见', '不符合申请条件', [
                          { text: '取消', onPress: () => console.log('cancel') },
                          { text: '提交', onPress: () => {store.check_con = '不符合申请条件';this.getCheck(e,'back')} },
                        ])
                        },
                        ])
                      
                      }
                      
                        }>审核</Button>
                    </span>
                  </div> 
                :null}
               
                {/* {testrole ==37 ? 
                  <div>
                    <Button type='primary' size='small' style={{ display: 'inline-block', height: 24, lineHeight: '24px', margin: '5px 10px 0 0' }}
                      onClick={() => {store.myvisiable = true}}
                    >审核</Button>
                  </div> 
                : null}

        <WhiteSpace />
        <Modal
          visible={store.myvisiable}
          transparent
          maskClosable={false}
          title="您的审核意见"
          footer={[{ text: '取消', onPress: () => { store.myvisiable = false  } },
          { text: '提交', onPress: () => { store.check_con = store.transport_type + store.car_type.toString() + store.driver.toString() + store.detail;console.log(store.check_con);this.getCheck(e,'ok') } }
        
        ]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: 200, overflow: 'scroll'}}>
            {transport_types.map((i) => (
            <Flex.Item key={i.value}  style={{textAlign:'center'}}>
            <div style={{height:'11px'}}></div>            
            <Radio className='my-radio' checked={store.transport_type === i.value} onChange={(e) => {store.transport_type = i.value}}>{i.label}</Radio>
            <WhiteSpace size="lg" />
            </Flex.Item> 
         ))}
          <Picker 
            data={car_types} 
            cols={1} 
            className="forss"
            value={store.car_type}
            onChange={(e) => {store.car_type = e}}
            onOk={(e) => store.car_type = e}
          >
            <List.Item arrow="horizontal">车辆：</List.Item>
          </Picker>
          <Picker 
            data={driver_types} 
            cols={1} 
            className="forss"
            value={store.driver}
            onChange={(e) => {store.driver = e}}
            onOk={(e) => store.driver = e}
          >
            <List.Item arrow="horizontal">司机：</List.Item>
          </Picker>
          <List>
            <TextareaItem
              placeholder="备注"
              rows={2}
              value={store.detail}
              onChange={e => {store.detail = e}}
            />
          </List>
          </div>
        </Modal> */}

        {testrole ==37 ? 
                  <div>
                    <Button type='primary' size='small' style={{ display: 'inline-block', height: 24, lineHeight: '24px', margin: '5px 10px 0 0' }}
                      onClick={() => {store.myVisiableStep = true}}
                    >审核</Button>
                  </div> 
                : null}

        <WhiteSpace />
        <Modal
          visible={store.myVisiableStep}
          transparent
          maskClosable={false}
          // onClose={this.onClose('modal1')}
          title="您的审核意见"
          footer={[{ text: '取消', onPress: () => { store.myvisiable = false  } },
          { text: '提交', onPress: () => { store.check_con = store.transport_type + store.car_type.toString() + store.driver.toString() + store.detail;console.log(store.check_con);this.getCheck(e,'ok') } }
        
        ]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          // afterClose={() => { alert('afterClose'); }}
        >
          <div style={{ height: 200, overflow: 'scroll'}}>
          
          
          <span>物品名称：{}</span><br />
          <span>具体门牌位置：{}</span><br />

          <List>
            <TextareaItem
              placeholder="反馈说明"
              rows={2}
              value={store.detail}
              onChange={e => {store.detail = e}}
            />
          </List>

                    <Upload
                        action="/api/v1/image/upload"
                        listType="text"
                        fileList={fileList}
                        // showUploadList={false}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        >
                        {fileList.length >= 3 ? null : uploadButton}
                    </Upload>

                    {/* <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '50%'}} src={previewImage} />
                    </Modal> */}



          </div>
        </Modal>


                
            {/* {mycheckbox} */}
            {/* <Mycheckbox /> */}
            {/* <UseCarsComSec /> */}
           

            </div>
            // <div>
            //     <List className="calendar-list" style={{ backgroundColor: 'white' }}>
                
            //     <DatePicker
            //       value={store.apply_date}
            //       onChange={date => store.apply_date = date}
            //     >
            //       <List.Item arrow="horizontal">用车时间</List.Item>
            //     </DatePicker>

            //     <Flex style={{ padding: '15px' }}>
            //         <Flex.Item>
            //             <InputItem
            //             placeholder="请输入"
            //             onChange={(e) => {store.phone = e}}
            //             >电话:</InputItem>
            //         </Flex.Item>

            //         <Flex.Item>
            //             <InputItem
            //             placeholder="请输入"
            //             onChange={(e) => {store.count = e}}
            //             >人数：</InputItem>
            //         </Flex.Item>
            //     </Flex>

            //      <InputItem
            //       placeholder="请输入"
            //       onChange={(e) => {store.address = e}}
            //     >目的地:</InputItem>
            //      <InputItem
            //       placeholder="请输入"
            //       onChange={(e) => {store.members = e}}
            //     >出行人员:</InputItem>

             

            //     <WingBlank size="lg">
            //         <WhiteSpace size="lg" />
            //         <Card>
            //           <Card.Body>
            //           <div style={{float:"left",width:"30%"}}>
            //             {/* <WhiteSpace size="sm" /> */}
            //             <div style={{height:'6px'}}></div>

            //             {transport_types.map((i) => (
            //               <Flex.Item key={i.value}>
            //               {/* <WhiteSpace size="sm" /> */}
            //               <div style={{height:'11px'}}></div>
            //               <Radio className='my-radio' checked={store.transport_type === i.value} onChange={(e) => {store.transport_type = i.value}}>{i.label}</Radio>
            //               <WhiteSpace size="lg" />
            //               </Flex.Item> 
            //             ))}
            //           </div>

            //           <div style={{float:"right",width:"70%"}}>
            //           <Picker 
            //           data={act_types_first} 
            //           cols={1} 
            //           // className="forss"
            //           value={store.act_type_first}
            //           onChange={(e) => {store.act_type_first = e}}
            //           onOk={(e) => store.act_type_first = e}
            //           >
            //           <List.Item arrow="horizontal"> 理由：</List.Item>
            //           </Picker>
            //           <Picker 
            //           data={act_types_second} 
            //           cols={1} 
            //           // className="forss"
            //           value={store.act_type_second}
            //           onChange={(e) => {store.act_type_second = e}}
            //           onOk={(e) => store.act_type_second = e}
            //           >
            //           <List.Item arrow="horizontal"> 理由：</List.Item>
            //           </Picker>
            //           <Picker 
            //           data={act_types_third} 
            //           cols={1} 
            //           // className="forss"
            //           value={store.act_type_third}
            //           onChange={(e) => {store.act_type_third = e}}
            //           onOk={(e) => store.act_type_third = e}
            //           >
            //           <List.Item arrow="horizontal"> 理由：</List.Item>
            //           </Picker>
            //           <Picker 
            //           data={act_types_fourth} 
            //           cols={1} 
            //           // className="forss"
            //           value={store.act_type_fourth}
            //           onChange={(e) => {store.act_type_fourth = e}}
            //           onOk={(e) => store.act_type_fourth = e}
            //           >
            //           <List.Item arrow="horizontal"> 理由：</List.Item>
            //           </Picker>
            //           <Picker 
            //           data={act_types_fifth} 
            //           cols={1} 
            //           // className="forss"
            //           value={store.act_type_fifth}
            //           onChange={(e) => {store.act_type_fifth = e}}
            //           onOk={(e) => store.act_type_fifth = e}
            //           >
            //           <List.Item arrow="horizontal"> 理由：</List.Item>
            //           </Picker>
            //           </div>
            //           </Card.Body>

                      
            //         </Card>
            //         <WhiteSpace size="lg" />
            //     </WingBlank>


             
            //     <WhiteSpace size="lg" />
            //     <Button style={{ position: 'fixed', width: '100%', bottom: 50 }} type="primary" onClick={this.handleData}>提交</Button>
            //     <WhiteSpace size="lg" />
               
            //     </List>
              
            // </div>
        );
    }
    getCheck = (e, type) => {
      // console.log('e有什么',e.from_id);
      // console.log('type有什么',type)
      // e.from_id,取自列表中map每一项的标识信息，记录当时第几条
      //type是‘ok’，‘back’， ‘cancel’
      request({
        url: '/api/v1/flow/info',
        method: 'GET',
        data: {
          wf_fid: e.from_id,
          wf_type: 'car_t'
        },
        beforeSend: (xml) => {
          xml.setRequestHeader('token', sessionStorage.getItem('token'))
        },
        success: (res) => {
          store.info = res.info;
          this.pass(e.from_id, type);
        },
      })
    }
    pass = (id, type) => {
      let { info, check_con } = store;
      let { flow_id, run_id, flow_process, run_process, nexprocess } = info;
      request({
        url: '/api/v1/flow/check/pass',
        // 统一由pass接口来处理，意见
        method: 'POST',
        data: {
          flow_id,
          run_id,
          flow_process,
          run_process,
          npid: nexprocess.id,
          wf_fid: id,

          check_con,
          submit_to_save: type,
          wf_type: 'car_t'
        },
        beforeSend: (xml) => {
          xml.setRequestHeader('token', sessionStorage.getItem('token'))
        },
        success: () => {
          store.myvisiable = false;
          store.myVisiableStep = false;
          alert('操作成功');
          this.getNeedList();
          this.fetchList(1);
        }
      })
    }
}
export default UseCarsCom;