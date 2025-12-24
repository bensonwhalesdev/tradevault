import DashboardFooter from "./components/Footer";
import HeaderBar from "./components/Sidebar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#0B1210]">
      <HeaderBar /> 
      {children}
      <DashboardFooter />
    </div>
  );
}