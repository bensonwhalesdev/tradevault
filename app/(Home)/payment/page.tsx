import { Suspense } from "react";
import PaymentPage from "./components/PaymentPage";

const page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B1210]" />}>
      <div>
        <PaymentPage />
      </div>
    </Suspense>
  );
};

export default page;
