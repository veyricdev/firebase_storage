import { DB } from '@/config/database';
import { toObjectId } from '@/utils';

export class UploadModel {
  COLLECTION_NAME = 'uploads';
  COLLECTION = () => DB.instance.collection(this.COLLECTION_NAME);

  async list({ limit = 20, page = 1 }) {
    const result = await this.COLLECTION()
      .find({})
      .skip(page - 1)
      .limit(limit)
      .toArray();

    return result;
  }

  async store(data) {
    const result = await this.COLLECTION().insertOne(data);

    if (result.insertedId) return await this.COLLECTION().findOne({ _id: result.insertedId });

    return null;
  }

  async findById(id) {
    const result = await this.COLLECTION().findOne({ _id: toObjectId(id) });

    return result;
  }

  async destroy(id) {
    const result = await this.COLLECTION().findOneAndDelete({ _id: toObjectId(id) });

    return result;
  }
}

export default new UploadModel();
