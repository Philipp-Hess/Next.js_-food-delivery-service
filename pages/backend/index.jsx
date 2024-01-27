import { Table, Button, CloseButton } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Bestellung({ bestellungen }) {
  const router = useRouter();
  const status = ["Eingegangen", "Zubereitung", "Unterwegs", "Ausgeliefert"];

  const statusUpdate = async (id, aktuellerStatus) => {
    try {
      if (aktuellerStatus <= 2) {
        await axios.put(`http://localhost:3000/api/bestellungen/` + id, {
          status: aktuellerStatus + 1,
        });
        router.reload();
      }
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const bestellungEntfernen = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/bestellungen/` + id);
      router.reload();
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
  };

  console.log("Received orders:", bestellungen); // Log orders to console for debugging

  return (
    <div>
      <h1>Admin Backend</h1>
      <div className="row mt-4">
        <div className="col-12">
          <Table hover responsive>
            <thead>
              <tr>
                <th>Bestell Nr.</th>
                <th>Kunde</th>
                <th>Adresse</th>
                <th>Status</th>
                <th>
                  <CloseButton disabled />
                </th>
              </tr>
            </thead>
            <tbody>
              {bestellungen.map((bestellung) => (
                <tr key={bestellung._id}>
                  <td>
                    <Link href={`/bestellungen/${bestellung._id}`}>
                      <a className="text-danger">{bestellung._id}</a>
                    </Link>
                  </td>
                  <td>{bestellung.kunde}</td>
                  <td>{bestellung.adresse}</td>
                  <td>
                    <Button
                      onClick={() =>
                        statusUpdate(bestellung._id, bestellung.status)
                      }
                    >
                      {status[bestellung.status]}
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => bestellungEntfernen(bestellung._id)}
                    >
                      x
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await axios.get(`http://localhost:3000/api/bestellungen`);
    console.log("API Response:", res.data);
    return {
      props: { bestellungen: res.data },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    console.error(
      "Error response:",
      error.response ? error.response.data : "No response"
    );
    return {
      props: { bestellungen: [] },
    };
  }
}
