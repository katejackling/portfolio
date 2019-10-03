import { useState, useEffect } from "react";
import client from "../../client";

const useClientFetch = query => {
	const [data, setData] = useState(null);
	useEffect(() => {
		const loadData = async query => {
			const response = await client.fetch(query);
			setData(response);
			// console.log(response);
		};
		loadData(query);
	}, [query]);
	return data;
};

export default useClientFetch;
