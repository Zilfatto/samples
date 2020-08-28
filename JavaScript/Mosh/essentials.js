// Objects
const person = {
    name: 'John',
    // Befire ES6
    walk: function() {
        console.log(this);
    },
    // After
    talk() {
        console.log(this);
    }
};
// The same
person.walk();
person.talk();
const targetMember = 'name';
// If property is known
person.name = 'Elizabeth';
// Otherwise
person[targetMember] = 'Kate';


// This keyword. Almost always return an object in which it is placed
// Will return person Object
person.walk();
const walk = person.walk;
// Will return - a window object or in a strict mode - undefined
walk();


// Binding this. Make this always return referrence to an person object
const walk = person.walk.bind(person);
// In this case in will return a refference to a person object
walk();


// Arrow function
const square = function(number) {
    return number * number;
}
const square = number => number * number;
// Very useful in this case. It is perfect opportunity
const jobs = [
    { id: 1, isActive: true },
    { id: 2, isActive: false },
    { id: 3, isActive: true }
];
const activeJobs = jobs.filter(function(job) { return job.isActive; });
const activeJobs = jobs.filter(job => job.isActive);


// Arrow function and this keyword
const human = {
    talk() {
        setTimeout(function() {
            console.log('this', this);
        }, 1000);
    }
};
// Will show a window object
human.talk();
// Old style changes
const human = {
    talk() {
        var self = this;
        setTimeout(function() {
            console.log('self', self);
        }, 1000);
    }
};
// With arrow function. It does not rebind this
const human = {
    talk() {
        setTimeout(() => {
            console.log('this', this);
        }, 1000);
    }
};


// Array method map()
const colours = ['red', 'green', 'blue'];
// transform every element and return a new array
const items = colours.map(colour => `<li>${colour}</li>`);


// Object destructuring
const address = {
    street: '',
    city: '',
    country: ''
};
// Old version
const street = address.street;
const city = address.city;
const country = address.country;
// Modern version. It extracts values from specified properties and put them into variables
const { street, city, country } = address;
// Putting into variables with other names
const { street: st, country: ct } = address;


// Spread operator
const first = [1, 2, 3];
const second = [4, 5, 6];
// Old
const combined = first.concat(second);
// New
const combined = [...first, ...second];
const combined = [...first, 'a', ...second, 'b'];
// Cloning
const clone = [...first];
// With objects
const one = { name: 'Mosh' };
const two = { job: 'Instructor' };
// Combining
const combined = { ...one, ...two, location: 'Australia' };
// Cloning
const clone = { ...one };
