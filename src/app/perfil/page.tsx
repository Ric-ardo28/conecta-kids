import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { BadgeCheck, Save, ShieldCheck, Upload, UserRound } from "lucide-react";
import { LoggedLayout } from "@/components/LoggedLayout";
import { getCurrentUserProfile } from "@/lib/supabase/current-user";
import { productAreas } from "@/lib/product-areas";

type PerfilPageProps = {
  searchParams: Promise<{
    status?: string;
  }>;
};

async function updateProfile(formData: FormData) {
  "use server";

  const { supabase, profile } = await getCurrentUserProfile();
  const fullName = String(formData.get("full_name") ?? "").trim();
  const avatarFile = formData.get("avatar_file");
  let avatarUrl = profile.avatar_url;

  if (!fullName) {
    redirect("/perfil?status=missing_name");
  }

  if (avatarFile instanceof File && avatarFile.size > 0) {
    const allowedTypes = new Map([
      ["image/png", "png"],
      ["image/jpeg", "jpg"],
      ["image/webp", "webp"],
    ]);
    const extension = allowedTypes.get(avatarFile.type);
    const maxAvatarSize = 2 * 1024 * 1024;

    if (!extension || avatarFile.size > maxAvatarSize) {
      redirect("/perfil?status=invalid_file");
    }

    const avatarPath = `${profile.id}/avatar.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(avatarPath, avatarFile, {
        cacheControl: "3600",
        contentType: avatarFile.type,
        upsert: true,
      });

    if (uploadError) {
      redirect("/perfil?status=avatar_error");
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(avatarPath);
    avatarUrl = data.publicUrl;
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      avatar_url: avatarUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", profile.id);

  if (error) {
    redirect("/perfil?status=error");
  }

  revalidatePath("/perfil");
  revalidatePath("/dashboard");
  redirect("/perfil?status=updated");
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getRoleLabel(role: string) {
  if (role === "responsavel") {
    return "Responsável";
  }

  if (role === "professor") {
    return "Professor";
  }

  return "Criança";
}

export default async function PerfilPage({ searchParams }: PerfilPageProps) {
  const { profile } = await getCurrentUserProfile();
  const params = await searchParams;
  const displayName = profile.full_name?.trim() || "Explorador digital";

  return (
    <LoggedLayout profile={profile}>
      <div className="space-y-6">
        <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
          <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-orange-800">
                {productAreas.profile}
              </p>
              <h1 className="text-4xl font-black text-slate-950 md:text-5xl">
                Meu Avatar
              </h1>
              <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
                Atualize o nome que aparece na sua jornada e escolha uma imagem
                para representar seu avatar.
              </p>
            </div>

            <div className="rounded-[1.6rem] bg-yellow-100 p-5 text-center text-amber-950">
              {profile.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatar_url}
                  alt=""
                  className="mx-auto size-28 rounded-full object-cover"
                />
              ) : (
                <div className="mx-auto grid size-28 place-items-center rounded-full bg-white text-3xl font-black text-orange-800">
                  {getInitials(displayName)}
                </div>
              )}
              <h2 className="mt-4 text-2xl font-black">{displayName}</h2>
              <p className="mt-1 font-bold">{getRoleLabel(profile.role)}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
          <form
            action={updateProfile}
            className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-orange-100 p-3 text-orange-800">
                <UserRound aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-orange-700">
                  Dados reais
                </p>
                <h2 className="text-3xl font-black text-slate-950">
                  Editar perfil
                </h2>
              </div>
            </div>

            {params.status === "updated" ? (
              <p className="mb-4 rounded-2xl bg-emerald-100 px-4 py-3 font-black text-emerald-900">
                Perfil atualizado com sucesso.
              </p>
            ) : null}

            {params.status === "missing_name" ? (
              <p className="mb-4 rounded-2xl bg-yellow-100 px-4 py-3 font-black text-amber-950">
                Escreva um nome para salvar seu avatar.
              </p>
            ) : null}

            {params.status === "error" ? (
              <p className="mb-4 rounded-2xl bg-rose-100 px-4 py-3 font-black text-rose-900">
                Não consegui salvar agora. Tente novamente em instantes.
              </p>
            ) : null}

            {params.status === "invalid_file" ? (
              <p className="mb-4 rounded-2xl bg-yellow-100 px-4 py-3 font-black text-amber-950">
                Envie uma imagem PNG, JPG, JPEG ou WEBP com até 2MB.
              </p>
            ) : null}

            {params.status === "avatar_error" ? (
              <p className="mb-4 rounded-2xl bg-rose-100 px-4 py-3 font-black text-rose-900">
                Não consegui carregar a foto. Confira o bucket avatars no Supabase.
              </p>
            ) : null}

            <div className="grid gap-4">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-700">
                  <UserRound aria-hidden="true" size={17} />
                  Nome
                </span>
                <input
                  name="full_name"
                  defaultValue={displayName}
                  className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-orange-400 focus:bg-white"
                  placeholder="Seu nome de exibição"
                />
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-700">
                  <Upload aria-hidden="true" size={17} />
                  Carregar foto
                </span>
                <input
                  name="avatar_file"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 file:mr-4 file:rounded-xl file:border-0 file:bg-orange-100 file:px-4 file:py-2 file:font-black file:text-orange-800 focus:border-orange-400 focus:bg-white"
                />
                <span className="mt-2 block text-sm font-bold text-slate-600">
                  Formatos: PNG, JPG, JPEG ou WEBP. Tamanho máximo: 2MB.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 font-black text-white transition hover:bg-orange-600"
            >
              <Save aria-hidden="true" size={20} />
              Salvar perfil
            </button>
          </form>

          <aside className="kid-shadow rounded-[2rem] border-4 border-white bg-emerald-100 p-6 text-emerald-950">
            <div className="flex items-center gap-3">
              <ShieldCheck aria-hidden="true" />
              <h2 className="text-2xl font-black">Segurança do perfil</h2>
            </div>
            <p className="mt-3 font-bold leading-relaxed">
              Só você consegue alterar os dados do seu próprio avatar quando
              está usando sua conta.
            </p>
            <div className="mt-5 rounded-2xl bg-white/70 p-4">
              <BadgeCheck aria-hidden="true" className="mb-2" />
              <p className="font-black">{profile.points} pontos reais</p>
              <p className="mt-1 text-sm font-bold">
                Pontos e conquistas não são editados nesta tela.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </LoggedLayout>
  );
}
