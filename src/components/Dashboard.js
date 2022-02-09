import { Card, Col, Empty, Row, Table, Select, Pagination } from 'antd';
import { useRef, useState } from 'react';
import useTask from '../Hooks/useTask';
import './Dashboard.styles.scss';

import RePieChart from './charts/pieChart';

const Dashboard = () => {
	const { Option } = Select;
	const { table, totales, graph, isAdmin, setSearchUser, usersList, setUserFilterId } = useTask();
	const [usuarios, setUsuarios] = useState([]);
	const chart = useRef(null);

	const columns = [
		{
			title: 'Usuario',
			dataIndex: 'usu_nombre',
			key: 'usu_nombre',
			ellipsis: true,
			sorter: (a, b) => a.usu_nombre.localeCompare(b),
			align: 'left',
		},
		{
			title: 'Totales abiertas',
			dataIndex: 'abiertas',
			key: 'abiertas',
			ellipsis: true,
			sorter: (a, b) => a.abiertas - b.abiertas,
			align: 'right',
		},
		{
			title: 'Totales vencidas',
			dataIndex: 'vencidas',
			key: 'vencidas',
			ellipsis: true,
			sorter: (a, b) => a.vencidas - b.vencidas,
			align: 'right',
		},
	];

	const onSearchUser = (val) => {
		if (val.length >= 3) {
			setSearchUser(val.toLowerCase());
		}
	};

	const onChangeUser = (e) => {
		setUserFilterId(e);
		if (!e) {
			setUserFilterId(null);
			setSearchUser('');
		}
	};
	return (
		<>
			<Row gutter={[10, 10]}>
				<Col sm={24} size="small">
					{isAdmin && (
						<Select
							style={{ width: 200 }}
							// mode="multiple"
							// disabled={usuarios.length > 0 ? false : true}
							showSearch
							allowClear
							placeholder="Usuario"
							optionFilterProp="children"
							onChange={onChangeUser}
							// onFocus={onFocus}
							// onBlur={onBlur}
							onSearch={onSearchUser}
							loading={usuarios === null ? true : false}
							// filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							// filterOption={(input, option) => option.children.indexOf(input) >= 0}
						>
							{usersList.length >= 0 &&
								usersList.map((item) => (
									<Option key={item.usu_id} value={item.usu_id}>
										{item.usu_nombre}
									</Option>
								))}
						</Select>
					)}
				</Col>
				<Col sm={24}>
					<Card>
						{ totales && totales.length ? 
						<div className="indicator_wrapper">
							<span>{totales[0].totales} TAREAS</span>
							<span>{totales[0].abiertas} ABIERTAS</span>
							<span>{totales[0].vencidas} VENCIDAS</span>
						</div> : null}
						{/* <Col sm={24} md={8}>
							<div className="indicators">
							</div>
						</Col>
						<Col sm={24} md={8}>
							<div className="indicators">
							</div>
						</Col>
						<Col sm={24} md={8}>
							<div className="indicators">
							</div>
						</Col> */}
					</Card>
				</Col>

				{/* <Col sm={24} md={12}>
					{totales.length > 0 && (
						<Card title="TAREAS TOTALES" size="small">
							<div className="totals_wrapper">
								<div className="totals">
									<span>{totales[0].totales} Tareas</span>
								</div>
								<div className="totals_opens_expired_wrapper">
									<div className="totals_opens">
										<span>{totales[0].abiertas} Abiertas</span>
									</div>
									<div className="vertical_line"></div>

									<div className="totals_expireds">
										<span>{totales[0].vencidas} Vencidas</span>
									</div>
								</div>
							</div>
							{/* <div className="totals_wrapper" style={{ height: 300 }}>
								<p className="task_totals">
								</p>
								<div className="abiertas_vencidas_wrapper">
									<p className="abiertas">
										<span>{totales[0].abiertas} Abiertas</span>
									</p>
									<div className="vertical_line"></div>
									<p className="vencidas">
									</p>
								</div>
							</div> */}
				{/* </Card> */}
				{/* )} */}
				{/* </Col>  */}
				<Col sm={24} md={12}>
					<Card title="TAREAS ABIERTAS POR USUARIO" size="small" style={{ height: 458 }}>
						<Table size="small" dataSource={table} pagination={{ pageSize: 8 }} columns={columns} size="small" />
					</Card>
				</Col>
				<Col sm={24} md={12}>
					<Card title="TAREAS ABIERTAS POR TIPO" size="small">
						<div className="chart_wrapper" ref={chart} style={{ height: 394 }}>
							{graph && <RePieChart dataChart={graph} refContainer={chart}></RePieChart>}
						</div>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Dashboard;
