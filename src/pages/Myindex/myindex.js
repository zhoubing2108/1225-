import React , {Component} from 'react';
import { Flex,Grid} from 'antd-mobile';
import style from './myindex.css';
import hc from '../../imgs/会场.png';


// const data = Array.from(new Array(9)).map((_val, i) => ({
//     icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
//     text: `name${i}`,
//   }));
const data = [
    {
        icon:'../../imgs/会场.png',
        text:'会场'
    },
    {
        icon:'../../imgs/保修申请.png',
        text:'保修'
    },
    {
        icon:'../../imgs/围餐.png',
        text:'围餐'
    },
    {
        icon:'../../imgs/场地.png',
        text:'文体场地'
    },
    {
        icon:'../../imgs/演播室.png',
        text:'演播室'
    },
    {
        icon:'../../imgs/物品借用.png',
        text:'物品借用'
    },
    {
        icon:'../../imgs/物品领用.png',
        text:'物品领用'
    },
    {
        icon:'../../imgs/用车申请.png',
        text:'用车申请'
    },
    {
        icon:'../../imgs/签到.png',
        text:'签到'
    },
    {
        icon:'../../imgs/自助餐.png',
        text:'自助餐'
    },
    {
        icon:'../../imgs/酒店.png',
        text:'酒店'
    },
    {
        icon:'../../imgs/门禁.png',
        text:'门禁'
    }
]
class MyIndex extends Component {
    render(){
        return(
            <div>
                {/* <div className={style.flexContainer}>
                    <Flex wrap="center" justify='center'>
                    <Flex.Item style={{textAlign:'center'}}><image src={hc}></image><span>222</span></Flex.Item>
                    <Flex.Item style={{textAlign:'center'}}><span>222</span></Flex.Item>
                    <Flex.Item style={{textAlign:'center'}}><span>222</span></Flex.Item>
                    </Flex>
                </div> */}
                <Grid data={data} hasLine={false} />
            </div>
        )
    }
}
export default MyIndex;