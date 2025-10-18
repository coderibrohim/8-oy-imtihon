export const formError = (data, type) => {
  if (type === "signup") {
    if (!data?.name) return "Name is required";
    if (!data?.photoUrl) return "Photo URL is required";
    if (!data?.email) return "Email is required";
    if (!data?.password) return "Password is required";
  }

  if (type === "login") {
    if (!data?.email) return "Email is required";
    if (!data?.password) return "Password is required";
  }

  return null;
};


// utils/firebaseError.js
export const getFirebaseErrorMessage = (error) => {
  if (!error) return "An unexpected error occurred.";

  const match = error.match(/\(auth\/[^\)]+\)/)
  if(!match) return "Something went wrong. Please try again.";

  const code = match[0].replace(/[()]/g, ""); 

  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in instead.";

    case "auth/invalid-email":
      return "The email address is not valid.";

    case "auth/weak-password":
      return "The password is too weak. It must be at least 6 characters.";

    case "auth/missing-password":
      return "Please enter a password.";

    case "auth/user-not-found":
      return "No user found with this email.";

    case "auth/wrong-password":
      return "Incorrect password. Please try again.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";

    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";

    case "auth/popup-closed-by-user":
      return "The popup was closed before finishing the sign-in process.";
    default:
      return "Something went wrong. Please try again.";
  }
};



//recipeError
export const getRecipeError = (recipe) => {
  if (!recipe.title) return "Title is required";
  if (!recipe.cookTime) return "Cooking time is required";
  if (!recipe.method) return "Method is required";
  if (!recipe.ingredients.length) return "At least one ingredient is required";
  if (!recipe.images.length) return "At least one image is required";
  return null;
};


