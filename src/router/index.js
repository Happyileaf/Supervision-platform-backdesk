import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/pages/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        // component: () => import('@/pages/dashboard/index'),
        component: () => import('@/pages/index/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/account_management',
    component: Layout,
    redirect: '/account_management/account_management/system_administrator/general_administrator',
    name: 'account_management',
    meta: {
      title: '账号管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'system_administrator',
        component: () => import('@/pages/common/blank'), // Parent router-view
        name: 'System_administrator',
        meta: { title: '系统管理员' },
        redirect: '/account_management/system_administrator/general_administrator',
        children: [
          {
            path: 'general_administrator',
            component: () => import('@/pages/account_management/general_administrator_table'),
            name: 'General_administrator',
            meta: { title: '普通管理员' }
          },
          {
            path: 'super_administrator',
            component: () => import('@/pages/account_management/super_administrator_table'),
            name: 'Super_administrator',
            // redirect: '/account_management/menu1/menu1-2/menu1-2-1',
            meta: { title: '超级管理员' },
            children: [
            ]
          },
        ]
      },
      {
        path: 'enterprise_user',
        name: 'Enterprise_user',
        component: () => import('@/pages/account_management/enterprise_user_table'),
        meta: { title: '企业用户' }
      }
    ]
  },

  // {
  //   path: '/permissions_management',
  //   component: Layout,
  //   redirect: '/permissions_management/menu1/menu1-1',
  //   name: 'permissions_management',
  //   meta: {
  //     title: '权限管理',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: '普通管理员' },
  //       // redirect: '/permissions_management/menu1/menu1-1',
  //       children: [
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       name: 'Menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: '超级管理员' }
  //     }
  //   ]
  // },
  {
    path: '/content_distribution',
    component: Layout,
    redirect: '/content_distribution/project_information',
    name: 'content_distribution',
    meta: {
      title: '内容发布',
      icon: 'nested'
    },
    children: [
      {
        path: 'project_information',
        component: () => import('@/pages/content_distribution/Project_information'), // Parent router-view
        name: 'Project_information',
        meta: { title: '项目资讯' },
        // redirect: '/content_distribution/menu1/menu1-1',
        children: [
        ]
      },
      {
        path: 'major_project',
        component: () => import('@/pages/content_distribution/list copy'),
        name: 'Major_project',
        meta: { title: '重点项目' }
      },
      {
        path: 'open_government',
        component: () => import('@/pages/common/blank'), // Parent router-view
        name: 'Open_government',
        meta: { title: '政务公开' },
        // redirect: '/content_distribution/menu1/menu1-1',
        children: [
          {
            path: 'latest_government_affairs',
            component: () => import('@/pages/account_management/general_administrator_table'),
            name: 'Latest_government_affairs',
            meta: { title: '最新政务' }
          },
          {
            path: 'daily_sound',
            component: () => import('@/pages/account_management/super_administrator_table'),
            name: 'Daily_sound',
            // redirect: '/account_management/menu1/menu1-2/menu1-2-1',
            meta: { title: '每日一听' },
            children: [
            ]
          },
          {
            path: 'picture_policy',
            component: () => import('@/pages/account_management/super_administrator_table'),
            name: 'Picture_policy',
            // redirect: '/account_management/menu1/menu1-2/menu1-2-1',
            meta: { title: '图画政务' },
            children: [
            ]
          },
        ]
      },
      {
        path: 'create',
        component: () => import('@/pages/content_distribution/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/pages/content_distribution/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
    ]
  },
  {
    path: '/basic_data',
    component: Layout,
    redirect: '/basic_data/menu1/menu1-1',
    name: 'basic_data',
    meta: {
      title: '基础数据',
      icon: 'nested'
    },
    children: [
      {
        path: 'project_data',
        component: () => import('@/pages/basic_data/project_data/project_data_list'), // Parent router-view
        name: 'Project_data',
        meta: { title: '项目数据' },
        // redirect: '/basic_data/menu1/menu1-1',
        children: [
        ]
      },
      {
        path: 'project_data_detail',
        component: () => import('@/pages/basic_data/project_data/project_data_detail'), // Parent router-view
        name: 'Project_data_detail',
        meta: { title: '详情' },
        // redirect: '/basic_data/menu1/menu1-1',
        children: [
        ]
      },
      {
        path: 'Area_data',
        name: 'Area_data',
        component: () => import('@/pages/nested/menu2/index'),
        meta: { title: '地区数据' }
      },
      // {
      //   path: 'enterprise_data',
      //   component: () => import('@/pages/nested/menu1/index'), // Parent router-view
      //   name: 'Enterprise_data',
      //   meta: { title: '企业数据' },
      //   // redirect: '/basic_data/menu1/menu1-1',
      //   children: [
      //   ]
      // },
    ]
  },
  {
    path: '/statistical_analysis',
    component: Layout,
    redirect: '/statistical_analysis/menu1/menu1-1',
    name: 'statistical_analysis',
    meta: {
      title: '统计分析',
      icon: 'nested'
    },
    children: [
      // {
      //   path: 'menu1',
      //   component: () => import('@/views/nested/menu1/index'), // Parent router-view
      //   name: 'Menu1',
      //   meta: { title: '项目资讯' },
      //   // redirect: '/statistical_analysis/menu1/menu1-1',
      //   children: [
      //   ]
      // },
      // {
      //   path: 'menu2',
      //   name: 'Menu2',
      //   component: () => import('@/views/nested/menu2/index'),
      //   meta: { title: '重点项目' }
      // },
      // {
      //   path: 'menu3',
      //   component: () => import('@/views/nested/menu1/index'), // Parent router-view
      //   name: 'Menu1',
      //   meta: { title: '政务公开' },
      //   // redirect: '/statistical_analysis/menu1/menu1-1',
      //   children: [
      //   ]
      // },
      {
        path: 'menu1',
        component: () => import('@/pages/dashboard/index'),
        // component: () => import('@/pages/index/index'),
        name: 'statistical_analysis_index',
        meta: { title: '统计分析', icon: 'dashboard', }
      }
    ]
  },
  {
    path: '/predefined',
    component: Layout,
    // redirect: '/nested/menu1/menu1-1',
    name: 'Predefined',
    meta: {
      title: '系统预定义',
      icon: 'nested'
    },
    children: [

    ]
  },








































  //系统原有路由
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'mergeHeader' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'pdf', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
