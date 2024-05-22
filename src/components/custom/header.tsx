"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { avatar_buckets } from "@/lib/paths";
import { getUserName } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-6 border border-slate-300 flex flex-row items-center justify-around bg-white">
      <h1 className="font-bold tracking-tighter text-3xl">Ai2Learn</h1>
      <section className="flex items-center space-x-2 h-4 ">
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Home
        </Link>
        <Separator orientation="vertical" />
        <Link href="/profile" className={buttonVariants({ variant: "link" })}>
          Profile
        </Link>
      </section>
      <section className="flex flex-row gap-4 items-center">
        <HoverCard closeDelay={500} openDelay={500}>
          <HoverCardTrigger>
            <Avatar>
              <AvatarImage
                src={`${avatar_buckets}/users/avatar/${getUserName()}`}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent className="flex flex-row items-start justify-start gap-4">
            <section>
              <Avatar>
                <AvatarImage
                  src={`${avatar_buckets}/users/avatar/${getUserName()}`}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </section>
            <section className="w-full">
              <h4 className="font-semibold ">Alen Jones</h4>
              <p className="text-sm text-slate-500">Estudante</p>
              <Separator className="my-1 mb-1.5" />
              <Link
                href="/profile"
                className="text-sm"
                style={{ color: "blueviolet", textDecoration: "underline" }}
              >
                Mudar Avatar
              </Link>
            </section>
          </HoverCardContent>
        </HoverCard>
        <Button variant="destructive" size="sm" className="space-x-2">
          Logout
          <p className="p-0"></p>
          <LogOutIcon width={14} />
        </Button>
      </section>
    </header>
  );
}
