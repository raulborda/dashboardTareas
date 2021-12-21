import { ConfigProvider } from 'antd';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import esEs from 'antd/lib/locale/es_ES';
import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
	<StrictMode>
		<ConfigProvider locale={esEs}>
			<App />
		</ConfigProvider>
	</StrictMode>,
	rootElement,
);
