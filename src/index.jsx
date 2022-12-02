import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import App from './App';
import { postApiService } from './services/PostApiService';
import { gameApiService } from './services/GameApiService';
import { registerApiService } from './services/RegisterApiService';

const data = localStorage.getItem('accessToken');
const accessToken = JSON.parse(data);
postApiService.setAccessToken(accessToken);
gameApiService.setAccessToken(accessToken);
registerApiService.setAccessToken(accessToken);

ReactModal.setAppElement('#app');

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
));
