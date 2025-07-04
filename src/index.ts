import colors from "colors"
import { httpServer } from "./server"

const PORT = process.env.PORT || 4000

httpServer.listen(PORT, () => {
  console.log(colors.magenta.bold(`Servidor en el puerto ${PORT}`))
})
