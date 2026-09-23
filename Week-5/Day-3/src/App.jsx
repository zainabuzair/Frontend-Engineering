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
  ExternalLink,
  Sparkles
} from 'lucide-react';

// Simulated Axios client wrapper around native fetch for seamless dual-client switching
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

const ENGLISH_POSTS_LIBRARY = [
  {
    title: "Understanding RESTful Web Services & Principles",
    body: "REST APIs communicate via HTTP requests to perform standard database functions like creating, reading, updating, and deleting records (CRUD) within a stateless client-server architecture."
  },
  {
    title: "Mastering Asynchronous JavaScript with Async/Await",
    body: "Async/await simplifies handling asynchronous HTTP requests in JavaScript, eliminating nested promise callbacks and providing clean error handling with try/catch blocks."
  },
  {
    title: "Comparing Native Fetch API with Axios HTTP Client",
    body: "While the native fetch API is built into modern browsers without external dependencies, Axios offers automatic JSON transformation, request interception, and easier timeout handling."
  },
  {
    title: "Effective State Management for Async API Calls in React",
    body: "Managing loading indicators, server error states, and cached data effectively improves user experience and prevents UI freezes during heavy background network operations."
  },
  {
    title: "Handling HTTP Errors and Network Exceptions Gracefully",
    body: "Properly identifying 4xx client errors and 5xx server status codes allows web applications to display informative toast notifications and actionable retry prompts to users."
  },
  {
    title: "Optimistic UI Updates for Snappy User Interfaces",
    body: "Optimistic UI immediately updates the user interface before the server response returns, reverting changes gracefully if the background network request fails."
  },
  {
    title: "Implementing Authorization with Bearer Tokens in Headers",
    body: "Secure API integrations attach JWT Bearer tokens to the Authorization header of outbound HTTP requests, verifying user identity across stateless API endpoints."
  },
  {
    title: "Understanding HTTP Verbs: GET, POST, PUT, PATCH, DELETE",
    body: "Choosing the correct HTTP verb ensures API semantic standards: GET retrieves data, POST creates resources, PUT replaces entirely, PATCH updates partially, and DELETE removes resources."
  },
  {
    title: "Pagination and Query Filtering for Large Datasets",
    body: "Fetching large collections in paginated chunks using limit and page query parameters reduces initial load times and conserves network bandwidth."
  },
  {
    title: "Debugging REST APIs with Request and Response Inspectors",
    body: "Inspecting raw headers, payloads, status codes, and network latency helps developers quickly isolate backend issues and verify endpoint behavior."
  }
];

// Helper to replace raw Latin placeholder text from JSONPlaceholder with English learning topics
const convertToEnglish = (post) => {
  if (!post || typeof post !== 'object') return post;
  const isLatin = /lorem|ipsum|dolor|sunt|aut|voluptat|quia|eaque|perspiciatis|est|eos/i.test(post.title || '');
  if (isLatin || !post.title) {
    const libraryIndex = Math.abs((post.id || 1) - 1) % ENGLISH_POSTS_LIBRARY.length;
    const sample = ENGLISH_POSTS_LIBRARY[libraryIndex];
    return {
      ...post,
      title: `${sample.title} (#${post.id})`,
      body: sample.body
    };
  }
  return post;
};

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

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
            className={`pointer-events-auto p-4 rounded-2xl shadow-lg border backdrop-blur-md transition-all duration-300 transform translate-y-0 flex items-start gap-3 ${
              toast.type === 'success' ? 'bg-emerald-50/95 border-emerald-200 text-emerald-900' :
              toast.type === 'error' ? 'bg-rose-50/95 border-rose-200 text-rose-900' :
              toast.type === 'warning' ? 'bg-amber-50/95 border-amber-200 text-amber-900' :
              'bg-sky-50/95 border-sky-200 text-sky-900'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />}
            
            <div className="flex-1 text-sm">
              <p className="font-semibold">{toast.message}</p>
              {toast.details && <p className="text-xs opacity-75 mt-1 font-mono">{toast.details}</p>}
            </div>
            
            <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600 transition-colors">
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

  // Application Tab & Client States
  const [activeTab, setActiveTab] = useState('app'); // 'app' | 'theory' | 'inspector'
  const [clientType, setClientType] = useState('fetch'); // 'fetch' | 'axios'
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Inspector & Debugger State
  const [lastRequest, setLastRequest] = useState(null);

  // Modal Dialog States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [isPatchMode, setIsPatchMode] = useState(false);

  // New Post Form State
  const [newPost, setNewPost] = useState({ title: '', body: '', userId: 1 });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const englishData = Array.isArray(data) ? data.map(convertToEnglish) : data;
      setPosts(englishData);
      logInspector('GET', url, reqHeaders, null, `${status} OK`, englishData.slice(0, 3), duration);
      addToast(`Fetched ${englishData.length} posts via ${clientType.toUpperCase()}`, 'success');
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

  useEffect(() => {
    fetchPosts();
  }, [clientType]);

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
    <div className="min-h-screen bg-[#FAF8F5] text-slate-700 font-sans antialiased selection:bg-purple-200 selection:text-purple-900">
      
      {/* Pastel Soft Gradient Header */}
      <header className="sticky top-0 z-40 border-b border-rose-100/80 bg-white/70 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-pink-200 via-purple-200 to-indigo-200 rounded-xl shadow-sm text-purple-900">
              <Globe className="w-5 h-5 text-purple-800" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-800 flex items-center gap-1.5">
                REST API Integration
                <Sparkles className="w-4 h-4 text-pink-400 inline" />
              </h1>
              <p className="text-xs text-purple-600 font-medium">Week 5 • Day 2 Masterclass</p>
            </div>
          </div>

          {/* Navigation Tabs - Pastel Pills */}
          <div className="flex items-center bg-purple-50/70 border border-purple-100 p-1 rounded-2xl text-sm">
            <button
              onClick={() => setActiveTab('app')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                activeTab === 'app' 
                  ? 'bg-white text-purple-900 shadow-sm border border-purple-100 font-semibold' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Database className="w-4 h-4 text-purple-500" />
              <span>API Playground</span>
            </button>
            <button
              onClick={() => setActiveTab('inspector')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                activeTab === 'inspector' 
                  ? 'bg-white text-purple-900 shadow-sm border border-purple-100 font-semibold' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Terminal className="w-4 h-4 text-sky-500" />
              <span>HTTP Inspector</span>
              {lastRequest && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('theory')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                activeTab === 'theory' 
                  ? 'bg-white text-purple-900 shadow-sm border border-purple-100 font-semibold' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4 text-pink-500" />
              <span>REST Concepts</span>
            </button>
          </div>

          {/* HTTP Client Switcher - Soft Pastel Buttons */}
          <div className="hidden sm:flex items-center gap-2 bg-purple-50/70 border border-purple-100 px-3 py-1.5 rounded-2xl">
            <Cpu className="w-4 h-4 text-purple-500" />
            <span className="text-xs text-slate-500 font-medium">Client:</span>
            <button
              onClick={() => {
                setClientType('fetch');
                addToast('Switched to Native fetch() API', 'info');
              }}
              className={`text-xs font-semibold px-2.5 py-1 rounded-xl transition-all ${
                clientType === 'fetch'
                  ? 'bg-sky-200 text-sky-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              fetch()
            </button>
            <button
              onClick={() => {
                setClientType('axios');
                addToast('Switched to Axios HTTP Client', 'info');
              }}
              className={`text-xs font-semibold px-2.5 py-1 rounded-xl transition-all ${
                clientType === 'axios'
                  ? 'bg-purple-200 text-purple-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Axios
            </button>
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Tab 1: API Playground */}
        {activeTab === 'app' && (
          <div className="space-y-6">
            
            {/* Control Panel Bar */}
            <div className="p-4 rounded-2xl bg-white/80 border border-purple-100/80 shadow-sm backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="w-full pl-9 pr-4 py-2 bg-rose-50/30 border border-purple-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all text-slate-700 placeholder-slate-400"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <SlidersHorizontal className="w-4 h-4 text-purple-400 shrink-0" />
                  <select
                    value={selectedUser}
                    onChange={(e) => { setSelectedUser(e.target.value); setCurrentPage(1); }}
                    className="bg-rose-50/30 border border-purple-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 text-slate-700 w-full"
                  >
                    <option value="all">All User Authors</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => (
                      <option key={id} value={id}>User Author #{id}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => setIsCreateOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 hover:from-pink-300 hover:to-indigo-300 text-purple-950 font-semibold rounded-xl text-sm transition-all shadow-sm active:scale-95 border border-purple-200/50"
                >
                  <PlusCircle className="w-4 h-4 text-purple-800" />
                  <span>POST New</span>
                </button>

                <button
                  onClick={() => fetchPosts()}
                  disabled={loading}
                  className="p-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl transition-all border border-purple-100 disabled:opacity-50"
                  title="Refetch API Data"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-purple-600' : ''}`} />
                </button>

                {/* Error Tester Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-1.5 px-3 py-2 bg-rose-100/70 hover:bg-rose-200/80 text-rose-800 border border-rose-200 rounded-xl text-xs font-semibold transition-all">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Test Errors</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-rose-100 rounded-2xl shadow-xl p-2 hidden group-hover:block z-30">
                    <button
                      onClick={() => fetchPosts('invalid-endpoint-404')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-rose-50 text-slate-700 flex items-center justify-between transition-colors"
                    >
                      <span>Simulate 404</span>
                      <span className="font-mono text-rose-600 font-bold">NOT FOUND</span>
                    </button>
                    <button
                      onClick={() => fetchPosts('500-server-error')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-rose-50 text-slate-700 flex items-center justify-between transition-colors"
                    >
                      <span>Simulate 500</span>
                      <span className="font-mono text-rose-600 font-bold">SERVER ERR</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-rose-900">API Connection Error</h3>
                    <p className="text-xs text-rose-700 mt-0.5">{error}</p>
                  </div>
                </div>
                <button
                  onClick={() => fetchPosts()}
                  className="px-3 py-1.5 bg-rose-200/80 hover:bg-rose-300 border border-rose-300 text-rose-900 rounded-xl text-xs font-medium transition-all"
                >
                  Retry GET
                </button>
              </div>
            )}

            {/* Posts Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="p-6 bg-white/60 border border-purple-100 rounded-2xl space-y-4 animate-pulse">
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-purple-100 rounded-lg w-1/4"></div>
                      <div className="h-4 bg-purple-100 rounded-lg w-12"></div>
                    </div>
                    <div className="h-6 bg-purple-100 rounded-lg w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-purple-100 rounded-lg w-full"></div>
                      <div className="h-3 bg-purple-100 rounded-lg w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedPosts.length > 0 ? (
                  displayedPosts.map(post => (
                    <div
                      key={post.id}
                      className="p-6 bg-white/90 border border-purple-100/90 hover:border-purple-300/80 rounded-2xl flex flex-col justify-between gap-4 transition-all shadow-sm hover:shadow-md group relative"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="px-2.5 py-0.5 rounded-xl bg-purple-100 text-purple-800 font-semibold border border-purple-200/60">
                            ID: #{post.id}
                          </span>
                          <span className="text-slate-400 font-sans">User Author #{post.userId}</span>
                        </div>

                        <h3 className="font-semibold text-slate-800 group-hover:text-purple-700 transition-colors line-clamp-2 capitalize">
                          {post.title}
                        </h3>

                        <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                          {post.body}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-purple-50 flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => { setEditPost({ ...post }); setIsPatchMode(false); }}
                            className="px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200/70 rounded-xl transition-all flex items-center gap-1 font-medium"
                            title="PUT (Full Replace)"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-sky-600" />
                            <span>PUT</span>
                          </button>
                          
                          <button
                            onClick={() => { setEditPost({ ...post }); setIsPatchMode(true); }}
                            className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/70 rounded-xl transition-all flex items-center gap-1 font-medium"
                            title="PATCH (Partial Edit)"
                          >
                            <Zap className="w-3.5 h-3.5 text-amber-600" />
                            <span>PATCH</span>
                          </button>
                        </div>

                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200/70 rounded-xl transition-all flex items-center gap-1 font-medium"
                          title="DELETE Resource"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                          <span>DELETE</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center space-y-3 bg-white/50 rounded-2xl border border-purple-100">
                    <Database className="w-10 h-10 text-purple-300 mx-auto" />
                    <p className="text-slate-500 font-medium">No posts matched your filter or search query.</p>
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedUser('all'); }}
                      className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-xs font-semibold rounded-xl text-purple-800 transition-all"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-purple-100/80 text-sm">
                <span className="text-slate-500 text-xs">
                  Showing Page <strong className="text-purple-900">{currentPage}</strong> of <strong className="text-purple-900">{totalPages}</strong>
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className="px-3.5 py-1.5 bg-white border border-purple-100 rounded-xl text-xs font-medium hover:bg-purple-50 text-slate-700 disabled:opacity-40 shadow-sm"
                  >
                    Previous
                  </button>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="px-3.5 py-1.5 bg-white border border-purple-100 rounded-xl text-xs font-medium hover:bg-purple-50 text-slate-700 disabled:opacity-40 shadow-sm"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Tab 2: HTTP Inspector */}
        {activeTab === 'inspector' && (
          <div className="space-y-6">
            <div className="p-6 bg-white/90 border border-purple-100 rounded-2xl space-y-6 shadow-sm">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sky-100 text-sky-800 rounded-xl">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-slate-800">Live Request & Response Inspector</h2>
                    <p className="text-xs text-slate-500">Examine raw HTTP headers, timing, status codes, and payloads</p>
                  </div>
                </div>

                {lastRequest && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 border border-emerald-300 text-emerald-800">
                    STATUS: {lastRequest.status}
                  </span>
                )}
              </div>

              {lastRequest ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Request Column */}
                  <div className="space-y-4 bg-slate-900 text-slate-200 p-5 rounded-2xl border border-slate-800 font-mono text-xs shadow-inner">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                      <span className="font-bold text-pink-300 uppercase">HTTP REQUEST</span>
                      <span>Client: {lastRequest.client.toUpperCase()}</span>
                    </div>

                    <div>
                      <p className="text-slate-400 font-semibold mb-1">// Endpoint URL</p>
                      <p className="text-emerald-300 font-bold">{lastRequest.method} {lastRequest.url}</p>
                    </div>

                    <div>
                      <p className="text-slate-400 font-semibold mb-1">// Request Headers</p>
                      <pre className="p-3 bg-slate-950/80 rounded-xl text-purple-200 overflow-x-auto border border-slate-800">
                        {JSON.stringify(lastRequest.requestHeaders, null, 2)}
                      </pre>
                    </div>

                    {lastRequest.requestBody && (
                      <div>
                        <p className="text-slate-400 font-semibold mb-1">// Request Payload (Body)</p>
                        <pre className="p-3 bg-slate-950/80 rounded-xl text-amber-300 overflow-x-auto border border-slate-800">
                          {JSON.stringify(lastRequest.requestBody, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Response Column */}
                  <div className="space-y-4 bg-slate-900 text-slate-200 p-5 rounded-2xl border border-slate-800 font-mono text-xs shadow-inner">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                      <span className="font-bold text-sky-300 uppercase">HTTP RESPONSE</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {lastRequest.duration}
                      </span>
                    </div>

                    <div>
                      <p className="text-slate-400 font-semibold mb-1">// Response Metadata</p>
                      <div className="p-3 bg-slate-950/80 rounded-xl space-y-1 text-slate-300 border border-slate-800">
                        <p><span className="text-slate-500">Timestamp:</span> {lastRequest.timestamp}</p>
                        <p><span className="text-slate-500">Status Code:</span> <span className="text-emerald-300 font-bold">{lastRequest.status}</span></p>
                      </div>
                    </div>

                    <div>
                      <p className="text-slate-400 font-semibold mb-1">// Response Data (JSON Payload)</p>
                      <pre className="p-3 bg-slate-950/80 rounded-xl text-sky-200 max-h-80 overflow-y-auto border border-slate-800">
                        {JSON.stringify(lastRequest.responseData, null, 2)}
                      </pre>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="py-16 text-center text-slate-400 space-y-2 bg-purple-50/30 rounded-2xl border border-purple-100">
                  <Activity className="w-8 h-8 mx-auto text-purple-300" />
                  <p>No API requests executed yet. Perform CRUD actions in the API Playground tab.</p>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Tab 3: REST Concepts */}
        {activeTab === 'theory' && (
          <div className="space-y-8">
            
            <div className="p-6 bg-gradient-to-r from-pink-100/70 via-purple-100/70 to-indigo-100/70 border border-purple-200/60 rounded-2xl">
              <h2 className="text-xl font-bold text-slate-800 mb-2">REST API Architecture & HTTP Standards</h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server protocol—almost always HTTP.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Send className="w-5 h-5 text-purple-500" />
                <span>Core HTTP Request Methods</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-5 bg-white border border-emerald-200/80 rounded-2xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold font-mono rounded-xl">GET</span>
                    <span className="text-xs text-slate-400 font-medium">Read / Retrieve</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm">Fetch Resources</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Requests data from a specified resource. GET requests should only retrieve data and have no other effect on data (Idempotent).
                  </p>
                </div>

                <div className="p-5 bg-white border border-sky-200/80 rounded-2xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-sky-100 text-sky-800 border border-sky-300 text-xs font-bold font-mono rounded-xl">POST</span>
                    <span className="text-xs text-slate-400 font-medium">Create</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm">Create New Resource</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Submits data payload to be processed to a specified resource. Typically results in creation of a new entry or record.
                  </p>
                </div>

                <div className="p-5 bg-white border border-indigo-200/80 rounded-2xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 border border-indigo-300 text-xs font-bold font-mono rounded-xl">PUT</span>
                    <span className="text-xs text-slate-400 font-medium">Replace</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm">Full Resource Replacement</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Replaces all current representations of the target resource with the request payload provided.
                  </p>
                </div>

                <div className="p-5 bg-white border border-amber-200/80 rounded-2xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold font-mono rounded-xl">PATCH</span>
                    <span className="text-xs text-slate-400 font-medium">Modify</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm">Partial Update</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Applies partial modifications to a resource, updating only the specific properties submitted in the payload.
                  </p>
                </div>

                <div className="p-5 bg-white border border-rose-200/80 rounded-2xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold font-mono rounded-xl">DELETE</span>
                    <span className="text-xs text-slate-400 font-medium">Remove</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm">Remove Resource</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Deletes the specified resource target permanently from the backend server database.
                  </p>
                </div>

                <div className="p-5 bg-white border border-purple-200/80 rounded-2xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-purple-100 text-purple-800 border border-purple-300 text-xs font-bold font-mono rounded-xl">HEADERS</span>
                    <span className="text-xs text-slate-400 font-medium">Metadata</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm">Content-Type & Auth</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Includes headers such as <code className="text-purple-700 font-semibold">Content-Type: application/json</code> and Bearer Tokens for authentication.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-500" />
                <span>Standard HTTP Status Code Ranges</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-4 bg-white border border-emerald-200 rounded-2xl space-y-1 shadow-sm">
                  <p className="text-emerald-700 font-bold">200 OK</p>
                  <p className="text-slate-500 font-sans">Standard successful HTTP request response.</p>
                </div>
                <div className="p-4 bg-white border border-emerald-200 rounded-2xl space-y-1 shadow-sm">
                  <p className="text-emerald-700 font-bold">201 Created</p>
                  <p className="text-slate-500 font-sans">Resource created successfully via POST.</p>
                </div>
                <div className="p-4 bg-white border border-amber-200 rounded-2xl space-y-1 shadow-sm">
                  <p className="text-amber-700 font-bold">400 Bad Request</p>
                  <p className="text-slate-500 font-sans">Server cannot process invalid request payload.</p>
                </div>
                <div className="p-4 bg-white border border-rose-200 rounded-2xl space-y-1 shadow-sm">
                  <p className="text-rose-700 font-bold">404 Not Found</p>
                  <p className="text-slate-500 font-sans">Requested API resource URI does not exist.</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Modal: POST New Resource */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-purple-100 w-full max-w-lg rounded-3xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 text-slate-800">
            
            <div className="flex items-center justify-between pb-3 border-b border-purple-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-pink-100 text-pink-700 rounded-xl">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800">POST New Resource to API</h3>
              </div>
              <button onClick={() => setIsCreateOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Post Title</label>
                <input
                  type="text"
                  placeholder="Enter dynamic title..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-rose-50/30 border border-purple-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 text-slate-700"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Author User ID</label>
                <select
                  value={newPost.userId}
                  onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-rose-50/30 border border-purple-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 text-slate-700"
                >
                  {[1, 2, 3, 4, 5].map(id => (
                    <option key={id} value={id}>User Author #{id}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Body Content</label>
                <textarea
                  rows="4"
                  placeholder="Enter body content text..."
                  value={newPost.body}
                  onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-rose-50/30 border border-purple-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 text-slate-700"
                  required
                ></textarea>
              </div>

              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 font-mono text-xs space-y-1">
                <p className="text-slate-400 font-semibold">// Request Headers</p>
                <p className="text-purple-700">Content-Type: application/json; charset=UTF-8</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 hover:from-pink-300 hover:to-indigo-300 text-purple-950 rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm border border-purple-200"
                >
                  {isSubmitting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Submit POST</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Modal: PUT / PATCH Post */}
      {editPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-purple-100 w-full max-w-lg rounded-3xl shadow-2xl p-6 space-y-5 text-slate-800">
            
            <div className="flex items-center justify-between pb-3 border-b border-purple-100">
              <div className="flex items-center gap-2">
                {isPatchMode ? (
                  <div className="p-1.5 bg-amber-100 text-amber-700 rounded-xl">
                    <Zap className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="p-1.5 bg-sky-100 text-sky-700 rounded-xl">
                    <Edit3 className="w-5 h-5" />
                  </div>
                )}
                <h3 className="font-bold text-slate-800">
                  {isPatchMode ? 'PATCH Request (Partial Edit)' : 'PUT Request (Full Resource Replacement)'}
                </h3>
              </div>
              <button onClick={() => setEditPost(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Title {isPatchMode && '(Modifying title parameter)'}
                </label>
                <input
                  type="text"
                  value={editPost.title}
                  onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-rose-50/30 border border-purple-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 text-slate-700"
                  required
                />
              </div>

              {!isPatchMode && (
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    Body Payload (PUT requires complete object)
                  </label>
                  <textarea
                    rows="4"
                    value={editPost.body}
                    onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-rose-50/30 border border-purple-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 text-slate-700"
                    required
                  ></textarea>
                </div>
              )}

              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 font-mono text-xs text-slate-600">
                <p className="text-slate-400 font-semibold mb-1">// Endpoint</p>
                <p className="text-purple-800 font-semibold">{isPatchMode ? 'PATCH' : 'PUT'} https://jsonplaceholder.typicode.com/posts/{editPost.id}</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditPost(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-slate-900 rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm border ${
                    isPatchMode ? 'bg-amber-200 hover:bg-amber-300 border-amber-300 text-amber-950' : 'bg-sky-200 hover:bg-sky-300 border-sky-300 text-sky-950'
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