import Navbar from "../Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="content">{children}</div>
    </>
  );
}
