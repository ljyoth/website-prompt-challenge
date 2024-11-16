import {
	type PayloadAction,
	configureStore,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

type MultipleChoice = {
	question: string;
	answers: string[];
};

export const fetchMultipleChoice = createAsyncThunk(
	"fetchMultipleChoice",
	async (data: { url: string }) => {
		const res = await fetch("/api/question", {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		});
		const question = await res.json();
		return question as MultipleChoice;
	},
);

export const postMultipleChoiceAnswers = createAsyncThunk(
	"postMultipleChoiceAnswer",
	async (answers: string[]) => {
		await fetch("/api/answer", {
			method: "POST",
			body: JSON.stringify({ answers }),
			headers: { "Content-Type": "application/json" },
		});
	},
);

const multipleChoiceSlice = createSlice({
	name: "multipleChoice",
	initialState: {} as {
		multipleChoice?: MultipleChoice;
		status?: "loading" | "loaded" | "error";
	},
	reducers: {
		clearQuestion(state) {
			state.multipleChoice = undefined;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMultipleChoice.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchMultipleChoice.rejected, (state) => {
			state.status = "error";
		});
		builder.addCase(fetchMultipleChoice.fulfilled, (state, action) => {
			state.status = "loaded";
			state.multipleChoice = action.payload;
		});
	},
});
export const { clearQuestion } = multipleChoiceSlice.actions;

const multipleChoiceAnswersSlice = createSlice({
	name: "multipleChoiceAnswers",
	initialState: [] as string[],
	reducers: {
		addAnswer(state, action: PayloadAction<string>) {
			state.push(action.payload);
		},
		removeAnswer(state, action: PayloadAction<string>) {
			return state.filter((a) => a !== action.payload);
		},
		clearAnswers() {
			return [];
		},
	},
});
export const { addAnswer, removeAnswer, clearAnswers } =
	multipleChoiceAnswersSlice.actions;

export const store = configureStore({
	reducer: {
		multipleChoice: multipleChoiceSlice.reducer,
		multipleChoiceAnswers: multipleChoiceAnswersSlice.reducer,
	},
});

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector =
	useSelector.withTypes<ReturnType<typeof store.getState>>();
