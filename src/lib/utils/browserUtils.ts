import { toast } from "sonner";

export const handleCopy = (text: string) => {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			// eslint-disable-next-line no-console
			console.log("Copied to clipboard:", text);
			toast.success("Copied to clipboard", {
				description: `${text} has been copied!`, // Customize this message as needed
			});
		})
		.catch((err) => {
			// eslint-disable-next-line no-console
			console.error("Failed to copy text: ", err);
			toast.error("Failed to copy text", {
				description: "There was an issue copying the text. Please try again.",
				action: {
					label: "Undo",
					// eslint-disable-next-line no-console
					onClick: () => console.log("Undo action executed"), // Implement undo action if needed
				},
			});
		});
};
