import client from './client'

export const getServices = () => client.get('/services/')
export const getCategories = () => client.get('/services/categories/')
export const getTestimonials = () => client.get('/testimonials/')
export const getQuote = (payload) => client.post('/quote/', payload)
export const createBooking = (payload) => client.post('/bookings/', payload)

// Admin
export const getBookings = (params) => client.get('/bookings/list/', { params })
export const updateBooking = (id, payload) => client.patch(`/bookings/${id}/`, payload)
export const getAnalytics = () => client.get('/analytics/')
export const adminLogin = (credentials) => client.post('/auth/token/', credentials)