import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";
import { AppProviders } from "../providers/AppProviders";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppProviders>
        <NavBar />
        <div className="flex flex-1 flex-col items-center pt-20">
          {children}
        </div>
      </AppProviders>
      <Footer />
    </>
  );
}
