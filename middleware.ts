import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/lib/supabase/types";

const publicRoutes = new Set([
  "/",
  "/login",
  "/cadastro",
  "/privacidade",
  "/termos",
]);

const privateRoutes = [
  "/dashboard",
  "/trilhas",
  "/aulas",
  "/exercicios",
  "/ranking",
  "/chat",
  "/turmas",
  "/perfil",
  "/responsaveis",
  "/professores",
];

function isPrivateRoute(pathname: string) {
  return privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function hasSupabaseServerConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

function shouldFailClosedWithoutSupabaseConfig() {
  return process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.has(pathname)) {
    return NextResponse.next();
  }

  if (!isPrivateRoute(pathname)) {
    return NextResponse.next();
  }

  if (!hasSupabaseServerConfig() && !shouldFailClosedWithoutSupabaseConfig()) {
    return NextResponse.next();
  }

  if (!hasSupabaseServerConfig()) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("error", "supabase_config");
    loginUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next({ request });
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
