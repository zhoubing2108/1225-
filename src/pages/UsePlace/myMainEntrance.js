import React, { Component, Fragment } from 'react';
import { ListView, Pagination, Tabs, Card, Button, Modal } from 'antd-mobile';
import store from './store';
// 数据要对应
import request from '../../helpers/request';
import { observer } from 'mobx-react';
import getQueryVarible from '../../helpers/get-query-variable';


const alert = Modal.alert;
const showAlert = (id) => {
  const alertInstance = alert('Delete', '是否取消申请', [
    { text: '取消', onPress: () => console.log('cancel', id), style: 'default' },
    { text: '确定', onPress: () => cancel(id) },
  ]);
  setTimeout(() => {
    console.log('auto close');
    alertInstance.close();
  }, 500000);
};

const cancel = (e) => {
  request({
    url: '/api/v1/flow/check/pass',
    method: 'POSt',
    data: {
      wf_fid: e.id,
      check_con: '',
      flow_id: '',
      run_id: e.run_id,
      flow_process: '',
      run_process: '',
      npid: '',
      submit_to_save: 'cancel',
      wf_type: 'access_control_t'
    },
    beforeSend: (xml) => {
      xml.setRequestHeader('token', sessionStorage.getItem('token'));
    },
    success: (res) => {
      console.log(res);
    }

  })
}

const tabs = [
  { title: '待办' },
  { title: '历史记录' },
];
const _status = {
  '-1': '不通过',
  '0': '保存中',
  '1': '审批中',
  '2': '通过'
}

@observer
class MyEntrance extends Component {
  // componentDidMount(){
  //   this.getNeedList();
  //   this.fetchList();
  // }
  showAlert = (e) => {
    const alertInstance = alert('Delete', '是否取消申请', [
      { text: '取消', onPress: () => console.log('cancel', e), style: 'default' },
      { text: '确定', onPress: () => this.getCheck(e, 'cancel') },
    ]);
    setTimeout(() => {
      console.log('auto close');
      alertInstance.close();
    }, 500000);
  };
  componentDidMount(){
    this.getNeedList();
    this.fetchList();
  }
  getUser = () => {
    let code = getQueryVarible('code');
    request({
      url:'/api/v1/token/user',
      data:{
        code
      },
      method:'GET',
      success:(res)=>{
        sessionStorage.setItem('token',res.token);
        sessionStorage.setItem('u_id',res.u_id);
        sessionStorage.setItem('username',res.username);
        sessionStorage.setItem('account',res.account);
        sessionStorage.setItem('role',res.role);
        }
    })


  };

  render() {
    let { total, dataSource, needList,needTotal, current,needCurrent } = store;
    const HistoryList = () => (
      dataSource.map(e => (<div key={e.flow.id} style={{ fontSize: 16, padding: '10px', background: '#eefaff', border: '1px solid #bbe1f1' }}>
        <span style={{ marginRight: '10px', padding: '5px 0', }}>{e.flow.username}</span>
        <span style={{ marginRight: '10px', padding: '5px 0', }}>{e.flow.space}</span>
        <span style={{ marginRight: '10px', padding: '5px 0', }}>{e.flow.time_begin}</span>
        <span style={{ marginRight: '10px', padding: '5px 0', }}>{e.flow.time_end}</span>
        <span style={{ marginRight: '10px', padding: '5px 0', }}>{e.flow.reason}</span>

        <span style={{ marginRight: '10px', padding: '5px 0', }}>{e.process[0].admin.username}</span>
    
        <span style={{ marginRight: '10px', padding: '5px 0 ', }}>{_status[e.status]}</span><br />
        {e.process.map((v, i) => (
          <span key={i} style={{ marginRight: '20px', padding: '5px 0 ', }}>
            {v.admin.username}:{v.btn == 'ok' ? <span style={{ color: 'green' }}>通过</span> : <span style={{ color: 'red' }}>不通过</span>}
          </span>))}
      </div>
      )
      )
    )
    const NeedList = () => (
      needList.map(e => (<div key={e.flow.id} style={{ fontSize: 16, padding: '10px', background: '#eefaff', border: '1px solid #bbe1f1' }}>
        <span style={{ marginRight: '10px', padding: '5px 0', }}>{e.flow.username}</span>
        <span style={{ marginRight: '10px', padding: '5px 0', }}>{e.flow.space}</span>
        <span style={{ marginRight: '10px', padding: '5px 0', }}>{e.flow.time_begin}</span>
        <span style={{ marginRight: '10px', padding: '5px 0', }}>{e.flow.time_end}</span>
        <span style={{ marginRight: '10px', padding: '5px 0', }}>{e.flow.reason}</span>
        {/* <span style={{ marginRight: '10px', padding: '5px 0', }}>审核中</span> */}

        <span style={{ marginRight: '10px', padding: '5px 0', }}>{e.process[0].admin.username}</span>
        
        <span style={{ marginRight: '10px', padding: '5px 0 ', }}>{_status[e.status]}</span><br />
        {e.process.map((v, i) => (
          <span key={i}>
            <span  style={{ marginRight: '5px', padding: '5px 0 ', }}>{v.admin.username}:{v.btn == 'ok' ? <span style={{ color: 'green' }} style={{}}>通过</span> : <span style={{ color: 'red' }}>不通过</span>}</span>
          </span>))}
        {e.btn == 'cancel' ?
          <Button
            onClick={() => this.showAlert(e)} type='primary' size='small' style={{ display: 'inline-block', height: 24, lineHeight: '24px', margin: '5px 10px 0 0' }}>取消申请</Button>
          : null}
        {e.btn == 'check' ?
          <span style={{ margin: '5px 10px 0 0' }}>
            <Button onClick={() => prompt('通过', '请输入意见', [
              { text: '取消' },
              { text: '提交', onPress: value => { store.check_con = value; this.getCheck(e, 'ok') } },
            ], 'default', '通过')} type='primary' size='small' style={{ display: 'inline-block', height: 24, lineHeight: '24px', marginRight: '5px' }} >通过</Button>
            <Button onClick={() => prompt('不通过', '请输入意见', [
              { text: '取消' },
              { text: '提交', onPress: value => { store.check_con = value; this.getCheck(e, 'back') } },
            ], 'default', '通过')} type='primary' size='small' style={{ display: 'inline-block', height: 24, lineHeight: '24px', margin: '5px 10px 0 0' }} >不通过</Button>
          </span>
          : null}
      </div>
      )
      )
    )
    return (
      <Fragment>
        <div style={{ marginTop: '50px' }}>
          <Tabs tabs={tabs} style={{ width: '100%' }} initialPage={0} animated={false} useOnPan={false}>
            <div style={{ height: '100%', backgroundColor: '#fff' }}>
              <NeedList />
              {/* <button onClick={this.getNeedList}>test</button>
              <button onClick={this.check}>同意</button> */}
            </div>
            <div style={{ height: '100%', backgroundColor: '#fff' }}>
              <HistoryList />
              <Pagination total={total} current={current} onChange={(e, i) => { let page = e; this.fetchList(page) }} />
              {/* <button onClick={this.test}>test</button> <button style={{ marginLeft: 10 }} onClick={()=>{this.fetchList(1)}}>fetchlist</button> */}
            </div>
          </Tabs>
        </div>
      </Fragment>
    )
  }
  test = () => {
    let code = '2UXC8URNOzPdhLXT8C_4jobD8Y4m30JzVfQDpaoenfw';
    request({
      url: 'api/v1/token/user',
      method: 'GET',
      data: {
        code
      },
      success: (e) => {
        console.log(e);
        sessionStorage.setItem('token', e.token)
        sessionStorage.setItem('role', e.role);
        console.log(sessionStorage)
      }
    })
  }
  check = () => {
    request({
      url: '/api/v1/flow/check/pass',
      method: 'POST',
      data: {
        "check_con": "同意",
        "flow_id": 3,
        "flow_process": 10,
        "npid": 11,
        "run_id": 154,
        "run_process": 354,
        "wf_fid": 89,
        "wf_type": "access_control_t",
        "submit_to_save": "ok",
      },
      beforeSend: (xml) => {
        xml.setRequestHeader('token', sessionStorage.getItem('token'))
      },
      success: (res) => {
        console.log(res);
      }
    })
  }
  getNeedList = () => {
    request({
      url: '/api/v1/flow/ready',
      method: 'GET',
      data: {
        wf_type: 'space_recreational_t',
      },
      beforeSend: (xml) => {
        xml.setRequestHeader('token', sessionStorage.getItem('token'))
        // xml.setRequestHeader('token','b479ed26594050ceab67c6f09ecea889')
      },
      success: (res) => {
        store.needList = res;
        console.log('代办的数据',res);
        console.log(res.length);
        console.log(res);
      }
    })
  }

  fetchList = (page) => {
    let { time_begin, time_end, status, username, access, department } = store.listParams;
    request({
      url: '/api/v1/flow/complete',
      method: 'GET',
      data: {
        wf_type: 'space_recreational_t',
        page: page,
        size: 10
      },
      beforeSend: (xml) => {
        xml.setRequestHeader('token', sessionStorage.getItem('token'))
        // xml.setRequestHeader('token','b479ed26594050ceab67c6f09ecea889')
      },
      success: (res) => {
        store.dataSource = res.data;
        store.total = res.last_page
        console.log(res);
      }
    })
  }
  getCheck = (e, type) => {
    request({
      url: '/api/v1/flow/info',
      method: 'GET',
      data: {
        wf_fid: e.from_id,
        wf_type: 'space_recreational_t'
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
      method: 'POST',
      data: {
        check_con,
        flow_id,
        run_id,
        flow_process,
        run_process,
        npid: nexprocess.id,
        wf_fid: id,
        submit_to_save: type,
        wf_type: 'space_recreational_t'
      },
      beforeSend: (xml) => {
        xml.setRequestHeader('token', sessionStorage.getItem('token'))
      },
      success: () => {
        alert('操作成功');
        this.getNeedList();
        this.fetchList(1);
      }
    })
  }
  getQueryVariable = (variable) => {
    let u_id = sessionStorage.getItem('u_id');
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
  }
}

export default MyEntrance