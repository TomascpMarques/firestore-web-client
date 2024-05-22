"use client";

import DialogFlow from "@/components/custom/dialog-flow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { RoomMessage, db } from "@/lib/firebase";
import { createMessage, getRoomData } from "@/lib/firebase/firestore";
import bucketStorageAvatarImageLoader from "@/lib/images/loader";
import { avatar_buckets } from "@/lib/paths";
import { getUserName, utcTimeStringToDate } from "@/lib/utils";
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import {
  CableIcon,
  CogIcon,
  EraserIcon,
  LoaderCircleIcon,
  SearchIcon,
  SendIcon,
} from "lucide-react";
import Image from "next/image";

import { useCallback, useState } from "react";
import { useImmerReducer } from "use-immer";

export default function Page() {
  // setupFireMessageData().finally(() => console.log("AAA"));
  // setupFireRoomData().finally(() => console.log("AAA"));

  type Room = {
    name: string;
    messages: RoomMessage[];
    metadata: DocumentData | null;
  };

  interface RoomSetName {
    type: "SET ROOM NAME";
    name: string;
  }
  interface RoomSetMessages {
    type: "SET ROOM MESSAGES";
    messages: RoomMessage[];
  }
  interface RoomSetMetadata {
    type: "SET ROOM METADATA";
    metadata: DocumentData;
  }

  type RoomActions = RoomSetName | RoomSetMessages | RoomSetMetadata;

  const [room, dispatch] = useImmerReducer<Room, RoomActions>(
    (draft, action) => {
      switch (action.type) {
        case "SET ROOM NAME":
          draft.name = action.name;
          break;
        case "SET ROOM MESSAGES":
          draft.messages = action.messages;
          break;
        case "SET ROOM METADATA":
          draft.metadata = action.metadata;
          break;
      }
    },
    {
      name: "",
      messages: [],
      metadata: null,
    },
  );

  const setName = useCallback(
    (name: string) => {
      dispatch({ type: "SET ROOM NAME", name });
    },
    [dispatch],
  );
  const clearName = useCallback(() => {
    dispatch({ type: "SET ROOM NAME", name: "" });
  }, [dispatch]);

  const [showIcon, setShowIcon] = useState<boolean>(false);

  const { toast } = useToast();

  async function getRoom() {
    setShowIcon(true);

    let room_data = await getRoomData("rooms/topic/definitions", room.name)
      .catch((err) => {
        toast({
          title: "Erro",
          description: "Falha ao obter dados da sala",
          action: <ToastAction altText="Tentar de novo.">Retry</ToastAction>,
        });
      })
      .finally(() => setShowIcon(false));

    dispatch({
      type: "SET ROOM METADATA",
      metadata: room_data as DocumentData,
    });
    console.table(room_data);
    setShowIcon(false);

    await subscreverSala();
    return;
  }

  async function subscreverSala() {
    setShowIcon(true);

    const msgQuery = query(
      collection(db, `messages/rooms/${room.name}`),
      orderBy("sent"),
      // limit(25),
    );

    onSnapshot(msgQuery, (collection) => {
      let msgs: RoomMessage[] = [];
      collection.docs.forEach((x) => {
        msgs.push(x.data() as RoomMessage);
      });
      dispatch({ type: "SET ROOM MESSAGES", messages: msgs });
      toast({
        title: "Sucesso!",
        description: `Loaded ${msgs.length} messages.`,
      });
      setShowIcon(false);
    });
  }

  const [conteudo, setConteudo] = useState("");

  async function sendMessage() {
    await createMessage(room.name, getUserName(), conteudo);
    setConteudo("");
  }

  function createTimeStamp(sent: string): string {
    let date = utcTimeStringToDate(sent);

    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
  }

  return (
    <main className="space-y-4">
      <section className="w-fit flex flex-row gap-2 items-end p-6 bg-white mt-6 rounded-md border shadow-sm">
        <section className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label>Nome da sala</Label>
            <div className="flex flex-row gap-1.5 justify-center">
              {room.name.length != 0 ? (
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={clearName}
                  disabled={showIcon}
                >
                  <EraserIcon className="w-4 h-auto" />
                </Button>
              ) : (
                <></>
              )}
              <Input
                placeholder="Ciências"
                type="text"
                className="max-w-fit outline-none outline-0"
                value={room.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </section>

        <Button
          size="default"
          className="flex flex-row items-center gap-1.5"
          onClick={getRoom}
        >
          Buscar sala
          {showIcon ? (
            <LoaderCircleIcon width={16} className="animate-spin" />
          ) : (
            <SearchIcon width={"auto"} height={18} />
          )}
        </Button>
        <Button
          size="default"
          className="flex flex-row items-center gap-1.5"
          onClick={subscreverSala}
          variant="secondary"
          disabled
        >
          Subscrever sala
          {showIcon ? (
            <LoaderCircleIcon width={16} className="animate-spin" />
          ) : (
            <CableIcon width={"auto"} height={18} />
          )}
        </Button>
      </section>

      <DialogFlow />

      {room.metadata !== null ? (
        <Card className="min-w-[55vw] h-fit overflow-clip">
          <CardHeader className="flex flex-row min-w-full justify-between items-center">
            <section className="space-y-1.5">
              <CardTitle>{room.metadata?.["nome"]}</CardTitle>
              <CardDescription>
                Users: {room.metadata?.["usr_count"]}
              </CardDescription>
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
          <CardContent className="min-h-[45vh] max-h-[70vh] grid grid-rows-[4fr_auto] bg-white px-0 pb-0 ">
            <section className="bg-slate-400 row-span-2 h-full overflow-y-scroll scroll-smooth snap-x snap-center">
              <ul className="flex flex-col gap-3 py-4">
                {room.messages.map((message, a) => (
                  <li
                    key={a}
                    className="w-[25vw] flex flex-row gap-3 items-start justify-start mx-5  bg-white p-2 pt-3 px-1 rounded-md border shadow-sm"
                  >
                    <Avatar className="ml-2">
                      <AvatarImage
                        src={`${avatar_buckets}/users/avatar/${message.autor}`}
                      />
                      <AvatarFallback>
                        <Image
                          src={`Avatar`}
                          loader={bucketStorageAvatarImageLoader}
                          width={200}
                          height={200}
                          alt="AAA"
                        />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm mb-2 text-slate-400">
                        {message.autor}
                      </p>
                      <p className="">{message.content}</p>
                      <p className="text-sm text-slate-400 mt-3">
                        {createTimeStamp(message.sent)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <section className="h-min flex flex-row gap-3 items-start justify-start bg-slate-100/70 backdrop-blur-sm px-5 py-3">
              <Input
                placeholder="Message"
                className="w-full"
                type="text"
                id="conteudo"
                onChange={(e) => setConteudo(e.target.value)}
              />
              <Button size={"icon"} variant={"default"} onClick={sendMessage}>
                <SendIcon width={18} />
              </Button>
            </section>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
    </main>
  );
}
