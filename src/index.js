import dva from 'dva';
import {message} from 'antd'
import './index.html';
import './index.css';
import { createHashHistory } from 'history';
import { useRouterHistory } from 'dva/router';
import  createLoading from 'dva-loading'
import createLogger from 'dva-logger'
// 1. Initialize
const app = dva({
    history: useRouterHistory(createHashHistory)({ queryKey: false }),
    onError(err){
          message.error(err.message)
    }
});

app.model(require("./models/users"));

app.model(require("./models/app"));

// 2. Plugins
app.use(createLoading());
//app.use(createLogger());

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
