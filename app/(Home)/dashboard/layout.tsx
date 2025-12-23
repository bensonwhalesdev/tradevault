import DashboardFooter from "./components/Footer";
import HeaderBar from "./components/Sidebar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <HeaderBar /> 
      {children}
      <DashboardFooter />
    </div>
  );
}