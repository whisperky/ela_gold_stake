import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";
import axios from "axios";
interface Column {
	id: "NO" | "amount" | "address";
	label: string;
	minWidth?: number;
	align?: "left";
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: "NO", label: "NO", minWidth: 60 },
	{ id: "amount", label: "AMOUNT", minWidth: 100 },
	{ id: "address", label: "ADDRESS", minWidth: 100 },
];

const StakerList = (props: any) => {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const handleCompletionTime = (item: any) => {
		if (item.multiply === 105) {
			return `${180 - item.unlockTimeToSec}/180`;
		} else if (item.multiply === 115) {
			return `${360 - item.unlockTimeToSec}/360`;
		} else if (item.multiply === 145) {
			return `${720 - item.unlockTimeToSec}/720`;
		} else if (item.multiply === 100) {
			return `${0 - item.unlockTimeToSec}/0`;
		} else {
			return `${1440 - item.unlockTimeToSec}/1440`;
		}
	};

	const [stakerList, setStakerList] = useState<any>([]);
	const [stakerCount, setStakerCount] = useState<number>(0);

	const getStakerList = async () => {
		let response;
		try {
			response = await axios.get(
				`https://esc.elastos.io/api?module=token&action=getTokenHolders&contractaddress=0xaA9691BcE68ee83De7B518DfCBBfb62C04B1C0BA&page=${
					page + 1
				}&offset=${rowsPerPage}
        `
			);
			console.log(response);
			setStakerList(response.data.result);
		} catch (err) {
			console.log(err);
		}
	};

	const getStakerCount = async () => {
		let response;
		try {
			response = await axios.get(
				`https://esc.elastos.io/api?module=token&action=getTokenHolders&contractaddress=0xaA9691BcE68ee83De7B518DfCBBfb62C04B1C0BA&offset=10000
        `
			);
			setStakerCount(response.data.result.length);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getStakerCount();
	}, []);

	useEffect(() => {
		getStakerList();
	}, [page, rowsPerPage]);

	return (
		<>
			<div className="mt-[25px] w-full rounded-[12px] border-[1px] border-gray-200 bg-white p-[24px] shadow-md shadow-gray-300">
				<div className="mb-[15px] text-black">Gold Staker Rich List</div>
				<Paper
					sx={{
						width: "100%",
						overflow: "hidden",
						backgroundColor: "white",
						color: "black",
						borderRadius: 2,
					}}>
					{props.windowWidth > 1280 ? (
						<>
							<TableContainer
								sx={{
									height: 365,
									"&::-webkit-scrollbar": {
										height: "3px",
										border: "none",
										width: "3px",
									},
									"&::-webkit-scrollbar-thumb": {
										background: "gray",
										// borderRadius: '1px',
										border: "none",
										width: "2px !important",
									},
									"&::-webkit-scrollbar-track": {
										// borderRadius: '2px',
										border: "none",
									},
								}}>
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											{columns.map((column: any, index: any) => (
												<TableCell
													key={index}
													align={column.align}
													style={{
														minWidth: column.minWidth,
														backgroundColor: "#e6e6e6",
														color: "black",
													}}>
													{column.label}
												</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{stakerList.map((row: any, index: any) => {
											return (
												<TableRow
													hover
													role="checkbox"
													tabIndex={-1}
													key={index}>
													<TableCell align="left">
														<div className="text-black">{index + 1}</div>
													</TableCell>
													<TableCell align="left">
														<div className="text-black">
															{(
																parseFloat(row.value) / Math.pow(10, 18)
															).toFixed(4)}
														</div>
													</TableCell>
													<TableCell>
														<Link
															href={`https://esc.elastos.io/address/${row.address}`}
															target="_blank">
															<div className="text-black">
																{row.address.substring(0, 4) +
																	"....." +
																	row.address.substring(38, 43)}
															</div>
														</Link>
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</TableContainer>
						</>
					) : (
						<>
							<TableContainer
								sx={{
									height: 265,
									"&::-webkit-scrollbar": {
										height: "3px",
										border: "none",
										width: "3px",
									},
									"&::-webkit-scrollbar-thumb": {
										background: "gray",
										// borderRadius: '1px',
										border: "none",
										width: "2px !important",
									},
									"&::-webkit-scrollbar-track": {
										// borderRadius: '2px',
										border: "none",
									},
								}}>
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											{columns.map((column, index) => (
												<TableCell
													key={index}
													align={column.align}
													style={{
														minWidth: column.minWidth,
														backgroundColor: "#e6e6e6",
														color: "black",
													}}>
													{column.label}
												</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{stakerList.map((row: any, index: any) => {
											return (
												<TableRow
													hover
													role="checkbox"
													tabIndex={-1}
													key={index}>
													<TableCell align="left">
														<div className="text-black">
															{index + 1 + page * rowsPerPage}
														</div>
													</TableCell>
													<TableCell align="left">
														<div className="text-black">
															{(
																parseFloat(row.value) / Math.pow(10, 18)
															).toFixed(4)}
														</div>
													</TableCell>
													<TableCell>
														<Link
															href={`https://esc.elastos.io/address/${row.address}`}
															target="_blank">
															<div className="text-black">
																{row.address.substring(0, 4) +
																	"....." +
																	row.address.substring(38, 43)}
															</div>
														</Link>
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</TableContainer>
						</>
					)}

					<TablePagination
						style={{ color: "black" }}
						rowsPerPageOptions={[10, 25, 100]}
						component="div"
						count={stakerCount}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</div>
		</>
	);
};
export default StakerList;
