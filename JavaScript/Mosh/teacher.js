import { Person } from './person';

// Without 'export' it will nor be visible by named importing
export function promote() {}

export default class Teacher extends Person {
    constructor(name, degree) {
        super(name);
        this.degree = degree;
    } 

    teach() {
        console.log('I\'m teaching')
    }
}