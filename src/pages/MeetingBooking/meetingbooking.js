import React from 'react';
import store from './store';
import {observer} from 'mobx-react';
import request from '../../helpers/request';
import { Switch, Calendar, DatePicker, List , Picker, WhiteSpace, InputItem, Card, WingBlank, Radio, Flex, Button, TextareaItem} from 'antd-mobile';
import moment from 'moment';

const meeting_counts = [
    {
      label: '202',
      value: '202',
    },
    {
      label: '203',
      value: '203',
    },
    {
      label: '多功能会议室',
      value: '多功能会议室',
    },
    {
      label: '一楼报告厅',
      value: '一楼报告厅',
    },
    {
      label: '二楼报告厅',
      value: '二楼报告厅',
    }
    
  ];
  const act_types = [
    {
      label: '会议',
      value: '会议',
    },
    {
      label: '培训',
      value: '培训',
    },{
      label: '集中办公',
      value: '集中办公',
    }
  ];


@observer
class MeetingBookingCom extends React.Component{
    componentDidMount(){
      // this.getUser();
    }
    handleData = (e) => {
     
      let {unit, time_begin, time_end,place,reason,purpose} = store;
    //   meals =  meals.replace(/[\r\n]/g, 'A');
      console.log(store);
      place = place.toString();
      purpose = purpose.toString()
      request({
        url:'/api/v1/meeting/place/save',
        method:'POST',
        data:{
          unit,
          time_begin:moment(time_begin).format('YYYY-MM-DD HH:mm'),
          time_end:moment(time_end).format('YYYY-MM-DD  HH:mm'),
          place,
          purpose,
          reason
     
        },
        beforeSend: (xml) => {
          xml.setRequestHeader('token',sessionStorage.getItem('token'))
        },
        success: (res) => {
          alert('提交成功')
          console.log(res);
        }
      })

    };
    

    render(){
        return(
            <div>
                <List className="calendar-list" style={{ backgroundColor: 'white' }}>
                <DatePicker
                  title="开始时间"
                  extra="Optional"
                  value={store.time_begin}
                  onChange={date => store.time_begin = date}
                  onOk={date => store.time_begin = date}
                >
                  <List.Item arrow="horizontal">开始时间</List.Item>
                </DatePicker>
                <DatePicker
                  title="结束时间"
                  extra="Optional"
                  value={store.time_end}
                  onChange={date => store.time_end = date}
                  onOk={date => store.time_end = date}
                >
                  <List.Item arrow="horizontal">结束时间</List.Item>
                </DatePicker>



                <InputItem
                  placeholder="请输入"
                  onChange={(e) => {store.unit = e}}
                >申请单位</InputItem>

                <Picker 
                  data={meeting_counts} 
                  cols={1} 
                  className="forss"
                  value={store.place}
                  onChange={(e) => {store.place = e}}
                  onOk={(e) => store.place = e}
                >
                  <List.Item arrow="horizontal">场地名称</List.Item>
                </Picker>

                <Picker 
                  data={act_types} 
                  cols={1} 
                  className="forss"
                  value={store.purpose}
                  onChange={(e) => {store.purpose = e}}
                  onOk={(e) => store.purpose = e}
                >
                  <List.Item arrow="horizontal">场地用途</List.Item>
                </Picker>



               

                <List renderHeader={() => '使用事由'}>
                    <TextareaItem
                        placeholder="请输入"
                        rows={5}
                        value={store.reason}
                        onChange={e => {store.reason = e}}
                    />
                </List>
              
                <WhiteSpace size="lg" />
                <Button style={{ position: 'fixed', width: '100%', bottom: 50 }} type="primary" onClick={this.handleData}>提交</Button>
                <WhiteSpace size="lg" />
               
                </List>
            
            </div>
        );
    }
}
console.log(store);
export default MeetingBookingCom;