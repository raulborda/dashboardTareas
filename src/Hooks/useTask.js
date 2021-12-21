import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { GET_TAREAS } from '../Graphql/queries/tareas';

import { useQuery } from '@apollo/client';
import { GET_TAREAS_DASHBOARD } from '../Graphql/queries/dashboard';
import { GET_GRUPO_POR_USUARIO, GET_USUARIOS } from '../Graphql/queries/usuario';
const useTask = () => {
	// ?userId=1

	const history = useHistory();
	const search = queryString.parse(history.location.search);

	const { userId } = search;

	const [searchUser, setSearchUser] = useState('');
	const [table, setTable] = useState([]);
	const [graph, setGraph] = useState([]);
	const [totales, setTotales] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const [usersList, setUsersList] = useState([]);
	const [userFilterId, setUserFilterId] = useState(null);

	const { data, loading, error } = useQuery(GET_TAREAS_DASHBOARD, {
		variables: { idUsuario: Number(userId), filtroUsuario: userFilterId },
	});
	const {
		data: group,
		loading: loadingGroup,
		error: errorGroup,
	} = useQuery(GET_GRUPO_POR_USUARIO, {
		variables: { idUsuario: Number(userId) },
	});

	const {
		data: userSearchList,
		loading: loadingUser,
		error: errorUser,
	} = useQuery(GET_USUARIOS, {
		variables: { input: searchUser },
	});

	const colors = ['#f5222d', '#faad14', '#13c2c2', '#fa541c', '#00B0F0', '#1890ff', '#2f54eb', '#012840', '#e8a134', '#008d8c'];

	useEffect(() => {
		if (!data) return;

		if (data) {
			const Table = JSON.parse(data.getTareasDashboardResolver).dataPorEstado;
			const Graph = JSON.parse(data.getTareasDashboardResolver).dataTorta;

			const graphData = Graph.map((item, idx) => {
				return { name: item.tip_desc, value: item.cantidad, fill: colors[idx] };
			});
			setGraph(graphData);

			const Totales = JSON.parse(data.getTareasDashboardResolver).dataTotales;
			const tab = Table.map((item) => {
				return {
					...item,
					key: item.usu_id,
				};
			});
			setTable(tab);
			setTotales(Totales);
		}

		if (group) {
			const groupData = group.getGrupoByUsuarioResolver.filter((item) => {
				if (item.gru_id === 1) {
					return true;
				} else {
					return false;
				}
			});

			setIsAdmin(groupData.length > 0 ? true : false);
		}

		if (userSearchList) {
			setUsersList(userSearchList.getUsuariosResolver);
		}
	}, [data, loading, searchUser, loadingUser]);

	return { table, graph, totales, isAdmin, setSearchUser, usersList, setUserFilterId };
};

export default useTask;
