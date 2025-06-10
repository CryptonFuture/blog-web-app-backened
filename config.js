const env = process.env


const port = env.PORT || 8000
const mongodb_url = env.MONGO_URL || 'mongodb+srv://admim:LelyTJKimfIIFaDw@cluster0.7dfpd9x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const access_token = env.ACCESS_TOKEN_SECRET_KEY || '1234567890'
const refresh_token = env.REFRESH_TOKEN_SECRET_KEY || 'abcdefghi'
const secret_key = env.SECRET_KEY || '1234567890'


export {
    port,
    mongodb_url,
    access_token,
    refresh_token,
    secret_key
}