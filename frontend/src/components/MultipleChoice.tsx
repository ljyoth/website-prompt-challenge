import {
	addAnswer,
	clearAnswers,
	clearQuestion,
	postMultipleChoiceAnswers,
	removeAnswer,
	useAppDispatch,
	useAppSelector,
} from "../store";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

function MultipleChoiceQuestion(props: {
	question: string;
	answers: string[];
}) {
	const answers = useAppSelector((state) => state.multipleChoiceAnswers);
	const dispatch = useAppDispatch();

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{props.question}</CardTitle>
			</CardHeader>
			<CardContent className="flex-row space-y-6 justify-center">
				<div className="space-y-2">
					{...props.answers.map((ans) => (
						<label key={ans} className="flex gap-x-2 text-center leading-none">
							<Checkbox
								name="answer"
								key={ans}
								checked={answers.some((a) => ans === a)}
								onCheckedChange={(checked) => {
									if (checked) {
										dispatch(addAnswer(ans));
									} else {
										dispatch(removeAnswer(ans));
									}
								}}
							/>{" "}
							{ans}
						</label>
					))}
				</div>
				<Button
					className="p-4 h-0"
					onClick={() =>
						dispatch(postMultipleChoiceAnswers(answers)).then(() => {
							dispatch(clearQuestion());
							dispatch(clearAnswers());
						})
					}
				>
					Submit
				</Button>
			</CardContent>
		</Card>
	);
}

export default function MultipleChoice() {
	const { multipleChoice, status } = useAppSelector(
		(state) => state.multipleChoice,
	);
	if (status === "loading") {
		return <div>Loading...</div>;
	} else if (status === "error") {
		return <div>Error</div>;
	} else if (!multipleChoice) {
		return;
	}
	return (
		<MultipleChoiceQuestion
			question={multipleChoice.question}
			answers={multipleChoice.answers}
		/>
	);
}
