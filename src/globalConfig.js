let globalConfig;

if (process.env.VUE_APP_MODE === 'loc') {
    //本地开发环境
    globalConfig = {
        'baseUrl': 'http://gweixin-dev.80points.com.cn',
        'myUrl': 'http://wxweb-local.80points.com.cn',
        'appId': 'wxf1b666e57eaf9086'
    }
} else if (process.env.VUE_APP_MODE === 'dev') {
    //开发环境
    globalConfig = {
        'baseUrl': 'http://gweixin-dev.80points.com.cn',
        'myUrl': 'http://wxweb-dev.80points.com.cn',
        'appId': 'wxf1b666e57eaf9086'
    }
} else if (process.env.VUE_APP_MODE === 'test') {
    //测试环境
    globalConfig = {
        'baseUrl': 'http://gweixin-test.80points.com.cn',
        'myUrl': 'http://wxweb-test.80points.com.cn',
        'appId': 'wxf1b666e57eaf9086'
    }
} else if (process.env.VUE_APP_MODE === 'prod') {
    //生产环境
    globalConfig = {
        'baseUrl': 'https://gweixin.80points.com.cn',
        'myUrl': 'https://wxweb.80points.com.cn',
        'appId': 'wx1abeb239e69eddfe'
    }
} else {
    //本地环境
    globalConfig = {
        'baseUrl': 'http://gweixin-dev.80points.com.cn',
        'myUrl': 'http://wxweb-local.80points.com.cn',
        'appId': 'wxf1b666e57eaf9086'
        // 'appId': 'wxc0f5bd2c86303fbb'
    }
}

export default globalConfig;
