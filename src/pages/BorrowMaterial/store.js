import {observable} from 'mobx';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
import moment from 'moment';

class Store{
    @observable myskuList = [{label:'暂无',value:'洗手液'},{label:'暂无',value:'洗手液'}]
    // @observable myskuList = material_types;
    @observable mytestskuList = [];
    @observable sku_id = '';
    @observable count = '';
    @observable time_begin = now;
    @observable time_end = now;

    @observable materialType = [];

    @observable materialMessages = [
        {
            valuefir:'1',
            describefir:'物品名称',
        
            valuesec:'2',
            describesec:'类别描述',
        
            valuethi:'3',
            describethi:'规格型号',
      
            valuefou:'4',
            describefou:'库存',
        }
    ];

    @observable myskuTable = [];


    @observable RadioValue = 0;
    @observable deadline = new Date(Date.now());
    @observable userList = [];
    @observable listParams = {
      time_begin: moment().startOf('month'),
      time_end: moment(),
      access: '全部',
      username: '全部',
      department: '全部',
      status: 3,
    }
    @observable total = 5;
    @observable needTotal = 5;
    @observable dataSource = []
    @observable needList = [];
    @observable current = 1;
    @observable needCurrent = 1;
    @observable check_con = '';
    @observable info = {};

}
export default new Store();