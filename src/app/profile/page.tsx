"use client";

import UploadAvatarForm, {
  FormSchema,
} from "@/components/custom/upload-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import bucketStorageAvatarImageLoader from "@/lib/images/loader";
import { getUserName } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";

export default function Profile() {
  const [nomeUtilizador, setNomeUtilizador] = useState(
    sessionStorage.getItem("user_name") || "Avatar",
  );

  async function submitAvatarAction(values: z.infer<typeof FormSchema>) {
    console.log(values.avatar);
    if (values.avatar === undefined) {
      toast({
        title: "Erro ao atualizar avatar",
        description: " Nenhum ficheiro submetido",
      });
      return;
    }

    // Cria a BLob a partir da imagem recebida
    let file = new File([values.avatar?.[0]], "avatar", { type: "image/jpeg" });

    // Setup do formulário que contêm o body
    let formData = new FormData(undefined);
    formData.set("avatar", file);

    let resource_url = new URL(
      "/api/storage/upload/avatar",
      "http://localhost:8191",
    );
    resource_url.searchParams.set("public", "true");
    resource_url.searchParams.set("name", nomeUtilizador);

    await fetch(resource_url, {
      method: "POST",
      body: formData,
    })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Tente mais tarde",
          description: "Serviço indisponível",
        });
      })
      .then(async (res) => {
        if (res?.status == 200) {
          toast({
            title: "Sucesso",
            description: "Avatar atualizado",
          });
          return;
        }
        console.log(await res?.text());
      });
  }

  function changeUserName(name: string): void {
    sessionStorage.setItem("user_name", name);
    setNomeUtilizador(name);
  }

  return (
    <main className="border rounded-md min-w-[58vw] p-6 my-6 shadow-sm bg-white grid grid-cols-[.15fr_0fr_1fr] grid-rows-1 gap-6 items-start justify-start">
      <section className="mx-auto space-y-3">
        <Image
          src={getUserName()}
          loader={bucketStorageAvatarImageLoader}
          width={400}
          height={400}
          alt="Avatar image"
          className="rounded-md"
        />
        <h4 className="text-lg tracking-tight font-semibold">Alen Jones</h4>
        <sub>Estudante</sub>
      </section>
      <Separator orientation="vertical" />
      <section className="w-full">
        <h2 className="scroll-m-20 w-full border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
          Dados pessoais
        </h2>
        <section className="space-y-6 my-4 px-2 w-full">
          <div className="flex flex-row w-full gap-4">
            <span className="grid w-full items-center gap-1.5">
              <Label htmlFor="nome">Nome</Label>
              <Input
                type="text"
                id="nome"
                placeholder="Nome"
                className="w-full"
                value={nomeUtilizador}
                onChange={(e) => changeUserName(e.target.value)}
              />
            </span>
            <span className="grid items-center gap-1.5">
              <Label htmlFor="nome">Idade</Label>
              <Input
                type="number"
                step={1}
                min={6}
                max={115}
                id="idade"
                placeholder="16"
                className="w-min"
              />
            </span>
          </div>

          <UploadAvatarForm onSubmitForm={submitAvatarAction} />

          <span className="grid w-full  items-center gap-1.5">
            <Label htmlFor="sobre_mim">Sobre Mim</Label>
            <Textarea name="sobre_mim" rows={6} />
          </span>
          <Button variant="default" className="w-full">
            Atualizar
          </Button>
        </section>
      </section>
    </main>
  );
}
