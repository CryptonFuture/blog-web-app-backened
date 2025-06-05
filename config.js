const env = process.env

const port = env.PORT || 8000
const mongodb_url = env.MONGO_URL || 'mongodb+srv://admim:LelyTJKimfIIFaDw@cluster0.7dfpd9x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

export {
    port,
    mongodb_url
}