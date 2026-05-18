export default function Footer() {
  return (
    <footer
      className="border-t py-8 text-center text-sm"
      style={{ borderColor: "var(--border)", color: "var(--muted)" }}
    >
      <p>© {new Date().getFullYear()} あわいの手帖</p>
    </footer>
  );
}
