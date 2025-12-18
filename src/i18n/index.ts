import en from "./en.json";
import fi from "./fi.json";
import de from "./de.json";
import sv from "./sv.json";
import nl from "./nl.json";

const dictionaries = {
  en,
  fi,
  de,
  sv,
  nl,
} as const;

export type Lang = keyof typeof dictionaries;

let currentLang: Lang = "en";

export function setLang(lang: Lang) {
  currentLang = lang;
}

export function getLang(): Lang {
  return currentLang;
}

export const langs: Lang[] = Object.keys(dictionaries) as Lang[];

function resolveNestedKey(obj: Record<string, any>, path: string): string | null {
  return (
    path
      .split(".")
      .reduce(
        (acc: any, key: string) =>
          acc && acc[key] !== undefined ? acc[key] : null,
        obj
      ) ?? null
  );
}

export function t(key: string): string {
  const primaryDict = dictionaries[currentLang];
  const fallbackDict = dictionaries.en;

  const value =
    resolveNestedKey(primaryDict, key) ??
    resolveNestedKey(fallbackDict, key);

  return value === null ? key : String(value);
}

