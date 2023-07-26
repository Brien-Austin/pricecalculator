import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("pricecalculator");

       const packages = await db
           .collection("destinations")
           .find({})
           .sort({ metacritic: -1 })
           .limit(10)
           .toArray();

       const destinations = packages;

       res.json(destinations);
   } catch (e) {
       console.error(e);
   }
};
