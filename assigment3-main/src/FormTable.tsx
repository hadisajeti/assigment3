import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormTable.css';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const FormTable = () => {
  const validateEmail = (value: any) => {
    let error;
    if (!value) {
      error = 'please fill the details';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  };

  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(5, 'Should be 5 character long')
      .max(15, 'should not exceed 15 characters')
      .required('FirstName is required'),
    lastName: Yup.string()
      .min(5, 'Should be 5 character long')
      .max(15, 'should not exceed 15 characters')
      .required('LastName is required'),
    email: Yup.string()
      .email('invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Your Password does not match'),
  });

  return (
    <div data-testid="sign-up-form">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values: Values) => {
          console.log('values', values);
        }}
      >
        {({ errors, touched, values }) => (
          <>
            <section>
              <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                  <div
                    className="row d-flex justify-content-center align-items-center h-100"
                    style={{ marginTop: '55px', marginBottom: '55px' }}
                  >
                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                      <div className="card" style={{ borderRadius: '15px' }}>
                        <div className="card-body p-5">
                          <h2 className="text-uppercase text-center mb-5">
                            Create an account
                          </h2>
                          <Form>
                            <div
                              className="form-outline mb-4"
                              data-testid="firstName"
                            >
                              <label className="mb-2">First Name</label>
                              <Field
                                name="firstName"
                                type="text"
                                className="form-control pl-2"
                                placeholder="First Name"
                                value={values.firstName}
                              />
                              {errors.firstName && touched.firstName && (
                                <div
                                  className="text-danger"
                                  data-testid="error-firstName"
                                >
                                  {errors.firstName}
                                </div>
                              )}
                            </div>
                            <div
                              className="form-outline mb-4"
                              data-testid="lastName"
                            >
                              <label className="mb-2">Last Name</label>
                              <Field
                                name="lastName"
                                type="text"
                                className="form-control pl-2"
                                placeholder="Last Name"
                                value={values.lastName}
                              />

                              {errors.lastName && touched.lastName && (
                                <div
                                  className="text-danger"
                                  data-testid="error-lastName"
                                >
                                  {errors.lastName}
                                </div>
                              )}
                            </div>

                            <div
                              className="form-outline mb-4"
                              data-testid="password"
                            >
                              <label className="mb-2">Password</label>
                              <Field
                                name="password"
                                type="password"
                                className="form-control pl-2"
                                value={values.password}
                              />
                              {errors.password && touched.password && (
                                <div
                                  className="text-danger"
                                  data-testid="error-password"
                                >
                                  {errors.password}
                                </div>
                              )}
                            </div>

                            <div
                              className="form-outline mb-4"
                              data-testid="confirmPassword"
                            >
                              <label className="mb-2">Confirm Password</label>
                              <Field
                                autoComplete="on"
                                name="confirmPassword"
                                type="password"
                                className="form-control pl-2"
                                value={values.confirmPassword}
                              />
                              {errors.confirmPassword &&
                                touched.confirmPassword && (
                                  <div
                                    className="text-danger"
                                    data-testid="error-confirmPassword"
                                  >
                                    {errors.confirmPassword}
                                  </div>
                                )}
                            </div>

                            <div
                              className="form-outline mb-4"
                              data-testid="email"
                            >
                              <label className="mb-2"> Email </label>
                              <Field
                                name="email"
                                type="email"
                                value={values.email}
                                data-testid="emailAddress"
                                validate={validateEmail}
                                placeholder="john@example.com"
                                className="form-control pl-2"
                              />
                              {errors.email && touched.email && (
                                <div
                                  className="text-danger"
                                  data-testid="error-email"
                                >
                                  {errors.email}
                                </div>
                              )}
                            </div>

                            <div className="form-check d-flex justify-content-center mb-5">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                value=""
                                id="form2Example3cg"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="form2Example3g"
                              >
                                I agree all statements in{' '}
                                <a href="#!" className="text-body">
                                  <u>Terms of service</u>
                                </a>
                              </label>
                            </div>

                            <div className="d-flex justify-content-center">
                              <button
                                type="submit"
                                data-testid="Register-target-btn"
                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                              >
                                Register
                              </button>
                            </div>

                            <p className="text-center text-muted mt-5 mb-0">
                              Have already an account?{' '}
                              <a href="#!" className="fw-bold text-body">
                                <u>Login here</u>
                              </a>
                            </p>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </Formik>
    </div>
  );
};
export default FormTable;
