import { storageService } from "../../../services/async-storage-service.js"
import { emailsData } from './email-data.js'; 

const EMAILS_KEY = 'AS-emails';

export const emailService = {
    query,
    getEmailById,
    addEmail,
    deleteEmail,
    updateEmail
}

function query() {
    return storageService.query(EMAILS_KEY)
    .then(emails => {
        if (!emails || !emails.length) {
            localStorage.setItem(EMAILS_KEY, JSON.stringify(emailsData))
            return emailsData
        }
        return emails
    })
}

function getEmailById(emailId){
    return storageService.get(EMAILS_KEY, emailId)
}

function addEmail(email){
    email.isRead = false;
    email.isStarred = false;
    email.sentAt = Date.now();
    return storageService.post(EMAILS_KEY, email)
}

function deleteEmail(emailId){
    return storageService.remove(EMAILS_KEY, emailId)
}

function updateEmail(email){
    return storageService.put(EMAILS_KEY, email)
}
