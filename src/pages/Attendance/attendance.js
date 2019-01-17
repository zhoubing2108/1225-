import React ,{Component} from 'react';
import {observer} from 'mobx-react';
import store from './store';
import moment from 'moment';
import style from './attendance.css';
import request from '../../helpers/request';
import { Switch, Calendar, DatePicker, List , Picker, WhiteSpace, InputItem, Card, WingBlank, Radio, Flex, Button, TextareaItem} from 'antd-mobile';

@observer
 class Attendance extends Component{
    getList = ( ) => {
        let {theme, address, time_begin, time_end}  = store;
        time_begin = moment(time_begin).format('YYYY-MM-DD HH:mm');
        time_end = moment(time_end).format('YYYY-MM-DD HH:mm');
        request({
            url:'/api/v1/meeting/sign/in/list/wx',
            method:'GET',
            data:{
              theme,
              address,
              time_begin,
              time_end,
              size:10,
              page:1,
              department:'全部',
              username:'全部',
            },
            beforeSend: (xml) => {
              xml.setRequestHeader('token',sessionStorage.getItem('token'))
            },
            success: (res) => {
                store.dataSource = res.data;
                store.total = res.last_page;
                console.log(res);
            }

        })

    }
     render(){
         return(
         <div>
             <List className="calendar-list" style={{ backgroundColor: 'white' }}>

                <InputItem
                  placeholder="请输入"
                  onChange={(e) => {store.theme = e}}
                >主题</InputItem>
                <InputItem
                  placeholder="请输入"
                  onChange={(e) => {store.address = e}}
                >地点</InputItem>
                <DatePicker
                  value={store.time_begin}
                  onChange={date => store.time_begin = date}
                >
                  <List.Item arrow="horizontal">开始时间</List.Item>
                </DatePicker>
                <DatePicker
                  value={store.time_end}
                  onChange={date => store.time_end = date}
                >
                  <List.Item arrow="horizontal">结束时间</List.Item>
                </DatePicker>

                <WhiteSpace size="lg" />
                    <Button style={{ width: '100%' }} type="primary" onClick={this.getList}>查询</Button>
                <WhiteSpace size="lg" />
                <div>
                      <span>
                        <table style={{alignItems:'center',padding:'10px'}}>
                          <tbody>
                                <div>
                                  <tr >
                                      <Flex>
                                    <Flex.Item><td style={{textAlign:'center',}}>日期</td></Flex.Item>
                                    <Flex.Item><td style={{textAlign:'center',}}>会议主题</td></Flex.Item>
                                    <Flex.Item><td style={{textAlign:'center',}}>签到时间</td></Flex.Item>
                                    <Flex.Item><td style={{textAlign:'center',}}>签到开始</td></Flex.Item> 
                                    <Flex.Item><td style={{textAlign:'center',}}>签到截止</td></Flex.Item>
                                    <Flex.Item><td style={{textAlign:'center',}}>会议开始</td></Flex.Item>
                                    </Flex>
                                  </tr>
                                  <tr >
                                      {store.dataSource.map((key,index) => {
                                          return(
                                            <span key={index} style={{padding:'5px 10px'}}> 
                                            <Flex>
                                            <Flex.Item><td style={{textAlign:'center'}}>{key.meeting_date}</td></Flex.Item>
                                            <Flex.Item><td style={{textAlign:'center'}}>{key.theme}</td></Flex.Item>
                                            <Flex.Item><td style={{textAlign:'center'}}>{key.sign_time}</td></Flex.Item>
                                            <Flex.Item><td style={{textAlign:'center'}}>{key.time_begin}</td></Flex.Item>
                                            <Flex.Item><td style={{textAlign:'center'}}>{key.time_end}</td></Flex.Item>
                                            <Flex.Item><td style={{textAlign:'center'}}>{key.meeting_begin}</td></Flex.Item>
                                            </Flex>
                                            </span>
                                          )
                                      })}
                                  </tr>
                                </div>
                          </tbody>
                        </table>
                      </span>
                </div>

                
             
             </List>


         </div>
         )
     }
 }
 export default Attendance;