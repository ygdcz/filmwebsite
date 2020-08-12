export default {
  path: '/film',
  component: () => import('@/views/Film'),
  children: [{
      path: 'city',
      component: () => import('@/components/City')
    },
    {
      path: 'nowplaying',
      component: () => import('@/components/Nowplaying')
    },
    {
      path: 'search',
      compoment: () => import('@/components/Search')
    },
    {
      path: 'comingsoon',
      component: () => import('@/components/Comingsoon')
    },
    {
      path: 'search2',
      component: () => import('@/components/Search2')
    },
    {
      path: '/film',
      redirect: '/film/nowplaying'
    }
  ]
}
