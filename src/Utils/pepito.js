
import * as xlsx from 'xlsx';
import * as FileSaver from 'file-saver';
import API_AXIOS from '../../settings/settings';
import endpointList from '../settings/endpoints';



async function pepito(email){

    try {
       let call = await API_AXIOS(endpointList.getUserData + `?email=${email}`)
       let data = call.data
       let user = []
       user.push(data)    
       console.log(user)
       var wb = new xlsx.utils.book_new();
           wb.props = {
     
               Title:`${user[0].email}Â´s payments`,
               Subject: 'Payments',
               Author: user[0].email,
               CreatedDate: Date.now()
           }
     
           wb.SheetNames.push('payments');
           
           let i=0;
          // let paymentsLen =.length
            
           let length = 0;
            for (let i of  user[0].payments){
             length++;
}   
           
           let arr = []
           for (;i<length;i++){
     
               if(user[0].payments[i].quantity>0){
                   arr.push([user[0].payments[i].token,user[0].payments[i].quantity, user[0].payments[i].other, user[0].email])
               } else {
                   arr.push([user[0].payments[i].token,user[0].payments[i].quantity, user[0].email, user[0].payments[i].other])
               }
           }
     
           var ws_data = [['coin', 'quantity', 'sender', 'receiver'] ]
           let j=0;
           for(;j<arr.length;j++){
               ws_data.push(arr[j])
           }
     
           var ws = xlsx.utils.aoa_to_sheet(ws_data)
           wb.Sheets['payments'] = ws;
     
           xlsx.writeFile(wb, "test.xlsx")
           
           FileSaver.saveAs(wb, 'test.xlsx')

          } catch (error) {console.log(error);}         
    }     




export { pepito }