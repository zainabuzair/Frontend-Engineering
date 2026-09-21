import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  ShoppingBag, 
  LayoutDashboard, 
  Lock, 
  Key, 
  LogOut, 
  LogIn, 
  Search, 
  Star, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  Layers, 
  Code, 
  FileText, 
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  Sliders,
  Menu,
  X,
  User,
  Activity,
  Compass,
  ArrowRight
} from 'lucide-react';

// Mock Authentication Context
const AuthContext = createContext(null);

const useAuth = () => useContext(AuthContext);

// Mock Products Database
const PRODUCTS = [
  {
    id: 'prod-101',
    name: 'AeroGlide Pro Wireless Mouse',
    category: 'Peripherals',
    price: 89.99,
    rating: 4.8,
    reviewsCount: 124,
    description: 'Ultra-lightweight ergonomic wireless mouse with sub-millisecond response times and 90-hour battery life.',
    specs: {
      DPI: '26,000 Optical Sensor',
      Weight: '63 grams',
      Connectivity: '2.4GHz Lightspeed & Bluetooth 5.2',
      Battery: 'Up to 90 hours continuous play',
      Warranty: '2 Years Manufacturer'
    },
    reviews: [
      { id: 1, author: 'Alex M.', rating: 5, comment: 'Hands down the best competitive mouse I have ever used. Weight distribution is perfect.' },
      { id: 2, author: 'Sarah T.', rating: 4, comment: 'Great sensor and battery life. Software is a bit bloatware-heavy though.' }
    ]
  },
  {
    id: 'prod-102',
    name: 'KeyForge Mechanical Keyboard',
    category: 'Peripherals',
    price: 149.50,
    rating: 4.9,
    reviewsCount: 89,
    description: 'Hot-swappable custom mechanical keyboard with lubricated tactile switches and sound-dampening foam dampeners.',
    specs: {
      Layout: '75% Compact',
      Switches: 'Custom Linear Lubed (45g actuate)',
      Keycaps: 'Double-shot PBT Cherry Profile',
      Backlight: 'Per-key RGB Customisable',
      Connection: 'Detachable USB-C Braided Cable'
    },
    reviews: [
      { id: 3, author: 'Devon K.', rating: 5, comment: 'The typing acoustics out of the box are insane! Sounds like raindrops.' }
    ]
  },
  {
    id: 'prod-103',
    name: 'QuantumX 27" QHD Monitor',
    category: 'Displays',
    price: 379.00,
    rating: 4.6,
    reviewsCount: 210,
    description: '240Hz IPS gaming display featuring 1ms GTG response rate, HDR400, and 99% sRGB color gamut coverage.',
    specs: {
      Resolution: '2560 x 1440 (QHD)',
      RefreshRate: '240Hz Native',
      PanelType: 'Fast IPS Panel',
      HDR: 'VESA DisplayHDR 400',
      Ports: '2x HDMI 2.1, 2x DisplayPort 1.4, USB Hub'
    },
    reviews: [
      { id: 4, author: 'Elena R.', rating: 5, comment: 'Zero motion blur during fast fps gaming. Colors required minimal calibration.' },
      { id: 5, author: 'Marcus B.', rating: 4, comment: 'Stand takes up quite a bit of desk depth, but picture quality is stellar.' }
    ]
  },
  {
    id: 'prod-104',
    name: 'StudioCraft Active Noise Cancelling Headphones',
    category: 'Audio',
    price: 229.99,
    rating: 4.7,
    reviewsCount: 67,
    description: 'High-fidelity wireless studio headphones featuring hybrid active noise cancellation and spatial sound tuning.',
    specs: {
      Driver: '40mm Custom Titanium Drivers',
      ANC: 'Adaptive Hybrid ANC (3 modes)',
      Battery: '40 Hours with ANC On',
      Codec: 'LDAC, AAC, SBC Supported',
      Microphone: 'Quad beamforming mic array'
    },
    reviews: [
      { id: 6, author: 'Chris P.', rating: 5, comment: 'ANC blocks out airplane turbine noise completely. Very comfortable for long sessions.' }
    ]
  }
];

// Custom Mini Client-Side Router Implementation (Demonstrating Router Mechanics Under the Hood)
const RouterContext = createContext(null);

const useRouter = () => useContext(RouterContext);

function CustomRouter({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.hash.replace('#', '') || '/');

  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash.replace('#', '') || '/';
      setCurrentPath(path);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (to) => {
    window.location.hash = to;
    setCurrentPath(to);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

// Navigation Link Component with Active Styling Support
function CustomNavLink({ to, children, className = '', activeClassName = '', exact = false }) {
  const { currentPath, navigate } = useRouter();

  // Determine if active route
  const isActive = exact 
    ? currentPath === to 
    : currentPath === to || (to !== '/' && currentPath.startsWith(to));

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  const combinedClass = `${className} ${isActive ? activeClassName : ''}`.trim();

  return (
    <a href={`#${to}`} onClick={handleClick} className={combinedClass}>
      {typeof children === 'function' ? children({ isActive }) : children}
    </a>
  );
}

// Header / Navigation Bar Component
function Navbar() {
  const { user, logout } = useAuth();
  const { currentPath } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <CustomNavLink to="/" className="flex items-center space-x-2 text-indigo-400 font-bold text-xl tracking-wide">
              <Compass className="w-7 h-7 text-indigo-500 animate-pulse" />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">RouterCraft</span>
            </CustomNavLink>
            <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800">
              Week 5 Day 1
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-1">
            <CustomNavLink 
              to="/" 
              exact={true}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              activeClassName="bg-indigo-600/20 text-indigo-400 font-semibold border border-indigo-500/30"
            >
              Home
            </CustomNavLink>

            <CustomNavLink 
              to="/products" 
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              activeClassName="bg-indigo-600/20 text-indigo-400 font-semibold border border-indigo-500/30"
            >
              Products Catalog
            </CustomNavLink>

            <CustomNavLink 
              to="/dashboard" 
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center space-x-1"
              activeClassName="bg-indigo-600/20 text-indigo-400 font-semibold border border-indigo-500/30"
            >
              <Lock className="w-3.5 h-3.5 mr-1" />
              Protected Dashboard
            </CustomNavLink>

            <CustomNavLink 
              to="/router-docs" 
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              activeClassName="bg-indigo-600/20 text-indigo-400 font-semibold border border-indigo-500/30"
            >
              NPM Setup Guide
            </CustomNavLink>
          </nav>

          {/* User Auth Action & Dynamic Control */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                  {user.name.charAt(0)}
                </div>
                <span className="text-xs font-medium text-slate-200">{user.name}</span>
                <button 
                  onClick={logout} 
                  className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <CustomNavLink 
                to="/login"
                className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-all shadow-md shadow-indigo-900/30"
              >
                <LogIn className="w-3.5 h-3.5 mr-1.5" />
                Login Mock
              </CustomNavLink>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          <CustomNavLink 
            to="/" 
            exact={true}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800"
            activeClassName="bg-indigo-600 text-white"
          >
            Home
          </CustomNavLink>
          <CustomNavLink 
            to="/products" 
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800"
            activeClassName="bg-indigo-600 text-white"
          >
            Products
          </CustomNavLink>
          <CustomNavLink 
            to="/dashboard" 
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800"
            activeClassName="bg-indigo-600 text-white"
          >
            Dashboard (Protected)
          </CustomNavLink>
          <CustomNavLink 
            to="/router-docs" 
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800"
            activeClassName="bg-indigo-600 text-white"
          >
            Setup Instructions
          </CustomNavLink>
        </div>
      )}
    </header>
  );
}

// Layout Footer Component
function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-lg mb-2">
              <Compass className="w-5 h-5 text-indigo-400" />
              <span>RouterCraft Studio</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Demonstrating modern Client-Side Routing concepts with React Router v6, layout component wrappers, dynamic route parameters, nested routes, and route protection pattern.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">Router Topics</h4>
            <ul className="text-xs space-y-2">
              <li className="flex items-center"><ChevronRight className="w-3 h-3 text-indigo-400 mr-1"/> Route Parameters (`:id`)</li>
              <li className="flex items-center"><ChevronRight className="w-3 h-3 text-indigo-400 mr-1"/> Nested Tab Navigation</li>
              <li className="flex items-center"><ChevronRight className="w-3 h-3 text-indigo-400 mr-1"/> Navigation State & NavLink</li>
              <li className="flex items-center"><ChevronRight className="w-3 h-3 text-indigo-400 mr-1"/> Protected Route Wrappers</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">Quick Link Tester</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <CustomNavLink to="/products/prod-101" className="bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300">
                /products/prod-101
              </CustomNavLink>
              <CustomNavLink to="/non-existent-page" className="bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300">
                /broken-url (404)
              </CustomNavLink>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2026 React Learning Curriculum — Week 5 Day 1</p>
          <p className="mt-2 md:mt-0 font-mono">React Router v6 Architecture Demo</p>
        </div>
      </div>
    </footer>
  );
}


// 1. HOME VIEW
function HomePage() {
  const { navigate } = useRouter();

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/20 p-8 md:p-12">
        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
            <Layers className="w-3.5 h-3.5 mr-1.5" /> Client-Side Navigation
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Master Single Page App Navigation with <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">React Router</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Seamlessly transition between views without full browser reloads. Explore dynamic route parameters, nested view hierarchies, and authentication route guards.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={() => navigate('/products')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center space-x-2"
            >
              <span>Explore Products Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold rounded-xl transition-all flex items-center space-x-2"
            >
              <Lock className="w-4 h-4 text-indigo-400" />
              <span>Test Protected Guard</span>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20">
            <Sliders className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Route Parameters</h3>
          <p className="text-sm text-slate-400">
            Extract variables directly from URLs using key patterns like <code className="text-indigo-300 bg-slate-800 px-1.5 py-0.5 rounded text-xs">/products/:id</code> to render tailored item views dynamically.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Nested Routes</h3>
          <p className="text-sm text-slate-400">
            Nest child views inside parent view layouts with internal navigation tabs without resetting parent state.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Protected Route Guards</h3>
          <p className="text-sm text-slate-400">
            Intercept unauthorized requests to restricted sections (like <code className="text-emerald-300 bg-slate-800 px-1.5 py-0.5 rounded text-xs">/dashboard</code>) and automatically redirect to login.
          </p>
        </div>
      </section>
    </div>
  );
}

// 2. PRODUCTS CATALOG VIEW
function ProductsCatalogPage() {
  const { navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Product Catalog</h1>
          <p className="text-sm text-slate-400">Click any card to inspect dynamic parameter routing (`/products/:id`)</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Categories</option>
            <option value="Peripherals">Peripherals</option>
            <option value="Displays">Displays</option>
            <option value="Audio">Audio</option>
          </select>
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
            className="group bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-6 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-950/40 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-indigo-400 border border-slate-700">
                  {product.category}
                </span>
                <span className="flex items-center text-amber-400 text-xs font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  {product.rating} ({product.reviewsCount})
                </span>
              </div>
              <h2 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
                {product.name}
              </h2>
              <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <span className="text-xl font-extrabold text-white">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-indigo-400 flex items-center group-hover:translate-x-1 transition-transform">
                View Details <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. PRODUCT DETAILS WITH NESTED ROUTES (`/products/:id/overview`, `/specs`, `/reviews`)
function ProductDetailsPage({ productId, subTab = 'overview' }) {
  const { navigate } = useRouter();
  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="bg-slate-900 border border-amber-500/20 rounded-xl p-8 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-sm text-slate-400">The product ID dynamic parameter `{productId}` does not match any items in our catalog.</p>
        <button 
          onClick={() => navigate('/products')}
          className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-xs text-slate-400 space-x-2">
        <button onClick={() => navigate('/products')} className="hover:text-indigo-400 flex items-center">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Products Catalog
        </button>
        <span>/</span>
        <span className="text-slate-200 font-medium truncate">{product.name}</span>
      </nav>

      {/* Product Hero Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-indigo-950 text-indigo-300 border border-indigo-800">
              {product.category}
            </span>
            <span className="text-xs text-slate-500 font-mono">ID: {product.id}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">{product.name}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-emerald-400">${product.price.toFixed(2)}</span>
            <span className="flex items-center text-amber-400 text-xs font-medium bg-slate-800 px-2 py-1 rounded">
              <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" /> {product.rating} / 5.0
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Sub-Routing Tabs (Demonstrating Nested Route Rendering) */}
      <div className="border-b border-slate-800 flex space-x-4">
        <CustomNavLink
          to={`/products/${product.id}/overview`}
          className="pb-3 text-xs font-semibold text-slate-400 hover:text-white border-b-2 border-transparent transition-all"
          activeClassName="text-indigo-400 border-indigo-500"
        >
          Overview Tab
        </CustomNavLink>
        <CustomNavLink
          to={`/products/${product.id}/specs`}
          className="pb-3 text-xs font-semibold text-slate-400 hover:text-white border-b-2 border-transparent transition-all"
          activeClassName="text-indigo-400 border-indigo-500"
        >
          Technical Specs Tab
        </CustomNavLink>
        <CustomNavLink
          to={`/products/${product.id}/reviews`}
          className="pb-3 text-xs font-semibold text-slate-400 hover:text-white border-b-2 border-transparent transition-all"
          activeClassName="text-indigo-400 border-indigo-500"
        >
          Customer Reviews ({product.reviews.length})
        </CustomNavLink>
      </div>

      {/* Nested Route View Outlets */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        {subTab === 'overview' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Product Overview</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{product.description}</p>
            <div className="p-4 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Router Concept Highlight:</p>
              <p>This tab is dynamically matched at sub-path: <code className="text-indigo-400">/products/:id/overview</code></p>
            </div>
          </div>
        )}

        {subTab === 'specs' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Technical Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-xs font-medium text-slate-500 block">{key}</span>
                  <span className="text-xs font-bold text-slate-200">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {subTab === 'reviews' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Verified Customer Reviews</h3>
            <div className="space-y-3">
              {product.reviews.map(rev => (
                <div key={rev.id} className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{rev.author}</span>
                    <span className="text-xs text-amber-400 flex items-center">
                      <Star className="w-3 h-3 fill-amber-400 mr-1" /> {rev.rating}/5
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 4. PROTECTED DASHBOARD VIEW (Requires Authenticated State)
function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-xl p-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center">
            <CheckCircle className="w-3.5 h-3.5 mr-1" /> Access Granted
          </span>
          <h1 className="text-2xl font-bold text-white mt-1">Protected Developer Dashboard</h1>
          <p className="text-xs text-slate-400">Authenticated user: {user?.name} ({user?.email})</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Active Session ID</span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-lg font-mono font-bold text-white">sess_9932a_route</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Security Role</span>
            <User className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-lg font-bold text-white">{user?.role || 'Developer'}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Router Guard Status</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-lg font-bold text-emerald-400">Guard Verified</p>
        </div>
      </div>
    </div>
  );
}

// 5. LOGIN MOCK PAGE
function LoginPage() {
  const { login, user } = useAuth();
  const { navigate } = useRouter();

  if (user) {
    return (
      <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-xl p-6 text-center space-y-4">
        <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
        <h2 className="text-lg font-bold text-white">Already Logged In</h2>
        <p className="text-xs text-slate-400">You are currently logged in as <span className="text-white font-semibold">{user.name}</span>.</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg"
        >
          Go to Protected Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto border border-indigo-500/20">
          <Key className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white">Authentication Simulation</h2>
        <p className="text-xs text-slate-400">Simulate authenticating to access protected routes (`/dashboard`)</p>
      </div>

      <button
        onClick={() => {
          login({ name: 'Alex Developer', email: 'alex@example.com', role: 'Lead Architect' });
          navigate('/dashboard');
        }}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2"
      >
        <LogIn className="w-4 h-4" />
        <span>Log In as Demo Developer</span>
      </button>
    </div>
  );
}

// 6. ROUTER DOCS & NPM CLI TUTORIAL PAGE
function DocsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-white mb-2">Step-by-Step Setup Guide</h1>
        <p className="text-slate-400 text-sm">How to create this multi-page React Application from scratch using Vite and React Router DOM v6.</p>
      </div>

      {/* Terminal Step 1 */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="text-xs font-mono text-slate-500 ml-2">Terminal — Step 1: Bootstrap Project</span>
        </div>
        <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto space-y-2">
          <div><span className="text-slate-500"># 1. Create a new React Vite project</span></div>
          <div>npm create vite@latest my-router-app -- --template react</div>
          <div><span className="text-slate-500"># 2. Change directory into project</span></div>
          <div>cd my-router-app</div>
          <div><span className="text-slate-500"># 3. Install official React Router DOM library & Lucide icons</span></div>
          <div>npm install react-router-dom lucide-react</div>
        </pre>
      </div>

      {/* Step 2 Code Explanation */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Code className="w-5 h-5 text-indigo-400 mr-2" /> Official React Router DOM setup code snippet:
        </h3>
        <pre className="p-4 bg-slate-950 rounded-lg text-xs font-mono text-slate-300 border border-slate-800 overflow-x-auto">
{`import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, NavLink, Navigate, useParams } from 'react-router-dom';

// Protected Route Guard Component
function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// App Root Configuration
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id/*" element={<ProductDetailsPage />} />
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute user={currentUser}>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound404Page />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}`}
        </pre>
      </div>
    </div>
  );
}

// 7. 404 NOT FOUND VIEW
function NotFoundPage() {
  const { currentPath, navigate } = useRouter();

  return (
    <div className="max-w-md mx-auto text-center space-y-6 py-12">
      <div className="w-20 h-20 bg-rose-500/10 text-rose-400 rounded-full flex items-center justify-center mx-auto border border-rose-500/20">
        <span className="text-3xl font-black">404</span>
      </div>
      <div>
        <h1 className="text-2xl font-extrabold text-white">Page Not Found</h1>
        <p className="text-xs text-slate-400 mt-2">
          No matching route exists for: <code className="text-rose-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">{currentPath}</code>
        </p>
      </div>
      <button 
        onClick={() => navigate('/')}
        className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg shadow-md"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Return to Safety (Home)
      </button>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <CustomRouter>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
          
          {/* Shared Navbar Layout */}
          <Navbar />

          {/* Dynamic Content Body Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <RouteHandler />
          </main>

          {/* Shared Footer Layout */}
          <Footer />

        </div>
      </CustomRouter>
    </AuthContext.Provider>
  );
}

// Helper component that maps path string to views
function RouteHandler() {
  const { currentPath, navigate } = useRouter();
  const { user } = useAuth();

  // Root / Home
  if (currentPath === '/' || currentPath === '') {
    return <HomePage />;
  }

  // Products List
  if (currentPath === '/products') {
    return <ProductsCatalogPage />;
  }

  // Dynamic Product Details matching /products/:id or /products/:id/:tab
  if (currentPath.startsWith('/products/')) {
    const parts = currentPath.split('/').filter(Boolean); // ['products', 'prod-101', 'overview']
    const productId = parts[1];
    const subTab = parts[2] || 'overview';

    if (productId) {
      return <ProductDetailsPage productId={productId} subTab={subTab} />;
    }
  }

  // Protected Dashboard
  if (currentPath === '/dashboard') {
    if (!user) {
      return (
        <div className="max-w-md mx-auto bg-slate-900 border border-amber-500/30 rounded-xl p-8 text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Access Denied (Protected Route)</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            The route <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded">/dashboard</code> is protected by an authentication guard context. You must log in first to view client state.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => navigate('/login')}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg shadow-md"
            >
              Proceed to Login Page
            </button>
          </div>
        </div>
      );
    }
    return <DashboardPage />;
  }

  // Login Page
  if (currentPath === '/login') {
    return <LoginPage />;
  }

  // Docs Page
  if (currentPath === '/router-docs') {
    return <DocsPage />;
  }

  // Catch-all 404 Fallback
  return <NotFoundPage />;
}