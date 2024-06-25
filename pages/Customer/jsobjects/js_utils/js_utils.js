export default {
	get_all_cus_with_pfp: async () => {
		//get customers with doc type and name for forming url from db
		const customers = await sql_get_all_cus_with_pfp.run({
			"limit": customers_table.pageSize,
			"offset": customers_table.pageOffset
		});
		// map each customer with their pfp by fetching pfp from s3
		const mapped_customers = await Promise.all(
			customers.map(
				async (customer) => {
					// if no doc type and name, implying the customer has no pfp,
					// set customer.pfp to null
					if (!(customer.document_type && customer.document_name)){ 
						customer.pfp = null; 
						return customer;
					}

					//try to fetch pfp filedata in base24 from s3
					try{
						await s3_read_customer_document.run({
							// "customer_id": customer.customer_id,
							// "document_type": customer.document_type,
							// "document_name": customer.document_name
							"customer_id": 1,
							"document_type": "qid",
							"document_name": "front.jpg"
						});
						// set current customer.pfp to fileData from s3
						customer.pfp = s3_read_customer_document.data.fileData;
						return customer;
					}catch{
						// if error in fetching pfp fileData from s3
						// implying no file of such name
						// set customer.pfp to null
						customer.pfp = null;
						return customer;
					}
				}));
		return mapped_customers
	}
}