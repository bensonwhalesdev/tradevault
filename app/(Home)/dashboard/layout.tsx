import DashboardFooter from "./components/Footer";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed width logic is handled inside your Sidebar component */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          
          {/* Scrollable Content Container */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
            <div className="max-w-[1600px] mx-auto w-full">
              {children}
            </div>
          </div>

          {/* Dashboard Footer - Anchored to the bottom of the content area */}
          <DashboardFooter />
        </main>
      </div>
    </div>
  );
}