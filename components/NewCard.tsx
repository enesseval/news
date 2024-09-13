import { Image, ListItem, Text, View } from "tamagui";
import { New } from "../types/types";
import { Pressable, StyleSheet } from "react-native";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setSelectedNews } from "../app/newSlice";

interface NewCardProp {
   news: New;
}

const NewCard: React.FC<NewCardProp> = ({ news }) => {
   const router = useRouter();
   const dispatch = useDispatch();
   return (
      <Pressable
         onPress={() => {
            const serializedNews = {
               ...news,
               date: news.date.seconds.toString(),
            };
            dispatch(setSelectedNews(serializedNews));
            router.push(`./newDetail/${news.id}`);
         }}
      >
         <View style={styles.container}>
            <ListItem style={styles.listItem}>
               {news.image ? <Image source={{ uri: news.image }} style={styles.image} /> : <View style={styles.imagePlaceholder} />}
               <View style={styles.newsDate}>
                  <Text>{format(new Date(news.date.seconds * 1000), "HH:mm / dd-MM")}</Text>
               </View>
               <View style={styles.newsTitle}>
                  <Text style={styles.newsText} numberOfLines={1} ellipsizeMode="tail">
                     {news.title}
                  </Text>
               </View>
            </ListItem>
         </View>
      </Pressable>
   );
};

const styles = StyleSheet.create({
   container: {
      padding: 3,
      backgroundColor: "transparent",
      fontFamily: "Poppins",
   },
   image: {
      width: "100%",
      height: 200,
      backgroundColor: "transparent",
      borderRadius: 5,
   },
   imagePlaceholder: {
      width: "100%",
      height: 300,
      backgroundColor: "transparent",
   },
   listItem: {
      backgroundColor: "transparent",
   },
   newsDate: {
      position: "absolute",
      top: 12,
      right: 20,
      backgroundColor: "white",
      padding: 3,
      borderRadius: 5,
   },
   newsTitle: {
      position: "absolute",
      left: 18,
      bottom: 15,
      display: "flex",
      alignItems: "center",
      width: "100%",
   },
   newsText: {
      fontWeight: "bold",
      fontSize: 18,
      padding: 2,
      maxWidth: "95%",
      marginVertical: "auto",
      backgroundColor: "rgba(255,255,255,.85)",
   },
});

export default NewCard;
