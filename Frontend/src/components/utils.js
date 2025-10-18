export function ford(date) {
    return date.toLocaleDateString('en-Us' , {
        month:"short",
        day:"numeric",
        year:"numeric"
    })
}