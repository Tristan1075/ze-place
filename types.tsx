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
  PlaceDetail: {place: Place};
  PlaceList: {filter: FilterForm};
  CreatePlace: undefined;
  MapModal: undefined;
};

export type CreatePlaceParamList = {
  CreatePlace: undefined;
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

  _id:string;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;

  phoneNumber: string;
  birthdate: string;
  address: string;
  description: string;
  created_at: {type: Date; default: Date};
  favorites: Place[];
  promoCode: String[],
  historyCode: String[],
};

export type Place = {
  _id: string;
  title: string;
  aboutUser: string;
  location: Location;
  placeType: PlaceType;
  surface: string;
  price: string;
  locationDuration: {
    title: string;
    value: string;
  };
  rate: string;
  description: string;
  images: Array<Image>;
  features: Array<FeatureType>;
  authorizeAnimals: boolean;
  authorizeMusic: boolean;
  authorizeSmoking: boolean;
  authorizeFire: boolean;
  authorizeFoodAndDrink: boolean;
  reviews: Array<Review>;
  created_at: {type: Date; default: Date};
};

export type Review = {
  from: User;
  text: string;
  rate: Number;
  created_at: {type: Date; default: Date};
};

export type Promo = {
  name: string;
  end_date: string;
  start_date:string;
  user_limit: Number;
  value:Number
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
  center: Array<number>;
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
  longitude?: string;
  latitude?: string;
};

export type CreatePlaceForm = {
  title?: string;
  aboutUser?: string;
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