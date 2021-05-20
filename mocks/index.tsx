import {FeatureType, Message, PlaceType} from '../types';

export const placesMock: Array<PlaceType> = [
  {
    title: 'A Big House',
    subtitle: 'The way you like...',
    images: [
      'https://images.pexels.com/photos/1315919/pexels-photo-1315919.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      'https://images.pexels.com/photos/4480505/pexels-photo-4480505.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      'https://images.pexels.com/photos/2381872/pexels-photo-2381872.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      'https://images.pexels.com/photos/2381872/pexels-photo-2381872.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ],
    reviewers: [
      'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ],
    rate: 3.5,
  },
  {
    title: 'A Big House',
    subtitle: 'The way you like...',
    images: [
      'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      'https://images.pexels.com/photos/1315919/pexels-photo-1315919.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      'https://images.pexels.com/photos/2381872/pexels-photo-2381872.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ],
    reviewers: [
      'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ],
    rate: 4.8,
  },
  {
    title: 'A Big House',
    subtitle: 'The way you like...',
    images: [
      'https://images.pexels.com/photos/4480505/pexels-photo-4480505.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      'https://images.pexels.com/photos/2381872/pexels-photo-2381872.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ],
    reviewers: [
      'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ],
    rate: 4.5,
  },
  {
    title: 'A Big House',
    subtitle: 'The way you like...',
    images: [
      'https://images.pexels.com/photos/1315919/pexels-photo-1315919.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      'https://images.pexels.com/photos/4480505/pexels-photo-4480505.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      'https://images.pexels.com/photos/2381872/pexels-photo-2381872.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ],
    reviewers: [
      'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    ],
    rate: 2.5,
  },
];

export const categories = [
  {
    icon: 'home',
  },
  {
    icon: 'heart',
  },
  {
    icon: 'home',
  },
  {
    icon: 'home',
  },
];

export const senders: Array<Message> = [
  {
    id: '1',
    from: 'Tristan Luong',
    picture:
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    conversationId: '1',
  },
  {
    id: '2',
    from: 'Arthur Blanc',
    picture:
      'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    conversationId: '2',
  },
  {
    id: '3',
    from: 'Benjamin Rousval',
    picture:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    conversationId: '3',
  },
  {
    id: '4',
    from: 'Frédéric Sananes',
    picture:
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    conversationId: '4',
  },
];

export const conversation = {
  id: '4',
  messages: [
    {
      value: 'Salut !',
      from: '2',
    },
    {
      value:
        "J'espère que tu vas bien, tu cherches une place de parking sur Paris ?",
      from: '2',
    },
    {
      value: 'Nickel et toi ?',
      from: '1',
    },
  ],
};
