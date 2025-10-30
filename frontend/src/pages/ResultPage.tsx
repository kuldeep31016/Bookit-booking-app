import { useLocation, Link } from 'react-router-dom';

export default function ResultPage() {
  const { state } = useLocation() as any;
  const success = state?.success;
  const booking = state?.booking;
  const error = state?.error;
  
  // Generate a readable reference ID
  const generateRefId = (id: string) => {
    if (!id) return 'N/A';
    // Create a readable format like "HUF568SQ"
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    let refId = '';
    for (let i = 0; i < 8; i++) {
      refId += chars[(hash * (i + 1)) % chars.length];
    }
    return refId;
  };

  const refId = booking?.id ? generateRefId(booking.id) : 'HUF568SQ';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {success ? (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center space-y-6 border-2 border-green-100">
            {/* Success Icon */}
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Booking Confirmed! 🎉</h1>
              <p className="text-lg text-slate-600">Your adventure awaits!</p>
            </div>

            {/* Booking Details */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between pb-3 border-b border-green-200">
                  <span className="text-slate-600 font-medium">Ref ID:</span>
                  <span className="font-mono font-bold text-slate-800 bg-white px-4 py-2 rounded-lg text-xl">
                    {refId}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Status</span>
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 space-y-3">
              <div className="flex items-start gap-3 text-left">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-semibold text-slate-800">Confirmation Email Sent</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Check your inbox for booking details and instructions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-semibold text-slate-800">Save Your Booking ID</p>
                  <p className="text-sm text-slate-600 mt-1">
                    You'll need this for check-in and any modifications.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link to="/" className="flex-1">
                <button className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-orange-500 hover:to-orange-600 transition shadow-lg hover:shadow-xl">
                  Browse More Experiences
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center space-y-6 border-2 border-red-100">
            {/* Error Icon */}
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Booking Failed</h1>
              <p className="text-lg text-slate-600">We couldn't process your booking</p>
            </div>

            <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
              <p className="text-red-700 font-medium">{error || 'Something went wrong. Please try again.'}</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 space-y-3">
              <div className="flex items-start gap-3 text-left">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="font-semibold text-slate-800">What you can do:</p>
                  <ul className="text-sm text-slate-600 mt-2 space-y-1 list-disc list-inside">
                    <li>Check your internet connection</li>
                    <li>Try a different time slot</li>
                    <li>Verify your payment information</li>
                    <li>Contact support if the issue persists</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button 
                onClick={() => window.history.back()}
                className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-orange-500 hover:to-orange-600 transition shadow-lg hover:shadow-xl"
              >
                Try Again
              </button>
              <Link to="/" className="flex-1">
                <button className="w-full bg-slate-800 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-slate-900 transition shadow-lg">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


