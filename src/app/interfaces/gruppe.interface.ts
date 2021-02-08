import { Aufgaben } from "./aufgaben.interface";
import { Ergebnis } from "./ergebnis.interface";
import { Schueler } from "./schueler.interface";
import { Themen } from "./themen.interface";

export interface Gruppe {
  _id?: string;
  temporalCreateId?: number;
  schuelerList?: Schueler[];
  name?: Themen; //name of thema
  aufgabenList?: Aufgaben[];
  groeße?: number;
  ergebnis?: Ergebnis;
}
