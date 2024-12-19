import type { MainDates } from "./Shared";

/** L'interface pour le site d'un employé */
export interface Site extends MainDates {
    /** L'id */
    idSite: number;
    /** Le nom */
    site:  string;
    /** La ville */
    ville: string;
}