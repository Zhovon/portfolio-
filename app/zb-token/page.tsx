'use client'

import { useState } from 'react'
import { Copy, Check, Loader } from 'lucide-react'

export default function ZBTokenPage() {
    const [email, setEmail] = useState('')
    const [plan, setPlan] = useState('pro')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [token, setToken] = useState('')
    const [copied, setCopied] = useState(false)

    const handleGenerateToken = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch(
                '/api/internal/zbooking/license/generate',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        plan,
                    }),
                }
            )

            const data = await response.json()

            if (!data.success) {
                setError(data.error || 'Failed to generate token')
                return
            }

            setToken(data.token)
            setSuccess(true)
            setEmail('')
        } catch (err) {
            setError('An error occurred. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(token)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            setError('Failed to copy token')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        ZBooking License
                    </h1>
                    <p className="text-slate-300">
                        Generate your license token to activate the plugin
                    </p>
                </div>

                {/* Card */}
                <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-2xl p-8">
                    {!success ? (
                        // Form
                        <form onSubmit={handleGenerateToken} className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-medium text-slate-200 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                                />
                            </div>

                            {/* Plan Selection */}
                            <div>
                                <label className="block text-sm font-medium text-slate-200 mb-2">
                                    Plan
                                </label>
                                <select
                                    value={plan}
                                    onChange={(e) => setPlan(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                                >
                                    <option value="basic">Basic (1 domain)</option>
                                    <option value="pro">Pro (3 domains)</option>
                                    <option value="enterprise">
                                        Enterprise (10 domains)
                                    </option>
                                </select>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Generate Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-medium transition flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader size={18} className="animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    'Generate Token'
                                )}
                            </button>
                        </form>
                    ) : (
                        // Success View
                        <div className="space-y-6">
                            {/* Success Icon */}
                            <div className="flex justify-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20">
                                    <Check className="text-green-400" size={32} />
                                </div>
                            </div>

                            {/* Success Message */}
                            <div className="text-center">
                                <h2 className="text-xl font-bold text-white mb-2">
                                    Token Generated!
                                </h2>
                                <p className="text-slate-300 text-sm">
                                    Copy your license token and paste it in your
                                    WordPress plugin settings.
                                </p>
                            </div>

                            {/* Token Display */}
                            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                                <p className="text-xs text-slate-400 mb-2">
                                    LICENSE TOKEN
                                </p>
                                <div className="flex items-center gap-2">
                                    <code className="text-xs font-mono text-green-400 break-all flex-1 select-all">
                                        {token}
                                    </code>
                                    <button
                                        onClick={handleCopy}
                                        className="flex-shrink-0 p-2 hover:bg-slate-600 rounded transition"
                                        title="Copy token"
                                    >
                                        {copied ? (
                                            <Check
                                                size={18}
                                                className="text-green-400"
                                            />
                                        ) : (
                                            <Copy
                                                size={18}
                                                className="text-slate-400"
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                                <p className="text-sm text-blue-300">
                                    <strong>Next Step:</strong> Go to your WordPress
                                    plugin settings and paste this token in the{' '}
                                    <em>License Token</em> field.
                                </p>
                            </div>

                            {/* Generate Another Button */}
                            <button
                                onClick={() => {
                                    setSuccess(false)
                                    setToken('')
                                    setError('')
                                }}
                                className="w-full py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition"
                            >
                                Generate Another Token
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center text-sm text-slate-400">
                    <p>
                        Need help? Check the{' '}
                        <a
                            href="/contact"
                            className="text-blue-400 hover:text-blue-300 transition"
                        >
                            contact page
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
