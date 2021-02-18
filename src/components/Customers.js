/* global  */
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
// import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import useStyles from './useStyles'

import swal from 'sweetalert'

import Title from './Title'

// import custom hooks
import onAddDocHook from './hooks/onAddDocHook'
import onEditDocHook from './hooks/onEditDocHook'
import onDeleteDocHook from './hooks/onDeleteDocHook'



export default function Customers (props) {
  const [customers, setCustomers] = useState([])
  const { Customer } = props.foundation.data
  const [newDoc] = onAddDocHook(Customer)
  const [editedDoc] = onEditDocHook(Customer)
  const [deletedDoc] = onDeleteDocHook(Customer)
  
  const history = useHistory()
  const classes = useStyles()

  const handleAddCustomer = (e) => {
    e.preventDefault()
    history.push('/CustomersAdd')
  }

  const handleDeleteCustomer = async (e, ___id) => {
    e.preventDefault()
    // console.error(___id)
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(async (willDelete) => {
      if (willDelete) {
        const r = await Customer.delete(___id)
        // console.error(r)
        if (r.error) {
          swal('Database error', e.error.message, 'error')
          return
        }
        swal('Poof! The customer has been deleted!', {
          icon: 'success'
        })
      } else {
        swal('The Customer is safe!')
      }
    })
  }


  // whatch for new docs
  useEffect(() => {
    if (newDoc !== null) {
      console.log('newDoc mudou', newDoc)
      setCustomers([newDoc, ...customers])
      console.log('customers', customers)
    }
  }, [newDoc]) // run one time only

  // watch for edited docs
  useEffect(() => {
    if (editedDoc !== null) {
      console.log('editedDoc mudou', editedDoc)
      const newData = customers.map((customer) => {
        if (customer.__id === editedDoc.__id) {
          return editedDoc
        } else {
          return customer
        }
      })
      setCustomers([...newData])
      console.log('customers', customers)
    }
  }, [editedDoc]) // run one time only

  // watch for deleted docs
  useEffect(() => {
    if (deletedDoc !== null) {

      const allCustomers = [...customers]
      for (let x = 0; x < allCustomers.length; x++) {
        const customer = allCustomers[x]
        if (customer.__id === deletedDoc.__id) {
          allCustomers.splice(x, 1)
        }
      }
      setCustomers(allCustomers)
    }
  }, [deletedDoc]) // run one time only

  useEffect(() => {
    async function findCustomers() {
      const findCustomers = await Customer.find({})
      if (!findCustomers) {
        return
      }
      if (findCustomers.data) {
        setCustomers(findCustomers.data)
      }
    }
    console.log('finding')
    if (customers.length === 0) {
      findCustomers()
    }
  }, [customers])
  


  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Customers</Title>
            <ButtonGroup color='primary' aria-label='outlined primary button group'>
              <Button onClick={handleAddCustomer}>Add</Button>
            </ButtonGroup>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Cards</TableCell>
                  <TableCell align='right'>actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell align='right'>{customer.cards.join(' / ')}</TableCell>
                    <TableCell align='right'>
                      <Link color='primary' to={`/CustomersEdit/${customer.__id}`}>[edit]</Link> | <a color='primary' href='#' onClick={e => handleDeleteCustomer(e, customer.__id)}>[delete]</a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className={classes.seeMore}> Paging goes here </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
