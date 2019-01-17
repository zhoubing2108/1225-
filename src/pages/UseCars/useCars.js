import React from 'react';
import store from './store';
import {observer} from 'mobx-react';
import request from '../../helpers/request';
import { Switch, Calendar, DatePicker, List , Picker, WhiteSpace, InputItem, Card, WingBlank, Radio, Flex, Button, TextareaItem} from 'antd-mobile';
import { changeConfirmLocale } from 'antd/lib/modal/locale';
import moment from 'moment';
import getQueryVarible from '../../helpers/get-query-variable';

const act_types_first = [
    {
      label: '接待上级或兄弟市、区相关部门副处级以上领及随行人员',
      value: '接待上级或兄弟市、区相关部门副处级以上领及随行人员',
    },
    {
      label: '按规定携带机密级以上涉密载体因公出行',
      value: '按规定携带机密级以上涉密载体因公出行',
    },
    {
      label: '出行人数超过3人的',
      value: '出行人数超过3人的',
    }
]
const act_types_second = [
  {
    label: '区域内突发事件，到现场了解事件进展情况参与事件处理',
    value: '区域内突发事件，到现场了解事件进展情况参与事件处理',
  },
  {
    label: '处理我局范围内(江门地区）突发事件',
    value: '处理我局范围内(江门地区）突发事件',
  },
  {
    label: '参加市委、市政府组织的紧急公务活动',
    value: '参加市委、市政府组织的紧急公务活动',
  },
  {
    label: '其余紧急公务、突发事件等应急工作',
    value: '其余紧急公务、突发事件等应急工作',
  }
]
const act_types_third = [
  {
    label: '税务征收管理',
    value: '税务征收管理',
  },
  {
    label: '税务稽查',
    value: '税务稽查',
  },
  {
    label: '税收执法检查',
    value: '税收执法检查',
  },
  {
    label: '监察',
    value: '监察',
  }
]
const act_types_fourth = [
  {
    label: '机密级以上公文或涉密载体的传送或领取',
    value: '机密级以上公文或涉密载体的传送或领取',
  },
  {
    label: '上级部门限定时间的紧急公文的传送或领取',
    value: '上级部门限定时间的紧急公文的传送或领取',
  }
]
const act_types_fifth = [
  {
    label: '接待上级或兄弟市、区相关部门副处级以上领及随行人员',
    value: '接待上级或兄弟市、区相关部门副处级以上领及随行人员',
  },
  {
    label: '出行人数超过3人的',
    value: '出行人数超过3人的',
  }
]
const transport_types = [
    {
      label: '公务用车',
      value: '公务用车',
    }, 
    
    {
      label: '应急用车',
      value: '应急用车',
    }, 

    {
      label:'执法执勤用车',
      value:'执法执勤用车',
    },
    {
      label: '机要通信用车',
      value: '机要通信用车',
    },
      {
        label:'租赁社会化用车',
        value:'租赁社会化用车',
      }
];
@observer
class UseCarsCom extends React.Component{
    componentDidMount(){
      // this.getUser();
    }
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
          // transport_type,
          // act_type_fifth,
          // act_type_second,
          // act_type_third,
          // act_type_fourth,
          // act_type_fifth
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
    
    onClick = () => {
      //点击就直接帮忙他的值，不需要等待，响应的是定义好的初始值
      //点击确定拿到单个对应值
      store.prespace_type = act_types;
      console.log('初始响应的',store.prespace_type);
      store.cols = 1;
    };

    render(){
        return(
            <div>
                <List className="calendar-list" style={{ backgroundColor: 'white' }}>
                
                <DatePicker
                  value={store.apply_date}
                  onChange={date => store.apply_date = date}
                >
                  <List.Item arrow="horizontal">用车时间</List.Item>
                </DatePicker>

                <Flex style={{ padding: '15px' }}>
                    <Flex.Item>
                        <InputItem
                        placeholder="请输入"
                        onChange={(e) => {store.phone = e}}
                        >电话:</InputItem>
                    </Flex.Item>

                    <Flex.Item>
                        <InputItem
                        placeholder="请输入"
                        onChange={(e) => {store.count = e}}
                        >人数：</InputItem>
                    </Flex.Item>
                </Flex>

                 <InputItem
                  placeholder="请输入"
                  onChange={(e) => {store.address = e}}
                >目的地:</InputItem>
                 <InputItem
                  placeholder="请输入"
                  onChange={(e) => {store.members = e}}
                >出行人员:</InputItem>

                {/* <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Card>
                      <Card.Body>
                      <Picker 
                      data={act_types} 
                      cols={1} 
                      className="forss"
                      value={store.act_type}
                      onChange={(e) => {store.act_type = e}}
                      onOk={(e) => store.act_type = e}
                      >
                      <List.Item arrow="horizontal">事由类型</List.Item>
                      </Picker>
                      </Card.Body>
                      <Card.Body >
                        {transport_types.map((i) => (
                          <Flex.Item key={i.value}>
                          <Radio className='my-radio' checked={store.transport_type === i.value} onChange={(e) => {store.transport_type = i.value}}>{i.label}</Radio>
                          <WhiteSpace size="lg" />
                          </Flex.Item> 
                        ))}
                      </Card.Body>
                    </Card>
                    <WhiteSpace size="lg" />
                </WingBlank> */}

                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Card>
                      <Card.Body>
                      <div style={{float:"left",width:"30%"}}>
                        {/* <WhiteSpace size="sm" /> */}
                        <div style={{height:'6px'}}></div>

                        {transport_types.map((i) => (
                          <Flex.Item key={i.value}>
                          {/* <WhiteSpace size="sm" /> */}
                          <div style={{height:'11px'}}></div>
                          <Radio className='my-radio' checked={store.transport_type === i.value} onChange={(e) => {store.transport_type = i.value}}>{i.label}</Radio>
                          <WhiteSpace size="lg" />
                          </Flex.Item> 
                        ))}
                      </div>

                      <div style={{float:"right",width:"70%"}}>
                      <Picker 
                      data={act_types_first} 
                      cols={1} 
                      // className="forss"
                      value={store.act_type_first}
                      onChange={(e) => {store.act_type_first = e}}
                      onOk={(e) => store.act_type_first = e}
                      >
                      <List.Item arrow="horizontal"> 理由：</List.Item>
                      </Picker>
                      <Picker 
                      data={act_types_second} 
                      cols={1} 
                      // className="forss"
                      value={store.act_type_second}
                      onChange={(e) => {store.act_type_second = e}}
                      onOk={(e) => store.act_type_second = e}
                      >
                      <List.Item arrow="horizontal"> 理由：</List.Item>
                      </Picker>
                      <Picker 
                      data={act_types_third} 
                      cols={1} 
                      // className="forss"
                      value={store.act_type_third}
                      onChange={(e) => {store.act_type_third = e}}
                      onOk={(e) => store.act_type_third = e}
                      >
                      <List.Item arrow="horizontal"> 理由：</List.Item>
                      </Picker>
                      <Picker 
                      data={act_types_fourth} 
                      cols={1} 
                      // className="forss"
                      value={store.act_type_fourth}
                      onChange={(e) => {store.act_type_fourth = e}}
                      onOk={(e) => store.act_type_fourth = e}
                      >
                      <List.Item arrow="horizontal"> 理由：</List.Item>
                      </Picker>
                      <Picker 
                      data={act_types_fifth} 
                      cols={1} 
                      // className="forss"
                      value={store.act_type_fifth}
                      onChange={(e) => {store.act_type_fifth = e}}
                      onOk={(e) => store.act_type_fifth = e}
                      >
                      <List.Item arrow="horizontal"> 理由：</List.Item>
                      </Picker>
                      </div>
                      </Card.Body>

                      
                    </Card>
                    <WhiteSpace size="lg" />
                </WingBlank>


             
                <WhiteSpace size="lg" />
                <Button style={{ position: 'fixed', width: '100%', bottom: 50 }} type="primary" onClick={this.handleData}>提交</Button>
                <WhiteSpace size="lg" />
               
                </List>
              
            </div>
        );
    }
}
export default UseCarsCom;