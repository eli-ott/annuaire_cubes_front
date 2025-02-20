import type { Service } from './Service';
import type { Site } from './Site';

/** L'interface pour un salarie */
export interface Salarie {
	/** L'id admin si c'est un admin */
	idAdmin?: number;
	/** L'id user si c'est un admin */
	idUser?: number;
	/** L'id */
	id: number;
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
