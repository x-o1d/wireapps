WireApps marketplace.

This project was bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

Only the android build has been tested (no access to a mac device)

# External Libraries

- @react-navigation
react-navigation was used as the navigator with the native-stack instead of a js-stack for improved performance.
peer dependencies: react-native-safe-area-context, react-native-screens

- @hookstate/core
hookstate is a state management library that builds up on the useState() design pattern to provide globally reactive data stores. compared to alternatives like Redux, Zustand this library offers a zero boilerplate solution by offloading actions and mutations to the component logic using getters and setters. it has zero peer dependencies and helps reduce the ultimate bundle size. it is extremely performant by using a proxy-based value tracking system and therefore can maintain performance even with large states.

- @react-native-bootsplash
this package allows to create a splash image natively at the start of the app, it also comes with a generator to generate svg images for different screen sizes.
(configured for both android and ios)

- @react-native-vector-image
this package allows the usage of svgs in a simple way that is also five times
more performant than the alternative react-native-svgs. it also comes with a generator for generating platform specific .xml files for the svg images.
peer dependencies: @klarna/react-native-vector-drawable
(configured only for android, iOS configuration can be found [here](https://www.npmjs.com/package/react-native-vector-image#ios) requires xCode)

# Screens

The app has three screens,

- ShoppingList: Displays all the products, each product can be added to the cart with different sizes. Allows for searching for products by name, and sorting products based on Name, Brand, Colour and Price.

- ShoppingCart: Displays all the items in the cart, and each item can be removed from the cart, shows the individual prices based on the count as well as the total price.

- ProductDetails: Displays all the details of a selected product, and allows adding them to the cart with different sizes.

# Components

- SelectModal: Select modal renders a modal with the provided select options and calls the provided callback function when an option is pressed.
This component supports a singleton design pattern where only a single SelectModal component is used for all the product list rows. This reduces the number of DOM elements and helps with performance.
This is acheived by passing a ref object using forwardRef() and exposing a show() method to the ref object by using the useImperativeHandle() hook.
The show() method expects three arguments selectOptions, currentSelectedValue and a callback function which gets executed when a new value is selected.
This design allows for easier testing by mocking out the show() method as is shown in ListProduct.test.tsx

- QuantityModal: Quantity modal implementation also follows a similar singleton approach with a single QuantityModal for all cart items. It allows for quantity to be incremented and decremented in the cart view.

- ShoppingListHeader: A custom header component for the ShoppingList screen with a search bar and a button to the ShoppingCart screen which also indicates the total number of items on the cart.

- ShoppingListItem: An individual row of the shopping list (FlatList), shows basic product details with an image and has two buttons for selecting size and adding to cart. It also has an indicator showing how many products of the selected size is in the cart, this feature directly refers to the global cart state.

- CartListItem: An individual row the cart list (FlatList), shows basic product details with an image with a button to remove the item from the cart. If the same item (same size) has two+ quantities the quantitiy will be decremented.




# Deploying on an emulator

```bash
npm install
npm start
npx react-native run-android

