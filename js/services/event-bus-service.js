export const eventBus = new Vue()

export function showMsg(msg) {
    eventBus.$emit('show-msg', msg)
}
