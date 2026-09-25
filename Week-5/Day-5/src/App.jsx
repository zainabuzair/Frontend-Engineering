import React, { useState, createContext, useContext, useEffect } from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Link, 
  NavLink, 
  Navigate, 
  useNavigate, 
  useParams 
} from 'react-router-dom';
import { 
  QueryClient, 
  QueryClientProvider, 
  useQuery, 
  useMutation, 
  useQueryClient 
} from '@tanstack/react-query';
import { 
  LayoutDashboard, 
  BookOpen, 
  PlusCircle, 
  LogOut, 
  LogIn, 
  Shield, 
  Terminal, 
  RefreshCw, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  AlertCircle, 
  Key, 
  Layers 
} from 'lucide-react';

// Initialize TanStack Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes cache validity
      refetchOnWindowFocus: false,
    },
  },
});

// --- Auth Context & Provider ---
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedToken = localStorage.getItem('capstone_token');
    return savedToken ? JSON.parse(localStorage.getItem('capstone_user') || 'null') : null;
  });

  const login = (email) => {
    const mockUser = { name: email.split('@')[0], email, role: 'Frontend Engineer' };
    const mockToken = `jwt_session_${Date.now()}`;
    localStorage.setItem('capstone_token', mockToken);
    localStorage.setItem('capstone_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('capstone_token');
    localStorage.removeItem('capstone_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

// --- Protected Route Guard ---
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// --- API Service Layer (REST & JSONPlaceholder API) ---
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const fetchPosts = async () => {
  const res = await fetch(`${API_URL}?_limit=8`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  const data = await res.json();
  return data.map((item) => ({
    ...item,
    title: item.title.length > 30 ? item.title.slice(0, 30) + '...' : item.title,
    body: 'REST API integration demonstration utilizing TanStack Query for cache invalidation and UI state sync.'
  }));
};

const createPost = async (newPost) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(newPost),
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
};

const deletePost = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete post');
  return id;
};

// --- App Navigation Component ---
function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
            <Layers className="w-6 h-6" />
            <span>Week 5 Capstone</span>
          </Link>
          <nav className="hidden md:flex gap-1 text-xs">
            <NavLink 
              to="/" 
              className={({ isActive }) => `px-3 py-2 rounded-lg flex items-center gap-2 font-medium transition-all ${
                isActive ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </NavLink>
            <NavLink 
              to="/create" 
              className={({ isActive }) => `px-3 py-2 rounded-lg flex items-center gap-2 font-medium transition-all ${
                isActive ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <PlusCircle className="w-4 h-4" /> Create Resource
            </NavLink>
          </nav>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline">
              Welcome, <strong className="text-slate-200">{user.name}</strong>
            </span>
            <button
              onClick={logout}
              className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-300 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all"
          >
            <LogIn className="w-3.5 h-3.5" /> Developer Login
          </Link>
        )}
      </div>
    </header>
  );
}

// --- Views & Pages ---

// 1. Dashboard Page (Queries & Mutations)
function DashboardPage() {
  const queryClient = useQueryClient();

  const { data: posts, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(['posts'], (old) => old.filter((p) => p.id !== deletedId));
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100">API Resources Dashboard</h1>
          <p className="text-xs text-slate-400">Managed via TanStack Query (Caching, Refetch, & Mutations)</p>
        </div>
        <button
          onClick={() => refetch()}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl flex items-center gap-1.5 border border-slate-700 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refetch API
        </button>
      </div>

      {isLoading && (
        <div className="p-12 text-center text-slate-400 text-xs animate-pulse">
          Loading cached API data from REST endpoint...
        </div>
      )}

      {isError && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error.message}
        </div>
      )}

      {posts && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 relative group">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-md">
                  ID: #{post.id}
                </span>
                <button
                  onClick={() => deleteMutation.mutate(post.id)}
                  disabled={deleteMutation.isPending}
                  className="p-1.5 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 rounded-lg transition-all"
                  title="DELETE Method"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-semibold text-sm text-slate-200 capitalize">{post.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 2. Create Resource Page (Form Validation & Mutation)
function CreateResourcePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({ title: '', body: '' });
  const [error, setError] = useState('');

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.setQueryData(['posts'], (old = []) => [
        { ...data, id: Date.now(), title: formData.title, body: formData.body },
        ...old,
      ]);
      navigate('/');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim()) {
      setError('All fields are required for API submission.');
      return;
    }
    setError('');
    createMutation.mutate(formData);
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-100">Create New REST Resource</h2>
        <p className="text-xs text-slate-400 mt-1">Triggers a POST mutation to append local Query cache</p>
      </div>

      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Resource Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. TanStack Query Integration"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Resource Description</label>
          <textarea
            rows="4"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            placeholder="Enter full technical details..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={createMutation.isPending}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
        >
          {createMutation.isPending ? 'Executing POST Request...' : 'Submit POST Request'}
        </button>
      </form>
    </div>
  );
}

// 3. Login Page
function LoginPage() {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    login(email);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto">
          <Key className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-100">Developer Access</h2>
        <p className="text-xs text-slate-400">Authenticate session for protected features</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="engineer@aptech.edu.pk"
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20"
        >
          Sign In & Set JWT Session
        </button>
      </form>
    </div>
  );
}

// --- Main Root Component ---
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
            <Navigation />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route 
                  path="/create" 
                  element={
                    <ProtectedRoute>
                      <CreateResourcePage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}