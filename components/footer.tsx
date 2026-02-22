export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 py-8 mt-12">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Evangelos Batsalis
        </p>
        <p className="text-gray-500 text-sm text-center md:text-right">
          Built with care, caffeine, and a suspicious amount of VLANs.
        </p>
      </div>
    </footer>
  );
}
