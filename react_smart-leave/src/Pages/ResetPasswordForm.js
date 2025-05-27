import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('danger');

  const validatePassword = (pwd) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{4,}$/;
    return pattern.test(pwd);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setMessage('Password must have at least 4 characters, include lowercase, uppercase, and a symbol.');
      setAlertVariant('danger');
    } else if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      setAlertVariant('danger');
    } else {
      setMessage('Password reset successfully!');
      setAlertVariant('success');
      // You can add logic to store password if needed
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Group>
        <Button type="submit" variant="success">Create New Password</Button>
        {message && <Alert className="mt-3" variant={alertVariant}>{message}</Alert>}
      </Form>
    </Container>
  );
}

export default ResetPasswordForm;
