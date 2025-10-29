import React, { useState, useEffect } from 'react';
import { Home, Package, Settings, ShoppingCart, TrendingUp, Eye, Edit, Send, Trash2, Plus, X, Upload, Moon, Sun, User as UserIcon } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Login from './Login';
import SettingsPage from './SettingsPage';
import MyAccountPage from './MyAccountPage';
import type { User, Product } from './types';

// Components
const MenuItem = ({ icon: Icon, label, page, badge, activePage, setActivePage }: any) => (
  <button
    onClick={() => setActivePage(page)}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      activePage === page
        ? 'bg-green-700 text-white'
        : 'text-green-100 hover:bg-green-700/50'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
    {badge && (
      <span className="ml-auto bg-green-900 text-white text-xs px-2 py-1 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
    <p className="text-sm text-green-600 dark:text-green-400 font-medium">{change}</p>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const configs: any = {
    active: { bg: 'bg-green-600', text: 'Aktif' },
    trending: { bg: 'bg-orange-500', text: 'T' },
    hot: { bg: 'bg-red-500', text: 'H' },
    new: { bg: 'bg-blue-500', text: 'N' }
  };
  const config = configs[status];
  return (
    <span className={`${config.bg} text-white text-xs font-bold px-2 py-1 rounded`}>
      {config.text}
    </span>
  );
};

const SalesChart = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <h3 className="text-lg font-semibold mb-2">Satış Trendi</h3>
    <p className="text-sm text-gray-500 mb-4">Son 6 aylık satış performansı</p>
    <div className="h-64 relative">
      <svg className="w-full h-full" viewBox="0 0 600 250">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="50"
            y1={50 + i * 40}
            x2="580"
            y2={50 + i * 40}
            stroke="#e5e7eb"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        ))}

        <path
          d="M 50,120 L 130,80 L 210,100 L 290,60 L 370,85 L 450,45 L 530,70 L 530,210 L 50,210 Z"
          fill="url(#gradient)"
        />

        <path
          d="M 50,120 L 130,80 L 210,100 L 290,60 L 370,85 L 450,45 L 530,70"
          stroke="#10b981"
          strokeWidth="3"
          fill="none"
        />

        {[
          { x: 50, y: 120 },
          { x: 130, y: 80 },
          { x: 210, y: 100 },
          { x: 290, y: 60 },
          { x: 370, y: 85 },
          { x: 450, y: 45 },
          { x: 530, y: 70 }
        ].map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="#10b981"
            className="hover:r-7 transition-all cursor-pointer"
          />
        ))}

        {['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'].map((month, i) => (
          <text
            key={i}
            x={50 + i * 96}
            y="235"
            textAnchor="middle"
            fontSize="12"
            fill="#6b7280"
          >
            {month}
          </text>
        ))}
      </svg>
    </div>
  </div>
);

const ActivityLog = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <h3 className="text-lg font-semibold mb-2">Son Aktiviteler</h3>
    <p className="text-sm text-gray-500 mb-4">Sistemdeki son işlemler ve güncellemeler</p>
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
        <div>
          <p className="font-medium">Trendyol'a 15 ürün yüklendi</p>
          <p className="text-sm text-gray-500">2 dakika önce</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
        <div>
          <p className="font-medium">Hepsiburada stok güncellendi</p>
          <p className="text-sm text-gray-500">5 dakika önce</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
        <div>
          <p className="font-medium">N11'den 3 yeni sipariş</p>
          <p className="text-sm text-gray-500">12 dakika önce</p>
        </div>
      </div>
    </div>
  </div>
);

const ImageUploader = ({ images, setImages }: any) => {
  const handleImageAdd = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setImages([...images, { id: newId, preview: null }]);
  };

  const handleImageRemove = (id: string) => {
    setImages(images.filter((img: any) => img.id !== id));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Ürün Görselleri</h3>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image: any) => (
          <div key={image.id} className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-500 transition-colors group">
            <button
              onClick={() => handleImageRemove(image.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
            <div className="flex flex-col items-center justify-center cursor-pointer h-32">
              <Upload size={32} className="text-gray-400 mb-2" />
              <p className="text-xs text-gray-600 text-center">Görsel yükle</p>
            </div>
          </div>
        ))}
        {images.length < 6 && (
          <button
            onClick={handleImageAdd}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-500 hover:bg-green-50 transition-colors flex flex-col items-center justify-center cursor-pointer h-32"
          >
            <Plus size={32} className="text-gray-400 mb-2" />
            <p className="text-xs text-gray-600">Yeni Görsel</p>
          </button>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2">En fazla 6 görsel ekleyebilirsiniz</p>
    </div>
  );
};

const ProductForm = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <h3 className="text-lg font-semibold mb-4">Genel Bilgiler</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ürün Adı</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Ürün adını girin"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ana Ürün Kodu</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ana kod"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ürün Modeli</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Model bilgisi"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ürün Ölçüleri</label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="En (cm)"
          />
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Boy (cm)"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Kullanılan Malzemeler</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Örn: %100 Pamuk, Polyester"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ürün İçeriği</label>
        <textarea
          rows={3}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Ürün paketinde neler var?"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ürün Açıklaması</label>
        <textarea
          rows={4}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Ürün hakkında detaylı açıklama"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bakım ve Temizlik</label>
        <textarea
          rows={3}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Bakım ve temizlik talimatları"
        />
      </div>
    </div>
  </div>
);

const PricingStock = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <h3 className="text-lg font-semibold mb-4">Fiyatlandırma ve Stok</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Fiyat (₺)</label>
        <input
          type="number"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="0.00"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Stok Miktarı</label>
        <input
          type="number"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="0"
        />
      </div>
    </div>
  </div>
);

const ProductStatus = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <h3 className="text-lg font-semibold mb-4">Durum</h3>
    <div className="space-y-3">
      <label className="flex items-center gap-2">
        <input type="checkbox" className="rounded text-green-600" defaultChecked />
        <span className="text-sm">Aktif</span>
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" className="rounded text-green-600" />
        <span className="text-sm">Trend</span>
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" className="rounded text-green-600" />
        <span className="text-sm">Hot</span>
      </label>
    </div>
  </div>
);

// Pages
const DashboardPage = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Toplam Ürün"
        value="1,247"
        change="+12% geçen aydan"
        icon={Package}
        color="bg-blue-500"
      />
      <StatCard
        title="Aktif Satış"
        value="892"
        change="+8% geçen aydan"
        icon={TrendingUp}
        color="bg-green-500"
      />
      <StatCard
        title="Günlük Sipariş"
        value="47"
        change="+23% dünden"
        icon={ShoppingCart}
        color="bg-purple-500"
      />
      <StatCard
        title="Toplam Gelir"
        value="₺24,580"
        change="+15% geçen aydan"
        icon={TrendingUp}
        color="bg-orange-500"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SalesChart />
      <ActivityLog />
    </div>
  </div>
);

const ProductListPage = ({ setActivePage, products }: any) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Ürün Yönetimi</h2>
        <p className="text-gray-500 mt-1">Ürünlerinizi yönetin ve pazaryerlerine gönderin</p>
      </div>
      <button
        onClick={() => setActivePage('add-product')}
        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        <Plus size={20} />
        Yeni Ürün Ekle
      </button>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Ürün adı, SKU veya ana ürün kodu ile ara..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>Tüm Kategoriler</option>
          </select>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            Filtrele
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        <div className="p-4 bg-gray-50 font-medium text-sm text-gray-600">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5">Ürün Bilgisi</div>
            <div className="col-span-2 text-center">Stok</div>
            <div className="col-span-2 text-center">Fiyat</div>
            <div className="col-span-3 text-right">İşlemler</div>
          </div>
        </div>

        {products.map((product: Product) => (
          <div key={product.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-5 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Package size={32} className="text-gray-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{product.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>SKU: {product.sku}</span>
                    <span>•</span>
                    <span>Ana Kod: {product.code}</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {product.status.map((s: string) => (
                      <StatusBadge key={s} status={s} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-semibold text-gray-900">{product.stock}</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-semibold text-green-600">₺{product.price.toLocaleString()}</span>
              </div>
              <div className="col-span-3 flex justify-end gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Görüntüle">
                  <Eye size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Düzenle">
                  <Edit size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Gönder">
                  <Send size={20} className="text-blue-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Sil">
                  <Trash2 size={20} className="text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AddProductPage = ({ setActivePage }: any) => {
  const [images, setImages] = useState([{ id: '1', preview: null }]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Yeni Ürün Ekle</h2>
          <p className="text-gray-500 mt-1">Yeni ürün bilgilerini girin</p>
        </div>
        <button
          onClick={() => setActivePage('products')}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Geri Dön
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProductForm />
          <PricingStock />
        </div>

        <div className="space-y-6">
          <ImageUploader images={images} setImages={setImages} />
          <ProductStatus />
          <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
            Ürünü Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Layout
const Sidebar = ({ activePage, setActivePage, user }: any) => (
  <div className="w-64 bg-green-800 text-white p-4 flex flex-col">
    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-green-700">
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
        <ShoppingCart className="text-green-800" size={24} />
      </div>
      <span className="text-xl font-bold">Satıcı Panel</span>
    </div>

    <nav className="space-y-2 flex-1">
      <MenuItem icon={Home} label="Dashboard" page="dashboard" activePage={activePage} setActivePage={setActivePage} />
      <MenuItem icon={Package} label="Ürün Yönetimi" page="products" badge="5" activePage={activePage} setActivePage={setActivePage} />
      <MenuItem icon={Settings} label="Ayarlar" page="settings" activePage={activePage} setActivePage={setActivePage} />
    </nav>

    <div className="pt-4 border-t border-green-700">
      <button
        onClick={() => setActivePage('my-account')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
          activePage === 'my-account'
            ? 'bg-green-700 text-white'
            : 'text-green-100 hover:bg-green-700/50'
        }`}
      >
        <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-sm font-bold">
          {user?.companyName?.charAt(0).toUpperCase() || 'N'}
        </div>
        <span className="text-sm font-medium">Hesabım</span>
      </button>
    </div>
  </div>
);

const Header = ({ activePage, darkMode, setDarkMode }: any) => {
  const titles: any = {
    dashboard: 'Dashboard',
    products: 'Ürün Yönetimi',
    'add-product': 'Yeni Ürün Ekle',
    settings: 'Ayarlar',
    'my-account': 'Hesabım'
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{titles[activePage]}</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            title={darkMode ? 'Açık Tema' : 'Karanlık Tema'}
          >
            {darkMode ? <Sun size={20} className="text-gray-600 dark:text-gray-300" /> : <Moon size={20} className="text-gray-600 dark:text-gray-300" />}
          </button>
        </div>
      </div>
    </header>
  );
};

// Main Component
const SellerDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "ThinkBook 14 G3 Intel Core Ultra 7 155U 8GB 512GB SSD 14\" Laptop",
      sku: "TB14G3-001",
      code: "TB14G3",
      stock: 25,
      price: 15999,
      status: ['active', 'trending', 'hot']
    },
    {
      id: 2,
      name: "ThinkBook 14 G3 Intel Core Ultra 7 155U 16GB 1TB SSD 14\" Laptop",
      sku: "TB14G3-002",
      code: "TB14G3",
      stock: 18,
      price: 18999,
      status: ['active', 'trending', 'hot', 'new']
    },
    {
      id: 3,
      name: "iPhone 15 Pro 128GB Doğal Titanyum",
      sku: "IP15P-128-NT",
      code: "IP15P",
      stock: 12,
      price: 42999,
      status: ['active', 'trending']
    }
  ]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // Auth effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          companyName: 'noyanist'
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onLoginSuccess={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} user={user} />
      <div className="flex-1 overflow-auto">
        <Header activePage={activePage} darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="p-8">
          {activePage === 'dashboard' && <DashboardPage />}
          {activePage === 'products' && <ProductListPage setActivePage={setActivePage} products={products} />}
          {activePage === 'add-product' && <AddProductPage setActivePage={setActivePage} />}
          {activePage === 'settings' && <SettingsPage darkMode={darkMode} setDarkMode={setDarkMode} />}
          {activePage === 'my-account' && <MyAccountPage user={user} />}
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
