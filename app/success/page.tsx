"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    // काउन्टडाउन र ५ सेकेन्डपछि अटोमेटिक होमपेजमा फर्काउने लजिक
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    const redirect = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full border border-gray-200">
        {/* Success Checkmark */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
          ✓
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment भयो, Thank You!
        </h1>
        <p className="text-gray-700 font-medium mb-2">
          K & K Halal Mart बाट सपिङ गर्नुभएकोमा हार्दिक धन्यवाद।
        </p>
        <p className="text-emerald-700 text-sm font-semibold mb-6">
          फेरि-फेरि सपिङ गर्दै गर्नुहोला!
        </p>

        {/* Auto-redirect Notice */}
        <p className="text-xs text-gray-500 mb-4">
          तपाईं {seconds} सेकेन्डमा आफैँ होमपेजमा फर्किनुहुनेछ...
        </p>

        {/* Manual Button */}
        <Link
          href="/"
          className="inline-block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-xl transition"
        >
          अहिले नै होमपेजमा जानुहोस्
        </Link>
      </div>
    </div>
  );
}