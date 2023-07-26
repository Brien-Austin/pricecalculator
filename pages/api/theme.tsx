import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("pricecalculator");

       const themes = await db
           .collection("packageThemes")
           .find({})
           .sort({ metacritic: -1 })
           .limit(10)
           .toArray();

       const packageThemes = themes.map((theme) => theme.theme);

       res.json(packageThemes);
   } catch (e) {
       console.error(e);
   }
};
