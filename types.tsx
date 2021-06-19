import {ImageProps} from 'react-native';

export type RootStackParamList = {
  Root: undefined;
  Signin: undefined;
  Signup: undefined;
  Tab: undefined;
  Profil: undefined;
  Menu: undefined;
  PaymentMethods: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Create: undefined;
  Messages: undefined;
  Favorites: undefined;
};

export type HomeParamList = {
  Home: undefined;
  PlaceDetail: {place: string};
  PlaceList: {filter: FilterForm};
  CreatePlace: undefined;
  MapModal: undefined;
  UserBookings: {userBooking: Booking[]; placeId: string};
};

export type BookingTab = {
  BookingList: undefined;
  PlaceDetail: {place: PlaceType};
  UserBookings: {userBooking: Booking[]; placeId: string};
};

export type HeaderParamList = {
  Home: undefined;
  PlaceDetail: {place: PlaceType};
};

export type MessagesParamList = {
  Messages: undefined;
  Conversation: {sender: Sender};
};

export type PlacesParamList = {
  Places: Place[];
};

export type User = {
  _id: string;
  avatar: string;
  gender: string;
  location: Location;
  IDRecto: string;
  IDVerso: string;
  stripeAccount: string;
  customerId: string;
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
  promoCode: string[];
  historyCode: string[];
  ownedPlaces: Place[];
  bookings: Place[];
};

export type Place = {
  _id: string;
  title: string;
  location: Location;
  placeType: PlaceType;
  surface: number;
  price: number;
  rate: string;
  description: string;
  images: Image[];
  features: FeatureType[];
  authorizeAnimals: boolean;
  authorizeMusic: boolean;
  authorizeSmoking: boolean;
  authorizeFire: boolean;
  authorizeFoodAndDrink: boolean;
  reviews: Review[];
  ownerId: string;
  bookings: Booking[];
  isFavorite: boolean;
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
  start_date: string;
  user_limit: Number;
  value: number;
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
  gender: string;
  avatar: string;
  firstname: string;
  lastname: string;
  birthdate?: Date;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  description: string;
  IDRecto: string;
  IDVerso: string;
  location?: Location;
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

export type BugForm = {
  name:string,
  description:string,
  senderId:string
};

export type Location = {
  address?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  longitude: string;
  latitude: string;
};

export type CreatePlaceForm = {
  title?: string;
  location?: Location;
  placeType?: PlaceType;
  startDate?: string;
  endDate?: string;
  surface?: string;
  price?: string;
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
  surface?: number;
  features: Array<FeatureType>;
  location?: Location;
};
export type Coords = {
  longitude: number;
  latitude: number;
};

export type CreditCardInformations = {
  cardNumber?: string;
  expMonth?: number;
  expYear?: number;
  cvcNumber?: string;
};

export type PaymentMethod = {
  billing_details: {
    address: {
      city: string;
      country: string;
      line1: string;
      line2: string;
      postal_code: string;
    };
    email: string;
    name: string;
    phone: string;
  };
  card: {
    brand: string;
    country: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    last4: string;
    networks: {
      available: String[];
    };
    three_d_secure_usage: {
      supported: boolean;
    };
  };
  created: number;
  customer: string;
  id: string;
  livemode: boolean;
  object: string;
  type: string;
  is_default: boolean;
};

export type Booking = {
  _id?: string;
  placeId?: string;
  placeCover?: string;
  placeTitle?: string;
  ownerId?: string;
  userId?: string;
  firstname?: string;
  lastname?: string;
  avatar?: string;
  features: FeatureType[];
  startDate: string;
  endDate: string;
  duration?: number;
  price?: number;
  description: string;
  isAccepted?: boolean;
  isDenied?: boolean;
  isPast?: boolean;
};
