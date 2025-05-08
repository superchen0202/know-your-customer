import Button from '@/components/ui/Button';

const SuccessPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 text-center">
      <div className="mb-6 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h1 className="mb-4 text-2xl font-bold">Submission Successful</h1>
      <p className="text-gray-600">Your KYC information has been submitted successfully .</p>
      <p className="mb-6 text-gray-600">We will review your documents and get back to you shortly.</p>
      <Button variant="primary" onClick={() => window.location.reload()}>
        Return to Home
      </Button>
    </div>
  );
};

export default SuccessPage;
