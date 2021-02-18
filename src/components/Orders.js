/* global  */
import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'

import swal from 'sweetalert'
import moment from 'moment'

// material UI
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
import Title from './Title'

// import custom hooks
import onAddDocHook from './hooks/onAddDocHook'
import onEditDocHook from './hooks/onEditDocHook'
import onDeleteDocHook from './hooks/onDeleteDocHook'

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export default function Orders (props) {
  const { Order } = props.foundation.data
  const [orders, setOrders] = useState([])
  const [newDoc] = onAddDocHook(Order)
  const [editedDoc] = onEditDocHook(Order)
  const [deletedDoc] = onDeleteDocHook(Order)

  const history = useHistory()

  const classes = useStyles()

  const handleAddOrder = (e) => {
    e.preventDefault()
    history.push('/OrdersAdd')
  }

  const handleDeleteOrder = async (e, ___id) => {
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
        const r = await Order.delete(___id)
        // console.error(r)
        if (r.error) {
          swal('Database error', e.error.message, 'error')
          return
        }
        swal('Poof! The order has been deleted!', {
          icon: 'success'
        })
      } else {
        swal('The Order is safe!')
      }
    })
  }

  // whatch for new docs
  useEffect(() => {
    if (newDoc !== null) {
      console.log('newDoc mudou', newDoc)
      setOrders([newDoc, ...orders])
      console.log('orders', orders)
    }
  }, [newDoc]) // run one time only

  // watch for edited docs
  useEffect(() => {
    if (editedDoc !== null) {
      console.log('editedDoc mudou', editedDoc)
      const newData = orders.map((order) => {
        if (order.__id === editedDoc.__id) {
          return editedDoc
        } else {
          return order
        }
      })
      setOrders([...newData])
      console.log('orders', orders)
    }
  }, [editedDoc]) // run one time only

  // watch for deleted docs
  useEffect(() => {
    if (deletedDoc !== null) {
      const allOrders = [...orders]
      for (let x = 0; x < allOrders.length; x++) {
        const order = allOrders[x]
        if (order.__id === deletedDoc.__id) {
          allOrders.splice(x, 1)
        }
      }
      setOrders(allOrders)
    }
  }, [deletedDoc]) // run one time only
  

  useEffect(() => {
    async function findOrders() {
      const findOrders = await Order.find({})
      if (!findOrders) {
        return
      }
      if (findOrders.data) {
        setOrders(findOrders.data)
      }
    }
    if (orders.length === 0) {
      console.log('finding ')
      findOrders()
    }
  }, []) // run one time only

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Orders</Title>
            <ButtonGroup color='primary' aria-label='outlined primary button group'>
              <Button onClick={handleAddOrder}>Add</Button>
            </ButtonGroup>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Ship To</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell align='right'>Sale Amount</TableCell>
                  <TableCell align='right'>actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{moment(order.date).subtract(6, 'days').calendar()}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.shipTo}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell align='right'>USD {formatter.format(order.amount)}</TableCell>
                    <TableCell align='right'>
                      <Link color='primary' to={`/OrdersEdit/${order.__id}`}>[edit]</Link> | <a color='primary' href='#' style={{ display: 'none' }} onClick={e => handleDeleteOrder(e, order.__id)}>[delete]</a>
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
