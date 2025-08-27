import { useState } from 'react';

const App = () => {
  const [id, setId] = useState('');
  const [appName, setAppName] = useState('');
  const [password, setPassword] = useState('');
  function handleSave() {
    if (!appName || !id || !password) {
      return
    }
    if (!PasswordCredential || ! navigator.credentials) {
      console.error('Not support')
      return
    }
    const unionId = `(${appName}) ${id}`
    const credential = new PasswordCredential({
      id: unionId,
      name: unionId,
      password: password,
    })
    navigator.credentials.store(credential).then(() => console.log('Save Success'))
  }
  return (
    <div style={{display: 'flex', flexDirection: 'column', width: 'fit-content'}}>
      <label htmlFor="idInput"> Id <input id="idInput" value={id} onChange={(e) => setId(e.target.value)} /> </label>
      <label htmlFor="appNameInput"> appName <input id="appNameInput" value={appName} onChange={(e) => setAppName(e.target.value)} /> </label>
      <label htmlFor="passwordInput"> password <input id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} /> </label>
      <button onClick={handleSave}>Submit to save</button>
    </div>
  );
};

export default App;
