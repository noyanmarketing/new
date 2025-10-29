import React from 'react';
import { User, Mail, Building2, Phone, MapPin, Calendar, CreditCard, Package, TrendingUp, Award, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

interface MyAccountPageProps {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    companyName?: string;
  };
}

const MyAccountPage: React.FC<MyAccountPageProps> = ({ user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Sample user data
  const userData = {
    companyName: 'noyanist',
    email: user.email || 'noyanmyai@gmail.com',
    phone: '+90 555 123 45 67',
    address: 'İstanbul, Türkiye',
    memberSince: 'Ocak 2024',
    totalProducts: 1247,
    totalSales: 24580,
    rating: 4.8
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Hesabım</h2>
          <p className="text-gray-500">Profil bilgilerinizi görüntüleyin ve düzenleyin</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          Çıkış Yap
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                {userData.companyName.charAt(0).toUpperCase()}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">{userData.companyName}</h3>
              <p className="text-sm text-gray-500 mb-4">{userData.email}</p>

              <div className="w-full space-y-3 mb-4">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-gray-600">Üyelik: {userData.memberSince}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Award size={16} className="text-gray-400" />
                  <span className="text-gray-600">Değerlendirme: {userData.rating}/5.0</span>
                </div>
              </div>

              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                Profili Düzenle
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Hızlı İstatistikler</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Toplam Ürün</p>
                    <p className="font-semibold text-gray-900">{userData.totalProducts}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Toplam Gelir</p>
                    <p className="font-semibold text-gray-900">₺{userData.totalSales.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <User size={20} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Kişisel Bilgiler</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building2 size={16} className="inline mr-2" />
                  Şirket Adı
                </label>
                <input
                  type="text"
                  value={userData.companyName}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  E-posta
                </label>
                <input
                  type="email"
                  value={userData.email}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Telefon
                </label>
                <input
                  type="tel"
                  value={userData.phone}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  Adres
                </label>
                <input
                  type="text"
                  value={userData.address}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                İptal
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Kaydet
              </button>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard size={20} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Ödeme Bilgileri</h3>
              </div>
              <button className="text-sm text-green-600 hover:text-green-700">
                + Yeni Ekle
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">•••• 4532</p>
                      <p className="text-xs text-gray-500">Son kullanma: 12/25</p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Varsayılan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hesap Güvenliği</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 text-sm">Şifre</p>
                  <p className="text-xs text-gray-500">Son değişiklik: 30 gün önce</p>
                </div>
                <button className="text-sm text-green-600 hover:text-green-700">
                  Değiştir
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 text-sm">İki Faktörlü Kimlik Doğrulama</p>
                  <p className="text-xs text-gray-500">Devre dışı</p>
                </div>
                <button className="text-sm text-green-600 hover:text-green-700">
                  Etkinleştir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
