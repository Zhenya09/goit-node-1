const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("./db", "contacts.json");

function parseContacts(data) {
  return JSON.parse(data.toString());
}

function listContacts() {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = parseContacts(data);
      return contacts.sort((a, b) => a.name.localeCompare(b.name));
    })
    .then((sortedContacts) => {
      console.table(sortedContacts);
    })
    .catch((error) => console.log(error.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = parseContacts(data);
      const contact = contacts.find((contact) => contact.id === contactId);
      if (contact) {
        console.table(contact);
      } else {
        console.log(`Contact with the id ${contactId} not found.`);
      }
    })
    .catch((error) => console.log(error.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = parseContacts(data);
      const updatedContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      fs.writeFile(contactsPath, JSON.stringify(updatedContacts), (error) => {
        if (error) {
          console.log(error.message);
          return;
        }
        console.log(`Contact with the id ${contactId} has been removed.`);
      });
    })
    .catch((error) => console.log(error.message));
}

function addContact(name, email, phone) {
  const contact = {
    id: String(Math.floor(Math.random() * 100000)),
    name,
    email,
    phone,
  };

  if (!name || !email || !phone) {
    console.log("Please provide all the contact details.");
    return;
  }

  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = parseContacts(data);
      contacts.push(contact);
      fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
        if (error) {
          console.log(error.message);
          return;
        }
        console.log(`${name} has been added to your contacts.`);
      });
    })
    .catch((error) => console.log(error.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
