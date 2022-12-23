### TODO
- [ ] Move user signup functionality from Login -> Signup screen
- [ ] Add Google Provider
- [ ] Finish up all Auth UI Screens
- [ ] Work on the logged in user profile screen
  - [ ] Add camera and phone library support for user profile picture
  - [ ] Finish UI
  - [ ] Ensure user details + scrapbooks are being fetched correctly from the database
- [ ] Introduce a "For You" screen (if we decide to go this route)

### In Progress

- [ ] Customize the camera and library screens to fit the app's theme

### Done
- [x] Add camera and phone library support for scrapbook creation
- [x] Add a "scrapbooks" collection inside the database for storing the scrapbook's description, tags, location, and images
- [x] Store the images taken from the camera to the database under the "user_scrapbooks" collection, which associates each scrapbook by the users' id