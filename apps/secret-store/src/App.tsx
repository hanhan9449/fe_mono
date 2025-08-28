import { useEffect, useRef, useState } from 'react';

const App = () => {
  const [id, setId] = useState('');
  const [appName, setAppName] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenValue, setHiddenValue] = useState('');
  useEffect(() => {
    const unionId = `(${appName}) ${id}`
    setHiddenValue(unionId)

  }, [id, appName]);
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  function handleFormSubmit(e) {
    e.preventDefault()
  }
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
    <form onSubmit={handleFormSubmit} style={{display: 'flex', flexDirection: 'column', width: 'fit-content'}}>
      <input value={hiddenValue} type={'text'} name={'username'} style={{position: 'absolute', clipPath: 'circle(1px)'}}/>
      <label htmlFor="idInput"> Id <input id="idInput" value={id} onChange={(e) => setId(e.target.value)} /> </label>
      <label htmlFor="appNameInput"> appName <input id="appNameInput" value={appName} onChange={(e) => setAppName(e.target.value)} /> </label>
      <label htmlFor="passwordInput"> password <input id="passwordInput" value={password} type={'password'} name={password} onChange={(e) => setPassword(e.target.value)} /> </label>
      <button onClick={handleSave}>Submit to save</button>
      <button ref={submitButtonRef} type={'submit'}>Submit by form</button>
    </form>
  );
};

export default App;
