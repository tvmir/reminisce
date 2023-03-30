import { DocumentData } from 'firebase/firestore';

// React Navigation Types
export type RootStackParamList = {
  // Auth Screens
  Login: undefined;
  Signup: undefined;
  // Main Tab Screens
  Home: undefined;
  // Scrapbook Screens
  Add: undefined;
  Images: { image: string } | undefined;
  Post: { images: string[] } | undefined;
  Scrapbook: { item: DocumentData | undefined } | undefined;
  FullView: { item: string[] | unknown } | undefined;
  // Profile Screens
  Profile: undefined;
  EditProfile: {
    field: {
      name: string;
      bio: string;
      location: string;
    };
    value: DocumentData | CurrentUser | undefined;
  };
  UsersProfile: { user: DocumentData | undefined } | undefined;
  CameraView: undefined;
  // Chat Screens
  ChatMessages: { cid: DocumentData | undefined } | undefined;
  CreateChat: { user: DocumentData | undefined } | undefined;
};

export type BottomTabParamList = {
  // Main Screens
  Feed: undefined;
  Search: undefined;
  AddFC: undefined;
  Map: undefined;
  Messages: undefined;
};
