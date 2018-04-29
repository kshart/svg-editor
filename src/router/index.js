import Vue from 'vue'
import Router from 'vue-router'
import PageProject from '@/components/PageProject'
import Workspace from '@/components/workspace/Workspace'
import StrokeManager from '@/components/workspace/panels/StrokeManager'
// import TestPage from '@/components/TestPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/project/:id',
      name: 'PageProject',
      component: PageProject,
      props: true
    }, {
      path: '/',
      name: 'Workspace',
      component: Workspace,
      props: true
    }, {
      path: '/color',
      name: 'StrokeManager',
      component: StrokeManager,
      props: true
    }
  ],
  mode: 'history'
})
