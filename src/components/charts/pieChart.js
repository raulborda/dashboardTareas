import { Empty } from 'antd';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { PieChart, ResponsiveContainer, Pie, Sector, Legend, Tooltip } from 'recharts';

const RePieChart = ({ dataChart, refContainer }) => {
	useEffect(() => {
		if (!dataChart) return;
	}, [dataChart]);

	const [activeIndex, setActiveIndex] = useState(0);

	const renderActiveShape = (props) => {
		const RADIAN = Math.PI / 180;
		const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, percent, value } = props;
		const sin = Math.sin(-RADIAN * midAngle);
		const cos = Math.cos(-RADIAN * midAngle);
		const sx = cx + (outerRadius + 10) * cos;
		const sy = cy + (outerRadius + 10) * sin;
		const mx = cx + (outerRadius + 30) * cos;
		const my = cy + (outerRadius + 30) * sin;
		const ex = mx + (cos >= 0 ? 1 : -1) * 22;
		const ey = my;
		const textAnchor = cos >= 0 ? 'start' : 'end';

		return (
			<g>
				<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
					{/* {payload.name} */}
				</text>
				<Sector
					cx={cx}
					cy={cy}
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					startAngle={startAngle}
					endAngle={endAngle}
					fill={fill}
				/>
				<Sector
					cx={cx}
					cy={cy}
					startAngle={startAngle}
					endAngle={endAngle}
					innerRadius={outerRadius + 2}
					outerRadius={outerRadius + 4}
					fill={fill}
				/>
				{/* <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
				<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" /> */}
				<text x={ex + (cos >= 0 ? 1 : -1) * -30} y={ey} textAnchor={textAnchor} fill="#333">
					{`${Math.floor(value).toLocaleString('de-DE')}`}
					{/* {`${payload.name}`}-{`${value}`} */}
				</text>
				<text x={ex + (cos >= 0 ? 1 : -1) * -40} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
					{`(${(percent * 100).toFixed(1)}%)`}
				</text>
			</g>
		);
	};
	const onPieEnter = useCallback(
		(_, index) => {
			setActiveIndex(index);
		},
		[setActiveIndex],
	);
	return (
		<Fragment>
			{dataChart.length > 0 && refContainer.current ? (
				<div style={{ height: refContainer.current.clientHeight, width: refContainer.current.clientWidth, minHeight: 300 }}>
					<ResponsiveContainer>
						<PieChart
							margin={{
								left: 15,
								top: -40,
								bottom: 15,
								right: 15,
							}}
						>
							<Pie
								activeIndex={activeIndex}
								activeShape={renderActiveShape}
								// cx="30%"
								// cy="50%"
								data={dataChart}
								innerRadius={40}
								outerRadius={60}
								// fill="#8884d8"
								dataKey="value"
								onMouseEnter={onPieEnter}
							/>

							<Legend verticalAlign="bottom" filterNull iconType="circle" />
							<Tooltip filterNull={false} formatter={(value) => `${Math.floor(value).toLocaleString('de-DE')}`}></Tooltip>
						</PieChart>
					</ResponsiveContainer>
				</div>
			) : (
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
			)}
		</Fragment>
	);
};
export default RePieChart;
