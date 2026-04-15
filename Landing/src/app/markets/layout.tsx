import Navbar from '../componets/Navbar/navbar';

export default function MarketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* We set bg="transparent" so it stays clear over the black hero */}
      <Navbar navClass="markets-nav" navJustify="between" bg="transparent" />
      <main>{children}</main>
    </>
  );
}