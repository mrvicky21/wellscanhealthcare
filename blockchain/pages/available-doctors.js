import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select } from 'semantic-ui-react';
import Layout from '../components/Layout';
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Table,
  } from 'semantic-ui-react'


class AvailableDoctors extends Component {
    render() {
        return (
            <Layout>
        <Segment padded>
          <h1>Available Doctors</h1>
        </Segment>
        <Segment>
          <Table singleLine>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Ethereum Address</TableHeaderCell>
                <TableHeaderCell>Location</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>Vigneswaran Ganesh</TableCell>
                <TableCell>0x0C95E6Da6FE4dC91969aE5644E0CE9C2f34C3468</TableCell>
                <TableCell>Tilak Nagar, Mumbai</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vinitha Udaiyar</TableCell>
                <TableCell>0xdd852D0F492fff91978332E491E69C97C3AD5Eff</TableCell>
                <TableCell>Vashi, Navi Mumbai</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Segment>
      </Layout>
        );
    }
}

export default AvailableDoctors;