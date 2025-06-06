import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface Account {
    username: string;
    password: string;
}

interface Errors {
    username?: string;
    password?: string;
}

interface State {
    account: Account;
    errors: Errors;
}

interface Account {
    username: string;
    email: string;
    password: string;
}

class LoginForm extends Component<{}, State> {

    state: State = {
        account: {
            username: "",
            password: ""
        },
        errors: {}
    };

    handleChangeRoute = () => {
        navigate('/dashboard');
    };

    validate = (): Errors | null => {
        const errors: Errors = {};

        const { account } = this.state;
        if (account.username.trim() === '') {
            errors.username = 'Username is required!';
        }
        if (account.password.trim() === '') {
            errors.password = 'Password is required!';
        }

        return Object.keys(errors).length === 0 ? null : errors;
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        axios
            .post('http://localhost:3100/api/user/auth', {
                email: this.state.account.email,
                password: this.state.account.password
            })
            .then((response) => {
                handleChangeRoute();
            })
            .catch((error) => {
                const errorMessages: Errors = {};
                errorMessages.password =
                    "Given username doesn't exist or the password is wrong!";
                setErrors(errorMessages || {});
                console.log(error);
            });


        console.log("submit - np. zapytanie do serwera");
    }; handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const account = { ...this.state.account };
        account[event.currentTarget.name] = event.currentTarget.value;
        this.setState({ account });
    };

    render() {
        return (
            <Container maxWidth="sm">
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <TextField
                            label="Username"
                            value={this.state.account.username}
                            name="username"
                            onChange={this.handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        {this.state.errors.username && (
                            <Alert severity="error">
                                {this.state.errors.username}
                            </Alert>
                        )}
                    </div>
                    <div className="form-group">
                        <TextField
                            label="Password"
                            value={this.state.account.password}
                            name="password"
                            onChange={this.handleChange}
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        {this.state.errors.password && (
                            <Alert severity="error">
                                {this.state.errors.password}
                            </Alert>
                        )}
                    </div>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
            </Container>
        );
    }
}

export default LoginForm;