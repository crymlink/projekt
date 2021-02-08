import { Aufgaben } from "./aufgaben.interface";
import { Ergebnis } from "./ergebnis.interface";
import { Gruppe } from "./gruppe.interface";
import { Hinweise } from "./hinweise.interface";
import { Schueler } from "./schueler.interface";
import { Teilaufgaben } from "./teilaufgaben.interface";
import { Themen } from "./themen.interface";

export interface Datenbank {
  _id?: string;
  session_id?: string;
  schuelerList?: Schueler[];
  gruppenList?: Gruppe[];
  aufgabenList?: Aufgaben[];
  teilAufgabenList?: Teilaufgaben[];
  ergebnisList?: Ergebnis[];
  hinweisList?: Hinweise[];
  themenList?: Themen[];
  adminPW?: string;
}
