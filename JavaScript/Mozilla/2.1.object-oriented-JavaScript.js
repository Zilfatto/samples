""" Object-oriented programming """

// Define a person with a normal function
function createNewPerson(name) {
    const obj = {};
    obj.name = name;
    obj.greeting = function() {
        alert('Hi! I\'m ' + obj.name + '.');
    };
    return obj;
}
const salva = createNewPerson('Salva');
salva.name;
salva.greeting();
// New version of a function. Constructor function
function Person(name) {
    this.name = name;
    this.greeting = function() {
        alert('Hi! I\'m ' + this.name + '.');
    };
}
let person1 = new Person('Bob');
let person2 = new Person('Sarah');
person1.name;
person1.greeting();
person2.name;
person2.greeting();
// After the new objects have been created, the person1 and person2
// variables contain the following objects:
{
    name: 'Bob',
    greeting: function() {
        alert('Hi! I\'m ' + this.name + '.');
    }
}
{
    name: 'Sarah',
    greeting: function() {
        alert('Hi! I\'m ' + this.name + '.');
    }
}
// Finished constructor
function Person(first, last, age, gender, interests) {
    this.name = {
        first: first,
        last: last
    }
    this.age = age;
    this.gender = gender;
    this.interests = interests;
    this.bio = function() {
        let string = this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old.',
            pronoun,
            interestLen = interests.length;
        if (/^(?=(m|male)$)/i.test(this.gender)) {
            pronoun = 'He likes';
        } else if (/^(?=(f|female)$)/i.test(this.gender)) {
            pronoun = 'She likes';
        } else {
            pronoun = 'They like';
        }
        string += pronoun;

        if (interestLen === 1) {
            string += this.interests[0] + '.';
        } else if (interestLen === 2) {
            string += this.interests[0] + ' and ' + this.interests[1] + '.';
        } else {
            for (let i = 0; i < interestLen; i++) {
                if (i === interestLen - 1) {
                    string += 'and ' + this.interests[i] + '.';
                } else {
                    string += this.interests[i] + ', ';
                }
            }
        }
        alert(string);
    };
    this.greeting = function() {
        alert('Hi! I\'m ' + this.name.first + '.');
    };
}
let person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing', 'kickboxing']);
person1['age'];
person1.interests[1];
person1.bio();
// etc.

// Other ways to create object instances
let person1 = new Object();
person1.name = 'Chris';
person1['age'] = 38;
person1.greeting = function() {
    alert('Hi! I\'m ' + this.name + '.');
};
let person1 = new Object({
    name: 'Chris',
    age: 38,
    greeting: function() {
        alert('Hi! I\'m ' + this.name + '.');
    }
});

// Using the create() method
let person2 = Object.create(person1);
person2.name;
person2.greeting();
// person2 has been created based on person1—it has the same properties and method available to it.