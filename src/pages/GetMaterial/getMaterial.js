import React,{Component} from 'react';
import {List,Flex,InputItem,Picker,DatePicker,WhiteSpace,Button} from 'antd-mobile';
import style from './getmaterial.css'
import store from './store';
import request from '../../helpers/request';
import {observer} from 'mobx-react';
import moment from 'moment';

@observer
class GetMaterial extends Component{
    componentDidMount(){
        this.getAllMaterial()
    }
    handleTable =(e) => {
      console.log('i change',e[0]);
      console.log(store.myskuTable);
      let currentTable = store.myskuTable.filter((i) => { return i.id === e[0]})
      console.log(currentTable);
      store.materialMessages = currentTable


    }
    handleData = (e) => {
        console.log(store);
        let {count,sku_id,time_begin,materialType} = store;
        time_begin = moment(time_begin).format('YYYY-MM-DD');
        count = parseInt(count);
        sku_id = materialType.toString();

        request({
          url:'/api/v1/collar/use/save',
          method:'POST',
          data:{
            time_begin,
            count,
            sku_id,
            type:2,
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
        let {materialType,time_begin,materialMessages,myskuList} = store
        // console.log('myskuList',myskuList)

        return(
            <div>
                <List className="calendar-list" style={{ backgroundColor: 'white' }}>
                    <Flex style={{ padding: '15px' }}>
                        <Flex.Item>
                            <Picker 
                                data={myskuList} 
                                cols={1} 
                                className="forss"
                                value={materialType}
                                onChange={(e) => {console.log(e);this.handleTable(e);store.materialType = e}}
                                onOk={(e) => {store.materialType = e}}
                                >
                                <List.Item arrow="horizontal">物品:</List.Item>
                            </Picker>
                        </Flex.Item>
                        <Flex.Item>
                            <InputItem
                            placeholder="请输入"
                            onChange={(e) => {store.count = e}}
                            >数量：</InputItem>
                        </Flex.Item>
                    </Flex>
                    <DatePicker
                        mode="date"
                        value={time_begin}
                        onChange={date => store.time_begin = date}
                    >
                    <List.Item arrow="horizontal">领用时间</List.Item>
                    </DatePicker>
                    <WhiteSpace size="lg" />
                    <div>
                      <h4 style={{float:'left',paddingLeft:'20px'}}>物品信息：</h4>
                      <span>
                        <table className={style.mytable}>
                          <tbody>
                            {materialMessages.map((key,index) => {
                              return(
                                <span>
                                  <tr >
                                    <td style={{textAlign:'center',border:'1px solid #ccc'}}>{key.describefir}</td>
                                    <td style={{textAlign:'center',border:'1px solid #ccc'}}>{key.describesec}</td>
                                    <td style={{textAlign:'center',border:'1px solid #ccc'}}>{key.describethi}</td>
                                    <td style={{textAlign:'center',border:'1px solid #ccc'}}>{key.describefou}</td> 
                                  </tr>
                                  <tr >
                                    <td style={{textAlign:'center',border:'1px solid #ccc'}}>{key.valuefir}</td>
                                    <td style={{textAlign:'center',border:'1px solid #ccc'}}>{key.valuesec}</td>
                                    <td style={{textAlign:'center',border:'1px solid #ccc'}}>{key.valuethi}</td>
                                    <td style={{textAlign:'center',border:'1px solid #ccc'}}>{key.valuefou}</td>
                                  </tr>
                                </span>
                                
                              )
                            })

                            }
                          </tbody>
                        </table>
                      </span>
                    </div>
                    <WhiteSpace size="lg" />
                        <Button style={{ position: 'fixed', width: '100%', bottom: 50 }} type="primary" onClick={this.handleData}>领用</Button>
                    <WhiteSpace size="lg" />
                </List>
            </div>
        )
    }

    getAllMaterial = () => {
        request({
          url:'/api/v1/sku/list/use',
          method:'GET',
          // beforeSend: (xml) => {
          //   xml.setRequestHeader('token',sessionStorage.getItem('token'))
          // },
          success:(res) => {
            console.log(res);
            let useList =  res.filter((i) => { return i.use_type == '领用'})
            let myAllList =  useList.map((e) => {
              return{
                label:e.name,
                value:e.id,
              }
            }
            );
            store.myskuList = myAllList;
            let myAllTable = useList.map((e) => {
              return{
                id:e.id,
                describefir:'物品名称',
                valuefir:e.name,
                describesec:'类别描述',
                valuesec:e.category,
                describethi:'规格型号',
                valuethi:e.format,
                describefou:'库存',
                valuefou:e.stock,
              }
            });
            store.myskuTable = myAllTable;
            console.log('这里执行了吗？')
          }
        })
      }
}
export default GetMaterial;