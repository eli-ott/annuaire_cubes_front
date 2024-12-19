import type { MainDates } from "./Shared";

/** L'interface pour un service d'un salarie */
export interface Service extends MainDates {
    /** L'id */
    idService: number;
    /** Le nom du service */
    nom_service: string;
}