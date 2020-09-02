const config = require('./config/loggerDetails')
const log4js = require('log4js');
const fileName = config.path;
const errorLogsfileName = config.pathforErrorLogs;
const level = "all";

log4js.configure({
    appenders: {
        botkitlog: 
        {
            type: 'file',
            filename: fileName, 
            pattern: "yyyy-MM-dd.log",
            alwaysIncludePattern: true
        },
        errorLog:{
            type: 'file',
            filename: errorLogsfileName, 
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        logLevelFilter: {  type:'logLevelFilter',level: 'error', appender: 'errorLog' }       
    },
    categories: {
        default: {
            appenders: ['botkitlog','logLevelFilter'],
            level: level
        }
    }
});
var logger = log4js.getLogger('botkitlog');
Object.defineProperty(exports, "LOG", {
    value: logger,
});