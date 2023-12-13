
  // Import the functions you need from the SDKs you need

  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
  import {
    getDatabase,
    ref,
    set,
    onValue,
    get,push
  } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
  
  
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB3E1_HavX_UOGS9ocsc94TOHsIgrzyQfI",
    authDomain: "text-57316.firebaseapp.com",
    projectId: "text-57316",
    storageBucket: "text-57316.appspot.com",
    messagingSenderId: "41578675930",
    appId: "1:41578675930:web:a2e3ceadebc501659a2fe3",
    measurementId: "G-HTRQ7BL5NY"
  };

  // Initialize Firebase
  
  
  
  
  
  const app = initializeApp(firebaseConfig);
  
  const db = getDatabase(app);
  
  console.log("db", db);
  
  
  
  // export const addMovieForUser = async (movieData) => {
//     const userId = user?.user.uid;
//     if (!userId) {
//       console.error("User ID not available");
//       return;
//     }
    
  
//     const userMoviesRef = ref(db, userMovies/${userId});
  
//     try {
//       const snapshot = await get(userMoviesRef);
  
//       let data = snapshot.val();
//       console.log("Movies for User:", data);
  
//       // If the user doesn't have movies yet, create a new array
//       let allMovies = data || [];
  
//       // Add the new movie to the array
//       let newMovies = allMovies.concat(movieData);
  
//       // Update the movies array in the database
//       set(userMoviesRef, newMovies);
//       // });
//     } catch (error) {
//       console.error("Error updating movies:", error);
//     }
// }
//   ;
  
//   // Function to read data from the Realtime Database in real-time
//   export const readMoviesForUser = async () => {
//     let data;
//     console.log(user.user.uid, "user");
//     let userId = user.user.uid;
  
//     const userMoviesRef = ref(db, userMovies/${userId});
  
//     await onValue(userMoviesRef, (snapshot) => {
//       data = snapshot.val();
//       console.log("Movies for User:", data);
//       displayMovies(data);
//     });
//   };
      
    
function analyzeText() {
  const inputText = document.getElementById('inputText').value;

  // Perform text analysis (replace with your actual implementation)
  const sentimentResult = analyzeSentiment(inputText);
  const keywordsResult = extractKeywords(inputText);

  // Display results
  document.getElementById('sentimentResult').innerText = `Sentiment: ${sentimentResult}`;
  document.getElementById('keywordsResult').innerText = `Keywords: ${keywordsResult.join(', ')}`;

  // Save the analysis to Firebase (replace with your actual implementation)
  saveAnalysisToFirebase(inputText, sentimentResult, keywordsResult);
}

function analyzeSentiment(text) {
  // Check if any positive words are present in the text
  const positiveWords = ['Happy', 'Joyful', 'Exciting', 'Wonderful', 'Positive', 'Great', 'Excellent', 'Fantastic', 'Amazing', 'Terrific', 'Good', 'Delightful', 'Pleasant', 'Glad', 'Pleased', 'Thrilled', 'Uplifting', 'Successful', 'Bright', 'Cheerful','Milestone','win','victory'];
  const foundPositiveWord = positiveWords.some(word => text.toLowerCase().includes(word.toLowerCase()));

  // Categorize as Positive, Negative, or Neutral based on the presence of positive words
  return foundPositiveWord ? 'Positive' : 'Negative';
}

function extractKeywords(text) {
  // Perform keyword extraction and return the result
  // Example: Extracting words longer than 5 characters
  const words = text.split(/\s+/);
  return words.filter(word => word.length > 5);
}

function saveAnalysisToFirebase(text, sentiment, keywords) {
  // Save analysis results to Firebase (replace with your actual implementation)
  try {
      const isNewsTrustworthy = analyzeSentiment(text) === 'Positive';

      const textdata = {
          text: text,
          sentiment: sentiment,
          keywords: keywords,
          isNewsTrustworthy: isNewsTrustworthy
      };

      // Assuming 'text' is a node in your database where you want to store text data
      const textref = ref(db, "text");

      // Push a new child node with the text data
      const newtextref = push(textref);

      // Set the data for the new text
      set(newtextref, textdata)
          .then(() => {
              console.log("Text added to the database successfully");
              // You can perform additional actions after successfully adding the text
              // For example, update the UI or trigger other functionality
          })
          .catch((error) => {
              console.error("Error adding text to the database:", error);
          });
  } catch (error) {
      console.error("Error initializing database:", error);
  }
}


document
  .getElementById("analyzetext")
  .addEventListener("click", analyzeText);