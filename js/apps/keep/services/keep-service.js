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
    createFirstNotes,
    toggleIsDone,
    togglePinNode,
    getNotesToShow
}

function query() {
    return storageService.query(NOTES_KEY)
        .then(res => {
            if (res.length) {
                return res
            } else {
                return postMany(createFirstNotes())
                    .then(res => {
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
    const notes = [{
            "id": "yq6ao",
            "type": "noteVideo",
            "isPinned": false,
            "info": {
                "title": "",
                "txt": "",
                "todos": [],
                "imgUrl": "",
                "videoUrl": "7zhga7DLloI"
            },
            "categories": [
                "videos",
                "media",
                "general:color"
            ],
            "bgc": "#ffff88"
        },
        {
            "id": "MZp2QUQYNL",
            "type": "noteTodos",
            "isPinned": true,
            "info": {
                "title": "My Note",
                "txt": "My fullstack baby",
                "todos": [{
                        "txt": "Buy running shoes",
                        "isDone": false
                    },
                    {
                        "txt": "Clean grill",
                        "isDone": true
                    },
                    {
                        "txt": "Change T-shirt",
                        "isDone": false
                    }
                ],
                "imgUrl": "",
                "videoUrl": ""
            },
            "categories": [
                "notes",
                "todos",
                "cars:color"
            ],
            "bgc": "rgb(255, 204, 136)"
        },
        {
            "id": "rv9HfqhetE",
            "type": "noteTxt",
            "isPinned": true,
            "info": {
                "title": "My Note",
                "txt": "My fullstack baby",
                "todos": [],
                "imgUrl": "",
                "videoUrl": ""
            },
            "categories": [
                "notes",
                "general:color"
            ],
            "bgc": "#ffff88"
        },
        {
            "id": "DwTbAE9Luh",
            "type": "noteImg",
            "isPinned": true,
            "info": {
                "title": "",
                "txt": "",
                "todos": [],
                "imgUrl": "data:image/png;base64,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",
                "videoUrl": ""
            },
            "categories": [
                "images",
                "media",
                "work:color"
            ],
            "bgc": "rgb(255, 136, 136)"
        },
        {
            "id": "yHje3U2e5G",
            "type": "noteTodos",
            "isPinned": false,
            "info": {
                "title": "Shopping friday",
                "txt": "",
                "todos": [{
                        "txt": "LOUIS VUITTON shoes",
                        "isDone": false
                    },
                    {
                        "txt": "Full Stack Course",
                        "isDone": false
                    },
                    {
                        "txt": "Developer Paycheck",
                        "isDone": false
                    },
                    {
                        "txt": "Self Confidence",
                        "isDone": true
                    }
                ],
                "imgUrl": "",
                "videoUrl": ""
            },
            "categories": [
                "notes",
                "todos",
                "cars:color"
            ],
            "bgc": "rgb(255, 204, 136)"
        },
        {
            "id": "UpkZGv3xdK",
            "type": "noteTxt",
            "isPinned": true,
            "info": {
                "title": "Poem",
                "txt": "Roses are red, Violets are blue, I love JS BUT hate Vue too!",
                "todos": [],
                "imgUrl": "",
                "videoUrl": ""
            },
            "categories": [
                "notes",
                "insurance:color"
            ],
            "bgc": "rgb(204, 255, 153)"
        },
        {
            "id": "7HsUFm8iGp",
            "type": "noteTxt",
            "isPinned": false,
            "info": {
                "title": "My Note",
                "txt": "My fullstack baby",
                "todos": [],
                "imgUrl": "",
                "videoUrl": ""
            },
            "categories": [
                "notes",
                "work:color"
            ],
            "bgc": "rgb(255, 136, 136)"
        },
        {
            "id": "1TAlCHfvOW",
            "type": "noteTxt",
            "isPinned": false,
            "info": {
                "title": "My Note",
                "txt": "My fullstack baby",
                "todos": [],
                "imgUrl": "",
                "videoUrl": ""
            },
            "categories": [
                "notes",
                "general:color"
            ],
            "bgc": "#ffff88"
        },
        {
            "id": "VwaDwfzXqE",
            "type": "noteTxt",
            "isPinned": false,
            "info": {
                "title": "My Note",
                "txt": "My fullstack baby",
                "todos": [],
                "imgUrl": "",
                "videoUrl": ""
            },
            "categories": [
                "notes",
                "family:color"
            ],
            "bgc": "rgb(136, 187, 255)"
        },
        {
            "id": "IgdzSP4Bfv",
            "type": "noteTxt",
            "isPinned": false,
            "info": {
                "title": "My Note",
                "txt": "My fullstack baby",
                "todos": [],
                "imgUrl": "",
                "videoUrl": ""
            },
            "categories": [
                "notes",
                "diet:color"
            ],
            "bgc": "rgb(255, 255, 255)"
        }
    ]

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
    if (filterStr === 'all') return notes
    return notes.filter(note => {
        return (note.info.title.toLowerCase().includes(searchStr) ||
                note.info.txt.toLowerCase().includes(searchStr) ||
                note.info.todos.some(todo => todo.txt.toLowerCase().includes(searchStr))) &&
            (note.categories.some(category => category.toLowerCase().includes(filterStr)))
    })
}

// {
//     id: utilService.makeId(),
//     type: 'noteTxt',
//     isPinned: true,
//     info: {
//         title: 'My Note',
//         txt: 'My fullstack baby',
//         todos: [],
//         imgUrl: '',
//         videoUrl: ''
//     },
//     categories: ['notes', 'general:color'],
//     bgc: '#ffff88'
// },{
//     id: utilService.makeId(),
//     type: 'noteTodos',
//     isPinned: true,
//     info: {
//         title: 'My Note',
//         txt: 'My fullstack baby',
//         todos: [{txt:'Buy running shoes', isDone: false},{txt:'Clean grill', isDone: true},{txt:'Change T-shirt', isDone: false}],
//         imgUrl: '',
//         videoUrl: ''
//     },
//     categories: ['notes','todos', 'general:color'],
//     bgc: '#ffff88'
// },{
//     id: utilService.makeId(),
//     type: 'noteImg',
//     isPinned: true,
//     info: {
//         title: '',
//         txt: '',
//         todos: [],
//         imgUrl: 'data:image/png;base64,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',
//         videoUrl: ''
//     },
//     categories: ['images','media', 'general:color'],
//     bgc: '#ffff88'
// },{
//     id: utilService.makeId(),
//     type: 'noteTxt',
//     isPinned: false,
//     info: {
//         title: 'My Note',
//         txt: 'My fullstack baby',
//         todos: [],
//         imgUrl: '',
//         videoUrl: ''
//     },
//     categories: ['notes', 'general:color'],
//     bgc: '#ffff88'
// },{
//     id: utilService.makeId(),
//     type: 'noteTxt',
//     isPinned: false,
//     info: {
//         title: 'My Note',
//         txt: 'My fullstack baby',
//         todos: [],
//         imgUrl: '',
//         videoUrl: ''
//     },
//     categories: ['notes', 'general:color'],
//     bgc: '#ffff88'
// },{
//     id: utilService.makeId(),
//     type: 'noteTxt',
//     isPinned: false,
//     info: {
//         title: 'My Note',
//         txt: 'My fullstack baby',
//         todos: [],
//         imgUrl: '',
//         videoUrl: ''
//     },
//     categories: ['notes', 'general:color'],
//     bgc: '#ffff88'
// },{
//     id: utilService.makeId(),
//     type: 'noteTxt',
//     isPinned: false,
//     info: {
//         title: 'My Note',
//         txt: 'My fullstack baby',
//         todos: [],
//         imgUrl: '',
//         videoUrl: ''
//     },
//     categories: ['notes', 'general:color'],
//     bgc: '#ffff88'
// },{
//     id: utilService.makeId(),
//     type: 'noteVideo',
//     isPinned: false,
//     info: {
//         title: 'Dead.',
//         txt: 'My fullstack baby',
//         todos: [],
//         imgUrl: '',
//         videoUrl: 'https://www.youtube.com/watch?v=4zWpx-qcnp4'
//     },
//     categories: ['videos' ,'media', 'general:color'],
//     bgc: '#ffff88'
// },{
//     id: utilService.makeId(),
//     type: 'noteTodos',
//     isPinned: false,
//     info: {
//         title: 'Shopping friday',
//         txt: '',
// todos: [
//         { txt: 'LOUIS VUITTON shoes', isDone: false },
//         { txt: 'Full Stack Curse', isDone: false },
//         { txt: 'Developer Paycheck', isDone: false },
//         { txt: 'Self Confidence', isDone: true },
//     ],
//         imgUrl: '',
//         videoUrl: ''
//     },
//     categories: ['notes', 'todos', 'health:color'],
//     bgc: '#ffff88'
// },{
//     id: utilService.makeId(),
//     type: 'noteTxt',
//     isPinned: true,
//     info: {
//         title: 'Poem',
//         txt: 'Roses are red, Violets are blue, I love JS BUT hate Vue too!',
//         todos: [],
//         imgUrl: '',
//         videoUrl: ''
//     },
//     categories: ['notes', 'general:color'],
//     bgc: '#ffff88'
// }

/*
[
    {
        "id": "MZp2QUQYNL",
        "type": "noteTodos",
        "isPinned": true,
        "info": {
            "title": "My Note",
            "txt": "My fullstack baby",
            "todos": [
                {
                    "txt": "Buy running shoes",
                    "isDone": false
                },
                {
                    "txt": "Clean grill",
                    "isDone": true
                },
                {
                    "txt": "Change T-shirt",
                    "isDone": false
                }
            ],
            "imgUrl": "",
            "videoUrl": ""
        },
        "categories": [
            "notes",
            "todos",
            "cars:color"
        ],
        "bgc": "rgb(255, 204, 136)"
    },
    {
        "id": "rv9HfqhetE",
        "type": "noteTxt",
        "isPinned": true,
        "info": {
            "title": "My Note",
            "txt": "My fullstack baby",
            "todos": [],
            "imgUrl": "",
            "videoUrl": ""
        },
        "categories": [
            "notes",
            "general:color"
        ],
        "bgc": "#ffff88"
    },
    {
        "id": "DwTbAE9Luh",
        "type": "noteImg",
        "isPinned": true,
        "info": {
            "title": "",
            "txt": "",
            "todos": [],
            "imgUrl": "data:image/png;base64,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",
            "videoUrl": ""
        },
        "categories": [
            "images",
            "media",
            "work:color"
        ],
        "bgc": "rgb(255, 136, 136)"
    },
    {
        "id": "pWy8uaDAxu",
        "type": "noteVideo",
        "isPinned": false,
        "info": {
            "title": "Dead.",
            "txt": "My fullstack baby",
            "todos": [],
            "imgUrl": "",
            "videoUrl": "https://www.youtube.com/watch?v=4zWpx-qcnp4"
        },
        "categories": [
            "videos",
            "media",
            "general:color"
        ],
        "bgc": "#ffff88"
    },
    {
        "id": "yHje3U2e5G",
        "type": "noteTodos",
        "isPinned": false,
        "info": {
            "title": "Shopping friday",
            "txt": "",
            "todos": [
                {
                    "txt": "LOUIS VUITTON shoes",
                    "isDone": false
                },
                {
                    "txt": "Full Stack Curse",
                    "isDone": false
                },
                {
                    "txt": "Developer Paycheck",
                    "isDone": false
                },
                {
                    "txt": "Self Confidence",
                    "isDone": true
                }
            ],
            "imgUrl": "",
            "videoUrl": ""
        },
        "categories": [
            "notes",
            "todos",
            "cars:color"
        ],
        "bgc": "rgb(255, 204, 136)"
    },
    {
        "id": "UpkZGv3xdK",
        "type": "noteTxt",
        "isPinned": true,
        "info": {
            "title": "Poem",
            "txt": "Roses are red, Violets are blue, I love JS BUT hate Vue too!",
            "todos": [],
            "imgUrl": "",
            "videoUrl": ""
        },
        "categories": [
            "notes",
            "insurance:color"
        ],
        "bgc": "rgb(204, 255, 153)"
    },
    {
        "id": "7HsUFm8iGp",
        "type": "noteTxt",
        "isPinned": false,
        "info": {
            "title": "My Note",
            "txt": "My fullstack baby",
            "todos": [],
            "imgUrl": "",
            "videoUrl": ""
        },
        "categories": [
            "notes",
            "work:color"
        ],
        "bgc": "rgb(255, 136, 136)"
    },
    {
        "id": "1TAlCHfvOW",
        "type": "noteTxt",
        "isPinned": false,
        "info": {
            "title": "My Note",
            "txt": "My fullstack baby",
            "todos": [],
            "imgUrl": "",
            "videoUrl": ""
        },
        "categories": [
            "notes",
            "general:color"
        ],
        "bgc": "#ffff88"
    },
    {
        "id": "VwaDwfzXqE",
        "type": "noteTxt",
        "isPinned": false,
        "info": {
            "title": "My Note",
            "txt": "My fullstack baby",
            "todos": [],
            "imgUrl": "",
            "videoUrl": ""
        },
        "categories": [
            "notes",
            "family:color"
        ],
        "bgc": "rgb(136, 187, 255)"
    },
    {
        "id": "IgdzSP4Bfv",
        "type": "noteTxt",
        "isPinned": false,
        "info": {
            "title": "My Note",
            "txt": "My fullstack baby",
            "todos": [],
            "imgUrl": "",
            "videoUrl": ""
        },
        "categories": [
            "notes",
            "diet:color"
        ],
        "bgc": "rgb(255, 255, 255)"
    }
]
*/
