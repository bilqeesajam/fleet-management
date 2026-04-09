import { useEffect, useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth/useAuth'

export default function Login() {
  const navigate = useNavigate()
  const { user, role, loading, error: authError, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (user && role && !loading) {
      if (role === 'admin') {
        navigate('/admin/dashboard', { replace: true })
      } else if (role === 'operator') {
        navigate('/operator/dashboard', { replace: true })
      }
    }
  }, [user, role, loading, navigate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!email || !password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    try {
      await signIn(email, password)
    } catch {
      setError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  // Show auth error if sign in failed
  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/20 sm:p-8">
        <div className="mb-6 text-left sm:mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your fleet management account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2 text-left">
            <label
              htmlFor="email"
              className="block text-left text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'login-error' : 'login-help'}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2 text-left">
            <label
              htmlFor="password"
              className="block text-left text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'login-error' : 'login-help'}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-20 text-gray-900 transition placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 my-auto inline-flex h-10 w-10 items-center justify-center text-slate-500 transition hover:text-blue-700 focus:outline-none dark:text-slate-300 dark:hover:text-blue-300"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff className="h-5 w-5" aria-hidden="true" /> : <FiEye className="h-5 w-5" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {error && (
            <div
              id="login-error"
              role="alert"
              aria-live="polite"
              className="rounded-xl border border-red-200 bg-red-50 p-3 text-left dark:border-red-800 dark:bg-red-900/20"
            >
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <p
            id="login-help"
            className="text-left text-sm text-gray-500 dark:text-gray-400"
          >
            Use your assigned work email and password to continue.
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 rounded-xl border border-gray-200 bg-slate-50 p-4 text-left text-sm text-gray-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-gray-400">
          <p className="font-semibold text-gray-900 dark:text-white">Demo credentials</p>
          <p className="mt-2">
            <span className="font-medium text-blue-600 dark:text-blue-400">Admin:</span>{' '}
            admin@example.com
          </p>
          <p>
            <span className="font-medium text-blue-600 dark:text-blue-400">Operator:</span>{' '}
            operator@example.com
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">Password: password</p>
        </div>
      </div>
    </div>
  )
}
