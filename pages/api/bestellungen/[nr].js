import mongodb from "@/utils/mongodb";
import Bestellung from "@/models/Bestellung";

export default async function handler(req, res) {
  const {
    method,
    query: { nr },
  } = req;

  await mongodb.dbConnect();

  if (method === "GET") {
    try {
      const bestellung = await Bestellung.findById(nr);
      res.status(200).json(bestellung);
    } catch (error) {
      res.status(200).json(error);
    }
  }

  if (method === "PUT") {
    try {
      const bestellung = await Bestellung.create(req.body);
      res.status(201).json(bestellung);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
