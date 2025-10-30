// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} SDS E-Commerce. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
