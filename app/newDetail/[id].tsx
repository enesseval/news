import { ChevronLeft } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Button, H1, H3, Image, Separator, Text, View } from "tamagui";
import { RootState } from "../store";
import { format } from "date-fns";

const NewDetail = () => {
   const router = useRouter();

   const selectedNew = useSelector((state: RootState) => state.news.selectedNews);

   const date = format(new Date(Number(selectedNew?.date) * 1000), "HH:mm:ss / dd-MM-yyyy");

   if (!selectedNew) {
      return <Text>Seçili haber bulunamadı</Text>;
   }

   return (
      <>
         <View style={styles.navbar}>
            <View style={styles.navbarBackButton}>
               <Button size="$2" onPress={() => router.push("/")} style={{ backgroundColor: "transparent" }} icon={<ChevronLeft size="$3" />} />
               <H3 style={{ marginLeft: -5 }}>Anasayfa</H3>
            </View>
         </View>
         <View>
            <H1 style={{ borderBottomWidth: 1, borderBottomColor: "black", borderBottomStyle: "solid", paddingHorizontal: 5 }}>{selectedNew.title}</H1>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "black", borderBottomStyle: "solid" }} />
            <View style={{ padding: 2, position: "relative" }}>
               <Image style={{ marginTop: 5, borderRadius: 5 }} source={{ uri: `${selectedNew.image}`, height: 300 }} />
               <View style={{ position: "absolute", top: 10, right: 5, backgroundColor: "white", borderRadius: 15, padding: 3 }}>
                  <Text> {date}</Text>
               </View>
            </View>
            <View style={{ padding: 5 }}>
               <Text theme="alt2">{selectedNew.description}</Text>
            </View>
         </View>
      </>
   );
};

const styles = StyleSheet.create({
   navbar: {
      width: "100%",
      padding: 5,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 50,
      backgroundColor: "transparent",
      marginTop: 50,
   },
   navbarBackButton: {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      left: 0,
      alignItems: "center",
   },
   listView: {
      flex: 1,
      height: "auto",
   },
});

export default NewDetail;
