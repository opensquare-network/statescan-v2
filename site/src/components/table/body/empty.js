import NoData from "../../noData";

export default function TableEmpty() {
  return (
    <tbody>
      <tr>
        <td colSpan="100%">
          <NoData />
        </td>
      </tr>
    </tbody>
  );
}
