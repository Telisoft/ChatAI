import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../redux/auth/login/actions'

const Login = () => {
  const dispatch = useDispatch()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitForm = () => {
    console.log('phoneNumber', phoneNumber)
    console.log('password', password)
    dispatch(loginUser({ phoneNumber, password }))
  }

  const onChangePassword = (ev) => {
    setPassword(ev.target.value)
  }

  const onChangePhoneNumber = (ev) => {
    setPhoneNumber(ev.target.value)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1 className="text-center">Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Phone Number"
                        autoComplete="phone_number"
                        onChange={(e) => onChangePhoneNumber(e)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        onChange={(e) => onChangePassword(e)}
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <div></div>
                      </CCol>
                      <CCol xs={6}>
                        <CButton onClick={onSubmitForm} color="primary" className="float-end">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
