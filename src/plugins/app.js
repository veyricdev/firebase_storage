import { setupLibs } from './lib';
import { DB } from '@/config/database';
import router from '@/routes';

export const setupApp = async (app) => {
  // setup libs
  setupLibs(app);

  await DB.getInstance();

  // register routes
  router(app);
};
