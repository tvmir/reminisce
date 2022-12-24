### TODO
- [ ] Add Google Provider
- [ ] Introduce a "For You" screen (if we decide to go this route)

### In Progress

- [ ] Move user signup functionality from Login -> Signup screen
- [ ] Finish up all Auth UI Screens
- [ ] Customize the camera and library screens to fit the app's theme
- [ ] Work on the user profile screen
  - [ ] Add camera and phone library support for user profile picture
  - [ ] Finish UI

### Done
- [x] Add camera and phone library support for scrapbook creation
- [x] Add a "scrapbooks" collection inside the database for storing the scrapbook's description, tags, location, and images
- [x] Store the images taken from the camera to the database under the "user_scrapbooks" collection, which associates each scrapbook by the users' id
- [x] Ensure user details + scrapbooks are being fetched correctly from the database inside the profile screen