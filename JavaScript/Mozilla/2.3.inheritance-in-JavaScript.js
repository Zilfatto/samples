""" Inheritance in JavaScript """

// Creating an object in JS that inherits from another object
function Person(first, last, age, gender, interests) {
    this.name = {
        first: first,
        last: last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
}
Person.prototype.bio = function() {
    let string = `${this.name.first} ${this.name.last} is ${this.age} years old.`,
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
                string += `and ${this.interests[i]} .`;
            } else {
                string += `${this.interests[i]} ,`;
            }
        }
    }
    alert(string);
};
Person.prototype.greeting = function() {
    alert(`Hi! I'm ${this.name.first} .`);
};
Person.prototype.farewell = function() {
    alert(`${this.name.first} has left the building. Bye for now!`);
};

// Defining a Teacher() constructor function
function Teacher(first, last, age, gender, interests, subject) {
    Person.call(this, first, last, age, gender, interests);
    this.subject = subject;
}
// the call() function. This function basically allows you to call a function defined somewhere else,
// but in the current context. The first parameter specifies the value of this that you want to use
// when running the function, and the other parameters are those that should be passed to the function when it is invoked

// As a note, we could have simply done this:
function Teacher(first, last, age, gender, interests, subject) {
    this.name = {
        first: first,
        last: last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
    this.subject = subject;
}
// But this is just redefining the properties anew, not inheriting them from Person(),
// so it defeats the point of what we are trying to do. It also takes more lines of code


// Inheriting from a constructor with no parameters
function Brick() {
    this.width = 10;
    this.height = 20;
}
// Inherit the width and height properties
function BlueGlassBrick() {
    Brick.call(this);
    this.opacity = 0.5;
    this.colour = 'blue';
}


// Setting Teacher()'s prototype and constructor reference

// All is good so far, but we have a problem. We have defined a new constructor,
// and it has a prototype property, which by default just contains an object with a reference to
// the constructor function itself. It does not contain the methods of the Person constructor's prototype property

// To see this, enter Object.getOwnPropertyNames(Teacher.prototype) into either the text input field or your JavaScript console.
// Then enter it again, replacing Teacher with Person. Nor does the new constructor inherit those methods. To see this, compare the outputs of
// Person.prototype.greeting and Teacher.prototype.greeting. We need to get Teacher() to inherit the methods defined on Person()'s prototype.
Teacher.prototype = Object.create(Person.protytype);
// Here our friend create() comes to the rescue again. In this case we are using it to create a new object and make it the value of Teacher.prototype.
// The new object has Person.prototype as its prototype and will therefore inherit, if and when needed, all the methods available on Person.prototype.

// We need to do one more thing before we move on. After adding the last line, Teacher.prototype's constructor property is now equal to Person(),
// because we just set Teacher.prototype to reference an object that inherits its properties from Person.prototype! Try saving your code,
// loading the page in a browser, and entering Teacher.prototype.constructor into the console to verify.

// This can become a problem, so we need to set this right.
Object.defineProperty(Teacher.prototype, 'constructor', {
    value: Teacher,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true
});
// Or just
Teacher.prototype.constructor = Teacher;
// entering Teacher.prototype.constructor should return Teacher(), as desired, plus we are now inheriting from Person()!


// Giving Teacher() a new greeting() function
Teacher.prototype.greeting = function() {
    let prefix;
    if (/^(?=(m|male)$)/i.test(this.gender)) {
        prefix = 'Mr.';
    } else if (/^(?=(f|female)$)/i.test(this.gender)) {
        prefix = 'Ms.';
    } else {
        prefix = 'Mx.';
    }
    alert(`Hello. My name is ${prefix} ${this.name.last}, and I teach ${this.subject}.`);
}

// Trying the example out
let teacher1 = new Teacher('Dave', 'Griffiths', 31, 'male', ['football', 'cookery'], 'mathematics');
teacher1.name.first;
teacher1.interests[0];
teacher1.bio();
teacher1.subject;
teacher1.greeting();
teacher1.farewell();
// These should all work just fine. The queries on lines 1, 2, 3, and 6 access members inherited from
// the generic Person() constructor (class). The query on line 4 accesses a member that is available only on
// the more specialized Teacher() constructor (class). The query on line 5 would have accessed a member inherited from Person(),
// except for the fact that Teacher() has its own member with the same name, so the query accesses that member.

// Student class!

function Student(first, last, age, gender, interests) {
    Person.call(this, first, last, age, gender, interests);
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.greeting = function() {
    alert(`Yo! I'm ${this.name.first}.`);
};
let student = new Student('Liz', 'Sheppard', 17, 'female', ['ninjitsu', 'air cadets']);


// Object member summary
// To summarize, you've got four types of property/method to worry about:

// 1. Those defined inside a constructor function that are given to object instances.
// These are fairly easy to spot — in your own custom code, they are the members defined inside a constructor using
// the this.x = x type lines; in built in browser code, they are the members only available to object instances
// (usually created by calling a constructor using the new keyword, e.g. let myInstance = new myConstructor()).

// 2. Those defined directly on the constructor themselves, that are available only on the constructor.
// These are commonly only available on built-in browser objects, and are recognized by being chained directly
// onto a constructor, not an instance. For example, Object.keys(). These are also known as static properties/methods.

// 3. Those defined on a constructor's prototype, which are inherited by all instances and inheriting object classes.
// These include any member defined on a Constructor's prototype property, e.g. myConstructor.prototype.x().

// 4. Those available on an object instance, which can either be an object created when a constructor is instantiated
// like we saw above (so for example var teacher1 = new Teacher( name = 'Chris' ); and then teacher1.name),
// or an object literal (let teacher1 = { name = 'Chris' } and then teacher1.name).



// ECMAScript 2015 Classes
class Person {
    constructor(first, last, age, gender, interests) {
        this.name = {
            first,
            last
        };
        this.age = age;
        this.gender = gender;
        this.interests = intersts;
    }
    greeting() {
        console.log(`Hi! I'm ${this.name.first}`)
    }
    farewell() {
        console.log(`${this.name.first} has left the building. Bye for now!`);
    }
}

let han = new Person('Han', 'Solo', 25, 'male', ['Smuggling']);
han.greeting();
// Hi! I'm Han

let leia = new Person('Leia', 'Organa', 19, 'female', ['Government']);
leia.farewell();
// Leia has left the building. Bye for now

// Under the hood, your classes are being converted into Prototypal Inheritance models — this is just syntactic sugar. But I'm sure you'll agree that it's easier to write.


// Inheritance with class syntax
class Teacher extends Person {
    constructor(first, last, age, gender, interests, subjcet, grade) {
        super(first, last, age, gender, intersts);
        this.subject = subject;
        this.grade = grade;
    }
}

let snape = new Teacher('Severus', 'Snape', 58, 'male', ['Potions'], 'Dark arts', 5);
snape.greeting(); // Hi! I'm Severus.
snape.farewell(); // Severus has left the building. Bye for now.
snape.age // 58
snape.subject; // Dark arts


// Getters and Setters

// There may be times when we want to change the values of an attribute in the classes we create
// or we don't know what the final value of an attribute will be. Using the Teacher example,
// we may not know what subject the teacher will teach before we create them, or their subject may change between terms.
// We can handle such situations with getters and setters.
// Let's enhance the Teacher class with getters and setters. 

class Teacher extends Person {
    constructor(first, last, age, gender, interests, subject, grade) {
        super(first, last, age, gender, interests);
        // subject and grade are specific to Teacher
        this._subject = subject;
        this.grade = grade;
    }
    get subject() {
        return this._subject;
    }
    set subject(newSubject) {
        this._subject = newSubject;
    }
}
// In our class above we have a getter and setter for the subject property. We use _ to create a separate value in which to store
// our name property. Without using this convention, we would get errors every time we called get or set. At this point:

// To show the current value of the _subject property of the snape object we can use the snape.subject getter method.
// To assign a new value to the _subject property we can use the snape.subject="new value" setter method.
// Check the default value
console.log(snape.subject) // Returns "Dark arts"
snape.subject = "Balloon animals"; // Set _subject to "Balloon animals"
// Check it again and see if it matches the new value
console.log(snape.subject) // Returns "Balloon animals"