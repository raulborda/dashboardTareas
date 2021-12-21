import React from 'react';
import './styles.css';
import { ApolloProvider } from '@apollo/client';
import Client from './config/apolloClientConfig';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'moment/locale/es';
import Dashboard from './components/Dashboard';
import './less/antd.less';

const App = () => {
	return (
		<ApolloProvider client={Client}>
			<Router>
				<Switch>
					<Route path="/">
						<div className="wrapper">
							<Dashboard />
						</div>
					</Route>
				</Switch>
			</Router>
		</ApolloProvider>
	);
};

export default App;
