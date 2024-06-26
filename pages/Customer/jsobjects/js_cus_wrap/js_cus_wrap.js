export default {
	customer_id: 1,
	documents: {},

	fetch_cus_doc_name: async(ptype, plimit = 1)=> {
		await sql_get_cus_docs.run({
			"customer_id": this.customer_id,
			"document_type": ptype,
			"limit": plimit
		})
		return sql_get_cus_docs.data[0].customer_document_name
	},

	fetch_s3: async (ptype, pname) => {		
		try{
			await s3_read_customer_document.run({
				"customer_id": this.customer_id,
				"document_type": ptype,
				"document_name": pname
			})
			return s3_read_customer_document.data.fileData
		}catch(error){
			return null
		}
	},

	fetch_cus_doc: async(ptype)=>{
		// const doc_name = await this.fetch_cus_doc_name(ptype);
		// const doc_data = this.fetch_s3(ptype, doc_name);
		const doc_data = this.fetch_s3("qid", "front.jpg");
		return doc_data
	},

	fetch_pfp: async () => {
		this.documents.pfp = await this.fetch_cus_doc("pfp");
		return this.documents.pfp;
	},

	fetch_passport: async () => {
		this.documents.passport = await this.fetch_cus_doc("passport");
		return this.documents.passport;
	},

	fetch_qid_front: async() => {
		this.documents.qid.front = await this.fetch_cus_doc("qid_front");
		return this.documents.qid.front;
	},

	fetch_qid_back: async() => {
		this.documents.qid.back = await this.fetch_cus_doc("qid_back");
		return this.documents.qid.back;
	},

	fetch_license_front: async() => {
		this.documents.driving_license.front = await this.fetch_cus_doc("driving_license_front");
		return this.documents.driving_license.front;
	},

	fetch_license_back: async() => {
		this.documents.driving_license.back = await this.fetch_cus_doc("driving_license_back");
		return this.documents.driving_license.back;
	},

	init: (pcustomer_id)=>{
		this.customer_id = pcustomer_id;
		this.documents = {
			pfp: "",
			qid: {
				front: "",
				back: ""
			},
			passport: "",
			driving_license: {
				front: "",
				back: ""
			}
		};
	}
}
