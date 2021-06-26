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
    getByFilter,
    // getBySearch,
    createNote,
    createSimpleNote,
    createFirstNotes,
    toggleIsDone,
    togglePinNode,
    getNotesToShow
}

function query() {
    return storageService.query(NOTES_KEY)
        .then(res => {
            // console.log('res :>> ', res);
            if (res.length) {
                return res
            } else {
                console.log('here :>> ');
                return postMany(createFirstNotes())
                    .then(res => {
                        // console.log('res :>> ', res);
                        return res
                    })
            }
        })
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

function togglePinNode(note) {

    note.isPinned = !note.isPinned

    return save(note)
        .then(() => {
            return query()
        })
}

function getById(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function getByFilter(filterBy) {
    return query()
        .then(notes => {
            return notes.filter(note => {
                return note.categories.includes(filterBy)
            })
        })
}

// function getBySearch(notes, searchWord) {
//     return notes.filter(note => {
//         return note.info.txt.some(line=>).toLowerCase().includes(searchWord) //||
//             // note.subject.toLowerCase().includes(searchWord) ||
//             // note.to.toLowerCase().includes(searchWord)
//     })
// }

function createNote(type, isPinned, info) {
    return {
        type,
        isPinned,
        info
    }
}

function createSimpleNote() {
    return {
        id: utilService.makeId(),
        type: 'noteTxt',
        isPinned: false,
        info: {
            title: 'My Note',
            txt: 'My fullstack baby',
            todos: [],
            imgUrl: '',
            videoUrl: ''
        },
        categories: ['notes', 'general:color'],
        bgc: '#ffff88'
    }

}

function createFirstNotes() {
    const notes = []
    for (let i = 0; i < 4; i++) {
        notes.push(createSimpleNote())
    }

    return notes
}

function toggleIsDone({ noteId, todoIdx }) {
    return query()
        .then(res => {
            const note = res.find(note => (note.id === noteId))
            note.info.todos[todoIdx].isDone = !(note.info.todos[todoIdx].isDone)
            save(note)
            return res
        })
}

function getNotesToShow(notes, searchStr, filterStr) {
    searchStr = searchStr.toLowerCase()
    filterStr = filterStr.toLowerCase()
    return notes.filter(note => {
        return (note.info.title.toLowerCase().includes(searchStr) ||
                note.info.txt.toLowerCase().includes(searchStr) ||
                note.info.todos.some(todo => todo.txt.toLowerCase().includes(searchStr))) &&
            (note.categories.some(category => category.toLowerCase().includes(filterStr)))
    })
}