import {observable} from 'mobx';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
import moment from 'moment';

const attendance_time = [
    {
        meeting_date: "2018-12-20",
        theme: "test",
        sign_time: "2018-12-19 15:41:19",
        time_begin: "2018-12-19 15:00:00",
        time_end: "2018-12-19 19:30:00",
        meeting_begin: "2018-12-20 09:30:00"
    },
    {
        meeting_date: "2018-12-20",
        theme: "mytest",
        sign_time: "2018-12-19 15:41:19",
        time_begin: "2018-12-19 15:00:00",
        time_end: "2018-12-19 19:30:00",
        meeting_begin: "2018-12-20 09:30:00"
    }
]
class Store{
    @observable theme = '';
    @observable address = '';
    @observable time_begin = now;
    @observable time_end = now;

    
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
    @observable dataSource = attendance_time
    @observable needList = [];
    @observable current = 1;
    @observable needCurrent = 1;

}

export default new Store();