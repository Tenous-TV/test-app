import { Colors } from "./colors";

export class ColorField {
    public color: Colors = Colors.blue;

    constructor() {
    }

    public displayColor(): string {
        return Colors[this.color];
    }
}