interface DictWord {
  dict?: string;
  word?: string;
}

const DICT_PREFIXES: { [key: string]: string } = {
  '#!': 'm', // 潘世光、博利亞阿法字典
  '#:': 's', // 蔡中涵大辭典
  '#~': 'p', // 方敏英字典
};

export function getDict(hash: string): DictWord {
  const prefix = hash.slice(0, 2);
  const dict = DICT_PREFIXES[prefix];
  if (!dict) {
    return {};
  }

  const word = hash.slice(2);
  return { dict, word };
}
