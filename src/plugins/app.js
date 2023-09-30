import { setupLibs } from './lib';
import router from '@/routes';

export const setupApp = (app) => {
  // setup libs
  setupLibs(app);

  // register routes
  router(app);
};
