export function pad(n) {
    return n <10 ? '0' + n : '' + n
}

export function dateKey(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
}

export function todayKey(){
    return dateKey(new Date())
}

export function addDays(d, n){
    const r = new Date(d)
    r.setDate(r.getDate() + n)
    return r
}

export function nowHM(){
    const d = new Date()
    return pad(d.getHours()) + ':' + pad(d.getMinutes())
}

const WEEKDAY_FULL = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function friendlyDay(d){
    return WEEKDAY_FULL[d.getDay()] + ' ' + MONTHS[d.getMonth()] + ' ' + d.getDate()
}

export {MONTHS}