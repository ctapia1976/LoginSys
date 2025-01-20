import React, { useState } from 'react';
    import { signInWithGoogle, signUpWithEmail, signInWithEmail } from './firebase';
    import { BrowserRouter, Routes, Route } from 'react-router-dom';

    const Login = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [isRegister, setIsRegister] = useState(false);
      const [message, setMessage] = useState({ type: '', text: '' });

      const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        
        try {
          if (isRegister) {
            await signUpWithEmail(email, password);
            setMessage({ type: 'success', text: '¡Registro exitoso! Ahora puedes iniciar sesión.' });
            setIsRegister(false);
          } else {
            await signInWithEmail(email, password);
            setMessage({ type: 'success', text: 'Inicio de sesión exitoso' });
          }
        } catch (error) {
          let errorMessage = 'Ocurrió un error';
          
          switch (error.code) {
            case 'auth/email-already-in-use':
              errorMessage = 'El correo ya está registrado';
              break;
            case 'auth/invalid-email':
              errorMessage = 'Correo electrónico inválido';
              break;
            case 'auth/weak-password':
              errorMessage = 'La contraseña debe tener al menos 6 caracteres';
              break;
            case 'auth/user-not-found':
              errorMessage = 'Usuario no encontrado';
              break;
            case 'auth/wrong-password':
              errorMessage = 'Contraseña incorrecta';
              break;
            default:
              errorMessage = error.message;
          }
          
          setMessage({ type: 'error', text: errorMessage });
        }
      };

      return (
        <div className="container">
          <h2>{isRegister ? 'Registro' : 'Login'}</h2>
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">
              {isRegister ? 'Registrarse' : 'Iniciar sesión'}
            </button>
          </form>
          <button onClick={signInWithGoogle} style={{backgroundColor: '#DB4437'}}>
            Iniciar con Google
          </button>
          <div className="link" onClick={() => {
            setIsRegister(!isRegister);
            setMessage({ type: '', text: '' });
          }}>
            {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </div>
        </div>
      );
    };

    const App = () => {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      );
    };

    export default App;
