"use server";

import {
  DocumentData,
  QuerySnapshot,
  Unsubscribe,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { RoomMessage, db } from ".";

export async function getRoomData(
  roomPath: string,
  roomName: string,
): Promise<DocumentData> {
  const docRef = doc(db, roomPath, roomName);
  const docSnap = await getDoc(docRef);

  return docSnap.data() as DocumentData;
}

export async function createMessage(
  room: string,
  autor: string,
  content: string,
) {
  let date = new Date();

  let message: RoomMessage = {
    autor,
    content,
    sent: date.toUTCString(),
    reactions: [":/", ":)", ">:o"],
  };

  await addDoc(collection(db, "messages/rooms", room), message)
    .catch((err) => console.error(err))
    .then((_) => console.log("SENT"));
}

export async function subscribeToRoom(
  roomPath: string,
  roomName: string,
  onNext: (doc: QuerySnapshot<DocumentData, DocumentData>) => void,
  // onError?: (doc: FirestoreError) => void,
): Promise<Unsubscribe> {
  const docSnap = query(
    collection(db, roomPath),
    where("name", "==", roomName),
  );

  return onSnapshot(docSnap, {}, onNext);
}
