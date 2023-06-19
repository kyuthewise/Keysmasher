import './App.css';
import {Button, Alert, Breadcrumb} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div className="App">
      <header className="App-header">
    <Breadcrumb> 
    <Breadcrumb.Item>bruh</Breadcrumb.Item>
    <Breadcrumb.Item>bruhA</Breadcrumb.Item>
    </Breadcrumb>
    <Alert variant="sucess">This is a button</Alert>
    <Button>test</Button>
      </header>
    </div>
    
  );
}

export default App;
