import { storageService } from "../../../services/async-storage-service.js"
import { utilService } from "../../../services/utils-service.js"

const MAILS_KEY = 'mails'

export const mailService = {
    query,
    get,
    getByFilter,
    getBySearch,
    post,
    postMany,
    remove,
    getIndex,
    createMail,
    toggleArchive,
    toggleStar,
    createSimpleMail,
    createFirstMails,
    save,
}

function query() {
    return storageService.query(MAILS_KEY)
}

function get(mailId) {
    return storageService.get(MAILS_KEY, mailId)
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

function getBySearch(mails, searchWord) {
    return mails.filter(mail => {
        return mail.sender.toLowerCase().includes(searchWord) ||
            mail.subject.toLowerCase().includes(searchWord) ||
            mail.to.toLowerCase().includes(searchWord)
    })
}

function post(mail) {
    if (mail.to !== 'You') return sendMailToMe(mail)
    return storageService.post(MAILS_KEY, mail)
}

function sendMailToMe(mail) {
    let newMail = JSON.parse(JSON.stringify(mail))
    newMail.categories = ['inbox']
    newMail.to = 'You'

    mail.isRead = true
    return storageService.post(MAILS_KEY, newMail)
        .then(() => {
            storageService.post(MAILS_KEY, mail)
        })
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

            save(targetMail)

            return res
        })
}

function toggleStar(mailId) {
    return query()
        .then(res => {
            const targetMail = res.find(mail => mail.id === mailId)
            targetMail.isStarred = !targetMail.isStarred

            const idx = targetMail.categories.findIndex(c => c === 'starred')

            if (idx === -1) targetMail.categories.push('starred')
            else targetMail.categories.splice(idx, 1)

            save(targetMail)

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
        isStarred: false
    }
}

function createSimpleMail() {
    return {
        sender: 'You',
        subject: 'Wassap?',
        body: utilService.makeLorem(200),
        categories: ['inbox'],
        to: 'you',
        isRead: false,
        sentAt: Date.now(),
        isStarred: false
    }
}

function createFirstMails() {
    const mails = []
    for (let i = 0; i < 10; i++) {
        const mail = createSimpleMail()
        mail.id = utilService.makeId()
        mails.push(mail)
    }

    return mails
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAILS_KEY, mail)
    } else {
        return storageService.post(MAILS_KEY, mail)
    }
}
