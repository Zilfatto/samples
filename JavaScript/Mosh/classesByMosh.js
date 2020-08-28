class Person {
    constructor(name) {
        this.name = name;
    }

    walk() {
        console.log('I\'m walking');
    }
}
const person1 = new Person('Mike');


// Inheritance
class Teacher extends Person {
    constructor(name, degree) {
        super(name);
        this.degree = degree;
    } 

    teach() {
        console.log('I\'m teaching')
    }
}
const teacher1 = new Teacher('Dave', 'MSc');