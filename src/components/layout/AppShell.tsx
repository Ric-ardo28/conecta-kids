import { Sidebar } from "./Sidebar";
import type { Profile } from "@/lib/supabase/current-user";

type AppShellProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  profile?: Profile;
};

export function AppShell({
  children,
  profile,
  sidebar = <Sidebar profile={profile} />,
}: AppShellProps) {
  return (
    <main className="min-h-screen px-4 py-4 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[300px_1fr]">
        {sidebar}
        <section className="min-w-0">{children}</section>
      </div>
    </main>
  );
}
