import React from "react";
import { useState } from "react";
import { Form, Input, Button, Checkbox, Typography, Row, Col, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiRequest from "../Api/apiRequest";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const SignupForm = ({ setAuth }) => {
  const navigate = useNavigate();
  const [capVal, setCapVal] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaError, setCaptchaError] = useState("");

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
      .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    agreement: Yup.boolean().oneOf(
      [true],
      "Please agree to the terms and conditions"
    ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreement: false,
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // Validate captcha before submitting
      if (!capVal) {
        setCaptchaError("Please complete the captcha verification");
        message.error("Please complete the captcha verification");
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        setCaptchaError("");

        const res = await apiRequest.post("/auth/register", {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          captcha: capVal
        });

        let redirectionPath = "/login";
        setError("");
        
        // Show success message
        message.success("Registration successful! Redirecting to login...");
        
        // Wait for 2 seconds before redirection
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate(redirectionPath);
      } catch (err) {
        console.error("Registration error:", err);
        const errorMessage = err.response?.data?.message || "Registration failed";
        
        // Handle specific captcha errors
        if (errorMessage.includes("captcha") || errorMessage.includes("CAPTCHA")) {
          setCaptchaError("Invalid captcha. Please try again.");
          message.error("Invalid captcha. Please try again.");
        } else {
          setError(errorMessage);
          message.error(errorMessage);
        }
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, color: '#d9d9d9', text: 'Enter password' };
    
    let strength = 0;
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[@$!%*?&#]/.test(password)
    ];
    
    strength = checks.filter(Boolean).length;
    
    const strengthConfig = {
      0: { color: '#d9d9d9', text: 'Very Weak' },
      1: { color: '#ff4d4f', text: 'Weak' },
      2: { color: '#faad14', text: 'Fair' },
      3: { color: '#52c41a', text: 'Good' },
      4: { color: '#1890ff', text: 'Strong' },
      5: { color: '#722ed1', text: 'Very Strong' }
    };
    
    return { strength, ...strengthConfig[strength] };
  };

  const passwordStrength = getPasswordStrength(formik.values.password);

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
        layout="vertical"
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
                prefix={<UserOutlined className="text-yellow-400" />}
                placeholder="First Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                style={{ 
                  height: "2.7rem", 
                  fontSize: "1.02rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                  color: "#fff"
                }}
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
                prefix={<UserOutlined className="text-yellow-400" />}
                placeholder="Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                style={{ 
                  height: "2.7rem", 
                  fontSize: "1.02rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                  color: "#fff"
                }}
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
            prefix={<MailOutlined className="text-yellow-400" />}
            placeholder="Email Address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            style={{ 
              height: "2.7rem", 
              fontSize: "1.02rem",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 215, 0, 0.2)",
              color: "#fff"
            }}
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
            prefix={<LockOutlined className="text-yellow-400" />}
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            style={{ 
              height: "2.7rem", 
              fontSize: "1.02rem",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 215, 0, 0.2)",
              color: "#fff"
            }}
          />
        </Form.Item>

        {/* Password Strength Indicator */}
        {formik.values.password && (
          <Box mb={3}>
            <div className="flex items-center justify-between mb-2">
              <Text style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "12px" }}>
                Password Strength
              </Text>
              <Text style={{ color: passwordStrength.color, fontSize: "12px", fontWeight: "bold" }}>
                {passwordStrength.text}
              </Text>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(passwordStrength.strength / 5) * 100}%`,
                  backgroundColor: passwordStrength.color
                }}
              />
            </div>
          </Box>
        )}

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
            prefix={<SafetyOutlined className="text-yellow-400" />}
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            style={{ 
              height: "2.7rem", 
              fontSize: "1.02rem",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 215, 0, 0.2)",
              color: "#fff"
            }}
          />
        </Form.Item>

        {/* Password Requirements */}
        <Box mb={3} p={3} style={{ 
          background: "rgba(255, 215, 0, 0.05)",
          border: "1px solid rgba(255, 215, 0, 0.1)",
          borderRadius: "8px"
        }}>
          <Text style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "12px", marginBottom: "8px", display: "block" }}>
            Password must include:
          </Text>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              {formik.values.password && formik.values.password.length >= 8 ? 
                <CheckCircleOutlined className="text-green-400 text-xs" /> :
                <ExclamationCircleOutlined className="text-gray-400 text-xs" />
              }
              <Text style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "11px" }}>
                8+ characters
              </Text>
            </div>
            <div className="flex items-center space-x-2">
              {formik.values.password && /[A-Z]/.test(formik.values.password) ? 
                <CheckCircleOutlined className="text-green-400 text-xs" /> :
                <ExclamationCircleOutlined className="text-gray-400 text-xs" />
              }
              <Text style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "11px" }}>
                Uppercase letter
              </Text>
            </div>
            <div className="flex items-center space-x-2">
              {formik.values.password && /[a-z]/.test(formik.values.password) ? 
                <CheckCircleOutlined className="text-green-400 text-xs" /> :
                <ExclamationCircleOutlined className="text-gray-400 text-xs" />
              }
              <Text style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "11px" }}>
                Lowercase letter
              </Text>
            </div>
            <div className="flex items-center space-x-2">
              {formik.values.password && /\d/.test(formik.values.password) ? 
                <CheckCircleOutlined className="text-green-400 text-xs" /> :
                <ExclamationCircleOutlined className="text-gray-400 text-xs" />
              }
              <Text style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "11px" }}>
                Number
              </Text>
            </div>
            <div className="flex items-center space-x-2">
              {formik.values.password && /[@$!%*?&#]/.test(formik.values.password) ? 
                <CheckCircleOutlined className="text-green-400 text-xs" /> :
                <ExclamationCircleOutlined className="text-gray-400 text-xs" />
              }
              <Text style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "11px" }}>
                Special character
              </Text>
            </div>
          </div>
        </Box>

        {/* Error Display */}
        <Box height={5} mb={3}>
          {error && (
            <Typography.Text type="danger" style={{ color: "#ff4d4f" }}>
              {error}
            </Typography.Text>
          )}
        </Box>

        {/* Captcha */}
        <Form.Item 
          name="captcha" 
          rules={[{ required: true, message: "Please complete the captcha verification!" }]}
          validateStatus={captchaError ? "error" : ""}
          help={captchaError}
        >
          <ReCAPTCHA
            sitekey="6LeumuspAAAAAGhSkPMSKRsRea94OPDOVPuf68xu"
            onChange={(val) => {
              setCapVal(val);
              setCaptchaError(""); // Clear captcha error when user interacts
            }}
            onExpired={() => {
              setCaptchaError("Captcha expired. Please try again.");
              message.error("Captcha expired. Please try again.");
            }}
            onError={(error) => {
              setCaptchaError("Captcha error. Please refresh the page.");
              message.error("Captcha error. Please refresh the page.");
            }}
          />
        </Form.Item>

        {/* Terms Agreement */}
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
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            By registering, I agree to{" "}
            <Link to="/terms" style={{ color: "#FFD700" }}>Terms of Service</Link> &{" "}
            <Link to="/privacy" style={{ color: "#FFD700" }}>Privacy Policy</Link>.
          </Checkbox>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={formik.isSubmitting || isLoading}
            disabled={
              !formik.values.agreement ||
              formik.isSubmitting ||
              !formik.isValid ||
              !capVal
            }
            style={{ 
              width: "100%", 
              height: "2.5rem", 
              fontSize: "1.1rem",
              background: "linear-gradient(135deg, #FFD700, #FFA500)",
              border: "none",
              color: "#000",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(255, 215, 0, 0.4)"
            }}
          >
            {formik.isSubmitting ? "Creating Account..." : "Create Premium Account"}
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default SignupForm;
