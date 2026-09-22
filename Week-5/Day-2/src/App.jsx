import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { 
  Globe, 
  ArrowDownCircle, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  RefreshCw, 
  Search, 
  SlidersHorizontal, 
  Code2, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Send, 
  Server, 
  Database, 
  Layers, 
  Cpu, 
  Key, 
  Terminal, 
  Zap, 
  Info, 
  ChevronRight, 
  X,
  FileText,
  Clock,
  Radio,
  Copy,
  ExternalLink
} from 'lucide-react';

// Simulated Axios client wrapper around fetch for seamless dual-client switching
const axiosSimulator = {
  get: async (url, config = {}) => {
    const res = await fetch(url, { method: 'GET', headers: config.headers });
    if (!res.ok) throw { response: { status: res.status, statusText: res.statusText, data: await res.json().catch(() => ({})) } };
    return { data: await res.json(), status: res.status, statusText: res.statusText, headers: res.headers };
  },
  post: async (url, data, config = {}) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...config.headers },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw { response: { status: res.status, statusText: res.statusText, data: await res.json().catch(() => ({})) } };
    return { data: await res.json(), status: res.status, statusText: res.statusText, headers: res.headers };
  },
  put: async (url, data, config = {}) => {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...config.headers },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw { response: { status: res.status, statusText: res.statusText, data: await res.json().catch(() => ({})) } };
    return { data: await res.json(), status: res.status, statusText: res.statusText, headers: res.headers };
  },
  patch: async (url, data, config = {}) => {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...config.headers },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw { response: { status: res.status, statusText: res.statusText, data: await res.json().catch(() => ({})) } };
    return { data: await res.json(), status: res.status, statusText: res.statusText, headers: res.headers };
  },
  delete: async (url, config = {}) => {
    const res = await fetch(url, { method: 'DELETE', headers: config.headers });
    if (!res.ok) throw { response: { status: res.status, statusText: res.statusText, data: await res.json().catch(() => ({})) } };
    return { data: await res.json(), status: res.status, statusText: res.statusText, headers: res.headers };
  }
};

const API_BASE = 'https://jsonplaceholder.typicode.com/posts';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Wrapped in useCallback with stable reference to prevent infinite re-render loops
  const addToast = useCallback((message, type = 'info', details = null) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, details }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-2xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 flex items-start gap-3 ${
              toast.type === 'success' ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200' :
              toast.type === 'error' ? 'bg-rose-950/90 border-rose-500/50 text-rose-200' :
              toast.type === 'warning' ? 'bg-amber-950/90 border-amber-500/50 text-amber-200' :
              'bg-slate-900/90 border-cyan-500/50 text-cyan-200'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />}
            
            <div className="flex-1 text-sm">
              <p className="font-semibold">{toast.message}</p>
              {toast.details && <p className="text-xs opacity-80 mt-1 font-mono">{toast.details}</p>}
            </div>
            
            <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export default function App() {
  return (
    <ToastProvider>
      <RestApiDashboard />
    </ToastProvider>
  );
}

function RestApiDashboard() {
  const { addToast } = useToast();

  // Application States
  const [activeTab, setActiveTab] = useState('app'); // 'app' | 'theory' | 'inspector'
  const [clientType, setClientType] = useState('fetch'); // 'fetch' | 'axios'
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Inspector & Debugger State
  const [lastRequest, setLastRequest] = useState(null);

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editPost, setEditPost] = useState(null); // post object
  const [isPatchMode, setIsPatchMode] = useState(false);

  // New Post Form
  const [newPost, setNewPost] = useState({ title: '', body: '', userId: 1 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  // Helper to log inspector requests
  const logInspector = (method, url, headers, body, responseStatus, responseData, duration) => {
    setLastRequest({
      timestamp: new Date().toLocaleTimeString(),
      method,
      url,
      client: clientType,
      requestHeaders: headers,
      requestBody: body,
      status: responseStatus,
      duration: `${duration}ms`,
      responseData
    });
  };

  // 1. GET Request
  const fetchPosts = useCallback(async (simulatedError = null) => {
    setLoading(true);
    setError(null);
    const startTime = performance.now();
    const url = simulatedError ? `https://jsonplaceholder.typicode.com/${simulatedError}` : API_BASE;
    const reqHeaders = { 'Accept': 'application/json', 'User-Agent': 'React-REST-Masterclass/1.0' };

    try {
      let data, status = 200;

      if (clientType === 'fetch') {
        const response = await fetch(url, { headers: reqHeaders });
        status = response.status;
        if (!response.ok) throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        data = await response.json();
      } else {
        const response = await axiosSimulator.get(url, { headers: reqHeaders });
        data = response.data;
        status = response.status;
      }

      const duration = Math.round(performance.now() - startTime);
      setPosts(data);
      logInspector('GET', url, reqHeaders, null, `${status} OK`, data.slice(0, 3), duration);
      addToast(`Fetched ${data.length} posts via ${clientType.toUpperCase()}`, 'success');
    } catch (err) {
      const duration = Math.round(performance.now() - startTime);
      const errorMsg = err.message || 'Failed to fetch resource from API server.';
      setError(errorMsg);
      logInspector('GET', url, reqHeaders, null, err.response?.status || '500 Error', { error: errorMsg }, duration);
      addToast(`GET Failed: ${errorMsg}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [clientType, addToast]);

  // Run fetchPosts safely on initial mount and when clientType changes
  useEffect(() => {
    fetchPosts();
  }, [clientType]);

  // 2. POST Request
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.body.trim()) {
      addToast('Please fill in all fields', 'warning');
      return;
    }

    setIsSubmitting(true);
    const startTime = performance.now();
    const reqHeaders = { 'Content-Type': 'application/json; charset=UTF-8' };

    try {
      let createdData, status = 201;

      if (clientType === 'fetch') {
        const res = await fetch(API_BASE, {
          method: 'POST',
          headers: reqHeaders,
          body: JSON.stringify(newPost)
        });
        status = res.status;
        if (!res.ok) throw new Error(`Failed to create resource (${res.status})`);
        createdData = await res.json();
      } else {
        const res = await axiosSimulator.post(API_BASE, newPost, { headers: reqHeaders });
        createdData = res.data;
        status = res.status;
      }

      const duration = Math.round(performance.now() - startTime);
      // JSONPlaceholder returns id: 101 for created items
      const mockCreated = { ...createdData, id: Date.now() }; 
      setPosts(prev => [mockCreated, ...prev]);
      
      logInspector('POST', API_BASE, reqHeaders, newPost, `${status} Created`, mockCreated, duration);
      addToast('Resource created successfully!', 'success', `Assigned ID: ${mockCreated.id}`);
      setNewPost({ title: '', body: '', userId: 1 });
      setIsCreateOpen(false);
    } catch (err) {
      addToast(`POST Failed: ${err.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. PUT / PATCH Request
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    if (!editPost) return;

    setIsSubmitting(true);
    const startTime = performance.now();
    const method = isPatchMode ? 'PATCH' : 'PUT';
    const url = `${API_BASE}/${editPost.id}`;
    const reqHeaders = { 'Content-Type': 'application/json; charset=UTF-8' };
    const payload = isPatchMode 
      ? { title: editPost.title } // PATCH: Partial update
      : editPost;                 // PUT: Full resource replacement

    try {
      let updatedData, status = 200;

      if (clientType === 'fetch') {
        const res = await fetch(url, {
          method,
          headers: reqHeaders,
          body: JSON.stringify(payload)
        });
        status = res.status;
        if (!res.ok) throw new Error(`Update failed with status ${res.status}`);
        updatedData = await res.json();
      } else {
        const res = isPatchMode 
          ? await axiosSimulator.patch(url, payload, { headers: reqHeaders })
          : await axiosSimulator.put(url, payload, { headers: reqHeaders });
        updatedData = res.data;
        status = res.status;
      }

      const duration = Math.round(performance.now() - startTime);
      
      // Update local state UI
      setPosts(prev => prev.map(p => p.id === editPost.id ? { ...p, ...editPost } : p));
      
      logInspector(method, url, reqHeaders, payload, `${status} OK`, updatedData, duration);
      addToast(`${method} request completed!`, 'success', `Resource #${editPost.id} updated`);
      setEditPost(null);
    } catch (err) {
      addToast(`Update Failed: ${err.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. DELETE Request
  const handleDeletePost = async (id) => {
    const startTime = performance.now();
    const url = `${API_BASE}/${id}`;
    const reqHeaders = { 'Accept': 'application/json' };

    // Optimistic UI Removal
    const previousPosts = [...posts];
    setPosts(prev => prev.filter(p => p.id !== id));

    try {
      let status = 200;
      if (clientType === 'fetch') {
        const res = await fetch(url, { method: 'DELETE', headers: reqHeaders });
        status = res.status;
        if (!res.ok) throw new Error(`Delete failed status ${res.status}`);
      } else {
        const res = await axiosSimulator.delete(url, { headers: reqHeaders });
        status = res.status;
      }

      const duration = Math.round(performance.now() - startTime);
      logInspector('DELETE', url, reqHeaders, null, `${status} OK / 204 No Content`, { success: true, id }, duration);
      addToast(`Post #${id} deleted successfully`, 'success');
    } catch (err) {
      // Rollback optimistic delete on failure
      setPosts(previousPosts);
      addToast(`DELETE Failed: ${err.message}. Rolled back.`, 'error');
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.body.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUser = selectedUser === 'all' || post.userId === Number(selectedUser);
    return matchesSearch && matchesUser;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-900">
      
      {}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20">
              <Globe className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                REST API Integration
              </h1>
              <p className="text-xs text-cyan-400 font-medium">Week 5 • Day 2 Masterclass</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl text-sm">
            <button
              onClick={() => setActiveTab('app')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'app' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>API Playground</span>
            </button>
            <button
              onClick={() => setActiveTab('inspector')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'inspector' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>HTTP Inspector</span>
              {lastRequest && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('theory')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'theory' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>REST Concepts</span>
            </button>
          </div>

          {/* HTTP Client Switcher */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-400 font-medium">Client:</span>
            <button
              onClick={() => {
                setClientType('fetch');
                addToast('Switched to Native fetch() API', 'info');
              }}
              className={`text-xs font-semibold px-2 py-0.5 rounded-md transition-all ${
                clientType === 'fetch'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              fetch()
            </button>
            <button
              onClick={() => {
                setClientType('axios');
                addToast('Switched to Axios HTTP Client', 'info');
              }}
              className={`text-xs font-semibold px-2 py-0.5 rounded-md transition-all ${
                clientType === 'axios'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Axios
            </button>
          </div>

        </div>
      </header>

      {}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* TAB 1: API PLAYGROUND & CRUD INTERFACE */}
        {activeTab === 'app' && (
          <div className="space-y-6">
            
            {/* Control Panel Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search & Filter */}
              <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-all text-slate-200 placeholder-slate-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    value={selectedUser}
                    onChange={(e) => { setSelectedUser(e.target.value); setCurrentPage(1); }}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 text-slate-300 w-full"
                  >
                    <option value="all">All User Authors</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => (
                      <option key={id} value={id}>User Author #{id}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons & Simulation Tools */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => setIsCreateOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>POST New</span>
                </button>

                <button
                  onClick={() => fetchPosts()}
                  disabled={loading}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all border border-slate-700 hover:text-white disabled:opacity-50"
                  title="Refetch API Data"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
                </button>

                {/* Error Tester Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-1 px-3 py-2 bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/50 rounded-xl text-xs font-semibold transition-all">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Test Errors</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-30">
                    <button
                      onClick={() => fetchPosts('invalid-endpoint-404')}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-800 text-slate-300 flex items-center justify-between"
                    >
                      <span>Simulate 404</span>
                      <span className="font-mono text-rose-400">NOT FOUND</span>
                    </button>
                    <button
                      onClick={() => fetchPosts('500-server-error')}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-800 text-slate-300 flex items-center justify-between"
                    >
                      <span>Simulate 500</span>
                      <span className="font-mono text-rose-400">SERVER ERR</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Error Banner State */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/60 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-rose-200">API Connection Error</h3>
                    <p className="text-xs text-rose-300/80 mt-0.5">{error}</p>
                  </div>
                </div>
                <button
                  onClick={() => fetchPosts()}
                  className="px-3 py-1.5 bg-rose-900/50 hover:bg-rose-800/60 border border-rose-700/50 text-rose-200 rounded-lg text-xs font-medium transition-all"
                >
                  Retry GET
                </button>
              </div>
            )}

            {/* Skeleton Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-4 animate-pulse">
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-slate-800 rounded w-1/4"></div>
                      <div className="h-4 bg-slate-800 rounded w-12"></div>
                    </div>
                    <div className="h-6 bg-slate-800 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-800 rounded w-full"></div>
                      <div className="h-3 bg-slate-800 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Posts Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedPosts.length > 0 ? (
                  displayedPosts.map(post => (
                    <div
                      key={post.id}
                      className="p-6 bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 rounded-2xl flex flex-col justify-between gap-4 transition-all hover:shadow-xl hover:shadow-cyan-950/10 group relative"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/60 text-cyan-300 font-semibold">
                            ID: #{post.id}
                          </span>
                          <span className="text-slate-400">User Author #{post.userId}</span>
                        </div>

                        <h3 className="font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2 capitalize">
                          {post.title}
                        </h3>

                        <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
                          {post.body}
                        </p>
                      </div>

                      {/* Card Action Controls */}
                      <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => { setEditPost({ ...post }); setIsPatchMode(false); }}
                            className="px-2.5 py-1.5 bg-slate-800 hover:bg-blue-900/40 hover:text-blue-300 border border-slate-700/60 rounded-lg text-slate-300 transition-all flex items-center gap-1"
                            title="PUT (Full Replace)"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>PUT</span>
                          </button>
                          
                          <button
                            onClick={() => { setEditPost({ ...post }); setIsPatchMode(true); }}
                            className="px-2.5 py-1.5 bg-slate-800 hover:bg-amber-900/40 hover:text-amber-300 border border-slate-700/60 rounded-lg text-slate-300 transition-all flex items-center gap-1"
                            title="PATCH (Partial Edit)"
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>PATCH</span>
                          </button>
                        </div>

                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="px-2.5 py-1.5 bg-rose-950/30 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 rounded-lg transition-all flex items-center gap-1"
                          title="DELETE Resource"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>DELETE</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center space-y-3 bg-slate-900/30 rounded-2xl border border-slate-800/50">
                    <Database className="w-10 h-10 text-slate-600 mx-auto" />
                    <p className="text-slate-400 font-medium">No posts matched your filter or search query.</p>
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedUser('all'); }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl text-slate-200 transition-all"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 text-sm">
                <span className="text-slate-400 text-xs">
                  Showing Page <strong className="text-slate-200">{currentPage}</strong> of <strong className="text-slate-200">{totalPages}</strong>
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-medium hover:bg-slate-800 disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-medium hover:bg-slate-800 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: LIVE HTTP INSPECTOR & LOGS */}
        {activeTab === 'inspector' && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Terminal className="w-6 h-6 text-cyan-400" />
                  <div>
                    <h2 className="font-bold text-lg text-slate-100">Live Request & Response Inspector</h2>
                    <p className="text-xs text-slate-400">Examine raw HTTP headers, timing, status codes, and payloads</p>
                  </div>
                </div>

                {lastRequest && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-950 border border-emerald-800 text-emerald-300">
                    STATUS: {lastRequest.status}
                  </span>
                )}
              </div>

              {lastRequest ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Request Column */}
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                      <span className="font-bold text-cyan-400 uppercase">HTTP REQUEST</span>
                      <span>Client: {lastRequest.client.toUpperCase()}</span>
                    </div>

                    <div>
                      <p className="text-slate-500 font-semibold mb-1">// Endpoint URL</p>
                      <p className="text-emerald-400 font-bold">{lastRequest.method} {lastRequest.url}</p>
                    </div>

                    <div>
                      <p className="text-slate-500 font-semibold mb-1">// Request Headers</p>
                      <pre className="p-3 bg-slate-900 rounded-lg text-slate-300 overflow-x-auto">
                        {JSON.stringify(lastRequest.requestHeaders, null, 2)}
                      </pre>
                    </div>

                    {lastRequest.requestBody && (
                      <div>
                        <p className="text-slate-500 font-semibold mb-1">// Request Payload (Body)</p>
                        <pre className="p-3 bg-slate-900 rounded-lg text-amber-300 overflow-x-auto">
                          {JSON.stringify(lastRequest.requestBody, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Response Column */}
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                      <span className="font-bold text-purple-400 uppercase">HTTP RESPONSE</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {lastRequest.duration}
                      </span>
                    </div>

                    <div>
                      <p className="text-slate-500 font-semibold mb-1">// Response Metadata</p>
                      <div className="p-3 bg-slate-900 rounded-lg space-y-1 text-slate-300">
                        <p><span className="text-slate-500">Timestamp:</span> {lastRequest.timestamp}</p>
                        <p><span className="text-slate-500">Status Code:</span> <span className="text-emerald-400 font-bold">{lastRequest.status}</span></p>
                      </div>
                    </div>

                    <div>
                      <p className="text-slate-500 font-semibold mb-1">// Response Data (JSON Payload)</p>
                      <pre className="p-3 bg-slate-900 rounded-lg text-cyan-300 max-h-80 overflow-y-auto">
                        {JSON.stringify(lastRequest.responseData, null, 2)}
                      </pre>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 space-y-2">
                  <Activity className="w-8 h-8 mx-auto text-slate-600" />
                  <p>No API requests executed yet. Perform CRUD actions in the API Playground tab.</p>
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 3: REST API CONCEPTS & THEORY GUIDE */}
        {activeTab === 'theory' && (
          <div className="space-y-8">
            
            {/* Header intro */}
            <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-2">REST API Architecture & HTTP Standards</h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server protocol—almost always HTTP.
              </p>
            </div>

            {/* HTTP Verbs Grid */}
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <Send className="w-5 h-5 text-cyan-400" />
                <span>Core HTTP Request Methods</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold font-mono rounded">GET</span>
                    <span className="text-xs text-slate-500">Read / Retrieve</span>
                  </div>
                  <h4 className="font-semibold text-slate-200 text-sm">Fetch Resources</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Requests data from a specified resource. GET requests should only retrieve data and have no other effect on data (Idempotent).
                  </p>
                </div>

                <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-blue-950 border border-blue-800 text-blue-300 text-xs font-bold font-mono rounded">POST</span>
                    <span className="text-xs text-slate-500">Create</span>
                  </div>
                  <h4 className="font-semibold text-slate-200 text-sm">Create New Resource</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Submits data payload to be processed to a specified resource. Typically results in creation of a new entry or record.
                  </p>
                </div>

                <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-bold font-mono rounded">PUT</span>
                    <span className="text-xs text-slate-500">Replace</span>
                  </div>
                  <h4 className="font-semibold text-slate-200 text-sm">Full Resource Replacement</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Replaces all current representations of the target resource with the request payload provided.
                  </p>
                </div>

                <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-amber-950 border border-amber-800 text-amber-300 text-xs font-bold font-mono rounded">PATCH</span>
                    <span className="text-xs text-slate-500">Modify</span>
                  </div>
                  <h4 className="font-semibold text-slate-200 text-sm">Partial Update</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Applies partial modifications to a resource, updating only the specific properties submitted in the payload.
                  </p>
                </div>

                <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-rose-950 border border-rose-800 text-rose-300 text-xs font-bold font-mono rounded">DELETE</span>
                    <span className="text-xs text-slate-500">Remove</span>
                  </div>
                  <h4 className="font-semibold text-slate-200 text-sm">Remove Resource</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Deletes the specified resource target permanently from the backend server database.
                  </p>
                </div>

                <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-purple-950 border border-purple-800 text-purple-300 text-xs font-bold font-mono rounded">HEADERS</span>
                    <span className="text-xs text-slate-500">Metadata</span>
                  </div>
                  <h4 className="font-semibold text-slate-200 text-sm">Content-Type & Auth</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Includes headers such as <code className="text-cyan-400">Content-Type: application/json</code> and Bearer Tokens for authentication.
                  </p>
                </div>
              </div>
            </div>

            {/* HTTP Status Codes Reference */}
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                <span>Standard HTTP Status Code Ranges</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <p className="text-emerald-400 font-bold">200 OK</p>
                  <p className="text-slate-400 font-sans">Standard successful HTTP request response.</p>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <p className="text-emerald-400 font-bold">201 Created</p>
                  <p className="text-slate-400 font-sans">Resource created successfully via POST.</p>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <p className="text-amber-400 font-bold">400 Bad Request</p>
                  <p className="text-slate-400 font-sans">Server cannot process invalid request payload.</p>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <p className="text-rose-400 font-bold">404 Not Found</p>
                  <p className="text-slate-400 font-sans">Requested API resource URI does not exist.</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-slate-100">POST New Resource to API</h3>
              </div>
              <button onClick={() => setIsCreateOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Post Title</label>
                <input
                  type="text"
                  placeholder="Enter dynamic title..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-slate-200"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Author User ID</label>
                <select
                  value={newPost.userId}
                  onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-slate-200"
                >
                  {[1, 2, 3, 4, 5].map(id => (
                    <option key={id} value={id}>User Author #{id}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Body Content</label>
                <textarea
                  rows="4"
                  placeholder="Enter body content text..."
                  value={newPost.body}
                  onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-slate-200"
                  required
                ></textarea>
              </div>

              {/* Payload Header Preview */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <p className="text-slate-500 font-semibold">// Request Headers</p>
                <p className="text-cyan-400">Content-Type: application/json; charset=UTF-8</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Submit POST</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {}
      {editPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                {isPatchMode ? <Zap className="w-5 h-5 text-amber-400" /> : <Edit3 className="w-5 h-5 text-blue-400" />}
                <h3 className="font-bold text-slate-100">
                  {isPatchMode ? 'PATCH Request (Partial Edit)' : 'PUT Request (Full Resource Replacement)'}
                </h3>
              </div>
              <button onClick={() => setEditPost(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Title {isPatchMode && '(Modifying title parameter)'}
                </label>
                <input
                  type="text"
                  value={editPost.title}
                  onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-slate-200"
                  required
                />
              </div>

              {!isPatchMode && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Body Payload (PUT requires complete object)
                  </label>
                  <textarea
                    rows="4"
                    value={editPost.body}
                    onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-slate-200"
                    required
                  ></textarea>
                </div>
              )}

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-400">
                <p className="text-slate-500 font-semibold mb-1">// Endpoint</p>
                <p className="text-amber-300">{isPatchMode ? 'PATCH' : 'PUT'} https://jsonplaceholder.typicode.com/posts/{editPost.id}</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditPost(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-slate-950 rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-2 ${
                    isPatchMode ? 'bg-amber-400 hover:bg-amber-300' : 'bg-blue-400 hover:bg-blue-300'
                  }`}
                >
                  {isSubmitting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Execute {isPatchMode ? 'PATCH' : 'PUT'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}