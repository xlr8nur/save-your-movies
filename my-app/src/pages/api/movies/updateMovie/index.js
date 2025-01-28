import { updateDataByAny } from "@/services/serviceOperations";

const handler = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Bu işleme izin verilmiyor." });
  }

  try {
    const { id } = req.query;
    const { title, content } = req.body;

    if (!id || !title || !content) {
      return res.status(400).json({
        success: false,
        error: "Yetersiz bilgi. Lütfen gerekli alanları doldurunuz."
      });
    }

    const updatedMovie = await updateDataByAny("movie", 
      { id: id },
      { title, content }
    );

    if (updatedMovie.error) {
      throw new Error(updatedMovie.error);
    }

    return res.status(200).json({
      success: true,
      message: "Film güncellendi",
      data: updatedMovie
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export default handler;