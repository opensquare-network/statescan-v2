import TableEmpty from "./empty";
import TableRow from "./row";

export default function TableBody({ heads, data = null }) {
  if (!data?.length) {
    return <TableEmpty />;
  }

  return (
    <tbody>
      {data.map((row, index) => {
        return <TableRow heads={heads} row={row} key={index} />;
      })}
    </tbody>
  );
}
