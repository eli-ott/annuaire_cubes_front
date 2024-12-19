import type { Service } from './Service';
import type { MainDates } from './Shared';
import type { Site } from './Site';

/** L'interface pour un salarie */
export interface Salarie extends MainDates {
	/** L'id */
	idSalarie: number;
	/** Son nom */
	nom: string;
	/** Son prénom */
	prenom: string;
	/** Le téléphone fixe */
	telFixe: string;
	/** Le téléphone portable */
	telPortable: string;
	/** Son email */
	email: string;
	/** Son service */
	service: Service;
	/** Son site */
	site: Site;
}
