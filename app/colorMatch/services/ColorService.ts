import { ColorField } from '../types/colorField';
import { Colors } from '../types/colors';

export class ColorService {
    public static instance: ColorService = new ColorService();

    public color: Colors = this.generateNewColor();

    public rounds: number = 1;

    public readonly colorFields: ColorField[] = [];

    public generateNewColor(): Colors {
        const colorNumber = Math.floor(Math.random() * ((this.rounds * 2 > 8)? 8 : this.rounds * 2 + 0.9));
        return colorNumber;
    }

    public handleClick(color: Colors): void {
        const isSameColor = this.color === color;

        if(isSameColor)
            this.rounds++;
    }

    public startNewRound() {
        this.color = this.generateNewColor();

        const fieldCount: number = (this.rounds * 2 > 8)? 8 : this.rounds * 2;

        for(let i: number = 0; i < fieldCount; i++){
            const colorField: ColorField = new ColorField();
            colorField.color = i;
            this.colorFields[i] = colorField;
        }
    }
}