"use client";
import { CircleX } from "lucide-react";
import { Card, Form, Input, Button, Spin, Alert, Typography } from 'antd';
import Link from "next/link";
import loginImage from "../../../../public/org.jpg";
import Image from 'next/image';
import useLogin from '../../hooks/useLogin';
import '../form.css';

const Login = () => {
  const { loading, error, LoginUser } = useLogin();

  const handleLogin = async (values: any) => {

    await LoginUser(values);
  };

  return (
    <>
      <div className="background-image"></div>
      <Card className="form-container">
        {/* Close Button */}
        <div className="flex justify-end">
          <Link href="/">
            <button>
              <CircleX className="bg-red-600 rounded-full text-white hover:bg-red-700 p-1 transition" />
            </button>
          </Link>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row gap-5 items-center">
          {/* Left - Image */}
          <div className="w-full md:w-1/2">
            <Image
              src={loginImage}
              alt="Login"
              width={400}
              height={300}
              className="auth-image"
            />
          </div>

          {/* Right - Form */}
          <div className="w-full md:w-1/2">
            <div className="flex justify-center items-center">
              <Image src="/IconOnly.png" alt="Logo" width={70} height={70} />
            </div>
            <Typography.Title level={2} style={{ color: "#ffffff", textAlign: "center" }}>
              Organiser Login
            </Typography.Title>

            <Typography.Text strong style={{ color: "#cbd5e1", display: "block", textAlign: "center" }}>
              Log in to your Account
            </Typography.Text>


            <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
              <Form.Item
                label={<span className="text-white font-semibold">Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  { type: "email", message: "The input is not a valid Email!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your Email"
                  className="bg-gray-800 text-white border border-gray-600 rounded-lg placeholder-gray-400 hover:border-indigo-500 transition"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-white font-semibold">Password</span>}
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter your Password"
                  className="bg-gray-800 text-white border border-gray-600 rounded-lg placeholder-gray-400 hover:border-indigo-500 transition"
                />
              </Form.Item>

              {error && (
                <Alert
                  description={error}
                  type="error"
                  showIcon
                  closable
                  className="mt-4 rounded-lg bg-gray-900 text-white border-0"
                />
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="btn"
                  disabled={loading}
                >
                  {loading ? <Spin /> : 'Login In'}
                </Button>
              </Form.Item>

              <Form.Item>
                <Link href="/organiser/register">
                  <Button size="large" className="btn">
                    Create an Account
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Login;
