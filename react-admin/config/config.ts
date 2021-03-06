import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
}

export default {
  plugins,
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              path: '/user/login',
              component: './user/login',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['ROLE_ADMIN', 'ROLE_USER'],
          routes: [
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              authority: ['ROLE_ADMIN'],
              routes: [
                {
                  name: 'analysis',
                  path: '/dashboard/analysis',
                  authority: ['ROLE_ADMIN'],
                  component: './dashboard/analysis',
                },
                {
                  name: 'monitor',
                  path: '/dashboard/monitor',
                  authority: ['ROLE_ADMIN'],
                  component: './dashboard/monitor',
                },
                {
                  name: 'workplace',
                  path: '/dashboard/workplace',
                  authority: ['ROLE_ADMIN'],
                  component: './dashboard/workplace',
                },
              ],
            },
            {
              path: '/exception',
              routes: [
                {
                  path: '/exception/403',
                  component: './exception/403',
                },
                {
                  path: '/exception/404',
                  component: './exception/404',
                },
                {
                  path: '/exception/500',
                  component: './exception/500',
                },
              ],
            },
            {
              path: '/project',
              authority: ['ROLE_ADMIN', 'ROLE_USER'],
              name: 'project',
              routes: [
                {
                  name: 'project-list',
                  path: '/project/list',
                  authority: ['ROLE_ADMIN'],
                  component: './project/project-list',
                },
                {
                  name: 'project-comment',
                  authority: ['ROLE_ADMIN'],
                  path: '/project/comment',
                  component: './project/project-comment',
                },
              ],
            },
            {
              path: '/transaction',
              authority: ['ROLE_ADMIN'],
              name: 'transaction',
              routes: [
                {
                  name: 'transaction-list',
                  path: '/transaction/list',
                  authority: ['ROLE_ADMIN'],
                  component: './transaction/transaction-list',
                },
              ],
            },
            {
              path: '/news',
              name: 'news',
              authority: ['ROLE_ADMIN'],
              routes: [
                {
                  name: 'news-list',
                  authority: ['ROLE_ADMIN'],
                  path: '/news/list',
                  component: './news/news-list',
                },
              ],
            },
            {
              path: '/',
              redirect: '/dashboard/analysis',
              authority: ['ROLE_ADMIN', 'ROLE_USER'],
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  proxy: {
    '/api': {
      target: 'http://localhost:8080/',
      changeOrigin: true,
    },
  },
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
} as IConfig;
