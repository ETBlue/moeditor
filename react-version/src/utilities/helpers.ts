import {
  DRAFT_FOLDER_URL,
  DICT_PREFIXES,
  AMIS_EXAMPLE_PREFIX,
  EN_EXAMPLE_PREFIX,
  MANDARIN_FR_EXAMPLE_PREFIX,
} from './config';
import { Entry, EntryForm } from './types';

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

export function removeSegmentMarkers(str: string): string {
  return str.replace(/`/g, '').replace(/~/g, '');
}

export function convertToForm(data: Entry): EntryForm {
  const { h, t, stem, tag } = data;
  const heteronyms = h.map((heteronym) => {
    const { name, d } = heteronym;
    const definitions = d.map((def) => {
      const { f, e, s, r, type } = def;

      const examples = e?.map(removeSegmentMarkers).map((example) => {
        const [prefixAmisEn, mandarin_fr] = example.split(/\uFFFB/);
        const [prefixAmis, en] = prefixAmisEn.split(/\uFFFA/);
        const [, amis] = prefixAmis.split(/\uFFF9/);
        return { amis, en, mandarin_fr };
      });

      const synonyms = s?.map(removeSegmentMarkers);
      const references = r?.map(removeSegmentMarkers);
      return {
        description: f,
        examples,
        synonyms,
        references,
        type,
      };
    });

    return {
      name,
      definitions,
    };
  });

  return {
    title: t || '',
    stem,
    repetition: tag,
    heteronyms,
  };
}

export function convertToJson(data: EntryForm): Entry {
  const { heteronyms, repetition, stem, title } = data;

  const h = heteronyms.map((heteronym) => {
    const { definitions, name } = heteronym;

    const d = definitions.map((def) => {
      const { description, examples, synonyms, references, type } = def;

      const e = examples
        ?.map((example) => {
          const { amis, en, mandarin_fr } = example;
          return `${AMIS_EXAMPLE_PREFIX}${amis}${EN_EXAMPLE_PREFIX}${en}${MANDARIN_FR_EXAMPLE_PREFIX}${mandarin_fr}`;
        })
        .filter((e) => !!e);
      const s = synonyms?.filter((s) => !!s);
      const r = references?.filter((r) => !!r);

      return {
        f: description,
        e,
        s,
        r,
        type,
      };
    });

    return { d, name };
  });

  return {
    h,
    tag: repetition,
    stem,
    t: title,
  };
}
