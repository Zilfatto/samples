""" Object prototypes """

function Person(first, last, age, gender, interests) {
    this.name = {
        'first': first,
        'last': last
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
let person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);
// If you type "person1." into your JavaScript console, you should see the browser
// try to auto-complete this with the member names available on this object:

// Cheking out existing prototype properties. The output won't show you very much because
// we haven't defined anything on our custom constructor's prototype! By default, a constructor's prototype always starts empty
Person.prototype;
// You'll see a large number of methods defined on Object's prototype property
Object.prototype;

// You'll see other examples of prototype chain inheritance all over JavaScript — try looking for the methods
// and properties defined on the prototype of the String, Date, Number, and Array global objects, for example.
// These all have a number of members defined on their prototype, which is why for example when you create a string, like this:
let myString = 'This is my string.';
// myString immediately has a number of useful methods available on it, like split(), indexOf(), replace(), etc

// Earlier on we showed how the Object.create() method can be used to create a new object instance.
let person2 = Object.create(person1);
// What create() actually does is to create a new object from a specified prototype object. Here, person2 is being created using person1 as a prototype object
person2.__proto__;
// This will return person1 object

// Every constructor function has a prototype property whose value is an object containing a constructor property. This constructor property points to the original constructor function
// properties defined on the Person.prototype property (or in general on a constructor function's prototype property, which is an object, as mentioned in the above section)
// become available to all the instance objects created using the Person() constructor. Hence, the constructor property is also available to both person1 and person2 objects.
person1.constructor;
person2.constructor;

let person3 = new person1.constructor('Karen', 'Stephenson', 26, 'female', ['playing drums', 'mountain climbing']);
person3.name.first;
person3.age;
person3.bio();

// if you have an object instance and you want to return the name of the constructor it is an instance of
instanceName.constuctor.name;
person1.constructor.name;
// The value of constructor.name can change (due to prototypical inheritance, binding, preprocessors, transpilers, etc.).
// Therefore, for more complex examples, you'll want to use the instanceof operator instead.

// Modifying prototypes
Person.prototype.farewell = function() {
    alert(`${this.name.first} + has left the building. Bye for now!`);
};
person1.farewell();

// You will rarely see properties defined on the prototype property, because they are not very flexible when defined like this
Person.prototype.fullname = 'Bob Smith';
// This is not vary flexible, as the person might not be called that. It will be better to build it out of name.first and name.last
Person.prototype.fullname = `${this.name.first} ${this.name.last}`;
// However, this doesn't work. That's because "this" will be referencing the global scope

// In fact, a fairly common pattern for more object definitions is to define the properties inside the constructor, and the methods on the prototype.
function Test(a, b, c, d) {
    // properties definitions
}
// First method definition
Test.prototype.x = function() {};
// Second method
Test.prototype.y = function() {};