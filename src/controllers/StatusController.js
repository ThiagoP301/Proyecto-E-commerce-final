export const statusPingController = (req, res) => {
    
    console.log("Consulta recibida en ping de tipo POST. Body:", req.body)

    res.json({
        status: 200,
        message: "Pong",
        ok: true
    })
}
    
