import {useRef, useState, useEffect, useContext} from 'react';
import AuthContext from './context/AuthProvider';
import {Alert, Button, Container, IconButton, Stack, TextField} from "@mui/material";
import axios from './api/axios';
import * as PropTypes from "prop-types";

const LOGIN_URL = '/login';

function CloseIcon(props) {
    return null;
}

CloseIcon.propTypes = {fontSize: PropTypes.string};
const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [setOpen] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({email, password}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,
                }
            );

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({email, password, roles, accessToken});
            setUser('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err?.response.data.data.error_message) {
                setErrMsg(err?.response.data.data.error_message);
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            <Container>
                {success ? (
                    <section>
                        <h1>You are logged in!</h1>
                        <br/>
                        <p>{/* <a href="#">Go to Home</a> */}</p>
                    </section>
                ) : (
                    <section>
                        {errMsg ? (
                            <Alert
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                                severity={'error'}
                                ref={errRef}
                            >
                                {errMsg}
                            </Alert>
                        ) : ''}

                        <Stack spacing={2}>
                            <h1>Login</h1>

                            <form onSubmit={handleSubmit}>

                                <TextField id="email"
                                           label="Email"
                                           variant="outlined"
                                           ref={userRef}
                                           autoComplete="off"
                                           onChange={(e) => setUser(e.target.value)}
                                           value={email}
                                           required/>

                                <TextField
                                    type="password"
                                    label="Password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />

                                <Button type={'submit'} variant={'contained'}>Log In</Button>
                            </form>
                        </Stack>
                        <p>
                            Need an Account?
                            <br/>
                            <span className="line">
                                <Button variant="outlined" href="/">Register</Button>
                            </span>
                        </p>
                    </section>
                )}
            </Container>
        </>
    );
};

export default Login;
