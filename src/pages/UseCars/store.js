import {observable} from 'mobx';
import moment from 'moment';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class Store{
    @observable apply_date = '';
    @observable address = '';
    @observable count = '';
    @observable reason = '';
    @observable members = '';
    @observable transport_type = '';
    @observable act_type_first = '';
    @observable act_type_second = '';
    @observable act_type_third = '';
    @observable act_type_fourth = '';
    @observable act_type_fifth = '';


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

    @observable car_type = '';
    @observable driver = '';
    @observable detail = '';
    @observable myvisiable = false;

}
export default new Store();