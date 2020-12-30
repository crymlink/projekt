import { Aufgaben } from "./aufgaben.interface";
import { Schueler } from "./schueler.interface";

export interface Gruppe {
  _id?: string;
  schuelerList: Schueler[];
  name: string; //name of thema
  aufgabenList: Aufgaben[];
}
