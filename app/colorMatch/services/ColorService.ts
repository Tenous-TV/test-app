// import { ColorField } from '../types/colorField';
// import { Colors } from '../types/colors';

// export class ColorService {
//     public static instance: ColorService = new ColorService();

//     public color: Colors = 0;

//     public rounds: number = 1;

//     public readonly colorFields: ColorField[] = [];

//     public generateNewColor(): Colors {
//         const colorNumber = Math.floor(Math.random() * 7 + 0.9);
//         return colorNumber;
//     }

//     public handleClick(color: Colors): void {
//         const isSameColor: boolean = this.color === color;

//         if(isSameColor) {
//             this.rounds++;
//             this.startNewRound();
//         }
//     }

//     public startGame(): void {
//         this.rounds = 1;
//         this.startNewRound();
//     }

//     public startNewRound(): void {
//         this.color = this.generateNewColor();

//         const fieldCount: number = (this.rounds * 2 > 8)? 8 : this.rounds * 2;

//         this.fillGrid(fieldCount);
//     }

//     public fillGrid(fieldCount: number): void {
//         //Add all available colors to an array then remove the color to find
//         const colors: Colors[] = [];
//         for(let i: number = 0; i < 8; i++) {
//             colors[i] = i;
//         }
//         colors.splice(colors.indexOf(this.color), 1);

//         //Add color field for the color the player must find
//         const colorFieldToFind: ColorField = new ColorField();
//         colorFieldToFind.color = this.color;
//         this.colorFields[0] = colorFieldToFind;

//         //Add random color from the remaining colors then remove it
//         for(let i: number = 1; i < fieldCount; i++){
//             const indexToAdd: number = Math.floor(Math.random() * (colors.length - 0.1));

//             const colorFieldToAdd: ColorField = new ColorField();
//             colorFieldToAdd.color = colors[indexToAdd];
//             this.colorFields[i] = colorFieldToAdd;

//             colors.splice(indexToAdd, 1);
//         }

//         this.shuffleArray<ColorField>(this.colorFields);
//     }

//     public static reload() {
//         ColorService.instance = new ColorService();
//     }

//     private shuffleArray<T>(array: T[]): void {
//         for(let i: number = array.length - 1; i >= 0; i--) {
//             let index: number = Math.floor(Math.random() * (i + 0.99));

//             let element: T = array[index];

//             array[index] = array[i];
//             array[i] = element;
//         }
//     }
// }