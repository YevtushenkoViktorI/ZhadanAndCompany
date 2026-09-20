import type { Locale } from "./config";

export type OrderFieldCopy = {
  rooms: string; floor: string; boxes: string; heavyItems: string;
  needPacking: string; needAssembly: string; hasLift: string;
  pickup: string; goods: string; furnitureType: string; manufacturer: string;
  quantity: string; cleaningType: string; area: string; windows: string;
  handover: string; contactMethod: string; whatsapp: string; phoneCall: string;
  email: string; emailLabel: string; comment: string;
};

const english: OrderFieldCopy = {
  rooms: "Number of rooms", floor: "Floor / lift", boxes: "Approximate number of boxes",
  heavyItems: "Large or heavy items", needPacking: "Packing is required",
  needAssembly: "Furniture disassembly / assembly is required", hasLift: "A lift is available",
  pickup: "Shop or pickup address", goods: "What should be delivered?",
  furnitureType: "Furniture type", manufacturer: "Store or manufacturer", quantity: "Number of items",
  cleaningType: "Cleaning type", area: "Approximate area (m²)", windows: "Window cleaning",
  handover: "Handover cleaning guarantee", contactMethod: "Preferred contact method",
  whatsapp: "WhatsApp", phoneCall: "Phone call", email: "Email", emailLabel: "Email (optional)",
  comment: "Additional information",
};

const translations: Partial<Record<Locale, OrderFieldCopy>> = {
  uk: {
    rooms: "Кількість кімнат", floor: "Поверх / наявність ліфта", boxes: "Орієнтовна кількість коробок",
    heavyItems: "Великі або важкі предмети", needPacking: "Потрібне пакування",
    needAssembly: "Потрібне розбирання / складання меблів", hasLift: "Є ліфт",
    pickup: "Магазин або адреса отримання", goods: "Що потрібно доставити?",
    furnitureType: "Тип меблів", manufacturer: "Магазин або виробник", quantity: "Кількість предметів",
    cleaningType: "Тип прибирання", area: "Приблизна площа (м²)", windows: "Миття вікон",
    handover: "Гарантія здачі житла", contactMethod: "Бажаний спосіб зв’язку",
    whatsapp: "WhatsApp", phoneCall: "Дзвінок", email: "Email", emailLabel: "Email (необов’язково)",
    comment: "Додаткова інформація",
  },
  de: {
    rooms: "Anzahl Zimmer", floor: "Etage / Aufzug", boxes: "Ungefähre Anzahl Kartons",
    heavyItems: "Große oder schwere Gegenstände", needPacking: "Verpackung benötigt",
    needAssembly: "Möbelmontage / Demontage benötigt", hasLift: "Aufzug vorhanden",
    pickup: "Geschäft oder Abholadresse", goods: "Was soll geliefert werden?",
    furnitureType: "Möbelart", manufacturer: "Geschäft oder Hersteller", quantity: "Anzahl Gegenstände",
    cleaningType: "Reinigungsart", area: "Ungefähre Fläche (m²)", windows: "Fensterreinigung",
    handover: "Abgabegarantie", contactMethod: "Bevorzugter Kontakt",
    whatsapp: "WhatsApp", phoneCall: "Anruf", email: "E-Mail", emailLabel: "E-Mail (optional)",
    comment: "Zusätzliche Informationen",
  },
  ar: {
    rooms: "عدد الغرف", floor: "الطابق / المصعد", boxes: "العدد التقريبي للصناديق",
    heavyItems: "الأغراض الكبيرة أو الثقيلة", needPacking: "تغليف الأغراض مطلوب",
    needAssembly: "فك أو تركيب الأثاث مطلوب", hasLift: "يوجد مصعد",
    pickup: "المتجر أو عنوان الاستلام", goods: "ما المطلوب توصيله؟",
    furnitureType: "نوع الأثاث", manufacturer: "المتجر أو الشركة المصنعة", quantity: "عدد القطع",
    cleaningType: "نوع التنظيف", area: "المساحة التقريبية (م²)", windows: "تنظيف النوافذ",
    handover: "ضمان تنظيف التسليم", contactMethod: "طريقة التواصل المفضلة",
    whatsapp: "واتساب", phoneCall: "مكالمة", email: "البريد الإلكتروني", emailLabel: "البريد الإلكتروني (اختياري)",
    comment: "معلومات إضافية",
  },
};

export function getOrderFieldCopy(locale: Locale): OrderFieldCopy {
  return translations[locale] ?? english;
}
