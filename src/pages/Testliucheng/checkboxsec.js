import React from 'react';
import store from './store';
import {observer} from 'mobx-react';
import request from '../../helpers/request';
import {Modal, Switch, Calendar, DatePicker, List , Picker, WhiteSpace, InputItem, Card, WingBlank, Radio, Flex, Button, TextareaItem} from 'antd-mobile';
import { changeConfirmLocale } from 'antd/lib/modal/locale';
import moment from 'moment';
import getQueryVarible from '../../helpers/get-query-variable';
const operation = Modal.operation;
const prompt = Modal.prompt;
const alert = Modal.alert;

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

class UseCarsComSec extends React.Component{
    render(){
        return(
            <div>
                    {transport_types.map((i) => (
                    <Flex.Item key={i.value}>
                    {/* <WhiteSpace size="sm" /> */}
                    <div style={{height:'11px'}}></div>
                    <Radio className='my-radio' checked={store.transport_type === i.value} onChange={(e) => {store.transport_type = i.value}}>{i.label}</Radio>
                    <WhiteSpace size="lg" />
                    </Flex.Item> 
                    ))}
            </div>
        );
    }
}
export default UseCarsComSec;