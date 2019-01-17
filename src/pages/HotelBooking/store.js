import {observable} from 'mobx';
import moment from 'moment';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class Store{
  
    @observable time_begin = now;
    @observable time_end = now;
    @observable unit = '';
    @observable hotel = '';

    @observable male = '';
    @observable female = '';

    @observable single_room = '';
    @observable double_room = '';
    @observable members = '';

  @observable info = {};
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
    
}
export default new Store();