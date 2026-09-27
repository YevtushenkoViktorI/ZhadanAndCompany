import type { Locale } from "./config";

type ContactCopy = {
  description: string;
  phone: string;
  email: string;
  area: string;
  areaValue: string;
  hours: string;
  hoursValue: string;
  call: string;
  message: string;
  demo: string;
};

const english: ContactCopy = {
  description: "Tell us what you need help with. We will clarify the details, agree on a convenient time and prepare a personal offer.",
  phone: "Phone", email: "Email", area: "Service area", areaValue: "Bern and surrounding areas",
  hours: "Working hours", hoursValue: "Monday–Saturday, 08:00–19:00",
  call: "Call us", message: "Write on WhatsApp", demo: "Demo contact details — to be replaced before launch",
};

const translations: Partial<Record<Locale, ContactCopy>> = {
  uk: {
    description: "Розкажіть, з чим вам потрібна допомога. Ми уточнимо деталі, погодимо зручний час і підготуємо персональну пропозицію.",
    phone: "Телефон", email: "Електронна пошта", area: "Регіон роботи", areaValue: "Берн та околиці",
    hours: "Години роботи", hoursValue: "Понеділок–субота, 08:00–19:00",
    call: "Зателефонувати", message: "Написати у WhatsApp", demo: "Демонстраційні контакти — перед запуском їх потрібно замінити",
  },
  de: {
    description: "Sagen Sie uns, wobei Sie Hilfe benötigen. Wir klären die Details, vereinbaren einen passenden Termin und erstellen ein persönliches Angebot.",
    phone: "Telefon", email: "E-Mail", area: "Einsatzgebiet", areaValue: "Bern und Umgebung",
    hours: "Arbeitszeiten", hoursValue: "Montag–Samstag, 08:00–19:00",
    call: "Anrufen", message: "Auf WhatsApp schreiben", demo: "Demokontakte – vor dem Start ersetzen",
  },
  fr: { ...english, description: "Dites-nous comment nous pouvons vous aider. Nous préciserons les détails, conviendrons d’un horaire et préparerons une offre personnalisée.", phone: "Téléphone", area: "Zone d’intervention", areaValue: "Berne et environs", hours: "Horaires", hoursValue: "Lundi–samedi, 08:00–19:00", call: "Appeler", message: "Écrire sur WhatsApp", demo: "Coordonnées de démonstration – à remplacer avant le lancement" },
  it: { ...english, description: "Diteci di cosa avete bisogno. Definiremo i dettagli, concorderemo un orario e prepareremo un’offerta personalizzata.", phone: "Telefono", area: "Zona di servizio", areaValue: "Berna e dintorni", hours: "Orari", hoursValue: "Lunedì–sabato, 08:00–19:00", call: "Chiama", message: "Scrivi su WhatsApp", demo: "Contatti dimostrativi – sostituire prima del lancio" },
  pl: { ...english, description: "Powiedz nam, w czym możemy pomóc. Ustalimy szczegóły, dogodny termin i przygotujemy indywidualną ofertę.", phone: "Telefon", area: "Obszar działania", areaValue: "Berno i okolice", hours: "Godziny pracy", hoursValue: "Poniedziałek–sobota, 08:00–19:00", call: "Zadzwoń", message: "Napisz na WhatsApp", demo: "Dane demonstracyjne – należy je zmienić przed uruchomieniem" },
  es: { ...english, description: "Cuéntenos en qué necesita ayuda. Aclararemos los detalles, acordaremos un horario y prepararemos una oferta personalizada.", phone: "Teléfono", area: "Zona de servicio", areaValue: "Berna y alrededores", hours: "Horario", hoursValue: "Lunes–sábado, 08:00–19:00", call: "Llamar", message: "Escribir por WhatsApp", demo: "Datos de demostración – sustituir antes del lanzamiento" },
  ar: {
    description: "أخبرنا بالخدمة التي تحتاجها. سنوضح التفاصيل ونتفق على الوقت المناسب ونجهز عرضاً شخصياً.",
    phone: "الهاتف", email: "البريد الإلكتروني", area: "منطقة الخدمة", areaValue: "برن والمناطق المحيطة",
    hours: "ساعات العمل", hoursValue: "الاثنين–السبت، 08:00–19:00",
    call: "اتصل بنا", message: "راسلنا على واتساب", demo: "بيانات تجريبية — يجب استبدالها قبل الإطلاق",
  },
};

export function getContactCopy(locale: Locale) {
  return translations[locale] ?? english;
}
