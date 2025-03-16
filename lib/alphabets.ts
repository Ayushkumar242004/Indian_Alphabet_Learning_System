export interface Alphabet {
  character: string;
  name: string;
  pronunciation: string;
  audio: string;
  strokes: string[];
}

// Complete Hindi Alphabet System
export const alphabets: Alphabet[] = [
  { character: "अ", name: "अ (a)", pronunciation: "Pronounced as 'a' in 'about'", audio: "hindi_अ.mp3", strokes: [] },
  { character: "आ", name: "आ (aa)", pronunciation: "Pronounced as 'a' in 'father'", audio: "hindi_आ.mp3", strokes: [] },
  { character: "इ", name: "इ (i)", pronunciation: "Pronounced as 'i' in 'sit'", audio: "hindi_इ.mp3", strokes: [] },
  { character: "ई", name: "ई (ee)", pronunciation: "Pronounced as 'ee' in 'feet'", audio: "hindi_ई.mp3", strokes: [] },
  { character: "उ", name: "उ (u)", pronunciation: "Pronounced as 'u' in 'put'", audio: "hindi_उ.mp3", strokes: [] },
  { character: "ऊ", name: "ऊ (oo)", pronunciation: "Pronounced as 'oo' in 'boot'", audio: "hindi_ऊ.mp3", strokes: [] },
  { character: "ए", name: "ए (e)", pronunciation: "Pronounced as 'e' in 'bed'", audio: "hindi_ए.mp3", strokes: [] },
  { character: "ऐ", name: "ऐ (ai)", pronunciation: "Pronounced as 'ai' in 'fair'", audio: "hindi_ऐ.mp3", strokes: [] },
  { character: "ओ", name: "ओ (o)", pronunciation: "Pronounced as 'o' in 'go'", audio: "hindi_ओ.mp3", strokes: [] },
  { character: "औ", name: "औ (au)", pronunciation: "Pronounced as 'au' in 'caught'", audio: "hindi_औ.mp3", strokes: [] },
  { character: "अं", name: "अं (am)", pronunciation: "Pronounced as 'um' in 'umbrella'", audio: "hindi_अं.mp3", strokes: [] },
  { character: "अः", name: "अः (ah)", pronunciation: "Aspirated 'ah' sound", audio: "hindi_अः.mp3", strokes: [] },
  { character: "क", name: "क (ka)", pronunciation: "Pronounced as 'k' in 'kite'", audio: "hindi_क.mp3", strokes: [] },
  { character: "ख", name: "ख (kha)", pronunciation: "Pronounced as 'kh' in 'Khalid'", audio: "hindi_ख.mp3", strokes: [] },
  { character: "ग", name: "ग (ga)", pronunciation: "Pronounced as 'g' in 'go'", audio: "hindi_ग.mp3", strokes: [] },
  { character: "घ", name: "घ (gha)", pronunciation: "Pronounced as 'gh' in 'ghost'", audio: "hindi_घ.mp3", strokes: [] },
  { character: "ङ", name: "ङ (nga)", pronunciation: "Nasal sound 'nga'", audio: "hindi_ङ.mp3", strokes: [] },
  { character: "च", name: "च (cha)", pronunciation: "Pronounced as 'ch' in 'chair'", audio: "hindi_च.mp3", strokes: [] },
  { character: "छ", name: "छ (chha)", pronunciation: "Pronounced as 'chh' in 'church'", audio: "hindi_छ.mp3", strokes: [] },
  { character: "ज", name: "ज (ja)", pronunciation: "Pronounced as 'j' in 'jug'", audio: "hindi_ज.mp3", strokes: [] },
  { character: "झ", name: "झ (jha)", pronunciation: "Pronounced as 'jh' in 'jhula'", audio: "hindi_झ.mp3", strokes: [] },
  { character: "ञ", name: "ञ (nya)", pronunciation: "Nasal sound 'nya'", audio: "hindi_ञ.mp3", strokes: [] },
  { character: "ट", name: "ट (ṭa)", pronunciation: "Pronounced as 't' in 'tame' (retroflex)", audio: "hindi_ट.mp3", strokes: [] },
  { character: "ठ", name: "ठ (ṭha)", pronunciation: "Aspirated 'ṭha'", audio: "hindi_ठ.mp3", strokes: [] },
  { character: "ड", name: "ड (ḍa)", pronunciation: "Pronounced as 'd' in 'doll' (retroflex)", audio: "hindi_ड.mp3", strokes: [] },
  { character: "ढ", name: "ढ (ḍha)", pronunciation: "Aspirated 'ḍha'", audio: "hindi_ढ.mp3", strokes: [] },
  { character: "ण", name: "ण (ṇa)", pronunciation: "Retroflex nasal sound 'ṇa'", audio: "hindi_ण.mp3", strokes: [] },
  { character: "त", name: "त (ta)", pronunciation: "Pronounced as 't' in 'table' (dental)", audio: "hindi_त.mp3", strokes: [] },
  { character: "थ", name: "थ (tha)", pronunciation: "Aspirated 'tha'", audio: "hindi_थ.mp3", strokes: [] },
  { character: "द", name: "द (da)", pronunciation: "Pronounced as 'd' in 'dog' (dental)", audio: "hindi_द.mp3", strokes: [] },
  { character: "न", name: "न (na)", pronunciation: "Pronounced as 'n' in 'name'", audio: "hindi_न.mp3", strokes: [] },
  { character: "प", name: "प (pa)", pronunciation: "Pronounced as 'p' in 'pen'", audio: "hindi_प.mp3", strokes: [] },
  { character: "फ", name: "फ (pha)", pronunciation: "Pronounced as 'ph' in 'phone'", audio: "hindi_फ.mp3", strokes: [] },
  { character: "ब", name: "ब (ba)", pronunciation: "Pronounced as 'b' in 'bat'", audio: "hindi_ब.mp3", strokes: [] },
  { character: "म", name: "म (ma)", pronunciation: "Pronounced as 'm' in 'man'", audio: "hindi_म.mp3", strokes: [] },
  { character: "य", name: "य (ya)", pronunciation: "Pronounced as 'y' in 'yes'", audio: "hindi_य.mp3", strokes: [] },
  { character: "र", name: "र (ya)", pronunciation: "Pronounced as 'r' in 'rat'", audio:"hindi_र.mp3", strokes: [] },
  { character: "ल", name: "ल (la)", pronunciation: "Pronounced as 'l' in 'lion'", audio: "hindi_ल.mp3", strokes: [] },
  { character: "व", name: "व (wa)", pronunciation: "Pronounced as 'व' in 'what'", audio: "hindi_व.mp3", strokes: [] },
  { character: "श", name: "श (sha)", pronunciation: "Pronounced as 'श' in 'shore'", audio: "hindi_श.mp3", strokes: [] },
  { character: "ष", name: "ष (shha)", pronunciation: "Pronounced as 'ष' in 'she'", audio: "hindi_ष.mp3", strokes: [] },
  { character: "स", name: "स (sa)", pronunciation: "Pronounced as 'स' in 'sale'", audio: "hindi_स.mp3", strokes: [] },
  { character: "ह", name: "ह (ha)", pronunciation: "Pronounced as 'ह' in 'hi'", audio: "hindi_ह.mp3", strokes: [] },
  { character: "क्ष", name: "क्ष (cha)", pronunciation: "Pronounced as 'क्ष' in 'chip'", audio:"hindi_क्ष.mp3", strokes: [] },
  { character: "त्र", name: "त्र (tra)", pronunciation: "Pronounced as 'त्र' in 'try'", audio: "hindi_त्र.mp3", strokes: [] },
  { character: "ज्ञ", name: "ज्ञ (gya)", pronunciation: "Pronounced as 'ज्ञ' in 'gyan'", audio: "hindi_ज्ञ.mp3", strokes: [] },

];
