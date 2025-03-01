"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { LucideHome, LucidePlusCircle, LucideLineChart, LucideBarChart2, LucideSun, LucideMoon } from "lucide-react";
import { useState} from "react";
import { AuthProvider } from "@/context/AuthContext";
import { WalletProvider } from "@/context/WalletContext";  // ✅ Import WalletProvider

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  if (pathname === "/" || pathname === "/auth/login" || pathname === "/auth/signup") {
    return (
      <html lang="en">
        <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <AuthProvider>
            <WalletProvider> {/* ✅ Wrap the app with WalletProvider */}
              {children}
            </WalletProvider>
          </AuthProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <AuthProvider>
          <WalletProvider> {/* ✅ Ensure WalletProvider is here */}
            <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 md:w-64 md:h-screen md:fixed md:left-0 md:top-0 border-t md:border-r border-gray-200 dark:border-gray-700">
              <div className="flex md:flex-col h-full">
                <div className="hidden md:flex items-center justify-between p-4">
                  <h1 className="text-xl font-bold">Energy Trade</h1>
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {darkMode ? <LucideSun className="w-5 h-5" /> : <LucideMoon className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex md:flex-col justify-around md:justify-start w-full p-2 md:p-4 space-y-0 md:space-y-2">
                  <Link href="/dashboard" className="nav-link flex items-center p-2 rounded-lg">
                    <LucideHome className="w-5 h-5" />
                    <span className="hidden md:inline ml-3">Dashboard</span>
                  </Link>
                  <Link href="/marketplace" className="nav-link flex items-center p-2 rounded-lg">
                    <LucidePlusCircle className="w-5 h-5" />
                    <span className="hidden md:inline ml-3">Marketplace</span>
                  </Link>
                  <Link href="/transactions" className="nav-link flex items-center p-2 rounded-lg">
                    <LucideLineChart className="w-5 h-5" />
                    <span className="hidden md:inline ml-3">Transactions</span>
                  </Link>
                  <Link href="/market" className="nav-link flex items-center p-2 rounded-lg">
                    <LucideBarChart2 className="w-5 h-5" />
                    <span className="hidden md:inline ml-3">Market Insights</span>
                  </Link>
                </div>
              </div>
            </nav>

            <main className="md:ml-64 p-4">{children}</main>
          </WalletProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
