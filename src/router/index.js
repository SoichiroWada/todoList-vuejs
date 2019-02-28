import Vue from 'vue'
import VueRouter from 'vue-router'
import todoList from '@/components/todoList.vue'
import editView from '@/components/editView.vue'
import deletedList from '@/components/deletedList.vue'
import deletedListEdit from '@/components/deletedListEdit.vue'
import completedList from '@/components/completedList.vue'
import completedListEdit from '@/components/completedListEdit.vue'

Vue.use(VueRouter)


const routes = [
    {
      path: '/',
      name: 'todoList',
      component: todoList
    },
    {
      path: '/edit-view/:id',
      name: 'editView',
      component: editView
    },
    {
      path: '/deleted-list',
      name: 'deletedList',
      component: deletedList
    },
    {
      path: '/deleted-list-edit/:id',
      name: 'deletedListEdit',
      component: deletedListEdit
    },
    {
      path: '/completed-list',
      name: 'completedList',
      component: completedList
    },
    {
      path: '/completed-list-edit/:id',
      name: 'completedListEdit',
      component: completedListEdit
    }
];

const router = new VueRouter({
    routes
});

export default router
