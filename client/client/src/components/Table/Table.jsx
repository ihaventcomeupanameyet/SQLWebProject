import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
// ];

export default function AccessibleTable({ rows, collumns }) {
  console.log(rows);
  if (!rows) return "loading";
  return (
    <TableContainer sx={{ maxWidth: 500, maxHeight: 500 }} component={Paper}>
      <Table sx={{ maxWidth: 500, maxHeight: 500 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            {collumns.map((column) => (
              <TableCell key={column} align="right">
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {collumns.map((column) => (
                <TableCell key={`${index}-${column}`} align="right">
                  {row[column]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
