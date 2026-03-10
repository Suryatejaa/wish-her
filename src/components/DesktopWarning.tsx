export default function DesktopWarning() {
  return (
    <div id="desktop-warning" className="fixed inset-0 z-[1000] justify-center items-center p-8 text-center min-h-screen">
      <div className="glass p-12 rounded-[32px] max-w-[500px]">
        <h2 className="mb-4 text-2xl font-bold">📱 Mobile Experience First</h2>
        <p className="text-slate-600 leading-relaxed">
          This experience is designed exclusively for mobile. Please open it on
          your phone for the best experience.
        </p>
      </div>
    </div>
  );
}
