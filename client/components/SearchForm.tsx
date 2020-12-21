import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { ErrorMessage } from "./ErrorMessage";

interface Props {
	onSubmit: (origin: string, destionations: string[]) => Promise<void>;
	isLoading: boolean;
}

export const SearchForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
	return (
		<Formik
			initialValues={{ origin: "", destinations: "" }}
			validationSchema={Yup.object({
				origin: Yup.string().required("required"),
				destinations: Yup.string().required("required")
			})}
			onSubmit={async (values, { setSubmitting }) => {
				const { origin, destinations } = values;
				const destArray = destinations
					.split("\n")
					.filter(destination => destination.length > 0);
				try {
					await onSubmit(origin, destArray);
				} finally {
					setSubmitting(false);
				}
			}}
		>
			{() => (
				<Form>
					<div className="form-control">
						<Field
							className="width-100 round-border"
							name="origin"
							type="text"
							placeholder="Departing from"
						/>
						<div className="flex items-center justify-center">
							<ErrorMessage name="origin" />
						</div>
					</div>
					<div className="form-control">
						<Field
							className="width-100"
							name="destinations"
							as="textarea"
							rows={10}
							placeholder={"Destination A\nDestination B\nDestination C"}
						/>
						<div className="flex items-center justify-center">
							<ErrorMessage name="destinations" />
						</div>
						<div className="flex justify-center">
							<button type="submit" disabled={isLoading}>
								{isLoading ? "Searching..." : "Search"}
							</button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};
