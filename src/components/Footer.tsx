export default function Footer() {
  return (
    <footer className="bg-[#1F2B37] border-t border-[#4F76F6]/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex flex-col items-center gap-3 text-center animate-fade">
          {/* Copyright */}
          <div className="text-xs text-[#F9F9F9]/60">
            © {new Date().getFullYear()} <span className="font-semibold text-[#F9F9F9]">ProductStore</span>.  
            Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}