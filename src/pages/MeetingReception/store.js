import {observable} from 'mobx';
import moment from 'moment';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class Store{
    @observable data = [];
    @observable dataleft = [];
    @observable apply_date = now;
    @observable time_begin = now;
    @observable time_end = now;
    @observable project = '';
    @observable unit = '';
    @observable leader = '';
    @observable post = '';
    @observable grade = '';
    @observable departmental = [''];
    @observable section = [''];
    @observable under_section = ['3'];
    
    @observable info = {};
    @observable check_con = '';
    @observable meeting_place = '';
    @observable meeting_date = '';
    @observable meeting_count = [''];
    @observable accompany_count = [''];

    @observable accompany = '';

    @observable letter_size = '';
    @observable letter_title = '';
    @observable users = '';
    @observable detail = '';


    @observable deadline = new Date(Date.now());
    @observable listParams = {
        time_begin: moment().startOf('month'),
        time_end: moment(),
        access: '全部',
        username: '全部',
        department: '全部',
        status: 3,
    }


    @observable RadioValue = 0;
    @observable deadline = new Date(Date.now());
    @observable userList = [];
    
    @observable total = 5;
    @observable needTotal = 5;
    @observable dataSource = []
    @observable needList = [];
    @observable current = 1;
    @observable needCurrent = 1;
}
export default new Store();