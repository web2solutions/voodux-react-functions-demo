import React, { useState, useEffect } from 'react'
import { /* Link as RouterLink, */ useHistory } from 'react-router-dom'
// import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import moment from 'moment'

import Title from './Title'

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}))

let onAddDocEventListener = null
let onEditDocEventListener = null
let onDeleteDocEventListener = null


export default function DashBoardListing (props) {
  const [documents, setDocuments] = useState([])
  const { Order } = props.foundation.data
  const classes = useStyles()
  const history = useHistory()

  const handleAddDocument = async (e) => {
    e.preventDefault()
    history.push('/OrdersAdd')
  }

  useEffect(() => {
    // got documents
    // console.log('------->>>>> Dashboardlisting.js mouting events', props.foundation.stopListenTo)
    // listen to add props.entity Collection event on Data API
    onAddDocEventListener = props.foundation
      .on(`collection:add:${props.entity.toLowerCase()}`, (eventObj) => {
      console.log('handlerOnOrderAdd', eventObj)
      const { error, data } = eventObj
      if (error) {
        // console.error(`Error adding user: ${error}`)
      }
      setDocuments([data, ...documents])
    })

    // listen to edit props.entity Collection event on Data API
    onEditDocEventListener = props.foundation
      .on(`collection:edit:${props.entity.toLowerCase()}`, (eventObj) => {
    
      const { error, data, primaryKey } = eventObj
      if (error) {
        // console.error(`Error updating user: ${error}`)
        return
      }
      const newData = documents.map((doc) => {
        if (doc.__id === primaryKey) {
          return data
        } else {
          return doc
        }
      })
      setDocuments([...newData])
    })

    // listen to delete props.entity Collection event on Data API
    onDeleteDocEventListener = props.foundation
      .on(`collection:delete:${props.entity.toLowerCase()}`, (eventObj) => {
      const { error, primaryKey } = eventObj
      if (error) {
        // console.error(`Error deleting user: ${error}`)
        return
      }
      const allDocuments = [...documents]
      for (let x = 0; x < allDocuments.length; x++) {
        const doc = allDocuments[x]
        if (doc.__id === primaryKey) {
          allDocuments.splice(x)
        }
      }
      setDocuments(allDocuments)
    })
    return () => {
      // stop to listen events on component unmount
      console.log('------->>>>> Dashboardlisting.js remove events')
      props.foundation.stopListenTo(onAddDocEventListener)
      props.foundation.stopListenTo(onEditDocEventListener)
      props.foundation.stopListenTo(onDeleteDocEventListener)
      onAddDocEventListener = null
      onEditDocEventListener = null
      onDeleteDocEventListener = null
    }
  }, [documents])

  useEffect(() => {
    async function findOrders() {
      const findDocuments = await Order.find({})
      if (findDocuments.data) {
        setDocuments(findDocuments.data)
      }
    }
    if (documents.length === 0) {
      findOrders()
    }

  }, []) // run one time only


  
  return (
    <>
      <Title>Recent {props.entity}</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align='right'>Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>{moment(doc.date).startOf('hour').fromNow()}</TableCell>
              <TableCell>{doc.name}</TableCell>
              <TableCell>{doc.shipTo}</TableCell>
              <TableCell>{doc.paymentMethod}</TableCell>
              <TableCell align='right'>USD {formatter.format(doc.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Button variant='contained' color='primary' onClick={handleAddDocument}>
          Add doc
        </Button>
      </div>
    </>
  )
}
