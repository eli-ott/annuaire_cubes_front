import { FIELDS_LABEL } from './fieldsConstant';

/**
 * Verify the fields of an object
 *
 * @param {{ [key: string]: string }} obj The object in which to verify the fields
 * @param {string[]} requiredFields The required fields
 * @returns {{isValid: boolean, missingFields: string[]}} The data of the verification
 */
export function verifyObjectFields(
	obj: { [key: string]: string },
	requiredFields: string[]
): { isValid: boolean; missingFields: string[] } {
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
