import { useLocation, Link } from 'react-router-dom';

export default function ResultPage() {
  const { state } = useLocation() as any;
  const success = state?.success;
  const booking = state?.booking;
  const error = state?.error;
  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      {success ? (
        <>
          <h1 className="text-2xl font-bold text-green-600">Booking Confirmed!</h1>
          <p className="mt-2">Confirmation ID: {booking?.id}</p>
          <p className="mt-1 text-slate-600">A confirmation email will be sent to you.</p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-red-600">Booking Failed</h1>
          <p className="mt-2">{error || 'Please try again.'}</p>
        </>
      )}
      <div className="mt-6">
        <Link to="/" className="px-4 py-2 rounded bg-slate-900 text-white">Back to Home</Link>
      </div>
    </div>
  );
}


