
export default async function handler(req, res) {
    try {
        let baseURL=' https://springmoney.frappe.cloud/api/resource/Health%20Check%20Form%20Result?fields=%5B%22name%22,%22user_name%22,%22user_email_id%22,%22phone_number%22,%20%22total_score%22,%22total_progress%22,%22health_check_user%22,%20%22health_check_lead_profile%22%5D&order_by=creation%20desc&limit_page_length=100';
        // let baseURL='https://uatspringmoney.frappe.cloud/api/resource/Health Check Form Result?fields=["name","user_name","user_email_id","phone_number", "total_score","total_progress","health_check_user", "health_check_lead_profile"]&order_by=creation desc&limit_page_length=100';
        // let obj={fields:'["name","user_name","user_email_id","phone_number", "total_score","total_progress","health_check_user", "health_check_lead_profile"]',limit_page_length:100,order_by:'creation desc'}
        // baseURL.search = new URLSearchParams(obj);
        let response= await fetch(baseURL, {
              method:"GET",
            headers: {
              "Content-Type":"application/json",
              "Authorization":"token 043e64b87b60c95:5b2289a64c11a75"
            },
          })
          response= await response.json();
          res.json(response)
    } catch (error) {
        console.error('Error:', error); // Log error details
        res.status(500).json({ error: error });
    }
};





// D:\development\income-tax-calculator\pages\api\financialHealthQuestions.js



