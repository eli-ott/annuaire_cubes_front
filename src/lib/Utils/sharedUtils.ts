import { FIELDS_LABEL } from './fieldsConstant';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function verifyObjectFields(obj: any, requiredFields: string[]) {
	if (typeof obj !== 'object' || obj === null) {
		throw new Error('Invalid object provided');
	}
	if (!Array.isArray(requiredFields)) {
		throw new Error('Required fields must be an array');
	}

	const missingFields = requiredFields
		.filter((field) => {
			return !(field in obj) || obj[field] == null;
		})
		//@ts-expect-error typescript error
		.map((field) => FIELDS_LABEL[field]);

	return {
		isValid: missingFields.length === 0,
		missingFields
	};
}
