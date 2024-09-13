import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "./store";
import { View } from "tamagui";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function RootLayout() {
   const [fontsLoaded] = useFonts({
      Poppins: require("../assets/font/poppins.ttf"),
      Inter: require("../assets/font/inter.ttf"),
      InterBold: require("../assets/font/inter.ttf"),
   });

   if (!fontsLoaded) return null;

   return (
      <Provider store={store}>
         <Stack
            screenOptions={{
               headerShown: false,
            }}
         ></Stack>
      </Provider>
   );
}
