import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  KeyRound, 
  Terminal,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

// --- Helper Functions & Auth Simulator ---
const simulateJWT = (userData) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: userData.email,
    name: userData.fullName || userData.email.split('@')[0],
    role: 'developer',
    exp: Math.floor(Date.now() / 1000) + 3600
  }));
  const signature = 'simulated_signature_hash_xyz123';
  return `${header}.${payload}.${signature}`;
};

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const evaluatePasswordStrength = (pass) => {
  let score = 0;
  if (pass.length >= 8) score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;

  if (score <= 1) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-400', percent: '25%' };
  if (score === 2 || score === 3) return { label: 'Medium', color: 'bg-amber-500', text: 'text-amber-400', percent: '65%' };
  return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-400', percent: '100%' };
};

export default function App() {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [userSession, setUserSession] = useState(null);
  const [authToken, setAuthToken] = useState('');

  // Re-hydrate session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('day4_auth_token');
    if (storedToken) {
      try {
        const parts = storedToken.split('.');
        const payload = JSON.parse(atob(parts[1]));
        setUserSession(payload);
        setAuthToken(storedToken);
      } catch {
        localStorage.removeItem('day4_auth_token');
      }
    }
  }, []);

  const handleLoginSuccess = (user, token) => {
    localStorage.setItem('day4_auth_token', token);
    setAuthToken(token);
    setUserSession(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('day4_auth_token');
    setUserSession(null);
    setAuthToken('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header Bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">Forms & Authentication</h1>
              <p className="text-xs text-slate-400">Week 5 • Day 4 Masterclass</p>
            </div>
          </div>

          {userSession ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 hidden sm:inline">
                Signed in as <strong className="text-slate-200">{userSession.name}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-300 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setAuthMode('login')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  authMode === 'login' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  authMode === 'register' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form or Protected Dashboard */}
        <div className="lg:col-span-7">
          {userSession ? (
            <ProtectedDashboard user={userSession} token={authToken} onLogout={handleLogout} />
          ) : authMode === 'login' ? (
            <LoginForm onSuccess={handleLoginSuccess} onSwitch={() => setAuthMode('register')} />
          ) : (
            <RegisterForm onSuccess={handleLoginSuccess} onSwitch={() => setAuthMode('login')} />
          )}
        </div>

        {/* Right Column: Concept Explanation & Live Token Inspector */}
        <div className="lg:col-span-5 space-y-6">
          <SessionInspector token={authToken} user={userSession} />

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-indigo-400" /> Authentication Flow Concepts
            </h3>
            <ul className="text-xs text-slate-400 space-y-2.5 list-disc list-inside">
              <li><strong className="text-slate-200">Controlled State:</strong> Every field input maps directly to React state values.</li>
              <li><strong className="text-slate-200">Validation:</strong> Frontend validation provides immediate user feedback before network calls.</li>
              <li><strong className="text-slate-200">JWT Sessions:</strong> Upon login, server returns a signed JWT which is saved in <code className="text-indigo-300">localStorage</code>.</li>
              <li><strong className="text-slate-200">Protected Routes:</strong> Protected views check for a valid token before displaying sensitive content.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Component: Login Form ---
function LoginForm({ onSuccess, onSwitch }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const token = simulateJWT({ email: formData.email });
      const payload = { email: formData.email, name: formData.email.split('@')[0], role: 'developer' };
      onSuccess(payload, token);
    }, 1000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Welcome Back</h2>
        <p className="text-xs text-slate-400 mt-1">Sign in to access your developer portal</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="developer@aptech.edu.pk"
          icon={<Mail className="w-4 h-4" />}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <PasswordField
          label="Password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
        >
          {isSubmitting ? 'Authenticating...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
        Don't have an account?{' '}
        <button onClick={onSwitch} className="text-indigo-400 hover:underline font-medium">
          Create account
        </button>
      </div>
    </div>
  );
}

// --- Component: Register Form ---
function RegisterForm({ onSuccess, onSwitch }) {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const strength = evaluatePasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const token = simulateJWT(formData);
      const payload = { email: formData.email, name: formData.fullName, role: 'developer' };
      onSuccess(payload, token);
    }, 1200);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Create Developer Account</h2>
        <p className="text-xs text-slate-400 mt-1">Register to start managing authenticated sessions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Full Name"
          name="fullName"
          type="text"
          placeholder="Zainab Uzair Khan"
          icon={<User className="w-4 h-4" />}
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="developer@aptech.edu.pk"
          icon={<Mail className="w-4 h-4" />}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <div className="space-y-1">
          <PasswordField
            label="Password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          {formData.password && (
            <div className="pt-2 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Strength:</span>
                <span className={`font-semibold ${strength.text}`}>{strength.label}</span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                <div className={`h-full transition-all ${strength.color}`} style={{ width: strength.percent }}></div>
              </div>
            </div>
          )}
        </div>

        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating Account...' : 'Register Account'} <Sparkles className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
        Already registered?{' '}
        <button onClick={onSwitch} className="text-indigo-400 hover:underline font-medium">
          Sign in instead
        </button>
      </div>
    </div>
  );
}

// --- Protected Dashboard ---
function ProtectedDashboard({ user, token, onLogout }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Protected Route Authorized</h2>
            <p className="text-xs text-slate-400">JWT verification successful</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Session Claims</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block">User Name:</span>
            <span className="font-medium text-slate-200">{user.name}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Email:</span>
            <span className="font-medium text-slate-200">{user.email}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Role:</span>
            <span className="font-medium text-indigo-400 capitalize">{user.role}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Token Status:</span>
            <span className="font-medium text-emerald-400">Active (Stored in LocalStorage)</span>
          </div>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-rose-600/20"
        >
          <LogOut className="w-4 h-4" /> End Authenticated Session
        </button>
      </div>
    </div>
  );
}

// --- Session Inspector Component ---
function SessionInspector({ token, user }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" /> Token Inspector
        </h3>
        <span className={`px-2 py-0.5 text-[10px] rounded-md font-mono ${
          token ? 'bg-emerald-950 border border-emerald-700 text-emerald-300' : 'bg-slate-950 text-slate-500 border border-slate-800'
        }`}>
          {token ? 'JWT Present' : 'No Active Session'}
        </span>
      </div>

      {token ? (
        <div className="space-y-3 font-mono text-xs">
          <div>
            <span className="text-slate-500 text-[11px] block mb-1">Encoded JWT String:</span>
            <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl break-all text-indigo-300 text-[11px]">
              {token}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 text-slate-500 space-y-2">
          <ShieldAlert className="w-8 h-8 mx-auto opacity-50" />
          <p className="text-xs">Authenticate using the form to inspect session token payloads.</p>
        </div>
      )}
    </div>
  );
}

// --- Reusable Form Fields ---
function InputField({ label, name, type, placeholder, icon, value, onChange, error }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-slate-300">{label}</label>
      <div className="relative">
        <div className="absolute left-3.5 top-3 text-slate-500">{icon}</div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-slate-950 border rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none transition-all ${
            error ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500/80'
          }`}
        />
      </div>
      {error && (
        <p className="text-[11px] text-rose-400 flex items-center gap-1 pt-0.5">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

function PasswordField({ label, name, placeholder, value, onChange, error }) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-slate-300">{label}</label>
      <div className="relative">
        <div className="absolute left-3.5 top-3 text-slate-500">
          <Lock className="w-4 h-4" />
        </div>
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-slate-950 border rounded-xl pl-10 pr-10 py-2 text-xs text-slate-200 focus:outline-none transition-all ${
            error ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500/80'
          }`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3.5 top-2.5 text-slate-500 hover:text-slate-300"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && (
        <p className="text-[11px] text-rose-400 flex items-center gap-1 pt-0.5">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}