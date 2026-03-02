import React from "react";
import { useContext, useState } from "react";
import {
  Form as AntForm,
  Input,
  Button,
  Typography,
  Checkbox,
  Col,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiRequest from "../Api/apiRequest";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import { AuthContext } from "../Context/authContext";

const { Text } = Typography;

const LoginForm = ({ setAuth }) => {
  const navigate = useNavigate();
  const [capVal, setCapVal] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser , updateUser } = useContext(AuthContext);

  const LoginSchema = Yup.object().shape({
    usernameOrEmail: Yup.string().required(
      "Please input your username or email!"
    ),
    password: Yup.string().required("Please input your password!"),
  });

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setIsLoading(true);
        const res = await apiRequest.post("/auth/login", {
          usernameOrEmail: values.usernameOrEmail,
          password: values.password,
        });
        console.log(res.data.user);
        updateUser(res.data.user);
        setError(""); // Clear error message on successful login

        // Wait for a few seconds before navigating
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Navigation based on user role - stay on home page
        if (res.data.user.isAdmin) {
          navigate("/", { state: { fromLogin: true, userRole: 'admin' } });
        } else if (res.data.user.isNormalUser) {
          navigate("/", { state: { fromLogin: true, userRole: 'user' } });
        } else {
          navigate("/", { state: { fromLogin: true, userRole: 'user' } });
        }
      } catch (err) {
        console.error("Login error:", err);
        setError(err.response?.data?.message || "Failed to log in");
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AntForm
        initialValues={{ remember: true }}
        onFinish={formik.handleSubmit}
        autoComplete="off"
      >
        <AntForm.Item
          name="usernameOrEmail"
          rules={[
            { required: true, message: "Please input your username or email!" },
          ]}
          validateStatus={
            formik.errors.usernameOrEmail && formik.touched.usernameOrEmail
              ? "error"
              : ""
          }
          help={
            formik.errors.usernameOrEmail && formik.touched.usernameOrEmail
              ? formik.errors.usernameOrEmail
              : ""
          }
        >
          <Input
            placeholder="Username or Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.usernameOrEmail}
            style={{ height: "2.7rem", fontSize: "1.02rem" }}
          />
        </AntForm.Item>

        <AntForm.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          validateStatus={
            formik.errors.password && formik.touched.password ? "error" : ""
          }
          help={
            formik.errors.password && formik.touched.password
              ? formik.errors.password
              : ""
          }
        >
          <Input.Password
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            style={{ height: "2.7rem", fontSize: "1.02rem" }}
          />
        </AntForm.Item>

        <AntForm.Item>
          <Checkbox
            onChange={(e) => formik.setFieldValue("remember", e.target.checked)}
            onBlur={formik.handleBlur}
            checked={formik.values.remember}
          >
            Remember me
          </Checkbox>
        </AntForm.Item>

        <AntForm.Item name="captcha" rules={[{ required: true }]}>
          <ReCAPTCHA
            sitekey="6LeumuspAAAAAGhSkPMSKRsRea94OPDOVPuf68xu"
            onChange={(val) => {
              setCapVal(val);
            }}
          />
        </AntForm.Item>
        <Box style={{
          padding: "1rem 0rem 2rem 0rem",
        }}>
          {error && (
            <Typography.Text
              type="danger"
              style={{
                fontFamily: "Poppins,sans serif",
              }}
            >
              {error}
            </Typography.Text>
          )}
        </Box>

        <AntForm.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={formik.isSubmitting || isLoading}
            disabled={formik.isSubmitting || !formik.isValid}
            style={{ width: "100%", height: "2.5rem", fontSize: "1.1rem" }}
          >
            {formik.isSubmitting || isLoading ? "Loading..." : "Log in"}
          </Button>
        </AntForm.Item>
      </AntForm>
    </motion.div>
  );
};

export default LoginForm;
