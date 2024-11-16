import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { fetchMultipleChoice, useAppDispatch } from "../store";

export default function UrlInput() {
	const dispatch = useAppDispatch();

	type Schema = Parameters<typeof fetchMultipleChoice>[0];
	const form = useForm<Schema>({
		resolver: async (values) => {
			return {
				values,
				errors: {},
			};
		},
		defaultValues: {
			url: "",
		},
	});

	function onSubmit(data: Schema) {
		dispatch(fetchMultipleChoice(data));
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex justify-center w-full items-center space-x-2"
			>
				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input
									placeholder="Website URL"
									{...field}
									className="w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Generate Question</Button>
			</form>
		</Form>
	);
}
