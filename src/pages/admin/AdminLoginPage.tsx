import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Leaf, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError('Invalid email or password. Please try again.');
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-forest-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card-static p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-forest-700" />
            </div>
            <h1 className="heading-md text-earth-800">Admin Login</h1>
            <p className="text-earth-600 mt-2">Padayal Restaurant Dashboard</p>
          </div>

          {error && (
            <div className="flex items-start gap-3 bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="admin@padayal.com"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-earth-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-earth-400 hover:text-earth-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-earth-200 text-center">
            <p className="text-sm text-earth-500">
              Need access? Contact the restaurant manager.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
