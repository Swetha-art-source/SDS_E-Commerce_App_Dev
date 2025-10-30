// src/components/Layout.jsx
import Navbar from "../Navbar";
import Footer from "../Footer";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
