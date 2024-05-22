import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CogIcon, SearchIcon, SendIcon } from "lucide-react";

export default function Main() {
  type Room = {
    name: string;
    topic: string;
    user_count: number;
    last_message: string;
  };

  const rooms: Room[] = [
    {
      last_message: "How about the square root of negative numbers?",
      name: "Intro to Irrational Numbers",
      topic: "irrational numbers",
      user_count: 5,
    },
    {
      last_message: "How about the square root of negative numbers?",
      name: "Intro to Irrational Numbers",
      topic: "irrational numbers",
      user_count: 5,
    },
    {
      last_message: "How about the square root of negative numbers?",
      name: "Intro to Irrational Numbers",
      topic: "irrational numbers",
      user_count: 5,
    },
    {
      last_message: "How about the square root of negative numbers?",
      name: "Intro to Irrational Numbers",
      topic: "irrational numbers",
      user_count: 5,
    },
    {
      last_message: "How about the square root of negative numbers?",
      name: "Intro to Irrational Numbers",
      topic: "irrational numbers",
      user_count: 5,
    },
  ];

  return (
    <Tabs defaultValue="account" className="max-w-[68vw]">
      <TabsList className="grid w-fit grid-cols-2 mx-auto">
        <TabsTrigger value="mensagens">Mensagens</TabsTrigger>
        <TabsTrigger value="salas">Salas</TabsTrigger>
      </TabsList>
      <TabsContent value="mensagens" className="flex flex-row gap-4">
        <Card className="h-fit min-w-[20vw] ">
          <CardHeader>
            <CardTitle>Salas</CardTitle>
            <CardDescription>Onde tens conversas ativas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-8">
            <section className="flex w-full pr-3 items-center space-x-2">
              <SearchIcon className="h-5 w-auto" />
              <Input type="text" placeholder="Nome da sala ..." />
            </section>
            <Separator />
            <section>
              <ul className="max-h-[50vh] h-full overflow-y-scroll space-y-3 pr-3">
                {rooms.map((room, key) => {
                  return (
                    <li
                      key={key}
                      className="border rounded-sm flex flex-col gap-2 p-4"
                    >
                      <h4 className="scroll-m-20 text-xl font-semibold tracking-normal">
                        {room.name}
                      </h4>
                      <Badge className="w-fit bg-slate-200 text-slate-400 tracking-normal">
                        {room.topic}
                      </Badge>
                      <Separator className="mt-2 mb-1" />
                      <p className="italic text-sm pr-0.5 text-slate-600 overflow-x-scroll flex flex-row gap-1">
                        {`Jason: ${room.last_message}`.slice(0, 49) + `...`}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </section>
            <Separator />
          </CardContent>
        </Card>
        {/* Chat space */}
        <Card className="min-w-[45vw] h-fit pb-8">
          <CardHeader className="flex flex-row min-w-full justify-between items-center">
            <section className="space-y-1.5">
              <CardTitle>{rooms[0].name}</CardTitle>
              <CardDescription>Users: {rooms[0].user_count}</CardDescription>
            </section>
            <Button
              variant={"outline"}
              className="flex flex-row items-center gap-1"
            >
              <CogIcon className="text-slate-800 h-5 w-auto" />
              Settings
            </Button>
          </CardHeader>
          <Separator />
          <CardContent className="min-h-[45vh] max-h-[60vh] bg-slate-100 overflow-y-scroll px-0 pt-4 pb-0 space-y-3 scroll-smooth snap-x snap-center">
            {new Array(16).fill(undefined).map((_, a) => (
              <div
                key={a}
                className={`max-w-[19vw] mx-5 bg-white p-2 pt-3 px-4 rounded-md m${
                  a % 2 == 0 ? "r" : "l"
                }-auto`}
              >
                <p className="text-sm mb-2 text-slate-400">Jason Loren</p>
                <p className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                  eveniet ut voluptas!
                </p>
                <p className="text-sm text-slate-400 mt-3">18:04</p>
              </div>
            ))}
            <section className="flex flex-row gap-1 items-start justify-start sticky bottom-0 bg-slate-100/70 backdrop-blur-sm px-5 py-3">
              <Button size={"icon"} variant={"default"}>
                <SendIcon width={18} />
              </Button>
              <Input placeholder="Message" className="w-full" />
            </section>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="salas"></TabsContent>
    </Tabs>
  );
}
