import http from 'http'

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.end('HeLL0 ClaSSE')
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})