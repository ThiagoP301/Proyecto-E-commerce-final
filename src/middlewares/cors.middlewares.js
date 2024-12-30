const allowed_origins =[
    "http://localhost:5173"
]


export const customCorsMiddleware = (req, res, next)=>{
    const origin = req.headers.origin
    if(allowed_origins.includes(origin)){
        res.setHeader("Acces-Control-Allow-Origin", origin)
    }
    res.setHeader("Acces-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.setHeader("Acces-Control-Allow-Headers", "Content-Type")
    res.setHeader("Acces-Control-Allow-Credentials", "true")
    next()
}

