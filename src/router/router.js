

export default [
    {
        path: '/',
        meta: {
            title: 'Login - 登录'
        },
        component: (resolve) => require(['../views/About.vue'], resolve)
        // () => import('../views/About.vue')
    }
];

// export const routers = [...appRouter];
