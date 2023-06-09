import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    children : [
        {
          path : 'IntellgentBuilding',
          component : ()  => import('../views/IntellgentBuilding.vue')
        },
        {
          path : 'BuildingMessage',
          component : () => import('../views/BuildingMessage.vue')
        },{
          path : 'IntellgentBuildingReceipt',
          component : () => import('../views/IntellgentBuildingReceipt.vue')
        },{
          path : 'LabelTimeLimit',
          component : () => import('../views/LabelTimeLimit.vue')
        }
    ]
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
