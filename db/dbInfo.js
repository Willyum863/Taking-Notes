const fs = require("fs");
const util = require("util");
const uuidv1 = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DbInfo {
    read(){
        return readFileAsync("db/db.json","utf8");
    }
    write(note){
        return writeFileAsync("db/db.json",JSON.stringify(note));
    }
    getNotes(){
        return this.read().then((notes) => {
            let notesArr;
            try {
                notesArr = [].concat(JSON.parse(notes));
            } 
            catch (err) {
                notesArr = [];
            }
            return notesArr;
        });
    }
    addNote(note){
        const { title,text } = note;
        if (!title || !text) {
            throw new Error("Must enter a title and a text");
        }
        const newNote = {
            title, text, id: uuidv1()
        };
        return this.getNotes()
        .then((notes) => [...notes,newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
    }
    // Bonus Delete goes here
}
module.exports = new DbInfo();