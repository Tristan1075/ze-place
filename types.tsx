export type RootStackParamList = {
  Root: undefined;
  Signin: undefined;
  Signup: undefined;
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
export type HeaderParamList = {
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
  birthdate: String;
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

export type SigninForm = {
  email: string;
  password: string;
};

export type SignupForm = {
  avatar: string;
  firstname: string;
  lastname: string;
  birthdate?: Date;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  description: string;
};
