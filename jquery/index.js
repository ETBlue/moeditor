var definitionInput = $('<label>定義</label><input type="text" name="h.d.f">')

$(window).on("load", () => {

})

// type Entry = {
//   h: {
//     name?: string,
//     d: {
//       f: string,
//       e?: string[],
//       s?: string[],
//       r?: string[],
//       type?: string
//     }[]
//   }[],
//   t: string,
//   stem?: string,
//   tag?: string,
// };

//  h：沿襲自萌典的 heteronym，本專案中為了盡量與萌典格式接近而保留。
//      name：字詞名稱，字詞含有大寫時，就會使用 name；若全小寫，則使用 t。
//      d：定義 definitions，一個詞 (t) 可能會有多個定義。
//          f：解釋 description，一個定義 (d) 只會有一個解釋。
//          e：範例 example，屬於解釋 (f)。
//          s：同義詞 synonym 或 alternative，屬於解釋 (f)。
//          r：參考詞 reference，屬於解釋 (f)，只有蔡中涵大辭典有使用。。
//          type：（潘世光、博利亞的字典本來就有的標記，意義待確認，歡迎 PR），只有潘世光、博利亞阿法字典有使用。
//  t：沿襲自萌典的 title，本專案中就是字詞。
//  stem：詞幹，只有蔡中涵大辭典有使用。
//  tag：重疊構詞 repetition，只有蔡中涵大辭典有使用。

