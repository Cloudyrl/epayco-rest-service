import axios from "axios";
import { ErrorHandler } from "@helpers/ErrorHandler";
const convert = require("xml-js");

export const confirmTransactionAxiosCall = async (session_id: string, token: string) => {
    const xmls = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:examples:transactionservice">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:confirmTransaction soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
           <session_id xsi:type="xsd:string">${session_id}</session_id>
           <auth_token xsi:type="xsd:string">${process.env.SOAP_AUTH_TOKEN}</auth_token>
         <token xsi:type="xsd:string">${token}</token>
       </urn:confirmTransaction>
    </soapenv:Body>
 </soapenv:Envelope> 
 `;
    try {
      const data = await axios.post("http://localhost:3000/soap/transaction", xmls, {
        headers: { "Content-Type": "text/xml" },
      });
      var options = { compact: true, ignoreComment: true, spaces: 4 };
      const jsonResponse = convert.xml2js(data.data, options)["soap:Envelope"][
        "soap:Body"
      ]["tns:confirmTransactionResponse"];
      const message = jsonResponse["tns:message"]._text;
      return { message };
    } catch (error) {
      throw error.response.data
        ? new ErrorHandler(
          error.response.status,
            convert.xml2js(error.response.data, {
              compact: true,
              ignoreComment: true,
              spaces: 4,
            })["soap:Envelope"]["soap:Body"]["soap:Fault"]["soap:error"]._text
          )
        : new ErrorHandler(500, `Unkown error while trying to fetch the soap server`);
    }
};