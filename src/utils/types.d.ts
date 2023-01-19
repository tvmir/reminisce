// This file contains all the types used in the app

// React Navigation Types (will be updated as the app grows)
export type RootStackParamList = {
  // Auth Screens
  Login: undefined;
  Signup: undefined;
  // Main Screens
  Home: undefined;
  // Scrapbook Screens
  Add: undefined;
  Images: undefined;
  Post: undefined;
  Scrapbook: undefined;
  // Profile Screens
  EditProfile: undefined;
  UsersProfile: undefined;
};

export type BottomTabParamList = {
  // Main Screens
  Feed: undefined;
  Search: undefined;
  Map: undefined;
  Notifications: undefined;
  Profile: undefined;
};
