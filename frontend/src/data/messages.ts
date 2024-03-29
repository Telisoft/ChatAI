import { ContactTypes } from "./contacts";
import { myData } from "./myProfile";

export interface AttachmentTypes {
  id: number;
  name: string;
  downloadLink: string;
  desc: string;
}

export interface ImageTypes {
  id: number;
  downloadLink: string;
}
export interface MessagesTypes {
  mId: number;
  text?: string;
  time: string;
  receiver: string | number;
  sender: string | number;
  userData?: ContactTypes;
  sent: boolean;
  received: boolean;
  read: boolean;
  isForwarded?: boolean;
  attachments?: AttachmentTypes[];
  image?: ImageTypes[];
  replyOf?: MessagesTypes;
}
export interface ConversationTypes {
  conversationId: string | number;
  userId: string;
  isGroupConversation?: boolean;
  typingUser?: string | number;
  messages: MessagesTypes[];
}

export const myId = myData.id;
let conversations: ConversationTypes[] = [
  {
    conversationId: 1,
    userId: "614ecab4ac946a9bdafa4e3b",
    typingUser: "614ecab4ac946a9bdafa4e3b",
    messages: [
      /*{
        mId: 1,
        text: "Hi.",
        time: new Date().toISOString(),
        meta: {
          receiver: myId,
          sender: "614ecab4ac946a9bdafa4e3b",
          sent: true,
          received: true,
          read: true,
        },
      },
      {
        mId: 2,
        text: "Good morning, How are you? What about our next meeting?",
        time: new Date().toISOString(),
        meta: {
          receiver: "614ecab4ac946a9bdafa4e3b",
          sender: myId,
          sent: true,
          received: true,
          read: true,
        },
      },
      {
        mId: 3,
        text: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM",
        time: new Date().toISOString(),
        meta: {
          receiver: myId,
          sender: "614ecab4ac946a9bdafa4e3b",
          sent: true,
          received: true,
          read: true,
        },
      },
      {
        mId: 4,
        text: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁",
        time: new Date().toISOString(),
        meta: {
          receiver: myId,
          sender: "614ecab4ac946a9bdafa4e3b",
          sent: true,
          received: true,
          read: true,
        },
      },
      {
        mId: 5,
        text: "Wow that's great",
        time: new Date().toISOString(),
        meta: {
          receiver: "614ecab4ac946a9bdafa4e3b",
          sender: myId,
          sent: true,
          received: true,
          read: true,
        },
      },
      {
        mId: 6,
        time: new Date().toISOString(),
        meta: {
          receiver: myId,
          sender: "614ecab4ac946a9bdafa4e3b",
          sent: true,
          received: true,
          read: true,
        },
        image: [
          {
            id: 1,
            downloadLink: img1,
          },
          {
            id: 2,
            downloadLink: img2,
          },
        ],
      },
      {
        mId: 7,
        time: new Date().toISOString(),
        meta: {
          receiver: "614ecab4ac946a9bdafa4e3b",
          sender: myId,
          sent: true,
          received: true,
          read: true,
        },
        attachments: [
          {
            id: 1,
            name: "design-phase-1-approved.pdf",
            downloadLink: "",
            desc: "12.5 MB",
          },
        ],
      },*/
    ],
  },
];

const onChangeConversations = (newData: ConversationTypes[]) => {
  conversations = newData;
};

// const conversationExample = {
//   conversationId: 1,
//   userId: "614ecab4ac946a9bdafa4e3b",
//   messages: [
//     {
//       mId: 1,
//       text: "",
//       time: "",
//       meta: {
//         receiver: directMessages[0].id,
//         sender: directMessages[1].id,
//         sent: true,
//         received: true,
//         read: true,
//       },
//       attachments: [
//         {
//           id: 1,
//           name: "",
//           downloadLink: "",
//           desc: "",
//         },
//       ],
//       image: [
//         {
//           id: 1,
//           downloadLink: "",
//         },
//       ],
//     },
//   ],
// };
export { conversations, onChangeConversations };
