import { create } from "zustand";
import axios from "axios";

export const useTriviaStore = create(presist((set, get) => ({
    user: null,
    questions: [],
    loading: false,
    error: null,
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setUser: (user) => set({ user }),
    setQuestions: (questions) => set({ questions }),
    fetchQuestions: async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://opentdb.com/api.php?amount=10");
            setQuestions(response.data.results);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    },
    login: async(body)=>{
        const user =  await axios.get("https://opentdb.com/api.php?amount=10");
        setUser(user);
        localStorage.token = user.token

    }, })), {
        name:"trivia-stor",
        getStorage: ()=> sessionStorage
    })
