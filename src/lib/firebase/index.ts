import { getApps, initializeApp } from "firebase/app";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1HOfnSCwJ4MQyfYk2sjPO8FeUC_-mJow",
  authDomain: "cloudcomputing-424022.firebaseapp.com",
  projectId: "cloudcomputing-424022",
  storageBucket: "cloudcomputing-424022.appspot.com",
  messagingSenderId: "416532650460",
  appId: "1:416532650460:web:6ecfa78143e442ec65d719",
  measurementId: "G-0TEFJ2FERV",
};

export const firebaseapp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore();
// connectFirestoreEmulator(db, "127.0.0.1", 8080);

// Load data into firestore
export async function setupFireRoomData() {
  const topicRoomsRef = collection(db, "rooms/topic/definitions");

  await setDoc(doc(db, "rooms/topic/definitions", "Ciências"), {
    nome: "Ciências",
    categoria: "Física",
    msg_count: "40",
    usr_count: "15",
  });
}

// Load data into firestore
export async function setupFireMessageData() {
  const topicRoomsRef = collection(db, "messages/rooms/Ciências");

  await setDoc(doc(topicRoomsRef), {
    autor: "Another",
    content: "Message",
    sent: "15, Wednesday, March - 09:22:15 2024",
    reactions: ["<3", ":D", ";)", ":|", ":("],
  });

  await setDoc(doc(topicRoomsRef), {
    autor: "Someone",
    content: "Data",
    sent: "16, Thursday, March - 14:30:50 2024",
    reactions: ["B)", ":o", "LOL", ":|", ":P"],
  });

  await setDoc(doc(topicRoomsRef), {
    autor: "Anonymous",
    content: "Information",
    sent: "17, Friday, March - 20:01:28 2024",
    reactions: ["XD", ":)", ":(", ">:(", ":D"],
  });

  await setDoc(doc(topicRoomsRef), {
    autor: "Anybody",
    content: "Details",
    sent: "18, Saturday, March - 10:45:12 2024",
    reactions: [";)", ":o", ":P", ":D", ":/"],
  });

  await setDoc(doc(topicRoomsRef), {
    autor: "Everyone",
    content: "Updates",
    sent: "19, Sunday, March - 16:55:37 2024",
    reactions: [":)", ":o", "XD", ":|", ":P"],
  });

  await setDoc(doc(topicRoomsRef), {
    autor: "Nobody",
    content: "Feedback",
    sent: "20, Monday, March - 08:10:59 2024",
    reactions: ["LOL", ":)", ":D", ":P", ";)"],
  });

  await setDoc(doc(topicRoomsRef), {
    autor: "Somebody",
    content: "Responses",
    sent: "21, Tuesday, March - 12:20:44 2024",
    reactions: [":)", ":O", "XD", ">:/", ":P"],
  });

  await setDoc(doc(topicRoomsRef), {
    autor: "Everybody",
    content: "Reactions",
    sent: "22, Wednesday, March - 19:33:25 2024",
    reactions: [":)", ":o", "XD", ":|", ":D"],
  });

  await setDoc(doc(topicRoomsRef), {
    autor: "No one",
    content: "Comments",
    sent: "23, Thursday, March - 07:45:59 2024",
    reactions: [":)", ":(", "XD", ">:(", ";)"],
  });

  await setDoc(doc(topicRoomsRef), {
    autor: "Someone else",
    content: "Opinions",
    sent: "24, Friday, March - 15:55:20 2024",
    reactions: ["XD", ":D", ":)", ":P", ";)"],
  });
}

export async function publishRoomMessage(roomName: string = "Ciências") {
  /*
    {
      autor: "Another",
      content: "Message",
      sent: "15, Wednesday, March - 09:22:15 2024",
      reactions: ["<3", ":D", ";)", ":|", ":("],
    }
  */

  const messagesRef = collection(db, `messages/rooms/${roomName}`);

  const cancelID = setInterval(async () => {
    await setDoc(doc(messagesRef), {
      autor: "Another",
      content: "Message",
      sent: "15, Wednesday, March - 09:22:15 2024",
      reactions: ["<3", ":D", ";)", ":|", ":("],
    });
  }, 1000);

  return cancelID;
}

export type RoomMessage = {
  autor: string;
  content: string;
  sent: string;
  reactions: string[];
};
