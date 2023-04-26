import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import { DocsExample } from 'src/components'

import SmartTableBasixExample from './SmartTableBasixExample'
import SmartTableDownloadableExample from './SmartTableDownloadableExample'
import SmartTableSelectableExample from './SmartTableSelectableExample'

const SmartTable = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Users</strong>
          </CCardHeader>
          <CCardBody>
            <SmartTableBasixExample />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SmartTable
