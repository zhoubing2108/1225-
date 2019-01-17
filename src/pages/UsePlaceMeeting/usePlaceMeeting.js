import React from 'react';
import store from './store';
import {observer} from 'mobx-react';
import request from '../../helpers/request';
import { Switch, Calendar, DatePicker, List , Picker, WhiteSpace, InputItem, Card, WingBlank, Radio, Flex, Button, TextareaItem} from 'antd-mobile';
import { changeConfirmLocale } from 'antd/lib/modal/locale';
import moment from 'moment';
import getQueryVarible from '../../helpers/get-query-variable';



  // const act_types = [
  //   {
  //     label: '文体活动场地',
  //     value: '文体活动场地',
  //   },
  //   {
  //     label: '功能室场地',
  //     value: '功能室场地',
  //   },  
  // ]; 
  const act_types = [
    {
      label: '多功能演播室',
      value: '多功能演播室',
    },
    {
      label: '荷塘月色露台',
      value: '荷塘月色露台',
    },
    {
      label: '职工书屋',
      value: '职工书屋',
    },
  ]
@observer
class UsePlaceCom extends React.Component{
    componentDidMount(){
      // this.getUser();
    }
    // getUser = () => {
    //   let code = getQueryVarible('code');
    //   request({
    //     url:'/api/v1/token/user',
    //     data:{
    //       code
    //     },
    //     success:(res)=>{
    //       sessionStorage.setItem('token',res.token);
    //       sessionStorage.setItem('u_id',res.u_id);
    //       sessionStorage.setItem('username',res.username);
    //       sessionStorage.setItem('account',res.account);
    //       sessionStorage.setItem('role',res.role);
    //       }
    //   })


    // };

    
    handleData = (e) => {
      console.log(store);
      let {reason,unit, space, time_begin,  time_end} = store;
      time_begin = moment(time_begin).format('YYYY-MM-DD HH:mm');
      time_end = moment(time_end).format('YYYY-MM-DD HH:mm');
      space = space.toString();
      request({
        url:'/api/v1/multi/save',
        method:'POST',
        data:{
          unit,
          space,
          time_begin,
          time_end,
          reason
        },
        beforeSend: (xml) => {
          xml.setRequestHeader('token',sessionStorage.getItem('token'))
        },
        success: (res) => {
          alert('提交成功')
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
    // onPickerChange = (val) => {

    //   console.log('这里的value',val);
    //   store.cols = 1;
    //   // const d = [...this.state.data];
    //   let d = store.prespace_type;
    //   // console.log('d',d);
    //   // const asyncValue = [...val];
    //    store.asyncValue = val;
    //   if (val[0] === '功能室场地') {
    //     d.forEach((i) => {
    //       if (i.value === '功能室场地') {
    //         // 当发现选了功能室,就让他展现两列
    //         store.cols = 2;
    //         if (!i.children) {
    //           i.children = [{
    //             value: '功能室场地-会议室',
    //             label: '会议室',
    //           }, {
    //             value: '功能室场地-办公室',
    //             label: '办公室',
    //           }];
    //         } 
    //       }
    //     });
    //   } else {
    //     store.cols = 1;
    //   }
    //   store.prespace_type = d;
    //   store.asyncValue = val;
    //   //上面完成判断后直接拿到onPickerChange触发的值并更新能展示在页面的值asyncValue;
    //   //d被上面的if修饰过，与用于展示的asyncValue不同,d是包含children，asyncValues是选好的精确值
      
      
    // };

    render(){
        return(
            <div>
                <List className="calendar-list" style={{ backgroundColor: 'white' }}>
                <InputItem
                  placeholder="请输入"
                  onChange={(e) => {store.unit = e}}
                >使用单位</InputItem>
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

                {/* <Picker
                  data={store.prespace_type}
                  //[]数据来源
                  cols={store.cols}
                  //[]展示的列数
                  value={store.asyncValue}
                  //[]这个是展示的值
                  onPickerChange={this.onPickerChange}
                  onOk={v => console.log(v)}
                >
                  <List.Item arrow="horizontal" onClick={this.onClick}>多功能室名称</List.Item>
                </Picker> */}

                <Picker 
                  data={act_types} 
                  cols={1} 
                  className="forss"
                  value={store.space}
                  onChange={(e) => {store.space = e}}
                  onOk={(e) => store.space = e}
                >
                  <List.Item arrow="horizontal">多功能室名称</List.Item>
                </Picker>
                <List renderHeader={() => '申请使用事由'}>
                    <TextareaItem
                        placeholder="事由备注"
                        rows={5}
                        value={store.reason}
                        onChange={e => {store.reason = e}}
                        // onOk={e => {store.reason = e}}
                    />
                </List>
                {/* <Picker 
                  data={places} 
                  cols={1} 
                  className="forss"
                  value={store.meal_space}
                  onChange={(e) => {store.meal_space = e;}}
                  onOk={(e) => store.meal_space = e}
                >
                  <List.Item arrow="horizontal">餐饮地点</List.Item>
                </Picker>
                {this.renderBtn('选择使用时间段', 'Select DateTime Range', { pickTime: true })} */}
                <WhiteSpace size="lg" />
                <Button style={{ position: 'fixed', width: '100%', bottom: 50 }} type="primary" onClick={this.handleData}>提交</Button>
                <WhiteSpace size="lg" />
               
                </List>
                {/* <Calendar
                {...this.state.config}
                visible={this.state.show}
                onCancel={this.onCancel}
                onConfirm={this.onConfirm}
                onSelectHasDisableDate={this.onSelectHasDisableDate}
                getDateExtra={this.getDateExtra}
                defaultDate={now}
                minDate={new Date(+now - 5184000000)}
                maxDate={new Date(+now + 31536000000)}
                /> */}
            </div>
        );
    }
}
export default UsePlaceCom;