'use server'
export default async function handler(req, res) {
    try {
        const data = req.body;
        let name=JSON.parse(data).name;
        let baseURL=`https://springmoney.frappe.cloud/api/resource/Health Check Form Result/${name}`;
        baseURL=encodeURI(baseURL)
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



