import React from 'react';
import store from './store';
import {observer} from 'mobx-react';
import request from '../../helpers/request';
import { Switch, Calendar, DatePicker, List , Picker, WhiteSpace, InputItem, Card, WingBlank, Radio, Flex, Button, TextareaItem} from 'antd-mobile';
import moment from 'moment';


@observer
class BuffetApplyCom extends React.Component{
    componentDidMount(){
      // this.getUser();
    }
    handleData = (e) => {
      let {meals,unit, time_begin, time_end,project} = store;
      meals =  meals.replace(/[\r\n]/g, 'A');
      console.log(store);
      request({
        url:'/api/v1/buffet/save',
        method:'POST',
        data:{
          unit,
          meals,
          time_begin:moment(time_begin).format('YYYY-MM-DD'),
          time_end:moment(time_end).format('YYYY-MM-DD'),
          project
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
                  mode="date"
                  title="开始时间"
                  extra="Optional"
                  value={store.time_begin}
                  onChange={date => store.time_begin = date}
                  onOk={date => store.time_begin = date}
                >
                  <List.Item arrow="horizontal">开始时间</List.Item>
                </DatePicker>
                <DatePicker
                  mode="date"
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
                >来访单位</InputItem>

                <InputItem
                  placeholder="请输入"
                  onChange={(e) => {store.project = e}}
                >公务活动项目</InputItem>
               

              
                <List renderHeader={() => '订餐信息：就餐日期,餐次,用餐人数，费用----(注意：逗号必须使用用英文逗号,多条数据换行填写)--例(2018-01-01,早餐,12,250)'}>
                    <TextareaItem
                        placeholder="2018-10-12,早餐,3,200（如需开票请备注费用）"
                        rows={5}
                        value={store.meals}
                        onChange={e => {store.meals = e}}
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
export default BuffetApplyCom;