export default function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white/60 backdrop-blur-xl rounded-[32px] border border-white p-8 md:p-12 shadow-sm space-y-8">
      <div className="space-y-1">
        <h2 className="font-serif text-2xl italic text-gray-800">{title}</h2>

        <p className="text-sm text-sanctuary-400">{description}</p>
      </div>

      {children}
    </section>
  );
}
