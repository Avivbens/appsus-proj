import { storageService } from "../../../services/async-storage-service.js"
import { utilService } from "../../../services/utils-service.js"

const MAILS_KEY = 'mails'

export const mailService = {
    query,
    get,
    post,
    postMany,
    getIndex,
    createMail,
    createSimpleMail,
    createFirstMails,
}

function query() {
    return storageService.query(MAILS_KEY)
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

function getIndex(mailId) {
    return query()
        .then(mails => {
            return mails.findIndex(mail => mail.id === mailId)
        })
}

function createMail(sender, subject, body, isRead = false, sentAt = Date.now()) {
    return {
        sender,
        subject,
        body,
        isRead,
        sentAt,
    }
}

function createSimpleMail() {
    return {
        sender: 'You',
        subject: 'Wassap?',
        body: utilService.makeLorem(20),
        isRead: false,
        sentAt: Date.now()
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
