export default {
	data: [],
	fetch: async () => {
		// get all customers from db with their pfp document name
		await sql_fetch_customer_with_pfp.run({
			"pageSize": customer_table.pageSize,
			"pageNo": customer_table.pageNo
		});
		const customers = sql_fetch_customer_with_pfp.data;
		// for each customer, use the pfp document_name
		// to fetch the pfp from the s3 storage of that particular customer
		// and add new column (customer.pfp) containing the fileData for pfp
		const mapped_customers = await Promise.all(customers.map(async (customer) => {
			await s3_read_customer_document.run({
				"customer_id": 1,
				"document_type": "qid",
				"document_name": "front.jpg"
});
			customer.pfp = s3_read_customer_document.data.fileData;
			return customer;
		}));
		
		return mapped_customers
		
		// other approach, easier to understand but hella slow as it occurs sequentially
		// for (let customer of customers){
			// await s3_read_customer_document.run({
				// "customer_id": "1",
				// "document_type": "qid",
				// "document_name": "front.jpg"
			// });
			// customer.pfp = s3_read_customer_document.data.fileData
		// }
		// 
		// return customers;
	}
}
