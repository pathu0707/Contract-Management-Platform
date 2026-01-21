import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export const metadata = {
  title: "Contract Management Platform",
  description: "Frontend assignment – Contract lifecycle management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <Navbar />

          <div className="mx-auto flex max-w-7xl">
            <Sidebar />

            <main className="flex-1 px-4 py-6">
              {children}
            </main>
          </div>

          <footer className="border-t bg-white">
            <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-gray-500">
              © {new Date().getFullYear()} Contract Management Platform – Frontend Task
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
