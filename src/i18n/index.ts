import en from './en.json'
import fi from './fi.json'
import de from './de.json'
import sv from './sv.json'
import nl from './nl.json'

const dictionaries: Record<string, Record<string,string>> = { en, fi, de, sv, nl }
export type Lang = keyof typeof dictionaries

let current: Lang = 'en'
export function setLang(l: Lang){ current = l }
export function t(key: string){
  const dict = dictionaries[current] || dictionaries['en']
  return dict[key] || key
}
export const langs: Lang[] = ['en','fi','de','sv','nl']
