import {ImageProps} from 'react-native';

export type RootStackParamList = {
  Root: undefined;
  Signin: undefined;
  Signup: undefined;
  Tab: undefined;
  Profil: undefined;
  ProfilList: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Create: undefined;
  Messages: undefined;
  Favorites: undefined;
};

export type HomeParamList = {
  Home: undefined;
  PlaceDetail: {place: PlaceType};
  PlaceList: {filter: FilterForm};
  CreatePlace: undefined;
  MapModal: undefined;
};

export type CreatePlaceParamList = {
  CreatePlace: undefined;
};

export type MessagesParamList = {
  Messages: undefined;
  Conversation: {sender: Sender};
};

export type User = {
  _id: string;
  avatar: String;
  first_name: String;
  last_name: String;
  email: String;
  password: String;
  phone: String;
  address: String;
  birthdate: string;
  description: String;
  created_at: {type: Date; default: Date};
};

export type Place = {
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

export type FeatureType = {
  name: string;
  icon: {
    name: string;
    url: ImageProps;
  };
};

export type PlaceType = {
  id: string;
  name: string;
};

export type MapboxSearch = {
  address: string;
  context: [
    {
      id: string;
      text: string;
    },
  ];
  place_name: string;
  text: string;
};

export type Location = {
  address?: string;
  postalCode?: string;
  city?: string;
  country?: string;
};

export type CreatePlaceForm = {
  title?: string;
  aboutMe?: string;
  location?: Location;
  placeType?: PlaceType;
  surface?: string;
  price?: string;
  locationDuration: {
    title: string;
    value: string;
  };
  description?: string;
  images: Array<Image>;
  features: Array<FeatureType>;
  authorizeAnimals: boolean;
  authorizeMusic: boolean;
  authorizeSmoking: boolean;
  authorizeFire: boolean;
  authorizeFoodAndDrink: boolean;

};

export type FilterForm = {
  placeType?: PlaceType;
  price?: number;
  surface?: string;
  features: Array<FeatureType>;
  location?: Location;
};