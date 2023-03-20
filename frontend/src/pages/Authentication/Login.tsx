import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "reactstrap";
//Social Media Imports
// router
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
// validations
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
// config
// hooks
import { useProfile, useRedux } from "../../hooks/index";
//actions
import { loginUser } from "../../redux/actions";
// components
import NonAuthLayoutWrapper from "../../components/NonAutnLayoutWrapper";
import AuthHeader from "../../components/AuthHeader";
import FormInput from "../../components/FormInput";
import Loader from "../../components/Loader";

interface LocationTypes {
  from?: Location;
}
interface LoginProps {}
const Login = (props: LoginProps) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();

  const { isUserLogin, error, loginLoading, isUserLogout } = useAppSelector(
    state => ({
      isUserLogin: state.Login.isUserLogin,
      error: state.Login.error,
      loginLoading: state.Login.loading,
      isUserLogout: state.Login.isUserLogout,
    })
  );

  const history: any = useHistory();
  const location = useLocation<LocationTypes>();
  const [redirectUrl, setRedirectUrl] = useState("/");
  useEffect(() => {
    const url =
      location.state && location.state.from
        ? location.state.from.pathname
        : "/";
    setRedirectUrl(url);
  }, [location]);
  useEffect(() => {
    if (isUserLogin && !loginLoading && !isUserLogout) {
      history.push(redirectUrl);
    }
  }, [isUserLogin, history, loginLoading, isUserLogout, redirectUrl]);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const resolver = yupResolver(
    yup.object().shape({
      phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    })
  );

  const defaultValues: any = {
    phoneNumber: "",
  };

  const methods = useForm({ defaultValues, resolver });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmitForm = (values: object) => {
    dispatch(loginUser(values));
  };

  const { userProfile, loading } = useProfile();

  if (userProfile && !loading) {
    return <Redirect to={{ pathname: redirectUrl }} />;
  }

  return (
    <NonAuthLayoutWrapper>
      <Row className=" justify-content-center my-auto">
        <Col sm={8} lg={6} xl={5} className="col-xxl-4">
          <div className="py-md-5 py-4">
            <AuthHeader
              title="Welcome Back !"
              subtitle="Log In to continue to TELICO."
            />

            {error && <Alert color="danger">{error}</Alert>}

            <Form
              onSubmit={handleSubmit(onSubmitForm)}
              className="position-relative"
            >
              {loginLoading && <Loader />}
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
                  placeholder="Enter phone number"
                  className="form-control"
                />
              </div>

              {/*<div className="mb-3">
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
              </div>*/}

              <div className="text-center mt-4">
                <Button color="primary" className="w-100" type="submit">
                  Log In
                </Button>
              </div>
            </Form>

            <div className="mt-5 text-center text-muted">
              <p>
                Don't have an account ?{" "}
                <Link
                  to="/auth-register"
                  className="fw-medium text-decoration-underline"
                >
                  {" "}
                  Register
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </NonAuthLayoutWrapper>
  );
};

export default Login;
