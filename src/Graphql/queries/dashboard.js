import { gql } from '@apollo/client';

export const GET_TAREAS_DASHBOARD = gql`
	query getTareasDashboard($idUsuario: Int, $filtroUsuario: Int) {
		getTareasDashboardResolver(idUsuario: $idUsuario, filtroUsuario: $filtroUsuario)
	}
`;
