import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import _one from '../../imgs/1.png';
import _two from '../../imgs/2.png';
import _three from '../../imgs/3.png';
import _four from '../../imgs/4.png';
import _five from '../../imgs/5.png';
import _six from '../../imgs/6.png';
import _seven from '../../imgs/7.png';
import _eight from '../../imgs/8.png';
import _nine from '../../imgs/9.png';
import _ten from '../../imgs/10.png';
import _ele from '../../imgs/11.png';

import { Grid } from 'antd-mobile';
// const data = Array.from(new Array(9)).map((_val, i) => {console.log(_val);
//   return({
//   icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
//   text: `name${i}`,
// })}
// );
const data = [
  {
    icon: _one,
    text: '会议签到',
    path:'/'
  }, {
    icon: _two,
    text: '门禁权限',
    path:'/entrance'
  }, {
    icon: _three,
    text: '文体活动场地',
    path:'/useplace'
  }, {
    icon: _four,
    text: '多功能演播室',
    path:'/useplacemeeting'
  }, {
    icon: _five,
    text: '会场预定',
    path:'/meetingbooking',
  }, {
    icon: _six,
    text: '公务用车',
    path:'/usecars'
  }, {
    icon: _seven,
    text: '围餐预定',
    path:'/reception'
  }, {
    icon: _eight,
    text: '自助餐预定',
    path:'/buffet'
  }, {
    icon: _nine,
    text: '酒店预订',
    path:'/hotelbooking'
  }, {
    icon: _ten,
    text: '物品领用',
    path:'/borrowmaterial'
  }, {
    icon: _ten,
    text: '物品借用',
    path:'/getmaterial'
  }, {
    icon: _ele,
    text: '物品报修',
    path:'/repair'
  },
];

class DefalutPage extends Component {
  render() {
    let {history} = this.props;
    return (
      <Fragment>
        <Grid data={data} columnNum={3} onClick={(e,i)=>history.push(e.path)} />
      </Fragment>
    )
  }
}

export default withRouter(DefalutPage);