import { IUser } from "@models/UserModel";
import axios from "axios";
import { ErrorHandler } from "@helpers/ErrorHandler";
const convert = require("xml-js");

export const rechargeWalletAxiosCall = async (user: IUser, value: number) => {
  const xmls = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:examples:helloservice">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:rechargeWallet soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
        <document xsi:type="xsd:string">${user.document}</document>
        <phone xsi:type="xsd:string">${user.phone}</phone>
        <value xsi:type="xsd:string">${value}</value>
     </urn:rechargeWallet>
  </soapenv:Body>
</soapenv:Envelope>`;
  try {
    const data = await axios.post("http://localhost:3000/soap/user", xmls, {
      headers: { "Content-Type": "text/xml" },
    });
    var options = { compact: true, ignoreComment: true, spaces: 4 };
    const jsonResponse = convert.xml2js(data.data, options)["soap:Envelope"][
      "soap:Body"
    ]["tns:rechargeWalletResponse"];
    const balance = parseFloat(jsonResponse["tns:balance"]._text);
    const message = jsonResponse["tns:message"]._text;
    return { balance, message };
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
