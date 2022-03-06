export interface Entry {
  h: {
    // 沿襲自萌典的 heteronym，本專案中為了盡量與萌典格式接近而保留。
    name?: string; // 字詞名稱，字詞含有大寫時，就會使用 name；若全小寫，則使用 t。
    d: {
      // 定義 definitions，一個詞 (t) 可能會有多個定義。
      f: string; // 解釋 description，一個定義 (d) 只會有一個解釋。
      e?: string[]; // 範例 example，屬於解釋 (f)。
      s?: string[]; // 同義詞 synonym 或 alternative，屬於解釋 (f)。
      r?: string[]; // 參考詞 reference，屬於解釋 (f)，只有蔡中涵大辭典有使用。
      type?: string; // （潘世光、博利亞的字典本來就有的標記，意義待確認，歡迎 PR），只有潘世光、博利亞阿法字典有使用。
    }[];
  }[];
  t: string; // 沿襲自萌典的 title，本專案中就是字詞。
  stem?: string; // 詞幹，只有蔡中涵大辭典有使用。
  tag?: string; // 重疊構詞 repetition，只有蔡中涵大辭典有使用。
}

export interface EntryForm {
  title: string;
  name?: string;
  stem?: string;
  repetition?: string;
  definitions: Definition[];
}

export interface Definition {
  description: string;
  examples?: Example[];
  synonyms?: string[];
  references?: string[];
  type?: string;
}

export interface Example {
  amis?: string;
  en?: string;
  mandarin_fr?: string;
}
