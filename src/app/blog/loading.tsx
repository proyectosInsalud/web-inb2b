import React from "react";

export default function BlogLoading() {
  return (
    <div className="bg-in-blue-main min-h-screen">
      <div className="pt-6">
        <div className="h-20 w-full animate-pulse bg-white/5 rounded-3xl max-w-7xl mx-auto px-4" />
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 pt-8 md:pt-32 text-center">
        <div className="h-10 w-3/4 mx-auto animate-pulse bg-white/5 rounded-lg mb-4" />
        <div className="h-4 w-1/2 mx-auto animate-pulse bg-white/5 rounded-lg" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 pt-10 md:pt-14 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 h-[400px] animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
