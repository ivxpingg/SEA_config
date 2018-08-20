
let config = {
    env: process.env.NODE_ENV,
    development: {
        // domain: 'http://localhost',
        // port: '8090',
        ajaxUrl: '/oceanobservation/ocean',     // ajax请求地址
        baseUrl: '/',
        path: '/',        // 用于设置cookie
        manageLogUrl: 'http://xmsoc.com:20506/OCEANAM/logout',    // 后端登陆地址
        homeSeaBaseUrl_manage: 'http://xmsoc.com:20506'
    },
    production: {
        // domain: 'http://localhost',
        // port: '8090',
        ajaxUrl: '/oceanobservation/ocean',     // ajax请求地址
        baseUrl: '/',
        path: '/',        // 用于设置cookie
        manageLogUrl: 'http://xmsoc.com:20506/OCEANAM/logout',    // 后端登陆地址
        homeSeaBaseUrl_manage: 'http://xmsoc.com:20506'
    }
};
export default config;