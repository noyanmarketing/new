import React from 'react';
import { Moon, Sun, Bell, Globe, Shield, Palette, Database, Mail } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface SettingsPageProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ darkMode, setDarkMode }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Ayarlar</h2>
        <p className="text-gray-500 dark:text-gray-400">Uygulama tercihlerinizi ve ayarlarınızı yönetin</p>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Palette size={20} className="text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Görünüm</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tema ve görünüm ayarları</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon size={20} className="text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun size={20} className="text-gray-700 dark:text-gray-300" />
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Karanlık Mod</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Gözlerinizi yormuyor</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                darkMode ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Bell size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Bildirimler</h3>
            <p className="text-sm text-gray-500">Bildirim tercihlerinizi yönetin</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <span className="text-sm text-gray-700">Yeni sipariş bildirimleri</span>
            <input type="checkbox" className="rounded text-green-600" defaultChecked />
          </label>
          <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <span className="text-sm text-gray-700">Stok azalma uyarıları</span>
            <input type="checkbox" className="rounded text-green-600" defaultChecked />
          </label>
          <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <span className="text-sm text-gray-700">Fiyat değişikliği bildirimleri</span>
            <input type="checkbox" className="rounded text-green-600" />
          </label>
          <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <span className="text-sm text-gray-700">E-posta bildirimleri</span>
            <input type="checkbox" className="rounded text-green-600" defaultChecked />
          </label>
        </div>
      </div>

      {/* Language Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Globe size={20} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Dil ve Bölge</h3>
            <p className="text-sm text-gray-500">Dil ve bölge ayarları</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dil</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'tr' | 'en' | 'de')}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Para Birimi</label>
            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>TRY (₺)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Shield size={20} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Güvenlik</h3>
            <p className="text-sm text-gray-500">Hesap güvenliği ayarları</p>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900 text-sm">Şifre Değiştir</p>
            <p className="text-xs text-gray-500">Son değişiklik: 30 gün önce</p>
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900 text-sm">İki Faktörlü Kimlik Doğrulama</p>
            <p className="text-xs text-gray-500">Ekstra güvenlik katmanı ekleyin</p>
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900 text-sm">Aktif Oturumlar</p>
            <p className="text-xs text-gray-500">Diğer cihazlardaki oturumları yönetin</p>
          </button>
        </div>
      </div>

      {/* Data and Privacy */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Database size={20} className="text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Veri ve Gizlilik</h3>
            <p className="text-sm text-gray-500">Verilerinizi yönetin</p>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900 text-sm">Verileri Dışa Aktar</p>
            <p className="text-xs text-gray-500">Tüm verilerinizi indirin</p>
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900 text-sm">Gizlilik Politikası</p>
            <p className="text-xs text-gray-500">Gizlilik politikamızı okuyun</p>
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg text-red-600">
            <p className="font-medium text-sm">Hesabı Sil</p>
            <p className="text-xs opacity-75">Bu işlem geri alınamaz</p>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
          İptal
        </button>
        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Değişiklikleri Kaydet
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
