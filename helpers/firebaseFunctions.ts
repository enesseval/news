import { collection, doc, getDocs, limit, onSnapshot, orderBy, query, startAfter, where } from "firebase/firestore";
import { categorySelect, New } from "../types/types";
import { db } from "./firebaseConfig";

export const getCategories = async (): Promise<categorySelect[]> => {
   const querySnapshot = await getDocs(collection(db, "categories"));

   if (querySnapshot) {
      const categories: categorySelect[] = querySnapshot.docs.map((doc) => {
         const data = doc.data();
         return {
            value: doc.id,
            label: data.viewed_name,
         };
      });
      return categories;
   } else {
      throw new Error("Kategorileri alırken bir hata oluştu");
   }
};

export const getNews = (lastVisible: any, selectedCategory: string, startDate: Date | null, endDate: Date | null, callback: (news: New[], newLastVisible: any) => void) => {
   let q = query(collection(db, "news"), orderBy("date", "desc"), limit(10));

   if (lastVisible) q = query(q, startAfter(lastVisible));

   if (selectedCategory !== "") q = query(q, where("category_id", "==", selectedCategory));

   if (startDate && endDate) q = query(q, where("date", ">=", startDate), where("date", "<=", endDate));

   const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const news = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as New[];
      const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      callback(news, newLastVisible);
   });

   return unsubscribe;
};

export const filterNews = async (selectedCategory: string, startDate: Date | null, endDate: Date | null) => {
   let q = query(collection(db, "news"), orderBy("date", "desc"), limit(10));

   if (selectedCategory !== "") q = query(q, where("category_id", "==", selectedCategory));

   if (startDate && endDate) q = query(q, where("date", ">=", startDate), where("date", "<=", endDate));

   const snapshot = await getDocs(q);
   const newsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
   })) as New[];

   const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
   return { news: newsList, lastVisibleDoc };
};
