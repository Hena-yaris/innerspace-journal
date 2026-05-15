import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen font-body selection:bg-sanctuary-200">
      <Toaster
        position="bottom-right"
        expand={false}
        toastOptions={{
          style: {
            background: "#F5F2EA",
            border: "1px solid #EDE6D9",
            color: "#3F4A45",
            fontFamily: "var(--font-body)",
            borderRadius: "20px",
            padding: "16px",
          },
        }}
      />
      <div className="fixed inset-0 z-[-2] bg-sanctuary-50" />

      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center opacity-[0.03] pointer-events-none grayscale"
        style={{ backgroundImage: "url('/images/lo-bg.jpg')" }}
      />

      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(245,242,234,0.15)_100%)]" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
