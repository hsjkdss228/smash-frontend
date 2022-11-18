import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { postApiService } from './services/PostApiService';
import { gameApiService } from './services/GameApiService';
import { memberApiService } from './services/MemberApiService';

const data = localStorage.getItem('accessToken');
const accessToken = JSON.parse(data);
postApiService.setAccessToken(accessToken);
gameApiService.setAccessToken(accessToken);
memberApiService.setAccessToken(accessToken);

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
));
