import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Account {
    username: string;
    password: string;
}

interface Errors {
    username?: string;
    password?: string;
}

const LoginForm: React.FC = () => {
    const [account, setAccount] = useState<Account>({ username: "", password: "" });
    const [errors, setErrors] = useState<Errors>({});
    const navigate = useNavigate();

    const validate = (): Errors | null => {
        const errors: Errors = {};
        if (account.username.trim() === '') {
            errors.username = 'Username is required!';
        }
        if (account.password.trim() === '') {
            errors.password = 'Password is required!';
        }
        return Object.keys(errors).length === 0 ? null : errors;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccount({ ...account, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors || {});
        if (validationErrors) return;

        axios
            .post('http://localhost:3100/api/user/auth', {
                login: account.username,
                password: account.password
            })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.email);
                navigate('/dashboard');

            })
            .catch((error) => {
                setErrors({
                    password: "Given username doesn't exist or the password is wrong!"
                });
                console.log(error);
            });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <TextField
                        label="Username"
                        value={account.username}
                        name="username"
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    {errors.username && (
                        <Alert severity="error">
                            {errors.username}
                        </Alert>
                    )}
                </div>
                <div className="form-group">
                    <TextField
                        label="Password"
                        value={account.password}
                        name="password"
                        onChange={handleChange}
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    {errors.password && (
                        <Alert severity="error">
                            {errors.password}
                        </Alert>
                    )}
                </div>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default LoginForm;