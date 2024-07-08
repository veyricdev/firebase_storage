import path from 'node:path';
import { ObjectId } from 'mongodb';

export const errorResponse = (error) => {
  const errorResponseData = {
    result: 0,
    isLogger: true,
    msg: 'Server error!',
  };
  return { ...errorResponseData, ...error };
};

/** slug generator */
export const slugify = (str, prefix = '-') =>
  String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[đ]/g, 'd') // change đ to d
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, prefix) // replace spaces with hyphens
    .replace(/-+/g, prefix); // remove consecutive hyphens +

export const giveCurrentDateTime = () => {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const time = `${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;
  const dateTime = `${date}-${time}`;
  return dateTime;
};

export const toObjectId = (str) => (typeof str === 'object' ? str : ObjectId.createFromHexString(str));

export function getSize(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

export function getFileName(fileName) {
  return fileName.substring(0, fileName.lastIndexOf('.'));
}

export function getExtname(fileName) {
  return path.extname(fileName).replace('.', '');
}
