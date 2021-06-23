import { utilService } from '../../../services/utils-service.js'
import { storageService } from "../../../services/async-storage-service.js"

const NOTES_KEY = 'notes'

export const keepService = {
    query,
    get,
    post,
    postMany,
    remove,
    save,
    getById,
    createNote,
    createSimpleNote,
    createFirstNotes
}

function query() {
    return storageService.query(NOTES_KEY)
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function post(note) {
    return storageService.post(NOTES_KEY, note)
}

function postMany(mails) {
    return storageService.postMany(NOTES_KEY, mails)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTES_KEY, note)
    } else {
        return storageService.post(NOTES_KEY, note)
    }
}

function getById(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function createNote(type, isPinned, info) {
    return {
        type,
        isPinned,
        info
    }
}

function createSimpleNote() {
    return {
        type: "NoteTxt",
        isPinned: true,
        info: {
            title: "My Note Title",
            txt: "Fullstack Me Baby!"
        }
    }

}

function createFirstNotes() {
    const notes = []
    for (let i = 0; i < 4; i++) {
        notes.push(createSimpleNote())
    }

    return notes
}

// function getEmptyBook() {
//     return {
//         id: '',
//         vendor: '',
//         maxSpeed: 0
//     };
// }