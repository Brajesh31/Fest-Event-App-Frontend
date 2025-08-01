"use client";

import { CircleX } from "lucide-react";
import { Card, Typography, Form, Input, Button, Spin, Alert } from 'antd';
import Link from "next/link";
import registerImage from "../../../../public/org1.jpg";
import useSignup from "../../hooks/useSignup";
import Image from 'next/image';
import '../form.css';

const Register = () => {
  const { loading, error, registerUser } = useSignup();

  const handleRegister = (values) => {
    registerUser(values);
  };

  return (
    <>
      <div className="background-image"></div>
      <Card className="form-container">
        <div className="w-full flex justify-end align-top">
          <Link href={"/"}>
            <button>
              <CircleX className="bg-red-600 rounded-full text-white" />
            </button>
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div className="flex justify-center items-center">
              <Image src="/IconOnly.png" alt="Logo" width={70} height={70} />
            </div>
            <Typography.Title
              level={7}
              strong
              style={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "28px",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Create Organiser an account
            </Typography.Title>

            <Typography.Text
              type="secondary"
              strong
              style={{
                color: "#a0aec0",
                fontSize: "16px",
                textAlign: "center",
                display: "block",
                marginBottom: "30px",
              }}
            >
              Enter your details for Organiser
            </Typography.Text>

            <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
              <Form.Item
                label={<span style={{ color: "#fff", fontWeight: "600" }}>Full Name</span>}
                name="name"
                rules={[{ required: true, message: "Please input your full name!" }]}
              >
                <Input
                  size="large"
                  placeholder="Enter your Full name"
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "#f5f5f5",
                  }}
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#fff", fontWeight: "600" }}>Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  { type: "email", message: "The input is not a valid Email!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your Email"
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "#f5f5f5",
                  }}
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#fff", fontWeight: "600" }}>Phone number</span>}
                name="phone"
                rules={[{ required: true, message: "Please enter your phone number!" }]}
              >
                <Input
                  size="large"
                  placeholder="Enter your Phone number"
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "#f5f5f5",
                  }}
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#fff", fontWeight: "600" }}>Password</span>}
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter your Password"
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "#f5f5f5",
                  }}
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#fff", fontWeight: "600" }}>Confirm Password</span>}
                name="passwordConfirm"
                rules={[{ required: true, message: "Please confirm your password!" }]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter your Password"
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "#f5f5f5",
                  }}
                />
              </Form.Item>

              {error && (
                <Alert
                  description={error}
                  type="error"
                  showIcon
                  closable
                  style={{
                    marginTop: "20px",
                    backgroundColor: "#ffeded",
                    border: "1px solid #ff4d4f",
                    color: "#a8071a",
                    borderRadius: "6px",
                  }}
                />
              )}
              <Form.Item>
                <Button
                  type={`${loading ? '' : 'primary'}`}
                  htmlType="submit"
                  size="large"
                  className="btn"
                >
                  {loading ? <Spin /> : 'Create Account Organiser'}
                </Button>
              </Form.Item>
              <Form.Item>
                <Link href="/organiser/login">
                  <Button size="large" className="btn">
                    Already have an account
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </div>
          <div style={{ flex: 1 }}>
            <Image
              src={registerImage}
              alt="Register"
              width={400}
              height={300}
              className="auth-image"
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default Register;
