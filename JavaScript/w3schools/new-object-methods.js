// ES5 New Object Methods

// Adding ot changing an object property
Object.defineProperty(object, property, descriptor);

// Adding or changing many object properties
Object.defineProperties(object, descriptors);

// Accessing Properties
Object.getOwnPropertyDescriptor(object, property);

// Returns all properties as an array
Object.getOwnPropertyNames(object);

// Returns enumerable properies as an array
Object.keys(object);

// Accessing the prototype
Object.getPrototypeOf(object);

// Prevents adding properties to an object
Object.preventExtensions(object);
// Returns true if properties can be added to an object
Object.isExtensible(object);

// Prevents changes of object properties (not values)
Object.seal(object);
// Returns true if object is sealed
Object.isSealed(object);

// Prevents any changes to an object
Object.freeze(object);
// Returns true if object is frozen
Object.isFrozen(object);



// Changing a property value
Object.defineProperty(object, property, { value : myvalue });

let person = {
  first: 'John',
  last: 'Doe',
  language: 'EN'
};

Object.defineProperty(person, 'language', {value: 'NO'});


// Changing meta data
writable: true      // Property value can be changed
enumarable: true    // Property can be enumerated
configurable: true  // Property can be reconfigured

writable: false     // Property value can not be changed
enumerable: false   // Property can not be enumerable
configurable: false // Property can not be reconfigured

// This example makes language read-only:
Object.defineProperty(person, 'language'm {writable: false});
// This example makes language not enumerable
Object.defineProperty(person, 'language', {enumerable: false});

// ###
// Listing all properties
let person = {
  firstName: "John",
  lastName : "Doe"
  language : "EN"
};
Object.defineProperty(person, 'language', {enumerable: false});
Object.getOwnPropertyNames(person); // Returns an array of properties

// ###
// Listing Enumerable Properties
Object.defineProperty(person, 'language', {enumerable: false});
Object.keys(person); // Returns an array of enumerable properties

// ###
// Adding a Property
Object.defineProperty(person, 'year', {value: 2008});

// ###
// Adding Getters and Setters
Object.defineProperty(person, 'fullname', {
  get: function() {return `${this.firstName} ${this.lastName}`;}
});