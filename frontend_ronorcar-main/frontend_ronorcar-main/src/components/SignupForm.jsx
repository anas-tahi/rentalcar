import React from "react";
import { useState } from "react";
import { Form, Input, Button, Checkbox, Typography, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiRequest from "../Api/apiRequest";
import { motion } from "framer-motion";
import { Box } from "@mui/material";

const { Text } = Typography;

const SignupForm = ({ setAuth }) => {
  const navigate = useNavigate();
  const [capVal, setCapVal] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    agreement: Yup.boolean().oneOf(
      [true],
      "Please agree to the terms and conditions"
    ),
  });
  // Log validation results
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreement: false,
    },
    validationSchema: SignupSchema, // Assign Yup schema for validation
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setIsLoading(true); // Set loading state when submitting

        const res = await apiRequest.post("/auth/register", {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        });

        let redirectionPath = "/login";
        setError("");
        // Wait for 4 seconds before redirection
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate(redirectionPath);
      } catch (err) {
        console.error("Registration error:", err);
        setError(err.response.data.message);
      } finally {
        setIsLoading(false); // Clear loading state when API verification is completed
        setSubmitting(false); // Set submitting state for formik after redirect
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Form
        initialValues={{ remember: true }}
        onFinish={formik.handleSubmit}
        autoComplete="off"
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
              validateStatus={formik.errors.firstName ? "error" : ""}
              help={formik.errors.firstName ? formik.errors.firstName : ""}
            >
              <Input
                placeholder="First Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                style={{ height: "2.7rem", fontSize: "1.02rem" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
              validateStatus={formik.errors.lastName ? "error" : ""}
              help={formik.errors.lastName ? formik.errors.lastName : ""}
            >
              <Input
                placeholder="Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                style={{ height: "2.7rem", fontSize: "1.02rem" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            { required: true, message: "Please input your email!" },
          ]}
          validateStatus={formik.errors.email ? "error" : ""}
          help={formik.errors.email ? formik.errors.email : ""}
        >
          <Input
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            style={{ height: "2.7rem", fontSize: "1.02rem" }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            {
              min: 8,
              message: "Password must be at least 8 characters long",
            },
          ]}
          validateStatus={formik.errors.password ? "error" : ""}
          help={formik.errors.password ? formik.errors.password : ""}
        >
          <Input.Password
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            style={{ height: "2.7rem", fontSize: "1.02rem" }}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
          validateStatus={formik.errors.confirmPassword ? "error" : ""}
          help={
            formik.errors.confirmPassword ? formik.errors.confirmPassword : ""
          }
        >
          <Input.Password
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            style={{ height: "2.7rem", fontSize: "1.02rem" }}
          />
        </Form.Item>

        <Form.Item>
          <Text type="secondary">Your password must have:</Text>
          <ul>
            <li>8 characters</li>
            <li>1 uppercase letter</li>
            <li>1 lowercase letter</li>
            <li>1 number</li>
            <li>1 special character</li>
          </ul>
        </Form.Item>
        <Box height={5}>
          {error && (
            <Typography.Text type="danger" >
              {error}
            </Typography.Text>
          )}
        </Box>
        <Form.Item name="captcha" rules={[{ required: true }]}>
          <ReCAPTCHA
            sitekey="6LeumuspAAAAAGhSkPMSKRsRea94OPDOVPuf68xu"
            onChange={(val) => {
              setCapVal(val);
            }}
          />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Please agree to the terms and conditions")
                    ),
            },
          ]}
        >
          <Checkbox
            onChange={(e) =>
              formik.setFieldValue("agreement", e.target.checked)
            }
            onBlur={formik.handleBlur}
            checked={formik.values.agreement}
          >
            By registering, I agree to <Link to="#">Terms of Service</Link> &{" "}
            <Link to="#">Privacy Policy</Link>.
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={formik.isSubmitting || isLoading} // Set loading state to isSubmitting
            disabled={
              !formik.values.agreement ||
              formik.isSubmitting ||
              !formik.isValid // Disable if the form is not valid
            } // Add isSubmitting to disabled condition
            style={{ width: "100%", height: "2.5rem", fontSize: "1.1rem" }}
          >
            {formik.isSubmitting ? "Loading..." : "Sign up"}
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default SignupForm;
