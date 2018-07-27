
let config = {
    env: process.env.NODE_ENV,
    development: {
        // domain: 'http://localhost',
        // port: '8090',
        ajaxUrl: '/oceanobservation/ocean',     // ajax请求地址
        baseUrl: '/',
        path: '/'         // 用于设置cookie
    },
    production: {
        // domain: 'http://localhost',
        // port: '8090',
        ajaxUrl: '/oceanobservation/ocean',     // ajax请求地址
        baseUrl: '/',
        path: '/'         // 用于设置cookie
    }
};
export default config;