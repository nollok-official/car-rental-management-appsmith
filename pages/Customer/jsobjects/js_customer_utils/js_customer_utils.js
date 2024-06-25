export default {
	fetch_document: async (pcustomer_id =1, pdocument_type ="qid"  , pdocument_name="front.jpg") => {
		const response = await s3_read_customer_document.run({
			"customer_id" : pcustomer_id,
			"document_type" : pdocument_type,
			"document_name": pdocument_name
		});
		return response
	},

	fetch_customer_contacts: async(pcustomer_id)=>{
		return sql_fetch_customer_contacts.run({"customer_id": pcustomer_id})
	}
}