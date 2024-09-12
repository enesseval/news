import { Timestamp } from "firebase/firestore";

export type categorySelect = {
   label: string;
   value: string;
};

export type New = {
   id: string;
   category_id: string;
   title: string;
   description: string;
   image: string;
   date: Timestamp;
};

export type serializedNew = {
   id: string;
   category_id: string;
   title: string;
   description: string;
   image: string;
   date: string;
};
