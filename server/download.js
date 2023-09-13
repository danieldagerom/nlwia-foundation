import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("downloading video:" + videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].aproxDurationMs / 1000
      if (seconds > 60) {
        throw new Error("Aduração é maior do que 60 segundos.")
      }
    })
    .on("end", () => {
      console.log("Download do vídeo finalizado.")
    })
    .on("error", (error) => {
      console.log(
        "Não foi possivel fazer o download do vídeo. Detalhes do erro:",
        error
      )
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
}
