export type RootStackParamList = {
  Root: undefined;
  Signin: undefined;
  Tab: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Messages: undefined;
  Favorites: undefined;
};

export type HomeParamList = {
  Home: undefined;
  PlaceDetail: {place: PlaceType};
};

export type MessagesParamList = {
  Messages: undefined;
  Conversation: {sender: Sender};
};

export type User = {
  avatar: String;
  first_name: String;
  last_name: String;
  email: String;
  password: String;
  phone: String;
  address: String;
  description: String;
  created_at: {type: Date; default: Date};
};

export type PlaceType = {
  title: String;
  location: String;
  description: String;
  images: Array<Image>;
  rate: number;
  price: number;
  reviews: Array<Review>;
  created_at: {type: Date; default: Date};
};

export type Review = {
  from: User;
  text: String;
  rate: Number;
  created_at: {type: Date; default: Date};
};

export type Image = {
  name: string;
  url: string;
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

export type Credentials = {
  email: string;
  password: string;
};
