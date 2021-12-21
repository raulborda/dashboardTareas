import { gql } from '@apollo/client';

export const GET_TAREAS = gql`
	query getTareasCalendario($idUsuario: Int) {
		getTareasCalendarioResolver(idUsuario: $idUsuario)
	}
`;
