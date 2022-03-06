import {
  DRAFT_FOLDER_URL,
  DICT_PREFIXES,
} from './config';
interface DictWord {
  dict?: string;
  word?: string;
}

export function getDictWord(hash: string): DictWord {
  const prefix = hash.slice(0, 2);
  const dict = DICT_PREFIXES[prefix];
  if (!dict) {
    return {};
  }

  const word = hash.slice(2);
  return { dict, word };
}

export function getJSONUrl({ dict, word }: DictWord): string {
  return `${DRAFT_FOLDER_URL}/${dict}/${word}.json`;
}

