import React, { useState } from 'react'
import { CBadge, CButton, CCardBody, CCollapse, CSmartTable } from '@coreui/react-pro'

import data from './_data.js'

const SmartTableBasicExample = () => {
  const [details, setDetails] = useState([])
  const columns = [
    {
      key: 'name',
      _style: { width: '40%' },
    },
    'registered',
    { key: 'role', _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' } },
  ]
  const getBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Inactive':
        return 'secondary'
      case 'Pending':
        return 'warning'
      case 'Banned':
        return 'danger'
      default:
        return 'primary'
    }
  }
  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  return (
    <CSmartTable
      sorterValue={{ column: 'name', state: 'asc' }}
      clickableRows
      tableProps={{
        striped: true,
        hover: true,
      }}
      activePage={3}
      footer
      items={data}
      columns={columns}
      itemsPerPageSelect
      itemsPerPage={5}
      // columnSorter
      pagination
      scopedColumns={{
        status: (item) => (
          <td>
            <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
          </td>
        ),
      }}
    />
  )
}

export default SmartTableBasicExample
