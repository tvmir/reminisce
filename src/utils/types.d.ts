// This file contains all the types used in the app

// React Navigation Types (will be updated as the app grows)
export type RootStackParamList = {
  // Auth Screens
  Login: undefined;
  Signup: undefined;
  // Main Screens
  Home: undefined;
  // Scrapbook Screens
  Images: undefined;
  Post: undefined;
  Scrapbook: undefined;
  // Profile Screens
  Profile: undefined;
  EditProfile: undefined;
  UsersProfile: undefined;
  FullView: undefined;
};

export type BottomTabParamList = {
  // Main Screens
  Feed: undefined;
  Search: undefined;
  AddFC: undefined;
  Map: undefined;
  Notifications: undefined;
};
