export type RootStackParamList = {
  Root: undefined;
  Signin: undefined;
  Tab: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Messages: undefined;
};

export type HomeParamList = {
  Home: undefined;
  PlaceDetail: {place: PlaceType};
};

export type MessagesParamList = {
  Messages: undefined;
  Conversation: {sender: Sender};
};

export type PlaceType = {
  images: Array<string>;
  reviewers: Array<string>;
  rate: number;
};

export type Sender = {
  id: string;
  from: string;
  picture: string;
  conversationId: string;
};

export type Conversation = {
  id: string;
  messages: Array<Message>;
};

export type Message = {
  value: string;
  from: string;
};
