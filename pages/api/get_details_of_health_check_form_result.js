'use server'
export default async function handler(req, res) {
    try {
        const data = req.body;
        let name=JSON.parse(data).name;
        let baseURL=`https://uatspringmoney.frappe.cloud/api/resource/Health Check Form Result/${name}`;
        baseURL=encodeURI(baseURL)
        let response= await fetch(baseURL, {
          method:"GET",
          headers: {
            "Content-Type":"application/json",
            "Authorization":"token c94aaa32165ea3e:ee2011e98c07351"
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



