import { Table, CloseButton, Button, Card } from "react-bootstrap";
import Image from "next/image";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { loescheProdukt } from "@/redux/warenkorbSlice";

export default function Warenkorb() {
  const dispatch = useDispatch();
  const warenkorb = useSelector((state) => state.warenkorb);
  const entfernen = (produkt) => {
    dispatch(loescheProdukt(produkt));
  };

  return (
    <div>
      {warenkorb.wAnzahl === 0 ? (
        <h2>der Warenkorb ist leer</h2>
      ) : (
        <div>
          <h1>Warenkorb</h1>
          <div className="row mt-4">
            <div className="col-9">
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Bild</th>
                    <th>Name</th>
                    <th>Extras</th>
                    <th>Menge</th>
                    <th>Betrag</th>
                    <th>
                      <CloseButton disabled />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {warenkorb.produkte.map((produkt) => (
                    <tr key={produkt._id}>
                      <td>
                        <Image
                          src={produkt.bild}
                          alt={produkt.name}
                          width={50}
                          height={50}
                        />
                      </td>
                      <td>
                        <Link
                          className="text-danger"
                          href={`/produkte/${produkt.url}`}
                        >
                          {produkt.name}
                        </Link>
                      </td>
                      <td>
                        {produkt.extras.map((extra) => (
                          <span key={extra._id}>{extra.text}</span>
                        ))}
                      </td>
                      <td>{produkt.menge}</td>
                      <td>{(produkt.preis * produkt.menge).toFixed(2)}</td>
                      <Button
                        className="btn-sm"
                        onClick={() => entfernen(produkt)}
                      >
                        x
                      </Button>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="col-3 p-2">
              <div className="shadow">
                <Card>
                  <Card.Header as="h5">Gesamt</Card.Header>
                  <Card.Body className="text-center">
                    <Card.Title>{warenkorb.gesamtbetrag.toFixed(2)}</Card.Title>
                    <Button variant="primary">Zur Kasse</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
