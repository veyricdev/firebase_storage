import { NODE_ENV, WHITELIST_DOMAINS_URL } from '../env';

export const A_SECOND = 1000;
export const RESULT_FAIL = 0;
export const RESULT_OK = 1;

export const IS_PROD = NODE_ENV.includes('prod');

export const WHITELIST_DOMAINS = [...WHITELIST_DOMAINS_URL.split(',')];
