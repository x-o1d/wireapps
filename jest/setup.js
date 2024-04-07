jest.mock("react-native-bootsplash", () => {
  return {
    hide: jest.fn().mockResolvedValue(),
    isVisible: jest.fn().mockResolvedValue(false),
    useHideAnimation: jest.fn().mockReturnValue({
      container: {},
      logo: { source: 0 },
      brand: { source: 0 },
    }),
  };
});

jest.mock("react-native-vector-image", () => 'svg image');


jest.mock("@react-navigation/native", () => {
  return {
    useNavigation:() => ({
      navigate: () => {
        console.log('navigate to some screen')
      }
    })
  };
});