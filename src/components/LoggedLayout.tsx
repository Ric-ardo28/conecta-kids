import { AppShell } from "@/components/layout/AppShell";

type LoggedLayoutProps = {
  children: React.ReactNode;
};

export function LoggedLayout({ children }: LoggedLayoutProps) {
  return <AppShell>{children}</AppShell>;
}
