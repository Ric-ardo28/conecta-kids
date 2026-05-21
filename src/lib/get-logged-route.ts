import { loggedRoutes } from "@/lib/routes";

export function getLoggedRoute(href: string) {
  const route = loggedRoutes.find((item) => item.href === href);

  if (!route) {
    throw new Error(`Rota logada não encontrada: ${href}`);
  }

  return route;
}
