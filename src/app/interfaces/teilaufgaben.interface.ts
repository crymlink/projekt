import { Ergebnis } from "./ergebnis.interface";
export interface Teilaufgaben {
  _id?: string;
  name: string;
  text?: string;
  ergebnis?: Ergebnis;
  typ?: string;
}
