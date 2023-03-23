import React from "react";
import { Alert, Button, Col, Form, Row } from "reactstrap";
// hooks
import { useRedux } from "../../hooks/index";
// router
import { Link, Redirect } from "react-router-dom";
// validations
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
// hooks
import { useProfile } from "../../hooks";
//actions
import { registerUser } from "../../redux/actions";
// components
import NonAuthLayoutWrapper from "../../components/NonAutnLayoutWrapper";
import AuthHeader from "../../components/AuthHeader";
import FormInput from "../../components/FormInput";
import Loader from "../../components/Loader";

interface RegisterProps {}
const Register = (props: RegisterProps) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();

  const { user, registrationError, regLoading } = useAppSelector(state => ({
    user: state.Register.user,
    registrationError: state.Register.registrationError,
    regLoading: state.Register.loading,
    isUserRegistered: state.Register.isUserRegistered,
  }));

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const resolver = yupResolver(
    yup.object().shape({
      email: yup
        .string()
        .email("This value should be a valid email.")
        .required("Please Enter E-mail."),
      firstName: yup.string().required("Please Enter First Name."),
      lastName: yup.string().required("Please Enter Last Name."),
      phoneNumber: yup.string().matches(phoneRegExp, 'Phone Number is not valid'),
      password: yup.string().required("Please Enter Password."),
    })
  );

  const defaultValues: any = {};

  const methods = useForm({ defaultValues, resolver });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmitForm = (values: object) => {
    dispatch(registerUser(values));
  };

  const { userProfile, loading } = useProfile();

  if (userProfile && !loading) {
    return <Redirect to={{ pathname: "/dashboard" }} />;
  }

  return (
    <NonAuthLayoutWrapper>
      <Row className=" justify-content-center my-auto">
        <Col sm={8} lg={6} xl={5} className="col-xxl-4">
          <div className="py-md-5 py-4">
            <AuthHeader
              title="Register Account"
              subtitle="Get your free TELICO account now."
            />

            {user && user ? (
              <Alert color="success">Register User Successfully</Alert>
            ) : null}

            {registrationError && registrationError ? (
              <Alert color="danger">{registrationError}</Alert>
            ) : null}

            <Form
              onSubmit={handleSubmit(onSubmitForm)}
              className="position-relative"
            >
              {regLoading && <Loader />}

              <div className="mb-3">
                <FormInput
                  label="First Name"
                  type="text"
                  name="firstName"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter First Name"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <FormInput
                  label="Last Name"
                  type="text"
                  name="lastName"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter Last Name"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <FormInput
                  label="Phone Number"
                  type="string"
                  maxLength={10}
                  name="phoneNumber"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter Phone Number"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <FormInput
                  label="Email"
                  type="text"
                  name="email"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter Email"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  className="form-control pe-5"
                  placeholder="Enter Password"
                />
              </div>

              <div className="text-center mb-3">
                <Button
                  color="primary"
                  className="w-100  waves-effect waves-light"
                  type="submit"
                >
                  Register
                </Button>
              </div>
            </Form>

            <div className="mt-5 text-center text-muted">
              <p>
                Already have an account ?{" "}
                <Link
                  to="/auth-login"
                  className="fw-medium text-decoration-underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </NonAuthLayoutWrapper>
  );
};

export default Register;
