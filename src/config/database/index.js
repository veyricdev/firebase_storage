/* eslint-disable no-unused-vars */
import { Db, MongoClient } from 'mongodb';
import { MONGO_DB_NAME, MONGO_URL } from '../env';
import { A_SECOND } from '../constants';

const TIME_OUT = 60000;
const MAX_CONNECT_RETRY = 3;
export const client = new MongoClient(MONGO_URL, {
  minPoolSize: 10,
  maxPoolSize: 20,
  maxConnecting: 10,
  serverSelectionTimeoutMS: TIME_OUT,
  connectTimeoutMS: TIME_OUT,
  socketTimeoutMS: TIME_OUT,
  maxIdleTimeMS: TIME_OUT,
});

/**
 * It connects to the database
 */
export class DB {
  /**
   * @type {Db}
   */
  static instance;

  // connect
  async connect(connectCount = 0) {
    try {
      await client.connect();
      const db = client.db(MONGO_DB_NAME);
      console.log('DB:::: connect successfully!');

      return db;
    } catch (e) {
      console.error('DB::: connect failure!', e);

      // retry connect db when connect fail
      if (connectCount < MAX_CONNECT_RETRY) {
        setTimeout(
          async () => {
            await this.connect(connectCount + 1);
          },
          connectCount * 3 * A_SECOND + Math.random() * A_SECOND
        );
        return;
      }
      process.exit(0);
    }
  }

  /**
   * get instance
   * @returns {Promise<Db>} Promise<db>
   */
  static async getInstance() {
    const db = new DB();

    if (!DB.instance) DB.instance = await db.connect();

    return DB.instance;
  }
}

export const disconnectDB = async () => {
  await client.close();
};
