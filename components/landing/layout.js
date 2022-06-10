import Navbar from "./navbar";

export default function LandingLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
