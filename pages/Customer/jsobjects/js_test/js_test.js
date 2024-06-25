export default {
	fetch_s3: async () => {
		s3_read_customer_document.run({
			"customer_id":1,
			"document_type":"qid",
			"document_name":"front.jpg"
		})
		return s3_read_customer_document.data
	}
}