"use client";

import React from "react";
import Header from "./Header";

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />  {/* ✅ This header will appear only on Marketplace */}
      {children}
    </div>
  );
}
