export const entry = {
  // https://amis.moedict.tw/#!a
  h: [
    {
      d: [
        {
          e: [
            "￹A ma'orad ano dafak.￻il pleuvra demain.",
            '￹A komaen kako.￻je vais manger.',
            "￹Tayra kako a misalama.￻j'irai (je vais) m'amuser.",
          ],
          f: 'futur : la particule "a" placée devant un verbe marque le futur',
        },
        {
          e: [
            "￹O fagcalay a tamdaw konian.￻C'est un brave homme.",
            "￹O ga'ayay a holo'.￻le riz est bon.",
          ],
          f: 'être : particule de liaison entre un adjectif en ay et un nom',
        },
        {
          e: ['￹Potawan a ci Parih.￻Potawan et Parih.'],
          f: 'et : particule de liaison entre deux noms',
        },
        {
          e: [
            '￹Padagen cigra a mihinam to kolog.￻aide la à chercher les buffles.',
          ],
          f: 'pour; à',
        },
      ],
    },
  ],
  t: 'a',
};

const entryM = {
  h: [
    { d: [{ s: ["`'ad'ad~", '`wadwad~'], f: 'étaler : (pour faire sécher)' }] },
  ],
  t: "'a'ad",
};

const entryS = {
  t: "'a'owi",
  h: [
    { d: [{ f: '重量偏向一邊，翹起來。', r: ["`ma'a'owi~"] }] },
    { d: [{ f: '重量偏向一邊，翹起來。', r: ["`ma'a'owi~"] }] },
  ],
};

export const entryFormData = {
  definitions: [
    {
      examples: [
        {
          amis: "A ma'orad ano dafak.",
          mandarin_fr: 'il pleuvra demain.',
        },
        {
          amis: 'A komaen kako.',
          mandarin_fr: 'je vais manger.',
        },
        {
          amis: 'Tayra kako a misalama.',
          mandarin_fr: "j'irai (je vais) m'amuser.",
        },
      ],
      description:
        'futur : la particule "a" placée devant un verbe marque le futur',
    },
    {
      examples: [
        {
          amis: 'O fagcalay a tamdaw konian.',
          mandarin_fr: "C'est un brave homme.",
        },
        {
          amis: "O ga'ayay a holo'.",
          mandarin_fr: 'le riz est bon.',
        },
      ],
      description:
        'être : particule de liaison entre un adjectif en ay et un nom',
    },
    {
      examples: [
        {
          amis: 'Potawan a ci Parih.',
          mandarin_fr: 'Potawan et Parih.',
        },
      ],
      description: 'et : particule de liaison entre deux noms',
    },
    {
      examples: [
        {
          amis: 'Padagen cigra a mihinam to kolog.',
          mandarin_fr: 'aide la à chercher les buffles.',
        },
      ],
      description: 'pour; à',
    },
  ],
  word: 'a',
};
