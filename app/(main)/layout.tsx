import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { SettingsProvider } from "../context/SettingsContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SettingsProvider>
        <CartProvider>
          <NavBar />
          <div className="flex flex-1 flex-col items-center pt-20">
            {children}
          </div>
          <Footer />
        </CartProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
