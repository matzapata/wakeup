import { atom } from 'jotai'

interface OrderItem {
    id: string
    quantity: number
    name: string
    price: number
}

export const orderItemsAtom = atom<{ [id: OrderItem["id"]]: OrderItem }>({})

export const orderTotalAtom = atom(get => {
    const orderItems = get(orderItemsAtom)
    return Object.values(orderItems).reduce((total, item) => {
        return total + item.price * item.quantity
    }, 0)
})