import { IUser } from "@models/UserModel";
import axios from "axios";
import { ErrorHandler } from '@helpers/ErrorHandler';
const convert = require('xml-js');

export const createUserAxiosCall = async (user: IUser) => {
  const xmls = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:examples:helloservice">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:createUser soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
        <document xsi:type="xsd:string">27223185</document>
         <name xsi:type="xsd:string">${user.name}</name>
         <lastName xsi:type="xsd:string">${user.lastName}</lastName>
         <email xsi:type="xsd:string">${user.email}</email>
         <phone xsi:type="xsd:string">${user.phone}</phone>
         <auth_token xsi:type="xsd:string">${process.env.SOAP_AUTH_TOKEN}</auth_token>
       </urn:createUser>
    </soapenv:Body>
 </soapenv:Envelope>
 `;
  try {
    const data = await axios.post("http://localhost:3000/soap/user", xmls, {
      headers: { "Content-Type": "text/xml" },
    });
    var options = {compact: true, ignoreComment: true, spaces: 4};
    const jsonResponse = convert.xml2js(data.data, options)['soap:Envelope']['soap:Body']['tns:createUserResponse'];
    const user : IUser = {
        id : jsonResponse['tns:user'].id._text,
        document : jsonResponse['tns:user'].document._text,
        name : jsonResponse['tns:user'].name._text,
        lastName : jsonResponse['tns:user'].lastName._text,
        email : jsonResponse['tns:user'].email._text,
        phone : jsonResponse['tns:user'].phone._text
    }
    const message = jsonResponse["tns:message"]._text
    return {user , message}
  } catch (error) {
    throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.errmsg}`);
  }
};
