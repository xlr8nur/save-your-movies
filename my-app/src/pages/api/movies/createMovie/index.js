import { createNewData } from "@/services/serviceOperations";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "Talep edilen bilgiye ulaşılamadı." });
  }

  if (req.method === "POST") {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({
          success: false,
          error: "Yetersiz bilgi. Lütfen eksik kısımları tamamlayınız.",
        });
      }
      const data = req.body;
      console.log("Gönderilen data:", data);
      const movie = await createNewData("movie", data);

      return res.status(200).json({
        success: true,
        message: "Film ekleme işlemi başarıyla gerçekleştirildi.",
        data: movie,
      });
    } catch (error) {
      console.error("Hata:", error);
      return res.status(500).json({
        status: error.status || 500,
        error: error.message || "Bir hata meydana geldi.",
      });
    }
  } else {
    return res.status(500).json({ error: "Hatalı istek." });
  }
};

export default handler;
