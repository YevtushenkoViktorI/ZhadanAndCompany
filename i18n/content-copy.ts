import type { Locale } from "./config";

type WorkItem = { city: string; category: string; title: string; description: string };
type ContentCopy = {
  worksDescription: string; workItems: WorkItem[]; aboutTitle: string; aboutBody: string;
  geography: string; geographyLabel: string; benefits: string[];
};

const english: ContentCopy = {
  worksDescription: "Examples of moves, deliveries, furniture assembly and cleaning in the Canton of Bern.",
  workItems: [
    { city: "Bern", category: "Moving", title: "3.5-room apartment move", description: "Careful packing, protective blankets and carrying everything to the third floor." },
    { city: "Thun", category: "Cleaning", title: "End-of-tenancy cleaning", description: "Deep cleaning of windows, kitchen and bathroom before the handover." },
    { city: "Köniz", category: "Assembly", title: "Wardrobe assembly", description: "Delivery, accurate assembly and removal of packaging materials." },
    { city: "Burgdorf", category: "Moving", title: "House move", description: "Coordinated transport of household items, furniture and appliances." },
    { city: "Biel", category: "Cleaning", title: "Deep kitchen cleaning", description: "Degreasing appliances, extractor filters and glass surfaces." },
    { city: "Interlaken", category: "Delivery", title: "Appliance delivery", description: "Safe transport and carrying of large household appliances." },
  ],
  aboutTitle: "People you can trust with your belongings",
  aboutBody: "We help people organise moves, deliver large purchases, assemble new furniture and leave homes in excellent condition. Every order is agreed in advance and handled with care.",
  geographyLabel: "Service area",
  geography: "Our main daily service area is the Canton of Bern. Requests in other cantons are considered individually.",
  benefits: ["Personal agreement on price and conditions", "Careful handling of furniture and fragile items", "Communication in several languages"],
};

const translations: Partial<Record<Locale, ContentCopy>> = {
  uk: {
    worksDescription: "Приклади переїздів, доставок, складання меблів і прибирань у кантоні Берн.",
    workItems: [
      { city: "Берн", category: "Переїзд", title: "Переїзд квартири 3.5 кімнати", description: "Акуратне пакування, захисні ковдри та занесення речей на третій поверх." },
      { city: "Тун", category: "Прибирання", title: "Прибирання після виїзду", description: "Глибоке очищення вікон, кухні та санвузла перед передачею житла." },
      { city: "Кеніц", category: "Складання", title: "Складання гардеробу", description: "Доставка, точне складання та вивезення пакувальних матеріалів." },
      { city: "Бургдорф", category: "Переїзд", title: "Переїзд приватного будинку", description: "Злагоджене перевезення речей, меблів і побутової техніки." },
      { city: "Біль", category: "Прибирання", title: "Генеральне прибирання кухні", description: "Знежирення техніки, фільтрів витяжки та скляних поверхонь." },
      { city: "Інтерлакен", category: "Доставка", title: "Доставка побутової техніки", description: "Безпечне транспортування та занесення великої побутової техніки." },
    ],
    aboutTitle: "Люди, яким можна довірити свої речі",
    aboutBody: "Допомагаємо організувати переїзд, доставити великі покупки, зібрати нові меблі та привести житло до бездоганного стану. Усі умови узгоджуємо заздалегідь і дбайливо працюємо з майном.",
    geographyLabel: "Географія сервісу",
    geography: "Основний регіон щоденної роботи — кантон Берн. Замовлення в інших кантонах розглядаємо індивідуально.",
    benefits: ["Особисте узгодження вартості та умов", "Дбайливе поводження з меблями й крихкими речами", "Зручне спілкування кількома мовами"],
  },
  de: {
    ...english,
    worksDescription: "Beispiele für Umzüge, Lieferungen, Möbelmontage und Reinigung im Kanton Bern.",
    aboutTitle: "Menschen, denen Sie Ihre Sachen anvertrauen können",
    aboutBody: "Wir organisieren Umzüge, liefern große Einkäufe, montieren Möbel und bringen Wohnungen in einen einwandfreien Zustand. Alle Bedingungen werden vorab vereinbart.",
    geographyLabel: "Einsatzgebiet",
    geography: "Unser tägliches Einsatzgebiet ist der Kanton Bern. Aufträge in anderen Kantonen prüfen wir individuell.",
    benefits: ["Persönliche Vereinbarung von Preis und Bedingungen", "Sorgfältiger Umgang mit Möbeln und empfindlichen Gegenständen", "Kommunikation in mehreren Sprachen"],
  },
};

export function getContentCopy(locale: Locale): ContentCopy {
  return translations[locale] ?? english;
}
