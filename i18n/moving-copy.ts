import type { Locale } from "@/i18n/config";

const movingCopy: Record<Locale, { title: string; description: string }> = {
  uk: { title: "Переїзди", description: "Дбайливо перевозимо меблі та особисті речі по Швейцарії й за кордон — між квартирами, будинками та офісами." },
  en: { title: "Moving", description: "We carefully transport furniture and personal belongings throughout Switzerland and abroad, between homes and offices." },
  de: { title: "Umzüge", description: "Wir transportieren Möbel und persönliche Gegenstände sorgfältig innerhalb der Schweiz und ins Ausland – zwischen Wohnungen, Häusern und Büros." },
  fr: { title: "Déménagements", description: "Nous transportons avec soin meubles et effets personnels dans toute la Suisse et à l’étranger, entre logements, maisons et bureaux." },
  it: { title: "Traslochi", description: "Trasportiamo con cura mobili ed effetti personali in tutta la Svizzera e all’estero, tra appartamenti, case e uffici." },
  et: { title: "Kolimine", description: "Transpordime mööblit ja isiklikke esemeid hoolikalt kogu Šveitsis ning välismaale, kodude ja kontorite vahel." },
  pl: { title: "Przeprowadzki", description: "Ostrożnie przewozimy meble i rzeczy osobiste na terenie Szwajcarii oraz za granicę — między mieszkaniami, domami i biurami." },
  lt: { title: "Perkraustymas", description: "Rūpestingai pervežame baldus ir asmeninius daiktus visoje Šveicarijoje bei į užsienį — tarp būstų, namų ir biurų." },
  lv: { title: "Pārcelšanās", description: "Saudzīgi pārvadājam mēbeles un personīgās mantas visā Šveicē un uz ārvalstīm — starp dzīvokļiem, mājām un birojiem." },
  cs: { title: "Stěhování", description: "Pečlivě přepravujeme nábytek a osobní věci po celém Švýcarsku i do zahraničí — mezi byty, domy a kancelářemi." },
  es: { title: "Mudanzas", description: "Transportamos con cuidado muebles y pertenencias por toda Suiza y al extranjero, entre viviendas, casas y oficinas." },
  tr: { title: "Taşınma", description: "Mobilya ve kişisel eşyalarınızı İsviçre genelinde ve yurt dışına, evler ve ofisler arasında özenle taşıyoruz." },
  ar: { title: "خدمات النقل", description: "ننقل الأثاث والمقتنيات الشخصية بعناية داخل سويسرا وإلى الخارج، بين الشقق والمنازل والمكاتب." },
  "nl-BE": { title: "Verhuizingen", description: "We vervoeren meubels en persoonlijke spullen zorgvuldig door heel Zwitserland en naar het buitenland, tussen woningen en kantoren." },
  sk: { title: "Sťahovanie", description: "Nábytok a osobné veci starostlivo prepravíme po celom Švajčiarsku aj do zahraničia — medzi bytmi, domami a kanceláriami." },
  hu: { title: "Költöztetés", description: "Bútorokat és személyes tárgyakat gondosan szállítunk Svájc egész területén és külföldre, otthonok és irodák között." },
  ro: { title: "Mutări", description: "Transportăm cu grijă mobilier și bunuri personale în toată Elveția și în străinătate, între locuințe și birouri." },
  sr: { title: "Селидбе", description: "Пажљиво превозимо намештај и личне ствари широм Швајцарске и у иностранство, између станова, кућа и канцеларија." },
  bg: { title: "Преместване", description: "Превозваме внимателно мебели и лични вещи в цяла Швейцария и в чужбина — между жилища, къщи и офиси." },
};

export function getMovingCopy(locale: Locale) {
  return movingCopy[locale];
}
