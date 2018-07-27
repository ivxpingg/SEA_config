

export default [
    {
        path: '/home',
        name: 'home',
        alias: '/',
        meta: {
            title: '配置中心'
        },
        component: (resolve) => require(['../views/Home/home.vue'], resolve),
        children: [
            { path: 'configManage', name: 'configManage', alias: '/home', meta: { requireAuth: true, title: '配置管理', }, component: (resolve) => require(['../components/configCenter/configManage/configManage.vue'], resolve) },
            { path: 'projectManage', name: 'projectManage', meta: { requireAuth: true, title: '项目管理', }, component: (resolve) => require(['../components/configCenter/projectManage/projectManage.vue'], resolve) },
            { path: 'userManage', name: 'userManage', meta: { requireAuth: true, title: '用户管理', }, component: (resolve) => require(['../components/configCenter/userManage/userManage.vue'], resolve) },
            { path: 'userLog', name: 'userLog', meta: { requireAuth: true, title: '用户操作日志', }, component: (resolve) => require(['../components/logManage/userLog/userLog.vue'], resolve) },
            { path: 'systemLog', name: 'systemLog', meta: { requireAuth: true, title: '操作运行日志', }, component: (resolve) => require(['../components/logManage/systemLog/systemLog.vue'], resolve) },
            { path: 'addTheme', name: 'addTheme', meta: { requireAuth: true, title: '微分析配置', }, component: (resolve) => require(['../components/addTheme/addTheme.vue'], resolve) },
        ]
    }
];

