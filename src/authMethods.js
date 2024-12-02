import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { UseApi } from './useApi';

export const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    localStorage.setItem('token', token);
    return userCredential;
};

export const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    localStorage.setItem('token', token);
    await getToken()
    return userCredential;
};

export const logout = () => {
    auth.signOut();
    localStorage.removeItem('token');
};

export const getToken = async () => {
    const token = await UseApi('/authentication/token/new', {
        method: 'GET',
    })
    return token
}