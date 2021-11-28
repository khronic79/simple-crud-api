const { v4: uuidv4 } = require('uuid');
const db = require('../db/db');

async function getAllPersons() {
    const persons = [];
    db.forEach((person) => {
        persons.push(person);
    });
    return Promise.resolve(persons);
}

async function getPerson(personId) {
    const check = db.has(personId);
    if (!check) return Promise.resolve(null);
    const person = db.get(personId);
    return Promise.resolve(person);
}

async function createPerson(newPerson) {
    const check = newPerson.name && newPerson.age && newPerson.hobbies;
    if (!check) return Promise.resolve(null);
    if (!Array.isArray(newPerson.hobbies)) return Promise.resolve(null);
    const id = uuidv4();
    const person = {
        id,
        ...newPerson
    };
    db.set(id, person);
    return Promise.resolve(person);
}

async function updatePerson(person) {
    const check = db.has(person.id);
    if (!check) return Promise.resolve(null);
    if (person.hobbies) {
        if (!Array.isArray(person.hobbies)) return Promise.resolve(null);
    }
    const current = db.get(person.id);
    const newPerson = {
        id: person.id,
        name: person.name? person.name: current.name,
        age: person.age? person.age: current.age,
        hobbies: person.hobbies? person.hobbies: current.hobbies
    }
    db.set(person.id, newPerson);
    return Promise.resolve(newPerson);
}

async function deletePerson(personId) {
    const check = db.has(personId);
    if (!check) return Promise.resolve(null);
    const person = db.get(personId);
    db.delete(personId);
    return Promise.resolve(person);
}

module.exports = {
    getAllPersons,
    getPerson,
    createPerson,
    updatePerson,
    deletePerson
}