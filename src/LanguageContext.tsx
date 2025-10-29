import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'tr' | 'en' | 'de';

interface Translations {
  [key: string]: {
    tr: string;
    en: string;
    de: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.dashboard': { tr: 'Dashboard', en: 'Dashboard', de: 'Dashboard' },
  'nav.products': { tr: 'Ürün Yönetimi', en: 'Product Management', de: 'Produktverwaltung' },
  'nav.settings': { tr: 'Ayarlar', en: 'Settings', de: 'Einstellungen' },
  'nav.myAccount': { tr: 'Hesabım', en: 'My Account', de: 'Mein Konto' },

  // Login
  'login.title': { tr: 'Satıcı Paneli', en: 'Seller Panel', de: 'Verkäufer-Panel' },
  'login.subtitle': { tr: 'Hesabınıza giriş yapın', en: 'Sign in to your account', de: 'Melden Sie sich bei Ihrem Konto an' },
  'login.email': { tr: 'E-posta Adresi', en: 'Email Address', de: 'E-Mail-Adresse' },
  'login.password': { tr: 'Şifre', en: 'Password', de: 'Passwort' },
  'login.button': { tr: 'Giriş Yap', en: 'Sign In', de: 'Anmelden' },
  'login.loading': { tr: 'Giriş yapılıyor...', en: 'Signing in...', de: 'Anmeldung läuft...' },
  'login.demo': { tr: 'Demo Hesap:', en: 'Demo Account:', de: 'Demo-Konto:' },
  'login.autofill': { tr: 'Demo bilgilerini otomatik doldur', en: 'Auto-fill demo credentials', de: 'Demo-Anmeldedaten automatisch ausfüllen' },
  'login.forgot': { tr: 'Şifrenizi mi unuttunuz?', en: 'Forgot your password?', de: 'Passwort vergessen?' },

  // Dashboard
  'dashboard.totalProducts': { tr: 'Toplam Ürün', en: 'Total Products', de: 'Gesamtprodukte' },
  'dashboard.activeSales': { tr: 'Aktif Satış', en: 'Active Sales', de: 'Aktive Verkäufe' },
  'dashboard.dailyOrders': { tr: 'Günlük Sipariş', en: 'Daily Orders', de: 'Tägliche Bestellungen' },
  'dashboard.totalRevenue': { tr: 'Toplam Gelir', en: 'Total Revenue', de: 'Gesamtumsatz' },
  'dashboard.salesTrend': { tr: 'Satış Trendi', en: 'Sales Trend', de: 'Verkaufstrend' },
  'dashboard.recentActivities': { tr: 'Son Aktiviteler', en: 'Recent Activities', de: 'Letzte Aktivitäten' },

  // Settings
  'settings.title': { tr: 'Ayarlar', en: 'Settings', de: 'Einstellungen' },
  'settings.appearance': { tr: 'Görünüm', en: 'Appearance', de: 'Erscheinungsbild' },
  'settings.darkMode': { tr: 'Karanlık Mod', en: 'Dark Mode', de: 'Dunkler Modus' },
  'settings.notifications': { tr: 'Bildirimler', en: 'Notifications', de: 'Benachrichtigungen' },
  'settings.language': { tr: 'Dil', en: 'Language', de: 'Sprache' },
  'settings.currency': { tr: 'Para Birimi', en: 'Currency', de: 'Währung' },
  'settings.security': { tr: 'Güvenlik', en: 'Security', de: 'Sicherheit' },
  'settings.save': { tr: 'Değişiklikleri Kaydet', en: 'Save Changes', de: 'Änderungen speichern' },
  'settings.cancel': { tr: 'İptal', en: 'Cancel', de: 'Abbrechen' },

  // Account
  'account.title': { tr: 'Hesabım', en: 'My Account', de: 'Mein Konto' },
  'account.logout': { tr: 'Çıkış Yap', en: 'Logout', de: 'Abmelden' },
  'account.profile': { tr: 'Profil Bilgileri', en: 'Profile Information', de: 'Profilinformationen' },
  'account.company': { tr: 'Şirket Adı', en: 'Company Name', de: 'Firmenname' },
  'account.phone': { tr: 'Telefon', en: 'Phone', de: 'Telefon' },
  'account.address': { tr: 'Adres', en: 'Address', de: 'Adresse' },

  // Common
  'common.loading': { tr: 'Yükleniyor...', en: 'Loading...', de: 'Wird geladen...' },
  'common.save': { tr: 'Kaydet', en: 'Save', de: 'Speichern' },
  'common.cancel': { tr: 'İptal', en: 'Cancel', de: 'Abbrechen' },
  'common.edit': { tr: 'Düzenle', en: 'Edit', de: 'Bearbeiten' },
  'common.delete': { tr: 'Sil', en: 'Delete', de: 'Löschen' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'tr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
