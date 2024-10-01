import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdef', 10);


export const generateId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = nanoid();
  return `${timestamp}-${randomStr}`;
};