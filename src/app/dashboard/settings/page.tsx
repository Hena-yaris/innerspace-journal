import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import EmailForm from "@/src/features/settings/components/email-form";
import PasswordForm from "@/src/features/settings/components/password-form";
import ProfileForm from "@/src/features/settings/components/profile-form";
import SettingsSection from "@/src/features/settings/components/settings-section";

import { serialize } from "@/src/utils/serialize";

import { getAuthenticatedUser } from "@/src/features/settings/actions/get-authenticated-user.action";

export default async function SettingsPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login");
  }

  const serializedUser = serialize(user);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sanctuary-400 hover:text-sanctuary-700 transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />

            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
              Return to Treasury
            </span>
          </Link>

          <h1 className="font-serif text-5xl italic text-gray-900">Settings</h1>

          <p className="text-[10px] tracking-[0.4em] uppercase text-sanctuary-300 font-bold">
            Refining the Studio
          </p>
        </header>

        <div className="grid gap-12">
          <SettingsSection
            title="Identity"
            description="Update how you appear in the Sanctuary."
          >
            <ProfileForm user={serializedUser} />
          </SettingsSection>

          <SettingsSection
            title="Access"
            description="Update your login credentials."
          >
            <div className="space-y-10">
              <EmailForm />

              <div className="h-px bg-sanctuary-100/50" />

              <PasswordForm />
            </div>
          </SettingsSection>
        </div>
      </div>
    </main>
  );
}
