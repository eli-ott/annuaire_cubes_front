export function verifyObjectFields(obj: object, requiredFields: string[]) {
    if (typeof obj !== 'object' || obj === null) {
        throw new Error("Invalid object provided");
    }
    if (!Array.isArray(requiredFields)) {
        throw new Error("Required fields must be an array");
    }

    const missingFields = requiredFields.filter(field => !(field in obj));

    return {
        isValid: missingFields.length === 0,
        missingFields
    };
}