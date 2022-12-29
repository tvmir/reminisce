// This file contains all the types used in the app

// React Navigation Types (will be updated as the app grows)
export type RootStackParamList = {
  // Auth Screens
  Login: undefined;
  Signup: undefined;
  // Main Screens
  Home: undefined;
  Map: undefined;
  // Scrapbook Screens
  Add: undefined;
  Images: undefined;
  Post: undefined;
  // Profile Screens
  EditProfile: undefined;
  UsersProfile: undefined;
};

export type BottomTabParamList = {
  // Main Screens
  Feed: undefined;
  Search: undefined;
  MapS: undefined;
  Notifications: undefined;
  Profile: undefined;
};
