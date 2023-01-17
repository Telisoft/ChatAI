import { lazy } from 'react';

const ChatAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/',
      component: lazy(() => import('./ChatApp')),
    },
  ],
};

export default ChatAppConfig;
