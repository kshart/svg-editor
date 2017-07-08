import Vue from 'vue'
import Router from 'vue-router'
import MenuProjects from '@/components/MenuProjects'
import PageProject from '@/components/PageProject'
import Workspace from '@/components/workspace/Workspace'
// import TestPage from '@/components/TestPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/project',
      name: 'MenuProjects',
      component: MenuProjects
    },
    {
      path: '/project/:id',
      name: 'PageProject',
      component: PageProject,
      props: true
    },
    {
      path: '/test',
      name: 'Workspace',
      component: Workspace,
      props: true
    }
  ]
})
