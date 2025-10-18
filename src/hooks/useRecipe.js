import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

export function useAddRecipe() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const addRecipe = async (recipe) => {
    setIsPending(true);
    setError(null);
    setMessage(null);

    try {
      await addDoc(collection(db, "recipes"), recipe);
      setMessage(" Recipe muvaffaqiyatli qo‘shildi!");
    } catch (err) {
      setError(" Ma’lumotni saqlashda xatolik yuz berdi!");
    } finally {
      setIsPending(false);
    }
  };

  return { addRecipe, isPending, error, message };
}
