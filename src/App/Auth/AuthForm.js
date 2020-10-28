import React, { useState } from 'react';
import 'firebase/auth';
import { useFirebaseApp } from 'reactfire';
import {
  EuiButton,
  EuiCallOut,
  EuiFieldPassword,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
} from '@elastic/eui';

function AuthForm() {
  const firebase = useFirebaseApp();
  const initialFormData = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const signUp = async () =>
    await firebase
      .auth()
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(() => setError({}))
      .catch((err) => setError({ message: err.message }));

  const logIn = async () => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(() => setError({}))
      .catch((err) => setError({ message: err.message }));
  };

  return (
    <EuiFlexGroup
      className="width-300 margin-auto"
      gutterSize="none"
      alignItems="center"
      justifyContent="spaceAround"
    >
      <EuiFlexItem>
        <EuiForm>
          <EuiFormRow fullWidth>
            <EuiFieldText
              fullWidth
              icon="user"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </EuiFormRow>
          <EuiFormRow fullWidth>
            <EuiFieldPassword
              fullWidth
              placeholder="Password"
              name="password"
              type="dual"
              value={formData.password}
              onChange={handleChange}
            />
          </EuiFormRow>
          <EuiSpacer size="xl" />
          <EuiFormRow fullWidth>
            <EuiFlexItem grow={false}>
              <EuiButton color="primary" fill onClick={logIn}>
                Log In
              </EuiButton>
              <EuiSpacer size="s" />
              <EuiButton color="secondary" fill onClick={signUp}>
                Sign up
              </EuiButton>
            </EuiFlexItem>
          </EuiFormRow>
          <EuiSpacer size="xl" />
          {error.message && <EuiCallOut title={error.message} color="danger" />}
        </EuiForm>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

export default AuthForm;
