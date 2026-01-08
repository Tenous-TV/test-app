import { ColorService } from "../services/ColorService";
import { Colors } from "./colors";

export class ColorField {
    public color: Colors = Colors.blue;

    constructor() {
    }

    public onClick(): void {
        ColorService.instance.handleClick(this.color);
    }
}