// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function verifyObjectFields(obj: any, requiredFields: string[]) {
	if (typeof obj !== 'object' || obj === null) {
		throw new Error('Invalid object provided');
	}
	if (!Array.isArray(requiredFields)) {
		throw new Error('Required fields must be an array');
	}

	const missingFields = requiredFields.filter((field) => {
		console.log(field, obj[field]);
		console.log(field in obj, obj[field] == null);
		return !(field in obj) || obj[field] == null;
	});
	console.log(missingFields);

	return {
		isValid: missingFields.length === 0,
		missingFields
	};
}
