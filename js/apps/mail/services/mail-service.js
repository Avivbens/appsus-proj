import { storageService } from "../../../services/async-storage-service.js"
import { utilService } from "../../../services/utils-service.js"

const MAILS_KEY = 'mails'

export const mailService = {
    query,
    get,
    post,
    postMany,
    remove,
    getIndex,
    createMail,
    toggleArchive,
    createSimpleMail,
    createFirstMails,
    getByFilter,
}

function query() {
    return storageService.query(MAILS_KEY)
}

function getByFilter(filterBy) {
    return query()
        .then(mails => {
            return mails.filter(mail => {
                return mail.categories.includes(filterBy) &&
                    (filterBy === 'archived' || !mail.categories.includes('archived'))
            })
        })
}

function get(mailId) {
    return storageService.get(MAILS_KEY, mailId)
}

function post(mail) {
    return storageService.post(MAILS_KEY, mail)
}

function postMany(mails) {
    return storageService.postMany(MAILS_KEY, mails)
}

function remove(mail) {
    return storageService.remove(MAILS_KEY, mail.id)
        .then(() => query()
            .then(res => {
                return res
            })
        )
}

function toggleArchive(mailId) {
    return query()
        .then(res => {
            const targetMail = res.find(mail => mail.id === mailId)
            const idx = targetMail.categories.findIndex(c => c === 'archived')

            if (idx === -1) targetMail.categories.push('archived')
            else targetMail.categories.splice(idx, 1)

            _save(targetMail)

            return res
        })
}

function getIndex(mailId) {
    return query()
        .then(mails => {
            return mails.findIndex(mail => mail.id === mailId)
        })
}

function createMail(sender, subject, body, category, to = 'you', isRead = false, sentAt = Date.now()) {
    return {
        sender,
        subject,
        body,
        categories: [category],
        to,
        isRead,
        sentAt,
    }
}

function createSimpleMail() {
    return {
        sender: 'You',
        subject: 'Wassap?',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        categories: ['inbox']
    }
}

function createFirstMails() {
    const mails = []
    for (let i = 0; i < 4; i++) {
        const mail = createSimpleMail()
        mail.id = utilService.makeId()
        mails.push(mail)
    }

    return mails
}

function _save(mail) {
    if (mail.id) {
        return storageService.put(MAILS_KEY, mail)
    } else {
        return storageService.post(MAILS_KEY, mail)
    }
}
