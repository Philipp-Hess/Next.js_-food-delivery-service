import Slider from "@/komponenten/Slider";
import Produktliste from "@/komponenten/Produktliste";
import mongodb from "@/utils/mongodb";
import Produkt from "@/models/Produkt";

export default function Home({ produkte }) {
  return (
    <div>
      <Slider />
      <Produktliste produkte={produkte} />
    </div>
  );
}

export async function getServerSideProps() {
  await mongodb.dbConnect();
  const produkte = await Produkt.find({}).lean();
  return {
    props: {
      produkte: JSON.parse(JSON.stringify(produkte)),
    },
  };
}
