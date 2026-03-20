import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import app from "./js/firebase.js";
export default function useDishMethod() {
  const fetchDish = async () => {
    try {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "dishes"));

      const dishes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return dishes;
    } catch (error) {
      console.error("Error fetching dishes: ", error);
      return [];
    }
  };

  return {
    fetchDish,
  };
}
