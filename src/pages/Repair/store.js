import {observable} from 'mobx';
import moment from 'moment';


class Store{
    @observable name = '';
    @observable address = '';
    @observable remark = '';
    @observable type = '';
    // @observable FileList = [];
    @observable imgs = [];

    @observable transport_type = '';
    @observable check_con = '';
    


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

    @observable myvisiable = false;
    @observable myVisiableStep = false;


    @observable feedback = '';




}
export default new Store();