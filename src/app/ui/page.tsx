import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PillIcon, PlusIcon } from "lucide-react";

export default function Page() {
  const classNamePillSlotActive = `
    p-1 rounded bg-white border border-slate-300 w-28 h-28 hover:shadow transition-all duration-200 ease-in-out
    hover:cursor-pointer hover:border-slate-400 overflow-clip
  `;

  return (
    <main className="w-svw h-svh bg-white grid justify-center items-start">
      <section className="flex flex-col gap-3">
        <header className="p-3 px-4 rounded-sm bg-white w-full border shadow-sm space-y-0.5 flex flex-row items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold antialiased">Módulo 2</h3>
            <h6 className="text-sm text-slate-400 font-medium">
              8/9 Comprimidos
            </h6>
          </div>
          <Button size="icon" variant="secondary">
            <PlusIcon className="w-6 h-auto text-slate-700" />
          </Button>
        </header>
        <section className="bg-slate-100 p-1.5 grid grid-rows-3 grid-cols-3 gap-1 rounded-md">
          {new Array(8).fill(0).map((_, i) => (
            <div
              key={i}
              className={
                classNamePillSlotActive +
                "text-center flex flex-col items-center justify-center gap-3"
              }
            >
              <PillIcon className="w-8 h-auto text-slate-300" />
              <p className="text-sm leading-5 text-slate-800">
                Ibuprofen
                <br />
                <b>x1</b>
              </p>
            </div>
          ))}
        </section>
        <Separator />
        <footer className="w-full rounded-sm overflow-clip flex flex-row justify-end items-center space-x-3">
          <Button variant="secondary">Esvaziar</Button>
          <Button variant="default">
            <p>Recarregar</p>
          </Button>
        </footer>
      </section>
    </main>
  );
}
