import defaultConfig from "@tamagui/config/v3";
import { Filter } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button, createTamagui, H1, Popover, Spinner, TamaguiProvider, Text, View } from "tamagui";
import { categorySelect, New } from "../types/types";
import { filterNews, getCategories, getNews } from "../helpers/firebaseFunctions";
import Dropdown from "react-native-input-select";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import tr from "dayjs/locale/tr";
import NewCard from "../components/NewCard";
import { useNavigation } from "expo-router";

const config = createTamagui(defaultConfig);

export default function Page() {
   const [categories, setCategories] = useState<categorySelect[]>([]);
   const [selectedCategory, setSelectedCategory] = useState("");
   const [startDate, setStartDate] = useState<DateType | null>(null);
   const [endDate, setEndDate] = useState<DateType | null>(null);
   const [news, setNews] = useState<New[]>([]);
   const [lastVisible, setLastVisible] = useState<any>(null);
   const [hasMoreNews, setHasMoreNews] = useState(true);
   const [loading, setLoading] = useState(false);
   const [popoverOpen, setPopoverOpen] = useState(false);
   const navigation = useNavigation();

   useEffect(() => {
      const fetchCategories = async () => {
         setLoading(true);
         try {
            const categoriesData = await getCategories();
            setCategories(categoriesData);
            setLoading(false);
         } catch (error) {
            console.error("Kategoriler alınırken bir hata oluştu: ", error);
            setLoading(false);
         }
      };
      fetchCategories();
      navigation.setOptions({ headerShown: false });
   }, []);

   useEffect(() => {
      const unsubscribe = getNews(lastVisible, selectedCategory, startDate ? new Date(startDate.valueOf()) : null, endDate ? new Date(endDate.valueOf()) : null, (newNews, newLastVisible) => {
         setNews(newNews);
         setLastVisible(newLastVisible);
      });
      return () => unsubscribe();
   }, []);

   const getMoreNews = () => {
      if (hasMoreNews && !loading) {
         setLoading(true);
         try {
            const unsubscribe = getNews(lastVisible, selectedCategory, startDate ? new Date(startDate.valueOf()) : null, endDate ? new Date(endDate.valueOf()) : null, (newNews, newLastVisible) => {
               if (newNews.length === 0) setHasMoreNews(false);
               else {
                  setNews((prev) => [...prev, ...newNews]);
                  setLastVisible(newLastVisible);
               }
            });
            setLoading(false);
            return () => unsubscribe();
         } catch (error) {
            setLoading(false);
            console.error("Bir hata oluştu: ", error);
         }
      }
   };

   const handleFilter = async () => {
      if ((startDate && endDate) || selectedCategory) {
         setPopoverOpen(false);
         setLoading(true);
         try {
            const { news, lastVisibleDoc } = await filterNews(selectedCategory, startDate ? new Date(startDate.valueOf()) : null, endDate ? new Date(endDate.valueOf()) : null);
            setNews(news);
            setLastVisible(lastVisibleDoc);
            setLoading(false);
            setHasMoreNews(true);
         } catch (error) {
            setLoading(false);
            console.log("Haberler filtrelenirken bir hata oluştu: ", error);
         }
      }
   };

   const removeFilters = async () => {
      setPopoverOpen(false);
      setLoading(true);
      setSelectedCategory("");
      setStartDate(null);
      setEndDate(null);
      try {
         const { news, lastVisibleDoc } = await filterNews("", null, null);
         setNews(news);
         setLastVisible(lastVisibleDoc);
         setLoading(false);
         setHasMoreNews(true);
      } catch (error) {
         console.log("Haberler filtrelenirken bir hata oluştu: ", error);
      }
   };

   return (
      <TamaguiProvider config={config}>
         <View style={styles.navbar}>
            <H1>Haberler</H1>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
               <Popover.Trigger asChild style={styles.popoverButton}>
                  <Button theme="active" variant="outlined" icon={Filter} />
               </Popover.Trigger>
               <Popover.Content
                  borderWidth={1}
                  borderColor="$borderColor"
                  enterStyle={{ y: -10, opacity: 0 }}
                  exitStyle={{ y: -10, opacity: 0 }}
                  elevate
                  animation={[
                     "quick",
                     {
                        opacity: {
                           overshootClamping: true,
                        },
                     },
                  ]}
               >
                  <Text style={{ marginVertical: 5 }}>Kategori yada tarih seçiniz</Text>
                  <Dropdown placeholder="Kategori seçiniz" autoCloseOnSelect options={categories} selectedValue={selectedCategory} onValueChange={(val: string) => setSelectedCategory(val)} />
                  <DateTimePicker
                     startDate={startDate}
                     endDate={endDate}
                     onChange={(params) => {
                        setStartDate(params.startDate);
                        setEndDate(params.endDate);
                     }}
                     mode="range"
                     locale={tr}
                     maxDate={new Date()}
                  />
                  <View style={{ display: "flex", flexDirection: "row" }}>
                     <Button onPress={removeFilters} style={{ marginRight: 5 }}>
                        Filtreleri temizle
                     </Button>
                     <Button onPress={handleFilter}>Filtrele</Button>
                  </View>
               </Popover.Content>
            </Popover>
         </View>
         <View style={styles.listView}>
            <FlatList
               data={news}
               ListFooterComponent={loading ? <Spinner size="large" /> : null}
               keyExtractor={(item) => item.id}
               renderItem={({ item }) => <NewCard news={item} />}
               onEndReached={getMoreNews}
               onEndReachedThreshold={0.1}
            />
         </View>
      </TamaguiProvider>
   );
}

const styles = StyleSheet.create({
   navbar: {
      width: "100%",
      padding: 5,
      display: "flex",
      alignItems: "center",
      backgroundColor: "transparent",
      marginTop: 50,
      fontFamily: "Poppins",
   },
   popoverButton: {
      position: "absolute",
      top: 5,
      right: 5,
   },
   listView: {
      flex: 1,
      height: "auto",
      backgroundColor: "transparent",
      fontFamily: "Poppins",
   },
});
