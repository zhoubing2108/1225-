import React, { Component, Fragment } from 'react';
import {observer} from 'mobx-react';
import { ListView, Pagination, Tabs, Card, List } from 'antd-mobile';
import store from './store';
import request from '../../helpers/request';
import getQueryVarible from '../../helpers/get-query-variable';
const Item = List.Item;


// const tabs = [
//     { title: '当前申请' },
//     { title: '历史申请'},
//     { title: '审批记录' },
//   ];
const tabs = [
    { title: '待办列表' },
    { title: '历史记录' },
  ];
  const _status = {
    '-1': '不通过',
    '0': '保存中',
    '1': '审批中',
    '2': '通过'
  }
  
  const NUM_ROWS = 1;
  let pageIndex = 0;
  
  function genData(pIndex = 0) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
      const ii = (pIndex * NUM_ROWS) + i;
      dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
  }

@observer
class MyUsePlace extends Component{
    // componentDidMount(){
    //     // this.getSpaceList();
    // }
    // getSpaceList = () => {
    //     //拿到参数
    //     request({
    //         url:'',
    //         method:'',
    //         data:{
    //         },
    //         // beforeSend: (xml) =>{
    //         //     xml.setRequestHeader('token',sessionStorage.getItem('token'))
    //         // },
    //         success: (res) => {
    //             console.log(res);
    //         }
    //     })
    // }
    // render(){
    //     return(
    //         <div>
    //         </div>
    //     );
    // }

    constructor(props) {
        console.log(sessionStorage);
        super(props);
        const dataSource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        });
    
        this.state = {
          dataSource,
          isLoading: true,
        };
      }
    
    
      componentDidMount() {
      
      }
    
      getUser = () => {
        // let code = getQueryVarible('code');
        let code = '4ib8hTQemMQdDcOaMAn2vn4iGE6oQTkGKDavzXu9GM8';
        request({
          url:'/api/v1/token/user',
          method:'GET',
          data:{
            code
          },
          success:(res)=>{
            sessionStorage.setItem('token',res.token);
            sessionStorage.setItem('u_id',res.u_id);
            sessionStorage.setItem('username',res.username);
            sessionStorage.setItem('account',res.account);
            sessionStorage.setItem('role',res.role);
            this.fetchList();
            // this.fetchListLeft(1);
            }
        })
      }
    
      fetchList = (page) => {
        let { time_begin, time_end, status, username, access, department } = store.listParams;
        console.log(time_begin, time_end);
        // page = page?page:1;
        let u_id = sessionStorage.getItem('u_id');
        request({
          url: '/api/v1/flow/ready',
          method: 'GET',
            data:{
                wf_type:'space_recreational_t',
                // page: page,
                // size: 10
            },
          beforeSend: (xml) => {
            xml.setRequestHeader('token', sessionStorage.getItem('token'))
          },
          success: (res) => {
            console.log(res);
            // data = res;
            store.data = res;
            // store.total = res.total
          }
        })
    
      }
      fetchListLeft= (page) => {
        page = page?page:1;

        request({
          url: '/api/v1/flow/complete',
          method: 'GET',
            data:{
                wf_type:'space_recreational_t',
                page: page,
                size: 10
            },
          beforeSend: (xml) => {
            xml.setRequestHeader('token', sessionStorage.getItem('token'))
          },
          success: (res) => {
            console.log('左边的数据',res);
            // data = res;
            store.dataleft = res;
            // store.total = res.total
          }
        })

      }
      
    
    
      render() {
        
        let mydata = store.data;
        let mydataleft = store.dataleft.data;
        if (mydata.length == 0) {
          return (
          <div>
            <Fragment>
              <div style={{ marginTop: 5 }}>
                <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}  onChange={(tab, index) => { console.log('onChange', index, tab); }}>
                  <div style={{ height: '100%', backgroundColor: '#fff' }}>
                  <List>
                        <Item style={{fontWeight:'bold'}}>
                        <Card>
                        <Card.Body>
                          <pre>
                            <div style={{textAlign:'center'}}>暂无数据</div>
                          </pre>
                        </Card.Body>
                        </Card>
                        </Item>
                  </List>
                  </div>
                </Tabs>
              </div>
            </Fragment>
          </div>)
        }
        return (
          <Fragment>
            <div style={{ marginTop: 5 }}>
              <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
                <div style={{ height: '100%', backgroundColor: '#fff' }}>
                    <List>
                    {mydataleft.map(e => (
                      
                        <Item style={{fontWeight:'bold'}} key = {e.id}>
                        <Card>
                        <Card.Body>
                          <pre style={{}}>
                          <span>{e.flow.space}</span>&nbsp;
                          <span>{e.flow.time_begin}</span>&nbsp;
                          <span>{e.flow.time_end}</span><br />
                          <span>{e.flow.unit}</span>&nbsp;
      
                          <span>{e.flow.user_count}</span>
                          {/* 在<pre>标签下实现文本自动换行 */}
      
                          {/* <span>{e.deadline}</span> */}
      
                          <span style={{float:'right'}}><a href="" onClick={(e) => e.preventDefault()}>{_status[e.status]}</a></span><br />
                          </pre>
                        </Card.Body>
                        </Card>
                        </Item>
                      
                    ))}
                    </List>
                </div>
                <div style={{ height: '100%', backgroundColor: '#fff'}}>
                  <List>
                   {mydata.map(e => (
                    
                      <Item style={{fontWeight:'bold'}} key = {e.id}>
                      <Card>
                      <Card.Body>
                        <pre style={{}}>
                        <span>{e.flow.space}</span>&nbsp;
                        <span>{e.flow.time_begin}</span>&nbsp;
                        <span>{e.flow.time_end}</span><br />
                        <span>{e.flow.unit}</span>&nbsp;
    
                        <span>{e.flow.user_count}</span>
                        {/* 在<pre>标签下实现文本自动换行 */}
    
                        {/* <span>{e.deadline}</span> */}
    
                        <span style={{float:'right'}}><a href="" onClick={(e) => e.preventDefault()}>{_status[e.status]}</a></span><br />
                        </pre>
                      </Card.Body>
                      </Card>
                      </Item>
                    
                   ))}
                  </List>
                </div>
                {/* <div style={{ height: '100%', backgroundColor: '#fff' }}>
                第二个数据
                </div>
                <div style={{ height: '100%', backgroundColor: '#fff'}}>
                展示第三个数据
                </div> */}
              </Tabs>
            </div>
          </Fragment>
        )
      }

}
export default MyUsePlace;


