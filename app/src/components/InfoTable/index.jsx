import React from 'react'
import {
TableRow,
TableHeaderCell,
TableHeader,
TableCell,
TableBody,
Table,
} from 'semantic-ui-react'

export default function InfoTable({character}) {
  return (
  <Table basic='very' celled collapsing style={{ width: '25rem', marginLeft: '2rem', marginTop : '2rem', marginBottom : '2rem' }}>
    <TableHeader>
    <TableRow>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>{character.name}</TableHeaderCell>
    </TableRow>
    </TableHeader>

    <TableBody>
    <TableRow>
      <TableCell>Status</TableCell>
      <TableCell>{character.status}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Species</TableCell>
      <TableCell>{character.species}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Gender</TableCell>
      <TableCell>{character.gender}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Type</TableCell>
      <TableCell>{character.type ? character.type : "-"}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Origin</TableCell>
      <TableCell>{character.origin.name}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Location</TableCell>
      <TableCell>{character.location.name}</TableCell>
    </TableRow>
    </TableBody>
  </Table>
  )
}