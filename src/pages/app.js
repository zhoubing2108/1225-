import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import {Drawer,Icon,List,NavBar} from 'antd-mobile';
import './index.css'

const ListItem = List.Item;
class App extends Component {
  state = {
    open: true,
  }
  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  }
  render() {
    const sider = (
      <List>
        <ListItem><Link to='/'>门禁权限</Link></ListItem>
        <ListItem><Link to='/useplace'>文体活动场地</Link></ListItem>
        <ListItem><Link to='/useplacemeeting'>多功能演播室</Link></ListItem>
        <ListItem><Link to='/meetingbooking'>会场预定</Link></ListItem>
        <ListItem><Link to='/reception'>围餐预定</Link></ListItem>
        <ListItem><Link to='/buffet'>自助餐</Link></ListItem>
        <ListItem><Link to='/hotelbooking'>酒店预订</Link></ListItem>
        <ListItem><Link to='/usecars'>公务用车</Link></ListItem>

        <ListItem><Link to='/testliucheng'>流程测试</Link></ListItem>
        <ListItem><Link to='/getmaterial'>领用</Link></ListItem>
        <ListItem><Link to='/borrowmaterial'>借用</Link></ListItem>
        <ListItem><Link to='/repair'>报修</Link></ListItem>
        <ListItem><Link to='/attendance'>签到列表</Link></ListItem>



      </List>
    )
    return (
      <div>
        <NavBar icon={<Icon type="ellipsis" />}style={{marginBottom:50}}>干部职工之窗</NavBar>
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
          sidebar={sider}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
          position='right'
        >
        <Switch>
          <Route path='/attendance' render={()=> <WrapperComponent Comp={import('./Attendance/attendance')} name='attendance' /> } />
          <Route path='/repair' render={()=> <WrapperComponent Comp={import('./Repair/bottomtab')} name='repair' /> } />
          <Route path='/borrowmaterial' render={()=> <WrapperComponent Comp={import('./BorrowMaterial/bottomtab')} name='borrowmaterial' /> } />
          <Route path='/getmaterial' render={()=> <WrapperComponent Comp={import('./GetMaterial/bottomtab')} name='getmaterial' /> } />
          <Route path='/testliucheng' render={()=> <WrapperComponent Comp={import('./Testliucheng/bottomtab')} name='Testliucheng' /> } />
          <Route path='/usecars' render={()=> <WrapperComponent Comp={import('./UseCars/bottomtab')} name='usecars' /> } />

          <Route path='/meetingbooking' render={()=> <WrapperComponent Comp={import('./MeetingBooking/bottomtab')} name='meetingbooking' /> } />
          <Route path='/hotelbooking' render={()=> <WrapperComponent Comp={import('./HotelBooking/bottomtab')} name='hotelbooking' /> } />
          <Route path='/buffet' render={()=> <WrapperComponent Comp={import('./Buffet/bottomtab')} name='buffet' /> } />
          <Route path='/useplacemeeting' render={()=> <WrapperComponent Comp={import('./UsePlaceMeeting/bottomtab')} name='useplacemeeting' /> } />
          <Route path='/useplace' render={()=> <WrapperComponent Comp={import('./UsePlace/bottomtab')} name='useplace' /> } />
          <Route path='/reception' render={()=> <WrapperComponent Comp={import('./MeetingReception/bottomtab')} name='reception' /> } />
          <Route path='/' render={()=> <WrapperComponent Comp={import('./Entrance/Entrance')} name='entrance' /> } />
        </Switch>
        </Drawer>
      </div>
    )
  }
}

class WrapperComponent extends React.Component {
  state = {
    Comp: null
  }
  componentDidMount() {
    this.updateComp(this.props);
  }
  render() {
    let Comp = this.state.Comp;
    let { globalStore, match, history } = this.props;
    return Comp ? <Comp match={match} globalStore={globalStore} history={history} /> : Comp;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.Comp !== this.props.Comp) {
      this.updateComp(nextProps);
    }
  }
  updateComp = (props) => {
    props.Comp.then(C => {
      this.setState({
        Comp: C.default
      })
    });
  }
}

export default App