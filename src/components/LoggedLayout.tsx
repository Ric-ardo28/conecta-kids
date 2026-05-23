import { AppShell } from "@/components/layout/AppShell";
import {
  getCurrentUserProfile,
  type Profile,
} from "@/lib/supabase/current-user";

type LoggedLayoutProps = {
  children: React.ReactNode;
  profile?: Profile;
};

export async function LoggedLayout({ children, profile }: LoggedLayoutProps) {
  const resolvedProfile = profile ?? (await getCurrentUserProfile()).profile;

  return <AppShell profile={resolvedProfile}>{children}</AppShell>;
}
