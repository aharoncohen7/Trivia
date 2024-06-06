import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useTriviaStore = create((set, get) => ({
    user: {},
    answers: 0,
    setAnswers: (answers) => set({ answers }),
    correct_answers: 0,
    setCorrect_Answers: (correct_answers) => set({ correct_answers }),
    questions: [],
    favorites: [],
    loading: false,
    error: null,
    primaryColor: '#1c18dc',
    darkMode: false,
    setLoading: (loading) => set({ loading }),
    endGame:(correct_answers)=> {
      set(state => ({ answers: state.answers + 9, }))
      set(state => ({ correct_answers: state.correct_answers + correct_answers }))
    },
    setError: (error) => set({ error }),
    setUser: (user) => set({ user }),
    setQuestions: (questions) => set({ questions }),
    fetchQuestions: async () => {
        set((state) => ({ loading: true }))
        try {
            const { data: { results } } = await axios.get('https://opentdb.com/api.php?amount=9')
            set((state) => ({ questions: formatQuestions(results), loading: false }))
        } catch (error) {
            set(()=>({ error, loading: false }));
        }
    },
    isFavorite: (favorite) => {
        return get().favorites.includes(favorite);
    },
    addFavorite: (favorite) => set(state => ({ favorites: [...state.favorites, favorite]})),
    removeFavorite: (favorite) => set(state => ({ favorites: state.favorites.filter(fav=>fav!=favorite)})),
    setPrimaryColor: (clr) => { set((state) => ({ primaryColor: clr })) },
    setDarkMode: () => set((state) => {
        const newDarkMode = !state.darkMode;
        return { darkMode: newDarkMode };
      }),
    login: async (body) => {
        try {
            const response = await axios.post("your_login_endpoint", body); // Change the URL to your login endpoint
            const user = response.data.user; // Assuming the user data is available in the response
            set({ user });
            localStorage.token = user.token;
        } catch (error) {
            set({ error });
        }
    },
}))




function formatQuestions(questions) {
    // Iterate through each question
    const formattedQuestions = questions.map(question => {
      // Create a copy of incorrect answers array
      const incorrectAnswers = [...question.incorrect_answers];
      // Randomly select a position to insert the correct answer
      const correctAnswerPosition = Math.floor(Math.random() * question.incorrect_answers.length);
      // Insert the correct answer at the random position
      incorrectAnswers.splice(correctAnswerPosition, 0, question.correct_answer);
      // Map answers to objects with additional field indicating if it's correct
      const answers = incorrectAnswers.map(answer => ({
        answer,
        isCorrect: answer === question.correct_answer
      }));
      // Return the formatted question object with answers as an array of objects
      return {
        question: question.question,
        answers
      };
    });
    return formattedQuestions;
  }



  // export const useTriviaStore = create(persist((set, get) => ({
//     user: {},
//     questions: [],
//     favorites: [],
//     loading: false,
//     error: null,
//     setLoading: (loading) => set({ loading }),
//     setError: (error) => set({ error }),
//     setUser: (user) => set({ user }),
//     setQuestions: (questions) => set({ questions }),
//     setFavorites: (favorite) => set(state=>({favorites:[...state.favorites, favorite]})),
//     fetchQuestions: async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get("https://opentdb.com/api.php?amount=10");
//             setQuestions(response.data.results);
//             setLoading(false);
//         } catch (error) {
//             setError(error);
//             setLoading(false);
//         }
//     },
//     login: async(body)=>{
//         const user =  await axios.get("https://opentdb.com/api.php?amount=10");
//         setUser(user);
//         localStorage.token = user.token

//     },
//  }
// )), {
//         name:"trivia-stor",
//         getStorage: ()=> localStorage
//     })


// export const useTriviaStore2 = create(persist(set => ({
//     user: {}, // Change from null to an object
//     questions: [],
//     favorites: [],
//     loading: false,
//     error: null,
//     setLoading: (loading) => set({ loading }),
//     setError: (error) => set({ error }),
//     setUser: (user) => set({ user }),
//     setQuestions: (questions) => set({ questions }),
//     fetchQuestions: async () => {
//         set(()=>{ ({loading: true}) });
//         try {
//             const response = await axios.get("https://opentdb.com/api.php?amount=10");
//             set(()=>({ questions: response.data.results, loading: false }));
//         } catch (error) {
//             set(()=>({ error, loading: false }));
//         }
//     },
//     setFavorites: (favorite) => set(state => ({ favorites: [...state.favorites, favorite] })),
//     login: async (body) => {
//         try {
//             const response = await axios.post("your_login_endpoint", body); // Change the URL to your login endpoint
//             const user = response.data.user; // Assuming the user data is available in the response
//             set({ user });
//             localStorage.token = user.token;
//         } catch (error) {
//             set({ error });
//         }
//     },
// }), {
//     name: "trivia-store",
//     getStorage: () => localStorage
// }));


// export const useTriviaStore3 = create((set, get) => ({
//     questions: [],
//     loading: false,
//     user: null,
//     color: '#ff9500',
//     darkMode: false,
//     fetchQuestions: async () => {
//         set((state) => ({ loading: true }))
//         const { data: { results } } = await axios.get('https://opentdb.com/api.php?amount=10')
//         set((state) => ({ questions: results, loading: false }))
//     },
//     setColor: (clr) => { set((state) => ({ color: clr })) },
//     setDarkMode: () => set((state) => {
//         const newDarkMode = !state.darkMode;
//         return { darkMode: newDarkMode };
//       }),
// }))